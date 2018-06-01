<template>
    <div id="orders">
        <div class="orders_top">
             <router-link to="/shopcar">  <i class="icon-jiantou-copy iconfont"></i></router-link>
            <span>填写订单</span>
            <span></span>
        </div>
        <div class="orders_mian" @scroll="handleScroll">
            <h2>商品与配送</h2>
            <div class="order_second">
                <div class="order_second_top">
                    <i class="iconfont icon-dingwei1"></i>
                    <div class="order_second_main">
                        <h2><span>小花花</span><span>13106728392</span><i>默认</i></h2>
                        <p>广东省广州市天河区元岗路310号智汇园park创意园物流中心</p>
                    </div> 
                    <router-link to=""><i class="iconfont icon-jiantou5"></i></router-link>

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
                    <span>小计：<i>￥{{
                        orders_new.total_price.toFixed(2)}}</i></span>
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
         <h1 v-show="scroll_active"><i class="iconfont icon-dingwei1"></i> 广东省广州市天河区元岗路310号智汇园park创意园物流中心</h1>
        <div class="orders_footer">
            <div class="orders_footer_l">
                <h2>共计：￥{{orders_new.total_price}}</h2>
                <h5>共{{orders_new.total_qty}}件商品</h5>
            </div>
            <a href="javascript:viod(0);">提交订单</a>
        </div>



    </div>
</template>

<script type="text/javascript">
    import './orders.scss'
    //引入vuex模块
import { mapGetters, mapActions } from "vuex";
    export default {
        data(){
            return {
                 scroll_active:'',
                //订单信息
                orders_new:{}
            }
        },
        mounted(){
             window.addEventListener('scroll', this.handleScroll,true);
            this.orders_new=  this.$store.state.orderData;
            console.log(this.orders_new)
        },
        methods:{
            handleScroll (e) {
                //获得该盒子的滚动高度
                if(e.target.scrollTop >150 ){
                    this.scroll_active='actives'
                }else{
                    this.scroll_active=''
                }
            }
        }
    }
</script>