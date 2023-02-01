"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lowLayer = exports.scaleMinix = void 0;

/*
 * @Description:
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: jiajun wu
 * @Date: 2021-11-02 14:33:44
 * @LastEditTime: 2021-11-11 20:03:16
 */
var scaleMinix = {
  data: function data() {
    return {
      widthScrac: ""
    };
  },
  mounted: function mounted() {
    this.$nextTick(function () {// this.initScale();
    });
  },
  methods: {
    initScale: function initScale() {
      var callBack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      try {
        var heightClint = document.querySelector("body").clientHeight;
        var widthClint = document.querySelector("body").clientWidth;
        var columnNum = parseFloat((heightClint / 2140).toFixed(2)); // 计算比例

        var widthScrac = parseFloat((widthClint / 10240).toFixed(2)); // 宽度

        var leftDiv = document.querySelector(".left");
        /*  console.log(
           'document.querySelector(".left")111',
           document.querySelector(".left").getBoundingClientRect()
         ); */

        var rightDiv = document.querySelector(".right");
        leftDiv.style.transform = "scale(".concat(widthScrac, ",").concat(columnNum, ")");
        this.widthScrac = widthScrac;
        leftDiv.style.transformOrigin = "0 0";
        rightDiv.style.transform = "scale(".concat(widthScrac, ",").concat(columnNum, ")");
        rightDiv.style.transformOrigin = "top right";
        var bigHeaderScal = document.getElementById("big_header_scal");
        var homeIcons = document.getElementById("home_icons");

        if (bigHeaderScal) {
          var h = bigHeaderScal.clientHeight;
          leftDiv.style.top = h * columnNum + "px";
          rightDiv.style.top = h * columnNum + "px";
        }

        if (homeIcons && bigHeaderScal) {
          var _h = bigHeaderScal.clientHeight;
          homeIcons.style.top = _h * columnNum + 20 + "px"; // homeIcons.style.width = widthClint - (4400 * widthScrac) + 'px'

          homeIcons.style.transform = "scale(".concat(widthScrac, ",").concat(columnNum, ")");
          homeIcons.style.transformOrigin = "top right";
        }

        callBack({
          height: columnNum,
          width: widthScrac
        });
      } catch (error) {
        if (error) {
          callBack();
        }

        console.warn(7777777, error);
      }
    }
  }
};
exports.scaleMinix = scaleMinix;
var lowLayer = {
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    this.$nextTick(function () {});
  },
  methods: {
    setLowLayer: function setLowLayer() {
      var callBack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var heightClint = document.querySelector("body").clientHeight;
      var widthClint = document.querySelector("body").clientWidth;
      var columnNum = parseFloat((heightClint / 2140).toFixed(2)); // 计算比例

      var widthScrac = parseFloat((widthClint / 10240).toFixed(2)); // 宽度

      var headerDiv = document.querySelector(".picture-header"); // 头部

      var innerDiv = document.querySelector(".big-content");
      /*   console.log(
          'document.querySelector(".left")2222',
          document.querySelector(".left").getBoundingClientRect()
        ); */

      var cModelBoxLeftWidth = document.querySelector(".left").getBoundingClientRect().width;
      var cModelBoxRightWidth = document.querySelector(".right").getBoundingClientRect().width; // 计算地图宽度

      document.querySelector(".center").style.width = innerDiv.clientWidth - (cModelBoxLeftWidth + cModelBoxRightWidth) + 3500 * widthScrac + "px";
      var cModelBoxHeight = innerDiv.clientHeight;
      console.log("cModelBoxLeftWidth", cModelBoxLeftWidth, "cModelBoxRightWidth", cModelBoxRightWidth, "cModelBoxHeight", cModelBoxHeight);
      var headerLayerObj = {
        width: headerDiv.clientWidth + "px",
        height: headerDiv.clientHeight + "px",
        position: "fixed",
        top: 0,
        left: 0,
        "background-image": "linear-gradient(to bottom, rgba(20, 27, 53, 1), rgba(20, 27, 53, 1), rgba(20, 27, 53, 0.9),rgba(20, 27, 53, 0.8),rgba(20, 27, 53, 0.7), rgba(20, 27, 53, 0.7))",
        // "background-image":
        //   "linear-gradient(to bottom, #182734, #182734, #182734,#182734,#182734, rgba(20, 27, 53, 0.4))",
        "box-shadow": "0 0 190px rgba(20, 27, 53, 1)",
        "z-index": 1000
      };
      var leftLayerObj = {
        width: cModelBoxLeftWidth - 500 * widthScrac + "px",
        height: cModelBoxHeight + "px",
        position: "fixed",
        top: 0,
        left: 0,
        "background-image": "linear-gradient(to right, rgba(20, 27, 53, 1), rgba(20, 27, 53, 1), rgba(20, 27, 53, 1),rgba(20, 27, 53, 1),rgba(20, 27, 53, 1),rgba(20, 27, 53, 1),rgba(20, 27, 53, 0.9),rgba(20, 27, 53, 0.8),rgba(20, 27, 53, 0.7),rgba(20, 27, 53, 0.6),rgba(20, 27, 53, 0.5), rgba(20, 27, 53, 0.4))",
        // "background-image":
        //   "linear-gradient(to bottom, #182734, #182734, #182734,#182734,#182734, rgba(20, 27, 53, 0.4))",
        "box-shadow": "0 0 260px rgba(20, 27, 53, 0.4)",
        "z-index": 8000
      };
      var rightLayerObj = {
        width: cModelBoxRightWidth - 500 * widthScrac + "px",
        height: cModelBoxHeight + "px",
        position: "absolute",
        right: 0,
        top: 0,
        "background-image": "linear-gradient(to left, rgba(20, 27, 53, 1), rgba(20, 27, 53, 1), rgba(20, 27, 53, 1),rgba(20, 27, 53, 1),rgba(20, 27, 53, 1),rgba(20, 27, 53,0.9),rgba(20, 27, 53, 0.8),rgba(20, 27, 53, 0.7),rgba(20, 27, 53, 0.6),rgba(20, 27, 53, 0.5), rgba(20, 27, 53, 0.4))",
        // "background-image":
        //   "linear-gradient(to bottom, #182734, #182734, #182734,#182734,#182734, rgba(20, 27, 53, 0.4))",
        "box-shadow": "0 0 260px rgba(20, 27, 53, 0.4)",
        "z-index": 8000
      };
      var headerLayerDiv = document.createElement("div");
      var leftLayerDiv = document.createElement("div");
      var rightLayerDiv = document.createElement("div");

      for (var k in headerLayerObj) {
        headerLayerDiv.style[k] = headerLayerObj[k];
        leftLayerDiv.style[k] = leftLayerObj[k];
        rightLayerDiv.style[k] = rightLayerObj[k];

        if (k === "z-index") {
          innerDiv.appendChild(headerLayerDiv);
          innerDiv.appendChild(leftLayerDiv);
          rightLayerDiv.style.right = 0;
          innerDiv.appendChild(rightLayerDiv);
        }
      } // const homeIcons = document.getElementById("home_icons");
      // const scraceTree = document.getElementById('is_scrace_tree');
      // if (homeIcons && scraceTree) {
      //   console.log(scraceTree.style.left ,'scraceTree.style.left 0---');
      //   if (scraceTree.style.left + 20 >= cModelBoxLeftWidth - 500 * widthScrac) {
      //     homeIcons.style.left = scraceTree.style.left + 20 + 'px';
      //   } else {
      //     homeIcons.style.left = cModelBoxLeftWidth - 500 * widthScrac + 'px';
      //   }
      // }


      callBack();
    }
  }
};
exports.lowLayer = lowLayer;