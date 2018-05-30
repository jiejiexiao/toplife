<template>

    <div id="address">
         <div class="address_top">
            <router-link to="/account">  <i class="icon-jiantou-copy iconfont"></i></router-link>
            <span>收货地址</span>
            <span></span>
        </div>
        
        <div class="address_big">

             <div class="address_mian" v-for="(obj,idx) of addlist" :key="idx">
                <div class="address_mian_top">
                    <h2><span>{{obj.name}}</span><span>{{obj.inum.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2")}}</span></h2>
                    <h3>{{obj.city_paths +obj.small_city}}</h3>
                </div>
                <div class="address_mian_bottom">
                    <span>
                        <i class="icon-gouxuan iconfont" v-show="obj.acquiesce" @click="change_state(idx,obj)"></i>
                        <i class="icon-xuan iconfont" v-show="!obj.acquiesce"  @click="change_state(idx,obj)"></i>
                        设为默认地址</span>
                    <h5><span  @click="changeitem(obj)"><i class="icon-dingdan iconfont"></i>编辑</span><span><i class="iconfont icon-shanchu2" @click="del_btn(idx)"></i>删除</span></h5>
                </div>
             </div>
    </div>
    <div class="address_bottom">
        <span @click="changeitem">新加收货地址</span>
    </div>
       

    </div>

</template>

<script type="text/javascript">
import "./address.scss";
//引入vuex模块
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      title: "地址管理",
      addlist: [
        {
          name: "小花花",
          inum: "13106728392",
          city_paths: "广东省广州市天河区",
          small_city: "元岗路310好智汇园park创意产业园物流中心",
          acquiesce: true
        },
        {
          name: "小小花",
          inum: "13106728392",
          city_paths: "广东省广州市天河区",
          small_city: "元岗路310好智汇园park创意产业园物流中心",
          acquiesce: false
        },
        {
          name: "小小小",
          inum: "13106728392",
          city_paths: "广东省广州市天河区",
          small_city: "元岗路310好智汇园park创意产业园物流中心",
          acquiesce: false
        },
        {
          name: "小花",
          inum: "13106728392",
          city_paths: "广东省广州市天河区",
          small_city: "元岗路310好智汇园park创意产业园物流中心",
          acquiesce: false
        }
      ]
    };
  },
  methods: {
    //点击跳转
    changeitem(obj) {
      //e.target.style.color='#007FFF';
      this.$store.dispatch("change_add", obj);
      this.$router.push({ name: "add_address" });
    },
    //删除按钮
    del_btn(idx) {
      this.addlist.splice(idx, 1);
      console.log(idx);
    },
    //点击默认地址
    change_state(idx, obj) {
      obj.acquiesce = true;
      this.addlist.map((item, index) => {
        if (index != idx) {
          item.acquiesce = false;
        }
      });
    }

  }
};


</script>


