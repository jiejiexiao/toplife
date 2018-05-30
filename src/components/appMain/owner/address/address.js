import Vue from 'vue';


const state = {
    //要修改的地址
    address_state: {}

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
        console.log(params, 111)
        store.state.address_state = params;
    }
}


export default {
    state,
    mutations,
    actions
}