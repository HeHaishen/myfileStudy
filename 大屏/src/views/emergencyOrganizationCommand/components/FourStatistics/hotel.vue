<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-10-13 12:42:50
 * @LastEditors: hehaishen
 * @LastEditTime: 2021-10-25 17:39:49
-->
<template>
  <div class="Hotel">
    <pop-up-layer
      :show="hotelShow"
      v-if="hotelShow"
      :setStyles="{ width: '90%' }"
      @doClose="doClose"
      title="宾馆"
      opsition="pageRight"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="hotelClass">
          <div class="conditions-search">
            <span>宾馆名称：</span
            ><input v-model="query.name" placeholder="宾馆名称" />
            <span>宾馆地址：</span
            ><input v-model="query.addr" placeholder="宾馆地址" />
            <span>信息编号：</span
            ><input v-model="query.code" placeholder="信息编号" />
            <button class="mouse-click btn" @click="onSearch">查询</button>
            <button class="mouse-click btn" @click="onEmpty">清空</button>
          </div>
          <Clist class="list" :columns="columns" :listData="listData">
            <!-- <template
              v-for="item in columns"
              :slot="item.textIndex"
              slot-scope="{ text, record }"
            >
              <span :title="text" :key="item.textIndex"  :class="record.code<7&&record.code? 'lightHeight':''">
                {{ text }}
              </span>
            </template> -->

            <template slot="name" slot-scope="{ text, record }">
              <span
                :title="text"
                :class="record.code < 7 && record.code ? 'lightHeight' : ''"
              >
                {{ text }}
              </span>
            </template>
            <template slot="telephone" slot-scope="{ text, record }">
              <div :title="text" class="telephone">
                <span
                  :class="record.code < 7 && record.code ? 'lightHeight' : ''"
                >
                  {{ text }}</span
                >
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
              <div class="dw" @click="onHotelGPS(record)">
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
            <template slot="toVideo" slot-scope="{ record }">
              <span
                @click="toVideo(record)"
                class="toVideo"
                v-show="record.isVideo > 0"
              >
                <img
                  src="../../../../assets/images/majorFestivalsConductor/video.svg"
                  alt=""
              /></span>
            </template>

            <template slot="code" slot-scope="{ text, record }">
              <span
                :title="text"
                :class="record.code < 7 && record.code ? 'lightHeight' : ''"
              >
                {{ text }}
              </span>
            </template>
            <template slot="name" slot-scope="{ text, record }">
              <span
                :title="text"
                :class="record.code < 7 && record.code ? 'lightHeight' : ''"
              >
                {{ text }}
              </span>
            </template>
            <template slot="addr" slot-scope="{ text, record }">
              <span
                :title="text"
                :class="record.code < 7 && record.code ? 'lightHeight' : ''"
              >
                {{ text }}
              </span>
            </template>
            <template slot="contacts" slot-scope="{ text, record }">
              <span
                :title="text"
                :class="record.code < 7 && record.code ? 'lightHeight' : ''"
              >
                {{ text }}
              </span>
            </template>
            <template slot="area" slot-scope="{ text, record }">
              <span
                :title="text"
                :class="record.code < 7 && record.code ? 'lightHeight' : ''"
              >
                {{ text }}
              </span>
            </template>
            <template slot="peopleNum" slot-scope="{ text, record }">
              <span
                :title="text"
                :class="record.code < 7 && record.code ? 'lightHeight' : ''"
              >
                {{ text }}
              </span>
            </template>
            <template slot="peopleName" slot-scope="{ text, record }">
              <span
                :title="text"
                :class="record.code < 7 && record.code ? 'lightHeight' : ''"
              >
                {{ text }}
              </span>
            </template>
            <template slot="estimateNum" slot-scope="{ text, record }">
              <span
                :title="text"
                :class="record.code < 7 && record.code ? 'lightHeight' : ''"
              >
                {{ text }}
              </span>
            </template>
          </Clist>
          <div class="pagination">
            <ChangePage
              :total="total"
              :currentPage="currentPage"
              @changePages="changePages"
            />
          </div>
        </div>
      </template>
    </pop-up-layer>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import ChangePage from "@/components/APicture/changePage/index.vue";
