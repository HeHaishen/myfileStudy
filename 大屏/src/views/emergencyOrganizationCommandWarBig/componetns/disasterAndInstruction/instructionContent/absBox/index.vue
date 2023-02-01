<!--
 * @Description: 通讯录
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-29 15:14:09
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-11 19:36:57
-->
<!-- 通讯录 -->
<template>
  <div class="abs_box">
    <div class="head">
      <div
        class="btn"
        v-for="item in absBtnList"
        :key="item.key"
        :class="[item.key == activeBtnKey && 'active']"
        @click="onBtn(item)"
      >
        {{ item.label }}
        <span style="color: #29ff0f">
          {{ sclectKey.filter((e) => e.txlType == item.key).length || "" }}
        </span>
      </div>

      <div class="search">
        <a-input
          class="search_input"
          placeholder="关键字搜索"
          v-model="keywords"
        ></a-input>
        <div class="ssBtn" @click="onSearch">搜索</div>
      </div>
    </div>
    <div class="content">
      <div class="tree" v-if="activeBtnKey == 1">
        <TreeGroup v-model="groupData" />
      </div>
      <div class="list_box" :class="[activeBtnKey != 1 && 'list_s']">
        <div class="in_select_users">
          <div
            class="user"
            v-for="(item, index) in sclectKey.filter((e) =>
              isolation ? e.txlType == activeBtnKey : e
            )"
            :key="item.sid"
          >
            {{ item.txlName }}
            <span class="icons" @click="remUser(item, index)">
              <a-icon type="close-circle" />
            </span>
          </div>
        </div>
        <a-spin :spinning="isLoading">
          <clist class="list" :columns="columns" :listData="listData">
            <template
              v-for="item in columns"
              :slot="item.textIndex"
              slot-scope="{ text }"
            >
              <span :title="text" :key="item.textIndex">
                {{ text }}
              </span>
            </template>

            <template slot="checkbox" slot-scope="{ record }">
              <a-checkbox @change="onChange(record)" :checked="record.checked">
              </a-checkbox>
            </template>
          </clist>
          <!-- <div class="all">
          <a-checkbox @change="onChangeAll"> </a-checkbox>
        </div> -->

          <div class="pagination big_pagination">
            <ChangePage
              :total="total"
              :currentPage="currentPage"
              @changePages="changePages"
            />
          </div>
        </a-spin>

        <div class="footer">
          <div class="add" @click="join">加入</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import TreeGroup from "./treeGroup.vue";
import { getGroupUserFind, getIdsmApi } from "@/api/idsm/index";
import ChangePage from "@/components/APicture/changePage/index.vue";

