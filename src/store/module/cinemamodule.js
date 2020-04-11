
import { instance } from "@/utils/http"

// 影院vuex共享配置
const module = {
  namespaced: true, 
  state:{
    cinemaList:[] 
  },
  getters:{
    topDataList (state) {
      return state.cinemaList.splice(0, 5)
    }
  },
  actions:{
    getCinemaActions (store,cityId) { 
      instance.get(`/gateway?cityId=${cityId}&ticketFlag=1&k=4111314`, {
        headers:{
          "X-Host": "mall.film-ticket.cinema.list"
        }
      }).then(res => {
        store.commit("setCinemaList", res.data.data.cinemas)
      })
    }
  },
  mutations:{
    setCinemaList (state, data) {
      state.cinemaList = data
    }
  }
}
export default module
