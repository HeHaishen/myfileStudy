import request from "@/request/request.js";
// 查询应急事件基本信息列表（分页）
export function findOndutyEvent(data) {
    return request({
      url:`/ers/emergency-anon/ondutyEvent/findEvent`,
      method: "post",
      data
    });
  }
