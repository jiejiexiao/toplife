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
                <input type="text" placeholder="请输入用户名"   @change="confrom_name" id="add_name" />
                <i class="iconfont icon-xuan" v-show="username.length>0 && username != 'false'"></i>
                 <i class="iconfont icon-shanchu1" v-show="username == 'false'"></i>
            </div>
            <div class="register_second_mian">
                <i class="iconfont icon-ziyuan"></i>
                <input type="password" placeholder="请输入3-20位密码(要含数字英文)" @change="confrom_name" id="password" />
                  <i class="iconfont icon-xuan" v-show="password.length>0 && password != 'false'"></i>
                 <i class="iconfont icon-shanchu1" v-show="password == 'false'"></i>
                
            </div>
             <div class="register_second_yzm">
                 <i class="iconfont icon-shouhoufuwu"></i>
                <input type="text" placeholder="验证码"  v-model="yzm_value"/>
                <div id="v_container" style="width:3.3333rem;height:0.9067rem;"></div>
                <i class="iconfont icon-xuan" v-show="yzm_state ==true"></i>
                 <i class="iconfont icon-shanchu1" v-show="yzm_state == false"></i>
            </div>
             <span class="register_btn" @click="send_regiest" id="register_btn" v-show="!has_user">注册</span>
             <span class="register_btn1" v-show="has_user">该用户名字以注册</span>
            
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
import "./register.scss";
import http from "../../utils/httpclient";
import gverify from "./gVerify";
//引入vuex模块
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      yzm_value: "",
      yzm_state: "aa",
      has_user: false,
      verifyCode: {}
    };
  },
  mounted() {
    this.verifyCode = new GVerify("v_container");
  },
  methods: {
    //注册验证
    send_regiest(e) {
        //使用插件内的方法
      let res = this.verifyCode.validate(this.yzm_value);
      if (res) {
        this.yzm_state = true;
      } else {
        this.yzm_state = false;
      }

      if (
        this.username.length > 0 &&
        this.username != "false" &&
        this.password.length > 0 &&
        this.password != "false" &&
        this.yzm_state == true
      ) {
        http
          .post("register", {
            username: this.username,
            password: this.password
          })
          .then(res => {
            console.log(res);
            if (res.status) {
              e.target.style.background = "green";
              e.target.innerHTML = "注册成功";
              setTimeout(() => {
                this.$router.push("/login");
              }, 500);
            }
          });
      } else {
        e.target.style.background = "#B20000";
        e.target.innerHTML = "请填写正确的信息";
        this.new_ture = true;
        setTimeout(() => {
          e.target.style.background = "#666666";
          e.target.innerHTML = "注册";
        }, 1000);
      }
    },
    confrom_name(e) {
      let targets = e.target;
      let name_reg = /[a-zA-Z]{1,20}|[\u4e00-\u9fa5]{1,10}/; //名字正则
      let num_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,20}$/; //密码正则
      let _value = targets.value.trim();
      switch (targets.id) {
        case "add_name":
          if (!name_reg.test(_value)) {
            this.username = "false";
          } else {
            this.username = _value;
            //判断是否有该用户
            http.post("register", { username: this.username }).then(res => {
              if (res.status == false) {
                this.has_user = true;
                setTimeout(() => {
                  this.has_user = false;
                }, 1000);
              }
            });
          }
          break;
        case "password":
          if (!num_reg.test(_value)) {
            this.password = "false";
          } else {
            console.log(this.password);
            this.password = _value;
          }
          break;
      }
    }
  }
};
</script>