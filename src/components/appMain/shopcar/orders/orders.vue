<template>
    <div id="orders">
        <div class="orders_top">
             <router-link to="/">  <i class="icon-jiantou-copy iconfont"></i></router-link>
            <span>填写订单</span>
            <span></span>
        </div>
        <div class="orders_mian" @scroll="handleScroll">
            <h2>商品与配送</h2>
            <div class="order_second">
                <div class="order_second_top" v-if="showdata != {}">
                    <i class="iconfont icon-dingwei1"></i>
                    <div class="order_second_main" >
                        <h2><span>{{this.showdata['receiver'] ? showdata.receiver :' '}}</span><span>{{this.showdata['receiver'] ? showdata.ipNumber:''}}</span><i>默认</i></h2>
                        <p> {{this.showdata['receiver'] ? (showdata.city + showdata.address_detail) : '请先添加地址'}}</p>
                    </div> 
                    <a v-show="this.showdata['receiver']"><i class="iconfont icon-jiantou5"></i></a>
                     <a  v-show="!this.showdata['receiver']" @click="changepthan"><i class="iconfont icon-jiantou5"></i></a>
                </div>
                
                <div class="order_second_bottom">
                     
                    <div class="order_second_miant">
                        <span>配送</span>
                        <p>TOPLIFE配送 <span>￥0.00</span></p>
                        <p>2018-6-3[周日] 09:00-19:00<span>￥0.00</span></p>
                          <router-link to=""><i class="iconfont icon-jiantou5"></i></router-link>
                    </div>

                </div> 
            </div>
            <div class="order_three">
                <div class="order_mian">
                    <div class="order_mian_l">
                        <ul>
                            <li v-for="obj of orders_new.shopcar_goods" :key="obj.id">
                                <img :src="obj.pic"/>
                                <span>X{{obj.qty}}</span>
                            </li>
                        </ul>


                    </div>
                      <div class="order_mian_r">
                          <span>共 <i>{{orders_new.total_qty}}</i>件</span>
                          <router-link to=""><i class="iconfont icon-jiantou5"></i></router-link>
                      </div>
                </div>
                <h2>
                    <span>共{{orders_new.total_qty}}件商品</span>

                    <span>小计：<i>￥{{orders_new.total_price}}</i></span>
                </h2>
            </div>
      
             <h2>支付信息</h2>
             <div class="order_five">
                 <h2><span>支付<i>在线支付</i></span>  <router-link to=""><i class="iconfont icon-jiantou5"></i></router-link></h2>
                 <h2><span>优惠卷<i>无可用</i></span>  <router-link to=""><i class="iconfont icon-jiantou5"></i></router-link></h2>
                 <h2><span>发票<i>个人-商品明细</i></span>  <router-link to=""><i class="iconfont icon-jiantou5"></i></router-link></h2>
             </div>
                <h2>支付金额</h2>
            <div class="order_six">
                <div class="order_six_top">
                    <h3>商品金额： <span>+￥{{orders_new.total_price}}</span></h3>
                    <h4>运费： <span>+￥0.00</span></h4>
                </div>
                <h2>合计：<i>￥</i><span>{{orders_new.total_price}}</span></h2>
            </div>

        </div>
         <h1 v-show="scroll_active"><i class="iconfont icon-dingwei1"></i> {{this.showdata['receiver'] ? (showdata.city + showdata.address_detail) : '请先添加地址'}}</h1>
        <div class="orders_footer">
            <div class="orders_footer_l">
                <h2>共计：￥{{orders_new.total_price}}</h2>
                <h5>共{{orders_new.total_qty}}件商品</h5>
            </div>
            <a href="javascript:void(0);" @click="go_pay">提交订单</a>
        </div>

        <div class="overlay" v-show="should_pay" >
            <div class="del_tip"  v-show="show_sure">
                <div class="tip">确认要支付订单吗？</div>
                <div class="select">
                    <span class="cancel" @click="should_pay=false">取消</span>
                    <span class="confirm" @click="creade_order">确认</span>
                </div>
            </div>
            <div id="slide-wrapper" v-show="show_paybox">
                <div id="slider">
                    <span id="label"></span>
                    <span id="lableTip">滑动完成支付</span>
                </div>
            </div>
            <i class="icon-shanchu1  iconfont" v-show="show_paybox" @click="should_pay=false"></i>
        </div>
    </div>
</template>

<script type="text/javascript">
import "./orders.scss";
//引入vuex模块
import { mapGetters, mapActions } from "vuex";
import http from '../../../../utils/httpclient'
 import jquery from 'jquery'

export default {
  data() {
    return {
      scroll_active: "",
      //订单信息
      orders_new: {},
      showaddress: [],
      showdata: {},
      should_pay:false,
      show_paybox:false,
      order_id:'',
      show_sure:true
    };
  },
  mounted() {
    // console.log(this.showdata.length>0)
    window.addEventListener("scroll", this.handleScroll, true);
    this.orders_new = this.$store.state.orderData;
    console.log(this.orders_new)
    if (this.$store.state.address.addlist.length > 0) {
      this.showaddress = this.$store.state.address.addlist;
      this.showaddress.map(item => {
        if (item.status) {
          this.showdata = item;
        }
      });
    }
  },
  methods: {
    handleScroll(e) {
      //获得该盒子的滚动高度
      if (e.target.scrollTop > 150) {
        this.scroll_active = "actives";
      } else {
        this.scroll_active = ""; 
      }
    },
    changepthan() {
      this.$router.push({ name: "add_address" });

      this.$store.state.address.isorders = true;
    },
    go_pay(){
        this.should_pay= true;
          this.show_paybox=false;
           this.show_sure=true
    
    },
    creade_order(){
        let shopcar_goodsStr =JSON.stringify( this.orders_new.shopcar_goods);
           this.show_paybox = true;
          http.post('addToOrder',
          //生成订单
        {total_qty:this.orders_new.total_qty,total_price:this.orders_new.total_price,shopcar_goods:shopcar_goodsStr}).then((res)=>{
            this.show_sure = false;
            if(res){
                this.order_id = res.data;
            }else{
                alert('请重试')
            }
        })
          //滑动解锁
        var slider = new SliderUnlock("#slider", {}, ()=>{
            //滑动完成后的回调
            http.post('showOrder',{order_id: this.order_id}).then((res)=>{
                if(res.status){
                    this.$router.push({name:'payorder'});
                    //跳转
                    this.show_sure=true;
                    this.should_pay =false;
                      slider.reset();
                }
            })
        }, ()=>{});
        slider.init();
     
      
    }

  }
};
</script>