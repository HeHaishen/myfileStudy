/*
 * @Description: 拨打电话
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-12 10:09:30
 * @LastEditors: chenmeiqi
 * @LastEditTime: 2021-11-05 16:57:47
 */
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";

export default {
  components: { ContactPhone, MessageSend },
  data() {
    return {};
  },
  mounted() {
    window.clickTeamMessage = this.clickTeamMessage;
    window.clickTeamPhone = this.clickTeamPhone;
  },
  methods: {
    // clickMobilePhone(record, e) {
    //   let { name, phone } = record;
    //   console.log(e,'e');
    //   this.$refs.ContactPhone.$emit("show", {
    //     saveEvent: e,
    //     opsition: "pageCenter",
    //     name: name,
    //     phone: phone,
    //   });
    // },

    // clickMessage(record, e) {
    //   console.log(record, 'clickMessage');
    //   let { name, phone } = record;
    //   // return
    //   this.$refs.MessageSend.$emit("show", {
    //     saveEvent: e,
    //     opsition: "pageCenter",
    //     name: name,
    //     phone: phone,
    //   });
    // },
    clickMobilePhone(record, e, number) {
      let { jgmc } = record;
      let phone = number;
      if (number.includes("(")) {
        phone = number.split("(")[0];
      } else if (number.includes("（")) {
        phone = number.split("（")[0];
      }
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnRight",
        name: jgmc,
        phone: phone,
      });
    },

    message(record, e, number) {
      console.log(record, "clickMessage");

      let { jgmc } = record;
      let phone = number;
      if (number.includes("(")) {
        phone = number.split("(")[0];
      } else if (number.includes("（")) {
        phone = number.split("（")[0];
      }
      // return
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnRight",
        name: jgmc,
        phone: phone,
      });
    },
  },
};
