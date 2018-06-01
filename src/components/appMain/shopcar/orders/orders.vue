<template>
    <div id="orders">
        <div class="orders_top">
             <router-link to="/appmain/owner">  <i class="icon-jiantou-copy iconfont"></i></router-link>
            <span>填写订单</span>
            <span></span>
        </div>
        <div class="orders_mian">
            <h2>商品与配送</h2>
            <div class="order_second">
                <div class="order_second_top">

                </div>
                <div class="order_second_bottom"></div>
            </div>
            <div class="order_three"></div>
             <h2>礼品包装</h2>
            <div class="order_four"></div>
             <h2>支付信息</h2>
             <div class="order_five"></div>
                <h2>支付金额</h2>
            <div class="order_six"></div>

        </div>
        <div class="orders_footer"></div>



    </div>
</template>

<script type="text/javascript">
    import './orders.scss'
    //引入vuex模块
import { mapGetters, mapActions } from "vuex";
    export default {
        data(){
            return {
                title: '账号'
            }
        }
    }
</script>