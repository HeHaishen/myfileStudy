<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: JiaJun Wu
 * @Date: 2021-10-10 15:34:21
 * @LastEditTime: 2021-11-08 11:02:09
-->
<template>
  <div>
    <ModelBox :title="choseObj.id == 1 ? null : choseObj.title" class="c-mybox-position" style="z-index: 8100" :class="[choseObj.id == 1 && 'zlxd']">
      <template slot="content">
        <div class="content-all">
          <div class="left-content">
            <Order v-show="choseObj.id == 1" :eventData="eventData" />
            <OrderTracking v-show="choseObj.id == 2" :eventData="eventData" />
            <ProgressOf v-show="choseObj.id == 3" :eventData="eventData" />
            <!-- <HiddenDanger v-show="choseObj.id == 4" :eventData="eventData" /> -->
          </div>
          <div class="right-menu">
            <div class="menu-wrap">
              <Menus @clickMenu="clickMenu" />
            </div>
          </div>
        </div>
      </template>
    </ModelBox>
  </div>
</template>

<script>
import ModelBox from "@/views/majorFestivalsConductor/components/modelBox/index.vue";
import ProgressOf from "./progreesOfInner/index.vue";
import Menus from "@/views/emergencyOrganizationCommandWar/components/menus/index.vue";

import HiddenDanger from "./hiddenDanger/index.vue";
import OrderTracking from "./orderTracking/index.vue";
import Order from "./order/index.vue";

export default {
  components: {
    ModelBox,
    ProgressOf,
    Menus,
    Order,
    OrderTracking,
    HiddenDanger,
  },
  props: {
    /** 当前应急事件数据 */
    eventData: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      /** 当前选中菜单 */
      choseObj: {},
    };
  },
  mounted() { },
  methods: {
    /** 菜单点击事件 */
    clickMenu({ choseObj }) {
      this.choseObj = choseObj;
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
.zlxd {
  &.c-mybox-position {
    &.c-model-box {
      /deep/ .model-header {
        .text {
          &::after {
            background: transparent;
          }
        }
      }
    }
  }
}
</style>
