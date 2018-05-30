<template>
    <div id="login">

        <h3>
            <span></span>
            <span></span>
            <router-link to="/appmain/owner"><i class="icon-shanchu1 iconfont"></i></router-link>
        </h3>
        <div class="login_first">
            <img src="https://plogin.m.jd.com/st_new/img/toplife/images/logo.png" alt="">
            <h5><span></span>请使用京东账号登录<span></span></h5>
        </div>
        <div class="login_second">
            <div class="login_second_mian">
                <i class="iconfont icon-ren"></i>
                <input type="text" placeholder="用户名/邮箱/电话" v-model="username">
            </div>
            <div class="login_second_mian">
                <i class="iconfont icon-ziyuan"></i>
                <input type="password" placeholder="登录密码" v-model="password">
            </div>
            <span   class="login_btn" @click="login_send">登录</span>
            <h4>
                <router-link to="/register">注册京东账户</router-link>
                <router-link to="">忘记密码</router-link>
            </h4>
            <!-- <h5><i class="iconfont icon-gouxuan"></i>我已阅读并同意<span>TOPLIFE授权须知</span>和<span>隐私政策</span></h5> -->
        </div>
        <div class="login_three">
             <router-link to=""><i class="iconfont icon-weixin"></i>微信登录</router-link>
                <router-link to=""><i class="iconfont icon-sr_jingdong"></i>京东登录</router-link>
        </div>
        <spinner v-show="$store.state.login.lodingbox"></spinner>


    </div>
</template>

<script type="text/javascript">
    import './login.scss'
    import http from '../../utils/httpclient'
    import spinner from '../spinner/spinner.vue'
    //引入vuex模块
    import { mapGetters, mapActions ,mapMutations } from 'vuex'

    export default {
         components: {
            spinner
        },
        data(){
            return {
              username:'',
              password:''
            }
        },
        methods:{
            //登录验证
            newresend(e){
                 e.target.innerHTML='请输入正确的账号或密码'
                    e.target.style.background='darkred';
                    setTimeout(()=>{
                        e.target.innerHTML='登录'
                        e.target.style.background='#666666';
                 },1000)
            },


            login_send(e){
                if(this.username.length ==0 ||this.password.length==0 ){
                   this.newresend(e)
                }else{
                    this.$store.dispatch('login', {username: this.username, password: this.password}).then((res)=>{
                      if(!res){
                          this.newresend(e)
                      }                     
                    })
                }
            }
        }

}
</script>