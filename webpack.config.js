const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
let apiHost = '';

module.exports = env => {
    apiHost = process.env.ENDPOINT || 'http://localhost:8090';
    return {
        entry: './src/main.ts',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: ['ts-loader', 'angular2-template-loader'],
                    exclude: /node_modules/
                },
                {
                    test: /\.(html)$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.css$/,
                    include: /src|node_modules/,
                    use: ["to-string-loader", "style-loader", "css-loader"]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src/app/'),
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
                inject: 'body'
            }),
            new webpack.DefinePlugin({
                config: JSON.stringify({
                    apiUrl: apiHost
                })
            })
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
            runtimeChunk: true
        },
        devServer: {
            historyApiFallback: true
        }
    };
};
