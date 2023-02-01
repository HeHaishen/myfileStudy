<!--
 * @Author: your name
 * @Date: 2021-06-18 11:18:23
 * @LastEditTime: 2021-06-21 11:44:28
 * @LastEditors: Please set LastEditors
 * @Description: 事件列表与重大危险源
 * @FilePath: \big-screen-vue\src\views\integratedManage\components\EventList\index.vue
-->
<template>
  <!-- 事件列表与重大危险源 -->
  <div class="event-list">
    <div class="event-list-content">
      <even-top></even-top>
      <even-bottom></even-bottom>
    </div>
  </div>
</template>

<script>
import EvenTop from './evenTop.vue'
import EvenBottom from './evenBottom.vue'
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
.event-list {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .event-list-content {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}
</style>