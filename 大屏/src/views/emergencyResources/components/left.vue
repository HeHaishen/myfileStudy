<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:28:13
 * @LastEditTime: 2021-10-08 15:25:44
-->
<template>
  <div class="emergency-resources-left">
    <div class="left-left">
      <div class="left-left-search" v-if="false">
        <select placeholder="底图切换" class="c-select" v-model="picSelect">
          <option v-for="(i, k) in picSlectList" :key="i.key">
            {{ i.name }}
          </option>
        </select>
        <p>
          <input placeholder="请输入：设备名、风险点、报警、隐患名称" class="c-input" type="text" />
          <img src="../../../assets/images/emergencyOverview/icon_search.png" alt="" />
        </p>
      </div>
      <div class="left-left-content">
        <div class="model-title">应急资源</div>
        <ul class="left-content-list">
          <li v-for="(i, k) in resourceList" :key="k">
            <div class="chose-li-title">
              <span @click="resourceClick(i, k)" :class="{ active_span: i.checked ? true : false }">{{ i.checked ? "✔" : "" }}</span><label>{{ i.name }}</label>
            </div>
            <ul class="chose-li-list">
              <li v-for="(item, key) in i.list" :key="key">
                <span @click="resourceClick(item, key, i)" :class="{ active_span: item.checked ? true : false }">{{ item.checked ? "✔" : "" }}</span>
                <img :src="item.icon" alt="" />
                <p>{{ item.name }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="left-right">
      <div class="left-right-search" v-if="false">
        <select class="c-select" v-model="areaSlect">
          <option v-for="(i, k) in areaSelectList" :key="i.key">
            {{ i.name }}
          </option>
        </select>
        <p>
          <input class="c-input" placeholder="请输入：道路、网格或编号" type="text" />
          <img src="../../../assets/images/emergencyOverview/icon_search.png" alt="" />
        </p>
      </div>
      <div class="left-right-content">
        <div class="model-title">监控资源</div>
        <div class="right-content-list">
          <div class="content-list-left" v-if="false">
            <a-tree :load-data="onLoadData" :tree-data="treeData" :replaceFields="replaceTreeFields" v-model="checkedKeys" @check="doCheck" :checkable="false" @select="selectVideo" />
          </div>
          <div class="content-list-right" style="width: 100%">
            <div class="content-list-title" v-if="false">监控信息</div>
            <div class="center-search">
              <input class="c-input" placeholder="输入关键字" type="text" v-model="query.videoName" />
              <img src="../../../assets/images/emergencyOverview/icon_search.png" alt="" @click="videoSearch" />
            </div>
            <ul class="video-list">
              <li v-for="(item, index) in videoList" :key="index">
                <video class="videoElement" ref="videoElement" controlslist="nodownload noremoteplayback" disablePictureInPicture controls autoplay muted></video>
                <p>{{ item.name }}</p>
                <span v-if='item.status=="OFF"' style="color:red" class="status">设备离线!</span>
                <!-- <iframe :src="item.playUrl" frameborder="0"></iframe> -->
                <!-- <a-icon v-if="!videoIng.includes(item.playUrlNew)" @click="videoClick(item, index)" type="play-circle" class="icon-video" /> -->
                <!-- <img :src="`http://10.194.92.110:10000/api/v1/device/channelsnap?serial=${item.deviceId}&code=${item.id}`" alt=""> -->
              </li>
            </ul>
            <div class="list-change-page">
              <ChangePage :total="pagination.total" :currentPage="pagination.current" @changePages="pagesChange" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center-fixed-icon" style="width: auto; display: flex">
      <div class="btn-video" @click="videoTreeClick($event)">
        <img src="../../../assets/images/theCityThreeProofing/icon_video.png" alt="" />
      </div>
    </div>

    <VideoTree ref="VideoTree"></VideoTree>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import moment from "moment";
import ChangePage from "@/components/APicture/changePage";
import flvjs from "flv.js";

import VideoTree from "@/components/APicture/videoTree/index.vue";
import { getArrTreeList, getArrTreeChildrenList } from "@/api/common";
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
import {
  commonApi,
  getVideoListApi,
  getViedeo,
  startVideo,
  keepVideoLife,
  stopVideoLife
} from "@/api/emergencyResources";
import request from "@/request/request.js";

export default {
  components: {
    VideoTree,
    ContactPhone,
    MessageSend,
    ChangePage,
  },
  data() {
    return {
      picSelect: null,
      picSlectList: [{ name: "地图切换", key: 1 }],
      areaSlect: null,
      defaultParams: {
        body: {},
        page: -1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      },
      areaSelectList: [
        { name: "天河区", key: 1 },
        { name: "白云区", key: 2 },
        { name: "荔湾区", key: 3 },
        { name: "越秀区", key: 4 },
        { name: "番禺区", key: 5 },
        { name: "海珠区", key: 6 },
        { name: "黄埔区", key: 7 },
        { name: "增城区", key: 8 },
        { name: "南沙区", key: 9 },
        { name: "从化区", key: 10 },
        { name: "花都区", key: 11 },
      ],
      imgUrl: {
        icon_1: require("../../../assets/images/emergencyResources/icon_1.png"),
        icon_2: require("../../../assets/images/emergencyResources/icon_2.png"),
        icon_3: require("../../../assets/images/emergencyResources/icon_3.png"),
        icon_4: require("../../../assets/images/emergencyResources/icon_4.png"),
        icon_5: require("../../../assets/images/emergencyResources/icon_5.png"),
        icon_6: require("../../../assets/images/emergencyResources/icon_6.png"),
        icon_7: require("../../../assets/images/emergencyResources/icon_7.png"),
        icon_8: require("../../../assets/images/emergencyResources/icon_8.png"),
        icon_9: require("../../../assets/images/emergencyResources/icon_9.png"),
        icon_10: require("../../../assets/images/emergencyResources/icon_10.png"),
        icon_11: require("../../../assets/images/emergencyResources/icon_11.png"),
        icon_12: require("../../../assets/images/emergencyResources/icon_12.png"),
        icon_13: require("../../../assets/images/emergencyResources/icon_13.png"),
        icon_14: require("../../../assets/images/emergencyResources/icon_14.png"),
      },
      // 分页
      pagination: {
        total: 0,
        current: 1,
      },
      // resourceList: [
      //   {
      //     name: "基础设施",
      //     type: "1",
      //     checked: false,
      //     list: [
      //       {
      //         name: "指挥中心",
      //         icon: require("../../../assets/images/emergencyResources/icon_1.png"),
      //         checked: false,
      //       },
      //       {
      //         name: "指挥中心分会场",
      //         icon: require("../../../assets/images/emergencyResources/icon_2.png"),
      //         checked: false,
      //       },
      //       {
      //         name: "应急避难场所",
      //         icon: require("../../../assets/images/emergencyResources/icon_3.png"),
      //         checked: false,
      //       },
      //     ],
      //   },
      //   {
      //     name: "应急队伍",
      //     type: "2",
      //     checked: false,
      //     list: [
      //       {
      //         name: "专业救援力量",
      //         icon: require("../../../assets/images/emergencyResources/icon_4.png"),
      //         checked: false,
      //       },
      //       {
      //         name: "社会救援力量",
      //         icon: require("../../../assets/images/emergencyResources/icon_5.png"),
      //         checked: false,
      //       },
      //       {
      //         name: "社会救援力量1",
      //         icon: require("../../../assets/images/emergencyResources/icon_3.png"),
      //         checked: false,
      //       },
      //     ],
      //   },
      //   {
      //     name: "资源仓库",
      //     type: "3",
      //     checked: false,
      //     list: [
      //       {
      //         name: "应急仓库1",
      //         icon: require("../../../assets/images/emergencyResources/icon_6.png"),
      //         checked: false,
      //       },
      //       {
      //         name: "应急仓库2",
      //         icon: require("../../../assets/images/emergencyResources/icon_5.png"),
      //         checked: false,
      //       },
      //       {
      //         name: "社会救援力量1",
      //         icon: require("../../../assets/images/emergencyResources/icon_3.png"),
      //         checked: false,
      //       },
      //     ],
      //   },
      //   {
      //     name: "危险源",
      //     type: "4",
      //     checked: false,
      //     list: [
      //       {
      //         name: "生产",
      //         icon: require("../../../assets/images/emergencyResources/icon_7.png"),
      //         checked: false,
      //       },
      //       {
      //         name: "经营",
      //         icon: require("../../../assets/images/emergencyResources/icon_8.png"),
      //         checked: false,
      //       },
      //       {
      //         name: "使用",
      //         icon: require("../../../assets/images/emergencyResources/icon_9.png"),
      //         checked: false,
      //       },
      //       {
      //         name: "管道企业",
      //         icon: require("../../../assets/images/emergencyResources/icon_10.png"),
      //         checked: false,
      //       },
      //       {
      //         name: "运输",
      //         icon: require("../../../assets/images/emergencyResources/icon_11.png"),
      //         checked: false,
      //       },
      //       {
      //         name: "涉氯",
      //         icon: require("../../../assets/images/emergencyResources/icon_12.png"),
      //         checked: false,
      //       },
      //       {
      //         name: "涉氯",
      //         icon: require("../../../assets/images/emergencyResources/icon_13.png"),
      //         checked: false,
      //       },
      //       {
      //         name: "其他",
      //         icon: require("../../../assets/images/emergencyResources/icon_14.png"),
      //         checked: false,
      //       },
      //     ],
      //   },
      // ],
      resourceList: [],
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
      videoActive: null,
      videoList: [],
      query: {
        videoName: null,
      },
      playerObjs: {
        show: false,
        title: "",

        searchForm: null,
        headerList: [],
        centerList: [],
      },
      videoIng: [], //正在播放的视频下标
      flvPlayer: null,
      flvPlayerIng: [], //正在播放的视频
      timer: null,
      liveVideo: [],//在线的视频
    };
  },
  created() {
    this.init();
  },
  mounted() {
    window.clickTeamMessage = this.clickTeamMessage;
    window.clickTeamPhone = this.clickTeamPhone;
    this.$nextTick(() => {
      this.initChart();
    });
  },
  computed: {},
  beforeDestroy() {
    //清除定时器
    clearTimeout(this.timer)
    //停止流
    this.getStopVideo()

  },
  methods: {
    moment,
    init() {
      this.getResourceList();
      // this.getRemoteTreeList()
      this.getVideoList();
    },

    //定时保活
    videoTime() {
      //直播保活
      if (this.liveVideo != null && this.liveVideo.length) {
        this.getKeepVideo(this.liveVideo)
      }
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.videoTime()
        }, 10000)
      } else {
        this.timer = setTimeout(() => {
          this.videoTime()
        }, 10000)
      }

    },

    initChart() { },
    // 打电话
    clickTeamPhone(vValue) {
      let { name, phone, event } = vValue;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: event,
        opsition: "btnLeft",
        name,
        phone,
      });
    },
    // 发短信
    clickTeamMessage(vValue) {
      let { name, phone, event } = vValue;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: event,
        opsition: "btnLeft",
        name,
        phone,
      });
    },
    //应急资源点击
    resourceClick(i, k, list = null) {
      let that = this;
      i.checked = !i.checked;

      // this.resourceList = JSON.parse(JSON.stringify(this.resourceList));
      if (i.list && i.list.length) {
        if (i.checked) {
          i.list.map((item, key) => {
            item.checked = true;
            that.getSidebarDetail(item);
          });
        } else {
          i.list.map((item, key) => {
            item.checked = false;
            pGzznCore.addPromiseHazardousQYRemove(item.dictValue);
          });
        }
      } else {
        if (list) {
          if (i.checked) {
            let arr = [];
            arr = list.list.filter((item, key) => {
              if (item.checked) {
                return item;
              }
            });
            arr.length === list.list.length ? (list.checked = true) : "";
            if (arr.length > 0) {
              that.getSidebarDetail(arr[0]);
            }
          } else {
            list.checked = false;
            pGzznCore.addPromiseHazardousQYRemove(i.dictValue);
          }
        }
      }
    },
    //获取侧边栏二级数据项的具体详情
    getSidebarDetail(item) {
      let code = item.interfaceCode;
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body = item.condition ? JSON.parse(item.condition) : {};
      commonApi(params, code).then((res) => {
        if (res.success) {
          pGzznCore.addPromiseHazardousQY(res, item.dictValue, 5);
        } else {
          console.error(res.message);
        }
      });
    },

    //获取应急资源
    getResourceList() {
      let code = "9GO8HDzz";
      let data = {
        body: {
          dictName: "EMERGENCY_RESOURCES",
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      commonApi(data, code).then((res) => {
        if (res.success) {
          console.log("获取应急资源", res);
          this.resourceList = this.treeInit(res.body.data);
        }
      });
    },
    // 获取监控
    getVideoList() {
      let send = {
        body: {
          name: this.query.videoName,
        },
        page: this.pagination.current,
        pageSize: 4,
        sortName: "sid",
        sortOrder: "desc",
      };
      // return new Promise((reslove, reject) => {
      getVideoListApi(send).then((res) => {
        if (res.success) {
          // this.videoList = []
          if (res.body != null) {
            this.videoList = JSON.parse(JSON.stringify(res.body));
            if (this.videoList.length) {
              let startArr = this.videoList.map(e => {
                return { deviceId: e.deviceId, id: e.id, playUrlMap: {} }
              })
              // console.log(startArr);
              //开始直播
              this.getStartVideo(startArr)
            }
            this.pagination.total = +res.total;
          } else {
            this.videoList = [];
          }

          // reslove(res);
        }
      }).catch((err) => {
        if (err) {
          this.$MyMessage.error("获取视频列表失败！");
        }
      });
    },

    //开始直播
    getStartVideo(item) {
      startVideo(item).then(async (res) => {
        if (res.success) {
          let saveArr = null
          let arr = res.body.map((e, i) => {
            if (e.success) {
              this.liveVideo.push({ deviceId: e.deviceId, id: e.id })
              this.beginPlayer(i, e.playUrlMap.FLV);
            }

          })
          saveArr = await arr

          //开始定时直播保活
          if (this.liveVideo != null && this.liveVideo.length) {
            this.videoTime()
          }
        }
      }).catch((err) => {
        if (err) {
          // this.$MyMessage.error("获取视频列表失败！");
          console.log('开始直播失败');
        }
      })
    },

    //直播保活
    getKeepVideo(item) {
      keepVideoLife(item).then(res => {
        if (res.success) {
          console.log('监控视频保活');
        }
      }).catch((err) => {
        if (err) {
          // this.$MyMessage.error("获取视频列表失败！");
          console.log('直播保活失败');
        }
      })
    },

    //直播流停止
    getStopVideo(items) {
      stopVideoLife(item).then(res => {
        if (res.success) {
          console.log('监控视频停流');
        }
      }).catch((err) => {
        if (err) {
          // this.$MyMessage.error("获取视频列表失败！");
          console.log('直播流停止失败');
        }
      })
    },
    // 视频搜索
    videoSearch() {
      this.pagination.current = 1;
      // 停止定时器
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // 停止保活
      if (this.liveVideo != null && this.liveVideo.length) {
        this.getStopVideo(this.liveVideo)
      }
      this.cutViedo()
      //查询视频
      this.getVideoList()
    },
    pagesChange(pages, current) {
      this.pagination.current = +pages.pages;
      //停止定时器
      if (this.timer) {
        clearTimeout(this.timer)
      }
      //停流
      if (this.liveVideo != null && this.liveVideo.length) {
        this.getStopVideo(this.liveVideo)
      }
      this.cutViedo()
      this.videoIng = []
      this.getVideoList()

    },
    // 销毁断流
    cutViedo() {
      let counter = 0;

      if (this.flvPlayer) {
        this.flvPlayerIng.forEach((e) => {
          e.pause();
          e.unload();
          e.detachMediaElement();
          e.destroy();
          e = null;
          counter = counter + 1;
        });
      }
      if (counter === this.flvPlayerIng.length) {
        this.flvPlayerIng = [];
      }
    },
    // 点击出现视频树
    videoTreeClick($event) {
      console.log($event.offsetLeft);
      this.$refs.VideoTree.$emit("show", { saveEvent: $event });
    },
    // 区域树
    doCheck(checkedKeys, e) {
      console.log(checkedKeys, e, this.checkedKeys);
    },
    // 组装树控件
    treeInit(datas) {
      const node = datas.filter((e) => e.parentId == "-1");
      const childrenList = datas.filter((e) => e.parentId != "-1");
      let thas = this;
      const setTree = function (node, childrenList) {
        if (childrenList.length > 0) {
          return node.map((v) => {
            const children = childrenList.filter((e) => e.parentId == v.sid);
            const filterChildrenList = childrenList.filter(
              (e) => e.parentId != v.sid
            );
            // `require(../../../assets/images/emergencyResources/${v.icon})`,
            return {
              ...v,
              key: v.sid ? v.sid : v.key,
              isLeaf: v.isLeaf == 1,
              list: setTree(children, filterChildrenList),
              checked: false,
              icon: thas.imgUrl[v.icon],
              name: v.dictValue,
            };
          });
        } else {
          return node.map((v) => {
            return {
              ...v,
              key: v.sid ? v.sid : v.key,
              isLeaf: v.isLeaf == 1,
              list: [],
              checked: false,
              name: v.dictValue,
            };
          });
        }
      };
      const treeNode = setTree(node, childrenList);

      return treeNode;
      // this.treeData = [
      //   {
      //     name: this.title,
      //     key: '-1',
      //     sid: '-1',
      //     children: treeNode,
      //     scopedSlots: { title: 'custom' },
      //     isLeaf: false,
      //     parentId: -1,
      //     isOrg: 1,
      //     selectable: true,
      //   },
      // ]

      // this.expandedKeys = ['-1'].concat(
      //   node.map((e) => {
      //     return e.sid
      //   })
      // )
    },
    // selectVideo(data, item) {
    //   if (item.node.dataRef.isLeaf) return
    //   this.getVideoList({
    //     areaCode: data[0],
    //   })
    // },


    // getRemoteTreeList() {
    //   getArrTreeList({
    //     body: { parentId: "440100000000" },
    //     pageSize: 100,
    //     sortName: "sid",
    //     sortOrder: "desc",
    //   }).then((res) => {
    //     console.log("获取视频树", res);
    //     if (res.success) {
    //       if (res.body && res.body.length) {
    //         res.body.map((i, k) => {

    //           i.isLeaf = false;
    //         });
    //         this.treeData = JSON.parse(
    //           JSON.stringify([
    //             {
    //               name: "广州市",
    //               key: "440100000000",
    //               en: "440100000000",
    //               sn: "440100000000",
    //               children: res.body,
    //               isLeaf: false
    //             },
    //           ])
    //         );
    //       }
    //     }
    //   });
    // },
    // 加载监控资源树
    // onLoadData(treeNode) {
    //   console.log(1);
    //   console.log(treeNode);

    //   return new Promise((resolve) => {
    //     if (treeNode.dataRef.types && treeNode.dataRef.types >= 0) {
    //       let sendData = {
    //         codes: treeNode.dataRef.sn,
    //         send: {},
    //       };
    //       // getArrTreeChildrenList(sendData).then((res) => {
    //       //   if (res.success) {
    //       //     if (res.body && res.body.length) {
    //       //       treeNode.dataRef.children = res.body;
    //       //       this.treeData = [...this.treeData];
    //       //       resolve();
    //       //     } else {
    //       //       resolve();
    //       //     }
    //       //   }
    //       // });
    //       getArrTreeChildrenList(sendData).then((res) => {
    //         if (res.success) {

    //           this.getVideoList({
    //             areaCode: treeNode.dataRef.sn,
    //           }).then((Vres) => {
    //             console.log(Vres, 'Vres');

    //             if (
    //               res.body &&
    //               res.body.length &&
    //               Vres.body &&
    //               Vres.body.length
    //             ) {
    //               Vres.body.map((i, k) => {
    //                 i.title = i.name;
    //                 i.sn = i.id;
    //                 i.isLeaf = true;
    //               });
    //               console.log(Vres.body, "区域树视频");
    //               treeNode.dataRef.children = [...res.body, ...Vres.body];
    //               this.treeData = [...this.treeData];
    //               resolve();
    //             } else if (res.body && res.body.length) {
    //               res.body.map((i, k) => {
    //                 i.isLeaf = false;
    //               });
    //               console.log(res.body, 'res.body');

    //               treeNode.dataRef.children = res.body;
    //               this.treeData = [...this.treeData];

    //               resolve();
    //             } else if (Vres.body && Vres.body.length) {
    //               Vres.body.map((i, k) => {
    //                 i.title = i.name;
    //                 i.sn = i.id;
    //                 i.isLeaf = true;
    //               });
    //               console.log(Vres.body, "区域树视频");
    //               treeNode.dataRef.children = [...Vres.body];
    //               this.treeData = [...this.treeData];
    //             }
    //           });
    //           /* if (res.body && res.body.length) {
    //             treeNode.dataRef.children = res.body;
    //             this.treeData = [...this.treeData];

    //             resolve();
    //           } else {
    //             resolve();
    //           } */
    //         }
    //       });
    //     } else {
    //       resolve();
    //       return;
    //     }
    //   });
    // },
    // 获取摄像头
    // getVideoList(obj, pageSize = 1000, current = 1) {
    //   let send = {
    //     body: { ...obj },
    //     page: current,
    //     pageSize: pageSize,
    //     sortName: "sid",
    //     sortOrder: "desc",
    //   };
    //   return new Promise((reslove, reject) => {
    //     getVideoListApi(send).then((res) => {
    //       if (res.success) {

    //         console.log(res, '111111');
    //         this.videoList = res.body
    //         reslove(res);
    //       }
    //     });
    //   });
    // },
    // //查询视频
    // doQuery(url) {
    //   // let flvUrl = 'http://1011.hlsplay.aodianyun.com/demo/game.flv'
    //   // this.beginPlayer(this.videoActive, flvUrl)
    //   // return
    //   getViedeo(url).then((res) => {
    //     if (typeof res == "string") {
    //       this.$message.warn("该设备为离线状态");
    //       return;
    //     }
    //     this.beginPlayer(this.videoActive, res.FLV);
    //     // this.beginPlayer(this.videoActive, flvUrl)
    //   });
    // },
    //  点击视频
    // videoClick(i, k) {

    //   this.videoActive = k;
    //   if (i.playUrlMap != null) {
    //     this.beginPlayer(this.videoActive, i.playUrlMap.FLV)
    //     this.videoIng.push(i.playUrlNew)
    //   } else {
    //     this.$message.warn('该设备为离线状态')
    //   }
    //   // this.doQuery(i.playUrlNew)
    // },

    beginPlayer(i, url) {
      if (flvjs.isSupported()) {

        const videoElement = document.getElementsByClassName('videoElement')[i]
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          hasAudio: true,
          url: url,

        });
        this.flvPlayerIng.push(this.flvPlayer)
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        this.flvPlayer.play();
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
