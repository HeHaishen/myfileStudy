<!--
 * @Description: 弹出窗口视图
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-11 10:05:47
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-14 20:31:43
-->
<!-- 弹出窗口视图 -->
<template>
  <div class="up_view">
    <div class="conditions-search">
      <span>{{ activeKey > 2 ? "站点" : "姓名" }}：</span
      ><input
        v-model="queryData.name"
        :placeholder="activeKey > 2 ? '站点' : '姓名'"
      />
      <!-- <span v-if="activeKey < 3">区域：</span>
      <a-select
        v-if="activeKey < 3"
        id="c-select"
        class="c-select"
        placeholder="区域"
        v-model="queryData.areaCode"
        dropdownClassName="up_view_c_popuper_style"
      >
        <a-select-option
          :value="item.value"
          v-for="item in areaList"
          :key="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select> -->
      <button class="mouse-click btn" @click="onQuery">查询</button>
      <button class="mouse-click btn" @click="onEmpty">清空</button>
    </div>
    <clist
      class="list"
      :columns="
        activeKey == 1
          ? columns.filter(
              (e) =>
                e.orgType != 2 && e.textIndex != 'dw' && e.textIndex != 'obtid'
            )
          : columns
      "
      :listData="listData"
    >
      <template
        v-for="item in columns.filter((e) => e.textIndex != 'dw')"
        :slot="item.textIndex"
        slot-scope="{ text }"
      >
        <span :title="text" :key="item.textIndex">
          {{ text }}
        </span>
      </template>
      <template
        v-for="item in ['phone']"
        :slot="item"
        slot-scope="{ text, record }"
      >
        <div :title="text" class="phone" :key="item">
          {{ text }}
          <a-icon
            type="phone"
            class="icon"
            @click="clickMobilePhone(record, $event)"
            v-show="text"
          />
          <a-icon
            type="mail"
            class="icon"
            @click="clickMessage(record, $event)"
            v-show="text"
          />
        </div>
      </template>
      <template slot="dw" slot-scope="{ record }">
        <div class="dw" @click="onGPS(record)">
          <svg
            t="1633855607571"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2761"
            width="100%"
            height="100%"
          >
            <path
              d="M512 943.98c223.99-224.73 335.984-399.578 335.984-524.547C847.984 231.98 697.56 80.02 512 80.02S176.016 231.98 176.016 419.433C176.016 544.4 288.01 719.25 512 943.98z m45.327 45.177c-25.01 25.093-65.645 25.093-90.654 0-235.25-236.027-354.654-422.443-354.654-569.724C112.02 196.78 290.951 16.024 512 16.024s399.98 180.757 399.98 403.409c0 147.281-119.403 333.697-354.653 569.724zM512 544c70.689 0 127.994-57.305 127.994-127.994S582.69 288.01 512 288.01s-127.994 57.305-127.994 127.994S441.31 543.999 512 543.999z m0 63.996c-106.034 0-191.99-85.956-191.99-191.99S405.965 224.014 512 224.014s191.99 85.957 191.99 191.99S618.034 607.996 512 607.996z"
              p-id="2762"
              fill="#1383FE"
            ></path>
          </svg>
        </div>
      </template>
    </clist>
    <div class="pagination">
      <ChangePage
        :total="total"
        :currentPage="currentPage"
        @changePages="changePages"
      />
    </div>

    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import { getIdsmApi } from "@/api/idsm/index";
import mixin from "./mixin";

