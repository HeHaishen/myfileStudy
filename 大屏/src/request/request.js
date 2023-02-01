/*
 * @Description:请求
 * @Version: 1.0
 * @Autor: sude
 * @LastEditors: hehaishen
 * @Date: 2021-06-01 15:40:52
 * @LastEditTime: 2021-11-08 10:24:12
 */
import Vue from "vue";
import axios from "axios";
import router from "@/router";
import Cookies from "js-cookie";
import { TokenKey } from "@/config";
import message from "ant-design-vue/es/message";

let prefix = "";
if (Cookies.get("paasid")) {
  prefix = "/" + Cookies.get("paasid");
}

function openMessage(msg) {
  return;
  console.log(msg);
  message.error(msg);
}

// 创建axios实例
const service = axios.create({
  baseURL: prefix,
  timeout: 25000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (Cookies.get(TokenKey)) {
      config.headers[TokenKey] = Cookies.get(TokenKey);
    }
    config.headers["X-Axios-With"] = true;
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const code = response.status;
    if (code < 200 || code > 300) {
      openMessage(response && response.data.message);
      return Promise.reject("error");
    } else {
      if (code === 200) {
        if (response.config.responseType == "blob") {
          return response;
        } else if (
          response &&
          response.data.status &&
          response.data.status == 1000
        ) {
          return response.data;
        } else if (response && response.data.success) {
          return response.data;
        } else {
          return response.data;
          // openMessage(response && response.data.message);
          // return Promise.reject('error');
        }
      } else {
        openMessage(response && response.data.message);
        return Promise.reject("error");
      }
    }
  },
  (error) => {
    let code = 0;
    try {
      code = error.response.status;
    } catch (e) {
      if (error.toString().indexOf("Error: timeout") !== -1) {
        openMessage("网络请求超时");
        return Promise.reject(error);
      }
      if (error.toString().indexOf("Error: Network Error") !== -1) {
        openMessage("网络请求错误");
        return Promise.reject(error);
      }
      if (
        error
          .toString()
          .indexOf("Error: Request failed with status code 404") !== -1
      ) {
        openMessage("网络请求链接错误");
        return Promise.reject(error);
      }
    }
    openMessage(
      error.response && error.response.data
        ? error.response.data.message
        : error.response.status
    );
    // openMessage(error.response.status)
    return Promise.reject(error);
  }
);
export default service;