export default {
  components: { Clist, TreeGroup, ChangePage },
  props: {
    value: {
      type: Array,
    },
    /** 是否需要数据隔离 此处用于 切换其他tab后是否需要混入展示已选用户\数据 */
    isolation: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      absBtnList: [
        { label: "通讯录", key: "1" },
        { label: "救援专家", key: "2" },
        { label: "救援队伍", key: "3" },
      ],
      columns: [],
      /** 通讯录 */
      txlColumns: [
        { title: "", textIndex: "checkbox", width: "5%" },
        { title: "序号", textIndex: "index", width: "10%" },
        { title: "姓名", textIndex: "userName", width: "20%" },
        { title: "所属组", textIndex: "groupName", width: "25%" },
        { title: "职务", textIndex: "adminPosition", width: "20%" },
        { title: "联系方式", textIndex: "mobile", width: "20%" },
      ],
      /** 救援专家 */
      jyzjColumns: [
        { title: "", textIndex: "checkbox", width: "5%" },
        { title: "专家名称", textIndex: "zjxm", width: "30%" },
        { title: "专家类型", textIndex: "zjlxmc", width: "30%" },
        { title: "专家电话", textIndex: "yddh", width: "35%" },
      ],
      /** 救援队伍 */
      jydwColumns: [
        { title: "", textIndex: "checkbox", width: "5%" },
        { title: "队伍名称", textIndex: "mc", width: "30%" },
        { title: "总人数", textIndex: "zrs", width: "15%" },
        { title: "负责人", textIndex: "fzr", width: "15%" },
        { title: "负责人电话", textIndex: "fzryddh", width: "35%" },
      ],
      listData: [],
      /** 当前激活窗口 1.通讯录 2.应急专家 3.应急队伍 */
      activeBtnKey: "1",
      /** 左侧群组数数据 */
      groupData: {},
      /** 关键字 */
      keywords: null,
      total: 0,
      currentPage: 1,
      /** 当前选择的用户 */
      sclectKey: this.value,
      isLoading: false,
    };
  },
  watch: {
    groupData: {
      deep: true,
      // immediate: true,
      handler(val) {
        this.currentPage = 1
        this.doQuery();
      },
    },
    activeBtnKey: {
      immediate: true,
      handler(val, old) {
        this.doQuery();
        this.total = 0;
        if (val == 1) {
          this.columns = this.txlColumns;
        } else if (val == 2) {
          // this.sclectKey = []
          this.columns = this.jyzjColumns;
        } else if (val == 3) {
          // this.sclectKey = []
          this.columns = this.jydwColumns;
        }
      },
    },
  },
  //创建完成 访问当前this实例
  created() {},
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    doQuery() {
      this.isLoading = true;
      if (this.activeBtnKey == 1) {
        getGroupUserFind({
          body: {
            keywords: this.keywords,
            groupId: this.groupData.sid,
          },
          page: this.currentPage,
          pageSize: 10,
        })
          .then((res) => {
            this.isLoading = false;
            if (res.success) {
              res.body.map((v, i) => {
                let sid = v.sid;
                Object.assign(v, {
                  sid: `${this.activeBtnKey}-${sid}`,
                  index: (this.currentPage - 1) * 10 + (i + 1),
                  txlType: this.activeBtnKey,
                  checked:
                    this.sclectKey.findIndex(
                      (e) => e.sid == `${this.activeBtnKey}-${sid}`
                    ) > -1,
                  txlPhone: v.mobile,
                  txlName: v.userName,
                });
              });
              this.listData = res.body;
              this.total = parseInt(res.total);
            } else {
              this.$MyMessage.error(res.message);
            }
          })
          .catch((err) => {
            this.listData = [];
            this.isLoading = false;
          });
      } else if (this.activeBtnKey == 3 || this.activeBtnKey == 2) {
        let body = {
          body: {
            mc: this.keywords,
          },
          page: this.currentPage,
        };
        this.listData = [];
        let code = this.activeBtnKey == 2 ? "iKJAJFEf" : "1pQeEGzH";
        getIdsmApi(code, body)
          .then((res) => {
            this.isLoading = false;
            if (res.success) {
              if (res.body.data) {
                res.body.data.map((v) => {
                  let sid = v.rownum;
                  Object.assign(v, {
                    txlType: this.activeBtnKey,
                    sid: `${this.activeBtnKey}-${sid}`,
                    txlName: this.activeBtnKey == 2 ? v.zjxm : v.mc,
                    checked:
                      this.sclectKey.findIndex(
                        (e) => e.sid == `${this.activeBtnKey}-${sid}`
                      ) > -1,
                    txlPhone: this.activeBtnKey == 2 ? v.yddh : v.fzryddh,
                  });
                });
                this.listData = res.body.data;
                this.total = parseInt(res.total);
              } else {
                this.listData = [];
              }
            } else {
              this.$MyMessage.error(res.message);
            }
          })
          .catch((e) => {
            this.listData = [];
            this.isLoading = false;
          });
      }
    },
    changePages(param) {
      this.currentPage = param.pages;
      this.doQuery();
    },
    /** 点击表头分类 */
    onBtn(record) {
      this.activeBtnKey = record.key;
    },

    /** 点击搜索按钮事件 */
    onSearch() {
      this.currentPage = 1;
      this.doQuery();
    },

    /** 选择 */
    onChange(record) {
      Object.assign(record, {
        checked: !record.checked,
      });
      let index = this.sclectKey.findIndex((e) => e.sid == record.sid);
      if (index > -1) {
        this.sclectKey.splice(index, 1);
      } else {
        this.sclectKey.push(record);
      }
    },
    /** 全选 */
    onChangeAll() {},

    /** 移除已选用户 */
    remUser(user, index) {
      this.sclectKey.splice(index, 1);
      let i = this.listData.findIndex((e) => e.sid == user.sid);
      if (i > -1) {
        this.listData[i].checked = false;
      }
    },

    /** 加入事件
     *  @returns {Array<object>} `this.sclectKey` 当前选择的用户 `this.activeBtnKey` 当前激活窗口
     */
    join() {
      this.$emit("change", this.sclectKey, this.activeBtnKey);
    },
  },
};
</script>
<style lang='less' scoped>
@import "../../../../common.less";

