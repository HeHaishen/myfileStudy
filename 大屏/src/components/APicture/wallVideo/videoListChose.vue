<!--
 * @Description:选择视频列表
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-10 11:00:14
 * @LastEditTime: 2021-10-08 17:41:43
-->
<template>
  <div class="chose-viedeo-list">
    <div class="viedeo-list-title">
      <p class="text-title">分组选择视频</p>
    </div>
    <div class="video-list-opation">
      <div class="search-input-wrap">
        <input type="text" placeholder="请输入名称搜索" v-model="searchValue" />
        <span class="" @click="doSearch">搜索</span>
      </div>
      <p class="click-btn" @click="doEnSureAddGrounp">确定并添加到分组</p>
    </div>
    <div class="viedeo-list-content">
      <TableList :columns="columnsLlist" :listData="listDataList">
        <template slot="checked" slot-scope="{ record, text, index }">
          <span
            class="c-talbe-select"
            :class="[record.remoteChecked ? 'c-table-checked' : '']"
            @click="listDoChecked(record, text, index)"
            >{{ text ? "✔" : "" }}</span
          >
        </template>
        <template slot="name" slot-scope="{ record, text }">
          <div @click="clickVideo(record)" style="cursor: pointer">
            {{ text }}
          </div>
        </template>
        <template slot="status" slot-scope="{ record, text }">
          <div
            :style="[
              text === 'ON' ? { color: '#2be431' } : { color: '#f5222d' },
            ]"
          >
            {{ styleLineObj[text] }}
            <p
              class="show-video-icon"
              v-if="text === 'ON'"
              style="color: #00ffff"
            >
              <a-icon
                @click="clickVideoPlay(record)"
                type="video-camera"
                style="cursor: pointer"
              />
            </p>
          </div>
        </template>
        <template slot="resoures" slot-scope="{ record, text }">
          <div style="display: flex">
            <p>城管云</p>
          </div>
        </template>
      </TableList>
    </div>
    <div class="change-pages">
      <ChangePage
        :total="total"
        :currentPage="currentPage"
        @changePages="changePages"
      />
    </div>
    <div class="layer-close">
      <p @click="doClose">X</p>
    </div>
  </div>
</template>

