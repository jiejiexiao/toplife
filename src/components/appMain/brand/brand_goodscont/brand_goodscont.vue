<template>
    <div id="brand_goodscont">
        <div class="brand_goodscont_top" ref="top">
            <span class="iconfont icon-jiantou21 toback" @click="toback"></span>
            <img :src="$store.state.brandsData[$route.params.brand]['brand_img']" alt="" v-if="isShow"/>
            <div class="brand_search" v-else>
                <span class="iconfont icon-sousuo"></span>
                <span class="text">搜索店铺内商品</span>
            </div>
            <span class="iconfont icon-fenlei fenlei"></span>
            <span class="more"></span>
        </div>
        <div class="brand_goodscont_main" ref="main_cont">
            <div class="brand_goodscont_banner">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" data-swiper-autoplay="2000" v-for="(value,index) in $store.state.brandsData[$route.params.brand]['brand_cont']['imgs']" :key="index" >
                            <img :src="value['img']"/>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class="brandstory">
                <img :src="value" alt="" v-for="(value,key) in $store.state.brandsData[$route.params.brand]['brand_cont']['brandstory']" :key="key"/>
            </div>
            <div class="new">
                <img :src="value" alt="" v-for="(value,key) in $store.state.brandsData[$route.params.brand]['brand_cont']['new']" :key="key"/>
            </div>
        </div>
        <div class="brand_nav">
            <div class="brand_nav_item" v-for="(value,index) in $store.state.brandsData[$route.params.brand]['brand_cont']['types']" :key="index">
                <span>{{value}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import './brand_goodscont.scss'
    export default{
        data(){
            return{
                isShow:true
            }
        },
        mounted(){
            // this.$refs.main_cont.addEventListener('scroll',(e)=>{
            //     e.preventDefault();
            //     let scrollTop=this.$refs.main_cont.scrollTop;
            //     if(scrollTop >= this.$refs.top.offsetHeight){
            //         this.isShow=false; 
            //         this.$refs.top.classList.remove('brand_goodscont_top');
            //         this.$refs.top.classList.add('top_scroll');
            //     }else{
            //         this.isShow=true; 
            //         this.$refs.top.classList.add('brand_goodscont_top');
            //         this.$refs.top.classList.remove('top_scroll');
            //     }
            // })
        },
        updated(){
            var mySwiper = new Swiper ('.swiper-container',{
                direction: 'horizontal',
                loop: true,
                paginationClickable:true,
                autoplay: {
                    disableOnInteraction:false,
                },
                pagination: {
                  el: '.swiper-pagination'
                }
            }) 
            // this.$refs.main_cont.addEventListener('scroll',(e)=>{
            //     e.preventDefault();
            //     let scrollTop=this.$refs.main_cont.scrollTop;
            //     if(scrollTop >= this.$refs.top.offsetHeight){
            //         this.isShow=false; 
            //         this.$refs.top.classList.remove('brand_goodscont_top');
            //         this.$refs.top.classList.add('top_scroll');
            //     }else{
            //         this.isShow=true; 
            //         this.$refs.top.classList.add('brand_goodscont_top');
            //         this.$refs.top.classList.remove('top_scroll');
            //     }
            // })
        },
        methods:{
            toback(){
                window.history.back();
            }
        }
    }
</script>