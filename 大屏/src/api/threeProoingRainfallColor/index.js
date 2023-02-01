/*
 * @Description:广州市雨量分布图
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-18 11:52:22
 * @LastEditTime: 2021-09-27 10:35:15
 */
import request from "@/request/request.js";
// 查询广州市雨量分布
export function getGZRainfall(data) {
  return request({
    url: `/gzswqx/Service/QXFW.svc/GetGZSWReport`,
    method: "post",
    data,
  });
}
// export function getGZRainfall(data) {
//   return request({
//     url: `/idsm/api/indicator/data/n7qugAkd`,
//     method: "post",
//     data,
//   });
// }
