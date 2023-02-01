<!--
 * @Description: 视频墙-视频播放器列表s
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-08 11:17:48
 * @LastEditTime: 2021-10-08 15:12:19
-->
<template>
  <div class="wall-video-play">
    <div class="video-play-all">
      <ul :class="[
          list.length > 3 ? 'ul-list' : '',
          list.length === 1 ? 'ul-list1' : '',
          list.length === 2 ? 'ul-list2' : '',
          list.length === 3 ? 'ul-list3' : '',
        ]">
        <li class="video-li" v-for="(i, k) in list" :key="k" :index="i.id">
          <video v-if="i.toLink && i.toLink === 'loadingEndSuccess' && i.playUrlMap" src="" :index="i.id" :class="`play-video-${i.id}`" controlslist="nodownload noremoteplayback" controls></video>
          <p class="video-name-text">{{ i.name }}</p>
          <p v-if="i.toLink === 'loadingEndError'" class="video-name-text" style="color: red; top: 45%">
            {{ "无法链接" }}
          </p>
          <p class="c-loading" v-if="i.toLink === 'loading' || !i.toLink"></p>
        </li>
      </ul>
    </div>
    <div class="video-play-pages">
      <ChangePage :total="total" :currentPage="currentPage" @changePages="changePages" :pageSize="6" />
    </div>
  </div>
</template>

<script>
import ChangePage from "@/components/APicture/changePage";
import {
  getGrounpOneVideoList,
  beginVideoStream,
  videoStreamActive,
  stopVideoStream,
} from "@/api/common";
import flvjs from "flv.js";
export default {
  components: { ChangePage },
  data() {
    return {
      parentDatas: {},
      list: [],
      total: 0,
      currentPage: 1,
      saveCanPlayerList: [],
      videoPlayerArr: [], // 播放得视频playerVideo
      timeOuts: null,
    };
  },
  created() { },
  mounted() {
    this.$on("show", (datas) => {
      if (this.videoPlayerArr.length) {
        this.cutVideoPlayerChange(); // 切断所有视频
        this.videoPlayerArr = [];
        this.doStopVideoStream(this.saveCanPlayerList);
      }
      this.parentDatas = datas;
      this.initDatas(datas);
    });
  },
  methods: {
    initDatas(datas) {
      this.list = [];
      this.total = 0;
      this.currentPage = 1;
      this.doGetGrounpOneVideoList({
        body: { sid: datas.sid },
        page: this.currentPage,
        pageSize: "6",
      });
    },
    // 分页
    changePages(pages) {
      if (this.videoPlayerArr.length) {
        this.cutVideoPlayerChange();
        this.doStopVideoStream(this.saveCanPlayerList);
      }
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
      if (this.timeOuts) {
        clearTimeout(this.timeOuts);
      }
      this.saveCanPlayerList = [];
      getGrounpOneVideoList({ ...obj }).then(async (res) => {
        if (res.success) {
          if (res.body && res.body.length) {
            // this.list = res.body;
            this.total = parseInt(res.total);
            let sendList = [];
            let saveMap = res.body.map((i, k) => {
              res.body[k].toLink = "loading";
              let { deviceId, id, name } = i;
              sendList.push({
                deviceId,
                id,
                name,
                toLink: "loading",
                // loadding-获取了列表，为获取flv，
                // loadingEndSuccess-获取flv完成并成功、
                // loadingEndError-获取flv完成并失败;
              });
            });
            let lastRun = await saveMap;
            console.log("sendList", sendList);
            this.list = res.body;
            this.getFLVPlayAddress(sendList, res.body);
          }
          console.log("点击分组视频列表", res);
        } else {
          this.$MyMessage.success("无相关视频墙！");
        }
      }).catch((err) => {
        if (err) {
          this.$MyMessage.error("获取分组下的视频列表，失败！");
        }
      });
    },
    // 获取flv 播放地址
    getFLVPlayAddress(arr, showList = []) {
      beginVideoStream(arr).then(async (res) => {
        if (res.success) {
          console.log("获取flv 播放地址", res);
          if (res.body && res.body.length) {
            let sendList = []; // 正确播放的列表-用于保活
            let saveMap = this.list.map((i, k) => {
              let currentObj = null;
              currentObj = res.body.find((fi, fk) => {
                if (fi.id === i.id) {
                  return fi;
                }
              });
              if (currentObj) {
                this.list[k]["playUrlMap"] = currentObj.playUrlMap;
                this.list[k]["success"] = currentObj.success;
                if (currentObj.success) {
                  sendList.push(this.list[k]);
                  this.list[k]["toLink"] = "loadingEndSuccess";
                } else {
                  this.list[k]["toLink"] = "loadingEndError";
                }
              }
            });
            let lastRun = await saveMap;
            this.list = JSON.parse(JSON.stringify(this.list));
            console.log("listssssssss", this.list, sendList.length);
            if (sendList.length) {
              this.saveCanPlayerList = sendList;
              // 播放是视频
              this.initPlayerVideos(sendList);
              // 处理获取正确的flv保活
              this.doVideoActiveList(sendList);
            } else {
              this.$MyMessage.error("无可播放地址");
            }
          }
        } else {
          this.$MyMessage.error("获取flv 播放地址，失败！");
        }
      }).catch((err) => {
        if (err) {
          this.$MyMessage.error("获取flv 播放地址，失败！");
        }
      });
    },
    // 初始化播放放器并播放
    initPlayerVideos(arr) {
      arr.forEach((i, k) => {
        let videoPlayerDom = document.getElementsByClassName(
          `play-video-${i.id}`
        )[0];
        let playerVideo = flvjs.createPlayer(
          {
            type: "flv",
            url: i.playUrlMap.FLV,
            isLive: true, //直播流
          },
          {
            cors: true,
            isLive: true,
            autoCleanupSourceBuffer: true, //自动清理缓存
          }
        );
        playerVideo.attachMediaElement(videoPlayerDom);
        playerVideo.load();
        playerVideo.play();
        this.videoPlayerArr.push(playerVideo);
      });
    },
    // 销毁断流
    cutVideoPlayerChange() {
      let counter = 0;
      this.videoPlayerArr.forEach((player) => {
        player.pause();

        player.unload();

        player.detachMediaElement();

        player.destroy();

        player = null;
        counter = counter + 1;
        if (counter === this.videoPlayerArr.length) {
          this.videoPlayerArr = [];
        }
      });
    },
    // 保活接口处理
    doVideoActiveList(arr) {
      videoStreamActive(arr)
        .then((res) => {
          if (res.success) {
            if (this.timeOuts) {
              clearTimeout(this.timeOuts);
            }
            this.timeOuts = setTimeout(() => {
              this.doVideoActiveList(arr);
            }, 10000);
          } else {
            this.$MyMessage.error(
              res.message + ",可能视频会中断，请刷新重试！"
            );
          }
        })
        .catch((error) => {
          if (error) {
            this.$MyMessage.error("可能视频会中断，请刷新重试！");
          }
        });
    },
    // 停止流播放
    doStopVideoStream(arr) {
      if (this.timeOuts) {
        clearTimeout(this.timeOuts);
      }
      if (this.saveCanPlayerList.lengt) {
        stopVideoStream(arr).then((res) => {
          if (res.success) {
            this.saveCanPlayerList = []
          }
        }).catch((err) => {
          this.$MyMessage.error("停止播放，失败！");
        });
      }
    },
    //  关闭此页-需要触发得事件
    doCloseThing() {
      if (this.timeOuts) {
        clearTimeout(this.timeOuts);
      }
      if (this.videoPlayerArr.length) {
        this.cutVideoPlayerChange();
        this.doStopVideoStream(this.saveCanPlayerList);
      }
    },
  },
  destroyed() {
    if (this.videoPlayerArr.length) {
      this.cutVideoPlayerChange();
      this.doStopVideoStream(this.saveCanPlayerList);
    }
    if (this.timeOuts) {
      clearTimeout(this.timeOuts);
    }
  },
};
</script>

