// vue.config.js
module.exports = {
  devServer: {
    overlay: {  //让我们的浏览器关闭掉遮盖层的错误代码提示
      warnings: false,
      errors: false
    },
     
      proxy:{
        "/info":{
          target:"http://47.105.157.52:3000",
          changOrigin:true,
          pathRewrite:{
            "^info":""
          }
        }
      }
  },
  lintOnSave:false, //直接关闭eslint检查
  
   
}

