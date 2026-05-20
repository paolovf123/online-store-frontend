#!/usr/bin/env node
// Reemplaza __BACKEND_URL__ en src/environments/environment.ts con el valor
// de la variable de entorno BACKEND_URL (inyectada por CodeBuild desde SSM).
// Sustituye al `sed -i` original — robusto ante URLs con caracteres especiales.

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');
const backendUrl = process.env.BACKEND_URL;

if (!backendUrl) {
  console.error('[inject-env] ERROR: variable BACKEND_URL no definida.');
  process.exit(1);
}

const original = fs.readFileSync(file, 'utf8');
const replaced = original.split('__BACKEND_URL__').join(backendUrl);

if (original === replaced) {
  console.warn('[inject-env] WARN: no se encontró __BACKEND_URL__ en environment.ts (¿ya fue reemplazado?).');
}

fs.writeFileSync(file, replaced);
console.log(`[inject-env] OK: BACKEND_URL inyectado en ${path.relative(process.cwd(), file)}`);
