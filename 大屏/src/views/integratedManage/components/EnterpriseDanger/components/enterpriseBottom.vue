<!--
 * @Author: your name
 * @Date: 2021-06-17 19:39:10
 * @LastEditTime: 2021-06-21 13:50:13
 * @LastEditors: Please set LastEditors
 * @Description: 业务系统展示
 * @FilePath: \big-screen-vue\src\views\autoScreen\conductScreen\ordinaryTime\eventList\evenBottom.vue
-->
<template>
  <div class="info-palette-bottom">
    <info-title title="业务系统展示"></info-title>
    <div class="operation-system">
      <img src="../images/img_01.png" class="operation-system-img" />
    </div>
  </div>
</template>

<script>
import InfoTitle from './infoTitle.vue'
export default {
  name: '',
  props: {},
  components: { InfoTitle },
  data() {
    return {

    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {
    levelColor(val) {
      if (val <= 10) {
        return 'blue'
      } else if (val <= 20) {
        return 'orange'
      } else {
        return 'red'
      }
    }
  }
}
</script>
<style lang='less' scoped>
.info-palette-bottom {
  width: 100%;
  height: 48.8%;
  background: url('../images/info-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 30px 40px;
  position: relative;
  .operation-system {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .operation-system-img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
