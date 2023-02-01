<!--
 * @Description: 拨打联系电话-弹窗
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: JiaJun Wu
 * @Date: 2021-08-15 13:44:15
 * @LastEditTime: 2021-10-16 10:25:05
-->
<template>
  <pop-up-layer
    v-show="show"
    :show="show"
    :setStyles="{}"
    @doClose="allCenterBtnClose"
    :opsition="opsition"
    :title="title"
    ref="VideoTreeList"
    class="video-tree-list"
  >
    <template slot="content">
      <div class="detail-content">
        <div class="calling-left">
          <div class="calling-icon">
            <p
              class="audio-icon"
              :style="contactTypeObj[contactObj.contactCode]"
            >
              <a-icon type="audio" />
            </p>
            <p
              class="audio-text"
              :style="contactTypeObj[contactObj.contactCode]"
            >
              {{ contactObj.contactText[contactObj.contactCode] }}
            </p>
            <p class="audio-text" v-show="contactObj.contactCode === 2">
              {{ callOnlineTime }}
            </p>
          </div>
          <div class="call-message">
            <p>名 称：{{ sendMessage.name }}</p>
            <p>电话号码：{{ sendMessage.phone }}</p>
          </div>
          <div class="calling-btn-wrap">
            <!-- <p class="green_btn">拨打</p> -->
            <p @click="cutAndClose" class="red_btn">挂断</p>
            <p @click="cutAndClose" class="red_btn">挂断关闭</p>
          </div>
          <div class="calling-btn-wrap">
            <p class="green_btn" @lick="reClalling">重新拨打</p>
          </div>
        </div>
        <div class="contact-list-wrap"></div>
      </div>
    </template>
  </pop-up-layer>
