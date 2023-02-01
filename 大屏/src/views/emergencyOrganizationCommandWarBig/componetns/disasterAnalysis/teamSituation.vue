<!--
 * @Description: 队伍情况
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-30 11:14:26
 * @LastEditors: jiajun wu
 * @LastEditTime: 2021-11-11 19:49:15
-->
<!-- 队伍情况 -->
<template>
  <div class="team_situation">
    <div class="team_situation_icon" title="队伍情况" @click="onOpenView">
      <div class="icon_box">
        <img
          style="width: 100%; height: 100%"
          src="~@/assets/images/emergencyOrganizationCommandWar/icon_team_situation.png"
          alt=""
        />
      </div>
      <span>队伍情况</span>
    </div>

    <pop-up-layer
      :show="isOpenView"
      @doClose="onOpenView"
      opsition="pageCenter"
      title="队伍情况"
      ref="myPopUpLayer"
      class="big_pop_up_layer"
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
            <span
              v-if="!record.editable"
              :title="text"
              :key="item.textIndex"
              :style="{
                cursor: item.textIndex == 'name' ? 'pointer' : 'default',
              }"
              @click="item.textIndex == 'name' ? onTeam(record) : undefined"
            >
              {{
                item.textIndex == "status"
                  ? text == 1
                    ? "在途"
                    : "到达"
                  : text
              }}
            </span>

            <template v-else>
              <div :key="item.textIndex" class="eidt_input">
                <a-input
                  v-if="item.textIndex == 'name'"
                  v-model="editingData[item.textIndex]"
                />
                <a-select
                  :dropdownStyle="{ zIndex: 99999 }"
                  v-else
                  v-model="editingData[item.textIndex]"
                  :options="options"
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

    <pop-up-layer
      class="team_box"
      :show="isOpenTeamView"
      @doClose="onOpenTeamView"
      opsition="pageCenter"
      title="队伍信息"
      ref="myPopUpLayer"
    >
      <div slot="content" class="upLayer_content">
        <!-- <div class="item">
          <div class="label">队长</div>
          <div class="value">***</div>
        </div>
        <div class="item">
          <div class="label">队长</div>
          <div class="value">***</div>
        </div> -->
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import {
  disasterReliefTeamDetailWith,
  disasterReliefTeamSave,
  disasterReliefTeamDelete,
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
      columns: [
        { title: "队伍名称", textIndex: "name", width: "60%" },
        { title: "状态", textIndex: "status", width: "30%" },
        { title: "", textIndex: "option", width: "10%" },
      ],
      listData: [],
      options: [
        { value: "1", label: "在途" },
        { value: "2", label: "已到达" },
      ],
      /** 视图控制器 */
      isOpenView: false,
      /** 队伍信息视图控制器 */
      isOpenTeamView: false,
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
      this.isOpenTeamView = false;
      this.editingData = {};
    },
    doQuery() {
      let eventId = this.eventData.jbbh;
      this.listData = [];
      disasterReliefTeamDetailWith(eventId).then((res) => {
        if (res.success) {
          this.listData = res.body;
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    onOpenTeamView() {
      this.isOpenTeamView = !this.isOpenTeamView;
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

    /** 队伍名称点击事件 */
    onTeam(record) {
      // this.isOpenTeamView = true;
      // console.log(record, "-===");
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
        };
        let data = await disasterReliefTeamSave(body);
        if (data.success) {
          Object.assign(record, {
            ...this.editingData,
            key: data.body,
            sid: data.body,
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
      disasterReliefTeamDelete({ body }).then((res) => {
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

.team_situation {
  position: relative;

  .team_situation_icon {
    position: absolute;
    right: 0;
    top: 140px;
    width: 100%;
    height: 130px;
    z-index: 9999;
    background: rgba(22, 51, 55, 0.5);
    border: 1px #00ffff solid;
    text-align: center;
    cursor: pointer;
    .icon_box {
      width: 60px;
      height: 60px;
      margin: 5px auto;
    }
  }
  .c-popup-layer {
    height: 1100px;
    width: 1024px;
    background-color: #0d203e;
  }

  .upLayer_content {
    padding: 10px 10px;
    .btns {
      // height: 100px;
      padding: 10px 0;
      overflow: hidden;
      text-align: right;

      .btn {
        display: inline-block;
        margin: 0 10px;
        font-size: 26px;
        line-height: 60px;
        cursor: pointer;
        border: 1px solid #1ee8fc;
        padding: 0 10px;

        &:first-child {
          margin: 0;
        }
      }
    }

    .list {
      height: calc(100% - (202px));
      overflow: auto;

      /deep/ .list-header {
        padding: 14px 0;
        div {
          font-size: 18px;
        }
      }
      /deep/ .list-body {
        height: auto !important;
        li {
          div {
            font-size: 18px;
            padding: 5px 10px;
            span {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .eidt_input {
              width: 100%;
              .ant-select {
                width: 100%;
              }

              .ant-input,
              .ant-select-selection {
                background-color: transparent;
                border-color: #1382bb;
                color: white;
                width: 100%;
              }

              .ant-select-selection {
                .ant-select-selection__rendered {
                  line-height: 30px;
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
            font-size: 26px;
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

  .team_box {
    top: 1200px;
    left: 2100px;
  }
}
</style>
<style >
.ant-popover-placement-bottom {
  z-index: 10001;
}
</style>