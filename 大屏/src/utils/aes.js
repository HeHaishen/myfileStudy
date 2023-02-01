/*
 * @Description:加密
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-06-09 16:20:52
 * @LastEditTime: 2021-06-09 17:27:02
 */
import store from "@/store";
const CryptoJS = require("crypto-js");

// 定义加/解密的 key 需要16的倍数
let key = CryptoJS.enc.Utf8.parse(
  '225a045fe41cb19a065f3ea36a065c5a'
);

// aes加密
export function encrypt(text) {
  return CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
}

// aes解密
export function decrypt(text) {
  try {
    let result = CryptoJS.AES.decrypt(text, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return JSON.parse(CryptoJS.enc.Utf8.stringify(result));
  } catch {
    return {};
  }
}
