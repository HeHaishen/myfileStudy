<template>
    <div class="rainfall-trend">
        <public-title title="未来雨量趋势"></public-title>
    </div>
</template>

<script>
import PublicTitle from '../public/PublicTitle.vue';

export default {
    name: "",
    props: {},
    components: {
        PublicTitle
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
<style lang='less' scoped>
.rainfall-trend {
    width: 100%;
    height: 100%;
    padding: 3%;
    box-sizing: border-box;
    background: url('../../images/bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
}
</style>