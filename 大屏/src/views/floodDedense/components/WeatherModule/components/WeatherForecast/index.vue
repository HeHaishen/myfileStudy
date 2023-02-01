<template>
    <div class="weather-forecast">
        <public-title title="市区天气预报"></public-title>
        <div class="w-f-content">

        </div>
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
.weather-forecast {
    width: 100%;
    height: 100%;
    padding: 3%;
    box-sizing: border-box;
    background: url('../../images/bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    .w-f-content{
        
    }
}
</style>