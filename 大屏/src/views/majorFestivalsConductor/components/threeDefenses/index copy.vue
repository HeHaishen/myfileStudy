<!--
 * @Description: 三防
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-10 14:36:29
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-12 21:06:59
-->
<!-- 三防 -->
<template>
  <div class="manage">
    <ModelBox class="manage_yjdw" title="三防">
      <div slot="content" class="content">
        <div class="orinary-hidden" v-for="item in tabKeys" :key="item.key">
          <img src="../../../../assets/images/majorFestivalsConductor/ordinary-hiddent-icon.png" alt="" />
          <span>{{ item.label }}：1</span>
        </div>
      </div>
    </ModelBox>

    <pop-up-layer v-if="show" :show="show" @doClose="close" opsition="pageCenter" title="三防" ref="myPopUpLayer">
      <div slot="content" class="upLayer_content">
        <UpView />
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import UpView from "./upView.vue";
import ModelBox from "../modelBox/index.vue";
import { getIdsmApi } from "@/api/idsm/index";

export default {
  components: { Clist, ModelBox, UpView },
  data() {
    return {
      columns: [],
      listData: [],
      tabKeys: [
        { label: "指挥机构", key: "1" },
        { label: "应急保障组", key: "2" },
        { label: "雨量", key: "3" },
        { label: "珠江潮位", key: "4" },
        { label: "风情", key: "5" },
      ],
      smallKey: "1",
      // activeKey: "1",
      show: false,
    };
  },
  watch: {
    activeKey: {
      immediate: true,
      handler(val) {
        this.doQuery();
      },
    },
  },
  //创建完成 访问当前this实例
  created() { },
  //挂载完成 访问DOM元素
  mounted() { },
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
        imgUrl:
          "gzznGIS/Image/ghj/zhjhzj" + this.activeKey + this.smallKey + ".svg",
        type: "defaultType",
        layerName: "指挥救援组织",
        info: infos,
        phoneInfo: {
          phone: this.activeKey == 1 ? "phone" : "mobile",
          name: this.activeKey == 1 ? "name" : "username",
        },
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
@import '../../common.less';
@import './mixin.less';
.manage {
  .manage_yjdw {
    top: 1290vh * @h;
    left: 2816vw * @w;

    .content {
      display: flex;
      height: 330vh * @h;
      overflow: hidden;

      div {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        span {
          color: #ffffff;
          font-size: 16vh * @h;
        }
        img {
          width: 50%;
          height: 50%;
        }
      }
    }
  }
}
</style>