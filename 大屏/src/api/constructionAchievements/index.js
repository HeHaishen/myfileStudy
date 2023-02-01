/*
 * @Author: your name
 * @Date: 2021-08-25 14:34:26
 * @LastEditTime: 2021-08-25 14:41:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\api\constructionAchievements\index.js
 */

import request from "@/request/request.js";

//  封装api
export function indicatorCodes(codes, data) {
  return request({
    url: `/idsm/api/indicator/data/${codes}`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
