<template>
    <div id="brand_imgtype">
        <div class="brand_imgtype_top">
            <span class="iconfont icon-jiantou21 toback" @click="toback"></span>
            <img :src="$store.state.brandsData[$route.params.brand]['brand_img']" alt="" />
        </div>
        <div class="brand_imgtype_main">
            <img :src="value['img']" alt="" v-for="(value,index) in $store.state.brandsData[$route.params.brand]['brand_cont']['imgs']" :key="index" />
        </div>
    </div>
</template>

<script>
    import './brand_imgtype.scss'
    export default{
        data(){
            return{
            }
        },
        mounted(){
            console.log(this.$route.params.brand,this.$store.state.brandsData);
        },
        methods:{
            toback(){
                window.history.back();
            }
        }
    }
</script>