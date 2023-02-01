<!--
 * @Author: liuxin
 * @Date: 2021-06-23 15:21:38
 * @LastEditTime: 2021-06-23 16:42:56
 * @LastEditors: Please set LastEditors
 * @Description: 指令与反馈
 * @FilePath: \big-screen-vue\src\views\forestFireWartime\components\InstructAndFeedback\index.vue
-->
<template>
  <!-- 指令与反馈 -->
  <div class="instruct-and-feedback">
    <!-- 领导下达救援指令 -->
    <div class="give-order">
      <public-title title='领导下令救援指令'></public-title>

      <give-order></give-order>
    </div>
    <!-- 救援现场问题反馈 -->
    <div class="problem-feedback">
      <public-title title='救援现场问题反馈'></public-title>

      <problem-feedback></problem-feedback>
    </div>
  </div>
</template>

<script>
import PublicTitle from '@/views/forestFireWartime/public/components/publicTitle.vue'
import GiveOrder from './components/giveOrder'
import ProblemFeedback from './components/problemFeedback'
export default {
  name: "InstructAndFeedback",
  props: {},
  components: { GiveOrder, ProblemFeedback, PublicTitle },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {},
}
</script>
<style lang='less' scoped>
.instruct-and-feedback {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 2%;
  // 领导下达救援指令
  .give-order {
    position: relative;
    background: url('./images/bg_img.png') no-repeat;
    background-size: 100% 100%;
    width: 50%;
    height: 100%;
    padding: 5% 2%;
  }
  // 救援现场问题反馈
  .problem-feedback {
    position: relative;
    background: url('./images/bg_img.png') no-repeat;
    background-size: 100% 100%;
    width: 50%;
    height: 100%;
    padding: 5% 2%;
  }
}
</style>