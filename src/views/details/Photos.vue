<template>
    <div class="photo">
        <slot></slot>
        <ul>
            <li v-for="data in list" :key="data">
                <img :src="data" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:["list"]
}
</script>

<style lang="scss" scoped>
    .photo{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        min-height:100%;
        background: #fff;
        z-index:10;
        overflow-y: auto;
        ul{
            position: relative;
            top:.46rem;
            display: flex;
            flex-wrap: wrap;
            li{
                width:33.3333%;
                height:1.24rem;
                text-align: center;
                img{
                    width:1.24rem;
                    height: 100%;
                }
            }
        }
    }
</style>
