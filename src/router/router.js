import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import AppMainComponent from '../components/appMain/appMain.vue'
import HomeComponent from '../components/appMain/home/home.vue'
//T课堂
import ClassroomComponent from '../components/appMain/classroom/classroom.vue'
import ClassroomShowComponent from '../components/appMain/classroom/classroomshow/classroomshow.vue'

import BrandComponent from '../components/appMain/brand/brand.vue'
//分类
import ClassifyComponent from '../components/appMain/classify/classify.vue'
//个人中心
import OwnerComponent from '../components/appMain/owner/owner.vue'
import AccountComponent from '../components/appMain/owner/account/account.vue'
import AddressComponent from '../components/appMain/owner/address/address.vue'
import Add_addressComponet from '../components/appMain/owner/add_address/add_address.vue'

//列表页
import GoodlistComponent from '../components/goodlist/goodlist.vue'

//注册登录
import LoginComponent from '../components/login/login.vue'
import RegisterComponent from '../components/register/register.vue'


import ShopcarComponent from '../components/appMain/shopcar/shopcar.vue'
const router = new VueRouter({
    routes : [
        {path:'/', redirect: '/appmain'},
        {path:'/appmain', component: AppMainComponent, name:'appmain', children: [
            {path: '/appmain', redirect: '/appmain/home'},
            {path: 'home', component: HomeComponent, name: 'home'},
            {path: 'classroom', component: ClassroomComponent, name: 'classroom'},
            {path: 'brand', component: BrandComponent, name: 'brand'},
            {path: 'classify', component: ClassifyComponent, name: 'classify'},
            {path: 'owner', component: OwnerComponent, name: 'owner'}
        ]},
        {path:'/login', component: LoginComponent, name:'login'},
        {path:'/register', component: RegisterComponent, name: 'register'},
        {path:'/shopcar', component: ShopcarComponent, name: 'shopcar'},
        {path:'/appmain/classroom/classroomshow/:order', component:ClassroomShowComponent, name:'classroomshow'},
        {path:'/goodlist/:key', component:GoodlistComponent, name:'goodlist'},
        //个人账号管理
        {path:'/account',component:AccountComponent,name:'account'},
        {path:'/address',component:AddressComponent,name:'address'},
        {path:'/add_address',component:Add_addressComponet,name:'add_address'},
    ]
})

export default router;