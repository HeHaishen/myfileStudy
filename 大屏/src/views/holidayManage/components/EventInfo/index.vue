<template>
  <div class="event-info">
    <warning-info></warning-info>
    <emergency></emergency>
  </div>
</template>

<script>
import WarningInfo from "./components/WarningInfo.vue";
import Emergency from "./components/Emergency.vue";
export default {
  name: "",
  props: {},
  components: {
    WarningInfo,
    Emergency,
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
.event-info {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .warning-info {
    width: 100%;
    height: 46%;
  }
  .emergency {
    width: 100%;
    height: 46%;
  }
}
</style>