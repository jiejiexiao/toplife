<template>
    <div id="owner"  >
      <div class="owner_top">
        <span class="iconfont icon-jiantou21 toback" @click="toback()"></span>
        <span v-if="!scroll_active">个人中心</span>
        <span  v-if="scroll_active"><img :src="this.$store.state.login.login_name != '' ? 'https://storage.360buyimg.com/i.imageUpload/6a645f3461616237653364633863613831343436333536373935343430_big.jpg': 'https://static.360buyimg.com/tp-statics/2018-5-25/m/img/no_photo@2x.png' "/></span>
        <router-link  to=""><i class="iconfont icon-iconset0317"></i></router-link>
      </div>
      <div class="owner_main" @scroll="handleScroll">
          <div class="owner_first">
                <router-link to="">
                    <i class="icon-qianbao iconfont"></i>
                    我的钱包
                </router-link>
                <router-link :to="this.$store.state.login.login_name != '' ? '/account' :'/login' ">
                    <img :src="this.$store.state.login.login_name != '' ? 'https://storage.360buyimg.com/i.imageUpload/6a645f3461616237653364633863613831343436333536373935343430_big.jpg': 'https://static.360buyimg.com/tp-statics/2018-5-25/m/img/no_photo@2x.png' " />
                </router-link>
                <router-link :to="this.$store.state.login.login_name != '' ? '/account' :'/login'" >
                    <i class="icon-xiaoxi iconfont"></i>
                    个人信息
                </router-link>
          </div>
          <div class="owner_second">
              <router-link :to="this.$store.state.login.login_name != '' ? '/account' :'/login' ">
             
                  {{this.$store.state.login.login_name != '' ?this.$store.state.login.login_name: '立即登录' }}
              </router-link>
                <p> {{this.$store.state.login.login_name != '' ?'您是银卡会员': '登录后可查看您的会员等级及权益 ' }}</p>
                  <p> {{this.$store.state.login.login_name != '' ?'再消费20000元或单笔满10000元可升级为金卡会员': '' }}</p>
          </div>
          <div class="owner_third">
              <router-link to=""><img src="https://static.360buyimg.com/tp-statics/2018-5-25/m/img/ic_express_silver@2x.png" alt="">京尊达</router-link>
              <router-link to=""><img src="https://static.360buyimg.com/tp-statics/2018-5-25/m/img/ic_fashion_consultant_silver@2x.png" alt="">时尚顾问</router-link>
              <router-link to=""><img src="https://static.360buyimg.com/tp-statics/2018-5-25/m/img/ic_pay_silver@2x.png" alt="">白条支付</router-link>
              <router-link to=""><img src="https://static.360buyimg.com/tp-statics/2018-5-25/m/img/ic_refund_silver@2x.png" alt="">极速退款</router-link>  
          </div>  
          <div class="owner_fourth">
              <span></span>
              <span></span>
              <ul>
                  <li>
                      <router-link to="/payorder"> <i class="iconfont icon-daizhifudingdan"></i>待支付</router-link>
                  </li>
                   <li>
                      <router-link to="/payorder"> <i class="iconfont icon-icon-test"></i>待收货</router-link>
                  </li>
                   <li>
                      <router-link to="/payorder"> <i class="iconfont icon-wuyoushouhou"></i>维修/售后</router-link>
                  </li>
                   <li>
                      <router-link to="/payorder"> <i class="iconfont icon-dingdan"></i>所有订单</router-link>
                  </li>
                   <li>
                      <router-link  :to="this.$store.state.login.login_name != '' ? '/showlike' :'/login' " > <i class="iconfont icon-shoucang"></i>收藏夹</router-link>
                  </li>
              </ul>
          </div>
          <div class="owner_fifth" v-show="showdata" >
              <h5>浏览记录</h5>
                <ul>
                  <li v-for="obj of watch_history" :key="obj.id"  @click=" turnDetail(obj)">
                      <router-link to="">
                          <img :src="obj.pic">
                          <h3>{{obj.brandName}}</h3>
                          <p>{{obj.name}}</p>
                          <h6>￥{{obj.price}}</h6>
                      </router-link>
                  </li>
                
              </ul>
           </div>  
      </div>
        <router-view></router-view>




    </div>
</template>

<script type="text/javascript">
import "./owner.scss";
//引入vuex模块
import { mapGetters, mapActions } from "vuex";
import http from '../../../utils/httpclient'
  
export default {
    data() {
        return {
        title: "owner",
        scroll_active:'',
        watch_history:[],
        showdata:false

        };
    },
    mounted(){
        this.$store.commit('tabChange')
        window.addEventListener('scroll', this.handleScroll,true);
        http.post('watch_history').then((res)=>{
            console.log(res);
            if(res.status){

                this.showdata=true;
                this.watch_history = res.data

            }
        })
    },
    methods:{
        toback(){
            window.history.back();
        },
        handleScroll (e) {
            //获得该盒子的滚动高度
            if(e.target.scrollTop > 150 ){
                this.scroll_active='actives'
            }else{
                 this.scroll_active=''
            }
        },
        turnDetail(obj){
            this.$store.commit('setDetailObj',obj);
            this.$router.push('/detailList');
        }
    }





};
</script>