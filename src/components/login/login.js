// import Vue from 'vue';
import http from '../../utils/httpclient'
import router from '../../router/router'
import { resolve } from 'path';

//这里是放属性
const state = {
    //登录状态
    login_state: {},
    lodingbox: false,
    user_state:false,
    //登录的用户名
    login_name:''
}

//里面放的是方法
const mutations = {
    login_send: (data, forDate) => {
        //这里的第二个参数才是所获得参数
        //  console.log(forDate);     
    }
}

//这是触发的事件
const actions = {
    login: (store, params) => {
        //这里是使用common来触发上面的login_send方法
        //params是我传进来的参数
        //store.commit('login_send', params)
        // console.log(params)
        store.state.login_state = params;
        store.state.lodingbox = true;
        return new Promise((resolve,reject)=>{
            http.post('login', params).then((res) => {
                //判断登录状态
                if (res.status) {
                    //登录成功
                    window.localStorage.setItem('access_token', res.data);
                    store.state.user_state=true;
                    setTimeout(() => {
                        store.state.lodingbox= false;
                         router.push({ name: 'home' })
                    }, 100)
                    resolve(store.state.user_state);
                    //发起请求返回用户信息
                    http.post('islogin').then((res)=>{
                        store.state.login_name = res.data;
                    })


                } else {
                    setTimeout(() => { store.state.lodingbox = false; }, 100);
                    //怎样做
                    store.state.user_state=false;
                    resolve(store.state.user_state)
                }
            })
        })
    }
}


export default {
    state,
    mutations,
    actions
}