/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-08-04 16:00:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-24 16:19:12
 */
import request from "@/request/request.js";
const serverName = `/big-screen` // 测试环境
//事件列表
export function transactionList(data) {
    return request({
      // url: "/api/responseTeamInstance/ranksResourcesCount",
      url: `/ers/emergency-anon/ondutyEvent/findEvent`,
      method: "post",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      data,
    });
  }


  export function fileTypeLon(data) {
    return request({
      // url: "/api/responseTeamInstance/ranksResourcesCount",
      url: `${serverName}/api/waterloggingPoint/fileTypeLon`,
      method: "get",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      data,
    });
  }

//  封装api
export function indicatorCodes(codes,data) {
  return request({
    url: `/idsm/api/indicator/data/${codes}`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}


// 查询重点水库信息
export function findKeyReservoir(data) {
  return request({
    url:`/big-screen/api/reservoir/find`,
    method: "post",
    data
  });
}

// 应急人员 lvueDz9j

// 应急专家  iKJAJFEf
