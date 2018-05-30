<template>
    <div id="brand">
       <div class="brand_top" ref="top">
            <span class="iconfont icon-jiantou21 toback" @click="toback"></span>
            <span class="title">品牌</span>
            <span class="iconfont icon-gouwudai gouwudai" @click="$router.push('/shopcar')"></span>
        </div>
        <div class="brand_main" ref="brands">
                <transition-group  tag="ul" name="list" >
                        <li v-for="(value,index) in list" :style="{transitionDuration:`${index*0.5}s`}" :key="index" v-show="isShow" >
                            <div  class="brand_item" v-for="(value,index) in imgs" >
                                <div class="img">
                                    <img :src="value" alt=""/>
                                </div>
                            </div>
                        </li>
                </transition-group>
            </li>
        </div>
    </div>
</template>

<script type="text/javascript">
    import './brand.scss'
    export default {
        data(){
            return {
                title: 'brand',
                isShow:false,
                list:7,
                imgs:['https://img20.360buyimg.com/tuangou/jfs/t14938/282/2227590300/15275/dcee14ff/5a827953N6d53c60a.jpg','https://img11.360buyimg.com/tuangou/jfs/t16276/21/1486560180/17067/307a3135/5a574444Nf9f00416.jpg','https://img20.360buyimg.com/tuangou/jfs/t16141/41/1249593498/24804/46f1adac/5a4e235bN41e09e7f.jpg']
            }            
        },
        mounted(){
            this.isShow=true;   

            this.$store.commit('tabChange')
        },
        methods:{
            toback(){
                window.history.back();
            }
        }
    }
</script>