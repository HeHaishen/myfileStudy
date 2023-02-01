<template>
    <div class="rainstorm-left">
        <weather-radar></weather-radar>
    </div>
</template>

<script>
import WeatherRadar from './components/WeatherRadar';
export default {
    name: "",
    props: {},
    components: {
        WeatherRadar
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
.rainstorm-left {
    width: 100vw;
    height: 100vh;
    font-size: var(--mini-font);
    box-sizing: border-box;
    background-color: rgba(14,22,77,1);
}
</style>