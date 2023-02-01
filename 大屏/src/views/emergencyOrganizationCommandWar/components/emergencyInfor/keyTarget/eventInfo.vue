<!--
 * @Description: 事件信息项
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-28 09:35:26
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-28 10:26:49
-->
<!-- 事件信息项 -->
<template>
  <div class="event_info">
    <div class="icon"></div>
    <div class="title">地面沉降</div>
    <div class="num">
      <span>9999</span>
      处
    </div>
    <div class="dw" @click="onPosition" title="定位">
      <svg
        t="1633855607571"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2761"
        width="100%"
        height="100%"
      >
        <path
          d="M512 943.98c223.99-224.73 335.984-399.578 335.984-524.547C847.984 231.98 697.56 80.02 512 80.02S176.016 231.98 176.016 419.433C176.016 544.4 288.01 719.25 512 943.98z m45.327 45.177c-25.01 25.093-65.645 25.093-90.654 0-235.25-236.027-354.654-422.443-354.654-569.724C112.02 196.78 290.951 16.024 512 16.024s399.98 180.757 399.98 403.409c0 147.281-119.403 333.697-354.653 569.724zM512 544c70.689 0 127.994-57.305 127.994-127.994S582.69 288.01 512 288.01s-127.994 57.305-127.994 127.994S441.31 543.999 512 543.999z m0 63.996c-106.034 0-191.99-85.956-191.99-191.99S405.965 224.014 512 224.014s191.99 85.957 191.99 191.99S618.034 607.996 512 607.996z"
          p-id="2762"
          fill="#1383FE"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  //创建完成 访问当前this实例
  created() {},
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    /** gis 打点事件 */
    onPosition() {},
  },
};
</script>
<style lang='less' scoped>
@import "../../../common.less";

.event_info {
  width: 100%;
  padding: 0 10vw * @w;
  background: #244767;
  margin: 10vh * @h 0;
  line-height: 64vh * @h;
  position: relative;

  div {
    display: inline-block;
    font-size: 32vh * @h;
    color: white;
  }

  .title {
    width: calc(100% - (50vw * @w) - (10vw * @w) - 20%);
  }

  .num {
    width: 20%;
    text-align: right;
    margin-right: 10vw * @w;
    span {
      // margin-right: 5vw * @w;
      color: #1deafd;
    }
  }

  .dw {
    width: 50vw * @w;
    height: 50vh * @h;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 10vw * @w;
    transform: translateY(-50%);
  }
}
</style>