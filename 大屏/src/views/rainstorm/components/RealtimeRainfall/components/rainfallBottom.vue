<!--
 * @Author: your name
 * @Date: 2021-06-19 16:18:51
 * @LastEditTime: 2021-06-22 10:49:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\rainstorm\components\RealtimeRainfall\components\rainfallottom.vue
-->
<template>
  <div class="five-minutes">
    <div class="five-date">{{moment().format('YYYY-MM-DD HH:mm:ss')}}至{{moment().format('YYYY-MM-DD HH:mm:ss')}}</div>
    <div class="list-th">
      <span class="grade">排名</span>
      <span class="district">站点</span>
      <span class="date">降雨量</span>
    </div>
    <vue-seamless-scroll :data="listData" class="warp" :class-option="classOption">
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          <span class="grade">
            <span class="grade-box">{{index+1}}</span>
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
import moment from 'moment'
export default {
  name: 'echartsTable',
  props: {},
  components: { vueSeamlessScroll },
  data() {
    return {
      listData: [
        {
          'district': '海珠大岗镇新联一村',
          'grade': '1',
          'date': '0.3mm',
        }, {
          'district': '南沙大岗镇新联一村',
          'grade': '2',
          'date': '0.3mm',
        }, {
          'district': '荔湾大岗镇新联一村',
          'grade': '3',
          'date': '0.3mm',
        }, {
          'district': '天河大岗镇新联一村',
          'grade': '2',
          'date': '0.3mm',
        }, {
          'district': '花都大岗镇新联一村',
          'grade': '3',
          'date': '0.3mm',
        }, {
          'district': '越秀大岗镇新联一村',
          'grade': '0',
          'date': '0.3mm',
        }, {
          'district': '海珠大岗镇新联一村',
          'grade': '1',
          'date': '0.3mm',
        }, {
          'district': '海珠大岗镇新联一村',
          'grade': '2',
          'date': '0.3mm',
        }, {
          'district': '海珠大岗镇新联一村',
          'grade': '3',
          'date': '0.3mm',
        }, {
          'district': '海珠大岗镇新联一村',
          'grade': '0',
          'date': '0.3mm',
        }, {
          'district': '海珠大岗镇新联一村',
          'grade': '0',
          'date': '0.3mm',
        }],
      classOption: {
        step: 0.5
      },
      moment,
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
.five-minutes {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .five-date {
    color: #ffffffcc;
    padding: 1% 0;
  }
}
.list-th {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: var(--super-mini-font);
  background: linear-gradient(#166499, #104b98);
  color: #fff;
  padding: 5px 0;

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
      span {
        text-align: center;
        font-size: var(--super-mini-font);
      }
    }
  }
  .date {
    color: #00ebff;
  }
}
.grade {
  width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .grade-box {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid #00ffff;
    background-color: #3168ab;
    width: var(--mini-font);
    height: var(--mini-font);
    border-radius: 50%;
  }
}
.district {
  width: calc(75% - 60px);
}
.date {
  width: 25%;
}
</style>