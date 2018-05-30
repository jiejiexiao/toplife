<template>

    <div id="add_address" >
       <div class="add_address_top">
            <router-link to="/address" @click="this.$store.state.address.address_state =''">  <i class="icon-jiantou-copy iconfont"></i></router-link>
            <span>新增地址</span>
            <span></span>
        </div>
        <div class="add_address_second">
            <ul>
                <li>
                    <label for="add_name">收货人</label>
                    <input type="text" id="add_name" placeholder="收件人名字" @change="confrom_name"  :value="changeaddress.receiver"/>
                    <i class="icon-gouxuan1 iconfont" v-show="user_name.length>0 && user_name != 'false'"></i>
                    <i class="icon-shanchu1 iconfont" v-show="user_name == 'false'"></i>
                </li>
                 <li>
                    <label for="add_num" >联系方式</label>
                    <input type="number" id="add_num"  placeholder="手机号码"  @change="confrom_name"  :value="changeaddress.ipNumber"/>
                   
                    <i class="icon-gouxuan1 iconfont"  v-show="user_num.length>0 && user_num != 'false'"></i>
                    <i class="icon-shanchu1 iconfont" v-show="user_num == 'false'"></i>
                </li>
                 <li>
                    <label>所在地区</label>
                    <input type="text" id="big_city" :value="changeaddress.city" disabled   placeholder="请选择所在地区"  />
                    <i class="icon-jiantou1 iconfont" @click="showcase"></i>
                </li>
                 <li>
                    <label for="add_spa">详细地址</label>
                    <input type="text" id="add_spa"  placeholder="街道，楼牌号等"  @change="confrom_name" :value="changeaddress.address_detail" />
             
                    <i class="icon-gouxuan1 iconfont" v-show="user_path.length>0 && user_path != 'false'"></i>
                    <i class="icon-shanchu1 iconfont" v-show="user_path == 'false'"></i>
                </li>
                <li>    
                    <label>设为默认地址</label>
                     <i class="icon-gouxuan iconfont" v-show="statusadd" @click="statusadd = !statusadd"></i>
                     <i class="icon-xuan iconfont" v-show="!statusadd" @click="statusadd = !statusadd"></i>
                </li>
            </ul>
        </div>
        <div class="add_address_three">
            <span @click="send_address">保存</span>
        </div>
        <div class="add_address_four" v-show="showChose">
            <section class="showChose" >
                <section class="address">
                    <section class="title">
                        <h4>所在地区
                            <span @click="choseAdd"><i class="icon-shanchu1 iconfont"></i></span>
                        </h4>
                    </section>
                    <section class="title">
                    <div class="area" @click="provinceSelected()">{{Province?Province:info[province-1].name}}</div>
                    <div class="area" @click="citySelected()" :class="City?'':'active'">{{City?City:'请选择'}}</div>
                    <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
                    </section>
                    <ul>
                    <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''"  :key="v.name">{{v.name}}</li>
                    <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''" :key="v.name">{{v.name}}</li>
                    <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''" :key="v.name">{{v.name}}</li>
                    </ul>
                </section>
             </section>
        </div>
    </div>

</template>

<script type="text/javascript">
import "./add_address.scss";
//引入vuex模块
import { mapGetters, mapActions } from "vuex";
import http from "../../../../utils/httpclient";

//引入城市列表
import cityjson from "./city";

