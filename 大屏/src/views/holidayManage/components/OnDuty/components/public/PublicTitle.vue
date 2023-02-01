
<template>
    <div class="public-title">
        {{ title }}
    </div>
</template>    
<script>
export default {
    props: {
        title: {
            type: String,
            default: "",
        },
    },
};
</script>

<style lang="less" scoped>
.public-title {
    position: absolute;
    top: -15px;
    left: 50%;
    white-space: nowrap;
    transform: translateX(-50%);
    font-size: var(--large-font);
    color: rgb(0,254,254);
}
</style>