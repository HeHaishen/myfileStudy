<!--
 * @Description: 切换地图图层
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-29 16:52:18
 * @LastEditTime: 2021-10-30 17:17:33
-->
<template>

  <div class="all-icons-box change-map-layer" @click.stop.prevent="layerClick($event)" title='切换影像'>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="38px" height="38px" viewBox="0 0 38 38" enable-background="new 0 0 38 38" xml:space="preserve">
      <image id="image0" width="38" height="38" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAQAAAACNCElAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN
RQflCh4PEAg/bsXCAAADUklEQVRIx42W32tURxTHv7suxbq7kgj6IFGLGGP9LTRghKIQEVHrS/FX
oUWtYKGKJvpSFRHRP6AKgrSFUilUH0QopUEMFCuixETwR/xJW0ygNDXaze42Lln348Od3dw7d+5d
z7zcOfM93zln5s45J4EiZaHatUJzNUNpSUUN6LGuq1v3Ii1wjQyd3CVK7tFJxmUXVqXYx3MnyRNu
8Mp8P2cfqXpkzdyK9KjEbNJso4sKAL20xJFtIE+cLDe4pVwBIM/GKLLtlGOIHrIysPEOikCZ7S6y
jbFUcDZ0ugsZBMrj3lUXWhghXo477m8WA0CeeX6yFH3Uky+cP9EiCsBt72Y9VUcdohIXmOwkE58B
0FklyzIcS3WJhggib3QBL8iipKTdmqI4aVBa0hr9o1dqCK2m9K0qatRu7zn11z0vKAJwxuHXzwbx
AInFb0HlSY5pIarpvvWlSa3W28pJDYV0Rd93e1JtkvJ6oQvao94Yqmc6FdJldd43Wy7uAKeN021W
YCOc5z5jAPwYCnES1wPou0k1SfrDcBesVHdOW7RA7+gnSY0hv06pLTBvEmPALrPXvMBO82sZayYF
fg8lq9dWHOWkJClhuP8O7DRZ5dp5HdYzy6+1StpJO6W8GpU105yeao7vZx2Xr2uYqpRCYReSGpA0
u6b4xrc4KQDNW6YXlbM0gxOOtWu+RvW9UdxQXhM1UwlJL9WqPVqgPocX0v/q1+ZAqFdFJzDKu4HD
Xceo72D/Ym3EE/80cAEHqs/pYwt2yLqpEyScdN/5MEuEuA/8YoEmspUPuOqD/mB57433qFCmBPR7
+ewgUGGxA9ob8O4/3ndgvuRzKsBBjyzDMHDZAfzTCvY3jjA1hLoMDJOtpu39AP6iZUa3IxH96kzb
Hf6CcgsosMgCtlIKkXU5Ckqfv6CIuYwAA8yy6LZa1XSIOaFSN1JtE+wiPBjy7qNAy7DKtxJZhIXY
xhhQZKdFt4Scobrp03rtwRifjOuCZuuNWTfLAvpqyTlq5stM45Jjgx9n318zPQBU6GJTraW7acg+
JMOmWkvVQ3PQOvxvTWAvQ8a4xDXO8BWPzPxO7Xb/ZW/9Zs8bafbHVNN+Oki77BKxDfJqtapFTcpI
KmhQj9SjK9EN8huCsUnFIweq8QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0zMFQxMjoxNjow
OCswMzowMD3QeMMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMzBUMTI6MTY6MDgrMDM6MDBM
jcB/AAAAAElFTkSuQmCC" />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    layerClick($event) {
      let right = window.innerWidth - $event.clientX - $event.offsetX;
      let top = $event.clientY + $event.offsetY + 25;
      let mainToolbar = document.getElementsByClassName('crystal-viewer-toolbar')[0];
      mainToolbar.style.top = top + "px";
      mainToolbar.style.right = right + "px";
      if (
        $(
          ".crystal-viewer-toolbar .crystal-baseLayerPicker-dropDown.crystal-baseLayerPicker-dropDown-visible"
        ).length > 0
      ) {
        $(
          ".crystal-viewer-toolbar .crystal-baseLayerPicker-dropDown.crystal-baseLayerPicker-dropDown-visible"
        ).removeClass("crystal-baseLayerPicker-dropDown-visible");
      } else {
        $(
          ".crystal-viewer-toolbar .crystal-baseLayerPicker-dropDown"
        ).addClass("crystal-baseLayerPicker-dropDown-visible");
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
.change-map-layer {
  top: 163vh * @h;
  right: 1371vw * @w;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
