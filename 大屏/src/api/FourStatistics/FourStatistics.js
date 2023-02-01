/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-10-10 17:18:45
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-10-10 17:29:51
 */
import request from "@/request/request.js";
export function FourStatisticsApi(code,data) {
    return request({
      url: `/idsm/api/indicator/data/${code}`,
      method: "post",
      data,
    });
  }