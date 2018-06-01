import Vue from 'vue'
import Vuex from 'vuex'
import login from '../components/login/login'
import address from '../components/appMain/owner/address/address'

import http from '../utils/httpclient'

let state = {
    classroomData:[],
    classifyData:[],
    classroomshowData:[],
    chosenTab:[],
    keepUserStauts:{},
    brandsData:{},
    detailListObj:{},
}

let mutations = {
    getDataSet(){
        http.get('http://localhost:8080/src/assets/config/classroom.txt').then((res) => {
            state.classroomData = res;
        })
        http.get('http://localhost:8080/src/assets/config/classify.txt').then((res) => {
            state.classifyData = res;
        })
        http.get('http://localhost:8080/src/assets/config/classroomshow.txt').then((res) => {
            state.classroomshowData = res;
        }),
        http.get('http://localhost:8080/src/assets/config/brand_cont.txt').then((res)=>{
            state.brandsData = res;         
        })
    },
    //获得用的登录信息
    //设置登录信息
    set_Login(){
        //console.log(55)
      //发起请求返回用户信息
      http.post('islogin').then((res)=>{
            if(res.status){
                this.state.login.login_name = res.data;
            }
    })
    },
    tabChange(){
        let name = window.location.hash.split('/');
        var arr = [];
        for(let i=0;i<name.length;i++){
            if(name[i].indexOf('?') >= 0){
                name[i] = name[i].split('?')[0]
            }
            arr.push(name[i])
        }
        state.chosenTab = arr;
    },
    keepStatus(){
    },
    setDetailObj(_state,obj){
        _state.detailListObj = obj;
    }
}
Vue.use(Vuex)
export default new Vuex.Store({
    state,
    mutations,
    modules: {
        login,
        address
    }
})