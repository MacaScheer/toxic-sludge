const path = require("path");
module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader", query: { presets: ["es2015"] } }
    ]
  }
};
