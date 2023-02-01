<!--
 * @Description:大屏弹出层 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Aidam_Bo
 * @Date: 2021-07-24 11:16:37
 * @LastEditTime: 2021-08-10 19:53:35
-->
<template>
  <div
    class="c-popup-layer"
    :class="['c-layer-position']"
    v-bind="$attrs"
    :style="{ ...styles, ...initPosition() }"
    ref="cPopupLayer"
    v-show="eventShow ? eventShow : show"
  >
    <div class="layer-title layer-title-icon layer-title-move" ref="moveHeader">
      <span> {{ title }}</span>
      <slot name="title"> </slot>
    </div>
    <div class="layer-close">
      <p @click="doClose">X</p>
    </div>
    <div class="layer-contents">
      <slot name="content"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      styles: {}, // 样式
      parentDatas: {}, // 父组件传入的数据
      eventShow: false, // 通过this.$refs.refsName.eventShow调用和修改
      saveEvent: null, // 传入点击的元素 this.$refs.refsName.saveEvent
    };
  },
  props: {
    title: {
      // 标题
      type: String,
      default: undefined,
    },
    opsition: {
      type: String,
      /* 
        btnBottom:点击按钮的底部，
        btnLeft:点击按的左侧，
        btnRight:点击按钮的右侧；
        btnTop:点击按钮的右侧； 
        页面位置
        pageTop:页面顶部
        pagetLeft：页面左部
        pageCenter：页面中间
        pageRight:页面右侧
        slefPoint：自定义
      */
      default: "pageCenter",
    },
    // 可以传入数据
    datas: {
      type: Object,
      default: () => {
        return {};
      },
    },
    show: {
      // 是否显示
      type: Boolean,
      required: false,
      default: false,
    },
    sendEvent: {
      // 传入点击的元素
      default: undefined,
    },
  },
  watch: {
    show: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal === true) {
          if (this.sendEvent) {
            // 点击的元素
            this.saveEvent = this.sendEvent;
          }
          this.$nextTick(() => {
            if (this.saveEvent) {
              this.initPosition();
            }
          });
        } else {
          // console.log('dajijjjjj', newVal)
        }
      },
    },
  },
  created() {
    this.init();
  },
  mounted() {
    this.$on("showTemplate", (data) => {
      this.eventShow = true;
      // 作为初始化钩子
      this.$emit("initMounted", data);
      if (this.sendEvent) {
        // 点击的元素
        this.saveEvent = this.sendEvent;
      }
      this.$nextTick(() => {
        this.isMove();
        if (this.saveEvent) {
          // this.initPosition();
        }
      });
    });

    this.$nextTick(() => {
      this.isMove();
    });
  },
  methods: {
    init() {
      // 初始化
      // console.log("attrs", this.$attrs);
      this.initAttr();
    },
    initAttr() {
      // 初始化属性值
      this.styles = this.$attrs.setStyles ? this.$attrs.setStyles : {};
      this.parentDatas = this.$attrs.parentDatas ? this.$attrs.parentDatas : {};
    },
    initPosition() {
      let that = this;
      if (that.saveEvent) {
        /*   console.log(
          "jjjkk",
          that.saveEvent,
          // that.saveEvent.target.clientHeight + that.saveEvent.target.y,
          that.saveEvent.target.getBoundingClientRect(),
          that.$refs
          // that.saveEvent.pageY
        ); */
        let elementPoint = that.saveEvent.target.getBoundingClientRect();
        let positionObj = {
          btnBottom: {
            top: elementPoint.y + elementPoint.height + 18 + "px",
            left: elementPoint.x + "px",
            transform: "none",
          },
          btnLeft: {
            top: elementPoint.y + "px",
            left:
              elementPoint.x - that.$refs.cPopupLayer.clientWidth - 18 + "px",
            transform: "none",
          },
          btnRight: {
            top: elementPoint.y + "px",
            left: elementPoint.x + elementPoint.width + 18 + "px",
            transform: "none",
          },
          btnTop: {
            // top: elementPoint.y - that.$refs.cPopupLayer.clientHeight + "px",
            top:
              elementPoint.top -
              that.$refs.cPopupLayer.clientHeight -
              18 +
              "px",
            left: elementPoint.x + "px",
            transform: "none",
          },
          pageTop: {
            top: "20%",
            left: "50%",
            transForm: "translateC(-50%);",
          },
          pagetLeft: {
            top: "50%",
            left: "35%",
            transForm: "translateY(-50%);",
          },
          pageCenter: {
            top: "50%",
            left: "50%",
            transForm: "translate(-50%, -50%);",
          },
          pageRight: {
            top: "50%",
            left: "70%",
            transForm: "translateY(-50%);",
            "z-index": 9999,
          },
          slefPoint: {}, // 自定义
        };
        // console.log('positionObj[this.opsition]',positionObj[this.opsition])
        return positionObj[this.opsition];
      } else {
        return {};
      }
    },
    // 移动方法
    isMove() {
      let cPopupLayer = this.$refs.cPopupLayer;
      let moveHeader = this.$refs.moveHeader;
      moveHeader.onmousedown = function (e) {
        //鼠标在拖动条上移动盒子
        const event = e || window.event;
        //获取鼠标按下时的位置
        let pageX =
          event.pageX || event.clientX + document.documentElement.scrollLeft;
        let pageY =
          event.pageY || event.clientY + document.documentElement.scrollTop;
        //计算鼠标按下的位置距盒子的位置
        let spaceX = pageX - cPopupLayer.offsetLeft;
        let spaceY = pageY - cPopupLayer.offsetTop;
        //鼠标移动的时候 获取鼠标的位置 整个和盒子更跟着鼠标的位置走
        document.onmousemove = function (e) {
          let event = e || window.event;

          let pageX =
            event.pageX || event.clientX + document.documentElement.scrollLeft;
          let pageY =
            event.pageY || event.clientY + document.documentElement.scrollTop;

          cPopupLayer.style.left = pageX - spaceX + "px";
          cPopupLayer.style.top = pageY - spaceY + "px";

          window.getSelection
            ? window.getSelection().removeAllRanges()
            : document.selection.empty();
        };
      };

      document.onmouseup = function () {
        //释放鼠标按键是  取消盒子的移动
        document.onmousemove = null;
      };
    },
    doBeforeClose(callBack) {
      this.$emit("beforeClose", this.parentDatas); // 关闭前
      callBack();
    },
    doClose() {
      console.log("doClose", this.show, this.eventShow);
      if (!this.eventShow) {
        console.log(999999999);
        this.$emit("doClose");
      } else {
        this.doBeforeClose(() => {
          if (this.eventShow) {
            this.eventShow = false;
          } // 当使用this.$refs.popUplayer.$emit("show"),才会自动触发关闭
          this.$emit("closeTemplate", this.parentDatas); // 关闭后
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@w:100 /5760;
// @h:100 /1079;
@h:100 /1080;
.box-sizing() {
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.border-radisu(@x, @y) {
  border-radius: @x @y;
  -o-border-radius: @x @y;
  -ms-border-radius: @x @y;
  -moz-border-radius: @x @y;
  -webkit-border-radius: @x @y;
}
.box-shadow() {
  box-shadow: 0 0 10vh * @h #00eaff inset;
  -o-box-shadow: 0 0 10vh * @h #00eaff inset;
  -ms-box-shadow: 0 0 10vh * @h #00eaff inset;
  -moz-box-shadow: 0 0 10vh * @h #00eaff inset;
  -webkit-box-shadow: 0 0 10vh * @h #00eaff inset;
}
.c-popup-layer {
  min-width: 305vw * @w;
  min-height: 124vh * @h;
  width: auto;
  height: auto;
  background: rgba(2, 14, 35, 0.8);
  // background:red;
  position: fixed;
  z-index: 9999;
  .border-radisu(10vw*@w,10vh*@h);
  box-shadow: 0 0 6vh #436f8b;
  -o-box-shadow: 0 0 6vh #436f8b;
  -ms-box-shadow: 0 0 6vh #436f8b;
  -moz-box-shadow: 0 0 6vh #436f8b;
  -webkit-box-shadow: 0 0 6vh #436f8b;
  padding: 6vh * @h 6vh * @h;
  .box-sizing();
  border: 2px solid #01ffff;
  /* 弹窗标题-开始 */
  .layer-title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30vh * @h;
    // line-height: 26vh * @h;
    font-size: 30vh * @h;
    font-weight: bold;
    color: white;
    padding-left: 10vw * @w;
    .box-sizing();
    span {
      padding-left: 10vw * @w;
    }
  }
  .layer-title-move {
    cursor: move;
  }
  .layer-title-icon::before {
    content: "  | ";
    color: #01e9ff;
    font-size: 26vh * @h;
    font-weight: bold;
  }
  /* 弹窗标题-结束 */
  .layer-close {
    width: 26vw * @w;
    height: 26vh * @h;
    cursor: pointer;
    position: absolute;
    right: 8vw * @w;
    top: 8vh * @h;
    p {
      width: 100%;
      height: 100%;
      line-height: 26vh * @h;
      color: white;
      font-size: 16vh * @h;
      text-align: center;
    }
  }
}
.c-layer-position {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
