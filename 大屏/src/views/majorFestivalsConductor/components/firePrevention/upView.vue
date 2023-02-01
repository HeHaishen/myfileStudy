<!--
 * @Description: 弹出窗口视图
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-11 10:05:47
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-13 17:03:25
-->
<!-- 弹出窗口视图 -->
<template>
  <div class="up_view">
    <div class="conditions-search" v-if="['1', '2', 1, 2].includes(activeKey)">
      <span>负责人：</span
      ><input v-model="queryData.username" placeholder="负责人" />
      <span>区域：</span>
      <a-select
        id="c-select"
        class="c-select"
        placeholder="区域"
        v-model="queryData.areaCode"
        dropdownClassName="c-popuper-style"
      >
        <a-select-option
          :value="item.value"
          v-for="item in areaList"
          :key="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
      <button class="mouse-click btn" @click="onQuery">查询</button>
      <button class="mouse-click btn" @click="onEmpty">清空</button>
    </div>
    <div class="conditions-search" v-if="['3', 3, '4', 4].includes(activeKey)">
      <span v-if="activeKey == 3">名称：</span
      ><input
        v-if="activeKey == 3"
        v-model="queryData.name"
        placeholder="名称"
      />
      <span>地址：</span
      ><input v-model="queryData.address" placeholder="地址" />
      <button class="mouse-click btn" @click="onQuery">查询</button>
      <button class="mouse-click btn" @click="onEmpty">清空</button>
    </div>
    <clist class="list" :columns="columns" :listData="listData">
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
        v-for="item in ['mobile', 'phone']"
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
    activeKey: {
      type: String,
    },
  },
  data() {
    return {
      columns: [
        { title: "机构名称", textIndex: "groupName", width: "30%" },
        { title: "负责人", textIndex: "username", width: "15%" },
        { title: "电话", textIndex: "mobile", width: "30%" },
        { title: "区域", textIndex: "quyu", width: "15%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
      columns1: [
        { title: "名称", textIndex: "name", width: "25%" },
        { title: "地址", textIndex: "address", width: "30%" },
        { title: "联系人", textIndex: "contacts", width: "10%" },
        { title: "电话", textIndex: "mobile", width: "25%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
      columns3: [
        { title: "地址", textIndex: "standbyPoint", width: "20%" },
        { title: "联系人", textIndex: "contacts", width: "20%" },
        { title: "电话", textIndex: "phone", width: "30%" },
        { title: "数量", textIndex: "num", width: "10%" },
        { title: "单位", textIndex: "unit", width: "10%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
      listData: [],
      tabKeysSmall: [],
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
        if (val == "2") {
          this.listData = [];
          return;
        } else if (val == "3") {
          this.columns = this.columns1;
        } else if (val == "4") {
          this.columns = this.columns3;
        }
        this.doQuery();
      },
    },
  },
  //创建完成 访问当前this实例
  created() {
    if (![3, 4, "3", "4"].includes(this.activeKey)) {
      this.getArea();
    }
  },
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    /** 获取区域数据 */
    getArea() {
      let body = {
        body: {
          dictName: "CITY_SJ",
        },
        pageSize: 20,
      };
      getIdsmApi("9GO8HDzz", body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            res.body.data.map((v) => {
              Object.assign(v, {
                value: v.dictKey,
                label: v.dictValue,
              });
            });
            this.areaList = res.body.data.sort((a, b) => a.dictKey - b.dictKey);
            console.log(this.areaList);
          } else {
            this.areaList = [];
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    /** 处理区域 */
    handlerArea(record) {
      if (!record.address && !record.orgName) {
        return "";
      }
      const findQ = (str) => {
        if (!str) {
          return -1;
        }
        let index = str.indexOf("区");
        return index;
      };
      let index = findQ(record.address);
      if (index <= -1) {
        let index = findQ(record.orgName);
        if (index <= -1) {
          return "";
        }
        return record.orgName.slice(index - 2, index + 1);
      }
      return record.address.slice(index - 2, index + 1);
    },
    doQuery() {
      let body = {
        page: this.currentPage,
      };
      this.total = 0;
      this.listData = [];
      let code = "";
      switch (this.activeKey) {
        case "1":
        case 1:
        case "2":
        case 2:
          code = "15vb7jna";
          body.body = {
            ...this.queryData,
            areaCode: this.queryData.areaCode
              ? [this.queryData.areaCode]
              : undefined,
            orgType: this.activeKey,
          };
          break;
        case "3":
        case 3:
          body.body = {
            ...this.queryData,
            type: 3,
          };
          code = "CDubQsGk";
          break;
        case "4":
        case 4:
          body.body = {
            name: "消防车",
            standbyPoint: this.queryData.address,
          };
          code = "xIY4Z3of";
          break;
      }
      getIdsmApi(code, body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            if (this.activeKey == 1) {
              res.body.data.map((v) => {
                console.log(this.handlerArea(v),'this.handlerArea(v)--');
                Object.assign(v, {
                  quyu: this.handlerArea(v),
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

    /** 切换按钮 */
    changeTabSmall(tab) {
      this.smallKey = tab.key;
    },

    onGPS(record) {    
      //let items = JSON.parse(JSON.stringify(record));
      let items = pGzznCore.deepClone(record);
      // let columns = [
      //   { title: "机构名称", textIndex: "orgName" },
      //   { title: "负责人", textIndex: "name" },
      //   { title: "电话", textIndex: "mobilePhone" },
      // ];
      let phones = this.activeKey == 4 ? "phone":"mobile";
      let names = this.activeKey == 4 ? "contacts":"username";
     // pGzznCore.pointLayerRemove({ type: "defaultTypefh"+this.activeKey });
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/fh"+this.activeKey+".png",
        imgSize:{width:38,height:38},
        type: "defaultTypefh"+this.activeKey,
        layerName: "防火",
        info: this.columns.filter((e) => e.textIndex != "dw"),
        phoneInfo: { phone: phones, name: names },
        isFlagPopule:true
      };

      //pGzznCore.setPointLayerToMap([items], objs);
      objs.data = [items];
      pGzznCore.flyToPoint({x:items.lon,y:items.lat,z:13673},objs)
    },

    /** 切换按钮 */
    changeTab(tab) {
      this.activeKey = tab.key;
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
.c-popuper-style {
  z-index: 9999;
}
</style>