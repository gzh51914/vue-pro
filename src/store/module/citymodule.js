// 城市vuex共享配置
const module = {
    namespaced: true, 
    state:{
      cityName:"广州",
      cityId:"440100"
    },
    mutations:{
      setCityName (state, name) {
        state.cityName = name
      },
      setCityId(state,cityId){
        state.cityId = cityId
      }
    }
  }
  
  export default module
  