<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-07-15 16:40:05
-->
<template>
  <div class="right-box">
    <div class="right-top">
      <div class="shine-model-title">本年危化品企业执法情况统计</div>
      <enforce-the-law></enforce-the-law>
    </div>
    <div class="right-bt">
      <div class="shine-model-title">本年危化品企业隐患排查情况统计</div>
      <investigate></investigate>
    </div>
  </div>
</template>

<script>
import EnforceTheLaw from './EnforceTheLaw';
import Investigate from './investigate';
export default {
  components:  { EnforceTheLaw,Investigate },
  data() {
    return {
      
    }
  },
  created() {
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
