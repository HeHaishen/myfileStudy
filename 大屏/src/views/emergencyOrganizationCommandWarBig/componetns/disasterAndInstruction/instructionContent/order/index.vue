<!--
 * @Description: 指令下达
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-29 14:15:38
 * @LastEditors: jiajun wu
 * @LastEditTime: 2021-11-11 19:31:12
-->
<!-- 指令下达 -->
<template>
  <div class="order">
    <a-spin :spinning="spinning">
      <a-form
        class="order_form"
        :form="form"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 16 }"
        @submit="handleSubmit"
      >
        <a-form-item label="执行人">
          <a-input
            :title="absUsers.map((e) => e.userName || e.mc)"
            class="zxr_input"
            v-decorator="[
              'executor',
              {
                rules: [
                  {
                    required: true,
                    message: '请选择执行人',
                  },
                ],
              },
            ]"
            @click.native="openAbs"
            :disabled="true"
            placeholder="执行人"
          >
            <a-icon slot="suffix" class="zxr_icon" type="solution" />
          </a-input>
        </a-form-item>
        <a-form-item label="任务描述">
          <a-textarea
            class="rwms_textarea"
            placeholder="任务描述"
            :rows="2"
            v-decorator="[
              'content',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入任务描述',
                  },
                ],
              },
            ]"
            :maxLength="1000"
          />
        </a-form-item>
        <a-form-item label="任务发布人">
          <a-input
            class="zxr_input"
            v-decorator="['sender']"
            placeholder="任务发布人"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="联系电话">
          <a-input
            class="zxr_input"
            v-decorator="['lxdh']"
            placeholder="联系电话"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="完成时间">
          <a-date-picker
            class="zxr_input"
            placeholder="选择时间"
            show-time
            :locale="locale"
            @openChange="timeDateInputFocus"
            dropdownClassName="date_dropdownClassName"
            v-decorator="['timeLimit']"
          />
        </a-form-item>

        <div style="text-align: center; margin-top: 40px">
          <a-button class="zlxd_btn" html-type="submit"> 确定 </a-button>
        </div>
      </a-form>
    </a-spin>
    <pop-up-layer
      class="big_pop_up_layer"
      :show="isOpenAbs"
      @doClose="close"
      opsition="pageCenter"
      title="邀请人员"
      ref="myPopUpLayer"
    >
      <div slot="content" class="upLayer_content">
        <AbsBox @change="changeAbs" :value="absUsers" />
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import AbsBox from "../absBox/index.vue";
import { plansDisDespicableSave } from "@/api/idsm/index";
import moment from "moment";

export default {
  components: { AbsBox },
  props: {
    /** 当前应急事件数据 */
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "coordinated" }),
      /** 通讯录控制器 */
      isOpenAbs: false,
      locale,
      /** 通讯录选中人员 */
      absUsers: [],
      spinning: false,
      timeOuts: null,
    };
  },
  //创建完成 访问当前this实例
  created() {},
  //挂载完成 访问DOM元素
  mounted() {
    this.$nextTick(() => {
      // TODO 此处后期需要设置默认值 任务发布人、联系电话 通过当前登录人信息获取
      // this.form.setFieldsValue({
      //   sender: "",
      //   lxdh: "",
      // });
    });
  },
  //方法集合
  methods: {
    init() {
      this.absUsers = [];
      this.isOpenAbs = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          /** 执行人列表 */
          let executorList = [];
          this.absUsers.map((v) => {
            executorList.push({
              executor: v.txlName,
              executorTel: v.txlPhone,
              executorType: v.txlType,
            });
          });
          let body = {
            ...values,
            executorList,
            timeLimit: values.timeLimit
              ? moment(values.timeLimit).format("YYYY-MM-DD HH:mm:ss")
              : undefined,
            eventId: this.eventData.jbbh, // 事件id
            title: this.eventData.sjms, // 事件名称
            type: 2,
          };
          console.group("指令下达");
          console.log(body);
          // return;
          this.spinning = true;
          plansDisDespicableSave(body)
            .then((res) => {
              this.spinning = false;
              if (res.success) {
                this.$MyMessage.success("指令下达成功");
                this.form.resetFields();
              } else {
                this.$MyMessage.error(res.message);
              }
            })
            .catch((err) => {
              this.spinning = false;
              this.$MyMessage.error("系统异常");
            });
          console.groupEnd();
        }
      });
    },
    /** 点击展开通讯录 */
    openAbs() {
      this.isOpenAbs = true;
    },

    timeDateInputFocus(event) {
      return
      const heightClint = document.querySelector("body").clientHeight;
      const widthClint = document.querySelector("body").clientWidth;
      const columnNum = parseFloat((heightClint / 2140).toFixed(2)); // 计算比例
      const widthScrac = parseFloat((widthClint / 10240).toFixed(2)); // 宽度

      if (this.timeOuts) {
        clearTimeout(this.timeOuts);
      }
      this.$nextTick(() => {
        this.timeOuts = setTimeout(() => {
          let popuperData = document.querySelector(".date_dropdownClassName");
          popuperData.style.transform = `scale(${widthScrac},${columnNum})`;
          // popuperData.style.transformOrigin = "left ";
          clearTimeout(this.timeOuts);
        }, 0);
      });
    },

    /** 加入通讯录人员事件
     *  @param {Array<Object>} users 用户数据
     *  @param {NumberString} activeBtnKey 当前邀请人员类型
     */
    changeAbs(users, activeBtnKey) {
      this.isOpenAbs = false;
      this.absUsers = users;
      let userName = users.map((e) => e.txlName);
      this.form.setFieldsValue({
        executor: userName.toString(),
      });
    },

    /** 关闭页面 */
    close() {
      this.isOpenAbs = false;
    },
  },
  beforeDestroy() {
    if (this.timeOuts) {
      clearTimeout(this.timeOuts);
    }
  },
};
</script>
<style lang='less' scoped>
@import "../../../../common.less";

.order {
  width: 100%;
  .order_form {
    /deep/ .ant-form-item {
      margin-bottom: 30px;
    }
    /deep/ .ant-form-item-label {
      label {
        color: white;
        font-size: 38px;
        height: 65px;
        line-height: 65px;
      }
    }
    .zxr_input {
      /deep/ input {
        background-color: transparent;
        border-color: #1382bb;
        color: white;
        cursor: pointer;
        font-size: 38px;
        height: 65px;
        line-height: 65px;
      }
    }
    .rwms_textarea,
    .zxr_input {
      background-color: transparent;
      border-color: #1382bb;
      width: 100%;
      font-size: 38px;
      height: 65px;
      line-height: 65px;
      color: white;
    }
    .rwms_textarea {
      height: unset;
    }
    .zxr_icon {
      color: white;
      font-size: 38px;
      cursor: pointer;
    }

    .zlxd_btn {
      background-color: transparent;
      border-color: #1382bb;
      color: white;
      line-height: 78px;
      font-size: 36px;
      height: 78px;
      width: 255px;
      text-align: center;
    }
  }

  .c-popup-layer {
    height: 1150px;
    width: 1650px;
    background-color: #0d203e;
  }

  .upLayer_content {
    padding: 10px 10px;
  }
}
</style>
<style lang="less">
.date_dropdownClassName {
  z-index: 10001;
  .ant-calendar {
    width: 520px;
    font-size: 28px;

    .ant-calendar-footer-show-ok.ant-calendar-footer {
      .ant-calendar-ok-btn {
        font-size: 26px;
        line-height: 28px;
        height: 32px;
      }
    }
  }
  .ant-calendar-time-picker-select {
    font-size: 28px;
  }
}
</style>