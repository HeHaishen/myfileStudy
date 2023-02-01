<!--
 * @Description:应急资源-应急队伍详情
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-08-12 11:57:40
 * @LastEditTime: 2021-08-12 15:33:18
-->
<template>
  <pop-up-layer v-show="show" :show="show" :setStyles="{'left':'78%','top':'15%','transform':'none'}" opsition="pageRight" @doClose="allCenterBtnClose" :title="title" ref="realTimeChecks" class="model-team-detail">
    <template slot="content">
      <div class="team-detail-content">
        <div class="detail-content-left">
          <!-- <a-tree :load-data="onLoadData" :tree-data="treeData" /> -->
          <div v-for='(item,index) in organizationList' :key='index' class="organize" @click='getPeopleList(item)'>
            {{item.deptName}}
          </div>
        </div>
        <div class="detail-content-right">
          <div class="center-search">
            <input class="c-input" placeholder="输入关键字" type="text" v-model='searchName' />
            <img src="../../../assets/images/emergencyOverview/icon_search.png" alt="" @click="onSearch" />
          </div>
          <div class="people-table">
            <clist :columns="rightTopListHeader" :listData="rightTopListContent">
              <template slot="officePhone" slot-scope="{ record, text,index }">
                <div>
                  {{ text }}
                  <a-icon type="phone" class="icon" @click='clickOfficePhone(record, index, $event)' />
                </div>
              </template>
              <template slot="phone" slot-scope="{record, text,index}">
                <div>
                  {{ text }}
                  <a-icon type="phone" class="icon" @click="clickPhone(record, index, $event)" />
                  <a-icon type="mail" class="icon" @click="clickMessage(record, index,$event)" />
                </div>

              </template>
            </clist>
          </div>
          <div class="list-change-page">
            <ChangePage :total="pagination.total" :currentPage="pagination.current" @changePages="pagesChange" />

          </div>
        </div>
        <ContactPhone ref="ContactPhone" :style="{zIndex:99999}" />
        <MessageSend ref="MessageSend" />
      </div>
    </template>

  </pop-up-layer>

</template>
<script>
import ChangePage from "@/components/APicture/changePage";

