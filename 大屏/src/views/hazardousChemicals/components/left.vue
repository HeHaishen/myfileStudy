<template>
  <div class="chemicals-left-box">
    <div class="left-left">
      <warning></warning>
    </div>
    <div class="left-right">
      <supervise></supervise>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Warning from './warning';
import Supervise from './supervise';
export default {
  components: { Warning , Supervise },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
