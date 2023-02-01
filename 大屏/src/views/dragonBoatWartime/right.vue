<template>
    <div class="dragon-boat-wartime-right">
        <instruct-and-feedback></instruct-and-feedback>
    </div>
</template>

<script>
// 指令与问题反馈
import InstructAndFeedback from "./components/InstructAndFeedback";

export default {
    name: "",
    props: {},
    components: {
        InstructAndFeedback
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
.dragon-boat-wartime-right {
    width: 100vw;
    height: 100vh;
    font-size: var(--mini-font);
    box-sizing: border-box;
    background-color: rgba(14,22,77,1);
}
</style>