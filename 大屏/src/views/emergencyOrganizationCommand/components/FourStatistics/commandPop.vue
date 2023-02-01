<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-10-13 12:42:50
 * @LastEditors: hehaishen
 * @LastEditTime: 2021-11-06 14:59:03
-->
<template>
  <div class="Hotel">
    <pop-up-layer
      :show="commandShow"
      v-if="commandShow"
      :setStyles="{ width: '90%' }"
      @doClose="doClose"
      :title="title"
      opsition="pageRight"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="content-all">
          <div class="content-top">
            <ul>
              <li
                v-for="(i, k) in fourStatisticsList"
                :key="i.id"
                @click="changeLi(i, k)"
              >
                <div :class="[tableCheck.id === i.id ? 'liChecked' : '']">
                  {{ i.title }}
                </div>
              </li>
            </ul>
          </div>
          <div class="content-bottom">
            <div class="conditions-search">
              <span>姓名：</span
              ><input v-model="query.keywords" placeholder="姓名" />
             <!--  <span>宾馆地址：</span
              ><input v-model="query.addr" placeholder="宾馆地址" />
              <span>信息编号：</span
              ><input v-model="query.code" placeholder="信息编号" /> -->
              <button class="mouse-click btn" @click="onSearch">查询</button>
              <button class="mouse-click btn" @click="onEmpty">清空</button>
            </div>
            <Clist class="list" :columns="columns" :listData="listData">
              <template slot="name" slot-scope="{ text, record }">
                <span
                  :title="text"
                  :class="record.code < 7 && record.code ? 'lightHeight' : ''"
                >
                  {{ text }}
                </span>
              </template>
              <template slot="mobilePhone" slot-scope="{ text, record }">
                <div :title="text" class="telephone">
                  <span> {{ text }}</span>
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
              <template slot="officePhone" slot-scope="{ text, record }">
                <div :title="text" class="telephone">
                  <span> {{ text }}</span>
                  <a-icon
                    type="phone"
                    class="icon"
                    @click="clickMobilePhone(record, $event)"
                    v-show="text"
                  />
                </div>
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
import {
  getConductInstitution,
  getCommanderInformation,
  getReservoirFlood,
  getBundFlood,
  getRiskZonePopulation,
  getThreeParameter,
} from "@/api/theCityThreeProofing";
export default {
  components: { Clist, ChangePage },
  mixins: [mixin],

  data() {
    return {
      title: "",
      parentDatas:{},
      /* 树 */
      authorityList: [],
      /*列表*/
      columns: [
        { title: "姓名", index: 0, textIndex: "userName", width: "10%" },
        {
          title: "单位",
          index: 1,
          textIndex: "unitPosition",
          width: "20%",
        },
        { title: "职务", index: 2, textIndex: "adminPosition", width: "10%" },
        { title: "办公电话", index: 3, textIndex: "officeTtel", width: "20%" },
        { title: "手机电话", index: 4, textIndex: "mobile", width: "30%" },
        { title: "", index: 4, textIndex: "checked", width: "10%" },
      ],
      listData: [],
      total: 0,
      currentPage: 1,
      commandShow: false,
      query: {
        keywords: "",
      },
      type: 4,
      tableCheck: {
        title: "市级指挥机构",
        id: 1,
        img: require("@/assets/images/majorFestivalsConductor/Four1.png"),
        num: "3",
        flag: false,
        bgShow: true,
      },
      fourStatisticsList: [
        {
          title: "市级指挥机构",
          id: 1,
          img: require("@/assets/images/majorFestivalsConductor/Four1.png"),
          num: "3",
          flag: false,
          bgShow: true,
        },
        {
          title: "区级指挥机构",
          id: 2,
          img: require("@/assets/images/majorFestivalsConductor/Four2.png"),
          num: "14",
          flag: false,
          bgShow: true,
        },
        {
          title: "镇级指挥机构",
          id: 3,
          img: require("@/assets/images/majorFestivalsConductor/Four3.png"),
          num: "1",
          flag: false,
          bgShow: true,
        },
        {
          title: "村(居)级指挥机构",
          id: 4,
          img: require("@/assets/images/emergencyOrganizationCommand/icon_village.png"),
          num: "40",
          flag: false,
          bgShow: true,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    //搜索
    onSearch() {
      this.getListData(this.type);
    },
    onEmpty() {
      this.query.keywords = "";
      this.currentPage = 1;
      this.getListData(this.type);
    },
    //数据
    getListData() {
      let params = {
        body: {
          orgLevel: this.tableCheck.id,
          keywords: this.query.keywords,
        },
        page: this.currentPage,
        pageSize: 10,
      };
      FourStatisticsApi("slRca0zi", params).then((res) => {
        if (res.code == 200) {
          this.listData = res.body.data;
          this.total = Number(res.total);
          console.log(res, "----------------> this.listData");
        }
      });
    },
    //页码
    changePages(param) {
      this.currentPage = param.pages;
      this.onSearch();
    },
    //关闭
    doClose() {
      this.commandShow = false;
      this.currentPage = 1;
      this.listData = [];
      this.query.keywords = "";
      this.$emit("doClose", { typeName: this.parentDatas.title });
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
        layerName: "指挥机构",
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
    changeLi(i, k) {
      this.tableCheck = i;
       this.query.keywords = "";
      this.currentPage = 1;
      this.total = 0;
      this.getListData()
    },
  },
  created() {},
  mounted() {
    this.$nextTick(()=>{
      this.$on('show',(item)=>{
        this.tableCheck = item
        this.parentDatas = JSON.parse(JSON.stringify(item))
        this.commandShow = true
        this.getListData()
      })
    })
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
    font-size: 30vh * @h;
    color: white;
  }

  > input {
    width: 400vw * @w;
    height: 60vh * @h;
    line-height: 60vh * @h;
    border:1px solid rgba(10, 42, 100, 1);
    background-color: rgba(0,0,0,1);
    color: #fff;
    padding-left: 20vw * @w;
    border: none;
    margin-right: 30vw * @w;
    font-size: 30vh * @h;

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
.content-all {
  width: 100%;
  .content-top {
    width: 100%;
    height: 80vh * @h;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      li {
        width: 20%;
        height: 100%;
        color: white;
        font-size: 32vh * @h;
        position: relative;
        margin-right: 20vw * @w;
        cursor: pointer;
        div {
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 80vh * @h;
        }
        .liChecked:after {
          position: absolute;
          content: "";
          width: 100%;
          height: 10vh * @h;
          background: #169bd5;
          left: 0;
          bottom: 0;
        }
      }
    }
  }
  .content-bottom {
    // width: 2000vw * @w;
    width: 100%;
    height: calc(100% - 80vh * @h);
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
