# 🛒 Online Store — Frontend

Tienda en línea construida con **Angular 20**, desplegada en **AWS S3 + CloudFront** mediante un pipeline **CI/CD en GitHub Actions** con autenticación **OIDC** (sin llaves de AWS estáticas). Toda la infraestructura AWS se define como código (Terraform) en el repo **[online-store-infra](https://github.com/paolovf123/online-store-infra)**.

| Entorno | Rama | URL en vivo |
|---|---|---|
| 🟡 **Staging** | `develop` | https://d1oy0fsyam6om9.cloudfront.net |
| 🟢 **Production** | `main` | https://d2ielm05o2gs5q.cloudfront.net |

> El frontend consume un backend externo cuya URL se inyecta en tiempo de build desde AWS SSM. Mientras el backend no esté disponible, la URL es un *placeholder* — la app carga y navega, pero las llamadas al API no responden.

---

## 📐 Arquitectura

```
                         ┌────────────────────────────┐
   Usuario  ──HTTPS──▶   │  CloudFront (CDN + HTTPS)   │
                         └──────────────┬─────────────┘
                                        │ Origin Access Control (OAC)
                                        ▼
                         ┌────────────────────────────┐
                         │  S3 (bucket privado)        │  ← bundle Angular
                         └────────────────────────────┘

   Usuario  ──HTTPS /api──▶  Backend externo (URL inyectada en build desde SSM)
```

- **S3** guarda el bundle estático (bucket **privado**: solo CloudFront lo lee vía OAC).
- **CloudFront** sirve la SPA por HTTPS, cachea los assets y enruta el SPA.
- La **URL del backend** se hornea en el bundle al compilar (ver [scripts/inject-env.js](scripts/inject-env.js)); su valor vive en **SSM Parameter Store** (`/online-store/<env>/backend-url`), gestionado por Terraform en el repo de infra.

---

## 🧰 Stack

| Capa | Tecnología |
|---|---|
| Framework | Angular 20 (componentes *standalone*, builder esbuild `@angular/build`) |
| UI | Angular Material |
| Hosting | AWS S3 (privado) + CloudFront |
| CI/CD | GitHub Actions + OIDC |
| IaC | Terraform (repo [online-store-infra](https://github.com/paolovf123/online-store-infra)) |
| Tests | Karma + Jasmine (`@angular/build:karma`, headless Chrome) |

---

## 🚀 CI/CD — el flujo completo

Dos pipelines, cada uno como **grafo visual** de jobs encadenados (se ve el paso a paso en la pestaña *Actions*).

### 🔍 CI — [`ci.yml`](.github/workflows/ci.yml) · en cada Pull Request a `develop` / `main`

```
   Audit  ───▶  Unit tests  ───▶  Build (smoke)
```

| Etapa | Qué hace |
|---|---|
| **Audit** | `npm audit --omit=dev --audit-level=high` — falla el PR si hay vulnerabilidades altas/críticas |
| **Unit tests** | `npm run test:ci` — **39 tests** + cobertura |
| **Build** | Build de humo con un backend *placeholder*; valida que la app compila |

### 🚢 CD — [`cd.yml`](.github/workflows/cd.yml) · en cada push a `develop` (→ staging) / `main` (→ production)

```
   Quality gate  ───▶  Build  ───▶  Deploy a S3 + CloudFront
```

| Etapa | Qué hace |
|---|---|
| **Quality gate** | Repite audit + tests como red de seguridad antes de publicar |
| **Build** | Asume el rol AWS por **OIDC** → lee `BACKEND_URL` de **SSM** → lo inyecta → `ng build` → sube el `dist/` como *artifact* |
| **Deploy** | Asume el rol → descarga el *artifact* → `aws s3 sync` (cache inmutable) + sube `index.html` sin cache + **invalida CloudFront** |

### 🔐 Seguridad del despliegue

- **OIDC, sin secretos de larga vida:** GitHub firma un token efímero y AWS lo cambia por credenciales temporales. No hay `AWS_ACCESS_KEY_ID` guardado en ningún lado.
- **Rol por entorno:** el job declara `environment:`, por lo que el *claim* `sub` del token es `repo:<org>/<repo>:environment:<env>`; el rol IAM solo confía en esa forma exacta.
- **Aprobación manual en production:** el GitHub Environment `production` tiene *required reviewer* → un despliegue a `main` se pausa hasta que alguien aprueba.

### 🔗 Mapeo rama → entorno

| Push a… | Entorno | Aprobación |
|---|---|---|
| `develop` | staging | automática |
| `main` | production | manual (required reviewer) |

---

## 💻 Desarrollo local

```bash
npm install --legacy-peer-deps

# Opción 1 — dev server (proxea /api vía proxy.conf.js)
BACKEND_URL=https://tu-backend npm start          # → http://localhost:4200

# Opción 2 — Docker (simula producción con nginx)
cp .env.example .env                               # editar BACKEND_URL
docker compose up -d --build                       # → http://localhost
```

---

## 🧪 Tests

```bash
npm test          # modo watch
npm run test:ci   # una corrida headless + cobertura (lo que usa el CI)
```

- **39 tests** (Karma + Jasmine), todos en verde.
- El runner usa el builder integrado `@angular/build:karma` (auto-configurado, sin `karma.conf.js`). La cobertura se genera en `coverage/` y se sube como *artifact* del CI.

---

## 🔧 Inyección de la URL del backend

El frontend no “conoce” el backend en código; lo recibe al compilar:

1. El placeholder `__BACKEND_URL__` vive en [src/environments/environment.ts](src/environments/environment.ts).
2. [scripts/inject-env.js](scripts/inject-env.js) lo reemplaza con `BACKEND_URL` al hacer build.
3. En el CD, ese valor viene de **SSM** (`/online-store/<env>/backend-url`), que **Terraform gestiona** (no se setea a mano). Cambiar el backend = editar el `.tfvars` en el repo de infra + merge.

| Archivo | Uso |
|---|---|
| [src/environments/environment.ts](src/environments/environment.ts) | Build de producción (placeholder reemplazado por el script) |
| [src/environments/environment.development.ts](src/environments/environment.development.ts) | `ng serve` / docker — usa ruta relativa `/api` |

---

## 🌿 Modelo de ramas

| Rama | Propósito | Deploy |
|---|---|---|
| `develop` | Integración | → staging (automático) |
| `main` | Estable / release | → production (con aprobación) |
| `feature/*` | Trabajo nuevo | PR → `develop` |
| `hotfix/*` | Arreglo urgente | PR → `main` (y back-merge a `develop`) |

---

## ⚙️ Configuración de GitHub (ya aplicada)

Por cada Environment (`staging`, `production`), con los **outputs del Terraform** del repo de infra:

| Tipo | Nombre | Origen (output Terraform) |
|---|---|---|
| Secret | `AWS_DEPLOY_ROLE_ARN` | `github_actions_role_arn` |
| Variable | `S3_BUCKET` | `s3_frontend_bucket` |
| Variable | `CLOUDFRONT_DISTRIBUTION_ID` | `cloudfront_distribution_id` |

`production` además tiene **Required reviewers** para gatear el despliegue.
