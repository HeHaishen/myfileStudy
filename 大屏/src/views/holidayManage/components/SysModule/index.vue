<template>
    <div class="sys-module">
       <sys-project></sys-project>
    </div>
</template>

<script>
import SysProject from './components/SysProject'
export default {
    name: "",
    props: {},
    components: {
         SysProject
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
.sys-module{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:3% 2%;
}
</style>