<template>
  <div class="c-holiday-pattern">
    <div class="left-left">
      <leftLeft></leftLeft>
    </div>
    <div class="holiday-pattern-content">
      <headers title="应急管理综应用平台"></headers>
      <div class="left">
      </div>
      <div class="center">
      </div>
      <div class="right">
      </div>
    </div>
    <div class="right-right">
      <rightRight></rightRight>
    </div>
  </div>
</template>

<script>
  import headers from '@/components/APicture/header';
  // import holidayLeft from './components/holidayLeft.vue'
  import leftLeft from './components/leftLeft.vue'
  import rightRight from './components/rightRight.vue'
  // import Center from './components/center'
  // import Right from './components/right'
  export default {
    components: { headers, leftLeft, rightRight },
    data() {
      return {}
    },
    created() { },
    mounted() { },
    methods: {
      init() { },
      initChart() {

      },
    },
  };
</script>

<style lang="less" scoped>
  @import './index.less';
</style>