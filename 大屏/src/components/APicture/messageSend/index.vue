<!--
 * @Description: 发送信息-弹窗
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-08-15 13:44:15
 * @LastEditTime: 2021-08-16 15:26:05
-->
<template>
  <pop-up-layer
    v-show="show"
    :show="show"
    :setStyles="{}"
    @doClose="allCenterBtnClose"
    :opsition="opsition"
    :title="title"
    ref="SendMessage"
    class="send-message"
  >
    <template slot="content">
      <div class="detail-content">
        <ul class="list">
          <li>
            <label for="">联系人：</label><span>{{ sendForm.name }}</span>
          </li>
          <li>
            <label for="">电话：</label><span>{{ sendForm.phone }}</span>
          </li>
          <li>
            <label for="">信息内容：</label
            ><span>
              <a-textarea
                v-model.trim="sendForm.contents"
                :maxLength="500"
                class="c-big-areatext"
                name=""
                id=""
                cols="30"
                rows="10"
              ></a-textarea>
            </span>
          </li>
        </ul>
        <div
          v-if="sendMessageType.typeCode"
          class="send-msg-type"
          :style="sendTypeStyleObj[sendMessageType.typeCode]"
        >
          {{ sendMessageType["typeMsg"][sendMessageType.typeCode] }}
        </div>
        <div class="send-message-btn">
          <p @click="doSendMsg" v-if="sendMessageType.typeCode !== 1">
            发送信息
          </p>
          <p @click="doCloseWin">关闭</p>
        </div>
      </div>
    </template>
  </pop-up-layer>
</template>
<script>
import { sendMessageApi } from "@/api/common";
export default {
  data() {
    return {
      show: false,
      opsition: "btnRight",
      title: "发送信息",
      sendMessageType: {
        typeCode: 0, // 0-初始状态，1-发送中，2-发送成功，3-发送失败
        typeMsg: {
          0: "初始状态",
          1: "发送中...",
          2: "发送成功！",
          3: "发送失败！",
        },
      },
      sendTypeStyleObj: {
        1: { color: "#00ffff" },
        2: { color: "#67c23a" },
        3: { color: "#f5222d" },
      },
      parentData: {},
      sendForm: {
        name: "",
        contents: null,
        phone: null,
      },
    };
  },
  mounted() {
    this.$on("show", (data) => {
      this.show = !this.show;
      if (this.show) {
        this.initData(data);
        this.parentData = data;
        this.$refs.SendMessage.saveEvent = data.saveEvent;
        if (data.opsition) {
          this.opsition = data.opsition;
        }
      }
    });
  },
  methods: {
    initData(data) {
      this.parentData = {};
      this.sendForm = {
        name: "",
        contents: null,
        phone: null,
      };
      this.sendMessageType.typeCode = 0;
      if (data) {
        this.sendForm.name = data.name;
        this.sendForm.contents = data.contents;
        this.sendForm.phone = data.phone;
      }
    },
    allCenterBtnClose() {
      // if (this.sendMessageType.typeCode !== 1) {
        this.show = false;
        this.$refs.SendMessage.saveEvent = null;
      // }
    },
    doSendMsg() {
      this.sendMessageType.typeCode = 1;
      sendMessageApi({
        send: {
          tels: [this.sendForm.phone],
          contents: this.sendForm.contents,
        },
      })
        .then((res) => {
          if (res.success) {
            this.sendMessageType.typeCode = 2;
          } else {
            this.sendMessageType.typeCode = 3;
          }
        })
        .catch((err) => {
          if (err) {
            this.sendMessageType.typeCode = 3;
          }
        });
    },
    doCloseWin() {
      this.allCenterBtnClose()
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
