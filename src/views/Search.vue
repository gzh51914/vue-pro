<template>
    <div class="search">
        <div class="query">
             <!-- 搜索组件 -->
            <van-search
                v-model="mytext"                            
                show-action                                
                autofocus="true"
                placeholder="搜索影院..."
                @cancel="handleChangepage"
            />

            <div v-show="mytext">
                <!-- 搜索的内容 -->
                <ul v-if="searchDatalist.length">
                    <CinemaItem
                        v-for="data in searchDatalist"
                        :key="data.cinemaId"
                        :data="data"
                    ></CinemaItem>
                </ul>
                <!-- 找不到影院提示 -->
                <div class="no-cinema" v-else>
                    <img class="no-cinema-img" src="/sousuo.png" alt="">
                    <p>没有找到匹配的影院</p>
                    <p>提示：仅支持搜索“影院”，建议您检查输入的影院名称是否有误？ </p>
                </div>
            </div>
        </div>
        <!--距离最近-->
        <div v-show="!mytext" class="distance">
            <p>离你最近</p>
            <van-list>
                <van-cell 
                    v-for="data in topDataList" 
                    :key="data.cinemaId" 
                    :title="data.name" 
                    @click="clickMe(data.cinemaId)"
                    :label="data.address"
                />
            </van-list>
        </div>
    </div>
</template>

<script>
import CinemaItem from "./Cinema/CinemaItem"
import {mapState,mapGetters,mapActions,mapMutations} from "vuex"
import Vue from 'vue';
import { Search,List,Cell } from 'vant';
Vue.use(Search);
Vue.use(List).use(Cell)
export default {
    components:{
        CinemaItem
    },
    data(){
        return {
            mytext:""
        }
    },
    methods:{
        clickMe(cinemaId){
            this.$router.push(`/cinema/${cinemaId}/film`)
        },
        ...mapActions("cinema",["getCinemaActions"]),
        ...mapMutations("tabbar",["hide","show"]),
        handleChangepage(){
            this.$router.back()
        }
    },
    computed:{
        ...mapState("cinema",["cinemaList"]),
        ...mapGetters("cinema",["topDataList"]),
        searchDatalist(){
            return this.cinemaList.filter(item=>item.name.includes(this.mytext) ||
                item.name.toUpperCase().includes(this.mytext.toUpperCase()) ||
                item.name.toLowerCase().includes(this.mytext.toLowerCase())    
            )
        }
    },
    mounted(){
        this.hide()
        if(this.cinemaList.length>0){
            // console.log("search-直接使用缓存vuex的数据...")
        }else{
            // this.$store.dispatch("cinema/getCinemaActions")
            this.getCinemaActions()
        }
    },
    destroyed(){
        // this.$store.commit("tabbar/show")
        this.show()
    }
}
</script>

<style lang="scss" scoped>
    .search{
        .no-cinema{
            position: fixed;
            top: 32%;
            left: 50%;
            transform: translate(-50%,-50%);
            text-align: center;
            color:#bdc0c5;
            font-size: 12px;
            img{
                width: 90px;
                height: 90px;
                margin:auto;
            }
        }
    }
    .distance{
        padding-left:10px;
        p{
            font-size: 13px;
            line-height: 13px;
            color: #bdc0c5;
            margin: 18px 0;
        }
        .van-cell__title{
            width: 3.33rem;
            height:.44rem;
            background: rgba(245,245,245,0.6);
            padding-left: .1rem;
            .van-cell__label{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        
    }
</style>
