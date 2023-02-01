<!--
 * @Description: 应急概览一张图
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:23:17
 * @LastEditTime: 2021-09-03 09:51:04
-->
<template>
  <div class="c-cityDangerFirm-overview">
    <headers title="全市隐患企业分布一张图"> </headers>
    <div class="cityDangerFirm-overview-content">
      <div class="left">
        <left ref="left" />
      </div>
      <div class="center">
        <center ref="center" />
      </div>
      <div class="right">
        <right ref="right" />
      </div>
    </div>
  </div>
</template>
<script>
import headers from '@/components/APicture/header'
import Left from './components/left'
import Center from './components/center'
import Right from './components/right'
import { MessagePush } from "@/utils/pushMinix"; //混入
export default {
  mixins: [MessagePush],
  components: { headers, Left, Center, Right },
  data() {
    return {}
  },
  created() { },
  mounted() { },
  methods: {
    init() { },
    initChart() { }
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
