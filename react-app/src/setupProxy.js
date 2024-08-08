const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/node',
    createProxyMiddleware({
      target: 'https://9fc0-5-151-177-140.ngrok-free.app',
      changeOrigin: true,
    })
  );