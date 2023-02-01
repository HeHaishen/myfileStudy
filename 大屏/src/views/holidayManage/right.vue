<template>
    <div class="holiday-manage-right">
        <sys-module></sys-module>
    </div>
</template>

<script>
import SysModule from './components/SysModule';

export default {
    name: "",
    props: {},
    components: {
        SysModule
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
.holiday-manage-right {
    width: 100vw;
    height: 100vh;
    font-size: var(--mini-font);
    box-sizing: border-box;
    background-color: rgba(14,22,77,1);

}
</style>