import Clist from "@/components/APicture/c-table";
import { commonApi } from '@/api/emergencyResources'
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
export default {
  components: {
    Clist, ContactPhone,
    ChangePage,
    MessageSend,
  },
  data() {
    return {
      show: false,
      title: "",
      parentData: {},
      treeData: [
        { title: "天河区", key: "1 " },
        { title: "白云区", key: "2 " },
        { title: "荔湾区", key: "3 " },
        { title: "越秀区", key: "4" },
        { title: "番禺区", key: "5" },
        { title: "海珠区", key: "6" },
        { title: "黄埔区", key: "7" },
        { title: "增城区", key: "8" },
        { title: "南沙区", key: "9" },
        { title: "从化区", key: "10" },
        { title: "花都区", key: "11" },
        // { title: "车陂街道", key: "15", isLeaf: true },
      ],
      rightTopListHeader: [
        { title: "名称", index: 0, textIndex: "name", width: "15%" },
        { title: "行政职务", index: 0, textIndex: "position", width: "15%" },
        { title: "办公电话", index: 0, textIndex: "officePhone", width: "35%" },
        { title: "手机电话", index: 0, textIndex: "phone", width: "35%" },
      ],
      rightTopListContent: [

      ],
      organizationList: [],
      pagination: {
        current: 1,
        total: 0
      },
      searchName: undefined
    };
  },
  mounted() {
    this.$on("show", (data) => {
      this.$refs.realTimeChecks.saveEvent = null;
      console.log(data);
      this.initData(() => {
        this.parentData = JSON.parse(JSON.stringify(data));
        this.title = data.teamName;

        console.log(this.parentData, '33333');
        this.getOrganization(this.parentData.yjjCode)
        this.$nextTick(() => {
          if (data && data.saveEvent) {
          }
        });
        // this.
      });
    });
  },
  methods: {
    initData(callBlack) {
      this.show = false;
      this.title = "";
      this.parentData = {};
      callBlack();
    },
    allCenterBtnClose() {
      this.show = false;
      this.rightTopListContent = []
      this.searchName = undefined
      this.pagination.current = 1
      this.pagination.total = 0
    },
    // 加载监控资源树
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        setTimeout(() => {
          treeNode.dataRef.children = [
            { title: "天源街道", key: `${treeNode.eventKey}-0` },
            { title: "长兴街道", key: `${treeNode.eventKey}-1` },
            { title: "五山街道", key: `${treeNode.eventKey}-2` },
            { title: "车陂街道", key: `${treeNode.eventKey}-3` },
          ];
          this.treeData = [...this.treeData];
          resolve();
        }, 1000);
      });
    },
    //获取机构
    getOrganization(item) {
      let codes = 'Nxvl0nvE'
      let data = {
        body: {
          parentCode: item
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      commonApi(data, codes).then(res => {
        if (res.success) {
          if (res.body) {
            this.organizationList = res.body.data
            console.log(this.organizationList, 'this.organizationList');
            this.show = true;
            this.pagination.current = 1
            this.peopleCode = this.organizationList[0].deptCode
            this.getPeople()
          }
        }
      })
    },
    //获取人员
    getPeople() {
      let codes = 'd0d4EEqp'
      let data = {
        body: {
          deptCode: this.peopleCode,
          name: this.searchName
        },
        page: this.pagination.current,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      commonApi(data, codes).then(res => {
        if (res.success) {
          if (res.body.data) {
            this.rightTopListContent = res.body.data
            this.pagination.total = +res.total
          }
        }
      })
    },
    getPeopleList(item) {
      // console.log(item, 'deptCode');
      this.pagination.current = 1
      this.peopleCode = item.deptCode
      this.searchName = undefined
      this.getPeople()
    },
    // 点击电话icons
    clickPhone(i, k, e) {
      console.log(i, k, e);

      let sendMsg = {
        name: '海参',
        phone: '15919304717',
      };
      let { name, phone } = i;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone,
        item: i
      });
    },
    // 点击电话icons
    clickOfficePhone(i, k, e) {
      let sendMsg = {
        name: '海参',
        phone: '15919304717',
      };
      let { name, officePhone } = i;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone: officePhone,
        item: i
      });
    },
    // 点击短信
    clickMessage(i, k, e) {
      /*  let sendMsg = {
         name: null,
         phone: 15919304717,
       }; */
      console.log(i, k, e);

      let { name, phone } = i;
      console.log(this.$refs);

      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone
      });
    },
    // 分页
    pagesChange(pages, current) {
      this.pagination.current = +pages.pages
      this.getPeople()
    },
    onSearch() {
      this.pagination.current = 1

      if (!this.peopleCode) return
      this.getPeople()

    }
  },
};
</script>
<style lang="less" scoped>
@import '../index.less';
.model-team-detail {
  width: 1100vw * @w;
  height: 500vh * @h;
  /deep/ .layer-contents {
    width: 100%;
    height: calc(100% - 30vh * @h);
    overflow: auto;
  }
}
.list-change-page {
  text-align: right;
  margin-right: 10vw * @w;
}
.center-search {
  width: 100%;
  height: 40vh * @h;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
  margin: 10vh * @h 0;
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
    width: 23vh * @h;
    height: 23vh * @h;
    position: absolute;
    right: 1%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
.people-table {
  width: 100%;
  height: calc(100% - 60vh * @h - 40vh * @h);
}
.team-detail-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  .detail-content-left {
    width: 28%;
    height: 100%;
    margin-right: 1%;
    overflow: auto;
    padding-left: 16vw * @w;
    .box-sizing();
    .organize {
      margin-top: 10vh * @h;
      font-size: 20vh * @h;
      color: #fff;
      padding: 10vh * @h 10vw * @w;
      cursor: pointer;
      &：hover {
        color: red;
      }
    }

    /deep/ span {
      color: white;
      font-size: 18vh * @h;
    }
    & /deep/ .ant-tree-switcher {
      // padding:6vh*@h 0;
      font-size: 18vh * @h;
      .box-sizing();
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
    /deep/ .ant-tree-node-content-wrapper .ant-tree-title {
      padding: 10vh * @h 0;
      .box-sizing();
    }
    /deep/ .ant-tree > li:first-child {
      margin-top: 10vh * @h;
    }
    /deep/ .ant-tree li {
      margin: 10vh * @h 0;
    }
  }
  .detail-content-right {
    width: 71%;
    height: 100%;
  }
}
.icon {
  margin: 0 4vw * @w;
  color: #00ffff;
  cursor: pointer;
}
</style>
