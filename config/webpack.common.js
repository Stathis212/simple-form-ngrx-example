const autoprefixer = require('autoprefixer');
const fs = require('fs');
const helpers = require('./helpers');
const path = require('path');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';

const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const stylesDir = helpers.root('./src/assets/styles/');

module.exports = {
    entry: {
        'styles': ['./src/assets/styles/style.css', './src/assets/styles/custom.css'],
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts',
    },

    resolve: {
      extensions: ['.ts', '.js'],
      modules: [helpers.root('src'), helpers.root('node_modules')],
    },

    node: {
        fs: "empty"
    },
    
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: ['tslint-loader'],
                include: helpers.root('src'),
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/],
            },
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader'],
                include: helpers.root('src'),
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, 
                use: 'file-loader?name=[path][name].[ext]?[hash]',
                include: helpers.root('src/assets/images'),
            },
            {
                test: /\.css$/,
                //include: helpers.root('src/assets/styles'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ { loader: 'css-loader', options: { importLoaders: 1 } },
                        {
                            loader: 'postcss-loader',
                            options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('autoprefixer')(),
                                require('cssnano')()
                                ]
                            }
                        }
                    ],
                }),
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
        ]
    },

    plugins: [
        new ContextReplacementPlugin(
            /* The (\\|\/) piece accounts for path separators in *nix and Windows */
            /(.+)?angular(\\|\/)core(.+)?/,
            helpers.root('src'), // location of your src
            {
              /* Your Angular Async Route paths relative to this root directory */
            }
        ),
        new webpack.optimize.CommonsChunkPlugin({
            async: true,
        }),
        new HtmlWebpackPlugin({
            template: path.join(helpers.root('src'), 'index.html'),
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async',
        }),
        new ExtractTextPlugin({filename: './assets/styles/[name].bundle.css', allChunks: true}),
        new CopyWebpackPlugin([
            { from: 'src/assets', to: 'assets' }
        ]),
        new CheckerPlugin(),
    ]
};
