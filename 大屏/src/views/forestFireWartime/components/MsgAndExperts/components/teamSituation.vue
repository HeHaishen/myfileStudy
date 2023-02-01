<!--
 * @Author: your name
 * @Date: 2021-06-23 17:50:20
 * @LastEditTime: 2021-06-23 19:33:06
 * @LastEditors: Please set LastEditors
 * @Description: 当前部队情况
 * @FilePath: \big-screen-vue\src\views\forestFireWartime\components\MaterialAndTeam\components\teamSituation.vue
-->
<template>
  <div class="team-situation-content">
    <div class="list-th">
      <span class="name">所在单位</span>
      <span class="guard">在岗</span>
      <span class="leave">请假</span>
      <span class="retirement">退休</span>
    </div>
    <vue-seamless-scroll :data="listData" class="warp" :class-option="classOption">
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          <span class="name">{{item.name}}</span>
          <span class="guard">{{item.guard}}</span>
          <span class="leave">{{item.leave}}</span>
          <span class="retirement">{{item.retirement}}</span>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  name: 'teamSituation',
  props: {},
  components: { vueSeamlessScroll },
  data() {
    return {
      listData: [
        {
          'name': '广州林业局',
          'guard': '12',
          'leave': '23',
          'retirement': '2',
        }, {
          'name': '广州林业局',
          'guard': '2',
          'leave': '23',
          'retirement': '2',
        }, {
          'name': '广州林业局',
          'guard': '3',
          'leave': '23',
          'retirement': '2',
        }, {
          'name': '广州林业局',
          'guard': '2',
          'leave': '23',
          'retirement': '2',
        }, {
          'name': '广州林业局',
          'guard': '3',
          'leave': '23',
          'retirement': '2',
        }, {
          'name': '广州林业局',
          'guard': '0',
          'leave': '23',
          'retirement': '2',
        }, {
          'name': '广州林业局',
          'guard': '1',
          'leave': '23',
          'retirement': '2',
        }, {
          'name': '广州林业局',
          'guard': '2',
          'leave': '23',
          'retirement': '2',
        }, {
          'name': '广州林业局',
          'guard': '3',
          'leave': '23',
          'retirement': '2',
        }, {
          'name': '广州林业局',
          'guard': '0',
          'leave': '23',
          'retirement': '2',
        }, {
          'name': '广州林业局',
          'guard': '0',
          'leave': '23',
          'retirement': '2',
        }],
      classOption: {
        step: 0.5
      }
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {},
}
</script>
<style lang='less' scoped>
.team-situation-content {
  width: 100%;
  height: 100%;
  .list-th {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: var(--super-mini-font);
    background: #123956cc;
    color: #fff;
    padding: 2% 0;

    span {
      text-align: center;
    }
  }
  .warp {
    width: 100%;
    height: calc(96% - var(--super-mini-font));
    margin: 0 auto;
    overflow: hidden;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      li {
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2% 0;
        border-top: 1px solid #364e5a;
        span {
          text-align: center;
          font-size: var(--super-mini-font);
        }
      }
    }
  }
  .name {
    width: 40%;
  }
  .guard {
    width: 20%;
  }
  .leave {
    width: 20%;
  }
  .retirement {
    width: 20%;
  }
}
</style>