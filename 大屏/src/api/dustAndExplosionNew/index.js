/*
 * @Author: pengyuanzhen
 * @Date: 2021-07-22 15:39:59
 * @LastEditTime: 2021-09-13 15:11:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\api\dustAndExplosionNew\index.js
 */

import request from "@/request/request.js";
const serverName = `/big-screen`; // 测试环境

//公共方法
export function commonApi(data, code) {
  return request({
    url: `/idsm/api/indicator/data/${code}`,
    method: "post",
    data,
  });
}

// 设备列表
export function getEquipmentListApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/waterloggingPoint/findChannels`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 视频分组
export function getVideoInfo(data) {
  return request({
    url: `${serverName}/api/waterloggingPoint/findBigChannelsForZM`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆企业执法检查信息/big-screen/api/waterloggingPoint/findInspect
export function getCheckInformationApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/waterloggingPoint/findInspect`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆企业信息
export function getEnterpriseInfor(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/y93XES94`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 八大行业粉尘涉爆企业
export function getEightInfor(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/dlxnyPru`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 粉尘专项企业
export function getDustIndustry(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/OAmIFdAi`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 区域企业情况
export function getRegionalEnterprises(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/xVVAXH83`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 设备信息 - 摄像头
export function getEquipmentCamera(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/NITTjC61`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 设备信息 - 传感器
export function getEquipmentSensor(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/qVQuS6T3`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 设备信息 - 设备列表
export function getEquipmentListInfor(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/oCQB0fNp`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 企业类型统计
export function getTypesTotal(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/aJQRsTvN`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 重大隐患统计
export function getMajorHazard(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/JsHo9IjH`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 一般隐患统计
export function getGeneralHazard(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/DXndd4dY`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 重大事故统计
export function getMajorAccident(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/NKei5edy`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 一般事故统计
export function getOrdinaryAccident(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/pQyMrLgG`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 各区检查企业情况
export function getSituationEnterprise(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/Hxem4hAo`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 执法文书统计
export function getEnforcementDocument(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/5IsF0LWL`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 企业类型统计
export function getEnterpriseTypeStatistics(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/aJQRsTvN`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 粉尘涉爆 - 八大行业粉尘涉爆企业
export function getEightIndustries(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/b2qAFMeN`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 获取设备列表的弹窗
export function getDeviceListApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/LQcgZPIU`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
