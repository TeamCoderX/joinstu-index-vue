const { defineConfig } = require('@vue/cli-service')
if(process.env.NODE_ENV != 'production'){
  module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer:{
      proxy: {
        '/api': {
          target: 'https://127.0.0.1:3000/',
          credential: true,
          changeOrigin: true,
          cookiePathRewrite: {
            '*': 'https://127.0.0.1:3000/'
          },
          cookieDomainRewrite: {
            '*': '127.0.0.1'
          }
        },
      },
    },
  })
}else{
  module.exports = defineConfig({
    publicPath: './',
    transpileDependencies: true,
    lintOnSave: false,
  })
}
