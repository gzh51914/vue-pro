<template>
  <div>
    <van-icon
      class-prefix="my-icon"
      name="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
      size="30"
    />
    <m-title :title="detail.name" v-title="10" @back="handleBack"></m-title>
    <img :src="detail.poster" alt />
    <div class="film-content">
      <h4>
        {{detail.name}}
        <span>{{detail.filmType ? detail.filmType.name:""}}</span>
      </h4>
      <p>{{category}}</p>
      <p>{{detail.premiereAt | dateFilter}}上映</p>
      <p>{{detail.nation}} | {{detail.runtime}}分钟</p>
      <p class="synopsis" :class="{synopsisall:isActive}">{{detail.synopsis}}</p>
      <div @click="isActive=!isActive">
        <img :class="{upimg:!isActive}" src="../assets/detail-down.png" alt />
      </div>
      <p class="grade" v-if="detail.grade">
        <span>{{detail.grade}}</span> 分
      </p>
    </div>
    <van-cell-group>
      <van-cell title="演职人员" />
      <ul class="roll" v-if="detail.actors">
        <li v-for="data in detail.actors" :key="data.name">
          <van-image
            width=".85rem"
            height=".85rem"
            fit="contain"
            :src="data.avatarAddress"
            lazy-load
          />
          <p>{{data.name}}</p>
          <span>{{data.role}}</span>
        </li>
      </ul>
      <div v-else>暂无演职人员</div>
    </van-cell-group>

    <van-cell-group class="photos">
      <van-cell title="剧照" is-link :value="photolength" @click="isPhotoShow=true" />
      <ul class="roll" v-if="detail.photos">
        <li v-for="(data,index) in detail.photos" :key="index">
          <van-image width="1.5rem" :src="data" lazy-load @click="previewImg(index)" />
        </li>
      </ul>
      <div v-else>暂无剧照</div>
    </van-cell-group>
    <van-button v-if="detail.isSale" type="primary" size="large" color="#ff5f16">选座购票</van-button>

    <Photo v-show="isPhotoShow" :list="detail.photos">
            <m-title @back="handlePhoto" :title="photolength">
            </m-title>
        </Photo>
  </div>
</template>

<script>
import Vue from "vue";
import { instance } from "@/utils/http";
import dateFilter from "@/utils/filters";
import Photo from '@/views/details/Photos'
import { Cell, CellGroup, Image, Lazyload, ImagePreview, Button,Icon } from "vant";

Vue.use(Cell)
  .use(CellGroup)
  .use(Image)
  .use(Lazyload)
  .use(ImagePreview)
  .use(Button).use(Icon);

Vue.directive("title",{
    inserted(el,binding){
        el.style.opacity = "0"
        el.style.transition = "all 1s"
        window.onscroll = ()=>{
            if((document.body.scrollTop || document.documentElement.scrollTop)>binding.value){
                el.style.opacity = "1"
            }else{
                el.style.opacity = "0"
            }
        }
    },
    unbind(){
        window.onscroll = null
    }
})

export default {
  components:{
        Photo
    },
  data() {
    return {
      isActive: true,
      detail: [],
      category: [],
      photolength: "",
      isPhotoShow:false
    };
  },
  methods: {
    previewImg(index) {
      ImagePreview({
        images: this.detail.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: "top-left",
      })
    },
    handleBack(){
      this.$router.back()
    },
    handlePhoto(){
            this.isPhotoShow = false
        }
  },
  created() {
    instance
      .get(`/gateway?filmId=${this.$route.params.id}&k=7477721`, {
        headers: {
          "X-Host": "mall.film-ticket.film.info"
        }
      })
      .then(res => {
        this.detail = res.data.data.film;
        this.category = this.detail.category.split("|").join(" | ");
        this.photolength = "全部(" + this.detail.photos.length + ")";
      });
  }
};
</script>

<style lang="scss" scoped>
.my-icon {
  position: fixed;
  top: 0.08rem;
  left: 0.02rem;
}
img {
  width: 100%;
}
.film-content {
  // height: 1.89rem;
  background: #fff;
  padding: 0.12rem 0.15rem 0.15rem;
  position: relative;
  overflow: hidden;
  h4 {
    color: #000;
    font-size: 0.18rem;
    margin-right: 0.07rem;
    span {
      font-size: 0.09rem;
      color: #fff;
      background-color: #d2d6dc;
      height: 0.14rem;
      line-height: 0.14rem;
      padding: 0 0.02rem;
      border-radius: 0.02rem;
    }
  }
  p {
    margin-top: 0.06rem;
    font-size: 0.13rem;
  }
  .synopsis {
    margin-top: 0.12rem;
    line-height: 0.2rem;
  }
  .synopsisall {
    height: 0.42rem !important;
    overflow: hidden;
    transition: width 2s;
    -moz-transition: width 2s; /* Firefox 4 */
    -webkit-transition: width 2s; /* Safari 和 Chrome */
  }
  .upimg {
    transform: rotate(180deg);
  }
  .grade {
    font-size: 0.12rem;
    color: #ffb232;
    position: absolute;
    top: 0.06rem;
    right: 0.15rem;
    span {
      font-size: 0.18rem;
      font-style: italic;
    }
  }
  div {
    height: 0.15rem;
    width: 100%;
    padding-top: 0.07rem;
    background: #fff;
    position: relative;
    z-index: 10;
    img {
      width: 0.08rem;
      margin: 0 auto;
    }
  }
}
.photos {
  height: 2rem !important;
}
.van-cell-group {
  margin-top: 0.1rem;
  height: 1.8rem;
  overflow: hidden;

  .roll {
    display: flex;
    height: 2rem;
    margin: 0 0.15rem;
    overflow-x: scroll;
    li {
      float: left;
      margin-right: 0.1rem;
      white-space: nowrap;
      p,
      span {
        text-align: center;
        font-size: 0.12rem;
        margin-top: 0.02rem;
      }
      p {
        color: #191a1b;
      }
      span {
        display: block;
      }
    }
  }
}
.van-button {
  position: fixed;
  bottom: 0;
}
</style>