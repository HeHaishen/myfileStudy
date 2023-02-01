<!--
 * @Author: your name
 * @Date: 2021-06-17 19:39:00
 * @LastEditTime: 2021-06-17 20:13:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\autoScreen\conductScreen\ordinaryTime\eventList\evenTop.vue
-->
<template>
  <div class="info-palette-top">
    <info-title title="事件信息滚动上报"></info-title>
    <div class="list-th">
      <span class="showDate">发生时间</span>
      <span class="content">内容</span>
      <span class="district">区域</span>
      <span class="level">事件等级</span>
      <span class="source">来源</span>
    </div>
    <vue-seamless-scroll :data="listData" class="warp" :class-option="classOption">
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          <span class="showDate" v-text="item.showDate"></span>
          <span class="content" v-text="item.content"></span>
          <span class="district" v-text="item.district"></span>
          <span class="level" v-text="item.level"></span>
          <span class="source" v-text="item.source"></span>
        </li>
      </ul>
    </vue-seamless-scroll>
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
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        }, {
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        }, {
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        }, {
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        }, {
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        }, {
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        }, {
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        }, {
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        }, {
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        }, {
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        }, {
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        }, {
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        }, {
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        }, {
          'showDate': '2017-12-16',
          'content': '无缝滚动第一行无缝滚动第一行',
          'district': '天河区',
          'level': '一般事故',
          'source': '天河区'
        },],
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
@h:100 /3200;
@w:100 /1920;
.info-palette-top {
  width: 100%;
  height: 48%;
  background: url('./images/info-border.png') no-repeat;
  background-size: 100% 100%;
  padding: @h*65vh @w*67vw;
  position: relative;
  .list-th {
    padding: 0 @w*25vw;
    display: flex;
    justify-content: space-between;
    height: @h*100vh;
    line-height: @h*100vh;
    font-size: @h*30vh;
    font-weight: bold;
    background-image: linear-gradient(90deg, #1b388b, #0f195234);
    color: #fff;
    span {
      text-align: center;
    }
  }
  .warp {
    height: calc(100% - @h*100vh);
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      li {
        color: #fff;
        height: @h*100vh;
        line-height: @h*100vh;
        display: flex;
        justify-content: space-between;
        font-size: @h*30vh;
        padding: 0 @w*25vw;
        span {
          text-align: center;
        }
      }

      & li:nth-of-type(even) {
        background-image: linear-gradient(90deg, #1b388b, #0f195234);
        height: @h*74vh;
        line-height: @h*74vh;
      }
    }
  }
  .showDate {
    width: 10%;
  }
  .content {
    width: 60%;
  }
  .district {
    width: 10%;
  }
  .level {
    width: 10%;
  }
  .source {
    width: 10%;
  }
}
</style>
