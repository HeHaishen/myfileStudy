<!--
 * @Description: 清除地图打点
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: jiajun wu
 * @Date: 2021-10-29 16:52:18
 * @LastEditTime: 2021-11-11 17:14:08
-->
<template>
  <div class="all-icons-box icon_clear-map" title="清除地图点" @click="doClearMap">
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="42px"
      height="36px"
      viewBox="0 0 42 36"
      enable-background="new 0 0 42 36"
      xml:space="preserve"
    >
      <image
        id="image0"
        width="42"
        height="36"
        x="0"
        y="0"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAkCAQAAABVwGCgAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN
RQflCh0PBgw2LhviAAACa0lEQVRIx62WzUtUURjGn7Exr02TtYhQs6RFBUkfikWCIOQiiBYZTNEu
qn8gqFVtrGgVItTGha0CCYQg041gNhsJCfogNIwaMFIiiNFxnBz7tXDMe+eeO/fq7Tmb8/Hch/Oe
5z3nvUKhWpRbfCNFr302nKTYyhgr6Ph/otv5VRCdJ7Y6WyYzmtWiIOhQVaEXU0oDqlGt+k0B7SBB
jkE2+eyykknyODHGBB/d1B7S/ATglY/oWcwYddI6ecTiv8U8lSVF93OeBj65RJ87aVOOxZSvTReY
dUl2Ydkph8gWEb5w21Mwwk3ShuAHUFRxNWpa1xRXi6wib+vVqbS6Da6/0S7VGPNhSRIvKI2U4WQj
DHmw+9iGovruk4l7NKNxzSipHv1RRK06oBadNjDn9EB9SkviOkHxjm4mjCs5AO6tXdMbgUW9MMcl
MvSyZVU0wm591uZAV9IM1K4a1em+Y442Y2oERScWTZS5n76RUOEPkydpfylWXqnyEOFLpzSuNi07
w++w3feNIEutM4/LJKVD7tTSsKJF5iHuhk6ro26jLBJMhxIdMxe+VmZCiC7SWOy+JCV1WbkNn+tv
Na0N7IVvSM3q0pSWlV+3aFwHi42ytzgX2cckAC+Z5Wug8HMc9q/7DTymFVFBnasemPDMbJRXq2Ip
gOg5ytcj+jSA5Cw7ec2JoKKxAFc4wxGOA01+vz2ryKhOCyUZCzqjt6pQVhPe7rvbILDEez5wlSeO
Pf6gi2OFUphYz5mKavp5WOjXM0KSeZYZpZ2I+Ysgoitnax8luFOKHVUwZGz9al2RJUuLXmQ/o0zY
q5Ma9paU/gKCJURnOyhdFgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0yOVQxMjowNjoxMisw
MzowMM5ZPU4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMjlUMTI6MDY6MTIrMDM6MDC/BIXy
AAAAAElFTkSuQmCC"
      />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickNum: 0,
    };
  },
  methods: {
    doClearMap() {
      this.clickNum += 1;
      this.$emit("doClearMap", { clickNum: this.clickNum });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
.icon_clear-map {
  // top: 200px;
  // right: 3450px;
   top: 0px;
  // right: 3450px;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
