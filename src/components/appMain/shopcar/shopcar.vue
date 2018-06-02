<template>
    <div id="shopcar">
        <div class="shopcar_top" ref="top">
            <span class="iconfont icon-jiantou21 toback" @click="toback()"></span>
            <span class="title">购物车</span>
            <span class="profit" v-show="shopcar_data.length!=0">优惠券</span> 
            <span class="edit" @click="edit" v-show="shopcar_data.length!=0">{{edit_txt}}</span>
        </div>
        <div class="logintip">
            <div class="txt">登录后可同步账号购物车中的商品</div>
            <div class="tologin">去登录<i class="iconfont icon-jiantou1"></i></div>
        </div>
        <div class="shopcar_main">
            <div class="car_list" ref="lists">
                <div class="list_item" v-for="(obj, index) in shopcar_data" :key="index">
                    <div class="list_cont">
                        <label class="list_label">
                            <input class="list_input" type="checkbox" name="checkbox1" :id="index" :value="obj" v-model="selected">
                            <span class="checkbox listInput"></span>
                        </label>
                        <img :src="obj.pic" alt=""/>
                        <div class="cont">
                            <h3>{{obj.name}}</h3>
                            <div class="price">￥<span>{{obj.price}}</span></div>
                            <div class="qty" v-if="NoEdit">&times;<span>{{obj.qty}}</span></div>
                            <span class="qty edit-qty" v-else>
                                <span class="reduce" @click="reduce"></span>
                                <input type="number" name="" id="num" :value="obj.qty"/>
                                <span class="add" @click="add"></span>
                            </span>
                        </div>   
                    </div>
                </div>
            </div>
            <div class="empty" v-if="shopcar_data.length==0">
                <div class="null">
                </div>
                <div class="txt_tip">哎呀，购物车还没有东西～</div>
            </div>
            <div class="img_box">
                <img src="//static.360buyimg.com/tp-statics/2018-5-30/m/img/banner@2x.png" alt="" />
            </div>
        </div>
        <div class="shopcar_footer">
            <label class="list_label">
                <input class="list_input" v-on:click="chooseAll" type="checkbox" name="checkbox1" :checked="selected.length==shopcar_data.length">
                <span class="checkbox listInput"></span>
                <span class="all_check">全选</span>   
            </label>
            <div class="total" v-if="NoEdit">
                <div class="pay">共计：￥<span>{{totalprice}}</span></div>
                <div class="tip">不含运费</div>
            </div>
            <button class="toOrder" v-if="NoEdit" :disabled="selected.length == 0" :class="{check: selected.length > 0, nocheck: selected.length== 0}" @click="createOrder">
                去结算<span class="num">({{totalqty}})</span>
            </button>
            <button class="toOrder del" v-else :disabled="selected.length == 0" :class="{check: selected.length > 0, nocheck: selected.length== 0}" @click="del_pro"> 
                删除
            </button>
        </div>
        <div class="overlay" v-if="del">
            <div class="del_tip" v-if="del">
                <div class="tip">确认要删除吗？</div>
                <div class="select">
                    <span class="cancel" @click="change(false)">取消</span>
                    <span class="confirm" @click="change(true)">确认</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import './shopcar.scss'
    import http from '../../../utils/httpclient'
    
    export default {
        data(){
            return{
                shopcar_data:[],
                selected:[],
                del:false,
                totalqty:0,
                totalprice:0,
                NoEdit:true,
                edit_txt:'编辑'
            }
        },
        mounted(){
            http.post('showShopcart').then((res)=>{
                this.shopcar_data=res.data;
            })
        },
        updated(){
            let qty=0;
            let price=0;
            for(let i=0;i<this.selected.length;i++){
                qty+=parseInt(this.selected[i]['qty']);
                price+=parseInt(this.selected[i]['price'])*parseInt(this.selected[i]['qty']);
            }
            this.totalqty=qty;
            this.totalprice=price;
        },
        methods:{
            toback(){
                window.history.back();
            },
            chooseAll:function(event){
                this.selected = [];
                if (event.currentTarget.checked){
                    for(let i=0;i<this.shopcar_data.length;i++){
                        this.selected.push(this.shopcar_data[i]);
                    }
                }
            },
            edit(){
                this.NoEdit=!this.NoEdit;
                if(this.edit_txt=='编辑'){
                    this.edit_txt='完成';
                }else if(this.edit_txt=='完成'){
                    this.edit_txt='编辑';
                    for(let i=0;i<this.shopcar_data.length;i++){
                        if(this.shopcar_data[i]['qty']==parseInt(this.$refs.lists.children[i].querySelector('#num').value)){
                            continue;
                        }else{
                            this.shopcar_data[i]['qty']=this.$refs.lists.children[i].querySelector('#num').value; 
                            http.post('update_qty',{product_id:this.shopcar_data[i]['_id'],qty:parseInt(this.$refs.lists.children[i].querySelector('#num').value)}).then((res)=>{
                            })  
                        } 
                    }
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
            },
            createOrder(){
                this.$store.state.orderData.total_qty=this.totalqty;
                this.$store.state.orderData.total_price=this.totalprice;
                this.$store.state.orderData.shopcar_goods=this.selected;
                this.$router.push('/orders')


            },
            del_pro(){
                this.del=true;
            },
            change(bool){
                if(bool){
                    for(let i=0;i<this.selected.length;i++){
                        http.post('del_shop_cart',{product_id:this.selected[i]['_id']}).then((res)=>{
                            if(res.status){
                                this.shopcar_data.splice(i,1);
                                // http.post('showShopcart').then((res)=>{
                                //     this.shopcar_data=res.data;
                                // })
                            }
                        })
                    } 
                    this.del=false;     
                }else if(!bool){
                    this.del=false;
                }
            }
        }
    }
</script>