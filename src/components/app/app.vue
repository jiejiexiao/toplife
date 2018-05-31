<template>
    <router-view></router-view>
</template>

<script type="text/javascript">
    import '../../style/rootStyle.scss'
    export default {
        mounted(){
            this.$store.commit('getDataSet');
            this.$store.commit('set_Login');






        }
    }
</script>