import { FourStatisticsApi } from "@/api/FourStatistics/FourStatistics";
import Clist from "@/components/APicture/c-table.vue";
import mixin from "./mixin";
import jsCookie from "js-cookie";
export default {
  components: { Clist, ChangePage },
  mixins: [mixin],
  data() {
    return {
      columns: [
        { title: "编号", textIndex: "code", width: "5%" },
        { title: "宾馆名称", textIndex: "name", width: "15%" },
        { title: "宾馆地址", textIndex: "addr", width: "20%" },

        { title: "联系电话", textIndex: "telephone", width: "15%" },
        { title: "酒店联系人", textIndex: "contacts", width: "5%" },
        // { title: "等级", textIndex: "level", width: "10%" },
        { title: "所在区", textIndex: "area", width: "5%" },
        { title: "入住交易团及人数", textIndex: "peopleNum", width: "10%" },
        { title: "交易团联系人", textIndex: "peopleName", width: "10%" },
        { title: "预计总人数", textIndex: "estimateNum", width: "5%" },
        //  { title: "核实情况", textIndex: "verification" },
        { title: "定位", textIndex: "dw", width: "5%" },
        { title: "视频", textIndex: "toVideo", width: "5%" },
      ],
      listData: [],
      total: 0,
      currentPage: 1,
      hotelShow: false,
      query: {
        name: "",
        addr: "",
        code: "",
      },
      type: 4,
    };
  },
  computed: {},
  watch: {},
  methods: {
    toVideo(data) {
      //
      let token = jsCookie.get("token");
      console.log(token, "-------------------->");
      window.open(
        `#/moreVideos?name=${data.name}&sid=${data.sid}&token=${token}`
      );
      // this.$router.push({ path: '/moreVideos',query:{ name:data.name,sid:data.sid}  } )
    },
    //搜索
    onSearch() {
      this.getListData(this.type);
    },
    onEmpty() {
      this.query.name = "";
      this.query.addr = "";
      this.query.code = "";
      this.currentPage = 1;
      this.getListData(this.type);
    },
    //数据
    getListData(type) {
      this.type = type;
      let params = {
        body: {
          type: type,
          name: this.query.name,
          addr: this.query.addr,
          code: this.getreplice(this.query.code),
        },
        page: this.currentPage,
        pageSize: 10,
      };
      FourStatisticsApi("sZRJ7Hf8", params).then((res) => {
        if (res.code == 200) {
          this.listData = res.body.data;
          this.total = Number(res.total);
          console.log(res, "----------------> this.listData");
        }
      });
    },
    getreplice(str) {
      return str.replace(/\s+/g, "");
    },

    getColor(num) {
      let color;
      if (num == 1) {
        color = "#D73C24";
      } else if (num == 2) {
        color = "#EF8036";
      } else if (num == 3) {
        color = "yellow";
      }
      return color;
    },
    //页码
    changePages(param) {
      this.currentPage = param.pages;
      this.onSearch();
    },
    //关闭
    doClose() {
      this.hotelShow = false;
      this.currentPage = 1;
      this.listData = [];
      this.query.name = "";
      this.query.addr = "";
      this.query.code = "";
    },
    onHotelGPS(record) {
      //let items = JSON.parse(JSON.stringify(record));
      let items = pGzznCore.deepClone(record);
      // let columns = [
      //   { title: "机构名称", textIndex: "orgName" },
      //   { title: "负责人", textIndex: "name" },
      //   { title: "电话", textIndex: "mobilePhone" },
      // ];

      //pGzznCore.pointLayerRemove({ type: "defaultType" });
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/sgtj4.png",
        imgUrlObj: {
          keys: "level",
          start: "gzznGIS/Image/gjh/sgtj4",
          end: ".png",
        },
        //type: "defaultType",
        type: "defaultTypesg" + this.type,
        layerName: "四馆",
        info: this.columns.filter(
          (e) =>
            e.textIndex != "dw" &&
            e.textIndex != "code" &&
            e.textIndex != "toVideo" &&
            e.orgType != 2
        ),
        phoneInfo: { phone: "telephone", name: "name" },
        video: { keys: "name", start: "/#/moreVideos?name=", end: "" },
        isFlagPopule: true,
      };
      //pGzznCore.setPointLayerToMap([items], objs);
      objs.data = [items];
      pGzznCore.flyToPoint({ x: items.lon, y: items.lat, z: 13673 }, objs);
    },
  },
  created() {},
  mounted() {
    // this.getListData(4)
  },
};
</script>
<style lang="less" scoped>
@import "../../common.less";
// @import './message.less';

.conditions-search {
  display: flex;
  align-items: center;
  // margin: 15vh * @h 0 20vh * @h;
  margin: 20vh * @h;
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
.hotelClass {
  // width: 2000vw * @w;
  width: 100%;
  .btns {
    width: 100%;
    overflow: hidden;
    margin: 5px 0;
    .btn {
      cursor: pointer;
      display: inline-block;
      background: rgba(10, 42, 100, 1);
      // background: #02648e;
      margin-right: 5px;
      color: white;
      padding: 10vh * @h 30vw * @w;
      font-size: 11vh * @h;
      border: 2px #1d4fa2 solid;

      &.active {
        background: #02648e;
        border-color: #0275a1;
      }
    }
  }
  .list {
    max-height: 1000vh * @h;
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
}
.pagination {
  min-width: 50%;
}
.telephone {
  width: 100%;
  display: flex;
  span {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .icon {
    margin: 0 10vw * @w;
    color: #00ffff;
    cursor: pointer;
  }
}
.send-message {
  z-index: 99999;
  width: 1024vw * @w;
  min-height: 500vh * @h;
  /deep/ .detail-content {
    padding: 10vh * @h 10vw * @w;
    .list {
      li {
        label {
          flex-shrink: 0;
          word-wrap: nowrap;
          display: block;
          width: 200vw * @w;
          text-align: right;
          word-break: keep-all;
          /* 不换行 */
          white-space: nowrap;
          /* 不换行 */
          overflow: hidden;
          /* 内容超出宽度时隐藏超出部分的内容 */
        }

        span {
          margin-left: 10vw * @w;
          width: 100%;
          .c-big-areatext {
            font-size: 20vh * @h;
          }
          .ant-input {
            // border:1px #ddd solid;
            display: block;
            width: 100%;
            font-size: 20vh * @h;
            background: rgba(0, 0, 0, 0.6);
            color: white;
          }
        }
      }
    }

    .send-message-btn {
      position: unset;
    }
  }
}
.lightHeight {
  color: #ffe844;
  font-weight: 700;
}
.toVideo {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    width: auto;
    height: 50%;
    cursor: pointer;
  }
}
input::-webkit-input-placeholder {
  color: rgb(136, 136, 136) !important;
}
</style>
