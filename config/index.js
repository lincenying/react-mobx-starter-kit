// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true
    },
    dev: {
        env: require('./dev.env'),
        port: 8020,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            },
            '/testapi': {
                target: 'https://www.vue-js.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/testapi': '/api'
                }
            }
        }
    }
}
