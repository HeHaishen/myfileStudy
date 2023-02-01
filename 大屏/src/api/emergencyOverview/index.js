/*
 * @Description: 应急概览一张图-api
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-22 15:40:29
 * @LastEditTime: 2021-09-29 11:23:42
 */
import request from "@/request/request.js";
//坐标点- 队伍所带物资、装备、人数详情
const serverName = `/big-screen` // 测试环境
const serverNameOther = `/idsm`; // 测试环境

// 一屏订全城市
export function getAllCityInfo(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/waterloggingPoint/findEquiNum`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 应急资源概览
export function getAllEmergencyOverview(data) {
  console.log(data);
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/responseTeamInstance/findResourcesOverview`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
//公共方法
export function commonApi(data,code) {
  return request({
    url: `${serverNameOther}/api/indicator/data/${code}`,
    method: "post",
    data,
  });
}
// 视频分组，这个接口已废弃
export function getVideoInfo(data) {
  return request({
    url: `${serverName}/api/waterloggingPoint/findBigChannelsForZM`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

export function getIndicator(codes, data) {

  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/${codes}`,
    method: "post",
    data,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}



export function getRiskPreview(data) {

  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/goPUFp2M`,
    method: "post",
    data,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}

export function getFile(fileId) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/doc/api/store/preview/public/${fileId}`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 舆情监测-日报、周报、月报
export function getPublicMonitor(codes,data) {

  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/${codes}`,
    method: "post",
    data,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
