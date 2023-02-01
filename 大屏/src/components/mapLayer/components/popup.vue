<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-06 14:27:22
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-09 11:55:44
-->
<template>
  <pop-up-layer
    :show="layerShow"
    v-if="layerShow"
    @doClose="layerShow = false"
    :title="popupTitle"
    opsition="pageRight"
    ref="myPopUpLayer"
    class="myPopUpLayer"
  >
    <template slot="content">
      <div class="content">
        <iframe
          width="100%"
          height="100%"
          :src="src"
          scrolling="no"
          frameborder="0"
          class="iframe"
        ></iframe>
      </div>
    </template>
  </pop-up-layer>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
      default: false,
    },

 
    popupTitle: {
      type: String,
      required: false,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      layerShow:false
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
    console.log(this.src);
  },
};
</script>
<style lang='less' scoped>
.myPopUpLayer{
 /deep/ .layer-title{
    padding-left: 10px;
  }
 /deep/ .layer-close{
     p{
       display: flex;
       justify-content: right;
       align-items: center;
       font-size: 30px;
     }
  }
}
.content {
    width: 1200px;
    height: 800px;
    overflow-y: auto;
}
 .c-layer-position{
        top: 0;
        left: 0;
        transform: none;
  }
</style>