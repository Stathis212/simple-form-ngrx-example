const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

var autoprefixer = require('autoprefixer');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ENV = (process.env.NODE_ENV = process.env.ENV = 'production');

console.log('prod');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: 'assets/scripts/[name].bundle.js',
        chunkFilename: 'assets/scripts/[id].chunk.js'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                minimize: true,
                tslint: {
                    emitErrors: true,
                    failOnHint: true,
                },
            }
        }),
        new UglifyJSPlugin({
            test: /\.js($|\?)/i,
            sourceMap: true,
            uglifyOptions: {
                compress: true, 
                minimize: true,
            },
        }),
        //new ExtractTextPlugin(helpers.root('dist/assets/styles/') + '[name].css', {allChunks: true}),
        new webpack.DefinePlugin({
            'process.env': {
                ENV: JSON.stringify(ENV)
            }
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
    ]
});
