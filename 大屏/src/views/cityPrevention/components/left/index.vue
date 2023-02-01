<!--
 * @Author: SuDe
 * @Date: 2021-07-14 11:59:09
 * @LastEditors: SuDe
 * @LastEditTime: 2021-07-14 16:38:53
 * @Description: 
-->
<template>
    <div class="c-p-left">
        <div class="c-p-l-content">
            <left></left>
            <right></right>
        </div>
    </div>
</template>

<script>
import left from './components/left.vue';
import right from './components/right.vue';

export default {
    name: "",
    props: {},
    components: {
        left,
        right
    },
    data() {
        return {};
    },
    watch: {},
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style lang="less" scoped>
.c-p-left {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    .c-p-l-content{
        width: 100%;
        height: 100%;
    }
}
</style>
