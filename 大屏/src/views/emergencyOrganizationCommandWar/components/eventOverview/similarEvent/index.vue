<template>
  <div class="similar-event">
    <pop-up-layer
      :show="true"
      :setStyles="{}"
      @doClose="close"
      opsition="pageRight"
      :title="contentObj.accTitile"
      ref="myPopUpLayer"
      class="similar-pop"
    >
      <template slot="content">
        <div class="content">
          <div class="similar-info">
            <ul>
              <li v-for="(i, k) in labelObj" :key="i.id">
                <div class="li-label">
                  <label for="">{{ i.label }}</label>
                </div>
                <div class="li-content">
                  <div>
                    {{
                      contentObj[i.contentKeys]
                        ? contentObj[i.contentKeys]
                        : "-"
                    }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="similar-tab">
            <p
              v-for="(item, index) in similarTab"
              :key="index"
              :class="[similarIndex == index ? 'similar-btn' : '']"
              @click="similarBtn(index)"
            >
              {{ item.name }}
            </p>
          </div>
          <div class="overview-event" v-show="similarIndex == 0">
            <ul>
              <li v-for="(i, k) in overviewObgj" :key="i.id">
                <div class="li-label">
                  <label for="">{{ i.label }}</label>
                </div>
                <div class="li-content">
                  <div>
                    {{
                      contentObj[i.contentKeys]
                        ? contentObj[i.contentKeys]
                        : "-"
                    }}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <survey-status
            v-show="similarIndex == 1"
            :sid="contentObj.sid"
          ></survey-status>
          <duty-detail
            v-show="similarIndex == 2"
            :sid="contentObj.sid"
          ></duty-detail>
        </div>
      </template>
    </pop-up-layer>
  </div>
</template>

<script>
import surveyStatus from "../surveyStatus/index";
import dutyDetail from "../dutyDetail/index";

export default {
  props: {
    similarShow: {
      type: Boolean,
      default: false,
    },
    contentObj: {
      type: Object,
      default: () => {
        {
        }
      },
    },
  },
  components: {
    surveyStatus,
    dutyDetail,
  },
  data() {
    return {
      eventShow: true,
      title: "????????????",
      labelObj: [
        {
          id: 1,
          label: "???????????????",
          contentKeys: "accDate",
        },
        {
          id: 2,
          label: "???????????????",
          contentKeys: "accPlace",
        },
        {
          id: 3,
          label: "???????????????",
          contentKeys: "accType",
        },
        {
          id: 4,
          label: "???????????????",
          contentKeys: "accLevel",
        },
        {
          id: 5,
          label: "???????????????",
          contentKeys: "accCompany",
        },
        {
          id: 6,
          label: "???????????????",
          contentKeys: "deathNum",
        },
        {
          id: 7,
          label: "?????????????????????",
          contentKeys: "economyLoss",
        },
      ],
      similarTab: [
        {
          id: 1,
          name: "????????????",
        },
        {
          id: 2,
          name: "??????????????????",
        },
        {
          id: 3,
          name: "??????????????????",
        },
      ],
      similarIndex: 0,
      overviewObgj: [
        {
          id: 1,
          label: "???????????????",
          contentKeys: "fileNum",
        },
        {
          id: 2,
          label: "???????????????",
          contentKeys: "accNum",
        },
        {
          id: 3,
          label: "???????????????",
          contentKeys: "accTitile",
        },
        {
          id: 4,
          label: "???????????????",
          contentKeys: "accCompany",
        },
        {
          id: 5,
          label: "???????????????",
          contentKeys: "trades",
        },
        {
          id: 6,
          label: "???????????????",
          contentKeys: "areas",
        },
        {
          id: 7,
          label: "?????????????????????",
          contentKeys: "accDate",
        },
        {
          id: 8,
          label: "?????????????????????",
          contentKeys: "accPlace",
        },
        {
          id: 9,
          label: "???????????????",
          contentKeys: "deathNum",
        },
        {
          id: 10,
          label: "???????????????",
          contentKeys: "injuredNum",
        },
        {
          id: 11,
          label: "???????????????",
          contentKeys: "injuredDeathNum",
        },
        {
          id: 12,
          label: "???????????????",
          contentKeys: "accType",
        },
        {
          id: 13,
          label: "???????????????",
          contentKeys: "accLevel",
        },
      ],
    };
  },
  mounted() {
    console.log(this.detailObj);
  },
  methods: {
    close() {
      console.log(11111);
      this.$emit("similarClose");
      //   this.similarShow = false
    },
    similarBtn(index) {
      this.similarIndex = index;
    },
  },
};
</script>

<style lang="less" scope>
@import "../../../common.less";

.similar-event {
  .similar-pop {
    max-width: 1000vw * @w;
    left: 14%;
    top: 23%;
  }
  .content {
    width: 100%;
    max-height: 1300vh * @h;
    overflow: auto;
  }
  .similar-info,
  .overview-event {
    ul {
      width: 100%;
      height: 100%;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 50%;
        height: auto;
        display: flex;
        padding: 13vh * @h 32vw * @w 13vh * @h 0;
        color: white;
        .li-label {
          width: 188vw * @w;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          label {
            display: inline-block;
            width: 100%;
            text-align: right;
            font-size: 29vh * @h;
          }
        }
        .li-content {
          font-size: 29vh * @h;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .similar-tab {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15vh * @h;
    p {
      font-size: 28vh * @h;
      padding: 10vh * @h 15vw * @w;
      border: 1px solid rgb(1, 251, 251);
      margin-right: 15vw * @w;
      color: #fff;
      cursor: pointer;
    }
    .similar-btn {
      background-color: rgb(2, 83, 133);
    }
  }
}
</style>
