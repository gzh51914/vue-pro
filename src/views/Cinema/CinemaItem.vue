<template>
<!-- 影院信息组件 -->
<li class="cinema-info">
            <div class="cinema-left">
             <h4>{{data.name}}</h4>
             <p>{{data.address}}</p>
            </div>

            <div class="cinema-price">
                <div class="price-top">
                    <span>￥</span>
                    <span class="interge" style="font-size: 15px;">{{Math.round(data.lowPrice)/100}}</span>
                    <span> 起</span>
                </div>
                <span >
                    <strong style="font-size: 12px; color:#797d82; padding: .05rem 0 0;">距离未知</strong>
                </span>
            </div>
</li>
    
</template>

<script>
export default {
    props:["data"],
    methods:{
        clickli(){
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss" scoped>
    .cinema-info {
    width: 3.75rem;
    height: .7rem;
    position: relative;
    background-color: #fff;
    padding: 15px;
    border-bottom: 0.01rem solid #f5f5f5;
    .cinema-left{
      width: 2.12rem;
      float: left;
      
      h4{
        font-size: .15rem;
        color: #191a1b;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p{
        font-size: .12rem;
        color:#797D82;
        padding: .05rem 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
         white-space: nowrap;
      }
    }
    .cinema-price{
      float:right;
      .price-top{
          width: .58rem;
          height: .22rem;
         color: #ff5f16;
         text-align: left;
         font-size: .12rem;
         .interge{
             font-size: .15rem;
         }
      }
     
    }
  }
</style>