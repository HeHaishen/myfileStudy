<!--
 * @Author: your name
 * @Date: 2021-06-17 19:39:00
 * @LastEditTime: 2021-06-23 12:31:55
 * @LastEditors: Please set LastEditors
 * @Description: 企业隐患信息统计
 * @FilePath: \big-screen-vue\src\views\autoScreen\conductScreen\ordinaryTime\eventList\evenTop.vue
-->
<template>
  <div class="info-palette-top">
    <info-title title="企业隐患信息统计"></info-title>
    <div class="enterprise-top">
      <template v-for="(item,index) in totalData">
        <div class="enterprise-top-total" :key="index">
          <span><i :style="{backgroundColor:topColor(item.title)}"></i><i :style="{backgroundColor:topColor(item.title)}"></i>{{item.title}}</span>
          <span :style="{color:topColor(item.title)}">{{item.total|NumberFormat}}</span>
        </div>
      </template>
    </div>
    <div class="enterprise-center">
      <h3>企业隐患分类统计</h3>
      <section class="enterprise-center-main">
        <div>
          <span>隐患总数</span><span class="number">800<i>条</i></span>
        </div>
        <div>
          <p><span>一般隐患</span><span class="number">600<i>条</i></span></p>
          <p><span><span>逾期未整改:</span><span class="number">60<i>条</i></span></span><span><span>整改中:</span><span class="number">330</span></span></p>
          <p><span><span>已整改:</span><span class="number">215<i>条</i></span></span><span><span>整改率:</span><span class="number">90%</span></span></p>
        </div>
        <div>
          <p><span>重大隐患</span><span class="number">10<i>条</i></span></p>
          <p><span><span>逾期未整改:</span><span class="number">60<i>条</i></span></span><span><span>整改中:</span><span class="number">330</span></span></p>
          <p><span><span>已整改:</span><span class="number">60<i>条</i></span></span><span><span>整改率:</span><span class="number">90%</span></span></p>
        </div>
      </section>
    </div>
    <div class="enterprise-bottom">
      <h3>企业隐患上报排名</h3>
      <div class="btn-group">
        <a-radio-group :value="radioDefault" class="radio-style" size="small" button-style="solid" @change="dataChange">
          <a-radio-button v-for="item in radioData" :key="item.value" :value="item.value" @click="onChange(item)">
            {{item.title}}
          </a-radio-button>
        </a-radio-group>
      </div>
      <section class="enterprise-bottom-main">
        <!-- <div class="order-list">
          <div class="order-last" @click="pageChange('last')">
            <span></span><span></span>
          </div>
          <div class="order-next" @click="pageChange('next')">
            <span></span><span></span>
          </div>
          <template v-for="(item,index) in orderData">
            <div :key="index" class="order-item">
              <div class="order-total-box">
                <span class="order-total-text" :style="{color:orderColor(index)}">{{item.total}}</span>
              </div>
              <span class="order-title">{{item.disc}}</span>
            </div>
          </template>
        </div> -->
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide class="order-list">
            <template v-for="(item,index) in orderData">
              <div v-if="(index+1)<=widgetSum" :key="index" class="order-item">
                <div class="order-total-box">
                  <span class="order-total-text" :style="{color:orderColor(index)}">{{item.total|conversion}}</span>
                </div>
                <span class="order-title">{{item.disc}}</span>
              </div>
            </template>
          </swiper-slide>
          <swiper-slide class="order-list">
            <template v-for="(item,index) in orderData2">
              <div v-if="(index+1)<=widgetSum" :key="index" class="order-item">
                <div class="order-total-box">
                  <span class="order-total-text" :style="{color:orderColor(index)}">{{item.total|conversion}}</span>
                </div>
                <span class="order-title">{{item.disc}}</span>
              </div>
            </template>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </section>
    </div>

  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import InfoTitle from './infoTitle.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: '',
  props: {},
  components: {
    vueSeamlessScroll, InfoTitle, Swiper,
    SwiperSlide
  },
  data() {
    return {
      totalData: [{ title: '注册总数', 'total': '214160', sid: '1' }, { title: '新注册数', 'total': '3081', sid: '2' }, { title: '上报隐患企业家', 'total': '106', sid: '3' }, { title: '未上报隐患企业家', 'total': '206', sid: '4' }],
      orderData: [{ disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }],
      radioData: [{ title: '按区排名', value: '0' }, { title: '八大行业排名', value: '1' }],
      orderData2: [{ disc: '白云', total: '139114' }, { disc: '白云', total: '139114' }, { disc: '白云', total: '139114' }, { disc: '白云', total: '139114' }, { disc: '白云', total: '139114' }, { disc: '海珠', total: '139114' }, { disc: '海珠', total: '139114' }, { disc: '天河', total: '139114' }],
      radioDefault: '0',
      page: 1,
      flag: true,
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      widgetSum: 0
    };
  },
  watch: {},
  computed: {},
  created() {
    this.$nextTick(() => {
      const _width = document.getElementsByClassName('enterprise-bottom-main')[0].clientWidth
      this.widgetSum = Math.floor((_width - _width * 0.1) / 120)
    })
  },
  mounted() { },
  methods: {
    initData() {
      if (this.flag) {
        this.orderData = [{ disc: '白云', total: '139114' }, { disc: '白云', total: '139114' }, { disc: '白云', total: '139114' }, { disc: '白云', total: '139114' }, { disc: '白云', total: '139114' }, { disc: '海珠', total: '139114' }, { disc: '海珠', total: '139114' }, { disc: '天河', total: '139114' }]
      } else {
        this.orderData = [{ disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }]
      }
      this.flag = !this.flag
    },
    onChange(record) {
      if (record.value == 1) {
        this.orderData = [{ disc: '防风', total: '139114' }, { disc: '防风', total: '139114' }, { disc: '防风', total: '139114' }, { disc: '防风', total: '139114' }, { disc: '防风', total: '139114' }, { disc: '防风', total: '139114' }, { disc: '防风', total: '139114' }, { disc: '防风', total: '139114' }]
        this.orderData2 = [{ disc: '防爆', total: '139114' }, { disc: '防爆', total: '139114' }, { disc: '防爆', total: '139114' }, { disc: '防爆', total: '139114' }, { disc: '防爆', total: '139114' }, { disc: '防尘', total: '139114' }, { disc: '防尘', total: '139114' }, { disc: '防风', total: '139114' }]

      } else if (record.value == 0) {
        this.orderData = [{ disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }, { disc: '天河', total: '139114' }]
        this.orderData2 = [{ disc: '白云', total: '139114' }, { disc: '白云', total: '139114' }, { disc: '白云', total: '139114' }, { disc: '白云', total: '139114' }, { disc: '白云', total: '139114' }, { disc: '海珠', total: '139114' }, { disc: '海珠', total: '139114' }, { disc: '荔湾', total: '139114' }]

      }
    },
    // 切换数据按钮
    dataChange(e) {
      e.preventDefault()
      this.radioDefault = e.target.value
    },
    // 切换上下页数据
    pageChange(type) {
      if (type == 'next') {
        this.page++
      }
      if (type == 'last') {
        this.page--
      }
      this.initData()
    },
    topColor(value) {
      switch (value) {
        case '注册总数':
          return '#00ffff';
        case '新注册数':
          return '#1890ff';
        case '上报隐患企业家':
          return '#ffae11';
        case '未上报隐患企业家':
          return '#e60012';
      }
    },
    orderColor(value) {
      switch (String(value)) {
        case '0':
          return '#e60012';
        case '1':
          return '#1890ff';
        case '2':
          return '#ffae11';
        default:
          return '#00ffff'
      }
    }
  },
}
</script>
<style lang='less' scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
.info-palette-top {
  width: 100%;
  height: 48.8%;
  background: url('../images/info-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  // 顶部
  .enterprise-top {
    width: 100%;
    display: flex;
    justify-content: space-around;
    .enterprise-top-total {
      position: relative;
      &::after {
        content: ' ';
        border: 2px solid #00ffff;
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        bottom: -2px;
        right: 0;
      }
    }
    & > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-bottom: 1px solid #00ffff8f;
      & + div {
        margin-left: 5%;
      }
      & > span:nth-of-type(1) {
        font-size: var(--super-mini-font);
        display: flex;
        // align-items: center;
        justify-content: flex-end;
        color: #fff;
        i {
          display: inline-block;
          width: 4px;
          height: var(--super-mini-font);
          background: red;
          transform: skew(-30deg);
          & + i {
            margin: 0 3% 0 2px;
          }
        }
      }
      & > span:nth-of-type(2) {
        padding: 1% 0;
        text-align: right;
        font-size: var(--mini-number-font);
        font-weight: bold;
      }
    }
  }
  // 中部
  .enterprise-center {
    width: 100%;
    // height: 35%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    margin: 1% 0;
    h3 {
      color: #fff;
      margin-bottom: 1%;
    }
    .enterprise-center-main {
      flex: 1;
      display: flex;
      justify-content: space-around;
      font-size: var(--super-mini-font);
      color: #fff;
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1% 0;
      }
      & > div:nth-of-type(1) {
        background: url('../images/center_01.png') no-repeat;
        background-size: 100% 100%;
        width: 19%;
        height: 100%;
        justify-content: space-evenly;
        & > span:nth-of-type(1) {
          font-size: var(--mini-font);
        }
        & > span:nth-of-type(2) {
          font-size: var(--mini-number-font);
          color: #00ffff;
          i {
            margin-left: 2px;
            font-size: var(--super-mini-font);
            color: #fff;
          }
        }
      }
      & > div:nth-of-type(2) {
        background: url('../images/center_02.png') no-repeat;
        background-size: 100% 100%;
        width: 38%;
        height: 100%;
        & > p {
          color: #fff;
          .number {
            font-size: var(--mini-number-font);
            color: #00ffff;
            margin: 0 2px;
            i {
              margin-left: 2px;
              font-size: var(--super-mini-font);
              color: #fff;
            }
          }
        }
        & > p:nth-of-type(1) {
          color: #fff;
          font-size: var(--mini-number-font);
        }
        & > p:nth-of-type(1) > span:nth-of-type(1) {
          font-size: var(--mini-font);
        }
        & > p:nth-of-type(1) > span:nth-of-type(2) {
          font-size: var(--mini-number-font);
          color: #00ffff;
          i {
            font-size: var(--mini-font);
            color: #fff;
          }
        }
      }
      & > div:nth-of-type(3) {
        background: url('../images/center_02.png') no-repeat;
        background-size: 100% 100%;
        width: 38%;
        height: 100%;
        & > p {
          color: #fff;
          .number {
            font-size: var(--mini-number-font);
            color: #00ffff;
            margin: 0 2px;
            i {
              margin-left: 2px;
              font-size: var(--super-mini-font);
              color: #fff;
            }
          }
        }
        & > p:nth-of-type(1) {
          color: #fff;
          font-size: var(--mini-number-font);
        }
        & > p:nth-of-type(1) > span:nth-of-type(1) {
          font-size: var(--mini-font);
        }
        & > p:nth-of-type(1) > span:nth-of-type(2) {
          font-size: var(--mini-number-font);
          color: #00ffff;
          i {
            font-size: var(--mini-font);
            color: #fff;
          }
        }
      }
    }
  }

  // 底部
  .enterprise-bottom {
    width: 100%;
    height: 35%;
    position: relative;
    h3 {
      color: #fff;
      margin-bottom: 1%;
    }
    /deep/.btn-group {
      position: absolute;
      right: 2%;
      top: 2%;
      display: flex;
      font-size: var(--super-mini-font);
      .radio-style {
      }
    }
    .enterprise-bottom-main {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: var(--super-mini-font);
      color: #fff;
      margin: 0 -3%;
      .order-list {
        width: 100% !important;
        height: 100%;
        display: flex;
        justify-content: space-around;
        position: relative;
        padding: 0 5%;
        .order-last {
          position: absolute;
          left: -1%;
          top: 15%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          & > span:nth-child(1) {
            display: inline-block;
            width: 4px;
            height: var(--super3-mini-font);
            background: #00ffffcc;
            transform: skew(-30deg);
          }
          & > span:nth-child(2) {
            display: inline-block;
            width: 4px;
            height: var(--super3-mini-font);
            background: #00ffffcc;
            transform: skew(-150deg);
          }
        }
        .order-next {
          position: absolute;
          right: -1%;
          top: 15%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          & > span:nth-child(1) {
            display: inline-block;
            width: 4px;
            height: var(--super3-mini-font);
            background: #00ffffcc;
            transform: skew(30deg);
          }
          & > span:nth-child(2) {
            display: inline-block;
            width: 4px;
            height: var(--super3-mini-font);
            background: #00ffffcc;
            transform: skew(150deg);
          }
        }
      }
      .order-item {
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: 0 1%;
        .order-total-box {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url('../images/bottom_01.png') no-repeat;
          background-size: 100% 100%;
          .order-total-text {
          }
          margin-bottom: 8%;
        }
        .order-title {
          text-align: center;
        }
      }
      // & >div:nth-last-of-type(1) {
      //   padding-right: 5%;
      // }
      // & >div:nth-of-type(1) {
      //   padding-left: 5%;
      // }
      .swiper-button-next,
      .swiper-button-prev {
        top: 50px;
        color: #00ffff9a;
      }
    }
  }
  /deep/.ant-radio-button-wrapper {
    margin: 0 5px;
    background-color: transparent;
    border: 1px solid #00ffff;
    border-radius: 0px;
    // border-color: transparent;
    // border: none;
    color: #fff;
    &:last-child,
    &:first-child {
      border: 1px solid #00ffff;
      border-radius: 0px;
    }
  }
  /deep/.ant-radio-group-solid
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    border: 1px solid #00ffff;
    // background-image: radial-gradient(#026ae842, #00ffffd5);
    background: #026ae842;
    box-shadow: 0px 0px 4px #00ffffd5 inset;
    border-radius: 0px;
    // background: linear-gradient(90deg, #00bdd1, #00bcd100);
    // border: none;
    // border-color: transparent;
  }
  /deep/.ant-radio-button-wrapper:not(:first-child)::before {
    display: none;
  }
}
</style>
