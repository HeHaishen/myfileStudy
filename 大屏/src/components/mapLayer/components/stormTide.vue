<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-01 16:35:11
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-05 16:48:08
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
            src="@/assets/images/dragonBoat/icon/u313.svg"
            class="positionImg"
            alt=""
          />
        </template>
      </mytable>
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
import moment from "moment";
export default {
  components: { mytable, titleBox },
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
        { title: "实况", index: 0 },
        { title: "预警", index: 1 },
      ],
      titleList2: [
        { title: "告警", index: 0 },
        { title: "未来", index: 1 },
        { title: "过去（累计）", index: 2 },
      ],
      flag: false,
      lineItem: {},
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

    getPrecipitation() {
      getDatainfo("J51XySin", this.defaultParams).then((res) => {
        if (res.success) {
          let time = res.body.data[0].ddatetimemax;
          this.lineItem = res.body.data[0];
          this.lineItem.ddatetimemax = moment(time).format();
          this.detectionareaContent = res.body.data;
        }
      });
    },
    //选择区县
    changeArea(e, i) {
      this.defaultParams.body.district = e.title;
      this.getPrecipitation();
      this.areaShow = false;
    },
    changeli() {},

    // 3 小时
    getThreeHours() {
      getDatainfo("ZE3Ii7C3", this.defaultParams).then((res) => {
        if (res.success) {
          if (res.body.data.length != 0) {
            res.body.data.map((e) => {
              e.hourrf = e.threehourrain;
            });
            let time = res.body.data[0].ddatetimemax;
            this.lineItem = res.body.data[0];
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
      } else {
        this.getPrecipitation();
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

</style>