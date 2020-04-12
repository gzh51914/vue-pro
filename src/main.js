import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import "@/stylesheets/main.scss"
// 引入rem.js
import "@/utils/rem"
// 引入全局组件
import "@/utils/components"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')