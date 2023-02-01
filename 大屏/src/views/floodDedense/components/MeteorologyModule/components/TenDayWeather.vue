<template>
  <div class="ten-weather">
    <!-- 标题 -->
    <div class="title">十天天气展望</div>
    <!-- 过程天气预报-左侧 -->
    <div class="course"></div>
    <!-- 天气预报应用建议-右侧 -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.ten-weather {
  width: 100%;
  height: 100%;
  background-image: url("../images/bigBorder.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-sizing: border-box;
  position: relative;
  // 标题
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -5%;
    white-space: nowrap;
    color: rgb(234, 239, 242);
    font-weight: bold;
    font-size: var(--large-font);
  }

  //   过程天气预报-左侧
  .course {
    width: 43%;
    height: 88%;
  }
}
</style>

