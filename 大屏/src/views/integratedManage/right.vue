<template>
    <div class="integrated-manage-right">
        <water-warning></water-warning>
    </div>
</template>

<script>
import WaterWarning from "./components/WaterWarning";

export default {
    name: "",
    props: {},
    components: {
        WaterWarning
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
.integrated-manage-right {
    width: 100vw;
    height: 100vh;
    font-size: var(--mini-font);
    box-sizing: border-box;
    background-color: rgba(14,22,77,1);
}
</style>