<style lang="less" scoped>
@import '../common.less';
.wall-video-play {
  width: 600vw * @w;
  height: 600vh * @h;
  .video-play-all {
    width: 100%;
    height: calc(100% - 30vh * @h);
    ul {
      li {
        position: relative;
        .video-name-text {
          width: 100%;
          height: 34vh * @h;
          font-size: 24vh * @h;
          color: white;
          text-align: center;
          position: absolute;
          left: 0;
          top: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .ul-list {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      align-content: flex-start;

      .video-li {
        /*   min-width:48%;
              min-height:30%; */
        width: 48%;
        height: 30%;
        max-height: 97%;
        max-width: 98%;
        margin-bottom: 3%;
        margin-left: 1%;
        margin-right: 1%;
        background: black;
        //   background:yellow;
        box-shadow: 2px 2px 8px #5470c6;
        video {
          width: 100%;
          height: 100%;
        }
      }
    }
    .ul-list1 {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      align-content: center;
      .video-li {
        width: 100%;
        height: auto;
        max-height: 97%;
        max-width: 98%;
        margin-bottom: 3%;
        margin-left: 1%;
        margin-right: 1%;
        background: black;
        box-shadow: 2px 2px 8px #5470c6;
        //   background:yellow;

        video {
          width: 100%;
          height: 100%;
        }
      }
    }
    .ul-list2 {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      .video-li {
        width: 100%;
        height: 48%;
        margin-bottom: 3%;
        margin-left: 1%;
        margin-right: 1%;
        background: black;
        //   background:yellow;
        box-shadow: 2px 2px 8px #5470c6;
        video {
          width: 100%;
          height: 100%;
        }
      }
    }
    .ul-list3 {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      .video-li {
        width: 100%;
        height: 30%;
        margin-bottom: 3%;
        margin-left: 1%;
        margin-right: 1%;
        background: black;
        //   background:yellow;
        box-shadow: 2px 2px 8px #5470c6;
        video {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .video-play-pages {
    width: 100%;
    height: 30vh * @h;
  }
}
.c-loading {
  position: absolute;
  border-left: 2px solid #5470c6;
  border-right: 2px solid #54c2c6;
  border-bottom: 2px solid #722d6c;
  left: 50%;
  top: 50%;
  transform: translate(-50% 50%);
  animation: myload 1s linear infinite;
  width: 30vw * @w;
  height: 30vw * @w;
  .border-radisu(50%,50%);
}
@keyframes myload {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
