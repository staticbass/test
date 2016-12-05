/**
 * Created by supervlad on 23.04.16.
 */

'use strict';

const
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config');

const devServer = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    color: true
});

devServer.listen(3000, 'localhost', function(err) {
    console.log(err || '>>>> Server started on 3000 port')
});