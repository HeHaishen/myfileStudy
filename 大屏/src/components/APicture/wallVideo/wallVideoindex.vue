<!--
 * @Description: 视频分组-整合所有-入口
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-09 09:39:13
 * @LastEditTime: 2021-09-16 18:40:22
-->
<template>
  <pop-up-layer
    :show="show"
    :setStyles="setStyles"
    :opsition="setOpsition"
    ref="myPopUpLayer"
    @doClose="doClose"
    :title="title"
    :sendEvent="propEvent"
  >
    <template slot="content">
      <div class="wall-video-content">
        <WallGrounp ref="WallGrounpModel"></WallGrounp>
      </div>
    </template>
  </pop-up-layer>
</template>
<script>
import WallGrounp from "./wallGrounp";
export default {
  components: { WallGrounp },
  data() {
    return {};
  },
  model: {
    prop: "show",
    event: "changShowVal",
  },
  props: {
    show: {
      // 显示隐藏
      type: Boolean,
      default: true,
      require: true,
    },
    setOpsition: {
      //显示位置---详细查看popUpLayer组件说明
      type: String,
      default: "btnRight",
      require: false,
    },
    setStyles: {
      // 弹窗样式
      type: Object,
      default: () => {
        return {};
      },
      require: false,
    },
    title: {
      type: String,
      default: "标题",
    },
    propEvent: {
      // 指定位置需要传入
      default: undefined,
    },
  },
  watch: {
    show: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal === true) {
          this.initChildrenChildren();
        } else {
          // console.log('dajijjjjj', newVal)
        }
      },
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    upDataShow() {
      this.$emit("changShowVal", this.show);
    },
    doClose() {
      this.$emit("doClose");
      this.$refs.WallGrounpModel.doCloseClearnAll()
    },
    // 初始化子组件
    initChildrenChildren() {
      this.$refs.WallGrounpModel.$emit("initWallGrounp");
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common.less";
.wall-video-content {
  min-width: 400vw * @w;
  width: auto;
  height: 600vh * @h;
}
</style>
