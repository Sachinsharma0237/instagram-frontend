const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'https://sachinsharma-instagram.herokuapp.com/',
      changeOrigin: true,
    })
  );
};