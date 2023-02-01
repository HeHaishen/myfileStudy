<!--
 * @Author: your name
 * @Date: 2021-06-19 13:42:31
 * @LastEditTime: 2021-06-23 12:10:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\rainstorm\components\Waterlogging\components\WaterRainstorm\components\echartsTable.vue
-->
<template>
  <div class="echarts-table">
    <div class="list-th">
      <span class="grade">等级</span>
      <span class="district">地区</span>
      <span class="date">启动时间</span>
    </div>
    <vue-seamless-scroll :data="listData" class="warp" :class-option="classOption">
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          <span class="grade">
            <span class="grade-box" :style="{backgroundColor:levelColor(item.grade)}"></span>
          </span>
          <span class="district" v-text="item.district"></span>
          <span class="date" v-text="item.date"></span>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  name: 'echartsTable',
  props: {},
  components: { vueSeamlessScroll },
  data() {
    return {
      listData: [
        {
          'district': '海珠',
          'grade': '1',
          'date': '2021-06-19 14:12:39',
        }, {
          'district': '南沙',
          'grade': '2',
          'date': '2021-06-19 14:12:39',
        }, {
          'district': '荔湾',
          'grade': '3',
          'date': '2021-06-19 14:12:39',
        }, {
          'district': '天河',
          'grade': '2',
          'date': '2021-06-19 14:12:39',
        }, {
          'district': '花都',
          'grade': '3',
          'date': '2021-06-19 14:12:39',
        }, {
          'district': '越秀',
          'grade': '0',
          'date': '2021-06-19 14:12:39',
        }, {
          'district': '海珠',
          'grade': '1',
          'date': '2021-06-19 14:12:39',
        }, {
          'district': '海珠',
          'grade': '2',
          'date': '2021-06-19 14:12:39',
        }, {
          'district': '海珠',
          'grade': '3',
          'date': '2021-06-19 14:12:39',
        }, {
          'district': '海珠',
          'grade': '0',
          'date': '2021-06-19 14:12:39',
        }, {
          'district': '海珠',
          'grade': '0',
          'date': '2021-06-19 14:12:39',
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
  methods: {
    levelColor(value) {
      switch (String(value)) {
        case "0":
          return "#fe0000"
        case "1":
          return "#fa531c"
        case "2":
          return "#f5e82a"
        case "3":
          return "#5d66ff"
        default:
          return "green"
      }
    }
  },
}
</script>
<style lang='less' scoped>
.echarts-table {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
}
.list-th {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: var(--super-mini-font);
  background: #989ca19f;
  color: #fff;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;

  span {
    text-align: center;
  }
}
.warp {
  width: 100%;
  flex: 1;
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
      padding: 5px 0;
      border-top: 1px dashed #ccc;
      span {
        text-align: center;
        font-size: var(--super-mini-font);
      }
    }
    // li + li {
    //   border-top: 1px dashed #ccc;
    // }
  }
}
.grade {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  .grade-box {
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
}
.district {
  width: 20%;
}
.date {
  width: 60%;
}
</style>