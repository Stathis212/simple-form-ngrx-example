const commonConfig = require('./webpack.common.js');
const proxy = require('http-proxy-middleware');
const helpers = require('./helpers');
const historyApiFallback = require('connect-history-api-fallback');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    devtool: 'inline-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: 'assets/scripts/[name].bundle.js',
        chunkFilename: 'assets/scripts/[id].chunk.js'
    },

    plugins: [
         new webpack.LoaderOptionsPlugin({
            options: {
                minimize: true,
                tslint: {
                    emitErrors: false,
                    failOnHint: false,
                },
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                API_URL: JSON.stringify('http://localhost:5000/api/')
            }
        }),
        new webpack.NamedModulesPlugin(),
        new BrowserSyncPlugin({
        host: 'localhost',
        port: '3000',
        server: {
            baseDir: [helpers.root('dist')],
        },
        open: false,
        })
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },
});