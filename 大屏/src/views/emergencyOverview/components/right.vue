<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-09-13 11:10:49
-->
<template>
  <div class="emergency-overview-right">
    <div class="right-left">
      <div class="model-title">城市生命线</div>
      <div class="city-line-chart"></div>
      <div class="model-title title-margin-slef">重要交通设施</div>
      <div class="traffic-wrap">
        <ul>
          <li
            v-for="(i, k) in trafficList"
            :key="k"
            @click="switchCamera(k)"
            :class="{
              'point-and-click': i.name === '地铁站',
            }"
          >
            <p>{{ i.name }}</p>
            <p>
              <label for="">{{ i.num }}</label
              >{{ i.unit }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="right-right">
      <div class="model-title">法制保障</div>
      <div class="legal-institution">
        <ul class="legal-institution-list">
          <li
            v-for="(i, k) in legaLinstitutionList"
            :key="k"
            :style="{ 'background-image': i.bg }"
            class="institution-item"
            @click="changeLegaLinstitutionList(i, k)"
          >
            <p>{{ i.name }}</p>
          </li>
        </ul>
        <div class="legal-institution-tables">
          <div class="table-list-header">
            <p>序号</p>
            <p>内容</p>
            <p>日期</p>
          </div>
          <ul class="table-list-content" v-if="legaLinstitutionData.length">
            <li v-for="(item, index) in legaLinstitutionData" :key="index">
              <div>{{ item.rownum ? item.rownum : "" }}</div>
              <div @click="legalDetail(item)" class="legal-item">
                {{ item.content ? item.content : "" }}
                <p></p>
              </div>
              <div>{{ item.createDate ? item.createDate : "" }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="model-title">举一反三</div>
      <div class="the-lines">
        <div class="the-lines-content the-lines-left">
          <div class="lines-img-top">
            <!--  <video
              :src="choseImgObj.url"
              controls
              muted
              style="height: 100%; width: 100%"
            ></video> -->
            <video
              :src="choseImgObj.url"
              controls
              muted
              autoplay="autoplay"
              style="height: 100%; width: 100%"
            ></video>
          </div>
          <div class="lines-img-bottom">
            <div class="img-bottom-inner">
              <p
                v-for="(i, k) in theLinesNewList"
                :key="k"
                @click="theLinesNewClidk(i.url, k)"
              >
                <!-- <video src="../../../assets/media/nua.mp4" muted autoplay loop style="height:100%;width:100%;"></video> -->
                <img
                  :src="`/doc/api/store/preview/${i.url}`"
                  alt=""
                  :class="[choseImgObj['key'] === k ? 'chose-img' : '']"
                />
              </p>
            </div>
          </div>
        </div>
        <div class="the-lines-content the-lines-right">
          <ul>
            <li
              v-for="(i, k) in theLinesNewList"
              :key="k"
              @click="theLinesNewClidk(i.url, k)"
              :class="{ 'click-li': choseImgObj.key === k }"
            >
              <div>
                <img
                  src="../../../assets/images/emergencyOverview/icon_list_video.png"
                  alt=""
                />
              </div>
              <div>
                {{ i.name }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <tempPop
      :title="metro.title"
      :show="metro.show"
      :v-show="metro.show"
      :setStyles="{ left: '70%', top: '65%' }"
      class="command-table command-table3"
      @doClose="metroClose"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="search">
          <select v-model="lineType" @change="lineTypeClick">
            <option :value="i.dictValue" v-for="i in lineList" :key="i.dictKey">
              {{ i.dictKey }}
            </option>
          </select>
          <div class="water_search">
            <a-input-search
              placeholder="输入关键字"
              v-model="metro.input"
              @search="metroInput"
            />
          </div>
          <!-- <div class="search-icon">
            <input type="text" v-model="metro.input" />
            <div class="icon-container" @click="metroInput">
              <img :src="iconSearch" alt="" class="img" />
            </div>
          </div> -->
        </div>

        <div class="table-list">
          <Table :columns="metro.columnList" :listData="metro.dataList">
            <template slot="location" slot-scope="{ record, text }">
              <div class="border" @click="emergencyTeamLocation(record)">
                定位
              </div>
            </template>
          </Table>
        </div>
        <div class="list-change-page">
          <ChangePage
            :total="metro.total"
            :currentPage="metro.currentPage"
            @changePages="clickMetroChangePages"
          />
        </div>
      </template>
    </tempPop>
    <tempPop
      v-if="pdf.show"
      :show="pdf.show"
      :setStyles="{ left: '91.5%', top: '53%' }"
      @doClose="pdfClose"
      opsition="pageRight"
      class="command-table command-table3"
      :title="pdf.title"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="pdf-vue-view">
          <PdfView
            v-if="pdf.show"
            :pdfUrl="`/doc/api/store/preview/${this.pdf.field}`"
            :recordData="this.pdf.formData"
          >
          </PdfView>
        </div>
      </template>
    </tempPop>
    <tempPop
      :title="law.title"
      :show="law.show"
      :v-show="law.show"
      :setStyles="{ left: '75.87%', top: '53%' }"
      class="command-table command-table4"
      @doClose="lawClose"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="search">
          <div></div>
          <div class="water_search">
            <a-input-search
              placeholder="输入关键字"
              v-model="law.input"
              @search="lawInput"
            />
          </div>
          <!-- <div class="search-icon">
            <input type="text" v-model="law.input" />
            <div class="icon-container" @click="lawInput">
              <img :src="iconSearch" alt="" class="img" />
            </div>
          </div> -->
        </div>

        <div class="table-list">
          <Table :columns="law.columnList" :listData="law.dataList">
            <template slot="content" slot-scope="{ record, text }">
              <div @click="legalDetail(record)">
                {{ text }}
              </div>
            </template>
          </Table>
        </div>
        <div class="list-change-page">
          <ChangePage
            :total="law.total"
            :currentPage="law.currentPage"
            @changePages="clickLawChangePages"
          />
        </div>
      </template>
    </tempPop>
  </div>
</template>

<script>
import Pdf from "vue-pdf";
import PdfView from "@/components/pdf/pdf-view";
import listDatas from "../utils/datas";
import { getIndicator, getFile } from "@/api/emergencyOverview";
import { useIdGetFile } from "@/api/common";
import tempPop from "@/views/dragonBoatNormal/components/pop.vue";
import Table from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage";
import pdfView from "@/components/pdf/pdf-view";
export default {
  data() {
    return {
      // 法律法规
      law: {
        input: "",
        total: 0,
        currentPage: 1,
        title: "",
        show: false,
        columnList: [
          { title: "序号", index: 0, textIndex: "index", width: "15%" },
          { title: "内容", index: 1, textIndex: "content", width: "70%" },
          { title: "日期", index: 2, textIndex: "createDate", width: "15%" },
        ],
        dataList: [],
      },
      // pdf
      pdf: {
        show: false,
        title: "",
        formData: {},
        field: "",
      },
      areaData: {},
      lineList: [],
      lineType: "",
      iconSearch: require("../../../assets/images/dragonBoatNormal/u43.svg"),
      metro: {
        input: "",
        total: 0,
        currentPage: 1,
        title: "地铁站",
        show: false,
        columnList: [
          { title: "名称", index: 0, textIndex: "site", width: "15%" },
          { title: "区域", index: 1, textIndex: "areaCode", width: "15%" },
          { title: "线路", index: 2, textIndex: "line", width: "15%" },
          { title: "地址", index: 3, textIndex: "position", width: "35%" },
          { title: "定位", index: 4, textIndex: "location", width: "20%" },
        ],
        dataList: [],
      },
      cityLineDiv: null,
      trafficList: [
        { name: "机场", num: "1", unit: "个" },
        { name: "火车站", num: "5", unit: "个" },
        { name: "地铁站", num: "213", unit: "个" },
        { name: "港口", num: " 5", unit: "个" },
      ],
      // 法制保障
      legaLinstitutionList: [
        {
          name: "法律法规",
          bg: `url('${require("../../../assets/images/emergencyOverview/btn-bg1.png")}')`,
        },
        {
          name: "依法行政",
          bg: `url('${require("../../../assets/images/emergencyOverview/btn-bg3.png")}')`,
        },
        {
          name: "他山之石",
          bg: `url('${require("../../../assets/images/emergencyOverview/btn-bg2.png")}')`,
        },
      ],
      legaLinstitutionData: [], // 法制保障 tab栏内容
      // 举一反三
      choseImgObj: { url: "", key: 0 }, // 举一反三左上视频
      theLinesImgList: [], // 举一反三左下图片
      theLinesNewList: [], // 举一反三右边列表
      videoList: [
        { url: require("../../../assets/media/Thelines1.mp4") },
        { url: require("../../../assets/media/Thelines2.mp4") },
        { url: require("../../../assets/media/Thelines3.mp4") },
        { url: require("../../../assets/media/Thelines4.mp4") },
      ],
      data: {
        body: {
          line: "",
          site: "",
          type: "",
          parentId: "",
          content: "",
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      },
    };
  },
  components: {
    tempPop,
    Table,
    ChangePage,
    PdfView,
  },
  created() {
    // 获取城市生命线
    this.getRiskList();
    // 获取重要交通设施
    this.getTrafficList();
    // 获取法制保障
    this.getLegaSafeguard(1, -1);
    // 获取举一反三
    this.getTheLinesNewList();
  },
  methods: {
    pdfClose() {
      this.pdf.show = false;
    },

    // 获取上册总和下册总的数据
    getLawAndRegulationsData(type, parentId) {
      this.data.body.type = type;
      this.data.body.parentId = parentId;
      // this.data.body = { type, parentId };
      getIndicator("LCO1daHa", this.data).then((res) => {
        if (res.success) {
          console.group("获取上册总和下册总的数据", res);
          this.law.total = parseInt(res.body.total);
          this.law.dataList = res.body.data.map((val, index) => {
            val.createDate = val.createDate.split(" ")[0];
            val.index = index + 1;
            return val;
          });
        }
      });
    },

    // 获取pdf getFile
    legalDetail(obj) {
      if (obj.fileId === null) {
        this.law.show = true;
        if (obj.content === "上册总") {
          this.law.title = "法律法规-上册";
          this.getLawAndRegulationsData(1, 1);
        } else if (obj.content === "下册总") {
          this.law.title = "法律法规-下册";
          this.getLawAndRegulationsData(1, 2);
        }
      } else {
        this.pdf.show = true;
        this.pdf.formData = obj;
        this.pdf.title = obj.content;
        this.pdf.field = obj.fileId;
      }
      console.log("获取pdf的详细内容", obj, pdfView);
    },

    metroInput() {
      this.metro.currentPage = 1;
      this.data.page = 1;
      this.data.body.site = this.metro.input;
      this.getMetroStationData();
    },

    // 法律法规
    lawInput() {
      this.law.currentPage = 1;
      this.data.page = 1;
      this.data.body.content = this.law.input;
      // this.getMetroStationData();
      this.getLawAndRegulationsData(1, this.data.body.parentId);
    },
    // 地铁站切换
    lineTypeClick() {
      console.log("切换下拉框", this.lineType);
      this.data.page = 1;
      this.metro.currentPage = 1;
      this.getMetroStationData();
    },
    // 获取地铁线
    getLineList() {
      getIndicator("9GO8HDzz", {
        body: {
          dictName: "SUBWAY_LINES",
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      }).then((res) => {
        if (res.success) {
          // console.log("获取地铁线", res);
          this.lineList = res.body.data;
          this.lineList.unshift({
            dictValue: "",
            dictKey: "全部",
          });
        }
      });
    },

    // 地铁站分页
    clickMetroChangePages(pages, pageSize) {
      this.metro.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.data.page = pages.pages;
      this.getMetroStationData();
    },

    // 法律法规分页
    clickLawChangePages(pages, pageSize) {
      console.log("法律法规分页", pages, pageSize);
      this.law.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.data.page = pages.pages;
      this.getLawAndRegulationsData(1, this.data.body.parentId);
      // this.getMetroStationData();
    },

    // 关闭地铁站
    metroClose() {
      pGzznCore.addPromiseMetroListRemove();
      this.data.page = 1;
      this.metro.currentPage = 1;
      this.metro.show = false;
      this.data.body.site = "";
      this.metro.input = "";
    },

    lawClose() {
      this.data.page = 1;
      this.law.currentPage = 1;
      this.law.show = false;
      this.data.body.content = "";
      this.law.input = "";
    },

    // 获取重要交通设施 地铁站
    getMetroStationData() {
      this.data.body.line = this.lineType;
      getIndicator("n39hKkOY", this.data).then((res) => {
        if (res.success) {
          // this.theLinesNewList = res.body.data;
          // this.init();
          console.log("获取重要交通设施123", res);
          pGzznCore.addPromiseMetroList(res.body.data);
          this.metro.dataList = res.body.data;
          this.metro.total = parseInt(res.body.total);
          console.log("获取重要交通设施", this.metro.dataList);
        }
      });
    },

    // 获取城市生命线
    getRiskList() {
      getIndicator("dBojksaD", this.data).then((res) => {
        if (res.success) {
          let cityLineChart = JSON.parse(
            JSON.stringify(res.body.data).replace(/num/g, "value")
          );
          this.initChart(cityLineChart);
        }
      });
    },

    // 获取重要交通设施
    getTrafficList() {
      getIndicator("DdFG6Iu9", this.data).then((res) => {
        if (res.success) {
          console.log("获取重要交通设施", res);
          this.trafficList = res.body.data;
        }
      });
    },

    // 获取法制保障
    getLegaSafeguard(type, parentId) {
      this.data.body = { type, parentId };
      getIndicator("LCO1daHa", this.data).then((res) => {
        if (res.success) {
          console.group("获取法制保障", res);
          this.legaLinstitutionData = res.body.data.map((val) => {
            val.createDate = val.createDate.split(" ")[0];
            return val;
          });
        }
      });
    },

    switchCamera(k) {
      if (k == 0) {
        pGzznCore.addPromiseAirport();
      } else if (k == 1) {
        pGzznCore.addPromiseRailway();
      } else if (k == 2) {
        pGzznCore.addPromiseMetro();
        this.metro.show = true;
        // this.data.body.line = this.lineType;
        this.getMetroStationData();
        this.getLineList();
      } else if (k == 3) {
        pGzznCore.addPromiseHarbor();
      }
    },

    // 获取举一反三
    getTheLinesNewList() {
      getIndicator("UQylYNlO", this.data).then((res) => {
        if (res.success) {
          this.theLinesNewList = res.body.data;
          // this.theLinesNewList.map((i,k)=>{})
          this.init();
        }
      });
    },
    init() {
      this.choseImgObj = JSON.parse(
        JSON.stringify({
          url: `/doc/api/store/preview/${this.theLinesNewList[0]["fileId"]}`,
        })
      );
      this.choseImgObj.key = 0;
    },
    initChart(obj) {
      this.cityLineDiv = this.$echarts.init(
        document.querySelector(".city-line-chart")
      );
      this.cityLineDiv.setOption(this.cityLinePie(obj));
      let that = this;
      window.onresize = function () {
        that.cityLineDiv.resize();
      };
    },
    cityLinePie(obj) {
      let colors = [
        "#0079fe",
        "#00e4ff",
        "#e7468e",
        "#19dd7c",
        "#28b1ff",
        "#b620e0  ",
        "#ffed26",
      ];

      let that = this;
      let option = {
        color: colors,
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
        },
        legend: {
          top: "0",
          left: "right",
          orient: "vertical",
          icon: "circle",
          itemWidth: that.$setFontSize(12),
          itemHeight: that.$setFontSize(12),
          textStyle: {
            color: "#01c7e2",
            fontSize: that.$setFontSize(16),
          },
          data: [
            "通讯基础设施",
            "重要交通设施",
            "地下管廊",
            "水电气",
            "超高层建筑",
            "危化管线",
            "人民防空",
          ],
          formatter: function (name) {
            let index = 0;
            let clientlabels = [
              "通讯基础设施",
              "重要交通设施",
              "地下管廊",
              "水电气",
              "超高层建筑",
              "危化管线",
              "人民防空",
            ];
            let clientcounts = [9, 1, 10, 11, 222, 9, 1];
            let sum = 0;
            //求和
            clientcounts.forEach((number) => (sum += number));

            clientlabels.forEach(function (value, i) {
              if (value == name) {
                index = i;
              }
            });
            let percents =
              Math.round((clientcounts[index] / sum) * 10000) / 100 + "%";
            // return name + " --- " + percents + " --- " + clientcounts[index];
            return name;
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "90%"],
            center: ["45%", "47%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                color: "white",
                fontSize: that.$setFontSize(20),
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: obj || [
              { value: 1048, name: "通讯基础设施" },
              { value: 735, name: "重要交通设施" },
              { value: 580, name: "地下管廊" },
              { value: 484, name: "水电气" },
              { value: 300, name: "超高层建筑" },
              { value: 484, name: "危化管线" },
              { value: 300, name: "人民防空" },
            ],
          },
        ],
      };
      return option;
    },
    emergencyTeamLocation(record) {
      pGzznCore.addPromiseMetroLocation(record);
    },
    // 举一反三列表,图片点击
    theLinesNewClidk(url, key) {
      this.videoList[key];
      /* this.choseImgObj = JSON.parse(
        JSON.stringify({ url: this.videoList[key]["url"], key })
      ); */
      // theLinesNewList
      this.choseImgObj = JSON.parse(
        JSON.stringify({
          url: `/doc/api/store/preview/${this.theLinesNewList[key]["fileId"]}`,
          key,
        })
      );
    },
    // 法制保障借切换
    changeLegaLinstitutionList(i, k) {
      if (k !== 0) {
        this.getLegaSafeguard(k + 1);
      } else {
        this.getLegaSafeguard(k + 1, -1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
.command-table {
  width: 1500vw * @w;
  height: auto;
  padding: 10vh * @h;
  background-color: #0d3858;
  text-align: center;

  .video-discussion {
    color: #fff;
    text-align: right;
    margin-bottom: 10vh * @h;

    span {
      display: inline-block;
      width: 130vw * @w;
      height: 35vh * @h;
      line-height: 35vh * @h;
      text-align: center;
      font-size: 20vh * @h;
      border-radius: 5vh * @h;
      margin-right: 20vw * @w;
      background-color: #169bd5;
    }
  }

  .command-table-content {
    margin-top: 10vh * @h;
    display: flex;
    height: 650vh * @h;

    .command-table-left {
      width: 320vw * @w;
      height: 100%;
      margin-right: 30vw * @w;
      border: 1px solid #797979;
      background-color: #071f40;
      padding: 20vh * @h 20vw * @w;
      color: #fff;
      overflow-x: hidden;

      /deep/ span {
        color: white;
        font-size: 18vh * @h;
      }

      & /deep/ .ant-tree-switcher {
        font-size: 18vh * @h;
      }

      & /deep/ .ant-tree-switcher i {
        font-size: 18vh * @h;
      }

      & /deep/ .ant-tree-node-selected {
        background-color: transparent;
      }

      /deep/ .ant-tree-node-selected span {
        color: #2de9e8;
      }

      /deep/ .ant-tree-switcher {
        width: auto;
      }
    }

    .command-table-right {
      flex: 1;
      height: 100%;
      color: #fff;
      overflow-y: auto;

      > div {
        > p {
          display: flex;
          align-items: center;
          font-size: 20vh * @h;
          margin: 0;
          padding: 10vh * @h 20vw * @w;
          border: 1px solid #0e2c58;
          background-color: #1b2f4c;

          > img {
            width: 25vw * @w;
            height: auto;
            margin-right: 12vw * @w;
          }
        }

        .command-table-right-list {
          > div {
            display: flex;
            align-items: center;
            margin: 0;
            padding: 0 20vw * @w;
            height: 60vh * @h;

            > input {
              margin-left: 10vw * @w;
              margin-right: 18vw * @w;
            }

            > span {
              flex: 2;
              font-size: 12vh * @h;

              &:nth-child(4) {
                flex: 4;
              }
            }

            &:nth-child(2n) {
              background-color: #0e3058;
            }
          }
        }
      }

      .no-datatips {
        color: #fff;
        font-size: 22vh * @h;
      }
    }
  }

  .clist-table {
    color: #fff;
    margin-top: 10vh * @h;
    padding: 10vh * @h 15vw * @w;
    .content-div {
      width: 100%;
      height: 300vh * @h;
      display: flex;
      .text-chart {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 30%;
        font-size: 24vh * @h;
        .title {
          font-size: 24vh * @h;
          text-align: left;
        }
        p {
          text-align: left;
          width: 100%;
          font-size: 13vh * @h;
        }
      }
      .content-list {
        width: 100%;
        height: 100%;

        /deep/.c-tables {
          height: 100%;
          overflow: hidden;

          .list-body {
            background-color: transparent;

            .location {
              padding: 6vh * @h 10vw * @w;
              display: inline-block;
              border: 1vh * @h solid rgb(1, 255, 255);
              cursor: pointer;
            }
          }
        }
      }
    }
    .team_box {
      flex: 1;

      height: 100%;
      .team-chart {
        width: 100%;
        height: 100%;
      }
    }

    .type-switch {
      color: #fff;
      display: flex;
      align-items: center;
      .graph {
        width: 90vw * @w;
        height: 39vh * @h;
        text-align: center;
        border: 1px solid #0066cc;
        cursor: pointer;
      }
      > div {
        height: 50vh * @h;
        display: flex;
        align-items: center;
        background-color: #1d4948;
        padding: 0 14vw * @w;
        margin-right: 20vh * @h;

        img {
          width: 40vw * @w;
          height: auto;
          margin-right: 10vh * @h;
        }

        span {
          font-size: 22vh * @h;
        }
      }

      > ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 120vw * @w;
          height: 35vh * @h;
          line-height: 35vh * @h;
          text-align: center;
          font-size: 14vh * @h;
          padding: 0 10vw * @w;
          margin-right: 10vw * @w;
          background-color: #0b495a;
          border: 2px solid #0066cc;
        }

        li.active {
          background-color: #0066cc;
        }
      }
    }

    .conditions-search {
      display: flex;
      align-items: center;
      margin: 15vh * @h 0 20vh * @h;

      > span {
        font-size: 18vh * @h;
      }

      > input {
        width: 200vw * @w;
        height: 35vh * @h;
        line-height: 30vh * @h;
        background-color: #333333;
        color: #fff;
        padding-left: 20vw * @w;
        border: none;
        margin-right: 30vw * @w;
        font-size: 16vh * @h;

        &::placeholder {
          color: #eee;
        }
      }

      > button {
        background-color: #169bd5;
        border: none;
        margin-right: 10vh * @h;
      }
    }

    .clist-table-list-title {
      display: flex;
      max-height: 600vh * @h;
      // overflow: hidden;
      // overflow-y: auto;
      justify-content: space-between;

      > div {
        width: 24.5%;

        > p {
          font-size: 16vh * @h;
          text-align: center;
          color: #ffff99;
          font-weight: 600;
        }
      }
    }

    .clist-table-list {
      // display: flex;
      max-height: 600vh * @h;
      justify-content: space-between;

      > div {
        // width: 24.5%;
        height: 500vh * @h;
        overflow: hidden;

        > p {
          font-size: 16vh * @h;
          text-align: center;
          color: #ffff99;
          font-weight: 600;
        }
      }
    }

    .clist-table-list2 {
      // display: flex;
      max-height: 600vh * @h;
      justify-content: space-between;

      > div {
        width: 100%;
        height: 500vh * @h;
        overflow: hidden;

        > p {
          font-size: 16vh * @h;
          text-align: center;
          color: #ffff99;
          font-weight: 600;
        }
      }
    }
  }

  .mouse-click {
    cursor: pointer;
  }
}

.command-table3 {
  width: 750vw * @w;
}

.command-table4 {
  width: 956vw * @w;
}
</style>
