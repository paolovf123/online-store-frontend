export const environment = {
    // URL relativa: el proxy de nginx (docker-compose) o proxy.conf.json (ng serve)
    // redirigen /api/ al backend Azure sin exponer la URL ni provocar CORS en local
    baseUrl: '/api/',
};
