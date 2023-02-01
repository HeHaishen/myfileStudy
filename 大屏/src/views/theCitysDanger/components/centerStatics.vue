<!--
 * @Description: 中间部分统计展示框
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-21 18:06:31
 * @LastEditTime: 2021-08-10 16:47:06
-->
<template>
  <div class="c-center">
    <div class="center-statics">
      <div class="center-statics-innner">
        <img :src="leftBtn" alt="" class="leftBtn" @click="handlePrev" />
        <img :src="rightBtn" alt="" class="rightBtn" @click="handleNext" />
        <div class="center-statics-list">
          <a-carousel
            :slidesToShow="6"
            :slidesToScroll="1"
            :autoplay="true"
            :autoplaySpeed="5000"
            :draggable="true"
            :dots="false"
            ref="circle"
          >
            <div class="list" v-for="(item, index) in listData" :key="index">
              <div>{{ item.areaName }}</div>
              <div>
                <p>
                  <span>{{ item.bigRiskName }}：</span
                  ><span class="blue-font">{{ item.bigRisk }}</span
                  ><span>{{ item.bigRiskUnit }}</span>
                </p>
                <p>
                  <span>{{ item.videosName }}：</span
                  ><span class="blue-font">{{ item.videos }}</span
                  ><span>{{ item.videosUnit }}</span>
                </p>
              </div>
            </div>
          </a-carousel>
        </div>
      </div>
    </div>
    <div class="center-right-innner">
      <ul class="center-right-list">
        <li>
          <div>重大危险源企业</div>
          <p>
            <span class="blue-font">{{ citysDanger.hazardSource }}</span>
            <span>家</span>
          </p>
        </li>
        <li>
          <div>涉氨企业</div>
          <p>
            <span class="blue-font">{{ citysDanger.ammoniaRelated }}</span>
            <span>家</span>
          </p>
        </li>
        <li>
          <div>剧毒化学品</div>
          <p>
            <span class="blue-font">{{ citysDanger.toxicChemicals }}</span>
            <span>家</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getDistrictsDangerApi, getCitysDangerApi } from "@/api/theCitysDanger";
export default {
  data() {
    return {
      listData: [],
      citysDanger: [],
      leftBtn: require("../../../assets/images/theCitysDanger/bg_left_btn.gif"),
      rightBtn: require("../../../assets/images/theCitysDanger/bg_right_btn.gif"),
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getDistrictsDangerData();
      this.getCitysDangerData();
    },
    // 重大危险源-全市各区重大危险源统计
    getDistrictsDangerData() {
      getDistrictsDangerApi({ body: { codes: "UdYyxfqL" } }).then((res) => {
        console.log("重大危险源-全市各区重大危险源统计", res);
        if (res.body.data.length && res.success) {
          this.listData = res.body.data;
        }
      });
    },

    //  重大危险源-全市重大危险源统计
    getCitysDangerData() {
      getCitysDangerApi({ body: { codes: "omgrJMsw" } }).then((res) => {
        if (res.body && res.body.data && res.body.data.length) {
          console.log("重大危险源-全市重大危险源统计", res);
          this.citysDanger = res.body.data[0];
        }
      });
    },

    //按区排名 左按钮
    handlePrev() {
      this.$refs.circle.prev();
    },
    //按区排名 右按钮
    handleNext() {
      this.$refs.circle.next();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/common.less";
.c-center {
  display: flex;
  justify-content: space-between;

  .center-statics {
    width: auto;
    min-height: 93vh * @h;
    background: rgba(29, 56, 86, 0.5);
    border: 1px solid #01ffff;
    position: fixed;
    top: 106vh * @h;
    left: 400vw * @w;
    .box-sizing();
    // transform: translateX(-50%);
    overflow: hidden;
    padding: 0 37vw * @w 0 37vw * @w;
    .center-statics-innner {
      height: 100%;
      max-width: 1830vw * @w;
      width: auto;
      // min-width:282vw*@w;
      .center-statics-list {
        width: 1830vw * @w;
        height: 100%;
        display: flex;
        justify-content: flex-start;

        .box-sizing();

        /deep/ .slick-slide {
          text-align: center;
          overflow: hidden;
        }
        /deep/.ant-carousel {
          width: 100%;
        }
        /deep/.slick-slider {
          padding-left: 16vw * @w;
        }
        .list {
          flex-shrink: 0;
          height: auto;
          width: calc(100% / 6);
          padding-top: 13vh * @h;
          .box-sizing();
          div:nth-child(1) {
            width: 100%;
            height: 36vh * @h;
            line-height: 36vh * @h;
            color: #01fffd;
            font-size: 18vh * @h;
            text-align: center;
            font-weight: bold;
            margin-bottom: 5vh * @h;
          }
          div:nth-child(2) {
            min-height: 20vh * @h;
            height: auto;
            line-height: 20vh * @h;
            display: flex;
            justify-content: center;
            p {
              min-height: 20vh * @h;
              line-height: 20vh * @h;
              display: flex;
              justify-content: center;
              margin-right: 26vw * @w;
              span {
                display: block;
                width: auto;
                min-height: 20vh * @h;
                line-height: 20vh * @h;
                font-size: 15vh * @h;
                color: white;
                font-size: 15vh * @h;
                white-space: nowrap;
                word-break: break-all;
              }
              .blue-font {
                color: #00fffd;
              }
            }
          }
        }
      }

      .leftBtn {
        position: absolute;
        left: 20vw * @w;
        top: 50%;
        transform: translateY(-50%);
      }

      .rightBtn {
        position: absolute;
        right: 20vw * @w;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .center-right-innner {
    width: 658vw * @w;
    min-height: 93vh * @h;
    background: rgba(29, 56, 86, 0.5);
    border: 1px solid #01ffff;
    position: fixed;
    top: 106vh * @h;
    right: 434vw * @w;
    .box-sizing();
    // transform: translateX(-50%);
    overflow: hidden;
    padding: 0 37vw * @w 0 37vw * @w;
    color: #01ffff;

    .center-right-list {
      display: flex;
      justify-content: space-between;
      li {
        flex: 1;
        padding-top: 13vh * @h;
        .box-sizing();
        div {
          width: 100%;
          height: 36vh * @h;
          line-height: 36vh * @h;
          color: #01fffd;
          font-size: 18vh * @h;
          text-align: center;
          font-weight: bold;
          margin-bottom: 5vh * @h;
        }

        p {
          min-height: 20vh * @h;
          line-height: 20vh * @h;
          display: flex;
          justify-content: center;
          // margin-right: 26vw * @w;
          span {
            display: block;
            width: auto;
            min-height: 20vh * @h;
            line-height: 20vh * @h;
            font-size: 15vh * @h;
            color: white;
            font-size: 15vh * @h;
            white-space: nowrap;
            word-break: break-all;
          }
          .blue-font {
            color: #00fffd;
          }
        }
      }
    }
  }
}
</style>
