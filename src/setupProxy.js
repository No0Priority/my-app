const { createProxyMiddleware } = require("http-proxy-middleware");
// fixing CORS crossorigin issue in case of localhost
module.exports = (app) => {
  app.use(
    "/proxy",
    createProxyMiddleware({
      target: "http://api.musixmatch.com/ws/1.1/",
      changeOrigin: true,
      pathRewrite: {
        "/proxy": "/",
      },
    })
  );
};
