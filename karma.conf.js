module.exports = config => {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: ['./src/test.module.ts'],
        preprocessors: {
            './src/test.module.ts': ['webpack', 'sourcemap']
        },
        mime: {
            'text/x-typescript': ['ts']
        },
        webpack: require('./webpack.test.js'),
        browsers: ['PhantomJS'],
        // browsers: ['Chrome'],
        port: 9876,
        reporters: ['progress'],
        logLevel: config.LOG_INFO,
        colors: true,
        singleRun: false,
        autoWatch: true,
        concurrency: Infinity
    });
}