export default {
  components: { Clist, ChangePage },
  mixins: [mixin],
  props: {
    activeKey: { type: String },
  },
  data() {
    return {
      columns: [
        { title: "姓名", textIndex: "name" },
        { title: "工作单位", textIndex: "orgName" },
        { title: "职务", textIndex: "post" },
        { title: "电话", textIndex: "phone" },
        { title: "保障队伍", textIndex: "supportTeam", orgType: 2 },
        { title: "保障力量", textIndex: "supportForce", orgType: 2 },
        { title: "保障位置", textIndex: "supportSeat", orgType: 2 },
        { title: "保障措施", textIndex: "supportMeas", orgType: 2 },
        { title: "抽排力量", textIndex: "pumpingForce", orgType: 2 },
        { title: "定位", textIndex: "dw" },
      ],
      columns1: [
        { title: "站点", textIndex: "zm" },
        { title: "瞬时风速", textIndex: "wdidf", noShow: "3" },
        { title: "瞬时风向", textIndex: "wdidd", noShow: "3" },
        { title: "当前一分钟雨量", textIndex: "rfmark1", noShow: "4" },
        { title: "五分钟雨量分布", textIndex: "minrf", noShow: "4" },
        { title: "小时雨量", textIndex: "hourrf", noShow: "4" },
        { title: "日雨量", textIndex: "dayrf", noShow: "4" },
        { title: "定位", textIndex: "dw" },
      ],
      listData: [],
      queryData: {},
      total: 0,
      currentPage: 1,
      /** 区域数据 */
      areaList: [],
    };
  },
  watch: {
    activeKey: {
      immediate: true,
      handler(val) {
        this.doQuery();
        if (val > 2) {
          // TODO 此处将要为 3.雨量 4.风情表头做处理
          this.columns = this.columns1.filter((e) => e.noShow != val);
        }
      },
    },
  },
  //创建完成 访问当前this实例
  created() {},
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    doQuery() {
      // if (this.activeKey > 2) {
      //   return;
      // }
      let body = {
        body: {
          ...this.queryData,
          orgType: this.activeKey,
        },
        page: this.currentPage,
      };

      this.total = 0;
      this.listData = [];
      let code = this.activeKey <= 2 ? "ojom7nRH" : "nMXYNM42";
      getIdsmApi(code, body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            if ([3, 4, "3", "4"].includes(this.activeKey)) {
              res.body.data.map((v) => {
                Object.assign(v, {
                  lat: v.obtid == "G3102" ? "23.107" : "23.092",
                  lon: v.obtid == "G3102" ? "113.362" : "113.35",
                  zm:
                    v.obtid == "G3102"
                      ? "海珠区琶洲街会展公园"
                      : "海珠区琶洲街赤沙路",
                });
              });
            }
            this.listData = res.body.data;
            this.total = parseInt(res.total);
          } else {
            this.listData = [];
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },

    changePages(param) {
      this.currentPage = param.pages;
      this.doQuery();
    },

    onGPS(record) {
      debugger
      //let items = JSON.parse(JSON.stringify(record));
      let items = pGzznCore.deepClone(record);
      // let columns = [
      //   { title: "机构名称", textIndex: "orgName" },
      //   { title: "负责人", textIndex: "name" },
      //   { title: "电话", textIndex: "mobilePhone" },
      // ];
      //pGzznCore.pointLayerRemove({ type: "defaultTypesf" + this.activeKey });
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/sf" + this.activeKey + ".png",
        type: "defaultTypesf" + this.activeKey,
        layerName: "三防",
        info:
          this.activeKey == 1
            ? this.columns.filter((e) => e.textIndex != "dw" && e.orgType != 2)
            : this.columns.filter((e) => e.textIndex != "dw"),
        phoneInfo: { phone: "mobilePhone", name: "name" },
        isFlagPopule:true
      };

      //pGzznCore.setPointLayerToMap([items], objs);
      objs.data = [items];
      pGzznCore.flyToPoint({x:items.lon,y:items.lat,z:13673},objs)
    },

    onQuery() {
      this.currentPage = 1;
      this.doQuery();
    },
    onEmpty() {
      this.currentPage = 1;
      this.queryData = {};
      this.doQuery();
    },
  },
};
</script>
<style lang='less' scoped>
@import "../../common.less";
@import "./mixin.less";
.up_view {
  min-width: 1000vw * @w;
  .btns {
    width: 100%;
    overflow: hidden;
    margin: 5px 0;
    .btn,
    .btn_small {
      cursor: pointer;
      display: inline-block;
      margin-right: 5px;
      background: transparent;
      color: white;
      padding: 10vh * @h 30vw * @w;
      font-size: 11vh * @h;
      border: 2px #1d4fa2 solid;

      &.active {
        background: rgba(10, 42, 100, 1);
        border-color: #0275a1;
      }
    }
    .btn_small {
      font-size: 3vh * @h;
      padding: 5vh * @h 15vw * @w;
      background: rgba(10, 42, 100, 1);

      &.active {
        background: #02648e;
        border-color: #0275a1;
      }
    }
  }

  .list {
    height: calc(100% - 40px);
    overflow: auto;
    margin: 20vh * @h 0;
    .dw {
      width: 50vw * @w;
      height: 100%;
      cursor: pointer;
    }

    /deep/ .list-header {
      padding: 14vh * @h 0;
      div {
        font-size: 18vh * @h;
      }
    }
    /deep/ .list-body {
      height: auto !important;
      li {
        div {
          font-size: 18vh * @h;
          padding: 0 10vw * @w;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .phone {
            .icon {
              margin: 0 10vw * @w;
              color: #00ffff;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .conditions-search {
    display: flex;
    align-items: center;
    // margin: 15vh * @h 0 20vh * @h;
    margin: 20vh * @h;

    .c-select {
      width: 200vw * @w !important;
      margin-right: 28vw * @w;
      /deep/.ant-select-selection__rendered {
        margin: auto !important;
        height: 40vh * @h;
        line-height: 40vh * @h;
      }

      /deep/.ant-select-selection {
        // background-color: #036af3;
        background-color: #333333;
        color: white;
        height: 40vh * @h;
        line-height: 40vh * @h;
        font-size: 24vh * @h;
        border: 1px solid #4a6894;
        display: flex;
        .box-sizing();
      }

      /deep/.ant-select-arrow {
        display: none;
      }
    }

    .time {
      font-size: 22vh * @h;
    }

    > span {
      font-size: 18vh * @h;
      color: white;
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

      &.btn {
        background-color: #169bd5;
        font-size: 18vh * @h;
        // line-height: 35vh * @h;
        padding: 4vh * @h 8vh * @h !important;
        .box-sizing();
        border: none;
        margin-right: 10vh * @h;
        border-radius: 6vh * @h;
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang='less'>
.up_view_c_popuper_style {
  z-index: 99999 !important;
}
</style>