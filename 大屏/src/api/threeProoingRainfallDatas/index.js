/*
 * @Author: pengyuanzhen
 * @Date: 2021-09-18 15:30:17
 * @LastEditTime: 2021-09-18 17:55:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\api\threeProoingWindDatas\index.js
 */

// 广州市雨量数据表
import request from "@/request/request.js";
export function getGZRainApi(data,code) {
  return request({
    url: `/idsm/api/indicator/data/${code}`,
    method: "post",
    data,
  });
}
