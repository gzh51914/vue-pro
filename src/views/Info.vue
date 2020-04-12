<template>
  <div class="top">
     <van-swipe :autoplay="3000" class="swipe">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>

      <span class="title">《宠爱》和最爱的人一起跨进2020 </span>
      <p class="content">《宠爱》表达的是人类和宠物碰撞在一起， 融入彼此生活， 告
别孤单温坍加倍， 每个故事中的人物都是由宠物连接在一起，
在宠物的帮助下去勇敢的表达， 教会他们如何去宠爱。</p>

      <van-divider>在家观影</van-divider> 
      <div>
        <li v-for="item in img" :key="item.id">
          <van-image
          fit="contain"
          :src="`${item.src}`"
         />
        </li>
      
     
    </div>
  </div>
 
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem,Lazyload,Divider,Image } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Divider);
Vue.use(Image);
export default {
   data() {
    return {
      images: [
        'https://static.maizuo.com/v5/upload/6928d6f40c89735b821e7fd570ace0fb.jpg',
        'https://static.maizuo.com/v5/upload/6928d6f40c89735b821e7fd570ace0fb.jpg'
      ],
      img:[
          {id:1,src:"https://static.maizuo.com/v5/upload/f2c75c342260d4cea4ada7c30f5509c4.jpg"},
          {id:2,src:"https://static.maizuo.com/v5/upload/b63ef678c7693903b0543a05ea125c4b.jpg"},
          {id:3,src:"https://static.maizuo.com/v5/upload/63a7b7074da02464dd7225ce0bea8949.jpg"},
          {id:4,src:"https://static.maizuo.com/v5/upload/ceb0304dc135189ff1fa5c89068a6b00.jpg"},
          {id:5,src:"https://static.maizuo.com/v5/upload/63a7b7074da02464dd7225ce0bea8949.jpg"},
          {id:6,src:"https://static.maizuo.com/v5/upload/b766598ec80dc6d5eb1c968d77a46e26.jpg"},
          {id:7,src:"https://static.maizuo.com/v5/upload/0f48f25f5e05a77f203cf745531eca24.jpg"},
          {id:8,src:"https://static.maizuo.com/v5/upload/7e0e1bb8d69468e87b7c9e95798091e3.jpg"},
          {id:9,src:"https://static.maizuo.com/v5/upload/c9404a230f9d6c58fdf49002f969c430.jpg"},
          {id:10,src:"https://static.maizuo.com/v5/upload/aedb91e5df9291afd824cf02b19f06f8.jpg"},
          {id:11,src:"https://static.maizuo.com/v5/upload/95431e5c713946978681a469a337e117.jpg"},
          {id:12,src:"https://static.maizuo.com/v5/upload/e75e6c060d2c640089c7c8f097fd66b3.jpg"},
          {id:13,src:"https://static.maizuo.com/v5/upload/cbbe7f5d429ea445b4fabe77fe796da9.jpg"},
          {id:14,src:"https://static.maizuo.com/v5/upload/05f4a4b410aa5820d6aa4b72c6f6a665.jpg"},
          {id:15,src:"https://static.maizuo.com/v5/upload/f905d63135a05bfc1e89423158567f22.jpg"},
          {id:16,src:"https://static.maizuo.com/v5/upload/bd5f9a8d73506615f88efb0715b01f4d.jpg"},
          {id:17,src:"https://static.maizuo.com/v5/upload/9dc24be7292122222e7120d869160d7d.jpg"},
          {id:18,src:"https://static.maizuo.com/v5/upload/f372d7078df42b2ca77b62d8e084bd4f.jpg"},
          {id:19,src:"https://static.maizuo.com/v5/upload/090cfb933c60e735f083055f96c84c6c.jpg"},
          {id:20,src:"https://static.maizuo.com/v5/upload/378ed44bc3979934ff81f15f27a072b5.jpg"},
          {id:21,src:"https://static.maizuo.com/v5/upload/7c95d46ef34e1f30fc5c0516a259356f.jpg"},
          {id:22,src:"https://static.maizuo.com/v5/upload/00bf2f3cfc52f5fa8becb90489d4f0c4.jpg"},
          {id:23,src:"https://static.maizuo.com/v5/upload/56914532065560857315539d19789426.jpg"},
          {id:24,src:"https://static.maizuo.com/v5/upload/7c95d46ef34e1f30fc5c0516a259356f.jpg"},
      ]
    } 
    
  }
}
</script>

<style lang="scss" scoped>

.top{
  padding: .1rem;
  padding-bottom: .44rem;
  .swipe{
    height: 1.9rem;
    img{
      max-width: 100%;
    }   
  }
  .title{
      font-size: .2rem;
      font-weight: bold;
  }
  .content{
    font-size: .12rem;
    margin-top: .25rem;
    color: #948f8f;
  }
}
  
</style>