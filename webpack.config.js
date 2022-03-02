const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    "demo-zdog": "./src/js/demo-zdog.js",
    "demo-three": "./src/js/demo-three.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "./js/[name].js",
  },
  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3333,
      server: { baseDir: ["dist"] },
    }),
    new CopyPlugin({
      patterns: [
        { context: "./src/", from: "**/*.html", to: "./[name][ext]" },
        { context: "./src/", from: "**/*.mp3", to: "./assets/[name][ext]" },
        { context: "./src/", from: "**/*.json", to: "./assets/[name][ext]" },
      ],
    }),
  ],
};
