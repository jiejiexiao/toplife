<template>
    <div id="toplife_payorder">
        <div class="payorder_top">
            <span class="iconfont icon-jiantou_zuo toback" @click="toback"></span>
            <span class="allorder" :id="selectedIndex"  @click="changemenu">{{menu[selectedIndex]}}</span>
        </div>
        <div class="payorder_main">
            <div class="orderlist">
                <div class="list_item" v-for="(obj) in dataset" :key="obj.order_id">
                    <div class="order_id">
                        <span class="o_id">订单号：{{obj.order_id}}</span>
                        <span class="o_status">{{obj.payState ? '已支付' : '待支付'}}</span>
                    </div>
                    <div class="list_cont" v-for="(item) in obj.goodslist" :key="item.id">
                        <img :src="item.pic"/>
                        <div class="cont">
                            <h3>{{item.brandName}}</h3>
                            <p>{{item.name}}</p>
                            <div class="tip">
                                <span class="iconfont icon-7tianwuliyoutuihuanhuo1"></span>
                                支持7天无理由退货
                            </div>
                            <div class="price">
                                ￥<span>{{item.price}}</span>
                                <span class="qty">&times;<i>{{item.qty}}</i></span>
                            </div>   
                        </div>   
                    </div>
                    <div class="total">
                        <span class="goPay" v-if="!obj.payState" @click="go_pay(obj.order_id)">去支付</span>
                          <span class="goPay" v-if="obj.payState">已完成</span>
                        <span class="pay">支付金额：￥<i class="pay_price">{{obj.total_price}}</i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="overlay" v-show="isshow">
            <div class="menu" v-show="!show_paybox">
                <ul>
                    <li :class="[selectedIndex==index? 'active':'' ]" v-for="(value,index) in menu" :key="index" @click="changeindex(index)">{{value}}</li>
                </ul>
            </div>
             <div id="slide-wrapper" v-show="show_paybox">
                <div id="slider">
                    <span id="label"></span>
                    <span id="lableTip">滑动完成支付</span>
                </div>
            </div>
            <i class="icon-shanchu1  iconfont" v-show="show_paybox" @click="isshow=false"></i>
        </div>
    </div>
</template>

<script>
    import './payorder.scss'
    import http from '../../../../utils/httpclient'
    import jquery from 'jquery'

    
    export default{
        data(){
            return {
                isshow:false,
                selectedIndex:0,
                menu:['所有订单','待支付','待收货','已完成','取消订单'],
                alldateset:[],
                dataset:[],
                show_paybox:false

            }
        },
        mounted(){
              http.post('showOrder',{order_id: this.show_paybox}).then((res)=>{
                  if(res.status){
                      this.alldateset = res.data;
                      this.dataset = this.alldateset;
                  }
            })
        },
        methods:{
            changemenu(){
                this.isshow=!this.isshow;
                this.show_paybox=false;
            },
            changeindex(index){
                this.selectedIndex=index;
                switch(index){
                    case 0:
                        this.dataset = this.alldateset;
                    break;
                    case 1:
                        this.dataset = this.alldateset.filter((item)=>{
                            if(!item.payState){
                                return true;
                            }
                        })
                    break;
                    case 2:
                        this.dataset = []
                    break;
                    case 3:
                     this.dataset = this.alldateset.filter((item)=>{
                            if(item.payState){
                                return true;
                            }
                        })
                    break;
                    case 4:
                        this.dataset = []
                    break;

                }
                this.isshow=false;
            },
            go_pay(ids){
                this.isshow =true;
                this.show_paybox =true;
                var slider = new SliderUnlock("#slider", {}, ()=>{
                //滑动完成后的回调
                http.post('showOrder',{order_id: ids}).then((res)=>{
                    if(res.status){
                        this.alldateset = res.data;
                      this.dataset = this.alldateset;
                      this.changeindex(0)
                        //跳转
                        this.isshow=false;
                        slider.reset();
                    }
                })
            }, ()=>{});
            slider.init();
            },
            toback(){
                window.history.back();
            }
        }
    }
</script>