const path = require('path')
const webpack = require('webpack')

const isInNodeModules = 'node_modules' === path.basename(path.resolve(path.join(__dirname, '..', '..')))
const relativePath = isInNodeModules ? '../../..' : '..'
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
            assets: path.join(__dirname, '../src/assets'),
            '~api': path.join(__dirname, '../src/api'),
            '~components': path.join(__dirname, '../src/components'),
            '~decorators': path.join(__dirname, '../src/decorators'),
            '~pages': path.join(__dirname, '../src/pages'),
            '~actions': path.join(__dirname, '../src/store/reducers'),
            '~reducers': path.join(__dirname, '../src/store/reducers'),
            '~utils': path.join(__dirname, '../src/utils')
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
                loader: 'eslint-loader',
                enforce: 'pre',
                include: srcPath
            },
            {
                test: /\.js|\.jsx$/,
                include: srcPath,
                exclude: /node_modules/,
                loader: ['babel-loader']
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
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
