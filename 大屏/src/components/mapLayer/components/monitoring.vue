<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-01 20:44:19
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-09 11:13:21
-->
<template>
  <div class="monitoring">
    <titleBox
      :titleList="titleList"
      @changeli="changeli"
      :Setstyle="{ height: '40px', 'line-height': '40px' }"
    />
    <!-- <search
      @doSearch="doSearch"
      v-model="keywords"
      placeholder="搜索"
      style="margin-top: 10px"
    /> -->
    <div class="tree">
      <a-tree
        v-if="active == 0"
        :tree-data="treeData"
        :replaceFields="replaceFields"
        :load-data="onLoadData"
        @select="treeSelect"
         v-model="checkedKeys"
            @check="doCheck"
            checkable
      />
        <a-tree
          v-if="active == 1"
          :load-data="onLineLoadData"
          :tree-data="lineTreeData"
          :replaceFields="replaceLineTreeFields"
          v-model="lineCheckedKeys"
          @check="doLineCheck"
          checkable
        />
        <a-tree
          v-if="active == 2"
          :load-data="onTasksLoadData"
          :tree-data="tasksTreeData"
          :replaceFields="replaceTasksTreeFields"
          v-model="tasksCheckedKeys"
          @check="doTasksCheck"
          checkable
        />
        <!-- <template slot="switcherIcon" slot-scope="text, record">
          <a-icon type="minus-square" />
          <a-icon type="plus-square" v-else />
        </template> -->
    </div>
  </div>
</template>

<script>
import titleBox from "./titleBox.vue";
import search from "@/components/mapLayer/components/search.vue";
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
export default {
  components: { titleBox, search },
  data() {
    return {
      detectionActive: 0,
      titleList: [
        { title: "行政区划" },
        { title: "地铁路线" },
        { title: "标签分类" },
      ],
      keywords: "",
      treeData: [],
      replaceFields: {
        children: "children",
        title: "name",
        key: "sn",
      },
      checkedKeys:[],
      //地铁线路树
      lineCheckedKeys: [],
      replaceLineTreeFields: {
        children: "children",
        title: "name",
        key: "sn",
      },
      replaceTasksTreeFields: {
        children: "children",
        title: "title",
        key: "sid",
      },
      lineTreeData: [],
      tasksTreeData: [],
      tasksCheckedKeys: [], // 标签分类树
      active: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    changeli(e, i) {
      this.active = i;
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
    doLineCheck(checkedKeys, e) {
      pGzznCore.videoSearchDataList(e); //地图接口
    },
    doTasksCheck(checkedKeys, e) {
      pGzznCore.videoSearchDataList(e); //地图接口
      this.$emit("taskCheckClick", {
        nodeCheckedKeys: checkedKeys,
        e: e,
        checkedKeys: this.checkedKeys,
      });
    },
    onTasksLoadData(treeNode) {
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
    treeSelect() {},
    doSearch(value) {},
    getRemoteTreeList() {
      getArrTreeList({
        body: { parentId: "440100000000" },
        pageSize: 100,
        sortName: "sid",
        sortOrder: "desc",
      }).then((res) => {
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
          }
        }
      });
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
          }
        });
      });
    },
    initMetroTree() {
      getMetroLineApi().then((res) => {
        if (res.success) {
          console.log(res, "----");
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
            console.log(this.lineTreeData, "this.lineTreeData");
          }
        }
      });
    },
    // 标签分类---工5个接口
    initTaskTree() {
      this.tasksTreeData = [];
      // 危化企业标签
      getVideoTaskDangerous()
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
            }
          } else {
          }
        })
        .catch((err) => {
          if (err) {
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
            }
          } else {
          }
        })
        .catch((err) => {
          if (err) {
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
    initData() {
   
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
  },
  created() {},
  mounted() {
    this.initData();
    this.getRemoteTreeList();
    this.initTaskTree();
    this.initMetroTree();
  },
};
</script>
<style lang='less' scoped>
.tree {
  padding: 20px;
  color: #fff !important;
      /deep/ span {
            color: white;
        
          }
  /deep/.ant-tree li .ant-tree-node-content-wrapper:hover {
    background-color: #054f71;
  }
  /deep/.ant-tree {
    font-size: 15px;
  }
  /deep/.ant-tree li .ant-tree-node-content-wrapper {
    color: #fff;
  }
}
</style>