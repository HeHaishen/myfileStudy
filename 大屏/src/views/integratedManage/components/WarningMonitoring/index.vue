<template>
  <!-- 監測預警 -->
  <div class="warning-monitoring">
    <!-- 监测预警左侧 -->
    <warning-left></warning-left>
    <!-- 监测预警右侧 -->
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
.warning-monitoring {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
}
</style>