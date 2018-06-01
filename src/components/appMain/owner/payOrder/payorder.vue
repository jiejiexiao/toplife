<template>
    <div id="toplife_payorder">
        <div class="payorder_top">
            <span class="iconfont icon-jiantou_zuo toback"></span>
            <span class="allorder" :id="selectedIndex"  @click="changemenu">{{menu[selectedIndex]}}</span>
        </div>
        <div class="payorder_main">
            <div class="orderlist">
                <div class="list_item" v-for="(obj, index) in 2" :key="index">
                    <div class="order_id">
                        <span class="o_id">订单号：1233434565</span>
                        <span class="o_status">待支付</span>
                    </div>
                    <div class="list_cont">
                        <img src="//img13.360buyimg.com/n8/s310x390_jfs/t17278/255/1510393891/338906/736f3a8e/5acd83c1N7ff7cf88.jpg!q75.webp" alt=""/>
                        <div class="cont">
                            <h3>EMPORIO ARMANI</h3>
                            <p>女士凉鞋 黄色 欧码</p>
                            <div class="tip">
                                <span class="iconfont icon-7tianwuliyoutuihuanhuo1"></span>
                                支持7天无理由退货
                            </div>
                            <div class="price">
                                ￥<span>3000</span>
                                <span class="qty">*2</span>
                            </div>   
                        </div>   
                    </div>
                    <div class="total">
                        <span>去支付</span>
                        <span>支付金额：￥<i>3000</i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="overlay" v-if="isshow">
            <div class="menu">
                <ul>
                    <li :class="[selectedIndex==index? 'active':'' ]" v-for="(value,index) in menu" :key="index" @click="changeindex(index)">{{value}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import './payorder.scss'
    export default{
        data(){
            return {
                isshow:false,
                selectedIndex:0,
                menu:['所有订单','待支付','待收货','已完成','取消订单'],
                dataset:[]
            }
        },
        mounted(){

        },
        methods:{
            changemenu(){
                this.isshow=!this.isshow;
            },
            changeindex(index){
                this.selectedIndex=index;
                this.isshow=false;
            }
        }
    }
</script>