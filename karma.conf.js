/**
 * Created by supervlad on 26.04.16.
 */

'use strict';

const webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['mocha'],
        files: [
            'tests.webpack.js'
        ],
        preprocessors: {
            'tests.webpack.js': [ 'webpack', 'sourcemap' ]
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: '/node_modules/',
                        loader: 'babel',
                        presets: ['react', 'es2015']
                    }
                ],
                watch: true
            }
        },
        webpackServer: {
            noInfo: true
        }
    });
};