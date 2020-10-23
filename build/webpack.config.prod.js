const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackBar = require('webpackbar')

const baseWebpackConfig = require('./webpack.config.base')
const configIndex = require('../config')
const buildPath = path.join(__dirname, '../dist')

const config = merge(baseWebpackConfig, {
    performance: {
        maxAssetSize: 600000,
        maxEntrypointSize: 1000000,
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js')
        }
    },
    mode: 'production',
    bail: true,
    devtool: false,
    output: {
        path: buildPath,
        filename: 'static/js/[name].[chunkhash:7].js',
        chunkFilename: 'static/js/[name].[chunkhash:7].chunk.js',
        publicPath: '/'
    },
    resolve: {
        alias: {}
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'static/img/[name].[hash:7].[ext]'
                    }
                }
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -20,
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {}
                },
                sourceMap: configIndex.build.productionSourceMap,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'static/css/[name].[contenthash:7].css',
            chunkFilename: 'static/css/[name].[contenthash:7].css'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['manifest', 'vendors', 'app'],
            filename: 'index.html',
            template: 'src/template/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true
            }
        }),
        new WebpackBar({
            profile: false
        })
    ]
})

module.exports = config
