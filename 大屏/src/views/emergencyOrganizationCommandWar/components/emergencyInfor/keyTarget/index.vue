<!--
 * @Description: 重点目标
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-28 09:33:12
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-28 10:58:00
-->
<!-- 重点目标 -->
<template>
  <div class="key_target">
    <a-collapse class="key_targe_collapse">
      <a-collapse-panel key="1" header="地灾隐患点">
        <template v-for="item in 10">
          <EventInfo :key="item" />
        </template>
        <span slot="extra"> 5793 </span>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="高危企业">
        <span slot="extra"> 199 </span>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="重要措施">
        <span slot="extra"> 102 </span>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import EventInfo from "./eventInfo.vue";

export default {
  components: { EventInfo },
  data() {
    return {
      dzyhdList: [],
    };
  },
  //创建完成 访问当前this实例
  created() {},
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {},
};
</script>
<style lang='less' scoped>
@import "../../../common.less";

.key_target {
  width: 100%;

  /deep/ .key_targe_collapse.ant-collapse {
    background-color: transparent;
    border: none;
    margin-bottom: 5vh * @h;

    .ant-collapse-item {
      margin-bottom: 5px;
      border: none;

      .ant-collapse-header {
        color: white;
        background-color: #043ebd;
      }

      .ant-collapse-content {
        background-color: #304d67;
        border: none;
        .ant-collapse-content-box {
          padding: 0;
        }
      }
    }
  }
}
</style>