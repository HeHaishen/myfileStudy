/*
 * @Author: pengyuanzhen
 * @Date: 2021-09-18 15:30:17
 * @LastEditTime: 2021-09-18 15:33:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\api\threeProoingWindDatas\index.js
 */

// 全市自动站风速实况前10位站点
import request from "@/request/request.js";
export function getGZWindApi(data, code) {
  return request({
    url: `/idsm/api/indicator/data/${code}`,
    method: "post",
    data,
  });
}