<script>
import ChangePage from "@/components/APicture/changePage"; // 分页组件
import TableList from "@/components/APicture/c-table"; //列表组件
import {
  getVideoListApi, //获取摄像头
  getGrounpOneVideoList, // 根据视频分组获取上墙列表
  addGrounpVideo, //添加视频分组
  addGrounpWallVideo, // 给视频墙添加视频
  userGrounpIdGetAllVideo, //根据分组id获取所有视频列表-有是否选中字段
  getVideoNowStatus, // 获取视频状态
} from "@/api/common";
export default {
  components: { TableList, ChangePage },
  data() {
    return {
      parsenData: { sid: null },
      searchValue: null,
      columnsLlist: [
        { title: "选择", index: 0, textIndex: "checked", width: "10%" },
        { title: "名称", index: 1, textIndex: "name", width: "34%" },
        { title: "所在区域", index: 2, textIndex: "areaName", width: "20%" },
        { title: "在线状态", index: 3, textIndex: "status", width: "20%" },
        { title: "来源", index: 4, textIndex: "resoures", width: "16%" },
      ],
      listDataList: [],
      hasChoseListSid: [], // 根据接口获取回来的
      newChoseListSid: [], // 新选中的
      total: 0,
      currentPage: 1,
      styleLineObj: {
        OFF: "离线",
        ON: "在线",
      },
    };
  },
  mounted() {
    this.$on("show", (data) => {
      this.initData();
      this.parsenData = JSON.parse(JSON.stringify(data));
      this.getVideoList({}, 10).then((res) => {
        if (res.success) {
          if (res.body && res.body.length) {
            this.listDataList = res.body;
            console.log(this.listDataList);
            this.listDataList.map((i, k) => {
              i.checked = i.checked ? i.checked : false;
              if (i.checked) {
                // 是否远程已经选中
                i.remoteChecked = true;
              } else {
                i.remoteChecked = false;
              }
              this.doGetVideoNowStatus(i, k);
            });
            this.total = parseInt(res.total);
            this.current = 1;
            this.doGetHasChoseList(this.parsenData);
          }
        }
      });
    });
  },
  methods: {
    initData() {
      this.hasChoseListSid = [];
      this.newChoseListSid = [];
      this.listDataList = [];
      this.total = 0;
      this.currentPage = 1;
    },
    doClose() {
      this.$emit("doClose");
    },
    // 获取已经选中的列表
    doGetHasChoseList(obj) {
      getGrounpOneVideoList({ sid: obj.sid }).then((res) => {
        if (res.success) {
          if (res.body && res.body.length) {
            this.hasChoseListSid = res.body;
            this.changeHasCheckedList();
          }
        }
      });
    },
    // 更改已经选中的-列表状态
    changeHasCheckedList() {
      this.listDataList.map((i, k) => {
        let findCurrent = null;
        findCurrent = this.hasChoseListSid.find((fi, fk) => {
          if (fi.sid === i.sid) {
            return i;
          }
        });
        if (findCurrent) {
          this.hasChoseListSid[k]["checked"] = true;
          if (this.hasChoseListSid[k]["checked"]) {
            // 是否远程已经选中
            i.remoteChecked = true;
          } else {
            i.remoteChecked = false;
          }
        }
      });
    },
    // 列表点击选择或取消选择
    listDoChecked(row, text, k) {
      if (row.remoteChecked) {
        this.$MyMessage.warning(
          "该视频已经在分组中，如需移除请在分组列表中移除！"
        );
        return false;
      }
      this.listDataList[k]["checked"] = !row.checked;
      this.listDataList = JSON.parse(JSON.stringify(this.listDataList));
      if (this.listDataList[k]["checked"]) {
        this.newChoseListSid.push(row.id);
      } else {
        let saveKey = this.newChoseListSid.indexOf(row.id);
        this.newChoseListSid = JSON.parse(
          JSON.stringify(this.newChoseListSid.slice(saveKey))
        );
      }
    },
    clickVideoPlay(record) {
      pGzznCore.videoSearchPlay(record); //直接点击播放
    },
    // 获取视频列表
    getVideoList(obj, pageSize = 1000, current = 1) {
      let send = {
        body: { ...obj, sid: this.parsenData.sid },
        page: current,
        pageSize: pageSize,
        sortName: "sid",
        sortOrder: "desc",
      };
      return new Promise((reslove, reject) => {
        userGrounpIdGetAllVideo(send).then((res) => {
          if (res.success) {
            reslove(res);
            console.log("获取摄像列表", res);
          }
        });
      });
    },
    // 点击分页
    changePages(currentPage) {
      let send = {
        channelName:
          this.searchValue || this.searchValue !== "" ? this.searchValue : null,
      };
      this.getVideoList(send, 10, currentPage.pages).then((res) => {
        if (res.success) {
          // this.current = parseInt(currentPage.pages);
          this.listDataList = JSON.parse(JSON.stringify(res.body));
          this.listDataList.map((i, k) => {
            i.checked = i.checked ? i.checked : false;
            if (i.checked) {
              // 是否远程已经选中
              i.remoteChecked = true;
            } else {
              i.remoteChecked = false;
            }
            let saveKey = this.newChoseListSid.indexOf(i.id);
            console.log("ddddd", saveKey);
            if (saveKey !== -1) {
              i.checked = true;
            } else {
              i.checked = false;
            }this.doGetVideoNowStatus(i, k);
          });
          this.current = parseInt(currentPage.pages);
          this.total = parseInt(res.total);
        }
      });
    },
    // 点击搜索
    doSearch() {
      this.current = 1;
      this.getVideoList({ channelName: this.searchValue }, 10).then((res) => {
        if (res.success) {
          if(res.body && res.body.length) {
            this.listDataList = res.body;
            this.listDataList.map((i, k) => {
              i.checked = i.checked ? i.checked : false;
              if (i.checked) {
                // 是否远程已经选中
                i.remoteChecked = true;
              } else {
                i.remoteChecked = false;
              }
              let saveKey = this.newChoseListSid.indexOf(i.id);
              if (saveKey !== -1) {
                i.checked = true;
              } else {
                i.checked = false;
              }
              this.doGetVideoNowStatus(i, k);
            });
            this.total = parseInt(res.total);
          } else {
            this.listDataList = []
          }
        }
      });
    },
    // 点击确定保存
    async doEnSureAddGrounp() {
      let saveArrObj = [];
      let saveChoseList = this.newChoseListSid.map((i, k) => {
        let obj = {
          channelId: i,
          groupId: this.parsenData.sid,
        };
        saveArrObj.push(obj);
      });
      let waitLoop = await saveChoseList;
      addGrounpVideo(saveArrObj).then((res) => {
        if (res.success) {
          addGrounpWallVideo(saveArrObj).then((resWall) => {
            if (resWall.success) {
              this.$MyMessage.success("添加到视频墙成功！");
              this.$emit("addEnsureSuccess", this.parsenData);
            } else {
              this.$MyMessage.error(`${resWall.message}添加到视频墙失败！`);
            }
          });
        }
      });
    },
    // 获取当前摄像头状态
    doGetVideoNowStatus(obj, listIndex) {
      let deviceObj = {
        deviceId: obj.deviceId,
        id: obj.id,
      };
      getVideoNowStatus(deviceObj)
        .then((res) => {
          if (res.success) {
            this.listDataList[listIndex]["status"] = res.body;
            this.listDataList = JSON.parse(JSON.stringify(this.listDataList));
          } else {
            console.log(res.message);
          }
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common.less";
.chose-viedeo-list {
  width: 100%;
  height: 100%;
  position: relative;
  .viedeo-list-title {
    width: 100%;
    height: 34vh * @h;
    .text-title {
      width: 100%;
      height: 100%;
      color: white;
      font-size: 24vh * @h;
    }
  }
  /* 弹窗标题-结束 */
  .layer-close {
    width: 32vw * @w;
    height: 26vh * @h;
    text-align: center;
    cursor: pointer;
    position: absolute;
    right: 8vw * @w;
    top: 8vh * @h;
    p {
      width: 100%;
      height: 100%;
      line-height: 26vh * @h;
      text-align: center;
      color: white;
      font-size: 26vh * @h;
      text-align: center;
      font-weight: bold;
    }
  }
  .viedeo-list-content {
    width: 100%;
    height: calc(100% - 185vh * @h);
    /deep/ .c-talbe-select {
      width: 18vh * @h;
      height: 18vh * @h;
      border: 1px solid #00ffff;
      text-align: center;
      line-height: 18vh * @h;
      font-size: 14vh * @h;
      font-weight: bold;
      color: white;
      cursor: pointer;
    }
    /deep/ .show-video-icon {
      margin-left: 10vw * @w;
      font-size: 28vh * @h;
    }
    /deep/ .c-table-checked {
      background: #00ffff;
    }
  }
  .change-pages {
    width: 100%;
    height: 30vh * @h;
  }
  .video-list-opation {
    width: 100%;
    height: 55vh * @h;
    display: flex;
    align-items: center;
  }
}
.click-btn {
  height: auto;
  width: auto;
  padding: 8vh * @h 16vw * @w;
  .box-sizing();
  background: rgb(54, 152, 243, 0.8);
  color: white;
  cursor: pointer;
  font-size: 14vh * @h;
  margin-left: 10vw * @w;
}
.search-input-wrap {
  width: auto;
  min-height: 34vh * @h;
  border: 1px #3573fc solid;
  display: flex;
  align-items: center;
  margin-left: 4vw * @w;
  input {
    display: flex;
    width: 276vw * @w;
    height: 100%;
    border: 0 solid #fff;
    color: white;
    background: #062447;
    font-size: 16vh * @h;
    margin: 2vh * @h 2vh * @h 2vh * @h 2vh * @h;
  }
  span {
    display: block;
    height: 100%;
    width: 84vw * @w;
    height: 30vh * @h;
    background: #074990;
    color: white;
    margin: 2vh * @h 2vh * @h 2vh * @h 2vh * @h;
    font-size: 16vh * @h;
    line-height: 30vh * @h;
    text-align: center;
    cursor: pointer;
  }
}
</style>
