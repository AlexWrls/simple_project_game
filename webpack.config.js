const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        chunkFormat: 'array-push',
        clean: true, // очищает dist при сборке
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            charset: 'UTF-8'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    to: '',
                    globOptions: {
                        ignore: ['**/index.html'],
                    }
                }
            ]
        }),
    ],
    devServer: {
        static: [
            {
                directory: path.join(__dirname, 'public'),
                publicPath: '/',
            },
            {
                directory: path.join(__dirname, 'dist'),
                publicPath: '/',
            }
        ],
        port: 8080,
        hot: true,
        devMiddleware: {
            writeToDisk: true, // полезно для отладки
        },
    },
};