/**
 * Created by supervlad on 23.04.16.
 */

'use strict';

const
    webpack = require('webpack'),
    path = require('path'),
    precss = require('precss'),
    autoprefixer = require('autoprefixer');

module.exports = {

    entry: [
        './index.jsx'
    ],

    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index.js'
    },

    plugins: [
        new webpack.NoErrorsPlugin()
    ],

    devtool: 'source-map',

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel']
            },
            { test: /\.scss$/, loader: 'style!css!postcss!sass' },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.(jpg|png|woff|woff2|ttf|eot|svg)$/, loader: 'file-loader?name=[path][name].[ext]' }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    }
};