<template>
    <!-- 值班值守和到岗 -->
    <div class="on-duty">
        <div class="on-duty-right">
            <sign-module></sign-module>
        </div>
        <div class="on-duty-left">
            <duty-module></duty-module>
        </div>
    </div>
</template>

<script>
import DutyModule from './components/DutyModule';
import SignModule from './components/SignModule';

export default {
    name: "",
    props: {},
    components: {
        DutyModule,
        SignModule
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
.on-duty{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 2%;
    .on-duty-left{
        width: 50%;
        height: 100%;
    }
    .on-duty-right{
        width: 50%;
        height: 100%;
    }
}
</style>