<!--
 * @Description: 资源调配
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-30 11:14:26
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-11-02 20:19:05
-->
<!-- 资源调配 -->
<template>
  <div class="resource_demand">
    <div class="resource_demand_icon" title="资源调配" @click="onOpenView">
      <div class="icon_box">
        <img
          style="width: 100%; height: 100%"
          src="~@/assets/images/emergencyOrganizationCommandWar/icon_resource_demand.png"
          alt=""
        />
      </div>
      <span>资源调配</span>
    </div>

    <pop-up-layer
      :show="isOpenView"
      @doClose="onOpenView"
      opsition="pageCenter"
      title="资源调配"
      ref="myPopUpLayer"
    >
      <div slot="content" class="upLayer_content">
        <div class="btns">
          <div class="btn" @click="onAdd">添加</div>
        </div>
        <clist class="list" :columns="columns" :listData="listData">
          <template
            v-for="item in columns.filter((e) => e.textIndex != 'option')"
            :slot="item.textIndex"
            slot-scope="{ text, record }"
          >
            <span v-if="!record.editable" :title="text" :key="item.textIndex">
              {{ text }}
            </span>

            <template v-else>
              <div :key="item.textIndex" class="eidt_input">
                <component
                  :is="item.com"
                  v-model="editingData[item.textIndex]"
                  v-bind="item.bind"
                />
              </div>
            </template>
          </template>

          <template slot="option" slot-scope="{ record }">
            <template v-if="record.editable">
              <div class="icons" title="保存" @click="onSave(record)">
                <a-icon type="check" />
              </div>
              <div class="icons" title="取消" @click="onCancel(record)">
                <a-icon type="close-circle" />
              </div>
            </template>

            <template v-else>
              <div
                class="icons"
                :class="[editingData.key && 'disabled']"
                title="编辑"
                @click="onEdit(record)"
              >
                <a-icon type="edit" />
              </div>
              <a-popconfirm
                title="确定要删除此数据？"
                placement="bottom"
                ok-text="确定"
                cancel-text="取消"
                @confirm="onDelete(record)"
              >
                <div
                  class="icons delete"
                  :class="[editingData.key && 'disabled']"
                  title="删除"
                >
                  <a-icon type="delete" />
                </div>
              </a-popconfirm>
            </template>
          </template>
        </clist>
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import moment from "moment";
import {
  provisioningDetailWith,
  provisioningSave,
  provisioningDelete,
} from "@/api/idsm/index";

