import Vue from 'vue';

import appComponent from './components/app/app.vue';

import router from './router/router.js';
import store from './Vuex/store.js';

new Vue({
    el:'#app',
    router,
    store,
    render: h => h(appComponent)
})