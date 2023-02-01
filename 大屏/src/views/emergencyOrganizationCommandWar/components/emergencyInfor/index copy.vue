<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: JiaJun Wu
 * @Date: 2021-10-10 15:34:21
 * @LastEditTime: 2021-10-28 09:43:54
-->
<template>
  <div>
    <ModelBox :title="title" class="c-mybox-position" style="z-index: 8100">
      <template slot="content">
        <div class="content-all">
          <div class="left-menu">
            <div class="menu-wrap"></div>
          </div>
          <div class="right-content">
            <!-- <BaseMessage /> -->
            <KeyTarget />
          </div>
        </div>
      </template>
    </ModelBox>
  </div>
</template>

<script>
import ModelBox from "@/views/majorFestivalsConductor/components/modelBox/index.vue";
import BaseMessage from "./baseMessage/index.vue"
import KeyTarget from './keyTarget/index.vue' // 重点目标
export default {
  components: { ModelBox, BaseMessage, KeyTarget },
  data() {
    return {
      title: "应急信息",
    };
  },
  mounted() {
    this.$nextTick(() => { });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
