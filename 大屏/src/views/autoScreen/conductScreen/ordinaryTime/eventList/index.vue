<!--
 * @Author: your name
 * @Date: 2021-06-17 17:39:49
 * @LastEditTime: 2021-06-17 20:20:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\autoScreen\conductScreen\ordinaryTime\EventList.vue
-->
<template>
  <div class="event-list">
    <even-top></even-top>
    <even-bottom></even-bottom>
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
  filters: {
    // 日期截取 2021-06-15 格式
    timeFormat(val) {
      if (!val) {
        return val
      }
      return val.match(/^\d{4}-\d{1,2}-\d{1,2}/g).join('')
    }
  }
}
</script>
<style lang='less' scoped>
@h:100 /3200;
@w:100 /1920;
.event-list {
  margin: auto;
  width: @w*1920vw;
  height: @h*2798vh;
  background-color: rgb(9, 20, 50);
  box-sizing: border-box;
  margin-top: @h*260vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
 
}
</style>