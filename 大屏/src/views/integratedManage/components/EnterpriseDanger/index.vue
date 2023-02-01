<!--
 * @Author: your name
 * @Date: 2021-06-18 11:18:23
 * @LastEditTime: 2021-06-21 13:42:06
 * @LastEditors: Please set LastEditors
 * @Description: 企业隐患和业务系统展示
 * @FilePath: \big-screen-vue\src\views\integratedManage\components\EnterpriseDanger\index.vue
-->
<template>
  <!-- 企业隐患和业务系统展示 -->
  <div class="enterprise-danger">
    <div class="enterprise-danger-content">
      <even-top></even-top>
      <even-bottom></even-bottom>
    </div>
  </div>
</template>

<script>
import EvenTop from './components/enterpriseTop.vue'
import EvenBottom from './components/enterpriseBottom.vue'
export default {
  name: '',
  props: {},
  components: {
    EvenTop, EvenBottom
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
.enterprise-danger {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .enterprise-danger-content {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}
</style>