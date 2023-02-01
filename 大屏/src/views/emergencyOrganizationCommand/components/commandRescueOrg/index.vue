<!--
 * @Description: 指挥救援组织
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-10 14:36:29
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-12 20:05:08
-->
<!-- 指挥救援组织 -->
<template>
  <div class="manage">
    <ModelBox class="manage_yjdw" title="指挥救援组织">
      <div slot="content" class="content">
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