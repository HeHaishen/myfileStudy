<!--
 * @Description: 事件-详情
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors:  
 * @Date: 2021-10-11 18:10:01
 * @LastEditTime: 2021-11-02 14:26:27
-->
<template>
  <div class="detail-conents">
    <ul>
      <li v-for="(i, k) in labelList" :key="k">
        <div class="label-div">{{i.label}}</div>
        <div class="content-div">{{contentObj[i.contentIndex]}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    labelList: {
      type: Array,
      default: () => {
        return [
          { label: "事件名称:", contentIndex: "xxbt" },
          { label: "事发时间:", contentIndex: "sfsj" },
          { label: "事发明细:", contentIndex: "sjms" },
        ];
      },
    },
    contentObj: {
      type: Object,
      default: () => {
        return {
          xxbt: "12",
          sfsj: "22",
          sjms: "222",
        };
      },
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../../common.less';
.detail-conents {
  width: 100%;
  height: auto;
  ul {
    width: 100%;
    height: auto;
    li {
      width: 100%;
      height: auto;
      display: flex;
      .label-div {
        width: 20%;
        color: white;
        font-size: 28px;
        text-align: right;
        padding: 14px 0;
        .box-sizing();
      }
      .content-div {
        width: 80%;
        color: white;
        font-size: 28px;
        padding: 14px 14px;
        .box-sizing();
      }
    }
  }
}
</style>
<style lang="less" scoped>
.c-popuper-style {
  z-index: 9999;
}
</style>