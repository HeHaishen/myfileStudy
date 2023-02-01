<!--
 * @Description: 视频墙-分组列表
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-08 11:17:38
 * @LastEditTime: 2021-09-15 16:50:17
-->
<template>
  <div class="wall-videoname-list">
    <div class="videoname-list-inner">
      <TableList :columns="columnsList" :listData="listData">
        <template slot="name" slot-scope="{ record, text }">
          <div
            class="wall-list-name"
            :class="[
              record.sortValue == null || record.sortValue === '0'
                ? ''
                : 'is-top',
            ]"
          >
            {{ text }}
          </div>
        </template>
        <template slot="opation" slot-scope="{ record, text, index }">
          <div class="videoname-list-opations">
            <span @click="doDelete(record, text, index)">×</span>
            <span
              v-if="record.sortValue == null || record.sortValue === '0'"
              @click="doVideoTopping(record, text, index)"
              >🔼</span
            >
            <span v-else @click="doCancelVideoTopping(record, text, index)"
              >🔽</span
            >
            <!-- <span>置顶</span>
            <span>取消置顶</span> -->
          </div>
        </template>
      </TableList>
    </div>
    <ChangePage
      :total="total"
      :currentPage="currentPage"
      @changePages="changePages"
      :pageSize="6"
    />
    <!-- 确定删除 -->
    <div class="list-delete-player" v-show="deleteWarningShow">
      <DeleteModel
        ref="DeleteModel"
        @doClose="doCloseDeleteModel"
        @doCancel="doCloseDeleteModel"
        @doEnsure="doDeleteEnsure"
      />
    </div>
  </div>
</template>

<script>
import TableList from "@/components/APicture/c-table";
import ChangePage from "@/components/APicture/changePage";
import {
  getGrounpOneVideoList,
  removeGrounpWallVideo,
  videoTopping,
  cancelVideoTopping,
} from "@/api/common";
import DeleteModel from "./listDeleteModel"; // 删除提示
export default {
  components: { TableList, ChangePage, DeleteModel },
  data() {
    return {
      parentDatas: {},
      sid: null,
      columnsList: [
        { title: "名称", index: 0, textIndex: "name", width: "60%" },
        { title: "操作", index: 1, textIndex: "opation", width: "40%" },
      ],
      listData: [],
      total: 0,
      currentPage: 1,
      deleteWarningShow: false,
    };
  },
  created() {},
  mounted() {
    this.$on("show", (datas) => {
      this.parentDatas = datas;
      this.sid = datas.sid;
      this.initDatas(datas);
    });
  },
  methods: {
    initDatas(datas) {
      this.listData = [];
      this.total = 0;
      this.currentPage = 1;
      this.doGetGrounpOneVideoList({
        body: { sid: datas.sid },
        page: this.currentPage,
        pageSize: "6",
      });
    },
    changePages(pages) {
      console.log(pages);
      this.currentPage = parseInt(pages.pages);
      let send = {
        body: { sid: this.parentDatas.sid },
        page: pages.pages,
        pageSize: "6",
      };
      this.doGetGrounpOneVideoList(send);
    },
    // 接口获取分组下的视频列表
    doGetGrounpOneVideoList(obj) {
      getGrounpOneVideoList({ ...obj }).then((res) => {
        if (res.success) {
          if (res.body && res.body.length) {
            this.listData = res.body;
            this.total = parseInt(res.total);
          }
          console.log("点击分组视频列表", res);
        }
      });
    },
    doCloseDeleteModel(row) {
      this.deleteWarningShow = false;
      // this.$emit("doCloseDeleteModel", this.parentDatas);
    },
    doDeleteEnsure(row) {
      removeGrounpWallVideo([
        {
          'groupId': this.parentDatas.sid,
          'channelId': row.id,
        },
      ])
        .then((res) => {
          console.log("res", res);
          if (res.success) {
            this.$MyMessage.success("移除成功！");
            this.currentPage = 1;
            this.doGetGrounpOneVideoList({
              body: { sid: this.parentDatas.sid },
              page: 1,
              pageSize: "6",
            });
            this.deleteWarningShow = false;
          } else {
            this.$MyMessage.error(res.message);
          }
        })
        .catch((error) => {
          if (error) {
            this.$MyMessage.error("网络异常，移除失败！");
          }
        });
      // this.$emit("doDeleteEnsure", this.parentDatas);
    },
    // 删除
    doDelete(record, text, index) {
      this.deleteWarningShow = true;
      this.$refs.DeleteModel.$emit("show", {
        ...record,
        contentText: `确定移除${this.parentDatas.groupName}组下《${record.name}》?`,
        text,
        index,
      });
    },
    // 置顶视频墙
    doVideoTopping(record, text, index) {
      videoTopping({
        channelId: record.id,
        groupId: this.parentDatas.sid,
      }).then((res) => {
        if (res.success) {
          this.$MyMessage.success("置顶成功！");
          this.currentPage = 1;
          this.doGetGrounpOneVideoList({
            body: { sid: this.parentDatas.sid },
            page: 1,
            pageSize: "6",
          });
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    // 置顶视频墙
    doCancelVideoTopping(record, text, index) {
      cancelVideoTopping({
        channelId: record.id,
        groupId: this.parentDatas.sid,
      }).then((res) => {
        if (res.success) {
          this.$MyMessage.success("取消置顶成功！");
          this.currentPage = 1;
          this.doGetGrounpOneVideoList({
            body: { sid: this.parentDatas.sid },
            page: 1,
            pageSize: "6",
          });
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common.less";
.wall-videoname-list {
  width: 560vw * @w;
  height: 600vh * @h;
  background: rgba(0, 0, 0, 0.6);
  .videoname-list-inner {
    width: 100%;
    height: calc(100% - 30vh * @h);
  }
}

.videoname-list-opations {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: flex;
    width: 24vh * @h;
    height: 24vh * @h;
    font-size: 20vh * @h;
    color: white;
    cursor: pointer;
    border: 1px white solid;
    margin: 0 12vw * @w;
    .border-radisu(50%,50%);
    text-align: center;
    line-height: 20vh * @h;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  span:hover {
    color: #00ffff;
    border: 1px #00ffff solid;
  }
}
/* 删除-层 */
.list-delete-player {
  width: 120%;
  height: 120%;
  position: absolute;
  top: -10%;
  left: -10%;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 2px 2px 20px #00ffff;
  padding: 4vh * @h 6vw * @w;
  .box-sizing();
}
.wall-list-name {
}
.list-body li div .is-top {
  color: #268d20;
}
</style>
