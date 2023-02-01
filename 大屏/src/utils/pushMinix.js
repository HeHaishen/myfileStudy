/*
 * @Description: 推送混入
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: JiaJun Wu
 * @Date: 2021-08-28 11:56:46
 * @LastEditTime: 2021-11-04 16:42:11
 */
import Cookies from "js-cookie";
export const MessagePush = {
  data() {
    return {
      saveCookie: "",
      url: "",
      pageType: {
        forestFire: {
          // 森林防火平时屏
          channel: "forestFireUsually",
          eventArr: ["event"],
          newData: null,
        },
        floodPreventionWar: {
          // 森林防火战时屏
          channel: "forestFireWartime",
          eventArr: ["event"],
          newData: null,
        },

        dragonBoatNormal: {
          // 龙舟水平时屏
          channel: "dragonBoatWaterUsually",
          eventArr: ["event"],
          newData: null,
        },
        dragonBoat: { channel: "dragonBoatWaterWartime", eventArr: ["event"] }, // 龙舟水战时屏
        CityHiddenDangerFirm: {
          // 隐患一张图
          channel: "hiddenTrouble",
          eventArr: ["YQRdxqlA"],
          newData: null,
        },
        DustAndExplosionNew: {
          // 粉尘一张图
          channel: "dustOneMap",
          eventArr: ["YQRdxqlA"],
          newData: null,
        },
        HazardousChemicals: {
          // 危险化学品一张图
          channel: "dangerousChemical",
          eventArr: ["rmGWpexI", "qWEtyhfg"],
          newData: null,
        },
        majorFestivalsConductor: {
          // 重大节日指挥-800M通信
          channel: "EV4J3vMZ",
          eventArr: ["vEt9KkOc"],
          newData: null,
        },
        emergencyOrganizationCommand: {
          // pc平时态
          channel: "E56CZRNV",
          eventArr: ["12dW752u"],
          newData: null,
        },
        emergencyOrganizationCommandWar: {
          // pc战时态
          channel: "E56CZRNV",
          eventArr: ["GOu7aoP0"],
          newData: null,
        },
        emergencyOrganizationCommandBig: {
          // 大屏平时态
          channel: "E56CZRNV",
          eventArr: ["12dW752u"],
          newData: null,
        },
        emergencyOrganizationCommandWarBig: {
          // 大屏战时态
          channel: "E56CZRNV",
          eventArr: ["GOu7aoP0"],
          newData: null,
        },
      },
      socketIo: null,
      socketIoObject: null, // sockio对象
    };
  },
  created() {
    this.saveCookie = Cookies.get("token");
    console.log("this.$route--随送", this.$route);
    try {
      let urlsSave = 'http://localhost:9999'
      this.url = `/?channel=${this.pageType[this.$route.name]["channel"]
        }&token=${this.saveCookie}`;
      console.log(this.url);
      // this.socketIoObject = io.connect(this.url); //在全局引入-index.html
      this.socketIoObject = new io(this.url);
      this.eventListerThing();
    } catch (err) {
      console.warn(
        "无法链接socket,请在混入中pushMinix.js下pageType中进行配置,",
        err
      );
    }
  },
  watch: {
    pageType: {
      handler(newVal, oldVal) {
        // console.log("获取到新数据", newVal, oldVal);
        // this.changeData(newVal.cmd)
      },
      deep: true,
    },
  },
  methods: {
    initMsg() { },
    // socketIo 各种事件
    eventListerThing() {
      //监听服务器连接事件
      const that = this;
      this.socketIoObject.on("connecting", function () {
        console.log("正在连接");
      });
      this.socketIoObject.on("connect", function (data) {
        console.log(data, that.socketIoObject);
      });
      //监听服务器关闭服务事件
      this.socketIoObject.on("disconnect", function () {
        console.log("断开连接");
      });
      this.socketIoObject.on("error", function (data) {
        console.log("错误消息:" + data.message);
      });
      //监听服务器端发送消息事件
      this.socketIoObject.on("cmd", function (data) {
        console.log("服务器发送的消息是：" + data);
        data.createdTime = new Date().getTime();
        that.pageType[that.$route.name]["newData"] = data;
        that.$store.dispatch("setResponeData", data)
        // console.log(that.$store.getters.responeData);
      });
      this.socketIoObject.on("reconnect", function () {
        console.log("重新连接到服务器");
      });
    },
    // dsocketIo-断开链接
    disconnectSocketIo() {
      this.socketIoObject.disconnect();
      this.socketIoObject = null;
    },
    sendSocketIo() {
      console.log("点击了发送消息，开始向服务器发送消息");
      var msg = "你好！我是客户端1．";
      this.socketIoObject.emit("sendCmd", { cmd: "show", data: msg });
    },
    // 用于数据分发--暂时使用订阅方式（根据页面需要）
    changeData(cmdCode) {
      let routerName = this.$route.name;
      if (routerName === "forestFire") {
        switch (cmdCode) {
          case "event":
            console.log(9999);
            break;
        }
      }
      if (routerName === "CityHiddenDangerFirm") {
        switch (cmdCode) {
          case "YQRdxqlA":
            this.$refs.center.checkDatas();
            break;
        }
      }
    },
  },
  beforeDestroy() {
    this.disconnectSocketIo();
  },
};
