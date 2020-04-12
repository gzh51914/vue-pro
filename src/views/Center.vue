<template>
  <div class="content">
      <div class="top">
        <ul class="login" @click="login()">
          <i></i>
          <span>立即登录</span>
        </ul>   
      </div>
      <div class="order">
        <ul>
          <van-icon name="coupon" size="30" color="orange" />
          <span>电影订单</span>
        </ul>
         <ul>
          <van-icon name="balance-list" size="30" color="#CCFF66" />
          <span>商品订单</span>
        </ul>
      </div>

      <van-cell title="卖座券" icon="credit-pay" color="red" is-link />
      <van-cell title="组合红包" icon="bill-o" is-link  />
      <van-cell title="余额" icon="balance-o" is-link  value="￥0" />
      <van-cell title="设置" icon="setting-o" is-link  />
  </div>
</template>

<script>
import Vue from 'vue';
import { Cell, CellGroup,Icon } from 'vant';
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
export default {
    methods:{
    login() {
      this.$router.push(`/login`)
    },
    
  },
}
</script>

<style lang="scss" scoped>
.body{
  width: 100%;
  height: 100%;
  background: #f4f4f4!important;
}
.content{
  background: #f4f4f4!important;
  .top{
    height: 2rem;
    background: url(../images/login_bg.png) no-repeat center;
    background-size: 100% 100%;
    .login{
      display: flex;
      align-items: center;
      padding: .8rem 0 0 .6rem;
      i{
        display: block;
        width: .67rem;
        height: .67rem;
        border-radius: 50%;
        background: cornsilk;
        margin-right: .2rem;
      }
      span{
        color: #ffffff;
        font-size: .16rem;
      }
    }
    
  }
  .order{
      height: .8rem;
      background: #ffffff;
      display: flex;
      justify-content: space-around;
      padding: .2rem 0 0;
      margin: 0 0 .1rem;
      ul{
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
      }
    }
  }
</style>