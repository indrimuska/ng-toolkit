const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/module.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'ng-toolkit.js',
        library: ['ng-toolkit'],
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    externals: [
        /^rxjs\//,
        /^@angular\//,
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    resolveLoader: {
        modules: [path.join(__dirname, 'node_modules')]
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' },
            { test: /\.less$/, use: ['raw-loader', 'less-loader'] },
            // { test: /\.scss$/, use: ['raw-loader''sass-loader'] },
            // { test: /\.scss$/, use: ['raw-loader', 'less-loader', 'sass-loader'] },
            { test: /\.scss$/, use: ['sass-loader'] },
        ]
    },
    plugins: [
        // new webpack.ContextReplacementPlugin(/angular(\\|\/)core/, path.resolve(__dirname, 'src'))
    ]
};