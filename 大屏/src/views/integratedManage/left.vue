<template>
    <div class="integrated-manage-left">
        <warning-monitoring></warning-monitoring>
    </div>
</template>

<script>
import WarningMonitoring from "./components/WarningMonitoring";
export default {
    name: "",
    props: {},
    components: {
        WarningMonitoring
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
.integrated-manage-left {
    width: 100vw;
    height: 100vh;
    font-size: var(--mini-font);
    box-sizing: border-box;
    background-color: rgba(14,22,77,1);
}
</style>