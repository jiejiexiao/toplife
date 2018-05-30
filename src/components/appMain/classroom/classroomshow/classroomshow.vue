<template>
    <transition name="animate">
        <div id="classroomshow">
            <div class="showHeader">
                <div class="btn btn_back">
                    <img src="http://static.360buyimg.com/tp-statics/images/ic_search_leftarrow.png" @click="returnBack"/>
                </div>
                <div class="title">{{dataset[status]['title']}}</div>
                <div class="btn"></div>
            </div>
            <div class="showMain">
                <img :src="key" v-for="(key,index) in dataset[status]['imgUrl']" :key="key+index"/>
            </div>
        </div>        
    </transition>

</template>

<script type="text/javascript">
    import './classroomshow.scss'
    export default {
        data(){
            return{
                status:Number(this.$route.params.order)
            }
        },
        methods:{
            returnBack(){
                this.$router.push({name:'classroom'});
            },
        },
        computed:{
            dataset(){
                return this.$store.state.classroomshowData
            }
        },

    }
</script>