<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-01 16:35:11
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-11 13:37:31
-->
<template>
  <div class="content">
    <div class="search">
      <a-select
        id="c-select"
        class="c-select"
        placeholder="区域"
        dropdownClassName="c-popuper-style"
        @change="handleChange"
      >
        <a-select-option
          :value="item.value"
          v-for="item in detectionTime"
          :key="item.value"
        >
          {{ item.title }}
        </a-select-option>
      </a-select>
    </div>
    <p class="p1">
      据气象监测，27日10时至28日10时，个别站点出现6级短时大风，其中，花都区花山镇邝维煜小学（G3419）录得最大阵风10.8米/秒（6级）。
      <br />
      <span style="font-weight: 600" class="span1">
        全市瞬时风站点排行 {{ lastTime }}</span
      >
    </p>
    <div class="deteTable">
      <mytable :columns="columns" :listData="listData">
        <template slot="parentName">
          <div class="areaShow">
            <span>区县</span>
            <i style="cursor: pointer" @click="areaShow = !areaShow">
              <a-icon type="caret-down"
            /></i>
          </div>
        </template>
        <template slot="number" slot-scope="{ text, record, index }">
          {{ index + 1 }}
        </template>
        <template slot="wind">
          <div class="areaShow" @click="onChangeSort">
            <span>风速（m/s）</span>
            <img
              src="@/assets/images/dragonBoat/icon/u312.svg"
              alt=""
              class="wind"
            />
          </div>
        </template>
        <template slot="slotbox">
          <div class="areaBox" v-show="areaShow">
            <ul class="areaUl">
              <li
                v-for="(e, i) in detectionarea"
                :key="i"
                @click="changeArea(e, i)"
                style="background-color: #206685"
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
    <div class="galewarning">
      <p>大风范围影响</p>
      <p>共 11 个 县区收到 ≥2 级风影响</p>
      <div class="galewarningList">
        <ul>
          <li v-for="(e, i) in detectionarea" :key="i">
            {{ e.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatainfo } from "@/api/forestFire";
import mytable from "./mytable.vue";
import moment from "moment";
import Page from "./Page.vue";
export default {
  components: { mytable, Page },
  data() {
    return {
      defaultParams: {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "wdidf",
        sortOrder: "desc",
      },
      areaShow: false,
      listData: [],
      columns: [
        { title: "序号", index: 0, textIndex: "number", width: "10%" },
        {
          title: "区县",
          textIndex: "district",
          soltIndex: "parentName",
        },
        {
          title: "站址",
          textIndex: "obtname",
          width: "30%",
        },
        {
          title: "风速（m/s）",
          textIndex: "wdidf",
          soltIndex: "wind",
        },
        {
          title: "操作",
          textIndex: "position",
        },
      ],
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
        // { title: "广州市" },
        { title: "珠海区" },
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
      lastTime: "111",
      flag: false,
      total: 1,
      currentPage: 1,
    };
  },
  computed: {},
  watch: {},
  methods: {
    //一小时风速
    getDayWind() {
      getDatainfo("werhqq0q", this.defaultParams).then((res) => {
        console.log(res, "res-------------------->");
        if (res.success) {
          this.listData = res.body.data;
          this.total = Number(res.total);
        }
      });
    },
    location(data) {
      var items = pGzznCore.deepClone([data]);
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
          title: "风速（m/s）",
          textIndex: "wdidf",
        },
      ];
      var objs = {
        imgUrl: require("../../../assets/images/dragonBoat/icon/u58.svg"),
        imgSize: { width: 40, height: 35 },
        type: "defaultTypeGale",
        layerName: "风速",
        info: title,
        data: items,
        isFlagPopule: true,
           lonLat: { lon: "lon1", lat: "lat1" },
      };
        pGzznCore.flyToPoint({ x: data.lon1, y: data.lat1, z: 13673 }, objs);
    },
    changePages(val) {
      this.currentPage = val.pages;
      this.getPrecipitation();
    },
    //选择区县
    changeArea(e, i) {
      this.defaultParams.body.district = e.title;
      this.getPrecipitation();
      this.areaShow = false;
    },
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

    getPrecipitation() {
      this.defaultParams.page = this.currentPage;
      getDatainfo("AMNiZVo3", this.defaultParams).then((res) => {
        console.log(res, "res-------------------->");
        if (res.success) {
          this.listData = res.body.data;
          this.total = Number(res.total);
        }
      });
    },
    handleChange(value) {
      this.defaultParams.body.beginTime = moment(
        moment().subtract(value, "hours").format("YYYY-MM-DD HH:mm:ss")
      ).valueOf();
      if (value == 3) {
        this.getThreeHours();
      } else if (value == 1) {
        this.getDayWind();
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
@import "../index.less";
.search {
  padding: 0 5px;
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
.galewarning {
  padding: 8px;

  .galewarningList {
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      li {
        width: 22%;
        text-align: center;
        margin: 5px;
        margin-top: 8px;
        border: 1px solid #02a7f0;
        color: #80ffff;
        height: 30px;
        border-radius: 5px;
        line-height: 30px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
.p1 {
  font-size: 14px;
  font-weight: 400;
  .span1 {
    font-weight: 600;
    color: #fff;
  }
}
.area {
  top: 41px;
}
</style>