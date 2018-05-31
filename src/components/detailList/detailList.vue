<template>
    <div id="detailList">
        <header class="header">
            <div class="btn return_back"><img src="//static.360buyimg.com/tp-statics/images/ic_search_leftarrow.png" @click="returnBack"/></div>
            <div class="title">商品详情</div>
            <div class="btn cart_btn"><img src="//static.360buyimg.com/tp-statics/images/homeTop/shoppingbag.png" /></div>
        </header>
        <main class="main">
            <div class="imgshow">
                <img :src="currentObj['pic']" />
            </div>
            <h3 class="brandName">{{currentObj['brandName']}}</h3>
            <h4 class="name">{{currentObj['name']}}</h4>
            <div class="price">
                ￥<span>{{filterPrice(currentObj['price'])}}.00</span>
            </div>
            <div class="imgList">
                <img :src="key" v-for="key in imgList" :key="key"/>
            </div>
        </main>
        <footer class="footer">
            <div class="collection">
                <i :class="['iconfont','icon-shoucang',activeIcon ? 'active' : '']" @click="collection"></i>
            </div>
            <button @click="addCartOption">加入购物车</button>
        </footer>
        <transition name="animate">
            <overlay v-show="show"></overlay>
        </transition> 
        <transition name="fademode">
            <div class="goodSelect" v-show="show">
                <div class="cont">
                    <div class="img">
                        <img :src="currentObj['pic']" />
                    </div>
                    <div class="msg">
                        <div class="price">￥<span>{{filterPrice(currentObj['price'])}}.00</span></div>
                        <div class="idNum">
                            商品编号：{{currentObj['_id']}}
                        </div>
                        <div class="changeqty">
                            数量： <span @click="changeqty(0)">-</span>{{qty}}<span @click="changeqty(1)">+</span>
                        </div>
                    </div>
                    <div class="cancel">
                        <i class="iconfont icon-shanchu1" @click="cancelOption"></i>
                    </div>
                </div>
                <div class="confirm" @click="confirmOption">确定</div>
                <transition>
                    <div class="imgMove"></div>
                </transition>    
            </div>
        </transition>
    </div>
</template>

<script type="text/javascript">
    import './detailList.scss'
    import http from '../../utils/httpclient.js'
    import OverlayComponent from '../overlay/overlay.vue'

    export default {
        data(){
            return{
                activeIcon:false,
                show:false,
                qty:1,
                imgList:['//m.360buyimg.com/n1/s621x0_jfs/t16816/87/1508954740/475147/d05c6893/5accb4d3N5bb51449.jpg!q75.webp','//m.360buyimg.com/n1/s621x0_jfs/t19216/200/1485385007/218846/c9b46284/5accb4caNc364083a.jpg!q75.webp','//m.360buyimg.com/n1/s621x0_jfs/t19690/299/1520710554/268140/66695e4/5accb4cbN902dbf6c.jpg!q75.webp','//m.360buyimg.com/n1/s621x0_jfs/t17233/63/1454292433/322179/f5e2fd29/5accb4cdNb79f592c.jpg!q75.webp','//m.360buyimg.com/n1/s621x0_jfs/t19291/13/1509782828/336693/d070f6bd/5accb4ccN2f4a7359.jpg!q75.webp','//m.360buyimg.com/n1/s621x0_jfs/t17548/308/1514757814/387449/af8879de/5accb4d0Nca408a09.jpg!q75.webp']
            }
        },
        methods:{
            returnBack(){
                window.history.back();
            },
            filterPrice(p){
                if(p<1000){
                    return p;
                } else{
                    let prev = Math.floor(p/1000);
                    let back = p%1000;
                    if(back == 0){
                        back = '000';
                    }
                    return prev + ',' + back;
                }
            },
            collection(){
                if(!this.activeIcon){
                    http.post('addTolikes', {product_id:this.currentObj['_id']})
                } else {
                    http.post('dellikes', {product_id:this.currentObj['_id']})
                }
                this.activeIcon = !this.activeIcon;
            },
            addCartOption(){
                this.show = true;
            },
            cancelOption(){
                this.show = false;
            },
            changeqty(current){
                if(current == 0){
                    if(this.qty == 1){
                        return ;
                    }
                    this.qty = this.qty - 1;
                } else {
                    this.qty = this.qty + 1;
                }
            },
            confirmOption(){
                http.post('addToShopcart',{product_id: this.currentObj['_id'], qty: this.qty}).then((res) => {
                    if(res.status){
                        this.show = false;
                        this.qty = 1;                          
                    }
                  
                })

            }
        },
        components:{
            overlay:OverlayComponent
        },
        computed:{
            currentObj(){
                return this.$store.state.detailListObj;
            }
        },
        mounted(){
            if(window.localStorage.getItem('access_token')){
                //添加浏览记录
                http.post('addTowatch_history',{product_id:this.currentObj['_id']}).then((res) => {
                    this.activeIcon = res.status;
                })
            }
        }
    }
</script>