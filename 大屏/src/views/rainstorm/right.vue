<template>
    <div class="rainstorm-right">
        <waterlogging></waterlogging>
    </div>
</template>

<script>
import Waterlogging from './components/Waterlogging';

export default {
    name: "",
    props: {},
    components: {
        Waterlogging
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
.rainstorm-right {
    width: 100vw;
    height: 100vh;
    font-size: var(--mini-font);
    box-sizing: border-box;
    background-color: rgba(14,22,77,1);
}
</style>