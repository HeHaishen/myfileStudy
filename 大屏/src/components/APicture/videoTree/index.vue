<!--
 * @Description: 视频选择树
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-08-15 13:44:15
 * @LastEditTime: 2021-11-09 15:04:46
-->
<template>
  <pop-up-layer
    v-show="showType"
    :show="showType"
    :setStyles="{}"
    @doClose="allCenterBtnClose"
    :opsition="opsition"
    :title="title"
    ref="VideoTreeList"
    class="video-tree-list"
  >
    <template slot="content">
      <div class="detail-content">
        <div class="chose-type">
          <div
            class="btns-div"
            v-for="(i, k) in btnList"
            :key="k"
            :class="[btnActive === k ? 'btn-active' : '']"
            @click="btnChangeType(i, k)"
          >
            {{ i.name }}
          </div>
        </div>
        <div class="content-right">
          <a-tree
            v-if="btnActive === 1"
            :load-data="onLoadData"
            :tree-data="treeData"
            :replaceFields="replaceTreeFields"
            @select="treeSelect"
            v-model="checkedKeys"
            @check="doCheck"
            checkable
          />
          <a-tree
            v-if="btnActive === 2"
            :load-data="onLineLoadData"
            :tree-data="lineTreeData"
            :replaceFields="replaceLineTreeFields"
            @select="treeLineSelect"
            v-model="lineCheckedKeys"
            @check="doLineCheck"
            checkable
          />
          <a-tree
            v-if="btnActive === 3"
            :load-data="onTasksLoadData"
            :tree-data="tasksTreeData"
            :replaceFields="replaceTasksTreeFields"
            @select="treeTasksSelect"
            v-model="tasksCheckedKeys"
            @check="doTasksCheck"
            checkable
          />
          <div class="tree-search-div" v-if="btnActive === 0">
            <div class="right-content-search">
              <div>
                <input
                  type="text"
                  placeholder="请输入名称搜索"
                  v-model="searchValue"
                />
                <span class="" @click="doSearch">搜索</span>
              </div>
              <p class="click-btn" @click="clickShowWall($event)">视频墙</p>
            </div>
            <div class="tree-key-search">
              <clist
                :columns="rightTopListHeader"
                :listData="rightTopListContent"
              >
                <template slot="checked" slot-scope="{ record, text, index }">
                  <span
                    class="c-talbe-select"
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
                      text === 'ON'
                        ? { color: '#2be431' }
                        : { color: '#f5222d' },
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
              </clist>
            </div>
            <div
              class="tree-change-pages"
              style="width: 100%; height: auto"
              v-if="rightTopListContent.length"
            >
              <changePage
                v-model="current"
                :total="total"
                @changePages="keyChangePages"
              />
            </div>
          </div>
        </div>
      </div>
      <WallVideo
        v-model="wallVideoShow"
        title="视频分组"
        :propEvent="clickSendEvent"
        ref="WallVideoModel"
        @doClose="clickCloseWallModel"
      />
    </template>
  </pop-up-layer>
