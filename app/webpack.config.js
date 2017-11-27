const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'index.ts'),
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.html'],
        alias: {
            'ng-lib-webpack': path.join(__dirname, '../src/index')
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' },
            { test: /\.html$/, use: 'raw-loader' },
            { test: /\.scss$/, use: 'sass-loader' },
            { test: /\.less$/, use: ['raw-loader', 'less-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/angular(\\|\/)core/, path.resolve(__dirname, '../src'), {}),
        new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') }),
    ]
};