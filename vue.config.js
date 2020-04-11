// vue.config.js
module.exports = {
    lintOnSave: false,
    configureWebpack: {
        resolve: {
          alias: {
            'assets': '@/assets',
            'con': '@/components',
            'views': '@/views',
          }
        }
      }
}
