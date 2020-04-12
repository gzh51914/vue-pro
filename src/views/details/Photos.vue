<template>
  <div class="photo">
    <slot></slot>
    <ul>
      <li v-for="(data,index) in list" :key="index">
        <van-image width="1.24rem" height="100%" :src="data" @click="previewImg(index)" />
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import {ImagePreview} from "vant";

Vue.use(ImagePreview);
export default {
  props: ["list"],
  methods: {
    previewImg(index) {
      ImagePreview({
        images: this.list,
        startPosition: index,
        closeable: true,
        closeIconPosition: "top-left"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.photo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: #fff;
  z-index: 10;
  overflow-y: auto;
  ul {
    position: relative;
    top: 0.46rem;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 33.3333%;
      height: 1.24rem;
      text-align: center;
    }
  }
}
</style>
