const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env = {}, argv = {}) => {
  const outputDir = env.output || "dist"; // "dist" (dev) or "build" (push)
  const mode = argv.mode || "development";
  const isProd = mode === "production";

  return {
    entry: "./src/js/main.ts",
    output: {
      filename: "js/main.js",
      path: path.resolve(__dirname, outputDir),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  quietDeps: true,
                },
                // Supprime tous les warnings de dépréciation Sass
                warnRuleAsWarning: false,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/style.css",
      }),
    ],
    mode,
    devtool: isProd ? false : "source-map",
  };
};
