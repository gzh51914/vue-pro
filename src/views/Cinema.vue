<template>
  <div class="cinema">
    <div class="title">
      <div class="left" @click="handleChangePage('/city')">
        {{cityName}}
        <van-icon name="arrow-down" size="0.12rem" />
      </div>
      <div class="center">影院</div>
      <div class="right" @click="handleChangePage('/cinema/search')">
        <img src="/sousuo.png" alt />
      </div>
    </div>

    <div class="select">
      <div class="left" @click="isAreaShow=!isAreaShow" :class="isAreaShow?'act':''">
        {{current}}
        <van-icon name="arrow-down" size=".12rem" />
      </div>
      <div>
        App订票
        <van-icon name="arrow-down" size=".12rem" />
      </div>
      <div class="right">
        最近去过
        <van-icon name="arrow-down" size=".12rem" />
      </div>
    </div>

    <!--点击城市切换-->
    <div class="area" v-show="isAreaShow">
      <ul>
        <li
          v-for="data in areaList"
          :key="data"
          @click="handleArea(data)"
          :class="{active:data===current}"
        >{{data}}</li>
      </ul>
    </div>

    <!--影院的列表-->
    <div class="content" :style="{height:scrollHeight,overflow:'hidden'}">
      <ul>
        <CinemaItem
          v-for="data in computedDatalist"
          :key="data.cinemaId"
          :data="data"
          @click.native="clickme"
        ></CinemaItem>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import { instance } from "@/utils/http"
import CinemaItem from "./Cinema/CinemaItem";
import { mapState, mapActions, mapMutations } from "vuex";
import BetterScroll from "better-scroll";
import { Toast, Icon } from "vant";

Vue.use(Icon);
Vue.use(Toast);
export default {
  components: {
    CinemaItem
  },
  data() {
    return {
      isAreaShow: false,
      current: "全城",
      scrollHeight: 0
    };
  },
  // 利用better-scroll滚动区域
  mounted() {
    this.scrollHeight = document.documentElement.clientHeight - 80 - 50 + "px";
    new BetterScroll(".content", {
      scrollbar: {
        fade: true
      },
      click: true //可以被点击了
    });
  },
  methods: {
    clickme() {
      alert(1111111111111111111);
    },
    handleChangePage(path) {
      if (path === "/city") {
        //当用户选择切换城市的时候，将vuex里面的cinemaList状态清空
        this.setCinemaList([]);
      }
      this.$router.push(path);
    },
    handleArea(data) {
      this.current = data;
      this.isAreaShow = false; // 弹窗消失掉
    },
    ...mapActions("cinema", ["getCinemaActions"]),
    ...mapMutations("cinema", ["setCinemaList"])
  },
  computed: {
    ...mapState("cinema", ["cinemaList"]),
    ...mapState("city", ["cityName", "cityId"]),
    // 所有区域的计算属性
    areaList() {
      // 获取所有城市的所有区域的数组
      const newarr = this.cinemaList.map(item => item.districtName);
      // 利用set结构进行数组去重
      const arealist = ["全城", ...Array.from(new Set(newarr))];
      return arealist;
    },
    // 根据current区域，过滤出相应区域的影城
    computedDatalist() {
      if (this.current === "全城") return this.cinemaList;
      return this.cinemaList.filter(item => item.districtName === this.current);
    }
  },
  created() {
    const toast = Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
      overlay: true
    });
    if (this.cinemaList.length > 0) {
      // console.log("直接使用缓存vuex的数据...")
      toast.clear();
    } else {
      // this.$store.dispatch("cinema/getCinemaActions")
      this.getCinemaActions(this.cityId).then(res => {
        toast.clear(); //关闭弹窗
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.act{
  color: orange;

}
.active {
  border: 1px solid orange !important;
  color: orange;
}
.title {
  display: flex;
  position: fixed;
  top: 0rem;
  left: 0rem;
  width: 100%;
  background: #fff;
  height: 0.4rem;
  line-height: 0.4rem;
  padding: 0 0.1rem;
  z-index: 10;
  div {
    flex: 1;
    text-align: center;
  }
  .center {
    font-size: 0.17rem;
    color: #191a1b;
  }
  .left {
    text-align: left;
    font-size: 0.12rem;
  }
  .right {
    text-align: right;
    img {
      width: 0.18rem;
      height: 0.18rem;
      position: absolute;
      right: 0.1rem;
      top: 0.1rem;
    }
  }
}

.select {
  position: fixed;
  top: 0.4rem;
  height: 0.4rem;
  line-height: 0.4rem;
  background: #fff;
  width: 100%;
  display: flex;
  border-bottom: 0.01rem solid #f5f5f5;
  z-index: 10;
  color: #191a1b;
  font-size: 0.14rem;
  div {
    flex: 1;
    text-align: center;
  }
}
.area {
  position: fixed;
  top: 0.8rem;
  left: 0px;
  width: 100%;
  z-index: 10;
  background: #fff;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 22%;
      height: 0.3rem;
      padding: 0.05rem;
      border: 0.01rem solid #f4f4f4;
      text-align: center;
      margin: 0.05rem;
      overflow: hidden;
    }
  }
}

.content {
  position: relative;
  top: 0.8rem;
}
</style>