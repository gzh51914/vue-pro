import axios from "axios"

// 这个instance是针对于卖座的接口
const instance = axios.create({
  baseURL: 'https://m.maizuo.com', // 基本的url
  // timeout: 3000,  //延时默认3秒
 
})

// 针对于上线的 
const instance2 = axios.create({
  baseURL: '/info'
})

// 请求之前的拦截操作
instance2.interceptors.request.use(
  config => {
    if (localStorage.getItem("token")) { // 如果token存在
      config.headers.token = localStorage.getItem("token")
    }
    return config
  }
)

// 响应之后的拦截操作
instance2.interceptors.response.use(res => {
  if (res.data.err === 0) { // 说明后端给我们前端返回的结果是正常的
    return res.data
  } else {
    return Promise.reject(res.data.msg)
  }
})

export { instance, instance2 }
