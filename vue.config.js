module.exports = {
  devServer: {
    writeToDisk: true,
    host: "localhost",
    headers: { "Access-Control-Allow-Origin": "*" },
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
