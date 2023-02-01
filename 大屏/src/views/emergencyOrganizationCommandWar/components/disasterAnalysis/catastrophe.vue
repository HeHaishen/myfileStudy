<!--
 * @Description: 灾损统计
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-30 11:14:26
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-11-03 18:02:38
-->
<!-- 灾损统计 -->
<template>
  <div class="catastrophe">
    <div class="catastrophe_icon" title="灾损统计" @click="onOpenView">
      <div class="icon_box">
        <img
          style="width: 100%; height: 100%"
          src="~@/assets/images/emergencyOrganizationCommandWar/icon_catastrophe.png"
          alt=""
        />
      </div>
      <span>灾损统计</span>
    </div>

    <div class="up_view" v-show="isOpenView">
      <div class="row">
        <div class="item">
          <div class="label">死亡人数：</div>
          <div class="value">
            <span v-if="!isEdit" :title="`${formData.death}人`">
              {{ formData.death }}人</span
            >
            <a-input-number v-else v-model="formData.death" :min="0" />
          </div>
        </div>
        <div class="item">
          <div class="label">受伤人数：</div>
          <div class="value">
            <span v-if="!isEdit" :title="`${formData.injured}人`">
              {{ formData.injured }}人</span
            >
            <a-input-number :min="0" v-else v-model="formData.injured" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="item">
          <div class="label">失踪人数：</div>
          <div class="value">
            <span v-if="!isEdit" :title="`${formData.missingPersons}人`">
              {{ formData.missingPersons }}人</span
            >
            <a-input-number :min="0" v-else v-model="formData.missingPersons" />
          </div>
        </div>
        <div class="item">
          <div class="label">受困人数：</div>
          <div class="value">
            <span v-if="!isEdit" :title="`${formData.trapped}人`">
              {{ formData.trapped }}人</span
            >
            <a-input-number :min="0" v-else v-model="formData.trapped" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="item" style="width: 100%">
          <div class="label" style="width: 27%">预估经济损失：</div>
          <div class="value" style="width: 73%">
            <span v-if="!isEdit" :title="`${formData.economicLoss}万元`">
              {{ formData.economicLoss }}万元</span
            >
            <a-input-number :min="0" v-else v-model="formData.economicLoss" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="btn" @click="onEdit">{{ isEdit ? "取消" : "编辑" }}</div>
        <div class="btn" v-if="isEdit" @click="onSure">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import { disasterDamageDetailWith, disasterDamageSave } from "@/api/idsm/index";

export default {
  components: {},
  props: {
    /** 当前应急事件数据 */
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isEdit: false,
      formData: {
        /** 死亡人数 */
        death: 0,
        /** 受伤人数 */
        injured: 0,
        /** 失踪人数 */
        missingPersons: 0,
        /** 受困人数 */
        trapped: 0,
        /** 预估经济损失 */
        economicLoss: 0,
      },
      /** 储备数据集 */
      oldFormData: {},
      /** 视图控制器 */
      isOpenView: false,
    };
  },
  //创建完成 访问当前this实例
  created() {
    this.oldFormData = JSON.parse(JSON.stringify(this.formData));
  },
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    /** 初始化事件 */
    init() {
      this.doQuery();
      this.formData = {
        /** 死亡人数 */
        death: 0,
        /** 受伤人数 */
        injured: 0,
        /** 失踪人数 */
        missingPersons: 0,
        /** 受困人数 */
        trapped: 0,
        /** 预估经济损失 */
        economicLoss: 0,
      };
      this.oldFormData = JSON.parse(JSON.stringify(this.formData));
      this.isOpenView = false;
      this.isEdit = false;
    },
    doQuery() {
      console.log(this.eventData,'this.eventData--');
      let eventId = this.eventData.jbbh;
      disasterDamageDetailWith(eventId).then((res) => {
        if (res.success) {
          if (res.body.length > 0) {
            this.formData = {
              ...res.body[0],
              /** 死亡人数 */
              death: res.body[0].death || 0,
              /** 受伤人数 */
              injured: res.body[0].injured || 0,
              /** 失踪人数 */
              missingPersons: res.body[0].missingPersons || 0,
              /** 受困人数 */
              trapped: res.body[0].trapped || 0,
              /** 预估经济损失 */
              economicLoss: res.body[0].economicLoss || 0,
            };
            this.oldFormData = JSON.parse(JSON.stringify(this.formData));
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    onOpenView() {
      this.isOpenView = !this.isOpenView;
      if (!this.isOpenView) {
        this.isEdit = false;
        if (!this.isEdit) {
          this.formData = this.oldFormData;
        }
      } else {
        this.doQuery();
      }
    },
    /** 编辑事件 */
    onEdit() {
      this.isEdit = !this.isEdit;
      if (!this.isEdit) {
        this.formData = this.oldFormData;
      }
    },

    /** 确定事件 */
    onSure() {
      this.isEdit = false;
      let body = {
        sid: this.formData.sid || undefined,
        /** 死亡人数 */
        death: this.formData.death,
        /** 受伤人数 */
        injured: this.formData.injured,
        /** 失踪人数 */
        missingPersons: this.formData.missingPersons,
        /** 受困人数 */
        trapped: this.formData.trapped,
        /** 预估经济损失 */
        economicLoss: this.formData.economicLoss,
        eventId: this.eventData.jbbh,
      };
      disasterDamageSave(body).then((res) => {
        if (res.success) {
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
  },
};
</script>
<style lang='less' scoped>
@import "../../common.less";

.catastrophe {
  position: relative;

  .catastrophe_icon {
    position: absolute;
    right: 0;
    left: 0;
    width: 100%;
    height: 110vh * @h;
    z-index: 9999;
    background: rgba(22, 51, 55, 0.5);
    border: 1px #00ffff solid;
    text-align: center;
    cursor: pointer;
    .icon_box {
      width: 60vw * @w;
      height: 60vh * @h;
      margin: 5vh * @h auto;
    }
  }
  .up_view {
    position: absolute;
    right: 120vw * @w;
    top: 0;
    background: rgba(22, 51, 55, 0.5);
    width: 800vw * @w;
    padding: 10vh * @h 10vw * @w;
    .row {
      width: 100%;
      display: block;
      overflow: hidden;
      margin: 5vh * @h 0;
      .item {
        width: 50%;
        font-size: 26vh * @h;
        line-height: 70vh * @h;
        float: left;
        .label,
        .value {
          width: 50%;
          display: inline-block;
          text-align: right;
        }

        .value {
          text-align: left;
          /deep/ .ant-input-affix-wrapper,
          /deep/ .ant-input-number {
            background-color: transparent;
            border-color: #1382bb;
            color: white;
            width: 100%;

            .ant-input {
              background-color: transparent;
              border-color: #1382bb;
              color: white;
            }
            .ant-input-suffix {
              color: white;
            }
          }
        }
      }

      .btn {
        font-size: 26vh * @h;
        line-height: 40vh * @h;
        width: 100vw * @w;
        float: right;
        cursor: pointer;
        // background: #1ee8fc;
        border: 1px solid #1ee8fc;
        text-align: center;
        margin: 5vh * @h 10vw * @w;
      }
    }
  }
}
</style>