.abs_box {
  width: 100%;
  .head {
    width: 100%;
    overflow: hidden;
    color: white;
    border-bottom: 1px #1d355a solid;
    padding-bottom: 10px;
    .btn {
      display: inline-block;
      float: left;
      background-color: #1f4886;
      cursor: pointer;
      font-size: 28px;
      padding: 0 20px;
      line-height: 60px;

      &:nth-of-type(2) {
        margin: 0 5px;
      }
      &.active {
        background-color: #388cff;
      }
    }
    .search {
      display: inline-block;
      float: right;
      overflow: hidden;

      .search_input {
        display: inline-block;
        float: left;
        width: 276px;
        // line-height: 45px;
        line-height: 64px;
        height: 64px;
        background-color: #062456;
        border-color: #2768c4;
        color: white;
      }
      .ssBtn {
        display: inline-block;
        font-size: 24px;
        float: left;
        background-color: #013ca7;
        line-height: 60px;
        color: white;
        margin-left: 10px;
        text-align: center;
        border: 2px solid #2768c4;
        padding: 0 20px;
        cursor: pointer;
      }
    }
  }
  .content {
    width: 100%;
    overflow: hidden;
    height: calc((1150px) - (26px) - (150px));
    // overflow: auto;
    .tree {
      width: 380px;
      overflow: auto;
      float: left;
      height: calc((1150px) - (26px) - (150px));
             /deep/.ant-tree {
    font-size: 18px;
  }
    }
    .list_box {
      width: calc(100% - 380px);
      border-left: 1px #1d355a solid;
      float: left;
      height: calc((1150px) - (26px) - (150px));
      position: relative;

      &.list_s {
        width: 100%;
      }

      .in_select_users {
        width: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        height: 70px;

        .user {
          // width: 123px;
          display: inline-block;
          padding: 0 20px;
          margin: 0 5px;
          float: left;
          font-size: 28px;
          line-height: 70px;
          color: white;
          text-align: center;
          cursor: pointer;
          position: relative;
          &:hover {
            .icons {
              display: inline-block;
            }
          }
          .icons {
            display: none;
            position: absolute;
            top: 0;
            right: -10px;
            color: red;
            width: 26px;
          }
        }
      }

      .list {
        height: calc(100% - (202px));
        overflow: auto;

        /deep/ .list-header {
          padding: 14px 0;
          div {
            font-size: 28px;
          }
        }
        /deep/ .list-body {
          height: auto !important;
          li {
            div {
              font-size: 27px;
              padding: 0 10px;
              span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }

            .phone {
              .icon {
                margin: 0 10px;
                color: #00ffff;
                cursor: pointer;
              }
            }
          }
        }
      }

      .all {
        position: absolute;
        top: 80px;
        left: 8px;
      }

      .footer {
        margin-top: 5px;
        height: 73px;
        border-top: 1px #1d355a solid;
        position: relative;
        .add {
          width: 200px;
          height: 50px;
          font-size: 28px;
          line-height: 50px;
          color: white;
          border: 2px #0ea975 solid;
          border-radius: 5px;
          text-align: center;
          position: absolute;
          top: 50%;
          right: 32px;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }
    }
  }
}
</style>