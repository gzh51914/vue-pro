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
import { mapState } from "vuex";
import dayFilter from "@/utils/filters";

export default {
  data() {
    return {
      films: []
    };
  },
    computed:{
    ...mapState("city",["cityId"])
  },
  created() {
    instance
      .get(`/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=2&k=5149085`, {
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

<style lang="scss" scoped>
h4 {
  margin-bottom: 0.2rem;
}
</style>
