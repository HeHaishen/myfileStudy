<template>
    <div class="dragon-boat-wartime-left">
        <realtime-weather></realtime-weather>
    </div>
</template>

<script>
// 气象实时信息展示
import RealtimeWeather from "./components/RealtimeWeather";
export default {
    name: "",
    props: {},
    components: {
        RealtimeWeather
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
.dragon-boat-wartime-left {
    width: 100vw;
    height: 100vh;
    font-size: var(--mini-font);
    box-sizing: border-box;
    background-color: rgba(14,22,77,1);
}
</style>