<!--
 * @Description: 地图工具箱
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-29 16:52:18
 * @LastEditTime: 2021-11-11 22:55:42
-->
<template>
  <div class="all-icons-box event-icon">
    <div style="width:100%;heigt:100%;" title="更多事件" @click="doMoreEvent">

      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve">  <image id="image0" width="36" height="36" x="0" y="0"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
    AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN
    RQflCwEHKxglYgVfAAACcUlEQVRIx62WTUgUYRjHf2O7mGuUH5SHIoRAkq5CpBLUwdqgWyfBQ0XE
    VlAXJTLwIBgGamDuoYgu0SEIog4KBQnVoSAKCoPKPizCFil1QdvW9d9hdHdm551dZ+n/XOZ9n5nf
    Ph/vPLMIob16oF8KpkW90lmFhW0InVMmICSnx4rYIEvNPKGMJcb4QRBV0EYdEOc0ALonKa19qyEG
    sCq9lpRWjZ3ajKS7JWAQapckRYUooxb4GSipnKYAqAYoKxHhUchxvYOjrnUhfeCGP2iYaIAQ3vLc
    uXSmNs5ygOp88Y/oMlcpXyNoFvmDYIGFAMm59N+65gZVUu2xTVnvAaZY5AqWkSRJiguhbp8Xc1QI
    1Wbnw4nsyW6VJLXbJzunZp+oW7CAHvsEA71s9N7kLPYZjhH2hswYopFYdqeO81wolFohG80bavWF
    UvNXlIMAPGSENLCe/lIiCmlCkvRbYaGbkqRltbgjctaogRgRR22ecguAGI0AzJMGpgGwGGI302RY
    541o1NP47UI1mllZfRVCl7LeDqHrpho9YsmV9UsSQA+1PpXrI0I38/bCCRogjOWwJv6w09H2fG2j
    kwS9XpBJA4aTlVMXWxnmY3FQG4cK+iP0keJFMVCIQYqpg6biqZ1kVx4YyBt9FkMrV8r4HMiqbNtz
    iqlVU57dI/YH8pukZwbQ4Jq//59ULtA1SdJFhVyYBv01PJLUdyOqS6B6za68SZOa1KQmtFnovuH2
    lOoV0rjBM6ct9r+jhGOzX2i/8XeTqhS6Y/TFLQFUcZxWNgAp2plnhFPGPr7hM4eNMztpHhyday70
    qt6ZQRW6rVQAzHvt+QcCJZxFe4ySpwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMS0wMVQwNDo0
    MzoyNCswMzowMDjRBioAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTEtMDFUMDQ6NDM6MjQrMDM6
    MDBJjL6WAAAAAElFTkSuQmCC" />
    </svg>
    </div>
    <pop-up-layer
      :show="moreShow"
      @doClose="moreClose"
      opsition="pageCenter"
      title="应急事件-更多"
      ref="myPopUpLayer"
    >
      <div slot="content" class="upLayer_content">
        <UpView />
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import UpView from "./upView.vue"
export default {
  components:{
    UpView
  },
  data() {
    return {
      moreShow:false
    };
  },
  methods: {
    doMoreEvent(){
      this.moreShow = !this.moreShow
    },
    moreClose(){
      
      this.moreShow = false
    }
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
.event-icon {
  /* top: 524vh * @h;
  right: 1029vw * @w; */
  top:0px;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
