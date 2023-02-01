<!--
 * @Author: lx
 * @Date: 2021-06-18 11:18:23
 * @LastEditTime: 2021-06-23 11:22:00
 * @LastEditors: Please set LastEditors
 * @Description: 企业隐患和三防应急
 * @FilePath: \big-screen-vue\src\views\integratedManage\components\EnterpriseDanger\index.vue
-->
<template>
  <!-- 企业隐患和三防应急 -->
  <div class="response-module">
    <div class="response-module-content">
      <!-- 三防应急响应与气象预警 -->
      <response-weather></response-weather>
      <!-- 企业隐患信息统计 -->
      <enterprise-danger></enterprise-danger>
    </div>
  </div>
</template>

<script>
import ResponseWeather from './components/responseWeather'
import EnterpriseDanger from './components/enterpriseDanger'
export default {
  name: '',
  props: {},
  components: {
    ResponseWeather, EnterpriseDanger
  },
  data() {
    return {

    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {

  },
}
</script>
<style lang='less' scoped>
.response-module {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .response-module-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
</style>