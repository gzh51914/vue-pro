<template>
  <ul>
    <router-link
      v-for="film in films"
      :key="film.filmId"
      :to="{
             name:'detail',
             params:{id:film.filmId}
            }"
      tag="li"
    >
      <img :src="film.poster" alt />
      <div>
        <h4>
          {{film.name}}
          <span>{{film.item.name}}</span>
        </h4>
        <p>
          观众评分
          <span class="grade">{{film.grade}}</span>
        </p>
        <p class="actors">主演：{{film.actors | actorFilter}}</p>
        <p>{{film.nation}} | {{film.runtime}}分钟</p>
      </div>
      <van-button color="#ff5f16" plain hairline>购票</van-button>
    </router-link>
    <div class="no-more">- 无更多电影 -</div>
  </ul>
</template>

<script>
import Vue from "vue";
import actorFilter from "@/utils/filters";

import { instance } from "@/utils/http";
import { Button } from "vant";

Vue.use(Button);

export default {
  data() {
    return {
      films: []
    };
  },
  created() {
    instance
      .get("/gateway?cityId=440500&pageNum=1&pageSize=10&type=1&k=4458734", {
        headers: {
          "X-Host": "mall.film-ticket.film.list"
        }
      })
      .then(res => {
        this.films = res.data.data.films;
      });
  }
};
</script>

<style lang="scss">
.van-tabs__content {
  li {
    height: 1.24rem;
    padding: 0.16rem 0.15rem;
    background: #fff;
    margin-top: 0.01rem;
    position: relative;
    img {
      width: 0.66rem;
      float: left;
    }
    div {
      float: left;
      margin-left: 0.1rem;
      width: 2.2rem;
      font-size: 0.13rem;
      h4 {
        margin-top: 0.06rem;
        font-size: 0.16rem;
        color: #000;
        span {
          font-size: 0.09rem;
          color: #fff;
          background: #d2d6dc;
          line-height: 0.1rem;
          border-radius: 0.02rem;
          padding: 0 0.02rem;
        }
      }
      p {
        margin-top: 0.02rem;
      }
      .grade {
        color: #ffb232;
        font-size: 14px;
      }
      .actors {
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .no-more {
    height: 59px;
    background-color: #ededed;
    color: #bdc0c5;
    font-size: 13px;
    text-align: center;
    margin: auto;
    line-height: 59px;
  }
  .van-button {
    display: block;
    height: 0.26rem;
    line-height: 0.26rem;
    padding: 0 0.11rem;
    margin-top: 0.3rem;
    font-size: 0.12rem;
  }
}
</style>
