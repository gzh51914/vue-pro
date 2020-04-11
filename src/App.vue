<template>
  <div id="app">
    <!--路由容器 基于slot进行封装的  根据url路径显示不同的路由组件-->
      <router-view></router-view>
      <Tabbar></Tabbar>
  </div>
</template>
<script>
// 引入Tabbar组件
import Tabbar from "@/components/Tabbar"
import { mapState } from "vuex"
export default {
  components:{
    Tabbar
  }
 
}
</script>

<style lang="scss">
    .app-enter-active{
      animation: move .5s;
    }
    .app-leave-active{
      animation: move .5s reverse;
    }

    @keyframes move{
      0%{
        opacity: 0;
        transform: translateY(50px)
      }
      100%{
        opacity: 1;
        transform: translateY(0px)
      }
    }
</style>