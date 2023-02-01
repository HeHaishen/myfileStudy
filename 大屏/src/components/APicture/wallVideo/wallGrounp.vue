<!--
 * @Description: 视频墙-分组
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-08 11:17:24
 * @LastEditTime: 2021-10-15 01:11:07
-->
<template>
  <div class="wall-grounp">
    <div class="wall-grounp-opation">
      <div class="search-input-wrap">
        <input
          type="text"
          placeholder="请输入名称搜索"
          v-model="searchGrounpValue"
        />
        <span class="" @click="doGrounpSearch">搜索</span>
      </div>
      <p class="click-btn" @click="doAddGrounp">添加分组</p>
    </div>
    <div class="wall-grounp-list">
      <TableList :columns="columnsList" :listData="listData">
        <template slot="groupName" slot-scope="{ record, text, index }">
          <div
            class="wall-list-name"
            @click="showLeftRightModel(record, text, index)"
            :style="
              grounpClickRow.sid === record.sid ? { color: '#00ffff' } : ''
            "
          >
            {{ text }}
          </div>
        </template>
        <template slot="opation" slot-scope="{ record, text, index }">
          <div class="wall-list-opations">
            <span @click="addGrounpVideo(record, text, index)">+</span>
            <span @click="openDeleteGrounp(record, text, index)">×</span>
            <span @click="doEditGrounp(record, text, index)">📝</span>
          </div>
        </template>
      </TableList>
    </div>
    <!-- 分页 -->
    <div class="change-pages" v-if="false">
      <ChangePage
        :total="total"
        v-model="currentPage"
        @changePages="changePages"
      />
    </div>
    <!-- 视频分组 -->
    <div class="wall-chose-list" v-show="videoNameListShow">
      <div class="chose-list-title">
        分组视频列表<label style="color: #00ffff">◀</label>
      </div>
      <VideoNameList ref="VideoNameList" />
    </div>
    <!-- 播放-视频墙 -->
    <div class="wall-video-right" v-show="wallVideoRightShow">
      <div class="chose-list-title">
        <label style="color: #00ffff">▶</label>分组视频列表
      </div>
      <WallVideo ref="WallVideoRightModel" />
    </div>
    <!-- 视频列表添加视频 -->
    <div class="cover-chose-list" v-show="addVideoShow">
      <ChoseVideoList
        ref="ChoseVideoListModel"
        @doClose="doCloseAddVideo"
        @addEnsureSuccess="addVideoWallSuccess"
      ></ChoseVideoList>
    </div>
    <!-- 确定删除 -->
    <div class="list-delete-player" v-show="deleteWarningShow">
      <DeleteModel
        ref="DeleteModel"
        @doClose="doCloseDeleteModel"
        @doCancel="doCloseDeleteModel"
        @doEnsure="doDeleteEnsure"
      />
    </div>
    <!-- 添加、编辑分组 -->
    <div class="list-add-edit" v-show="addEditModelShow">
      <addEdit
        ref="addEditModel"
        @doClose="addEditDoClose"
        @doSave="addEditDoSave"
        @doCancel="addEditDoCancel"
      />
    </div>
  </div>
