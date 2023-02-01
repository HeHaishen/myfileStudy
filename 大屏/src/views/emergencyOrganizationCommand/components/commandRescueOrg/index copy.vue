<!--
 * @Description: 指挥救援组织
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-10 14:36:29
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-12 14:38:48
-->
<!-- 指挥救援组织 -->
<template>
  <div class="manage">
    <ModelBox class="manage_yjdw" title="指挥救援组织">
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
            {{ item.label }}:

            <div class="ch_small" style="display: inline-block">
              <div
                class="btn_small"
                v-for="s in item.tabKeysSmall"
                :key="s.key"
                :class="[
                  smallKey == s.key && activeKey == s.tabKey && 'active',
                ]"
                @click="changeTabSmall(s)"
              >
                {{ s.label }}
              </div>
            </div>
          </div>
        </div>
        <clist class="list" :columns="columns" :listData="listData">
          <template
            v-for="item in columns.filter((e) => e.textIndex != 'dw')"
            :slot="item.textIndex"
            slot-scope="{ text, record }"
          >
            <span :title="text" :key="item.textIndex">
              {{ item.textIndex == "quyu" ? handlerArea(record) : text }}
            </span>
          </template>
          <template
            v-for="item in ['mobile', 'phone']"
            :slot="item"
            slot-scope="{ text, record }"
          >
            <div :title="text" class="phone" :key="item">
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
            <div class="dw" @click="onGPS(record)">
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
      title="指挥救援组织"
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
      columns1: [
        { title: "姓名", textIndex: "name", width: "15%" },
        { title: "工作单位", textIndex: "orgName", width: "30%" },
        { title: "职务", textIndex: "post", width: "15%" },
        { title: "电话", textIndex: "phone", width: "30%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
      columns2: [
        { title: "机构名称", textIndex: "groupName", width: "30%" },
        { title: "负责人", textIndex: "username", width: "15%" },
        { title: "电话", textIndex: "mobile", width: "30%" },
        { title: "区域", textIndex: "quyu", width: "15%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
      columns: [],
      listData: [],
      tabKeys: [
        {
          label: "三防",
          key: "1",
          tabKeysSmall: [
            { label: "指挥机构", key: "1", tabKey: 1 },
            { label: "应急保障组", key: "2", tabKey: 1 },
          ],
        },
        {
          label: "防火",
          key: "2",
          tabKeysSmall: [
            { label: "指挥机构", key: "1", tabKey: 2 },
            { label: "扑火力量", key: "2", tabKey: 2 },
          ],
        },
      ],
      smallKey: "1",
      activeKey: "1",
      show: false,
    };
  },
  watch: {
    activeKey: {
      immediate: true,
      handler(val) {
        this.columns = val == 1 ? this.columns1 : this.columns2;
        this.doQuery();
      },
    },
    smallKey: {
      handler(val) {
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
    /** 处理区域 */
    handlerArea(record) {
      if (!record.address && !record.orgName) {
        return "";
      }
      const findQ = (str) => {
        if (!str) {
          return -1;
        }
        let index = str.indexOf("区");
        return index;
      };
      let index = findQ(record.address);
      if (index <= -1) {
        let index = findQ(record.orgName);
        if (index <= -1) {
          return "";
        }
        return record.orgName.slice(index - 2, index + 1);
      }
      return record.address.slice(index - 2, index + 1);
    },
    doQuery() {
      let body = {
        body: {
          lxdm: this.activeKey,
          orgType: this.smallKey,
          areaCode:
            this.activeKey == 1
              ? "440105000000"
              : ["440114000000", "440117000000"],
        },
      };
      let code = this.activeKey == 1 ? "ojom7nRH" : "15vb7jna";

      getIdsmApi(code, body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            if (this.smallKey == 2 && this.activeKey == 2) {
              this.listData = [];
              return;
            }
            this.listData = res.body.data;
          } else {
            this.listData = [];
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    onGPS(record) {
      //let items = JSON.parse(JSON.stringify(record));
      let items = pGzznCore.deepClone(record);
      let columns =
        this.activeKey == 1
          ? this.columns1.filter((e) => e.textIndex != "dw")
          : this.columns2.filter((e) => e.textIndex != "dw");
      let infos = pGzznCore.deepClone(columns);
      pGzznCore.pointLayerRemove({ type: "defaultType" });
      var objs = {
        imgUrl: "gzznGIS/Image/ghj/zhjhzj"+this.activeKey+this.smallKey+".svg",
        type: "defaultType",
        layerName: "指挥救援组织",
        info: infos,
        phoneInfo: { phone: this.activeKey == 1 ? "phone":"mobile", name: this.activeKey == 1 ?"name":"username" },
      };

      pGzznCore.setPointLayerToMap([items], objs);
    },
    /** 切换按钮 */
    changeTab(tab) {
      this.activeKey = tab.key;
    },
    /** 切换按钮 */
    changeTabSmall(tab) {
      this.smallKey = tab.key;
    },
    /** 更多事件点击 */
    onMore() {
      this.show = true;
    },
    /** 关闭更多页面 */
    close() {
      this.show = false;
    },
  },
};
</script>
<style lang='less' scoped>
@import "../../common.less";
@import "./mixin.less";
.manage {
  .manage_yjdw {
    top: 850vh * @h;
    left: 2816vw * @w;

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
      .btn,
      .btn_small {
        cursor: pointer;
        display: inline-block;
        margin-right: 5px;
        background: transparent;
        color: white;
        padding: 10vh * @h 30vw * @w;
        font-size: 11vh * @h;
        border: 2px #1d4fa2 solid;

        &.active {
          background: rgba(10, 42, 100, 1);
          border-color: #0275a1;
        }
      }
      .btn_small {
        font-size: 3vh * @h;
        padding: 5vh * @h 15vw * @w;
        background: rgba(10, 42, 100, 1);

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
}
</style>