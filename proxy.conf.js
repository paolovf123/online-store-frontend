const BACKEND_URL = process.env['BACKEND_URL'] || 'http://localhost:5128';

module.exports = {
  '/api': {
    target: BACKEND_URL,
    secure: true,
    changeOrigin: true,
    logLevel: 'debug',
  },
};
