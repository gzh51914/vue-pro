<template>
  <nav>
    <ul>
      <router-link
        v-for="nav in navlist"
        :key="nav.id"
        :to="nav.path"
        tag="li"
        active-class="active"
      >
        <i class="iconfont" :class="nav.icon"></i>
        <span>{{nav.title}}</span>
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navlist: [
        { id: 1, title: "电影", path: "/films", icon: "icon-dianying" },
        { id: 2, title: "影院", path: "/cinema", icon: "icon-yingyuan" },
        {
          id: 3,
          title: "资讯",
          path: "/info",
          icon: "icon-zaixianwenzhen_xianxingzaixianzixun"
        },
        { id: 4, title: "个人", path: "/center", icon: "icon-wode" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.active {
  color: #ff5f16;
}
.iconfont {
  padding-top: 0.04rem;
  font-size: 0.27rem;
}
nav {
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 0.49rem;
  background: #fff;
  z-index: 10;
  box-shadow: 0px -1px 2px #f5f5f5;
  ul {
    display: flex;
    height: 100%;
    li {
      width: 25%;
      line-height: 0.2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content:center;
      span{
        font-size: 0.1rem;
      }
    }
  }
}
</style>