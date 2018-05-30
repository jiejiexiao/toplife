<template>
    <div id="account">
        <div class="account_top">
            <router-link to="/appmain/owner">  <i class="icon-jiantou-copy iconfont"></i></router-link>
            <span>账号设置</span>
            <span></span>
        </div>
        <div class="account_second">
            <div>
                <img src="https://storage.360buyimg.com/i.imageUpload/6a645f3461616237653364633863613831343436333536373935343430_big.jpg" alt="">
                <span>jd_131067nfr</span>
            </div>
            <router-link to=""><i class="iconfont icon-arrow-right"></i></router-link>
        </div>
        <div class="account_mian">
            <ul>
                <li>
                    <span>地址管理</span>
                    <router-link to="/address"><i class="iconfont icon-arrow-right"></i></router-link>
                </li>
                  <li>
                    <span>实名认证</span>
                    <router-link to=""><i class="iconfont icon-arrow-right"></i></router-link>
                </li>
                  <li>
                    <span>支付设置</span>
                    <router-link to=""><i class="iconfont icon-arrow-right"></i></router-link>
                </li>
                  <li>
                    <span>帮助中心</span>
                    <router-link to=""><i class="iconfont icon-arrow-right"></i></router-link>
                </li>
                  <li>
                    <span>关于</span>
                    <router-link to=""><i class="iconfont icon-arrow-right"></i></router-link>
                </li>
                  <li>
                    <span>设置</span>
                    <router-link to=""><i class="iconfont icon-arrow-right"></i></router-link>
                </li>
                  <li>
                    <span>清除缓存</span>
                    <router-link to=""><i class="iconfont icon-arrow-right"></i></router-link>
                </li>
                
            </ul>
        </div>
        <router-link to="" class="login_outbtn">退出登录</router-link>


    </div>
</template>

<script type="text/javascript">
    import './account.scss'

    export default {
        data(){
            return {
                title: '账号'
            }
        }
    }
</script>