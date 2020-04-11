<template>
    <div class="login">
        <form @submit.prevent="login">
            <van-field v-model="username" label="用户:" placeholder="admin" />
            <van-field v-model="password" type="password" label="密码:" placeholder="admin" />
            <van-button type="primary" @click="reg">注册</van-button>
            <van-button type="primary" @click="login">登录</van-button>
        </form>
    </div>
</template>

<script>
import Vue from 'vue'
import { Button, Field, Dialog } from 'vant'


import { instance2 } from "@/utils/http"
Vue.use(Button)
Vue.use(Field)

export default {
  data () {
    return {
      username:'',
      password:'',
      msg:''
    }
  },
  methods:{
    reg(){
      if (!this.username.trim() || !this.password.trim()) {
        Dialog({
          message: "用户名或者密码必须要填！",
          closeOnClickOverlay:true
        })
        return
      }

    },
    login () {
      if (!this.username.trim() || !this.password.trim()) {
        Dialog({
          message: "用户名或者密码必须要填！",
          closeOnClickOverlay:true
        })
        return
      }
      instance2.post("/api/login", {
        username:this.username,
        password:this.password
      }).then(res => {
        // 将token保存到本地存储里面去
        localStorage.setItem("token", res.token)
        // 跳转到个人中心
        this.$router.replace("/center")
      }).catch(err => {
        Dialog({ message: err, closeOnClickOverlay:true })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

    .login{
        padding: 10px;
        margin-top:1.46rem;
        text-align: center;
        button{
            width:30%;
            margin-top:10px;
            margin-right: .2rem;
        }
    }
</style>
