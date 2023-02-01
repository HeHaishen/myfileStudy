<!--
 * @Author: your name
 * @Date: 2021-06-19 10:43:51
 * @LastEditTime: 2021-06-23 14:59:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\rainstorm\components\Waterlogging\waterLeft.vue
-->
<template>
  <div class="water-left">
    <div class="tabBarStyle">
      <div v-for="(item,index) in tabBarList" :key="index" class="tabBar-item" :class="{active:currentIndex==index}" @click="tabBarChange(index)">{{item}}</div>
    </div>
    <div class="tab-item">
      <prevent-heavyrain v-if="currentIndex==0"></prevent-heavyrain>
      <prevent-typhoon v-if="currentIndex==1"></prevent-typhoon>
      <prevent-waterlogging v-if="currentIndex==2"></prevent-waterlogging>
    </div>
  </div>
</template>

<script>
import preventHeavyrain from './components/preventHeavyrain'
import preventWaterlogging from './components/preventWaterlogging'
import preventTyphoon from './components/preventTyphoon'
import bus from '@/utils/Bus'
export default {
  name: 'WaterRainstorm',
  props: {},
  components: { preventHeavyrain, preventWaterlogging, preventTyphoon },
  data() {
    return {
      tabBarStyle: {
        color: '#989ba0',
        backgroundColor: '#e4e9ef'
      },
      tabBarList: ['防暴雨', '防台风', '防汛'],
      currentIndex: 0,
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {
    tabCallback(key) {
      bus.$emit('tabChange', key)
    },
    tabBarChange(index) {
      this.currentIndex = index
    }
  },
}
</script>
<style lang='less' scoped>
.water-left {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  .tabBarStyle {
    display: flex;
    // position: absolute;
    width: 100%;
    // height: 10%;
    // background-color: #ccc;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    // z-index: 10;
    .tabBar-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1%;
      width: 20%;
      border: 1px solid #07cbd586;
      margin-right: 5px;
    }
    .active {
      box-shadow: 0px 0px 4px #08e4f0e7 inset;
      background-color: #07cbd586;
    }
  }
  .tab-item {
    // flex: 1;
    width: 100%;
    height: calc(97% - var(--mini-font));
  }
}
</style>