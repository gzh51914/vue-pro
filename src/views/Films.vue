<template>
  <div class="films">
    <div class="left" @click="handleChangePage('/city')">
      {{cityName}}
      <van-icon name="arrow-down" size="0.12rem" />
    </div>
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
import { mapMutations, mapState } from "vuex";
import Nowplaying from "@/views/films/Nowplaying";
import Goingplaying from "@/views/films/Goingplaying";

import {
  Swipe,
  SwipeItem,
  Lazyload,
  Tab,
  Tabs,
  Button,
  Skeleton,
  Icon
} from "vant";

Vue.use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Tab)
  .use(Tabs)
  .use(Button)
  .use(Skeleton)
  .use(Icon);

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
  methods: {
    ...mapMutations("cinema", ["setCinemaList"]),
    handleChangePage(path) {
      if (path === "/city") {
        //当用户选择切换城市的时候，将vuex里面的cinemaList状态清空
        this.setCinemaList([]);
      }
      this.$router.push(path);
    }
  },
  computed: {
    ...mapState("city", ["cityName", "cityId"]),
     ...mapState("city",["cityId"])
  },
  created() {
    instance
      .get(`/gateway?type=2&cityId=${this.cityId}&k=8679206`, {
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
.left {
  position: absolute;
  top: 0.18rem;
  left: 0.07rem;
  color: #fff;
  z-index: 10;
  font-size: 0.13rem;
  background: rgba(0, 0, 0, 0.2);
  height: 0.3rem;
  line-height: 0.3rem;
  border-radius: 0.15rem;
  text-align: center;
  padding: 0 0.05rem;
}
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
