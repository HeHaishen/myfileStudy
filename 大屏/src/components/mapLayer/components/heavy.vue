<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-01 16:35:11
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-11 15:14:58
-->
<template>
  <div class="content">
    <div class="search">
      <a-select class="c-select" placeholder="区间" @change="handleChange">
        <a-select-option
          v-for="(item, index) in detectionTime"
          :key="index"
          :value="item.value"
        >
          {{ item.title }}
        </a-select-option>
      </a-select>
    </div>
    <p>
      {{
        `据气象水文监测，${lineItem.ddatetimemax}，广州市${
          lineItem.obtname
        }，出现了广州市${lineItem.district}最大雨量${
          lineItem.hourrf
        }毫米，广州市平均雨量${(lineItem.hourrf - 4).toFixed(
          2
        )}毫米，超过25毫米的站点占广州市总站点数的0.0%`
      }}
    </p>
    <titleBox
      :titleList="titleList1"
      @changeli="changeli"
      :Setstyle="{ height: '40px', 'line-height': '40px' }"
    />
    <div class="deteTable">
      <mytable
        :columns="columns"
        :listData="detectionareaContent"
        @tableTdClick="tableTdClick"
      >
        <template slot="number" slot-scope="{ text, record, index }">
          {{ index + 1 }}
        </template>
        <template slot="slotarea">
          <div @click="areaShow = !areaShow" class="areaShow">
            <span> 区县</span>
            <i style="cursor: pointer"> <a-icon type="caret-down" /></i>
          </div>
        </template>
        <template slot="rainfall">
          雨量（mm）
          <img
            src="@/assets/images/dragonBoat/icon/u312.svg"
            alt=""
            class="wind"
            @click="onChangeSort"
          />
        </template>
        <template slot="slotbox">
          <div class="areaBox" v-show="areaShow">
            <ul class="areaUl">
              <li
                style="background-color: #206685"
                v-for="(e, i) in detectionarea"
                :key="i"
                @click="changeArea(e, i)"
              >
                {{ e.title }}
              </li>
            </ul>
          </div>
        </template>

        <template slot="position" slot-scope="{ text, record, index }">
          <img
            src="../../../assets/images/dragonBoat/icon/u313.svg"
            class="positionImg"
            alt=""
            @click="location(record)"
          />
        </template>
      </mytable>
      <div class="page">
        <Page
          :total="total"
          :currentPage="currentPage"
          @changePages="changePages"
        />
      </div>
    </div>
    <!-- <p class="warning">雨量警告</p>
    <titleBox
      :titleList="titleList2"
      @changeli="changeli"
      :Setstyle="{ height: '40px', 'line-height': '40px' }"
    />
    <div class="deteTable">
      <mytable />
    </div> -->
  </div>
</template>

