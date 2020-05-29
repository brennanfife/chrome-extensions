const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  devtool: "cheap-module-source-map",
  mode: "development",

  entry: {
    content: "./src/scripts/content.ts",
    background: "./src/scripts/background.ts",
    popup: "./src/ui/popup.tsx"
  },

  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "[name].js"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
  },
  plugins: [new CleanWebpackPlugin()]
};
