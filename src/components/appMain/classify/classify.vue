<template>
    <transition name="animate" appear appear-class="animate-enter" appear-active-class="animate-active-enter">
        <div id="classify">
            <header class="classify_header">
                <div class="btn btn_back"><img src="http://static.360buyimg.com/tp-statics/images/ic_search_leftarrow.png" @click="returnBack"/></div>
                <div class="title">分类</div>
                <div class="btn btn_cartAndsearch">
                    <img src="http://static.360buyimg.com/tp-statics/images/homeTop/icon_fold_search.png"/>
                    <img src="http://static.360buyimg.com/tp-statics/images/homeTop/shoppingbag.png" @click="$router.push('/shopcar')"/>
                </div>
            </header>
            <main   class="classify_main" 
                    @touchstart="touchstart($event)" 
                    @touchend="touchend" 
                    data-status="false" 
                    >
                <div    class="main_class" 
                        v-for="(obj,index) in dataset" 
                        :style="{backgroundImage:`url(${obj.bgUrl})`}"
                        :data-order="index"
                        :key="obj + index"
                        >
                    <img    :src="obj.titleUrl" 
                            class="title" 
                            :style="{paddingTop:paddingTop}"
                            />
                    <ul>
                        <li     v-for="sObj in obj.classify"  
                                @click.self="turnNext(sObj,$event)" 
                                :style="{color:sObj.fontColor,opacity:sObj.opacity}"
                                :key="sObj.class"
                                >
                            {{sObj.class}}
                        </li>
                    </ul>
                </div>
            </main>
        </div>        
    </transition>

</template>

<script type="text/javascript">
    import './classify.scss'

    export default {
        data(){
            return {
                paddingTop:'10%'
            }            
        },
        methods:{
            turnNext(obj,event){
                if(!obj.status){
                    return;
                } else {
                    this.$router.push({name:'goodlist',params:{key: obj.class}})
                }
            },
            returnBack(){
                window.history.back();
            },
            touchstart(event){
                let self = this;
                let target = event.currentTarget;
                target.ontouchmove = function(){
                    target.dataset.status = 'true';
                    self.paddingTop = '5%';
                }
                
            },
            touchend(event){
                let target = event.currentTarget;
                if(target.dataset.status == 'true'){
                    target.dataset.status = 'false'
                    this.paddingTop = '10%';
                }
                
            },
        },
        computed:{
            dataset(){
                return this.$store.state.classifyData || [];
            },
        },
        mounted(){
            this.$store.commit('tabChange')
        }
    }
</script>