import request from "@/request/request.js";
// 查询水位预警信息
export function findEarlyWarn(data) {
    return request({
      url:`/big-screen/api/waterLevel/find`,
      method: "post",
      data
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

