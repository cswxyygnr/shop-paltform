// const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  lintOnSave:false,

  //代理服务器跨域
  devServer:{
    proxy:{
      '/api':{
        host:'localhost',
        port:5000,
        target:'http://gmall-h5-api.atguigu.cn',
      }
    }
  }
}
