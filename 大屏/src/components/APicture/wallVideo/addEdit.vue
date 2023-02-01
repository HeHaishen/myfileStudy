<!--
 * @Description: 新增编辑模块
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-13 09:38:45
 * @LastEditTime: 2021-09-13 18:08:22
-->
<template>
  <div class="c-edit-add">
    <div class="edit-add-title">
      <p class="text-title">{{ title }}</p>
    </div>
    <ul class="edit-add-form">
      <li class="c-form-line">
        <div class="c-line-left"><label for="">分组名称:</label></div>
        <div class="c-line-right">
          <input type="text" v-model.trim="sendForm.groupName" />
        </div>
      </li>
    </ul>
    <div class="edit-add-btns">
      <p class="c-click-btn" @click="doSave">保存</p>
      <p class="c-click-btn" @click="doCancel">取消</p>
    </div>
    <div class="layer-close">
      <p @click="doClose">X</p>
    </div>
  </div>
</template>

<script>
import { useIdGetGrounpDetail, addEditVideoGrounpMsg } from "@/api/common";
export default {
  data() {
    return {
      parentDatas: {},
      pageType: "add", // add-新增，edit-编辑
      title: "新增视频分组",
      sendForm: {
        groupName: null,
      },
    };
  },
  mounted() {
    this.$on("show", (data) => {
      this.parentDatas = data;
      this.pageType = data.pageType ? data.pageType : "add";
      if (data.pageType === "add") {
        this.title = "新增分组";
        this.initData();
      } else if (data.pageType === "edit") {
        this.title = `编辑-${data.groupName}-分组`;
        this.initData();
        this.getGrounpDetail({ sid: data.sid });
      }
    });
  },
  methods: {
    initData() {
      for (let key in this.sendForm) {
        this.sendForm[key] = null;
      }
    },
    // 获取详情
    getGrounpDetail(obj) {
      useIdGetGrounpDetail({ sid: obj.sid }).then((res) => {
        if (res.success) {
          this.sendForm.groupName = res.body.groupName;
        }
      });
    },
    addSaveSend() {
      addEditVideoGrounpMsg({
        groupName: this.sendForm.groupName,
        wallLimit: 9999,
        pid: "-1",
      })
        .then((res) => {
          if (res.success) {
            this.$MyMessage.success("新增成功！");
            this.$emit("doSave");
          } else {
            this.$MyMessage.error("保存失败，请稍后重试！");
          }
        })
        .catch((error) => {
          if (error) {
            this.$MyMessage.error("保存失败，请稍后重试！");
          }
        });
    },
    editSaveSend() {
      addEditVideoGrounpMsg({
        groupName: this.sendForm.groupName,
        sid: this.parentDatas.sid,
        wallLimit: 9999,
        pid: this.parentDatas.pid ? this.parentDatas.pid : "-1",
      })
        .then((res) => {
          if (res.success) {
            this.$MyMessage.success("编辑成功！");
            this.$emit("doSave");
          } else {
            this.$MyMessage.error("保存失败，请稍后重试！");
          }
        })
        .catch((error) => {
          if (error) {
            this.$MyMessage.error("保存失败，请稍后重试！");
          }
        });
    },
    doClose() {
      this.$emit("doClose");
    },
    doSave() {
      if (this.pageType === "add") {
        this.addSaveSend();
      } else {
        this.editSaveSend();
      }
    },
    doCancel() {
      this.$emit("doCancel");
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common.less";
.c-edit-add {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 6vh * @h 8vw * @w;
  .box-sizing();
  .edit-add-title {
    width: 100%;
    height: 34vh * @h;
    .text-title {
      width: 100%;
      height: 100%;
      color: white;
      font-size: 24vh * @h;
      padding-left: 8vw * @w;
      .box-sizing();
    }
  }
  .edit-add-form {
    width: 100%;
    height: calc(100% - 64vh * @h);
    .c-form-line {
      width: 100%;
      min-height: 34vh * @h;
      height: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 6vh * @h 0;
      .box-sizing();
      .c-line-left {
        flex-shrink: 0;
        min-height: 18vh * @h;
        width: 30%;
        margin-right: 2%;
        label {
          display: block;
          font-size: 22vh * @h;
          color: white;
          width: 100%;
          text-align: right;
        }
      }
      .c-line-right {
        width: 68%;
        height: auto;
        input {
          background: rgb(31, 42, 90);
          color: white;
          font-size: 22vh * @h;
          display: block;
          width: 100%;
          height: 100%;
          border: 1px solid rgb(41, 79, 129);
          border-radius: 2px 2px;
        }
      }
    }
  }
  .edit-add-btns {
    width: 100%;
    height: 40vh * @h;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
}
</style>
