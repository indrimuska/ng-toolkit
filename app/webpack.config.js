const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        path.join(__dirname, 'spa.js'),
        path.join(__dirname, 'index.ts')
    ],
    output: {
        path: path.join(__dirname, '../dist-app'),
        filename: 'index.js'
    },
    devServer: {
        port: 9000,
        contentBase: 'app',
        historyApiFallback: true
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.html']
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' },
            { test: /\.html$/, use: 'raw-loader' },
            {
                test: /\.scss$/,
                use: [
                    'raw-loader',
                    { loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
                    'sass-loader'
                ]
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/angular(\\|\/)core/, path.resolve(__dirname, '../src'), {}),
        new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') }),
        new CopyWebpackPlugin([ path.join(__dirname, '404.html') ]),
    ]
};