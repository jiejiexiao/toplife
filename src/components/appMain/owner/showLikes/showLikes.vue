<template>
    <div id="showlike">
        <div class="showlike_top">
            <router-link to="/appmain/owner">  <i class="icon-jiantou-copy iconfont"></i></router-link>
            <span>收藏夹</span>
            <span></span>
        </div>
        <div class="showlike_mian">
            <ul>
                <li v-for="obj of showlike" :key="obj.id">
                    <img :src="obj.pic"/>
                   <div class="show_box">
                        <h5>{{obj.name}}</h5>
                        <h3><span>￥{{obj.price}}</span> <router-link to="">加入购物车</router-link></h3>
                        
                   </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/javascript">
import "./showLikes.scss";
//引入vuex模块
import { mapGetters, mapActions } from "vuex";
import http from "../../../../utils/httpclient";

export default {
  data() {
    return {
      showlike: []
    };
  },
  mounted() {
    http.post("showLikes").then(res => {
      if (res.status) {
        this.showlike = res.data;
      }
    });
  }
};
</script>