</template>
<script>
import {
  getArrTreeList,
  getArrTreeChildrenList,
  getVideoTaskDangerous, // 获取危化企业
  getVideoCheckSee, // 获取重点监控企业
  getThreeImportCheckSee, // 三防重点监控区域
  getGovOverCheckSee, // 政府周边监控区域
  getAllTypeCheckSee, // 综合类
  getVideoListApi, //获取摄像头
  getMetroLineApi, //获取地铁线路
  getVideoNowStatus, // 获取视频状态
} from "@/api/common";
import Clist from "@/components/APicture/c-table";
import changePage from "@/components/APicture/changePage";
import WallVideo from "@/components/APicture/wallVideo/wallVideoindex";
export default {
  components: {
    Clist,
    changePage,
    WallVideo, // 视频墙
  },
  data() {
    return {
      opsition: "btnTop",
      showType: false,
      title: "视频监控",
      parentData: {},
      // 行政区域--树
      btnActive: 0,
      btnList: [
        { name: "全部", key: 0 },
        { name: "行政区域", key: 1 },
        { name: "地铁线路", key: 2 },
        { name: "标签分类", key: 3 },
      ],
      replaceTreeFields: {
        children: "children",
        title: "name",
        key: "sn",
      },
      checkedKeys: [],
      treeData: [
        {
          name: "广州市",
          key: "440100000000",
          en: "440100000000",
          sn: "440100000000",
          children: [],
        },
      ],
      styleLineObj: {
        OFF: "离线",
        ON: "在线",
      },
      //地铁线路树
      lineCheckedKeys: [],
      lineTreeData: [
        {
          name: "广州市地铁线路",
          key: "440100000000",
          en: "440100000000",
          sn: "440100000000",
          children: [],
        },
      ],
      replaceLineTreeFields: {
        children: "children",
        title: "name",
        key: "sn",
      },
      // 标签分类树
      tasksCheckedKeys: [],
      tasksTreeData: [],
      replaceTasksTreeFields: {
        children: "children",
        title: "title",
        key: "sid",
      },
      // 关键字搜索列表
      total: 0,
      current: 1,
      searchValue: null,
      rightTopListHeader: [
        { title: "选择", index: 0, textIndex: "checked", width: "10%" },
        { title: "名称", index: 1, textIndex: "name", width: "34%" },
        { title: "所在区域", index: 2, textIndex: "areaName", width: "20%" },
        { title: "在线状态", index: 3, textIndex: "status", width: "20%" },
        { title: "来源", index: 4, textIndex: "resoures", width: "16%" },
      ],
      rightTopListContent: [],
      /* 视频墙 */
      wallVideoShow: false,
      clickSendEvent: null,
    };
  },
  mounted() {
    this.$on("show", (data) => {
      console.log("show,show", "data");
      this.showType = !this.showType;
      if (this.showType) {
        this.initData();
        this.parentData = data;
        console.log(data.saveEvent);
        this.$refs.VideoTreeList.saveEvent = null;
        this.$refs.VideoTreeList.saveEvent = data.saveEvent;
        this.getRemoteTreeList();
        this.initTaskTree();
        this.initMetroTree();
        this.getVideoList({}, 10).then((res) => {
          if (res.success) {
            if (res.body && res.body.length) {
              this.rightTopListContent = res.body;
              this.rightTopListContent.map((i, k) => {
                i.checked = false;
                this.doGetVideoNowStatus(i, k);
              });
              this.total = parseInt(res.total);
              console.log(this.total);
              this.current = 1;
            }
          }
        });
      }
    });
  },
  methods: {
    initData() {
      this.total = 0;
      this.current = 1;
      this.searchValue = null;
      this.parentData = {};
      this.treeData = [
        {
          name: "广州市",
          key: "440100000000",
          en: "440100000000",
          sn: "440100000000",
          children: [],
        },
      ];
    },
    initMetroTree() {
      getMetroLineApi().then((res) => {
        if (res.success) {
          if (res.body && res.body.length) {
            for (let i = 0; i < res.body.length; i++) {
              res.body[i].isLeaf = null; //回来的数据与aTree冲突，此处是修改数据问题.
            }
            this.lineTreeData = JSON.parse(
              JSON.stringify([
                {
                  name: "广州市地铁线路",
                  key: "440100000000",
                  en: "440100000000",
                  sn: "440100000000",
                  children: res.body,
                },
              ])
            );
            console.log(this.lineTreeData);
          }
        }
      });
    },
    getRemoteTreeList() {
      getArrTreeList({
        body: { parentId: "440100000000" },
        pageSize: 100,
        sortName: "sid",
        sortOrder: "desc",
      }).then((res) => {
        console.log("获取视频树", res);
        if (res.success) {
          if (res.body && res.body.length) {
            this.treeData = JSON.parse(
              JSON.stringify([
                {
                  name: "广州市",
                  key: "440100000000",
                  en: "440100000000",
                  sn: "440100000000",
                  children: res.body,
                },
              ])
            );
            console.log(this.treeData);
          }
        }
      });
    },
    allCenterBtnClose() {
      this.showType = false;
    },
    // 点击树节点
    // 行政区域树
    treeSelect(selectedKeys, e) {
      console.log(selectedKeys, e, e.node.dataRef.isLeaf);
      if (e.node.dataRef.isLeaf) {
        // this.rightAllObj.allTableShow = false;
      } else {
        // this.rightAllObj.allTableShow = true;
      }
    },
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef.types && treeNode.dataRef.types >= 0) {
          let sendData = {
            codes: treeNode.dataRef.sn,
            send: {},
          };
          getArrTreeChildrenList(sendData).then((res) => {
            if (res.success) {
              this.getVideoList({
                areaCode: treeNode.dataRef.sn,
              }).then((Vres) => {
                if (
                  res.body &&
                  res.body.length &&
                  Vres.body &&
                  Vres.body.length
                ) {
                  Vres.body.map((i, k) => {
                    i.title = i.name;
                    i.sn = i.id;
                    i.isLeaf = true;
                  });
                  console.log(Vres.body, "区域树视频");
                  treeNode.dataRef.children = [...res.body, ...Vres.body];
                  this.treeData = [...this.treeData];
                  resolve();
                } else if (res.body && res.body.length) {
                  treeNode.dataRef.children = res.body;
                  this.treeData = [...this.treeData];
                  resolve();
                } else if (Vres.body && Vres.body.length) {
                  Vres.body.map((i, k) => {
                    i.title = i.name;
                    i.sn = i.id;
                    i.isLeaf = true;
                  });
                  console.log(Vres.body, "区域树视频");
                  treeNode.dataRef.children = [...Vres.body];
                  this.treeData = [...this.treeData];
                }
              });
              /* if (res.body && res.body.length) {
                treeNode.dataRef.children = res.body;
                this.treeData = [...this.treeData];

                resolve();
              } else {
                resolve();
              } */
            }
          });
        } else {
          resolve();
          return;
        }
      });
    },
    doCheck(checkedKeys, e) {
      console.log(checkedKeys, e, this.checkedKeys);
      pGzznCore.videoSearchDataList(e); //地图接口
      this.$emit("areaCheckClick", {
        nodeCheckedKeys: checkedKeys,
        e: e,
        checkedKeys: this.checkedKeys,
      });
    },
    btnChangeType(i, k) {
      this.btnActive = k;
      if (k === 0 && !this.rightTopListContent.length) {
        this.getVideoList({}, 10).then((res) => {
          if (res.success) {
            if (res.body && res.body.length) {
              this.rightTopListContent = res.body;
              this.rightTopListContent.map((i, k) => {
                i.checked = false;
              });
              this.total = parseInt(res.total);
              console.log(this.total);
              this.current = 1;
            }
          }
        });
      }
    },
    // 地铁区域树
    onLineLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef.sid && treeNode.dataRef.sid != "") {
          let sendData = {
            channelTagValueList: [],
            name: "",
            ownerId: treeNode.dataRef.sid,
            ownerType: treeNode.dataRef.typeId,
          };
          this.getVideoList(sendData).then((res) => {
            if (res.success) {
              if (res.body && res.body.length) {
                treeNode.dataRef.children = res.body;
                this.lineTreeData = [...this.lineTreeData];
                resolve();
              } else {
                resolve();
              }
            }
          });
        } else {
          resolve();
          return;
        }
      });
    },
    treeLineSelect(selectedKeys, e) {
      console.log(selectedKeys, e, e.node.dataRef.isLeaf);
      if (e.node.dataRef.isLeaf) {
        // this.rightAllObj.allTableShow = false;
      } else {
        // this.rightAllObj.allTableShow = true;
      }
    },
    doLineCheck(checkedKeys, e) {
      console.log(checkedKeys, e, this.checkedKeys);
      pGzznCore.videoSearchDataList(e); //地图接口
    },
    // 标签分类---工5个接口
    initTaskTree() {
      this.tasksTreeData = [];
      // 危化企业标签
      getVideoTaskDangerous()
        .then((res) => {
          if (res.success) {
            if (res.body && res.body.length) {
              // let saveArr = res.body.map((i,k)=>{
              //   if(i.)
              // })

              let saveParentTask = res.body.find((i, k) => {
                if (i.parentId === "-1") {
                  i.isLeaf = false;
                  i.hasChildren = true;
                  return i;
                }
              });
              let saveChildrenTask = res.body.filter((i, k) => {
                if (i.parentId !== "-1" && i.parentId === saveParentTask.sid) {
                  // console.log("9999",i.title,i.parentId)
                  i.children = res.body.filter((item, key) => {
                    if (item.parentId === i.sid) {
                      i.isLeaf = false;
                      item.isLeaf = false;
                      item.hasChildren = false;
                      return item;
                    } else {
                      item.isLeaf = false;
                      i.isLeaf = false;
                    }
                  });
                  if (i.children && i.children.length) {
                    i.hasChildren = true;
                  }
                  return i;
                }
              });

              this.tasksTreeData.push({
                ...saveParentTask,
                children: [...saveChildrenTask],
              });
              console.log("危化企业", saveParentTask, saveChildrenTask);
            }
          } else {
            this.$message.error("获取危化企业失败！");
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("无法获取危化企业！");
          }
        });
      // 重点监控路段
      getVideoCheckSee()
        .then((res) => {
          if (res.success) {
            if (res.body && res.body.length) {
              let saveParentTask = res.body.find((i, k) => {
                if (i.parentId === "-1") {
                  i.isLeaf = false;
                  i.hasChildren = true;
                  return i;
                }
              });
              let saveChildrenTask = res.body.filter((i, k) => {
                if (i.parentId !== "-1" && i.parentId === saveParentTask.sid) {
                  // console.log("9999",i.title,i.parentId)
                  i.children = res.body.filter((item, key) => {
                    if (item.parentId === i.sid) {
                      i.isLeaf = false;
                      item.isLeaf = false;
                      item.hasChildren = false;
                      return item;
                    } else {
                      item.isLeaf = false;
                      i.isLeaf = false;
                    }
                  });
                  if (i.children && i.children.length) {
                    i.hasChildren = true;
                  }
                  return i;
                }
              });

              this.tasksTreeData.push({
                ...saveParentTask,
                children: [...saveChildrenTask],
              });

              console.log("重点监控路段", saveParentTask, saveChildrenTask);
            }
          } else {
            this.$message.error("获取危化企业失败！");
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("无法获取危化企业！");
          }
        });
      // 三防重点监控区域
      getThreeImportCheckSee()
        .then((res) => {
          if (res.success) {
            if (res.body && res.body.length) {
              let saveParentTask = res.body.find((i, k) => {
                if (i.parentId === "-1") {
                  i.isLeaf = false;
                  i.hasChildren = true;
                  return i;
                }
              });
              let saveChildrenTask = res.body.filter((i, k) => {
                if (i.parentId !== "-1" && i.parentId === saveParentTask.sid) {
                  // console.log("9999",i.title,i.parentId)
                  i.children = res.body.filter((item, key) => {
                    if (item.parentId === i.sid) {
                      i.isLeaf = false;
                      item.isLeaf = false;
                      item.hasChildren = false;
                      return item;
                    } else {
                      item.isLeaf = false;
                      i.isLeaf = false;
                    }
                  });
                  if (i.children && i.children.length) {
                    i.hasChildren = true;
                  }
                  return i;
                }
              });

              this.tasksTreeData.push({
                ...saveParentTask,
                children: [...saveChildrenTask],
              });

              console.log("三防重点监控区域", saveParentTask, saveChildrenTask);
            }
          } else {
            this.$message.error("获取三防重点监控区域失败！");
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("无法获取三防重点监控区域！");
          }
        });
      // 政府周边监控区域
      getGovOverCheckSee()
        .then((res) => {
          if (res.success) {
            if (res.body && res.body.length) {
              let saveParentTask = res.body.find((i, k) => {
                if (i.parentId === "-1") {
                  i.isLeaf = false;
                  i.hasChildren = true;
                  return i;
                }
              });
              let saveChildrenTask = res.body.filter((i, k) => {
                if (i.parentId !== "-1" && i.parentId === saveParentTask.sid) {
                  // console.log("9999",i.title,i.parentId)
                  i.children = res.body.filter((item, key) => {
                    if (item.parentId === i.sid) {
                      i.isLeaf = false;
                      item.isLeaf = false;
                      item.hasChildren = false;
                      return item;
                    } else {
                      item.isLeaf = false;
                      i.isLeaf = false;
                    }
                  });
                  if (i.children && i.children.length) {
                    i.hasChildren = true;
                  }
                  return i;
                }
              });

              this.tasksTreeData.push({
                ...saveParentTask,
                children: [...saveChildrenTask],
              });

              console.log("政府周边监控区域", saveParentTask, saveChildrenTask);
            }
          } else {
            this.$message.error("获取政府周边监控区域失败！");
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("无法获取综合类！");
          }
        });
      getAllTypeCheckSee()
        .then((res) => {
          if (res.success) {
            if (res.body && res.body.length) {
              let saveParentTask = res.body.find((i, k) => {
                if (i.parentId === "-1") {
                  i.isLeaf = false;
                  i.hasChildren = true;
                  return i;
                }
              });
              let saveChildrenTask = res.body.filter((i, k) => {
                if (i.parentId !== "-1" && i.parentId === saveParentTask.sid) {
                  // console.log("9999",i.title,i.parentId)
                  i.children = res.body.filter((item, key) => {
                    if (item.parentId === i.sid) {
                      i.isLeaf = false;
                      item.isLeaf = false;
                      item.hasChildren = false;
                      return item;
                    } else {
                      item.isLeaf = false;
                      i.isLeaf = false;
                    }
                  });
                  if (i.children && i.children.length) {
                    i.hasChildren = true;
                  }
                  return i;
                }
              });

              this.tasksTreeData.push({
                ...saveParentTask,
                children: [...saveChildrenTask],
              });

              console.log("政府周边监控区域", saveParentTask, saveChildrenTask);
            }
          } else {
            this.$message.error("获取政府周边监控区域失败！");
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("无法获取综合类！");
          }
        });
    },
    // 获取摄像头
    getVideoList(obj, pageSize = 1000, current = 1) {
      let send = {
        body: { ...obj },
        page: current,
        pageSize: pageSize,
        sortName: "sid",
        sortOrder: "desc",
      };
      return new Promise((reslove, reject) => {
        getVideoListApi(send).then((res) => {
          if (res.success) {
            reslove(res);
            console.log("获取摄像列表", res);
          }
        });
      });
    },
    onTasksLoadData(treeNode) {
      // console.log("标签展开", treeNode.dataRef);
      return new Promise((resolve) => {
        if (!treeNode.dataRef.hasChildren) {
          let sendData = {
            channelTagValueList: [
              {
                serverTagName: treeNode.dataRef.name,
                tagList: [treeNode.dataRef.tagValue],
              },
            ],
          };
          this.getVideoList(sendData).then((res) => {
            if (res.success) {
              console.log("添加各路视频", res);
              if (res.body && res.body.length) {
                res.body.map((i, k) => {
                  i.title = i.name;
                  i.sn = i.id;
                  i.isLeaf = true;
                });
                treeNode.dataRef.children = res.body;
                this.lineTreeData = [...this.lineTreeData];
                resolve();
              } else {
                resolve();
              }
            }
          });
        } else {
          resolve();
          return;
        }
      });
    },
    treeTasksSelect(selectedKeys, e) {
      console.log(selectedKeys, e, e.node.dataRef.isLeaf);
      if (e.node.dataRef.isLeaf) {
        // this.rightAllObj.allTableShow = false;
      } else {
        // this.rightAllObj.allTableShow = true;
      }
    },
    doTasksCheck(checkedKeys, e) {
      pGzznCore.videoSearchDataList(e); //地图接口
      this.$emit("taskCheckClick", {
        nodeCheckedKeys: checkedKeys,
        e: e,
        checkedKeys: this.checkedKeys,
      });
    },
    doSearch() {
      this.current = 1;
      this.getVideoList({ name: this.searchValue }, 10).then((res) => {
        if (res.success) {
          if (res.body && res.body.length) {
            this.rightTopListContent = res.body;

            this.rightTopListContent.map((i, k) => {
              i.checked = false;
              this.doGetVideoNowStatus(i, k);
            });
            this.total = parseInt(res.total);
          } else {
            this.rightTopListContent = [];
          }
        }
      });
    },
    clickVideoPlay(record) {
      pGzznCore.videoSearchPlay(record); //直接点击播放
    },
    // 列表摄像头点击
    clickVideo(record) {
      console.log(record);
      pGzznCore.videoSearchLocation(record); //地图定位
      //pGzznCore.videoSearchPlay(record); //直接点击播放
      this.$emit("searchListClick", { ...record });
    },
    //  点击分页
    keyChangePages(currentPage) {
      let send = {
        name:
          this.searchValue || this.searchValue !== "" ? this.searchValue : null,
      };
      this.getVideoList(send, 10, currentPage.pages).then((res) => {
        if (res.success) {
          // this.current = parseInt(currentPage.pages);
          this.rightTopListContent = JSON.parse(JSON.stringify(res.body));
          this.rightTopListContent.map((i, k) => {
            i.checked = false;
            this.doGetVideoNowStatus(i, k);
          });
          this.current = parseInt(currentPage.pages);
          this.total = parseInt(res.total);
        }
      });
    },
    // 列表点击选择或取消选择
    listDoChecked(row, text, k) {
      this.rightTopListContent[k]["checked"] = !row.checked;
      this.rightTopListContent = JSON.parse(
        JSON.stringify(this.rightTopListContent)
      );
    },
    //展示视频墙
    clickShowWall(e) {
      this.clickSendEvent = e; // 如果指定位置-为必传
      this.wallVideoShow = true;
    },
    clickCloseWallModel() {
      this.wallVideoShow = false;
      this.clickSendEvent = null;
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
            this.rightTopListContent[listIndex]["status"] = res.body;
            this.rightTopListContent = JSON.parse(
              JSON.stringify(this.rightTopListContent)
            );
          } else {
          }
        })
        .catch((error) => {
          if (error) {
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
