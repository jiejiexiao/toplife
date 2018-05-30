<template>

    <div id="address">
         <div class="address_top">
            <router-link to="/account">  <i class="icon-jiantou-copy iconfont"></i></router-link>
            <span>收货地址</span>
            <span></span>
        </div>
        
        <div class="address_big">
           <div class="del_comfig" v-show="this.$store.state.address.del_comfigs" >
              <div class="del_box">
                <h2> 确定要删除吗？</h2>
                <h3><span @click="$store.dispatch('del_addre',del_num)">确定</span><span @click="del_comfigs=false">取消</span></h3>
              </div>
           </div>

             <div class="address_mian" v-for="(obj,idx) of this.$store.state.address.addlist" :key="obj.address_id">
                <div class="address_mian_top">
                    <h2><span>{{obj.receiver}}</span><span>{{obj.ipNumber.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2")}}</span></h2>
                    <h3>{{obj.city +obj.address_detail}}</h3>
                </div>
                <div class="address_mian_bottom">
                    <span>
                        <i class="icon-gouxuan iconfont" v-show="obj.status" @click="change_state(idx,obj)"></i>
                        <i class="icon-xuan iconfont" v-show="!obj.status"  @click="change_state(idx,obj)"></i>
                        设为默认地址</span>
                    <h5><span  @click="changeitem(obj)"><i class="icon-dingdan iconfont"></i>编辑</span><span @click="del_btn(obj.address_id)"><i class="iconfont icon-shanchu2" ></i>删除</span></h5>
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
      addlist:[],
      del_num:''
    };
  },
  mounted(){
    this.$store.dispatch("showdata");
 
  },



  methods: {
    //点击跳转
    changeitem(obj) {
      //e.target.style.color='#007FFF';
      this.$store.dispatch("change_add", obj);
      this.$router.push({ name: "add_address" });
    },
    //删除按钮
    del_btn(ids) {
     this.$store.state.address.del_comfigs =true;
     this.del_num = ids;
   
    },
    //点击默认地址
    change_state(idx, obj) {
      obj.status = true;
      this.addlist.map((item, index) => {
        if (index != idx) {
          item.status = false;
        }
      });
    }
    




  }
};


</script>


