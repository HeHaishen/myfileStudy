<!--
 * @Description: 删除图层提示
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-10 15:01:03
 * @LastEditTime: 2021-09-15 10:25:17
-->
<template>
  <div class="c-delete-teail">
    <div class="c-delete-title">
      <p class="text-title">⚠{{ title }}</p>
    </div>
    <div class="c-delete-content">{{ contentText }}</div>
    <div class="c-delete-footer">
      <p class="click-btn" @click="doCancel">取消</p>
      <p class="click-btn" @click="doEnsure">确定</p>
    </div>
    <div class="layer-close">
      <p @click="doClose">X</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "提示",
      parentDatas: {},
      contentText: "确定删除？",
    };
  },
  mounted() {
    this.$on("show", (data) => {
      this.initData();
      this.parentDatas = data;
      this.title = data.title ? data.title : "提示";
      this.contentText = data.contentText ? data.contentText : "确定删除？";
    });
  },
  methods: {
    initData() {
      this.title = "提示";
      this.contentText = "确定删除？";
    },
    doClose() {
      this.$emit("doClose");
    },
    doEnsure() {
      this.$emit("doEnsure", { ...this.parentDatas });
    },
    doCancel() {
      this.$emit("doCancel");
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common.less";
.c-delete-teail {
  width: 80%;
  height: 30%;
  background: rgb(41, 66, 95);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10vh * @h 10vw * @w;
  .box-sizing();
  .c-delete-title {
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
  .c-delete-content {
    width: 100%;
    height: calc(100% - 80vh * @h);
    padding: 6vh * @h 6vw * @w;
    color:white;
    font-size:18vh*@h;
    text-align: center;
  }
  .c-delete-footer {
    width: 100%;
    height: 40vh * @h;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
</style>
