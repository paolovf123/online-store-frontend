# ETAPA 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de forma determinista (npm ci respeta package-lock.json)
RUN npm ci --legacy-peer-deps

# Copiar el código fuente
COPY . .

# Compilar la aplicación para producción
RUN npm run build

# ETAPA 2: Servir la aplicación (Nginx)
FROM nginx:alpine

# nginx.conf como plantilla: envsubst reemplaza ${BACKEND_URL} al arrancar
COPY nginx.conf /etc/nginx/nginx.conf.template

# Copiar los archivos compilados desde el builder
COPY --from=builder /app/dist/solution-test-ventas/browser /usr/share/nginx/html

# Ajustes para que nginx pueda correr como usuario no-root en puerto 8080
# (puertos <1024 requieren root). Reescribimos el listen en el template al renderizar.
RUN chown -R nginx:nginx /usr/share/nginx/html \
    /var/cache/nginx \
    /var/log/nginx \
    /etc/nginx \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

# URL del backend Azure. Se sobreescribe con -e BACKEND_URL=... en docker-compose o docker run
ENV BACKEND_URL=http://localhost:5128

# Exponer puerto no privilegiado para ejecutar como usuario no-root
EXPOSE 8080

USER nginx

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# envsubst solo reemplaza ${BACKEND_URL} — deja intactas las variables propias de nginx ($uri, $host, etc.)
# El sed cambia 'listen 80' por 'listen 8080' para correr como usuario no-root.
CMD ["/bin/sh", "-c", "envsubst '${BACKEND_URL}' < /etc/nginx/nginx.conf.template | sed 's/listen 80;/listen 8080;/' > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
