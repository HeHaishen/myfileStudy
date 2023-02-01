<!--
 * @Description: 应急救援队伍
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-10 14:36:29
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-12 11:29:15
-->
<!-- 应急救援队伍 -->
<template>
  <div class="manage" ref="manages">
    <ModelBox class="manage_yjdw" title="应急救援队伍">
      <div slot="content" class="content">
        <div class="rightTitle">
          <div class="more" @click="onMore">更多</div>
        </div>
        <div class="btns">
          <div
            class="btn"
            v-for="item in tabKeys"
            :key="item.key"
            :class="[activeKey == item.key && 'active']"
            @click="changeTab(item)"
          >
            {{ item.label }}
          </div>
        </div>
        <clist class="list" :columns="columns" :listData="listData">
          <template
            v-for="item in columns.filter(
              (e) => !['fzryddh', 'dw'].includes(e.textIndex)
            )"
            :slot="item.textIndex"
            slot-scope="{ text }"
          >
            <span :title="text" :key="item.textIndex">
              {{ text }}
            </span>
          </template>
          <template slot="fzryddh" slot-scope="{ text, record }">
            <div :title="text" class="phone">
              {{ text }}
              <a-icon
                type="phone"
                class="icon"
                @click="clickMobilePhone(record, $event)"
                v-show="text"
              />
              <a-icon
                type="mail"
                class="icon"
                @click="clickMessage(record, $event)"
                v-show="text"
              />
            </div>
          </template>
          <template slot="dw" slot-scope="{ record }">
            <div class="dw" @click="tableTdClick(record)">
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
          </template>
        </clist>
      </div>
    </ModelBox>

    <pop-up-layer
      v-if="show"
      :show="show"
      @doClose="close"
      opsition="pageCenter"
      title="应急救援队伍"
      ref="myPopUpLayer"
    >
      <div slot="content" class="upLayer_content">
        <UpView />
      </div>
    </pop-up-layer>

    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import UpView from "./upView.vue";
import ModelBox from "../modelBox/index.vue";
import { getIdsmApi } from "@/api/idsm/index";
import mixin from "./mixin";

export default {
  components: { Clist, ModelBox, UpView },
  mixins: [mixin],
  data() {
    return {
      columns: [
        { title: "队伍名称", textIndex: "mc", width: "35%" },
        { title: "总人数", textIndex: "zrs", width: "10%" },
        { title: "负责人", textIndex: "fzr", width: "10%" },
        { title: "负责人电话", textIndex: "fzryddh", width: "35%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
      listData: [],
      tabKeys: [
        { label: "社会救援力量", key: "1" },
        { label: "专业救援力量", key: "2" },
        { label: "基层救援力量", key: "3" },
      ],
      activeKey: "1",
      show: false,
    };
  },
  watch: {
    activeKey: {
      immediate: true,
      handler() {
        this.doQuery();
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
      let body = {
        body: {
          lxdm: this.activeKey,
        },
      };
      getIdsmApi("1pQeEGzH", body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            this.listData = res.body.data;
          } else {
            this.listData = [];
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    tableTdClick(record) {
      //let items = JSON.parse(JSON.stringify(record));
      let columns = this.columns.filter((e) => e.textIndex != "dw");
      let items = pGzznCore.deepClone(record);
      pGzznCore.pointLayerRemove({ type: "defaultType" });
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/yjjhdw"+this.activeKey+".svg",
        imgSize:{width:32,height:32},
        type: "defaultType",
        layerName: "应急救援队伍",
        info: columns,
        phoneInfo: { phone: "fzryddh", name: "mc" },
      };

      items.lon = items.jd;
      items.sid = items.lxdm;
      items.lat = items.wd;
      items.name = items.mc;
      items.z = items.zrs;
      pGzznCore.setPointLayerToMap([items], objs);
    },
    /** 更多事件点击 */
    onMore() {
      this.show = true;
    },
    /** 关闭更多页面 */
    close() {
      this.show = false;
    },

    /** 切换按钮 */
    changeTab(tab) {
      this.activeKey = tab.key;
    },
  },
};
</script>
<style lang='less' scoped>
@import "../../common.less";
@import "./mixin.less";
.manage {
  .manage_yjdw {
    top: 885vh * @h;
    left: 30vw * @w;
    // position: relative;
    .rightTitle {
      position: absolute;
      top: 0;
      right: 30vw * @w;
      line-height: 64vh * @h;
      color: white;
      font-size: 22vh * @h;
      .more {
        cursor: pointer;
      }
    }
  }
  .content {
    height: 330vh * @h;
    overflow: hidden;
    .btns {
      width: 100%;
      overflow: hidden;
      margin: 5px 0;
      .btn {
        cursor: pointer;
        display: inline-block;
        background: rgba(10, 42, 100, 1);
        // background: #02648e;
        margin-right: 5px;
        color: white;
        padding: 10vh * @h 30vw * @w;
        font-size: 11vh * @h;
        border: 2px #1d4fa2 solid;

        &.active {
          background: #02648e;
          border-color: #0275a1;
        }
      }
    }

    .list {
      height: calc(100% - 40px);
      overflow: auto;
      .dw {
        width: 50vw * @w;
        height: 100%;
        cursor: pointer;
      }

      /deep/ .list-header {
        padding: 14vh * @h 0;
        div {
          font-size: 18vh * @h;
        }
      }
      /deep/ .list-body {
        li {
          div {
            font-size: 18vh * @h;
            padding: 0 10vw * @w;
            span {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .phone {
              .icon {
                margin: 0 10vw * @w;
                color: #00ffff;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  // .upLayer_content {
  //   // height: 600vh * @h;
  //   overflow: hidden;
  // }
}
</style>