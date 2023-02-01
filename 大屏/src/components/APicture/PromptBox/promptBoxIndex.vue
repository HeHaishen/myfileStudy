<!--
 * @Description: 删除-编辑-提示框
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-10 09:42:49
 * @LastEditTime: 2021-09-10 10:25:01
-->
<template>
  <div class="prompt-box">
    <div class="prompt-box-title">{{title}}</div>
    <div class="prompt-bot-content">
      <slot name="content">确定删除此数据？</slot>
    </div>
    <div class="prompt-bot-button">
      <slot name="footer">
        <p>取消</p>
        <p>确定</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {},
  props: {
    title: {
      type: String,
      default: "提示",
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.prompt-box {
  min-width: 100vw * @w;
  min-height: 200vh * @h;
  width: auto;
  height: auto;
  .prompt-box-title{
    width:100%;
    height:30vh*@h;
    color:white;
    font-size:24vh*@h;
    text-align: left;

  }
}
</style>
