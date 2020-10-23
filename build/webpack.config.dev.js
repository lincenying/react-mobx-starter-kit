const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseWebpackConfig = require('./webpack.config.base')
const config = merge(baseWebpackConfig, {
    performance: {
        hints: false
    },
    mode: 'development',
    devtool: 'eval',
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash:7].[ext]'
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {}
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ["vendor"]
        // }),
        new HtmlWebpackPlugin({
            chunks: ['app'],
            filename: 'index.html',
            template: 'src/template/index.html',
            inject: true
        })
    ]
})

Object.keys(config.entry).forEach(function (name) {
    config.entry[name] = ['react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true&noInfo=false'].concat(
        config.entry[name]
    )
})

module.exports = config
