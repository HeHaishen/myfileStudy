<template>
    <div class="c-normalcy-overview">
        <div class="left-left"></div>
        <div class="normalcy-overview-content">
            <headers title="应急管理综合应用平台"> </headers>
            <div class="normalcy-content">
                <div class="left">
                    <left></left>
                </div>
                <div class="center">
                    <center></center>
                </div>
                <div class="right">
                    <right></right>
                </div>
            </div>
        </div>
        <div class="right-right"></div>
    </div>
</template>

<script>
    import headers from '@/components/APicture/header'
    import Left from './components/left'
    import Center from './components/center'
    import Right from './components/right'
    export default {
        components: { headers, Left, Center, Right },
        data() {
            return {}
        },
        created() { },
        mounted() { },
        methods: {
            init() { },
            initChart() {

            },
        },
    };
</script>

<style lang="less" scoped>
    @import './index.less';
</style>