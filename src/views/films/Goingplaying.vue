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
        <p class="actors">主演：{{film.actors | actorFilter}}</p>
        <p>上映日期：{{film.premiereAt | dayFilter}}</p>
      </div>
    </router-link>
    <div class="no-more">- 无更多电影 -</div>
  </ul>
</template>

<script>
import Vue from "vue";
import { instance } from "@/utils/http";
import dayFilter from "@/utils/filters";

export default {
  data() {
    return {
      films: []
    };
  },
  created() {
    instance
      .get("/gateway?cityId=440500&pageNum=1&pageSize=10&type=2&k=5149085", {
        headers: {
          "X-Host": "mall.film-ticket.film.list"
        }
      })
      .then(res => {
        console.log(res.data.data);
        this.films = res.data.data.films;
      });
  }
};
</script>

<style lang="scss" scoped>
h4{
  margin-bottom: .2rem;
}
</style>
