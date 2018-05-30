<template>
    <div id="goodlist">
        <header class="goodlist_header">
                <div class="btn btn_back"><img src="http://static.360buyimg.com/tp-statics/images/ic_search_leftarrow.png" @click="returnBack"/></div>
                <div class="title"><input type="text" :placeholder="$route.params.key" /></div>
                <div class="btn btn_cartAndsearch">
                    <img src="http://static.360buyimg.com/tp-statics/images/homeTop/shoppingbag.png"/>
                </div>
        </header>
        <main class="goodlist_main">
            <div class="top">
                <div class="btn"></div>
                <div class="title">商品</div>
                <div class="btn select">
                    <button @click="optionSelect">筛选</button>
                </div>
            </div>
            <div class="content"></div>
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
                    <ul>
                        <li :class="{active:(option == 0)}" @click="tabChange(0)">综合</li>
                        <li :class="{active:(option == 1)}" @click="tabChange(1)">价格（从高到低）</li>
                        <li :class="{active:(option == 2)}" @click="tabChange(2)">价格（从低到高）</li>
                    </ul>
                </div>
                <div class="bottom">
                    <div class="cancel btn">取消</div>
                    <div class="confirm btn">确认</div>
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
                option:0
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
                this.option = num;
            }
        },
        mounted(){
            console.log(this.$route.params.key)
        },
        components:{
            overlay:OverlayComponent
        }
    }
</script>