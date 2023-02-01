/*
 * @Description:添加联系人--直接会商
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-01 10:55:52
 * @LastEditTime: 2021-09-01 12:06:18
 */

import AddContact from "./list.vue";

const AddContacts = {
  install: function (Vue) {
    Vue.component("AddContacts", AddContact);
  },
};

export default AddContacts;

