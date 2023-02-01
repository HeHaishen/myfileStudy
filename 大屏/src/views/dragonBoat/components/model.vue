<!--
 * @Description: 查看详情
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-06-28 19:31:22
 * @LastEditTime: 2021-08-29 00:09:51
-->
<template>
  <div class="c-model" v-if="show">
    <p class="c-model-close" @click="close">X</p>
    <div class="c-model-title">{{ title }}</div>
    <div class="c-model-conetent">
      <ul>
        <li>
          <label for="">预案名称：</label>
          <p>{{ detailDatas.reservePlanTitle }}</p>
        </li>

        <li>
          <label for="">预案发布时间：</label>
          <p>{{ detailDatas.created }}</p>
        </li>
        <li>
          <label for="">牵头单位：</label>
          <p>{{ detailDatas.leadingUnit }}</p>
        </li>
        <li>
          <label for="">应急类型：</label>
          <p>{{ detailDatas.reservePlanType }}</p>
        </li>
        <li>
          <label for="">应急内容：</label>
          <p
            style="color:#00fffe ,cursor: pointer"
            class="check"
            @click="chekcoutFn"
          >
            查看
          </p>
        </li>
      </ul>
    </div>

    <tempPop
      title="预案内容"
      :show="pdfShow"
      @doClose="pdfclose"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="pdf-vue-view">
          <PdfView
            :pdfUrl="`/doc/api/store/preview/${
              this.parentDatas.fileId
            }?id=${new Date().getTime()}`"
            :recordData="this.parentDatas"
          >
          </PdfView>
        </div>
      </template>
    </tempPop>
  </div>
</template>

<script>
import Pdf from "vue-pdf";
import PdfView from "@/components/pdf/pdf-view";
import tempPop from "@/views/dragonBoatNormal/components/pop.vue";
import { emergencyDetail } from "@/api/dragonBoat";
export default {
  components: {
    tempPop,
    Pdf,
    PdfView,
  },
  data() {
    return {
      show: false,
      title: "查看详情",
      pageType: "detail",
      sid: null,
      parentDatas: {},
      detailDatas: {},
      pdfShow: true,
    };
  },
  mounted() {
    this.$on("show", (datas) => {
      console.log(datas);
      this.parentDatas = datas;
      // 初始化
      this.init();
    });
  },
  methods: {
    pdfclose() {
      this.pdfShow = false;
    },
    //查看内容
    chekcoutFn() {
      this.pdfShow = true;
    },

    init() {
      this.sid = JSON.parse(JSON.stringify(this.parentDatas.sid));
      this.show = true;
      this.getDetail();
    },
    getDetail() {
      emergencyDetail({ sid: this.sid }).then((res) => {
        if (res.success) {
          this.title = res.body.reservePlanTitle;
          this.detailDatas = JSON.parse(JSON.stringify(res.body));
        }
      });
    },
    close() {
      this.show = false;
    },
  },
};
</script>

<style lang="less">
@import "../index.less";
@w:100 /5760;
// @h:100 /1079;
@h:100 /1080;
.c-model {
  width: 800px;
  min-height: 400px;
  height: auto;
  background: rgba(21, 30, 66, 0.7);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px 20px;
  z-index: 9999;
  .c-model-title {
    width: 90%;
    min-height: 72px;
    padding: 8px 0;
    box-sizing: border-box;
    // line-height: 72px;
    color: white;
    font-size: 32px;
    font-weight: bold;
    padding-left: 16px;
  }
  .c-model-conetent {
    width: 100%;
    min-height: calc(100% - 72px);
    height: auto;
    ul {
      width: 100%;
      height: auto;
      padding: 0 20px 20px 20px;
      box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      li {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        min-height: 50px;
        height: auto;
        label {
          display: block;
          width: 30%;
          text-align: right;
          color: white;
          font-size: 24px;
        }
        p {
          width: 70%;
          color: white;
          font-size: 24px;
        }
      }
    }
  }
  .c-model-close {
    width: 46px;
    height: 46px;
    color: white;
    font-size: 32px;
    text-align: center;
    line-height: 46px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
}
.check {
  cursor: pointer;
  color: #00fffe !important;
}
.pdf-vue-view {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100vw * @w;
  height: auto;
  /deep/ .pdf-view {
    width: 100%;
    .btns {
      height: 32vh * @h;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%;);
      width: 100%;
      // border-bottom: 1px #1b1a1a solid;
    }
    /deep/.pdf {
      overflow-y: scroll;

      // margin-top: 13px;
    }
  }
}

.pdf-view-modal {
  background-color: #fff;
  .ant-modal {
    top: 0;
    margin: 0 auto;
    // padding: 0;
  }

  .pdf-view {
    .btns {
      height: 32px;
      background: #e8e8e8;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      // border-bottom: 1px #1b1a1a solid;
    }

    .pdf {
      height: calc(100vh - 113px);
      overflow-y: scroll;
      // margin-top: 13px;
    }
  }
}

.pdf-vue-view {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100vw * @w;
  height: auto;
  /deep/ .pdf-view {
    width: 100%;
    .btns {
      height: 32vh * @h;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%;);
      width: 100%;
      // border-bottom: 1px #1b1a1a solid;
    }
    /deep/.pdf {
      overflow-y: scroll;

      // margin-top: 13px;
    }
  }
}
</style>
