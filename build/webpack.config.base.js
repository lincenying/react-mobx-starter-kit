const path = require('path')
const webpack = require('webpack')

const isInNodeModules = 'node_modules' === path.basename(path.resolve(path.join(__dirname, '..', '..')))
let relativePath = isInNodeModules ? '../../..' : '..'
const isInDebugMode = process.argv.some(arg => arg.indexOf('--debug-template') > -1)
if (isInDebugMode) {
    relativePath = '..'
}
const srcPath = path.resolve(__dirname, relativePath, 'src')
const nodeModulesPath = path.join(__dirname, '..', 'node_modules')
const buildPath = path.join(__dirname, isInNodeModules ? '../../..' : '..', 'dist')

const config = {
    entry: {
        app: [path.join(srcPath, 'index.jsx')]
    },
    output: {
        path: buildPath,
        pathinfo: true,
        filename: '[name].js',
        publicPath: '/'
    },
    externals: {
        jquery: 'jQuery'
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, '../src'),
        },
        extensions: ['.js', '.jsx']
    },
    resolveLoader: {
        modules: [nodeModulesPath]
    },
    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                include: srcPath,
                exclude: /node_modules/,
                loader: ['babel-loader']
            },
            {
                test: /\.(mp4|webm)$/,
                loader: 'url-loader?limit=10000'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}

module.exports = config
