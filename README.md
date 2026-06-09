# Online Store — Frontend

Aplicación Angular 20 de tienda en línea. Backend separado en **Azure App Service**, hosting en **AWS S3 + CloudFront**. La infraestructura AWS vive en el repo [online-store-infra](https://github.com/paolovf123/online-store-infra).

---

## Arquitectura

```
Usuario ──HTTPS──> CloudFront ──> S3 (bundle Angular)
   │
   └─HTTPS /api/*─> Azure App Service (backend)
```

| Entorno | Rama | CloudFront |
|---|---|---|
| Staging | `develop` | dominio staging (output `cloudfront_url`) |
| Production | `main` | dominio prod (con required reviewers en GitHub Environment) |

---

## Desarrollo local

### Opción 1 — `ng serve`

```bash
npm install --legacy-peer-deps
BACKEND_URL=https://api-online-store-staging.azurewebsites.net npm start
```

→ http://localhost:4200. `/api/*` se proxea vía [proxy.conf.js](proxy.conf.js).

### Opción 2 — Docker (simula producción con nginx)

```bash
cp .env.example .env
# Editar .env con la URL real del backend Azure
docker compose up -d --build
```

→ http://localhost. El template de nginx renderiza `${BACKEND_URL}` al arrancar.

---

## Tests

```bash
npm test          # watch mode
npm run test:ci   # una ejecución con cobertura (modo CI)
```

Threshold en [karma.conf.js](karma.conf.js): 50% statements/lines/functions, 40% branches.

---

## CI/CD — GitHub Actions

Dos workflows:

- **[.github/workflows/ci.yml](.github/workflows/ci.yml)** — corre en PRs a `develop` y `main`: `npm audit`, tests + coverage, build smoke.
- **[.github/workflows/cd.yml](.github/workflows/cd.yml)** — corre en push a `develop` (→ staging) o `main` (→ production): asume rol AWS vía OIDC, build con `BACKEND_URL` de SSM, sync a S3, invalidación CloudFront.

### Configuración de GitHub (una sola vez)

Para cada Environment (`staging`, `production`):

| Tipo | Nombre | Valor |
|---|---|---|
| Secret | `AWS_DEPLOY_ROLE_ARN` | Output `github_actions_role_arn` del Terraform de ese entorno |
| Variable | `S3_BUCKET` | Output `s3_frontend_bucket` |
| Variable | `CLOUDFRONT_DISTRIBUTION_ID` | Output `cloudfront_distribution_id` |

Para `production`: en Settings → Environments → `production` → Required reviewers, agregar al menos una persona. GitHub bloqueará el deploy hasta que alguien apruebe.

---

## Variables de entorno

| Archivo | Uso |
|---|---|
| [src/environments/environment.ts](src/environments/environment.ts) | Producción — `__BACKEND_URL__` reemplazado por [scripts/inject-env.js](scripts/inject-env.js) en el workflow |
| [src/environments/environment.development.ts](src/environments/environment.development.ts) | `ng serve` y docker-compose — URL relativa `/api/` |

`BACKEND_URL` se almacena en SSM Parameter Store en AWS (`/online-store/<env>/backend-url`) y lo lee el workflow.

---

## Modelo de ramas

- `develop` → staging (deploy automático)
- `main` → production (deploy con aprobación manual via GitHub Environment)
- `feature/*` → PR a develop
- `hotfix/*` → PR a main + merge back a develop
