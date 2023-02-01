<!--
 * @Author: your name
 * @Date: 2021-06-17 19:39:00
 * @LastEditTime: 2021-06-21 17:55:56
 * @LastEditors: Please set LastEditors
 * @Description: 事件信息滚动上报
 * @FilePath: \big-screen-vue\src\views\autoScreen\conductScreen\ordinaryTime\eventList\evenTop.vue
-->
<template>
  <div class="info-palette-top">
    <info-title title="事件信息滚动上报"></info-title>
    <div class="list-th">
      <span class="eventTime">发生时间</span>
      <span class="eventName">内容</span>
      <span class="eventPlace">区域</span>
      <span class="eventLevel">事件等级</span>
      <span class="eventSource">来源</span>
    </div>
    <vue-seamless-scroll :data="listData" class="warp" :class-option="classOption">
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          <span class="eventTime">{{item.eventTime|timeFormat}}</span>
          <span class="eventName">{{item.eventName}}</span>
          <span class="eventPlace">{{item.eventPlace}}</span>
          <span class="eventLevel">{{item.eventLevel|eventLevel}}</span>
          <span class="eventSource">{{item.eventSource|eventSource}}</span>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import InfoTitle from './components/infoTitle.vue'
import { findOndutyEvent } from '@/api/integratedManage/eventList'

export default {
  name: '',
  props: {},
  components: { vueSeamlessScroll, InfoTitle },
  data() {
    return {
      listData: [
        {
          'eventTime': '2017-12-15 8:00',
          'eventName': '无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行无缝滚动第一行',
          'eventPlace': '天河区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        }, {
          'eventTime': '2017-12-16 8:00',
          'eventName': '无缝滚动第一行无缝滚动第一行',
          'eventPlace': '白云区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        }, {
          'eventTime': '2017-12-16',
          'eventName': '无缝滚动第一行无缝滚动第一行',
          'eventPlace': '黄浦区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        }, {
          'eventTime': '2017-12-16',
          'eventName': '无缝滚动第一行无缝滚动第一行',
          'eventPlace': '荔湾区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        }, {
          'eventTime': '2017-12-16',
          'eventName': '无缝滚动第一行无缝滚动第一行',
          'eventPlace': '海珠区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        }, {
          'eventTime': '2017-12-16',
          'eventName': '无缝滚动第一行无缝滚动第一行',
          'eventPlace': '天河区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        }, {
          'eventTime': '2017-12-16',
          'eventName': '无缝滚动第一行无缝滚动第一行',
          'eventPlace': '天河区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        }, {
          'eventTime': '2017-12-16',
          'eventName': '无缝滚动第一行无缝滚动第一行',
          'eventPlace': '天河区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        }, {
          'eventTime': '2017-12-16',
          'eventName': '无缝滚动第一行无缝滚动第一行',
          'eventPlace': '天河区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        }, {
          'eventTime': '2017-12-16',
          'eventName': '无缝滚动第一行无缝滚动第一行',
          'eventPlace': '天河区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        }, {
          'eventTime': '2017-12-16',
          'eventName': '无缝滚动第一行无缝滚动第一行',
          'eventPlace': '天河区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        }, {
          'eventTime': '2017-12-16',
          'eventName': '无缝滚动第一行无缝滚动第一行',
          'eventPlace': '天河区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        }, {
          'eventTime': '2017-12-16',
          'eventName': '无缝滚动第一行无缝滚动第一行',
          'eventPlace': '天河区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        }, {
          'eventTime': '2017-12-16',
          'eventName': '无缝滚动第一行无缝滚动第一行',
          'eventPlace': '天河区',
          'eventLevel': '一般事故',
          'eventSource': '天河区'
        },],
      classOption: {
        step: 0.5
      }
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      const data = {
        "body": {

        },
        "page": 1,
        "pageSize": 10,
        "sortName": "sid",
        "sortOrder": "desc"
      }
      findOndutyEvent(data).then(res => {
        if (res.success) {
          this.listData = res.body
        } else {
          this.$message.warning('事件列表数据调试中...')
        }
      })
    },
  },
  filters: {
    eventLevel(value) {
      switch (String(value)) {
        case '4':
          return '一般事故';
        default:
          return '重大事故'
      }
    },
    eventSource(value) {
      switch (String(value)) {
        case '0':
          return '天河';
        default:
          return '荔湾'
      }
    },
  }
}
</script>
<style lang='less' scoped>
.info-palette-top {
  width: 100%;
  height: 48.8%;
  background: url('./images/info-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  .list-th {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: var(--super-mini-font);
    background-image: linear-gradient(90deg, #1b388b, #0f195234);
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
        background-image: linear-gradient(90deg, #1b388b, #0f195234);
      }
    }
  }
  .eventTime {
    width: 20%;
  }
  .eventName {
    width: 30%;
  }
  .eventPlace {
    width: 20%;
  }
  .eventLevel {
    width: 20%;
  }
  .eventSource {
    width: 10%;
  }
}
</style>
