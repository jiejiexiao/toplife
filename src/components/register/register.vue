<template>
    <div id="register">
        <h3>
            <span></span>
            <span></span>
            <router-link to="/appmain/owner"><i class="icon-shanchu1 iconfont"></i></router-link>
        </h3>
        <div class="register_first">
            <img src="https://plogin.m.jd.com/st_new/img/toplife/images/logo.png" alt="">
            <h5><span></span>请使用京东账号注册<span></span></h5>
        </div>
        <div class="register_second">
            <div class="register_second_mian">
                <i class="iconfont icon-ren"></i>
                <input type="text" placeholder="请输入用户名/邮箱/电话" v-model="username">
            </div>
            <div class="register_second_mian">
                <i class="iconfont icon-ziyuan"></i>
                <input type="password" placeholder="请输入密码" v-model="password">
            </div>
            <span   class="register_btn" @click="send_regiest">注册</span>
            <h4>
                <router-link to="/login">登录京东账户</router-link>
                <router-link to="">忘记密码</router-link>
            </h4>
            <!-- <h5><i class="iconfont icon-gouxuan"></i>我已阅读并同意<span>TOPLIFE授权须知</span>和<span>隐私政策</span></h5> -->
        </div>
        <div class="register_three">
             <router-link to=""><i class="iconfont icon-weixin"></i>微信登录</router-link>
                <router-link to=""><i class="iconfont icon-sr_jingdong"></i>京东登录</router-link>
        </div>



    </div>
</template>

<script type="text/javascript">
    import './register.scss'
     import http from '../../utils/httpclient'
    //引入vuex模块
    import { mapGetters, mapActions } from 'vuex'
    
    export default {
        data(){
            return {
              username:'',
              password:''
            }
        },
        methods:{
            //注册验证
            send_regiest(){
                http.post('register', {username: this.username, password: this.password}).then((res)=>{
                    console.log(res)
                })
            }
            
        }


    }
</script>