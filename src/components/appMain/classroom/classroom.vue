<template>
    <transition name="animate" appear appear-class="animate-enter" appear-active-class="animate-active-enter">
        <div id="classroom">
            <header class="classroom_header">
                <div class="btn btn_back"><img src="http://static.360buyimg.com/tp-statics/images/ic_search_leftarrow.png" @click="returnBack"/></div>
                <div class="title">T 课堂</div>
                <div class="btn btn_cart" @click="$router.push('/shopcar')"><img src="http://static.360buyimg.com/tp-statics/images/homeTop/shoppingbag.png"/></div>
            </header>
            <main class="classroom_main">
                <ul>
                    <li v-for="(obj,index) in dataset" 
                        :data-order="index"
                        :class="['img',index==activeIdx ? 'active' : '']"
                        :style="{backgroundImage:`url(${obj.imgUrl})`}" 
                        @click="move(index,obj,$event)"
                        :key="index+obj"
                        >
                        <span>{{obj.title}}</span>
                    </li>
               </ul>      
            </main>
        </div>        
    </transition>
</template>

<script type="text/javascript">
    import './classroom.scss'
    import http from '../../../utils/httpclient.js'
    import jquery from 'jquery'
    export default {
        data(){
            return {
                activeIdx:0,
                len:0,
            }            
        },
        methods:{
            move(idx,obj,event){
                let $ul = jquery(event.currentTarget.parentNode);
                if($ul.is(':animated')){
                    return false;
                }
                if(idx == this.activeIdx){
                    this.$router.push({name:'classroomshow',params:{order:idx}})
                } else {
                    this.activeIdx = idx;

                    $ul.animate({top:`-${this.activeIdx * this.len}px`}, 500,() => {
      
                        if(idx >= Math.floor(this.dataset.length / 2)){
                            this.activeIdx = idx - Math.floor(this.dataset.length / 2);
                            $ul.css('top',`-${this.activeIdx * this.len}px`);
                        }
                    })       
                }

            },
            returnBack(){
                window.history.back();
            }
        },
        computed:{
            dataset(){
                return this.$store.state.classroomData.concat(this.$store.state.classroomData) || [];
            }
        },
        mounted(){
            this.$store.commit('tabChange')

            let len = document.querySelectorAll('#classroom .classroom_main li')[1].clientHeight || null;
            this.len = len;
        }

    }
</script>