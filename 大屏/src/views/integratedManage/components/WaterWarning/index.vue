<template>
  <!-- 水位预警-->
  <div class="water-warning">
    <!-- 水位监测预警信息 -->
    <warning-left></warning-left>
    <!-- 右侧视频 -->
    <warning-right></warning-right>
  </div>
</template>

<script>
import warningLeft from "./components/warningLeft.vue";
import warningRight from "./components/warningRight.vue";
export default {
  name: "",
  props: {},
  components: {
    warningLeft,
    warningRight,
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
.water-warning {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
}
</style>