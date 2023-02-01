<template>
  <div class="weather-status">
    <ten-day-weather></ten-day-weather>
    <different-weahter style="margin: 4.5% 0"></different-weahter>
    <five-minute></five-minute>
  </div>
</template>

<script>
import DifferentWeahter from "./components/DifferentWeahter.vue";
import FiveMinute from "./components/FiveMinute.vue";
import TenDayWeather from "./components/TenDayWeather.vue";
export default {
  name: "",
  props: {},
  components: {
    TenDayWeather,
    DifferentWeahter,
    FiveMinute,
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
.weather-status {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  .ten-weather {
    width: 100%;
    height: 30%;
  }
  .different-weather {
    width: 100%;
    height: 30%;
  }
  .five-minute {
    width: 100%;
    height: 30%;
  }
}
</style>