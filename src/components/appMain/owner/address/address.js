import Vue from 'vue';
import http from '../../../../utils/httpclient'

const state = {
    //要修改的地址
    address_state: {},
    addlist:[],
    del_comfigs:false,
    //跳转的判断
    isorders:false
}

const mutations = {
    change_add: (data, forDate) => {
        //这里的第二个参数才是所获得参数
        //  console.log(forDate);
        data.address_state = forDate;
        //console.log(data.address_state)
    }
}


const actions = {
    change_add: (store, params) => {
        //这里是使用common来触发上面的login_send方法
        //params是我传进来的参数
        // store.commit('change_add',params)
       
        store.state.address_state = params;
    },
    showdata:(store)=>{
        http.post('showAddress').then((res)=>{
            store.state.addlist = res.data 
          })
    },
    //del删除
    del_addre(store,params){
       
        http.post('del_address',{address_id:params}).then((res)=>{
             store.state.addlist = res.status
             store.state.del_comfigs =false;
          })
    }


}


export default {
    state,
    mutations,
    actions
}