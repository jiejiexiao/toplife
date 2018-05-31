<template>
    <div id="home">
        <div class="home_top" ref="top">
            <span class="iconfont icon-sousuo sousuo" v-if="isShow"></span>
            <span class="iconfont icon-gouwudai gouwudai"></span>
        </div>
        <div class="home_main" ref="main_cont">
            <div class="home_search">
                <span class="iconfont icon-sousuo"></span>
                <span class="text">探索你的精致生活</span>
            </div>
            <div class="home_banner" ref="banner">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" data-swiper-autoplay="2000">
                            <img src="https://img13.360buyimg.com/tuangou/s750x1048_jfs/t18250/189/2614178700/537825/335c5aa/5b023903Nd55de3de.jpg!q70.webp"/>
                        </div>
                        <div class="swiper-slide" data-swiper-autoplay="2000">
                            <img src="https://img13.360buyimg.com/tuangou/s750x1048_jfs/t21361/363/179859905/201014/dd4f019e/5b023f4dN30852d76.jpg!q70.webp"/>
                        </div>
                        <div class="swiper-slide" data-swiper-autoplay="2000">
                            <img src="https://img11.360buyimg.com/tuangou/s750x1048_jfs/t18019/141/2648777977/203379/4b64b92e/5b0515a6Nc27f2b4b.jpg!q70.webp"/>
                        </div>
                        <div class="swiper-slide" data-swiper-autoplay="2000">
                            <img src="https://img10.360buyimg.com/tuangou/s750x1048_jfs/t17542/80/2552675241/167639/e4deb26a/5afd7057N13809953.jpg!q70.webp"/>
                        </div>
                        <div class="swiper-slide" data-swiper-autoplay="2000">
                            <img src="https://img13.360buyimg.com/tuangou/s750x1048_jfs/t17182/35/2628396368/202692/8e3d5b88/5b027955Nea64170f.jpg!q70.webp"/>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class="new">
                <div class="img">
                    <img src="https://img10.360buyimg.com/tuangou/s750x170_jfs/t13897/302/2030989959/8030/71099545/5a3098f1N7385e4f5.png!q70.webp" alt="" ref="new_img"/> 
                </div>
                <div class="swiper-container2" ref="new_cont">
                    <div class="swiper-pagination2" ref="new_tab"></div> 
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(value,key) in tab_cont" :key="key">
                            <div class="img">
                                <img :src="tab_cont[key]['tab_imgurl']"/>
                                <i></i>
                            </div>
                            <div class="goods">
                                <div class="item" v-for="(obj,index) of tab_cont[key]['dataset']" :key="obj.id" :id="obj._id">
                                    <img :src="obj.pic" alt="" />
                                    <span class="brand">{{obj.brandName}}</span>
                                    <span class="title">{{obj.name}}</span>
                                    <p class="price">￥<span>{{obj.price}}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="may">
                <img src="https://img20.360buyimg.com/tuangou/s750x170_jfs/t17473/74/2635492890/9418/7232a1a1/5afee4b8N956a2702.png!q70.webp" alt="" />
                <img src="https://img20.360buyimg.com/tuangou/s750x0_jfs/t21238/92/137712141/195598/89980a84/5afee480N0e334047.jpg!q70.webp" alt="" />
            </div>
            <div class="brand">
                <img src="https://img14.360buyimg.com/tuangou/s750x170_jfs/t15433/103/308931308/10081/b54b695f/5a3098e9N3dfac263.png!q70.webp" alt="" />
                <img src="https://img13.360buyimg.com/tuangou/s750x0_jfs/t21754/206/128428655/283043/4bbd5215/5afe3a64N4ad17d8a.jpg!q70.webp" alt="" />
                <img src="https://img13.360buyimg.com/tuangou/s750x0_jfs/t19726/29/2745164572/76139/a1ecb270/5b07dc80N3b45384e.jpg!q70.webp" alt="" />
                <img src="https://img20.360buyimg.com/tuangou/s750x0_jfs/t16678/116/2634452785/183703/bb759eac/5b022d55Nb3ad1943.jpg!q70.webp" alt="" />
            </div>
            <div class="t_tv">
                <img src="https://img14.360buyimg.com/tuangou/s750x170_jfs/t15493/121/2105418622/7789/8a05d569/5a8287abNd9c422e4.jpg!q70.webp" alt="" />
                <img src="https://img14.360buyimg.com/tuangou/s750x0_jfs/t16762/156/1689676520/150302/1985c154/5ad4aa5cN1a38387f.jpg!q70.webp" alt="" />
            </div>
            <div class="t_course">
                <div class="img">
                    <img src="https://img13.360buyimg.com/tuangou/s750x170_jfs/t14923/188/520700596/7032/29f8cb08/5a2fa46fN57321d07.png!q70.webp" alt="" />
                </div>
                <div class="t_c1">
                    <img src="https://img13.360buyimg.com/tuangou/s750x0_jfs/t16744/82/2011139793/144769/59d6a93/5ae073f1N6c202416.jpg!q70.webp" alt="" />
                    <div class="t_txt">
                        <div class="title">
                            陈幼坚的南北东西
                        </div>
                        <span>
                            集设计师、品牌顾问及艺术家于一身的陈幼坚，擅长汲取东西两种文化的精髓。“东西坊”是他的自由品牌，呈现其经典设计。未来每个月将不定期分享其随性所致的生活态度及设计/选物推荐。
                        </span>
                        <div class="main_title">
                            名人私选
                        </div>
                    </div>
                </div>
                <div class="t_c2">
                    <img src="https://img20.360buyimg.com/tuangou/s375x220_jfs/t21151/260/202466759/194418/3bc47645/5b02cdc9N3129c837.jpg!q70.webp" alt="" />
                    <div class="content">
                        被明星Pick的FF LOGO的打开方式
                    </div>
                    <div class="main_title">
                        生活家
                    </div>
                </div>
                <div class="t_c3 t_c2">
                    <img src="https://img11.360buyimg.com/tuangou/s375x220_jfs/t17560/265/2574850888/181737/251d0625/5b02ce19N8f091679.jpg!q70.webp" alt="" />
                    <div class="content">
                        我们可以将一座花园穿在身上
                    </div>
                    <div class="main_title">
                        生活家
                    </div>
                </div>
            </div>
            <div class="t_like">
                <div class="img">
                    <img src="https://img10.360buyimg.com/tuangou/s750x170_jfs/t13699/273/869085212/8533/ea3d328c/5a385816N91d13fff.png!q70.webp" alt="" />
                </div>
                <div class="t_like1">
                    <img src="https://img12.360buyimg.com/tuangou/s750x600_jfs/t16843/5/2318735002/189984/44576541/5af1a32fN67e84e19.jpg!q70.webp" alt="" />
                </div>
                <div class="t_like2">
                    <img src="https://img12.360buyimg.com/tuangou/s375x220_jfs/t21814/5/268600610/72035/40d93acb/5b07de8cNd90d4395.jpg!q70.webp" alt="" />
                    <div class="content">
                        休闲时刻也要时髦出位【惬意时光】
                    </div>
                    <div class="main_title">
                        风格清单
                    </div>
                </div>
                <div class="t_like3 t_like2">
                    <img src="https://img20.360buyimg.com/tuangou/s375x220_jfs/t22066/178/267202557/59258/fefb2e6e/5b07df42N4238a6c0.jpg!q70.webp" alt="" />
                    <div class="content">
                        大肆出汗也要时尚有型【热汗时刻】
                    </div>
                    <div class="main_title">
                        风格清单
                    </div>
                </div>
            </div>
            <div class="t_recommand">
                <div class="img"> 
                    <img src="https://img12.360buyimg.com/tuangou/s750x170_jfs/t15703/129/377366599/10052/b726a000/5a2f94afNeae3923a.png!q70.webp" alt="" />
                </div>
                <div class="re_goods">
                    <ul>
                        <li v-for="(value,index) of recommand" :key="index">
                            <img :src="value['pic']" alt="" />
                            <div class="brand">
                                {{value.brandName}}
                            </div>
                            <div class="title">
                                {{value.name}}
                            </div>
                            <p class="price">￥<span>{{value.price}}</span></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import './home.scss'
    import http from '../../../utils/httpclient'
    export default {
        data(){
            return {
                title: 'home',
                isShow:false,
                new_tab:[],
                tab_cont:{},
                recommand:[]
            }            
        },
        mounted(){
            this.$store.commit('tabChange')
            http.get('http://10.3.133.27:8080/src/assets/config/home.txt').then((res)=>{
                this.tab_cont=res;
                for(let key in this.tab_cont){
                    this.new_tab.push(this.tab_cont[key]['tab_name']);
                }
                var mySwiper = new Swiper ('.swiper-container',{
                    direction: 'horizontal',
                    loop: true,
                    paginationClickable:true,
                    autoplay: {
                        disableOnInteraction:false,
                    },
                    pagination: {
                      el: '.swiper-pagination'
                    }
                }) 
            })
            http.post('query_product',{qty:40}).then((res)=>{
                this.recommand=res.data;
            })
            this.$refs.main_cont.addEventListener('scroll',(e)=>{
                e.preventDefault();
                let scrollTop=this.$refs.main_cont.scrollTop;
                if(scrollTop >= this.$refs.top.offsetHeight){
                    this.isShow=true;
                    if(scrollTop > this.$refs.top.offsetHeight+this.$refs.banner.offsetHeight+this.$refs.new_img.offsetHeight && scrollTop < this.$refs.top.offsetHeight+this.$refs.banner.offsetHeight+this.$refs.new_img.offsetHeight+this.$refs.new_cont.offsetHeight)
                        this.$refs.new_tab.classList.add('swiper-pagination2_fix');
                    else{
                        this.$refs.new_tab.classList.remove('swiper-pagination2_fix');
                   }    
                }else{
                    this.isShow=false; 
                }
            })
        },
        updated(){
            var self=this;
            var mySwiper2 = new Swiper ('.swiper-container2',{
                on:{
                    slideChange: function(){
                        for(let i=0;i<self.$refs.new_tab.children.length;i++){
                            self.$refs.new_tab.children[i].classList.remove('swiper-pagination-bullet-active');
                        }
                        self.$refs.new_tab.children[this.activeIndex].classList.add('swiper-pagination-bullet-active');
                    }
                },
                direction: 'horizontal',
                pagination: {
                  el: '.swiper-pagination2'
                }
            })
            $('.swiper-pagination2').on('click','span',function(){
                var index = this.id;
                mySwiper2.slideTo(index, 500, false);
            })
            for(let i=0;i<this.$refs.new_tab.children.length;i++){
                this.$refs.new_tab.children[i].innerText=this.new_tab[i];
                this.$refs.new_tab.children[i].id=i;   
            }
        }
    }
</script>