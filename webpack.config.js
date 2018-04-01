const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

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
            { test: /\.html$/, use: 'raw-loader' },
            {
                test: /\.scss$/,
                use: [
                    'raw-loader',
                    { loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        // new webpack.ContextReplacementPlugin(/angular(\\|\/)core/, path.resolve(__dirname, 'src'))
    ]
};