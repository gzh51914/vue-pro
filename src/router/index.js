import Vue from 'vue'
import VueRouter from 'vue-router'

import Films from "@/views/Films"
import Cinema from "@/views/Cinema"
import Center from "@/views/Center"
import Info from "@/views/Info"

import Nowplaying from "@/views/films/Nowplaying"
import Goingplaying from "@/views/films/Goingplaying"
import Detail from "@/views/Detail"

Vue.use(VueRouter)

const routes = [{
    path: '/films',
    component: Films,
    children:[
      {
        path:"/films/nowplaying",
        component:Nowplaying,
      },
      {
        path:"/films/Goingplaying",
        component:Goingplaying
      }
    ]
  }, {
    name: "detail",
    path: "/detail/:id",
    component: Detail,
    props: true
  }, {
    path: '/cinema',
    component: Cinema
  }, {
    path: '/center',
    component: Center
  }, {
    path: '/info',
    component: Info
  },{
    path: "",
    redirect: "/films"
  }, {
    path: "/",
    redirect: "/films"
  }, {
    path:"*",
    component:Error // 前面的路由都没有匹配上的话，就需要显示Error页面了
  }

]

const router = new VueRouter({
  mode: "hash", // 默认采用hash模式
  routes
})


export default router