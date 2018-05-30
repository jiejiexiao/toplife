<template>
    <div id="owner"  >
      <div class="owner_top">
        <span></span>
        <span v-if="!scroll_active">个人中心</span>
        <span  v-if="scroll_active"><img src="https://static.360buyimg.com/tp-statics/2018-5-25/m/img/no_photo@2x.png" alt=""></span>
        <router-link  to=""><i class="iconfont icon-iconset0317"></i></router-link>
      </div>
      <div class="owner_main" @scroll="handleScroll">
          <div class="owner_first">
                <router-link to="">
                    <i class="icon-qianbao iconfont"></i>
                    我的钱包
                </router-link>
                <router-link to="/login">
                    <img src="https://static.360buyimg.com/tp-statics/2018-5-25/m/img/no_photo@2x.png" alt="">
                </router-link>
                <router-link to="/account">
                    <i class="icon-xiaoxi iconfont"></i>
                    个人信息
                </router-link>
          </div>
          <div class="owner_second">
              <router-link to="/login">
                  立即登录
              </router-link>
                <p>登录后可查看您的会员等级及权益</p>
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
                      <router-link to=""> <i class="iconfont icon-daizhifudingdan"></i>待支付</router-link>
                  </li>
                   <li>
                      <router-link to=""> <i class="iconfont icon-icon-test"></i>待收货</router-link>
                  </li>
                   <li>
                      <router-link to=""> <i class="iconfont icon-wuyoushouhou"></i>维修/售后</router-link>
                  </li>
                   <li>
                      <router-link to=""> <i class="iconfont icon-dingdan"></i>所有订单</router-link>
                  </li>
                   <li>
                      <router-link to=""> <i class="iconfont icon-shoucang"></i>收藏夹</router-link>
                  </li>
              </ul>
          </div>
          <div class="owner_fifth" >
              <h5>量身推荐</h5>
                <ul>
                  <li>
                      <router-link to="">
                          <img src="https://img10.360buyimg.com/n1/s530x530_jfs/t21535/225/174004957/341478/2487590c/5b01745bNe5a891d0.jpg!q70.webp" alt="">
                          <h3>MARY KATRANTZOU</h3>
                          <p>条纹针织衫连衣裙 彩色 国际通用码</p>
                          <h6>￥3165</h6>
                      </router-link>
                  </li>
                  <li>
                      <router-link to="">
                          <img src="https://img10.360buyimg.com/n1/s530x530_jfs/t21535/225/174004957/341478/2487590c/5b01745bNe5a891d0.jpg!q70.webp" alt="">
                          <h3>MARY KATRANTZOU</h3>
                          <p>条纹针织衫连衣裙 彩色 国际通用码</p>
                          <h6>￥3165</h6>
                      </router-link>
                  </li>
                  <li>
                      <router-link to="">
                          <img src="https://img10.360buyimg.com/n1/s530x530_jfs/t21535/225/174004957/341478/2487590c/5b01745bNe5a891d0.jpg!q70.webp" alt="">
                          <h3>MARY KATRANTZOU</h3>
                          <p>条纹针织衫连衣裙 彩色 国际通用码</p>
                          <h6>￥3165</h6>
                      </router-link>
                  </li>
                    <li>
                      <router-link to="">
                          <img src="https://img10.360buyimg.com/n1/s530x530_jfs/t21535/225/174004957/341478/2487590c/5b01745bNe5a891d0.jpg!q70.webp" alt="">
                          <h3>MARY KATRANTZOU</h3>
                          <p>条纹针织衫连衣裙 彩色 国际通用码</p>
                          <h6>￥3165</h6>
                      </router-link>
                  </li>
                  <li>
                      <router-link to="">
                          <img src="https://img10.360buyimg.com/n1/s530x530_jfs/t21535/225/174004957/341478/2487590c/5b01745bNe5a891d0.jpg!q70.webp" alt="">
                          <h3>MARY KATRANTZOU</h3>
                          <p>条纹针织衫连衣裙 彩色 国际通用码</p>
                          <h6>￥3165</h6>
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
  
export default {
    data() {
        return {
        title: "owner",
        scroll_active:''
        };
    },
    mounted(){
        window.addEventListener('scroll', this.handleScroll,true);
    },
    methods:{
        handleScroll (e) {
            //获得该盒子的滚动高度
            if(e.target.scrollTop > 150 ){
                this.scroll_active='actives'
            }else{
                 this.scroll_active=''
            }
        }
    }





};
</script>