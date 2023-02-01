<template>
  <div class="contingency-plan">
    <!-- <ModelBox :title="'应急预案'"> -->
    <pop-up-layer :show="true" :setStyles="{}" opsition="pageRight" :title="'应急预案'" ref="myPopUpLayer" class="plan-pop" @doClose='doClose'>

      <div slot="content" class="contingency-content">
        <!-- <img :src="leftBtn" alt="" class="leftBtn" @click="handlePrev" />
        <img :src="rightBtn" alt="" class="rightBtn" @click="handleNext" /> -->
        <div class="talbe-search">
          <div class="center-search">
            <input class="c-input" placeholder="输入关键字" type="text" v-model="searchName" />
            <img src="../../../../assets/images/emergencyOverview/icon_search.png" alt="" @click="onSearch" />
          </div>
        </div>
        <div class="center-statics-list">
          <!-- <a-carousel :slidesToShow="5" :slidesToScroll="1" :autoplay="true" :autoplaySpeed="5000" :draggable="true" :dots="false" ref="circle"> -->
          <div class="list" v-for="(item, index) in listData" :key="index">
            <div class="plan">
              <div class="plan-img">
                <img src="../../../../assets/images/majorFestivalsConductor/plan-icon.png" alt="" @click="showDetail(item)">
                <span class="plan-level">
                  {{item.djdm}}级
                </span>
              </div>
              <div class="plan-name">
                {{item.yamc}}
              </div>
            </div>
          </div>
          <!-- </a-carousel> -->
        </div>
        <div class="list-change-page">
          <ChangePage :total="pagination.total" :currentPage="pagination.current" @changePages="pageChange" />
        </div>
        <!-- <div class="close-btn" @click="doClose">
          <a-icon type="close-square" />
        </div> -->
      </div>
    </pop-up-layer>

    <!-- </ModelBox> -->
    <!-- <pop-up-layer v-if="pdfShow" :show="pdfShow" :setStyles="{}" @doClose="close" opsition="pageRight" :title="title" ref="myPopUpLayer">
      <template slot="content">
        <div class="pdf-vue-view">
          <span @click='pdfDetail'>更多功能</span>
          <PdfView :pdfUrl="`/doc/api/store/preview/${this.formData.fileId}`" :recordData="this.formData">
          </PdfView>
        </div>
      </template>
    </pop-up-layer> -->
    <pop-up-layer v-if="pdfShow" :show="pdfShow" :setStyles="{}" @doClose="close" opsition="pageRight" :title="title" ref="myPopUpLayer" class="plan-pop">
      <template slot="content">
        <div class="Pdf_box" v-if="pdfUrlData">
          <span></span>
          <iframe :src="`./pdf/web/viewer.html?file=${pdfUrlData}`"></iframe>
        </div>
      </template>

    </pop-up-layer>

  </div>
</template>

<script>
import Pdf from "vue-pdf";
import PdfView from "@/components/pdf/pdf-view";
import ModelBox from '../modelBox/index'
import { getIdsmApi } from "@/api/idsm/index";
import ChangePage from "@/components/APicture/changePage";

