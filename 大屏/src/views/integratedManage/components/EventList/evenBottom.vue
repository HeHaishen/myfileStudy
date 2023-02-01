<!--
 * @Author: your name
 * @Date: 2021-06-17 19:39:10
 * @LastEditTime: 2021-06-21 14:34:52
 * @LastEditors: Please set LastEditors
 * @Description: 重大危险信息源
 * @FilePath: \big-screen-vue\src\views\autoScreen\conductScreen\ordinaryTime\eventList\evenBottom.vue
-->
<template>
  <div class="info-palette-bottom">
    <info-title title="重大危险信息源"></info-title>
    <div class="table">
      <div class="list-th">
        <span class="district">区域</span>
        <span class="source">事重大危险源</span>
        <span class="probe">探头</span>
      </div>
      <vue-seamless-scroll :data="listData" class="warp" :class-option="classOption">
        <ul class="item">
          <li v-for="(item, index) in listData" :key="index">
            <span class="district" v-text="item.district"></span>
            <span class="source">
              <span class="source-box" :style="{backgroundColor:levelColor(item.source)}">{{item.source}}</span>
            </span>
            <span class="probe" v-text="item.probe"></span>
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
    <div class="event-total">
      <div class="public-title">
        全市重大危险源统计
      </div>
      <div class="total-list">
        <span>重大危险源企业</span>
        <span>20<i>家</i></span>
      </div>
      <div class="total-list">
        <span>涉氨企业</span>
        <span>20<i>家</i></span>
      </div>
      <div class="total-list">
        <span>剧毒化学品</span>
        <span>20<i>家</i></span>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import InfoTitle from './components/infoTitle.vue'
export default {
  name: '',
  props: {},
  components: { vueSeamlessScroll, InfoTitle },
  data() {
    return {
      listData: [
        {
          'district': '天河区',
          'source': '8',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '15',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '8',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '4',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '33',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '15',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '22',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '20',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '10',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '0',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '16',
          'probe': '2个',
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
  background: url('./images/info-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 30px 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .table {
    height: 75%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .list-th {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: var(--super-mini-font);
    background: #223660;
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

      & li:nth-of-type(even) {
        background: #223660;
      }
    }
  }
  .probe {
    width: 30%;
  }
  .district {
    width: 30%;
  }
  .source {
    width: 40%;
    .source-box {
      display: inline-block;
      line-height: var(--mini-font);
      width: 45%;
      box-sizing: border-box;
    }
  }
  .event-total {
    width: 100%;
    height: 20%;
    background: url('./images/total-border.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    justify-content: space-around;
    .public-title {
      position: absolute;
      top: -13px;
      left: 50%;
      transform: translateX(-50%);
      font-size: var(--small-font);
      font-weight: bold;
      white-space: nowrap;
      color: #00e9ea;
    }
    .total-list {
      height: 100%;
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      span {
        color: #00e9ea;
        font-size: var(--super-mini-font);
        padding-bottom: 1%;
      }
      span + span {
        padding-bottom: 0;
        i {
          color: #fff;
        }
      }
    }
    .total-list:nth-child(3) {
      width: 20%;
    }
  }
}
</style>
