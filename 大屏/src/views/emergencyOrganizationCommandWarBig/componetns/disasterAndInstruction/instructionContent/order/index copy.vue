<!--
 * @Description: 指令下达
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-29 14:15:38
 * @LastEditors:  
 * @LastEditTime: 2021-11-01 19:59:15
-->
<!-- 指令下达 -->
<template>
  <div class="order">
    <a-form
      class="order_form"
      :form="form"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      @submit="handleSubmit"
    >
      <a-form-item label="执行人">
        <a-input
          :title="absUsers.map((e) => e.userName || e.mc)"
          size='large'
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
          :rows="6"
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
          size='large'
          v-decorator="['sender']"
          placeholder="任务发布人"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="联系电话">
        <a-input
          class="zxr_input"
          size='large'
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
          size='large'
          :locale="locale"
          dropdownClassName="date_dropdownClassName"
          v-decorator="['timeLimit']"
        />
      </a-form-item>

      <div style="text-align: center">
        <a-button  type='primary' size='large' html-type="submit"> 确定 </a-button>
      </div>
    </a-form>

    <pop-up-layer
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
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          /** 执行人列表 */
          let executorList = [];
          this.absUsers.map((v) => {
            executorList.push({
              executor: v.userName || v.mc,
              executorTel: v.mobile || v.fzryddh,
              executorType: v.txlType,
            });
          });
          let body = {
            ...values,
            executorList,
            timeLimit: values.timeLimit
              ? moment(values.timeLimit).format("YYYY-MM-DD HH:mm:ss")
              : undefined,
            eventId: "1120",
            type: 2,
          };
          console.log(body);
          // return;
          plansDisDespicableSave(body).then((res) => {
            if (res.success) {
              this.$MyMessage.success("指令下达成功");
              this.form.resetFields();
            } else {
              this.$MyMessage.error(res.message);
            }
          });
          // console.log("Received values of form: ", values);
        }
      });
    },
    /** 点击展开通讯录 */
    openAbs() {
      this.isOpenAbs = true;
    },

    /** 加入通讯录人员事件
     *  @param {Array<Object>} users 用户数据
     *  @param {NumberString} activeBtnKey 当前邀请人员类型
     */
    changeAbs(users, activeBtnKey) {
      this.isOpenAbs = false;
      this.absUsers = users;
      let userName = users.map((e) => e.userName || e.mc);
      this.form.setFieldsValue({
        executor: userName.toString(),
      });
    },

    /** 关闭页面 */
    close() {
      this.isOpenAbs = false;
    },
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
      .ant-input-lg{
        height: 70px;
      }
    }
    /deep/ .ant-form-item-label {
      label {
        color: white;
        font-size: 28px;
        line-height: 70px;
      }
    }
    .zxr_input {
      /deep/ input {
        background-color: transparent;
        border-color: #378CFF;
        color: white;
        cursor: pointer;
      }
    }
    .rwms_textarea,
    .zxr_input {
      background-color: transparent;
      border-color: #378CFF;
      width: 100%;
      color: white;
    }
    .zxr_icon {
      color: white;
      font-size: 32px;
      cursor: pointer;
    }

    .zlxd_btn {
      background-color: transparent;
      border-color: #378CFF;
      color: white;
    }
    /deep/.ant-btn-lg{
      padding: 0 90px;
      font-size: 30px;
      height: 70px;
      color: #fff;
    }
    /deep/.ant-input:placeholder-shown{
      font-size: 26px;
      &::-webkit-input-placeholder {
         color: #378CFF;
      }
    }
  }

  .c-popup-layer {
    height: 1100px;
    width: 1650px;
    background-color: #0d203e;
  }

  .upLayer_content {
    padding: 10px 10px;
  }
}
</style>
<style>
.date_dropdownClassName {
  z-index: 8111;
}
</style>