export default {
  components: { Clist },
  props: {
    /** 当前应急事件数据 */
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      locale,
      columns: [
        {
          title: "物资名称",
          textIndex: "name",
          width: "15%",
          com: "a-input",
        },
        {
          title: "需求数量",
          textIndex: "demandQuantity",
          width: "15%",
          com: "a-input-number",
          bind: {
            min: 0,
          },
        },
        {
          title: "已调拨数量",
          textIndex: "transferredQuantity",
          width: "15%",
          com: "a-input-number",
          bind: {
            min: 0,
          },
        },
        {
          title: "缺口数量",
          textIndex: "gapsNumber",
          width: "15%",
          com: "a-input-number",
          bind: {
            min: 0,
          },
        },
        {
          title: "目的地",
          textIndex: "destination",
          width: "15%",
          com: "a-input",
        },
        {
          title: "调配时间",
          textIndex: "deploymentTime",
          width: "15%",
          com: "a-date-picker",
          bind: {
            showTime: true,
            locale,
            dropdownClassName: "date_dropdownClassName_d",
          },
        },
        { title: "", textIndex: "option", width: "10%" },
      ],
      listData: [],
      /** 视图控制器 */
      isOpenView: false,
      /** 正在编辑的数据 */
      editingData: {},
    };
  },
  //创建完成 访问当前this实例
  created() {},
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    init() {
      this.doQuery();
      this.isOpenView = false;
      this.editingData = {};
    },
    doQuery() {
      let eventId = this.eventData.jbbh;
      this.listData = [];
      provisioningDetailWith(eventId).then((res) => {
        if (res.success) {
          this.listData = res.body;
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    onOpenView() {
      this.isOpenView = !this.isOpenView;
      if (this.isOpenView) {
        this.doQuery();
      }
    },
    /** 添加事件 */
    onAdd() {
      if (this.editingData.key) {
        let index = this.listData.findIndex(
          (e) => e.key == this.editingData.key
        );
        if (index > -1) {
          this.listData[index].editable = false;
        }
      }
      this.editingData = {
        key: this.listData.length,
        editable: true,
      };
      this.listData.unshift(this.editingData);
    },

    /** 编辑事件
     *  @param {Object} record
     */
    onEdit(record) {
      if (this.editingData.key && this.editingData.key != record.key) {
        return;
      }
      Object.assign(record, {
        editable: true,
      });
      this.editingData = JSON.parse(JSON.stringify(record));
    },
    /** 保存 */
    async onSave(record) {
      if (record.key == this.editingData.key) {
        let body = {
          ...this.editingData,
          eventId: this.eventData.jbbh,
          deploymentTime: this.editingData.deploymentTime
            ? moment(this.editingData.deploymentTime).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : undefined,
        };
        let data = await provisioningSave(body);
        if (data.success) {
          Object.assign(record, {
            ...this.editingData,
            key: data.body,
            sid: data.body,
            deploymentTime: this.editingData.deploymentTime
              ? moment(this.editingData.deploymentTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : undefined,
          });
        } else {
          this.$MyMessage.error(data.message);
        }

        Object.assign(record, {
          editable: false,
        });
        this.editingData = {};
      }
    },

    /** 取消事件 */
    onCancel(record) {
      if (record.key == this.editingData.key) {
        const { sid } = this.editingData;
        if (!sid) {
          this.listData.splice(0, 1);
        }
        Object.assign(record, {
          editable: false,
        });
        this.editingData = {};
      }
    },

    /** 删除事件 */
    onDelete(record) {
      if (this.editingData.key) {
        return false;
      }
      let index = this.listData.findIndex((e) => e.key == record.key);
      if (index > -1) {
        this.listData.splice(index, 1);
      }

      let body = [record.sid];
      provisioningDelete({ body }).then((res) => {
        if (!res.success) {
          this.$MyMessage.error(res.message);
        }
      });
    },
  },
};
</script>
<style lang='less' scoped>
@import "../../common.less";

.resource_demand {
  position: relative;

  .resource_demand_icon {
    position: absolute;
    right: 0;
    top: 250vh * @h;
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
  .c-popup-layer {
    height: 1100vh * @h;
    width: 1920vw * @w;
    background-color: #0d203e;
  }

  .upLayer_content {
    padding: 10vh * @h 10vw * @w;
    .btns {
      // height: 100vh * @h;
      padding: 10vh * @h 0;
      overflow: hidden;
      text-align: right;

      .btn {
        display: inline-block;
        margin: 0 10vw * @w;
        font-size: 26vh * @h;
        line-height: 60vh * @h;
        cursor: pointer;
        border: 1px solid #1ee8fc;
        padding: 0 10vw * @w;

        &:first-child {
          margin: 0;
        }
      }
    }

    .list {
      height: calc(100% - (202vh * @h));
      overflow: auto;

      /deep/ .list-header {
        padding: 14vh * @h 0;
        div {
          font-size: 18vh * @h;
        }
      }
      /deep/ .list-body {
        height: auto !important;
        li {
          div {
            font-size: 18vh * @h;
            padding: 5vh * @h 10vw * @w;
            span {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .eidt_input {
              width: 100%;
              .ant-calendar-picker {
                min-width: unset !important;

                .ant-calendar-picker-icon {
                  color: white;
                }
              }
              .ant-select {
                width: 100%;
              }

              .ant-input,
              .ant-select-selection,
              .ant-input-affix-wrapper,
              .ant-input-number {
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
                .ant-input-number-handler-wrap {
                  padding-left: 0;
                  padding-right: 0;
                }
                .ant-input-number-input-wrap {
                  padding-left: 0;
                  padding-right: 0;
                }
              }

              .ant-select-selection {
                .ant-select-selection__rendered {
                  line-height: 30vh * @h;
                  padding-left: 0;
                  padding-right: 0;
                }
                .ant-select-arrow {
                  color: white;
                }
              }
            }
          }

          .icons {
            color: #00ffff;
            cursor: pointer;
            font-size: 26vh * @h;
            &.delete {
              color: red;
            }

            &.disabled {
              color: #dad7d7 !important;
            }
          }
        }
      }
    }
  }
}
</style>
<style >
.date_dropdownClassName_d {
  z-index: 10001;
}
</style>