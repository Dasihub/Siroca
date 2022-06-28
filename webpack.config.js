const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    entry: ["@babel/polyfill", path.resolve(__dirname, "src/index.tsx")],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/siroca.js"
    },
    stats: "only-error",
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"]
    },
    target: "web",
    devtool: "source-map",
    devServer: {
        port: 3000,
        historyApiFallback: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
            filename: "index.html"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                exclude: /node_modules/,
                use: ["ts-loader"]
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(sass|scss|css)$/,
                use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.(pdf|png|jpeg|jpg|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "assets/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    }
}