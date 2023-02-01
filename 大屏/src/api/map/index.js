/*
 * @Description: 指标接口 
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-10 16:13:31
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-13 21:30:18
 */
import request from "@/request/request.js";

/** 获取指标接口
 *  @param {String} code 指标code
 *  @param {Object} data api 参数
 */
export function getIdsmApi(code, data) {
  return request({
    url: `/big-screen/api/channels/${code}`,
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset-UTF-8"},
    data,  
  });
}

export function figurePosition(code, data) {
  return request({
    url: `/big-screen/api/figurePosition/${code}`,
    method: "post",
    headers: { "Content-Type": "application/json;charset-UTF-8"},
    data,  
  });
}

export function figurePositionDelete(code, data) {
  return request({
    url: `/big-screen/api/figurePosition/${code}`,
    method: "DELETE",
    headers: { "Content-Type": "application/json;charset-UTF-8"},
    data,  
  });
}
