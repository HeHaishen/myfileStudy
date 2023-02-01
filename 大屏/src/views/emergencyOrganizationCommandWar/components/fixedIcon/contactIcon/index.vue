<!--
 * @Description: 地图工具箱
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-29 16:52:18
 * @LastEditTime: 2021-11-09 15:29:17
-->
<template>
  <div class="all-icons-box contact-icon">
    <div style="width: 100%; height: 100%" title="联系人" @click="openContact">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="36px"
        height="33px"
        viewBox="0 0 36 33"
        enable-background="new 0 0 36 33"
        xml:space="preserve"
      >
        <image
          id="image0"
          width="36"
          height="33"
          x="0"
          y="0"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAhCAQAAAAbxMGgAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN
RQflCh4QCAM93WBeAAACfElEQVRIx52VW0gUYRiG310PWQaGWmlBnsqI2jKCiKClm4QoCEkqotCQ
qCC8ScMuIynocCde6UVEBGJYqBWBJQVeJHihhB3ESigJMwrsoK4+Xezs+M/sLDv5/jffvN/HM/83
/2GEfI1tPGWMdgoN7yyfmeYuOQj5w+QySVRvSLe8CmJ6uADKo4lPjNDIUk9QNQsKW94d24mQHgXt
4Ztt9pHpATpu5/sp4Qad1LOGIcv7SyoSRUxhqoNAHCiT91Z2H8NWdI/9VtQUba0Vt857zCmfZnpp
5bRRt5UehrhMGkJBlcut69ricnJVrRS9VUQZhpuvEfUpW6eUKYlp4tXtmE2YH3bmAH+saIKw7Q6z
Uox5gCIsszFZxlJAN4f5DnxgN48Mv0U88wDNsNwGVRj+E0oJcYw6DlLIRl7amQlxwQPUbDR2zna7
KKXfqGonh8HYgyhmzoV5Ze9eJyjEO1dlG5WxMKhRdbrWqFkzitdXrdUGl1epj1Y0mSrppg450mmO
p3YFtEubNKPsOHhAWerVaz1XV3T6bY4J305wdGs8vmYolg1Kki7ql/GeoyqQl9I9vFk7soi1jvd0
eZw3UUYLg0TsqikekBXLxooC9DhQ9QnvpgwK2EEJRaSa/kKYx7gBmqfK590ZBxJhx7mLULlYkKhy
tDfNicWCxCUHap5GUhYHEldcO6Wf7faC1DHEALco9gMSDS7UHI85wxE6jKavsiQ5SNQyTzINsC45
SNQwmxQ1braY+POVGxdsIvX6AYnNjCZFrfIDEqtdBydeK/yBRJAGfifEvPDXWmysNxbeufPL/g8k
xN64v80sJ/0sv9cIcY0+fjLPF+6z05n9BwlL354YZtfLAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIx
LTEwLTMwVDEzOjA4OjAzKzAzOjAwPQYazwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0xMC0zMFQx
MzowODowMyswMzowMExbonMAAAAASUVORK5CYII="
        />
      </svg>
    </div>
    <div>
      <pop-up-layer
        :show="isOpenAbs"
        @doClose="close"
        opsition="pageCenter"
        title="邀请人员"
        ref="myPopUpLayer"
      >
        <div slot="content" class="upLayer_content">
          <AbsBox @change="changeAbs" />
        </div>
      </pop-up-layer>
    </div>
  </div>
</template>

<script>
import AbsBox from "../../absBox/index.vue";

export default {
  components:{AbsBox},
  data() {
    return {
      isOpenAbs:false
    };
  },
  methods: {
    openContact(){
      this.isOpenAbs = true;
    },
    close(){
      this.isOpenAbs = false
    },
    changeAbs(){},
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
.contact-icon {
  top: 310vh * @h;
  right: 1029vw * @w;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