<script>
import { getDatainfo } from "@/api/forestFire";
import mytable from "./mytable.vue";
import titleBox from "./titleBox.vue";
import Page from "./Page.vue";
import moment from "moment";
import imgUrl from "../../../assets/images/dragonBoat/icon/u14.svg";
export default {
  components: { mytable, titleBox, Page },
  data() {
    return {
      defaultParams: {
        body: {
          district: "",
          beginTime: "",
        },
        page: 1,
        pageSize: 10,
        sortName: "hourrf",
        sortOrder: "desc",
      },
      detectionTime: [
        {
          title: "过去一小时",
          value: 1,
        },
        {
          title: "过去三小时",
          value: 3,
        },
        {
          title: "过去一天",
          value: "day",
        },
      ],
      detectionActive: 0,
      detectionareaContent: [],
      areaShow: false,
      detectionarea: [
        { title: "广州市" },
        { title: "海珠区" },
        { title: "天河区" },
        { title: "番禺区" },
        { title: "荔湾区" },
        { title: "白云区" },
        { title: "黄浦区" },
        { title: "花都区" },
        { title: "南沙区" },
        { title: "从化区" },
        { title: "增城区" },
        { title: "越秀区" },
      ],
      columns: [
        { title: "序号", index: 0, textIndex: "number", width: "10%" },
        {
          title: "区县",
          textIndex: "district",
          soltIndex: "slotarea",
        },
        {
          title: "站址",
          textIndex: "obtname",
          width: "30%",
        },
        {
          title: "雨量（mm）",
          textIndex: "hourrf",
          soltIndex: "rainfall",
        },
        {
          title: "操作",
          textIndex: "position",
        },
      ],
      titleList1: [
        { title: "降雨量排行", index: 0 },
        { title: "区县排行", index: 1 },
      ],
      titleList2: [
        { title: "告警", index: 0 },
        { title: "未来", index: 1 },
        { title: "过去（累计）", index: 2 },
      ],
      flag: false,
      lineItem: {},
      total: 1,
      currentPage: 1,
    };
  },
  computed: {},
  watch: {},
  methods: {
    //更改排序
    onChangeSort() {
      this.flag = !this.flag;
      if (this.flag) {
        this.defaultParams.sortOrder = "asc";
      } else {
        this.defaultParams.sortOrder = "desc";
      }
      this.getPrecipitation();
    },
    //表格单行点击
    tableTdClick(item) {
      let { lineItem } = item;
      lineItem.ddatetimemax = moment(lineItem.ddatetimemax).format();
      this.lineItem = lineItem;
    },
    changePages(val) {
      console.log(val);
      this.currentPage = val.pages;
      this.getPrecipitation();
    },

    location(data) {
      console.log(data);
      data.lat = data.lat1;
      data.lon = data.lon1;
      var title = [
        {
          title: "区县",
          textIndex: "district",
        },
        {
          title: "站址",
          textIndex: "obtname",
        },
        {
          title: "雨量（mm）",
          textIndex: "hourrf",
        },
      ];
      var items = pGzznCore.deepClone([data]);
      var objs = {
        imgUrl: require("../../../assets/images/dragonBoat/icon/u14.svg"),
        imgSize: { width: 40, height: 40 },
        type: "defaultTypeRain",
        layerName: "强降雨",
        isFlagPopule: true,
        info: title,
        data: items,
           lonLat: { lon: "lon1", lat: "lat1" },
      };
      console.log(imgUrl);
      console.log(items,'items---------------------------------');
      // pGzznCore.setPointLayerToMap(items, objs, () => {
      //   pGzznCore.flyToPoint({ x: data.lon, y: data.lat, z: 13673 }, objs);
      // });
         pGzznCore.flyToPoint({ x: data.lon1, y: data.lat1, z: 13673 }, objs);
    },

    getPrecipitation() {
      this.defaultParams.page = this.currentPage;
      getDatainfo("J51XySin", this.defaultParams).then((res) => {
        if (res.success) {
          let result = JSON.parse(JSON.stringify(res.body.data))
          let time = result.ddatetimemax;
          this.lineItem = result[0];
          this.lineItem.ddatetimemax = moment(time).format();
          this.detectionareaContent = res.body.data;
          this.total = Number(res.total);
        }
      });
    },
    //选择区县
    changeArea(e, i) {
      this.defaultParams.body.district = e.title;
      this.getPrecipitation();
      this.areaShow = false;
    },
    changeli(e,i) {
       if (i==0) {
        this.defaultParams.sortOrder = "asc";
      } else {
        this.defaultParams.sortOrder = "desc";
      }
      this.getPrecipitation();
    },

    // 3 小时
    getThreeHours() {
      getDatainfo("ZE3Ii7C3", this.defaultParams).then((res) => {
        if (res.success) {
           let result = JSON.parse(JSON.stringify(res.body.data))
            this.total = Number(res.total);
          if (res.body.data.length != 0) {
            res.body.data.map((e) => {
              e.hourrf = e.threehourrain;
            });
            let time = result[0].ddatetimemax;
            this.lineItem = result[0];
            this.lineItem.ddatetimemax = moment(time).format();
          }
          this.detectionareaContent = res.body.data;
        }
      });
    },
    //一天
    getDay() {
      getDatainfo("MJWuwh1E", this.defaultParams).then((res) => {
        if (res.success) {
            let result = JSON.parse(JSON.stringify(res.body.data))
             this.total = Number(res.total);
          if (res.body.data.length != 0) {
            res.body.data.map((e) => {
              e.hourrf = e.dayrain;
            });
            let time = result[0].ddatetimemax;
            this.lineItem = result[0];
            this.lineItem.ddatetimemax = moment(time).format();
          }
          this.detectionareaContent = res.body.data;
        }
      });
    },

    // 时间选择
    handleChange(value) {
      this.defaultParams.body.beginTime = moment(
        moment().subtract(value, "hours").format("YYYY-MM-DD HH:mm:ss")
      ).valueOf();
      if (value == 3) {
        this.getThreeHours();
      } else if (value == 1) {
        this.getPrecipitation();
      } else {
        this.getDay();
      }
    },
  },
  created() {},
  mounted() {
    this.getPrecipitation();
  },
};
</script>
<style lang='less' scoped>
/deep/.list-body {
  // height: 280px !important;
}
@import "../index.less";
.search {
  padding: 0 10px;
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin-bottom: 5px;
  .c-select {
    width: 100%;
    color: white;
    margin-top: 10px;
    .ant-select-dropdown {
      z-index: 999999999999999;
    }
    /deep/ .ant-select-selection {
      height: 30px;
      border: 1px solid #195a95;
      background-color: #26425f;
      .ant-select-selection__rendered {
        height: 100%;
        .ant-select-selection__placeholder {
          height: 100%;
          top: 50%;
        }
      }
    }
  }
}
.deteTable {
  margin-top: 9px;
}
/deep/.ant-tree li span.ant-tree-switcher,
.ant-tree li span.ant-tree-iconEle {
  color: #fff !important;
}
</style>