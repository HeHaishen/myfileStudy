<!--
 * @Author: your name
 * @Date: 2021-06-23 15:21:38
 * @LastEditTime: 2021-06-23 18:17:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\forestFireWartime\components\MaterialAndTeam\index.vue
-->
<template>
  <div class="material-and-team">
    <!-- 物资情况 -->
    <div class="material-conditions">
      <public-title title='当前救火物资情况'></public-title>

      <material-conditions></material-conditions>
    </div>
    <!-- 队伍情况 -->
    <div class="team-situation">
      <public-title title='当前救火队伍情况'></public-title>

      <team-situation></team-situation>
    </div>
  </div>
</template>

<script>
import PublicTitle from '@/views/forestFireWartime/public/components/publicTitle.vue'
import MaterialConditions from './components/materialConditions'
import TeamSituation from './components/teamSituation'
export default {
  name: "MaterialAndTeam",
  props: {},
  components: { MaterialConditions, TeamSituation, PublicTitle },
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
.material-and-team {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 2%;
  // 物资情况
  .material-conditions {
    position: relative;
    background: url('./images/bg_img.png') no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 46%;
    padding: 6% 2%;
  }
  // 队伍情况
  .team-situation {
    position: relative;
    background: url('./images/bg_img.png') no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 46%;
    padding: 6% 2%;
  }
}
</style>