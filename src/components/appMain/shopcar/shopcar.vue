<template>
    <div id="shopcar">
        <div class="shopcar_top" ref="top">
            <span class="iconfont icon-jiantou21 toback" @click="toback()"></span>
            <span class="title">购物车</span>
            <span class="profit">优惠券</span> 
            <span class="edit" @click="edit">{{edit_txt}}</span>
        </div>
        <div class="logintip">
            <div class="txt">登录后可同步账号购物车中的商品</div>
            <div class="tologin">去登录<i class="iconfont icon-jiantou1"></i></div>
        </div>
        <div class="shopcar_main">
            <div class="car_list">
                <div class="list_item" v-for="(obj, index) in shopcar_data" :key="index">
                    <div class="list_cont">
                        <label class="list_label">
                            <input class="list_input" type="checkbox" name="checkbox1" :id="index" :value="obj.product_id" v-model="selected">
                            <span class="checkbox listInput"></span>
                        </label>
                        <img :src="obj.img" alt=""/>
                        <div class="cont">
                            <h3>男士低帮运动鞋 白色 意大利尺码</h3>
                            <div class="params">
                                <span>颜色：白色</span>
                                <span>尺码：40</span>
                            </div>
                            <div class="price">￥<span>4,500.00</span></div>
                            <div class="qty" v-if="NoEdit">&times;<span>{{obj.qty}}</span></div>
                            <span class="qty edit-qty" v-else>
                                <span class="reduce" @click="reduce"></span>
                                <input type="number" name="" id="" :value="obj.qty"/>
                                <span class="add" @click="add"></span>
                            </span>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
        <div class="shopcar_footer">
            <label class="list_label">
                <input class="list_input" v-on:click="chooseAll" type="checkbox" name="checkbox1" v-model="this.selected.length==this.shopcar_data.length">
                <span class="checkbox listInput"></span>
                <span class="all_check">全选</span>   
            </label>
            <div class="total" v-if="NoEdit">
                <div class="pay">共计：￥<span>23,700.00</span></div>
                <div class="tip">不含运费</div>
            </div>
            <div class="toOrder" v-if="NoEdit" :class="{check: this.selected.length > 0, nocheck: this.selected.length== 0}">
                去结算<span class="num">({{this.selected.length}})</span>
            </div>
            <div class="toOrder del" v-else :class="{check: this.selected.length > 0, nocheck: this.selected.length== 0}"> 
                删除
            </div>
        </div>
    </div>
</template>
<script>
    import './shopcar.scss'
    export default {
        data(){
            return{
                shopcar_data:[{product_id:1,img:'//img12.360buyimg.com/n8/s200x200_jfs/t16723/321/617239134/134843/845723d6/5a9d0f53Ne112a8f5.jpg!q75.webp',qty:2},{product_id:2,img:'//img12.360buyimg.com/n8/s200x200_jfs/t16723/321/617239134/134843/845723d6/5a9d0f53Ne112a8f5.jpg!q75.webp',qty:3}],
                selected:[],
                NoEdit:true,
                edit_txt:'编辑'
            }
        },
        methods:{
            toback(){
                window.history.back();
            },
            chooseAll:function(event){
                var oThis = this;
                oThis.selected = [];
                if (event.currentTarget.checked) {
                    oThis.shopcar_data.forEach(function(item,index) {
                        oThis.selected.push(item.product_id);
                    });
                }
            },
            edit(){
                this.NoEdit=!this.NoEdit;
                if(this.edit_txt=='编辑'){
                    this.edit_txt='完成';
                }else if(this.edit_txt=='完成'){
                    this.edit_txt='编辑';
                    
                }
            },
            reduce(e){
                e.target.nextElementSibling.value=parseInt(e.target.nextElementSibling.value)-1;
                if(e.target.nextElementSibling.value<1){
                    e.target.nextElementSibling.value=1;
                }
            },
            add(e){
                e.target.previousElementSibling.value=parseInt(e.target.previousElementSibling.value)+1;
            }
        }
    }
</script>