<!--  -->
<template>
  <div class="on-duty">
    <!-- <div class="duty-content"></div> -->
    <div class="duty-content">
      <vue-seamless-scroll :data="list" :class-option="classOption">
        <ul>
          <li v-for="(item, index) in list" :key="index">
            <div class="name">
              <img src="../../../../../assets/images/emergencyOrganizationCommandWar/organization.png" alt="" />
              <p>
                {{ item.jgmc }}
              </p>
            </div>
            <div class="phone">
              <span v-for="(e, i) in item.zbdh.split(',')" :key="i">
                {{ e }}
                <a-icon type="phone" class="icon" @click="nobilePhone(item, $event, e)" v-show="e" />
              </span>

              <!-- <a-icon type="mail" class="icon" @click="clickMessage(item, $event)" /> -->
            </div>
          </li>
        </ul>
      </vue-seamless-scroll>
      <div class="more-btn" @click="moreBtn">更多</div>
    </div>
    <pop-up-layer v-if="listBol" :show="listBol" :setStyles="{}" opsition="pageRight" ref="myPopUpLayer" :title="'应急值守'" @doClose="tableClose" class="duty-pop">
      <template slot="content">
        <div class="table-content">
          <div class="talbe-search">
            <div class="center-search">
              <input class="c-input" placeholder="输入值班名称" type="text" v-model="searchName" />
              <img src="../../../../../assets/images/emergencyOverview/icon_search.png" alt="" @click="onSearch" />
            </div>
          </div>
          <clist :columns="tableHeader" :listData="tableList" class="list">
            <template v-for="item in tableHeader" :slot="item.textIndex" slot-scope="{ text }">
              <span :title="text" :key="item.textIndex">
                {{ text }}
              </span>
            </template>
            <template slot="zbdh" slot-scope="{ text, record }">
              <div :title="text" class="phone">
                <span v-for="(item, index) in text.split(',')" :key="index">
                  {{ item }}
                  <a-icon type="phone" class="icon" @click="callPhone(record, $event, item)" v-show="item" />
                  <a-icon type="mail" class="icon" @click="callMessage(record, $event, item)" v-show="item && reg.test(item)" />
                </span>
              </div>
            </template>
            <template slot="number" slot-scope="{ record, text, index }">
              {{ index + 1 }}
            </template>
          </clist>
          <div class="list-change-page big_pagination pagination">
            <ChangePage :total="pagination.total" :currentPage="pagination.current" @changePages="pageChange" />
          </div>
        </div>
      </template>
    </pop-up-layer>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import { getIdsmApi } from "@/api/idsm/index.js";

import ChangePage from "@/components/APicture/changePage";
import Clist from "@/components/APicture/c-table";
import mixin from "./mixin";

export default {
  components: {
    ChangePage,
    Clist,
    vueSeamlessScroll,
  },
  mixins: [mixin],

  data() {
    return {
      tableHeader: [
        {
          title: "名称",
          textIndex: "jgmc",
          width: "40%",
        },
        {
          title: "值班电话",
          textIndex: "zbdh",
          width: "60%",
        },
      ],
      list: [],
      tableList: [],
      echartDiv: null,
      listBol: false,
      searchName: "",
      pagination: {
        total: 0,
        current: 1,
      },
      classOption: {
        step: 0.5,
      },
      reg: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() { },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      this.doQuery();
    },
    doQuery(pop) {
      // pop==1 则请求十条 反之请求全部数据
      let code = "o42XBW3K";
      let data = {
        body: {
          jgmc: pop == 1 ? this.searchName : "",
        },
        page: this.pagination.current,
        pageSize: pop == 1 ? "10" : "-1",
      };
      getIdsmApi(code, data).then((res) => {
        if (res.success) {
          if (pop == 1) {
            this.tableList = res.body.data;
            this.pagination.total = +res.body.total;
          } else {
            this.list = res.body.data;
          }
        }
      });
    },
    moreBtn() {
      this.listBol = true;
      this.doQuery(1);
    },
    tableClose() {
      this.pagination.current = 1;
      this.searchName = "";
      this.listBol = false;
    },

    pageChange(parmas) {
      this.pagination.current = parmas.pages;
      this.doQuery(1);
    },
    onSearch() {
      this.pagination.current = 1;
      this.doQuery(1);
    },
  },
};
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */

@import '../../../common.less';
.duty-pop {
  top: 30%;
}
.duty-content {
  height: 200px;
  overflow: hidden;
  color: #fff;
  box-sizing: border-box;
  .line {
    content: '';
    display: inline-block;
    width: 8px;
    height: 32px;
    background-color: rgb(3, 240, 241);
    margin: 0 5px;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    overflow: hidden;
    flex-wrap: wrap;
    padding: 0 0 0 20px;
    li {
      display: flex;
      justify-content: space-between;
      width: 50%;
      align-items: center;
      flex-direction: column;
      padding: 10px 0;
      .name {
        font-size: 38px;
        font-weight: bold;
        width: 100%;

        display: flex;
        align-items: center;
        p {
          width: 90%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
      }
      .phone {
        font-size: 32px;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 6px 0 0 50px;
        box-sizing: border-box;
        // div {
        //   width: 50%;
        //   display: flex;
        //   align-items: center;
        // }
      }
    }
  }
  .phone {
    .icon {
      margin: 0 10px;
      color: #00ffff;
      cursor: pointer;
    }
  }
}
.more-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  cursor: pointer;
  font-size: 40px;
}

// 搜索
.duty-pop {
  width: 1100px;
  .center-search {
    height: 60px;
    margin-bottom: 10px;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #fff;
    .c-input {
      width: 300px;
      height: 100%;
      border: 1px rgb(1, 210, 233) solid;
      background-color: rgb(20, 38, 78);
      font-size: 32px;
      display: flex;
      align-items: center;
      padding-left: 10px;
    }
    img {
      display: block;
      width: 30px;
      height: 30px;
      position: absolute;
      right: 1%;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  .ul {
    .li {
      display: flex;
      color: #fff;
      justify-content: space-between;
      width: 100%;
      height: 80px;
      align-items: center;
      background-color: rgb(25, 45, 80);

      .name {
        font-size: 34px;
        font-weight: bold;
        width: 30%;
      }
      p {
        font-size: 24px;
        width: 40%;
        display: flex;
        align-items: center;
      }
      .icon {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          margin: 10px;
          cursor: pointer;
        }
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
    .li:nth-of-type(2n) {
      background-color: rgb(22, 39, 65);
    }
    .li::before {
      content: '';
      width: 8px;
      height: 32px;
      background-color: rgb(3, 240, 241);
      margin: 0 6px;
    }
  }
}
.table-content {
  width: 100%;
  height: 100%;
  .list {
    max-height: 800px;
    overflow: auto;
    margin: 20px 0;
    .dw {
      width: 50px;
      height: 100%;
      cursor: pointer;
    }

    /deep/ .list-header {
      padding: 14px 0;
      div {
        font-size: 32px;
      }
    }
    /deep/ .list-body {
      height: auto !important;
      li {
        div {
          font-size: 32px;
          padding: 0 10px;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .phone {
          .icon {
            margin: 0 10px;
            color: #00ffff;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
