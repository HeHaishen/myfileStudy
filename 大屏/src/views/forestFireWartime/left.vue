<template>
    <div class="forest-fire-wartime-left">
        <meteorology-module></meteorology-module>
    </div>
</template>

<script>
// 气象实时信息展示
import MeteorologyModule from "./components/MeteorologyModule";
export default {
    name: "",
    props: {},
    components: {
        MeteorologyModule
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
.forest-fire-wartime-left {
    width: 100vw;
    height: 100vh;
    font-size: var(--mini-font);
    box-sizing: border-box;
    background-color: rgba(14,22,77,1);
}
</style>