<template>
    <div class="holiday-manage-left">
        <on-duty></on-duty>
    </div>
</template>

<script>
import OnDuty from './components/OnDuty';
export default {
    name: "",
    props: {},
    components: {
        OnDuty
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

.holiday-manage-left {
    width: 100vw;
    height: 100vh;
    font-size: var(--mini-font);
    box-sizing: border-box;
    background-color: rgba(14,22,77,1);
}
</style>