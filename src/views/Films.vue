<template>
  <div class="films">
    <van-swipe :autoplay="3000" indicator-color="#fff">
      <van-swipe-item v-for="(banner) in banners" :key="banner.bannerId">
        <img v-lazy="banner.imgUrl" />
      </van-swipe-item>
    </van-swipe>
    <van-tabs
      type="line"
      sticky
      color="#ff5f16"
      title-active-color="#ff5f16"
      line-height="1.6"
      line-width="56"
    >
      <van-tab title="正在热映" sticky>
        <Nowplaying></Nowplaying>
      </van-tab>
      <van-tab title="即将上映" sticky>
        <Goingplaying></Goingplaying>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { instance } from "@/utils/http";
import Nowplaying from "@/views/films/Nowplaying";
import Goingplaying from "@/views/films/Goingplaying";
import { Swipe, SwipeItem, Lazyload, Tab, Tabs, Button,Skeleton } from "vant";

Vue.use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Tab)
  .use(Tabs)
  .use(Button).use(Skeleton);

export default {
  components: {
    Nowplaying,
    Goingplaying
  },
  data() {
    return {
      banners: []
    };
  },
  created() {
    instance
      .get("/gateway?type=2&cityId=440500&k=8679206", {
        headers: {
          "X-Host": "mall.cfg.common-banner"
        }
      })
      .then(res => {
        // console.log(res.data.data);
        this.banners = res.data.data;
      });
  }
};
</script>

<style lang="scss" scoped>
.van-swipe-item {
  img {
    width: 100%;
  }
}
</style>>
<style lang="scss">
.films {
  .van-tabs .van-tabs__wrap {
    height: 0.49rem;
    .van-tab {
      line-height: 0.49rem;
      
    }
  }
}
</style>