</template>
<script>
import { toCallBegin, checkCallStatus, cutCall } from "@/api/common";
export default {
  data() {
    return {
      show: false,
      title: "通话中",
      opsition: "btnRight",
      parentData: {},
      treeData: [
        {
          title: "广州市",
          key: "440100000000",
          en: "440100000000",
          sn: "440100000000",
        },
      ],
      sendMessage: {
        name: "",
        phone: "",
      },
      contactObj: {
        contactCode: 0, // 0-通话前 1-正在拨打 2-通话中 3-通话结束 4-链接失败
        contactText: {
          0: "通话前",
          1: "正在拨打...",
          2: "已接通",
          3: "通话结束",
          4: "链接失败",
        },
      },
      contactTypeObj: {
        0: { color: "white" },
        1: { color: "#00ffff" },
        2: { color: "#00ff14" },
        3: { color: "white" },
        4: { color: "#ff0000" },
      },
      callResponeObj: {
        contactGroupId: null,
        conferenceNumber: null,
      },
      beginTIme: null,
      callOnlineTime: 0,
      saveTimeOut: null,
      saveTimeoutStatus: null,
    };
  },
  mounted() {
    this.$on("show", (data) => {
      this.show = !this.show;
      if (this.show) {
        if (data.opsition) {
          this.opsition = data.opsition;
        }
        this.initData();
        this.parentData = data;
        this.$refs.VideoTreeList.saveEvent = data.saveEvent;
        let { name, phone } = data;
        this.sendMessage = { name, phone };
        let testPhone = [data.phone,'13822256344'];
        this.toCall(testPhone);
      }
    });
  },
  methods: {
    initData() {
      this.parentData = {};
      this.sendMessage = {
        name: "",
        phone: "",
      };
      this.callResponeObj = {
        contactGroupId: null,
        conferenceNumber: null,
      };
      this.treeData = [
        {
          title: "广州市",
          key: "440100000000",
          en: "440100000000",
          sn: "440100000000",
        },
      ];
      // 设置初始化时间
      this.callOnlineTime = 0;
      // this.initLinkTime();
    },
    allCenterBtnClose() {
      if (this.saveTimeOut) {
        clearTimeout(this.saveTimeOut);
      }
      if (this.saveTimeoutStatus) {
        clearTimeout(this.saveTimeoutStatus);
      }
      this.show = false;
      this.$refs.VideoTreeList.saveEvent = null;
    },
    initLinkTime() {
      if (this.saveTimeOut) {
        clearTimeout(this.saveTimeOut);
      }
      this.beginTIme = new Date().getTime();
      this.saveTimeOut = setTimeout(() => {
        this.callOnlineTime = this.callOnlineTime + 1;
        clearTimeout(this.saveTimeOut);
        this.initLinkTime();
      }, 1000);
    },
    // 关闭并挂断
    cutAndClose() {
      // this.$refs.VideoTreeList.saveEvent = null;
      // this.allCenterBtnClose();
      this.doCutCall();
    },
    // 拨打电话
    toCall(phoneList = []) {
      console.log(phoneList);
      if (phoneList.length === 0) {
        return false;
      }
      this.contactObj.contactCode = 1;
      let arr = phoneList;
      toCallBegin({ body: { phoneList: arr } })
        .then((res) => {
          if (res.success) {
            this.contactObj.contactCode = 1;
            this.callResponeObj = res.body;
            // this.callResponeObj.phoneList = [this.sendMessage.phone];
            console.log("拨打电话成功", res);
            this.getCallStatus(this.callResponeObj);
          } else {
            this.contactObj.contactCode = 4;
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          if (err) {
            this.contactObj.contactCode = 4;
            this.$message.error("链接失败！");
          }
        });
    },
    statusTimeOut() {
      if (this.saveTimeoutStatus) {
        clearTimeout(this.saveTimeoutStatus);
        this.saveTimeoutStatus = setTimeout(() => {
          this.getCallStatus(this.callResponeObj);
          clearTimeout(this.saveTimeoutStatus);
        }, 3000);
      } else {
        this.saveTimeoutStatus = setTimeout(() => {
          this.getCallStatus(this.callResponeObj);
        }, 3000);
      }
    },
    // 查询电话状态
    getCallStatus(obj) {
      let { conferenceNumber } = obj;
      let sendObj = {
        body: {
          conferenceNumber,
        },
      };

      checkCallStatus(sendObj).then((res) => {
        if (res.success) {
          if (res.body && res.body.length) {
            let styleObj = {
              0: "未接通",
              1: "振铃中",
              2: "已接通",
            };
            /* contactCode: 0, // 0-通话前 1-正在拨打 2-已接通 3-通话结束 4-链接失败 */
            /*  contactText: {
                0: "通话前",
                1: "正在拨打...",
                2: "通话中",
                3: "通话结束",
                4: "链接失败",
              }, */
            console.log(
              "currentObj",
              this.sendMessage.phone,
              res.body[0].phoneNumber
            );
            let currentObj = res.body.find((i, k) => {
              if (i.phoneNumber === this.sendMessage.phone + "") {
                return i;
              }
            });
            console.log("currentObj", currentObj);
            try {
              this.contactObj.contactCode = JSON.parse(
                JSON.stringify(currentObj.online)
              );
            } catch (err) {
              // console.log(0000)
            }
            if (currentObj.online === 2) {
              this.initLinkTime(currentObj);
            }
            this.statusTimeOut();
          } else {
            this.doCutCall();
          }
        } else {
          this.statusTimeOut();
        }
      });
    },
    //  挂断电话
    doCutCall(obj = null) {
      if (!obj) {
        obj = this.callResponeObj;
      }
      let sendObj = { body: { ...obj } };
      cutCall(sendObj)
        .then((res) => {
          if (res.success) {
            this.allCenterBtnClose();
          } else {
            this.$message.error(res.messsage);
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("关闭失败");
          }
        });
    },
    // 重新拨打
    reClalling() {
      this.toCall(this.sendMessage.phone);
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
