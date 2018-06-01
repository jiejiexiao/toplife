<template>
    <div id="goodlist">
        <header class="goodlist_header">
                <div class="btn btn_back"><img src="http://static.360buyimg.com/tp-statics/images/ic_search_leftarrow.png" @click="returnBack"/></div>
                <div class="title"><input type="text" :placeholder="$route.params.key" /></div>
                <div class="btn btn_cartAndsearch">
                    <img src="http://static.360buyimg.com/tp-statics/images/homeTop/shoppingbag.png"/>
                </div>
        </header>
        <main class="goodlist_main" @touchend="lazyLoading">
            <div class="top">
                <div class="btn"></div>
                <div class="title">商品</div>
                <div class="btn select">
                    <button @click="optionSelect">筛选</button>
                </div>
            </div>
            <div class="content">
                <ul class="glist">
                    <li v-for="(obj, index) in dataset" :key="obj['_id']" @click="turnDetail(obj)">
                        <img :src="obj['pic']"/>
                        <h3>{{obj['brandName']}}</h3>
                        <h4>{{obj['name']}}</h4>
                        <p>￥<span>{{filterPrice(obj['price'])}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="loading">
                <h1 v-if="dataset.length == qty">正在加载...</h1>
                <h1 v-else>全部商品</h1>
            </div>
        </main>
        <transition name="faded">
            <div class="selectOption" v-if="select" key="select">
                <div class="title">
                    <div class="btn">
                        <img src="//static.360buyimg.com/tp-statics/2018-5-30/m/img/ic_list_leftarrow_@2x.png" @click="optionBack"/>
                    </div>
                    <div class="cont">筛选</div>
                    <div class="btn"></div>
                </div>
                <div class="order">
                    <h1>排序</h1>
                    <ul class="list1">
                        <li>
                            <i :class="{active:(order == 0)}" @click="tabChange(0)"></i><span @click="tabChange(0)">综合</span>
                        </li>
                        <li>
                            <i :class="{active:(order == 1)}" @click="tabChange(1)"></i><span @click="tabChange(1)">价格（从高到低）</span>
                        </li>
                        <li>
                            <i :class="{active:(order == 2)}" @click="tabChange(2)"></i><span  @click="tabChange(2)">价格（从低到高）</span>
                        </li>
                    </ul>
                    <h1>价格</h1>
                    <div class="group">
                        <input type="text" placeholder="最低价" @input="oninput(0,$event)" v-model="priceMin"/>至<input type="text" placeholder="最高价" @input="oninput(1,$event)" v-model="priceMax"/>
                    </div>
                </div>
                <div class="bottom">
                    <button @click="onReset">全部重置</button>
                    <button @click="onConfirm">确定</button>
                </div>
            </div>
        </transition>
        <transition name="animate">
            <overlay v-if="overlay"></overlay>        
        </transition>
    </div>
</template>

<script type="text/javascript">
    import './goodlist.scss'
    import http from '../../utils/httpclient.js'
    import OverlayComponent from '../overlay/overlay.vue' 
    export default {
        data(){
            return {
                overlay:false,
                select:false,
                order:0,
                priceMin:null,
                priceMax:null,
                qty:5,
                dataset:[],

            }
        },
        methods:{
            returnBack(){
                window.history.back();
            },
            optionSelect(){
                this.overlay = true;
                this.select = true;
            },
            optionBack(){
                this.overlay = false;
                this.select = false;
            },
            tabChange(num){
                this.order = num;
            },
            oninput(num,event){
                if(num == 0){
                    if(isNaN(event.currentTarget.value*1)){
                        this.priceMin = null;
                    } else {
                        this.priceMin = event.currentTarget.value*1;
                    }
                } else {
                    if(isNaN(event.currentTarget.value*1)){
                        this.priceMax = null;
                    } else {
                        this.priceMax = event.currentTarget.value*1;
                    }
                }
            },
            filterPrice(p){
                if(p<1000){
                    return p;
                } else{
                    let prev = Math.floor(p/1000);
                    let back = p%1000;
                    if(back < 10){
                        back = '00'+back;
                    } else if(back >= 10 && back < 100){
                        back = '0'+back;
                    } else {
                        back = back;
                    }
                    return prev + ',' + back;
                }
            },
            lazyLoading(event){
                let currentEl = event.currentTarget;

                let visiable = currentEl.clientHeight;
                let total = 0;
                for(let i=0;i<currentEl.children.length;i++){
                    total += currentEl.children[i].clientHeight*1;
                }

                if(currentEl.scrollTop + currentEl.scrollHeight*(visiable/total) > currentEl.scrollHeight * 0.95){
                    this.qty += 5;
                    if(this.priceMin != null && this.priceMax != null){
                        http.post('query_product_price',{type: this.$route.params.key, qty: this.qty,min:this.priceMin*1,max:this.priceMax*1}).then((res) => {
                            this.dataset = res.data;
                        })
                    } else {
                        this.priceMin = null;
                        this.priceMax = null;
                        switch(this.order){
                            case 0:
                                    http.post('query_product',{type: this.$route.params.key, qty: this.qty}).then((res) => {
                                        this.dataset = res.data;
                                    })
                                break;
                            case 1:
                                    http.post('query_product_priceDesc',{type: this.$route.params.key, qty: this.qty}).then((res) => {
                                        this.dataset = res.data;
                                    })
                                break;
                            case 2:
                                    http.post('query_product_priceAsc',{type: this.$route.params.key, qty: this.qty}).then((res) => {
                                        this.dataset = res.data;
                                    })
                                break;
                        }
                    }
                }else{
                    return;
                }
            },
            onReset(){
                this.order = 0;
                this.priceMin = null;
                this.priceMax = null;
            },
            onConfirm(){
                this.overlay = false;
                this.select = false;
                this.qty = 5;
                if(this.priceMin != null && this.priceMax != null){
                    http.post('query_product_price',{type: this.$route.params.key, qty: this.qty,min:this.priceMin*1,max:this.priceMax*1}).then((res) => {
                        this.dataset = res.data;
                    })
                } else {
                    this.priceMin = null;
                    this.priceMax = null;
                    switch(this.order){
                        case 0:
                                http.post('query_product',{type: this.$route.params.key, qty: this.qty}).then((res) => {
                                    this.dataset = res.data;
                                })
                            break;
                        case 1:
                                http.post('query_product_priceDesc',{type: this.$route.params.key, qty: this.qty}).then((res) => {
                                    this.dataset = res.data;
                                })
                            break;
                        case 2:
                                http.post('query_product_priceAsc',{type: this.$route.params.key, qty: this.qty}).then((res) => {
                                    this.dataset = res.data;
                                })
                            break;
                    }
                }
            },
            turnDetail(obj){
                this.$store.commit('setDetailObj',obj);
                this.$router.push('/detailList');
            }
        },
        mounted(){
            http.post('query_product',{type: this.$route.params.key, qty: this.qty}).then((res) => {
                this.dataset = res.data;
            })
        },
        components:{
            overlay:OverlayComponent
        }
    }
</script>