<template>
    <div id="appMain">
        <div class="appMain_main">
            <router-view ></router-view>  
        </div>
        <footer class="appMain_footer" @click="tabChange">
            <router-link to="/appmain/home" >
                <div class="tab">
                    <div class="icon">
                        <img src="http://static.360buyimg.com/tp-statics/images/globalBottom/BottomBar_home_hl@2x.png" v-show="chosenTab.indexOf('home') > -1" />
                        <img src="http://static.360buyimg.com/tp-statics/images/globalBottom/BottomBar_home_normal@2x.png" v-show="chosenTab.indexOf('home') == -1"/>
                    </div>
                    <span :class="chosenTab.indexOf('home') == -1 ? '' : 'active'">首页</span>           
                </div>
            </router-link>
            <router-link to="/appmain/classroom">
                <div class="tab">
                    <div class="icon">
                        <img src="http://static.360buyimg.com/tp-statics/images/globalBottom/BottomBar_tclass_hl@2x.png" v-show="chosenTab.indexOf('classroom') > -1" />
                        <img src="http://static.360buyimg.com/tp-statics/images/globalBottom/BottomBar_tclass_normal@2x.png" v-show="chosenTab.indexOf('classroom') == -1"/>
                    </div>
                    <span :class="chosenTab.indexOf('classroom') == -1 ? '' : 'active'">T课堂</span>            
                </div>
            </router-link>
            <router-link to="/appmain/brand">
                <div class="tab">
                    <div class="icon">
                        <img src="http://static.360buyimg.com/tp-statics/images/globalBottom/BottomBar_brand_hl@2x.png" v-show="chosenTab.indexOf('brand') > -1" />
                        <img src="http://static.360buyimg.com/tp-statics/images/globalBottom/BottomBar_brand_normal@2x.png" v-show="chosenTab.indexOf('brand') == -1"/>
                    </div>
                    <span :class="chosenTab.indexOf('brand') == -1 ? '' : 'active'">品牌</span>    
                </div>
            </router-link>
            <router-link to="/appmain/classify">
                <div class="tab">
                    <div class="icon">
                        <img src="http://static.360buyimg.com/tp-statics/images/globalBottom/BottomBar_classify_woman_hl@2x.png" v-show="chosenTab.indexOf('classify') > -1" />
                        <img src="http://static.360buyimg.com/tp-statics/images/globalBottom/BottomBar_classify_woman_normal@2x.png" v-show="chosenTab.indexOf('classify') == -1"/>
                    </div>
                    <span :class="chosenTab.indexOf('classify') == -1 ? '' : 'active'">分类</span>
                </div>
            </router-link>
            <router-link to="/appmain/owner">
                <div class="tab">
                    <div class="icon">
                        <img src="http://static.360buyimg.com/tp-statics/images/globalBottom/BottomBar_mine_hl@2x.png" v-show="chosenTab.indexOf('owner') > -1" />
                        <img src="http://static.360buyimg.com/tp-statics/images/globalBottom/BottomBar_mine_normal@2x.png" v-show="chosenTab.indexOf('owner') == -1"/>
                    </div>
                    <span :class="chosenTab.indexOf('owner') == -1 ? '' : 'active'">我的</span>               
                </div>
            </router-link>
        </footer>
    </div>
</template>

<script type="text/javascript">
    import './appMain.scss'

    export default {
        data(){
            return {
                title : 'TOPLIFE',
            }
        },
        methods: {
            tabChange : function(){
                this.$store.commit('tabChange');
            },
        },
        mounted(){
            this.$store.commit('tabChange');
        },
        computed:{
            chosenTab(){
                return this.$store.state.chosenTab;
            }
        }
    }
</script>