const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.js",
  },
  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3333,
      server: { baseDir: ["dist"] },
    }),
    new CopyPlugin({
      patterns: [{ context: "./src/", from: "**/*.html", to: "./[name][ext]" }],
    }),
  ],
};
