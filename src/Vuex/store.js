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
    brandsData:{}
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