</template>
<script>
import TableList from "@/components/APicture/c-table"; //列表组件
import VideoNameList from "./wallList"; // 当前组视频列表
import WallVideo from "./wallVideo"; // 播放视频墙
import ChangePage from "@/components/APicture/changePage"; // 分页组件
import ChoseVideoList from "./videoListChose"; //添加视频列表
import DeleteModel from "./listDeleteModel"; // 删除提示
import addEdit from "@/components/APicture/wallVideo/addEdit"; // 编辑新增
import { getGrounpList, deleteGrounp, addGrounpVideo } from "@/api/common";
export default {
  components: {
    TableList,
    VideoNameList,
    WallVideo,
    ChangePage,
    ChoseVideoList,
    DeleteModel,
    addEdit,
  },
  data() {
    return {
      searchGrounpValue: null,
      columnsList: [
        { title: "分组名称", index: 0, textIndex: "groupName", width: "70%" },
        { title: "操作", index: 1, textIndex: "opation", width: "30%" },
      ],
      listData: [],
      total: 0,
      currentPage: 1,
      videoNameListShow: false, // 左侧分组中的摄像头-显示隐藏
      wallVideoRightShow: false, // 右侧视频墙-显示隐藏
      grounpClickRow: { sid: null }, // 保存点击的视频分组

      addVideoShow: false,
      deleteWarningShow: false,
      addEditModelShow: false,
    };
  },
  created() {},
  mounted() {
    this.$on("initWallGrounp", (data) => {
      this.initDatas();
      this.doGetGrounpList({ pageSize: 10, page: 1, body: {} });
    });
  },
  methods: {
    initDatas() {
      this.searchGrounpValue = null;
      this.videoNameListShow = false;
      this.wallVideoRightShow = false;
      this.grounpClickRow = { sid: null };
      this.addVideoShow = false;
      this.deleteWarningShow = false;
      this.addEditModelShow = false;
    },
    // 获取分组根节点名称
    doGetGrounpList(sendObj) {
      let sendData = { ...sendObj };
      getGrounpList({ ...sendData }).then((res) => {
        if (res.success) {
          console.log("获取分组根节点名称", res);
          if (res.body && res.body.length) {
            this.listData = res.body;
            this.total = parseInt(res.total);
          } else {
            this.listData = [];
            this.total = 0;
            this.currentPage = 1;
          }
        } else {
          this.total = 0;
          this.currentPage = 1;
          this.$MyMessae.warning("无法查询相关节点");
        }
      });
    },
    // 搜索视频组
    doGrounpSearch() {
      let sendData = { pageSize: 10, page: 1, body: {} };
      if (this.searchGrounpValue && this.searchGrounpValue.trim() !== "") {
        sendData.body = { groupName: this.searchGrounpValue };
      }
      this.doGetGrounpList({ ...sendData });
    },
    changePages(pages) {
      this.currentPage = parseInt(pages.pages);
      let sendData = { pageSize: 10, page: parseInt(pages.pages), body: {} };
      if (this.searchGrounpValue && this.searchGrounpValue.trim() !== "") {
        // sendData.groupName = this.searchGrounpValue;
        sendData.body = { groupName: this.searchGrounpValue };
      }
      this.doGetGrounpList({ ...sendData });
    },
    //点击视频分组名称显示-视频墙和视频分组
    showLeftRightModel(record, text, index) {
      if (
        record.sid === this.grounpClickRow.sid &&
        this.grounpClickRow.sid != null //
      ) {
        this.videoNameListShow = false;
        this.wallVideoRightShow = false;
        this.grounpClickRow = { sid: null };
        return false;
      }
      this.videoNameListShow = true;
      this.wallVideoRightShow = true;
      if (this.videoNameListShow && this.wallVideoRightShow) {
        this.grounpClickRow = JSON.parse(JSON.stringify(record));
        // this.doGetGrounpOneVideoList(record)
        this.$refs.VideoNameList.$emit("show", record);
        this.$refs.WallVideoRightModel.$emit("show", record);
      } else {
        this.grounpClickRow = { sid: null };
      }
    },
    // 打开视频添加列表
    addGrounpVideo(record, text, index) {
      this.addVideoShow = true;
      this.$refs.ChoseVideoListModel.$emit("show", { ...record, text, index });
    },
    // 关闭添加视频
    doCloseAddVideo() {
      this.addVideoShow = false;
    },
    // 打开删除提醒
    openDeleteGrounp(record, text, index) {
      this.deleteWarningShow = true;
      this.$refs.DeleteModel.$emit("show", {
        ...record,
        contentText: `确定删除《${record.groupName}》?`,
        text,
        index,
      });
    },
    // 关闭
    doCloseDeleteModel() {
      this.deleteWarningShow = false;
    },
    // 确定删除
    doDeleteEnsure(obj) {
      deleteGrounp([obj.sid])
        .then((res) => {
          if (res.success) {
            this.$MyMessage.success("删除成功！");
            this.initDatas();
            this.doGetGrounpList({ pageSize: 10, page: 1,body:{} });
            this.deleteWarningShow = false;
          } else {
            this.$MyMessage.error(res.message);
            this.deleteWarningShow = false;
          }
        })
        .catch((error) => {
          if (error) {
            this.$MyMessage.error("网络错误请稍后重试！");
            this.deleteWarningShow = false;
          }
        });
    },
    // 添加分组
    doAddGrounp() {
      this.addEditModelShow = true;
      this.$refs.addEditModel.$emit("show", { pageType: "add" });
    },
    // 关闭新增编辑
    addEditDoClose() {
      this.addEditModelShow = false;
    },
    doEditGrounp(record, text, index) {
      this.addEditModelShow = true;
      this.$refs.addEditModel.$emit("show", { pageType: "edit", ...record });
    },
    //
    addEditDoSave() {
      this.initDatas();
      this.doGetGrounpList({ pageSize: 10, page: 1,body:{} });
      this.addEditModelShow = false;
    },
    // addecitDoSave
    addEditDoCancel() {
      this.addEditModelShow = false;
    },
    // 视频添加到视频墙和视频分组成功回调
    addVideoWallSuccess(datas) {
      this.addVideoShow = false;
      this.$refs.VideoNameList.$emit("show", datas);
      this.$refs.WallVideoRightModel.$emit("show", datas);
    },
    // 关闭流
    doCloseClearnAll() {
      this.$refs.WallVideoRightModel.doCloseThing();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common.less";
.wall-grounp {
  width: 100%;
  height: 100%;
  .wall-grounp-opation {
    width: 100%;
    height: 40vh * @h;
    display: flex;
    align-items: center;
  }
  .wall-grounp-list {
    margin-top: 8vh * @h;
    width: 100%;
    height: calc(100% - 60vh * @h);
  }
  .change-pages {
    width: 100%;
    height: 30vh * @h;
  }
  .cover-chose-list {
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
}
.wall-list-opations {
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
  }
  span:hover {
    color: #00ffff;
    border: 1px #00ffff solid;
  }
}

.wall-chose-list {
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  left: -590vw * @w;
  top: 0;
  height: auto;
  background: rgba(0, 0, 0, 0.6);
  padding: 0 10vw * @w;
  box-shadow: -1px -1px 9px #00ffff;
  .box-sizing();
  .chose-list-title {
    width: 100%;
    height: 30vh * @h;
    font-size: 20vh * @h;
    color: white;
    line-height: 30vh * @h;
    text-align: right;
  }
}
.wall-video-right {
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  right: -630vw * @w;
  top: 0;
  height: auto;
  background: rgba(0, 0, 0, 0.6);
  padding: 0 10vw * @w;
  box-shadow: -1px -1px 9px #00ffff;
  .chose-list-title {
    width: 100%;
    height: 30vh * @h;
    font-size: 20vh * @h;
    color: white;
    line-height: 30vh * @h;
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
/deep/ .ant-popover,
/deep/ .ant-popover-placement-top {
  z-index: 10000;
}
body .ant-popover-placement-top {
  z-index: 10000;
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
/* 新增、编辑-层 */
.list-add-edit {
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
.wall-list-name {
  cursor: pointer;
}
.wall-list-name :hover {
  color: #00ffff;
}
</style>
