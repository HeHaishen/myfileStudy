<!--  -->
<template>
  <div class="group-plan">
    <div class="leader-btn" @click="leaderClick">
      <img src="../../../../assets/images/majorFestivalsConductor/leader-icon.png" alt=""> 领导小组
    </div>
    <pop-up-layer v-if="pdfShow" :show="pdfShow" :setStyles="{}" @doClose="close" opsition="pageRight" :title="'第130届广交会城市服务保障领导小组指挥体系框架图'" ref="myPopUpLayer" class="plan-pop">
      <template slot="content">
        <div class="Pdf_box" v-if="pdfUrlData">
          <span></span>
          <iframe :src="`./pdf/web/viewer.html?file=${pdfUrlData}`"></iframe>
        </div>
      </template>
    </pop-up-layer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pdfShow: false,
      pdfUrlData: `/doc/api/store/preview/1447553120744914944`
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  },
  methods: {
    leaderClick() {
      this.pdfShow = true
    },
    close() {
      console.log(111);
      this.pdfShow = false
    }
  },

}
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
@import '../../common.less';
.group-plan {
  .leader-btn {
    position: fixed;
    top: 20vh * @h;
    right: 540vw * @w;
    z-index: 9999;
    color: #fff;
    padding: 0 10vw * @w;
    background-image: url('../../../../assets/images/majorFestivalsConductor/leader-bgc.png');
    font-size: 16vh * @h;
    background-size: 100% 100%;
    padding: 10vh * @h 10vw * @w;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    img {
      width: 35vw * @w;
      height: 35vh * @h;
      margin-right: 5vw * @w;
    }
  }
  .plan-pop {
    z-index: 99999;
  }
  .Pdf_box {
    // position: fixed;
    // left: 0;
    // top: 0;
    width: 70vw;
    height: 85vh;
    z-index: 99999;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>