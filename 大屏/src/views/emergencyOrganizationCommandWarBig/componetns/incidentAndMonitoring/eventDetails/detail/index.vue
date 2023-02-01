<template>
  <div class="event-detail">
    <pop-up-layer :show="true" :setStyles="{}" @doClose="close" opsition="pageRight" :title="title" ref="myPopUpLayer" class="event-pop">
      <template slot="content">
        <div class="detail-info">
          <ul>
            <li v-for="(i) in labelObj" :key="i.id">
              <div class="li-label">
                <label for="">{{ i.label }}</label>
              </div>
              <div class="li-content">
                <div>{{ contentObj[i.contentKeys] ? contentObj[i.contentKeys] : "-" }}</div>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </pop-up-layer>
  </div>
</template>

<script>
export default {
  props: {

    contentObj: {
      type: Object,
      default: () => { { } }
    },
  },
  data() {
    return {
      eventShow: true,
      title: '事件详情',
      labelObj: [
        {
          id: 1,
          label: "事件来源：",
          contentKeys: "xxly",
        },
        {
          id: 2,
          label: "事发地点：",
          contentKeys: "sfdd",
        },
        {
          id: 3,
          label: "事故区域：",
          contentKeys: "sfxzhq",
        },
        {
          id: 4,
          label: "事发时间：",
          contentKeys: "sfsj",
        },
        {
          id: 5,
          label: "事件等级：",
          contentKeys: "sjdjdm",
        },
        {
          id: 6,
          label: "事件类型：",
          contentKeys: "sjlxdm",
        },
        {
          id: 7,
          label: "事发单位：",
          contentKeys: "bsdw",
        },
        {
          id: 8,
          label: "接报时间：",
          contentKeys: "jbsj",
        },
        {
          id: 9,
          label: "上报时间：",
          contentKeys: "bssj",
        },
        {
          id: 10,
          label: "上报人：",
          contentKeys: "bsr",
        },
        {
          id: 11,
          label: "上报人电话：",
          contentKeys: "bsdwlxdh",
        },
        {
          id: 12,
          label: "死亡人数：",
          contentKeys: "swrs",
        },
        {
          id: 13,
          label: "伤亡总数：",
          contentKeys: "swzs",
        },
        {
          id: 14,
          label: "受伤人数：",
          contentKeys: "ssrs",
        },
        {
          id: 15,
          label: "失踪人数：",
          contentKeys: "szrs",
        },
        {
          id: 16,
          label: "疏散人数：",
          contentKeys: "ssqzrs",
        },
        {
          id: 17,
          label: "直接经济损失：",
          contentKeys: "zjjjss",
        },
        {
          id: 18,
          label: "上报单位：",
          contentKeys: "sbdw",
        },
        {
          id: 19,
          label: "接报内容：",
          contentKeys: "fsyy",
        },
      ],
    }
  },
  mounted() {
    console.log(this.detailObj);
  },
  methods: {
    close() {
      this.$emit('eventClose', false)
    },
  }
}
</script>

<style lang='less' scope>
@import '../../../../common.less';

.event-detail {
  .event-pop {
    width: 1200px;
  }
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
      padding: 13px 32px 13px 0;
      color: white;
      .li-label {
        width: 188px;
        flex-shrink: 0;
        label {
          display: inline-block;
          width: 100%;
          text-align: right;
          font-size: 31px;
        }
      }
      .li-content {
        font-size: 31px;
      }
    }
    li:first-child {
      width: 100%;
    }
    li:last-child {
      width: 100%;
    }
  }
}
</style>