export default {
  data() {
    return {
      showChose: false,
      showProvince: true,
      showCity: false,
      showDistrict: false,
      showCityList: false,
      showDistrictList: false,
      province: 1,
      city: 3,
      district: 57,
      GetProvinceId: 2,
      District: false,
      Province: false,
      City: false,
      // v-for循环判断是否为当前
      selected: false,
      //所选的省份
      livecity: "",
      //所选的城市
      livedistrict: "",
      //所选的区域
      livepath: "",
      //城市数据
      info: cityjson,
      //用户名字
      user_name: "",
      //电话
      user_num: "",
      //所在的省份
      big_city: "",
      //详细地址
      user_path: "",
      //是否默认地址
      statusadd: true,
      //需要编辑的地址
      changeaddress: {},
      changeid:''
    };
  },
  //初始化是判断有没有参数
  mounted() {
    if (this.$store.state.address.address_state.receiver) {
      this.changeaddress = this.$store.state.address.address_state;
      this.user_name = this.changeaddress.receiver;
      this.user_num = this.changeaddress.ipNumber;
      this.big_city = this.changeaddress.city;
      this.user_path = this.changeaddress.address_detail;
      this.statusadd = this.changeaddress.status;
      this.changeid = this.changeaddress.address_id
  
    }
  },

  methods: {
    //是否关闭
    choseAdd: function() {
      this.showChose = false;
    },
    //是否显示
    showcase: function() {
      this.showChose = true;
    },
    _filter(add, name, code) {
      let result = [];
      for (let i = 0; i < add.length; i++) {
        if (code == add[i].id) {
          result = add[i][name];
        }
      }
      return result;
    },
    getProvinceId: function(code, input, index) {
      this.province = code;
      this.Province = input;
      //所选的省份
      this.livecity = input;
      this.big_citys();
      this.showProvince = false;
      this.showCity = true;
      this.showDistrict = false;
      this.showCityList = this._filter(this.info, "city", this.province);
      // 点击选择当前
      this.info.map(a => (a.selected = false));
      this.info[index].selected = true;
    },
    provinceSelected: function() {
      // 清除市级和区级列表
      this.showCityList = false;
      this.showDistrictList = false;
      // 清除市级和区级选项
      this.City = false;
      this.District = false;
      // 选项页面的切换
      this.showProvince = true;
      this.showCity = false;
      this.showDistrict = false;
    },
    getCityId: function(code, input, index) {
      this.city = code;
      this.City = input;
      //所选的城市
      this.livedistrict = input;
      this.big_citys();
      this.showProvince = false;
      this.showCity = false;
      this.showDistrict = true;
      this.showDistrictList = this._filter(
        this.showCityList,
        "district",
        this.city
      );
      // 选择当前添加active
      this.showCityList.map(a => (a.selected = false));
      this.showCityList[index].selected = true;
    },
    citySelected: function() {
      this.showProvince = false;
      this.showCity = true;
      this.showDistrict = false;
    },
    getDistrictId: function(code, input, index) {
      this.district = code;
      this.District = input;
      //所选的区域
      this.livepath = input;
      this.big_citys();
      // 选择当前添加active
      this.showDistrictList.map(a => (a.selected = false));
      this.showDistrictList[index].selected = true;
      // 选取市区选项之后关闭弹层
      this.showChose = false;
    },
    districtSelected: function() {
      this.showProvince = false;
      this.showCity = false;
      this.showDistrict = true;
    },

    //大区域验证
    big_citys() {
      this.big_city = this.livecity + this.livedistrict + this.livepath;
      this.changeaddress.city =
        this.livecity + this.livedistrict + this.livepath;
    },

    //各种验证
    confrom_name(e) {
      let targets = e.target;
      let name_reg = /^([\u4e00-\u9fa5]){2,7}$/; //名字正则
      let num_reg = /^1[3|4|5|8][0-9]\d{8}$/; //电话正则
      let _value = targets.value.trim();

      switch (targets.id) {
        case "add_name":
          if (!name_reg.test(_value)) {
            this.user_name = "false";
          } else {
            this.user_name = _value;
            this.changeaddress.receiver = _value;
          }
          break;
        case "add_num":
          if (!num_reg.test(_value)) {
            this.user_num = "false";
          } else {
            this.user_num = _value;
            this.changeaddress.ipNumber = _value;
          }
          break;

        case "add_spa":
          if (_value.length == 0) {
            this.user_path = "false";
          } else {
            this.user_path = _value;
            this.changeaddress.address_detail = _value;
          }
          break;
      }
    },

    //点击保存
    send_address(e) {
      // this.confrom_name(e);

      if (
        this.user_name.length > 0 &&
        this.user_name != "flase" &&
        this.user_num.length > 0 &&
        this.user_num != "flase" &&
        this.user_path.length > 0 &&
        this.user_path != "flase"
      ) {
        
        http
          .post("addAddress", {
            receiver: this.user_name,
            ipNumber: this.user_num,
            city: this.livecity + this.livedistrict + this.livepath,
            address_detail: this.user_path,
            status: this.statusadd,
            address_id:this.changeid
          })
          .then(res => {
            console.log(res)
            e.target.style.background = "green";
            e.target.innerHTML = "添加地址成功";
            setTimeout(() => {
              this.$router.push("/address");
            }, 200);
          })
          .catch(error => {
            e.target.style.background = "#B22D00";
            e.target.innerHTML = "添加地址失败，请重试";
            setTimeout(() => {
              e.target.style.background = " #232321";
              e.target.innerHTML = "保存";
            }, 500);
          });
      } else {
        e.target.style.background = "#B22D00";
        e.target.innerHTML = "请完善上面的信息填写";
        setTimeout(() => {
          e.target.style.background = " #232321";
          e.target.innerHTML = "保存";
        }, 500);
      }
    }
  }
};
</script>