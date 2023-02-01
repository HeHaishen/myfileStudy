<!--
 * @Author: lx
 * @Date: 2021-06-22 13:43:36
 * @LastEditTime: 2021-06-22 14:13:28
 * @LastEditors: Please set LastEditors
 * @Description: 广州市三防总指挥部防汛应急响应工作流程
 * @FilePath: \big-screen-vue\src\views\floodDedense\components\CommandProcess\index.vue
-->
<template>
  <div class="command-process">
    <div class="command-process-content">
      <div class="command-process-content-top">
        <!-- 标题 -->
        <public-title title='广州市三防总指挥部防汛应急响应工作流程' :publicStyle="{top:'-14px', fontSize: 'var(--small-font)'}"></public-title>
        <!-- 工作流程 -->
        <div class="command-process-content-top-flow">

        </div>
        <!-- 签到表 -->
        <div class="command-process-content-top-sign">
          <!-- <img src="./images/leida.gif" alt="" class="radar-img"> -->
        </div>
      </div>
      <div class="command-process-content-bottom"></div>
    </div>
  </div>
</template>

<script>
import PublicTitle from '../publicTitle.vue'

export default {
  name: "",
  props: {},
  components: { PublicTitle },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {},
};
</script>
<style lang='less' scoped>
.command-process {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .command-process-content {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .command-process-content-top {
      position: relative;
      //   background: url('./images/box4.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      padding: 5%;
      height: 60%;
      width: 100%;
      .command-process-content-top-flow {
        width: 60%;
        height: 100%;
          background: url('./images/left.png') no-repeat;
        background-size: 100% 100%;
      }
      .command-process-content-top-sign {
        width: 35%;
        height: 100%;
          background: url('./images/right.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>