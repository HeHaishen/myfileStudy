
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
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.public-title {
  position: absolute;
  top: -11px;
  left: 50%;
  white-space: nowrap;
  transform: translateX(-50%);
  font-size: var(--middle-font);
  color: #fff;
  text-shadow: 0 0 5px #fff, 0 0 10px #0071a6, 0 0 15px #0071a6, 0 0 20px #0071a6;
}
</style>