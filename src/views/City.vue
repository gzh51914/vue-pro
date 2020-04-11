<template>
  <div class="city" >
    <div class="city-title" @click="tagcinema">
      <div class="title-left">
        <van-icon name="cross" size=".16rem"/>
      </div>
      <div class="title-right">当前城市 -</div>
    </div>

    <div class="city-input">
      <van-search placeholder="请输入搜索关键词" background="#f4f4f4"/>
    </div>

    <div class="citycontent"  >
     
        <!-- 定位加热门城市 -->
      <div class="recommend-city">
        <div class="gprs-city">
          <div class="city-index-title">GPS定位你所在城市</div>
          <ul class="city-index-detail cleanfix">
            <li class="city-item-detail city-item-detail-gprs">
              <div class="city-item-text">定位失败</div>
            </li>
          </ul>
        </div>

        <div class="hot-city">
          <div class="city-index-title">热门城市</div>
          <ul class="city-index-detail cleanfix">
            <li class="city-item-detail"
            v-for="item in city"
            :key="item"
            >
              <div class="city-item-text">{{item}}</div>
            </li>
          </ul>
        </div>
      </div>
   
         <!-- 城市组件 -->
      <van-index-bar :index-list="indexList"   sticky-offset-top=100 highlight-color="#666666">
        <div v-for="(data,index) in dataList" :key="index">
          <p><van-index-anchor :index="data.index" /></p>
          <van-cell
            @click="handleClick(item)"
            :key="index"
            v-for="(item,index) in data.list"
            :title="item.name"
          />
        </div>
      </van-index-bar>
      
      
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapMutations } from "vuex";
import { instance } from "@/utils/http";
import { IndexBar, IndexAnchor, Cell, Search, Icon } from "vant";

Vue.use(Icon);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
Vue.use(Search);

export default {
  data () {
    return {
      dataList:[],
      indexList:[],
      scrollHeight:0,
      city:["北京","上海","广州","深圳"]
    }
  },
  created() {
    instance("/gateway?k=6077446", {
      headers: {
        "X-Host": "mall.film-ticket.city.list"
      }
    }).then(res => {
      this.dataFilter(res.data.data.cities);
    });
  },
  methods: {
    ...mapMutations("city", ["setCityName", "setCityId"]),
    tagcinema() {
      this.$router.push("/cinema");
    },
    handleClick(item) {
      // 修改vuex的共享状态 城市数据
      this.setCityName(item.name);
      this.setCityId(item.cityId);
      this.$router.push("/cinema");
    },
    dataFilter(cities) {
      // 生成26字母
      const letterArr = [];
      for (var i = 65; i < 91; i++) {
        letterArr.push(String.fromCharCode(i));
      }
      // filtr 遍历26个字母，跟cities数据.pinyin.首字母.大写 进行过滤
      var cityArr = [];
      for (var j = 0; j < letterArr.length; j++) {
        const tempArr = cities.filter(
          item => item.pinyin.substring(0, 1).toUpperCase() === letterArr[j]
        );
        if (tempArr.length > 0) {
          cityArr.push({
            index: letterArr[j],
            list: tempArr
          });
          // 设置右侧自定义索引里面push请求回来的英文字母
          this.indexList.push(letterArr[j]);
        }
      }
      // 给左侧遍历的数据赋值
      this.dataList = cityArr;
    }
    
  }
};
</script>

<style lang="scss" scoped>
.city-title {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.44rem;
  z-index: 1000;
  line-height: 0.44rem;
  background: #fff;
  .title-right {
    width: 2.7rem;
    height: 0.44rem;
    text-align: center;
    float: left;
    font-size: 0.17rem;
    color: #191a1b;
  }
  .title-left {
    width: 0.53rem;
    height: 0.44rem;
    float: left;
    text-align: center;
    font-size: 0.16rem;
    .city-sousuo {
      width: 10rem;
    }
  }
}
.city-input {
  position: fixed;
  top: 0.44rem;
  z-index: 1000;
}
.van-search {
  width: 3.75rem;
  background-color: #fff;
}
.citycontent{
  position: relative;
  top: 1rem;
  p{
    color: #797d82;
    background: #f4f4f4;
  }
  span{
  color: #191A1b;
  }
}

.recommend-city{
  width: 3.58rem;
  height: 2.08rem;
  .gprs-city{
    width: 3.43rem;
    height: .44rem;
    margin: auto;
    margin-top: .2rem;
    .city-index-title{
    font-size: .13rem;
    color: #797d82;
    margin-bottom: .10rem;
    }
  }
  .hot-city{
    margin: auto;
    width: 3.43rem;
    height: 1.19rem;
    margin-top: .4rem;
    li{
      float: left;
    }
  }
}
.city-item-text{
  width: .99rem;
  height: .3rem;
  margin: .075rem .075rem;
  color: #191a1b;
  font-size: .14rem;
  text-align: center;
  line-height: .3rem;
  background: #f4f4f4;
}
 
</style>
