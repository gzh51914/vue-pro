
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  //实现了对于vuex的持久化存储
  plugins: [createPersistedState({
    reducer(data){
      return {
        city:data.city 
      }
    }
  })],  
  state: {
    isTabbarShow:true
  },
  modules:{ // 进行模块的划分
    cinema, // 影院的模块
    tabbar, // tabbar的模块
    city // 城市的模块
  }
})
