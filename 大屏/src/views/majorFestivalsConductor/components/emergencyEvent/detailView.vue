<!--
 * @Description: 事件-详情
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-11 18:10:01
 * @LastEditTime: 2021-10-13 11:54:56
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
          { label: "事发名称", contentIndex: "xxbt" },
          { label: "事发时间", contentIndex: "sfsj" },
          { label: "事发明细", contentIndex: "sjms" },
        ];
      },
    },
    contentObj: {
      type: Object,
      default: () => {
        return {
          xxbt: "",
          sfsj: "",
          sjms: "",
        };
      },
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../common.less";
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
        width: 30%;
        color:white;
        font-size:24vh*@h;
      }
      .content-div {
        width: 70%;
        color:white;
        font-size:24vh*@h;
        padding:14vh*@h 14vw*@w;

      }
    }
  }
}
</style>
