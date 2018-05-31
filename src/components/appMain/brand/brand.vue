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
                            <div  class="brand_item" v-for="(value,key) in $store.state.brandsData" :key="key" @click="to_cont(key,value['type'])">
                                <div class="img" >
                                    <img :src="value['brand_logo']" alt="" />
                                </div>
                            </div>
                        </li>
                </transition-group>
        </div>
    </div>
</template>
<script type="text/javascript">
    import './brand.scss'
    import http from '../../../utils/httpclient'
    export default {
        data(){
            return {
                title: 'brand',
                isShow:false,
                list:7
            }            
        },
        mounted(){
            this.isShow=true;   
            this.$store.commit('tabChange');
        },
        methods:{
            toback(){
                window.history.back();
            },
            to_cont(key,type){
                if(type=='imgcont'){
                    this.$router.push('/brand_imgtype/'+key);
                }else if(type=='goodscont'){
                    this.$router.push('/brand_goodscont/'+key);
                }
            }
        }
    }
</script>