export default {
  components: {
    ModelBox, PdfView, Pdf, ChangePage
  },
  data() {
    return {
      leftBtn: require("../../../../assets/images/majorFestivalsConductor/leftBtn-icon.png"),
      rightBtn: require("../../../../assets/images/majorFestivalsConductor/rightBtn-icon.png"),
      listData: [
      ],
      formData: {},
      pdfShow: false,
      title: '',
      pdfUrlData: undefined,
      searchName: undefined,
      pagination: {
        total: 0,
        current: 1,
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getPlanList();
    },
    //点击查看预案
    showDetail(obj) {
      this.pdfShow = true;
      this.formData = obj;
      this.title = obj.yamc;
      this.pdfUrlData = `/doc/api/store/preview/${this.formData.fileId}`

    },
    close() {
      this.pdfShow = false;
    },
    //预案左按钮
    handlePrev() {
      this.$refs.circle.prev();
    },
    //预案右按钮
    handleNext() {
      this.$refs.circle.next();
    },
    //pdf更多功能
    pdfDetail() {
      this.pdfUrlData = `/doc/api/store/preview/${this.formData.fileId}`
    },
    //获取预案列表
    getPlanList() {
      const code = 'INGmWT9L'
      const data = {
        body: {
          tybsm: 'GJH',
          yamc: this.searchName
        },
        page: this.pagination.current,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      getIdsmApi(code, data).then(res => {
        if (res.success) {
          this.listData = res.body.data
          this.pagination.total = +res.total
          console.log(this.listData, 'this.listData');
        }
      })
    },
    // 预案搜索
    onSearch() {
      this.pagination.current = 1
      this.getPlanList()
    },
    // 预案关闭
    doClose() {
      this.searchName = ''
      this.pagination.current = 1
      this.$emit('doClose', false)
    },
    pageChange(pages, pageSize) {
      this.pagination.current = +pages.pages;
      this.getPlanList();
    },
  }
}
</script>
<style scoped lang='less'>
@import '../../common.less';
.contingency-plan {
  .c-model-box {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .contingency-content {
    width: 1200vw * @w;
    height: 800vh * @h;
    display: flex;
    position: relative;
    // align-items: center;
    flex-direction: column;
    .leftBtn {
      position: absolute;
      left: 20vw * @w;
      top: 50%;
      width: 36vw * @w;
      height: 43vh * @h;
      transform: translateY(-50%);
      cursor: pointer;
    }

    .rightBtn {
      position: absolute;
      right: 18vw * @w;
      top: 50%;
      width: 36vw * @w;
      height: 43vh * @h;
      transform: translateY(-50%);
      cursor: pointer;
    }

    // 搜索
    .center-search {
      height: 60vh * @h;
      margin-bottom: 10vh * @h;
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #fff;
      .c-input {
        width: 300vw * @w;
        height: 100%;
        border: 1px rgb(1, 210, 233) solid;
        background-color: rgb(20, 38, 78);

        font-size: 14vh * @h;
        display: flex;
        align-items: center;
        padding-left: 10vw * @w;
        .box-sizing();
      }

      img {
        display: block;
        width: 30vh * @h;
        height: 30vh * @h;
        position: absolute;
        right: 1%;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }
  }
  .center-statics-list {
    width: 100%;
    height: 800vh * @h;
    flex-wrap: wrap;
    display: flex;
    // justify-content: space-around;
    justify-content: flex-start;
    // align-items: center;
    overflow: hidden;
    .plan {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .plan-img {
      display: flex;
      justify-content: center;
      position: relative;
      img {
        width: 144vw * @w;
        height: 182vh * @h;
        cursor: pointer;
      }
      .plan-level {
        position: absolute;
        color: #fff;
        top: 0;
        right: 23%;
        font-size: 16vh * @h;
      }
    }
    .plan-name {
      color: #fff;
      font-size: 20vh * @h;
      padding: 0 10vw * @w;
      margin-top: 14vh * @h;
      line-height: 40vh * @h;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      text-align: center;
    }
    .list {
      flex-shrink: 0;
      height: 320vh * @h;
      width: calc(100% / 5);
    }
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
  }
  .close-btn {
    width: 45vw * @w;
    height: 45vw * @w;
    color: #00ffff;
    position: absolute;
    top: -60vh * @h;
    right: 0vw * @w;
    cursor: pointer;
    /deep/.anticon {
      svg {
        width: 45vw * @w;
        height: 45vw * @w;
        display: inline-block;
      }
    }
  }
  .pdf-vue-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    // max-height: calc(800vh*@h -50vh@h);
    /deep/.pdf-view {
      width: 1000vw * @w;
      .btns {
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
  .plan-pop {
    z-index: 99999;
  }
  .Pdf_box {
    // position: fixed;
    // left: 0;
    // top: 0;
    width: 70vw;
    height: 85vh;
    z-index: 99999;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
/* @import url(); 引入css类 */
</style>