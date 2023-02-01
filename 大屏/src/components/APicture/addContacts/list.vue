<!--
 * @Description:添加-
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-01 10:56:02
 * @LastEditTime: 2021-09-02 10:06:26
-->
<template>
  <pop-up-layer
    :setStyles="setStyles"
    :opsition="pageOpstion"
    ref="ContactList"
  >
    <template slot="content">
      <div class="add-contact-wrap">
        <div class="contact-search"></div>
        <div class="contacts-list"></div>
      </div>
    </template>
  </pop-up-layer>
</template>

<script>
import CTable from "@/components/APicture/c-table.vue";
export default {
  components: { CTable },
  data() {
    return {};
  },
  props: {
    setStyles: {
      // 弹窗的样式
      default: () => {
        return {};
      },
      type: Object,
    },
    pageOpstion: {
      // 定位位置
      default: () => {
        return {};
      },
      type: String,
    },
  },
};
</script>
<style lang="less" scoped>
@import ".././common";
.add-contact-wrap {
  width: 650vw * @w;
  height: 750vh * @h;
  .contact-search {
    width: 100%;
    height: 38vh * @h;
  }
  .contacts-list {
    width: 100%;
    height: calc(100% - 38vh * @h);
  }
}
</style>
