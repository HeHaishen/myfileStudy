/*
 * @Author: your name
 * @Date: 2021-08-09 18:42:27
 * @LastEditTime: 2021-09-13 12:09:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\api\theCitysDanger\index.js
 */

import request from "@/request/request.js";
const serverName = `/big-screen`; // 测试环境


//  封装api
export function indicatorCodes(codes, data) {
  return request({
    url: `/idsm/api/indicator/data/${codes}`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}


//公共方法
export function commonApi(data, code) {
  return request({
    url: `/idsm/api/indicator/data/${code}`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 重大危险源-隐患点统计 - 右侧
export function getDangerRightApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/5EFeDuvl`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 重大危险源-隐患点统计 - 雷达图
export function getRadarChartApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/1HaAnTOX`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//  重大危险源-风险信息统计
export function getRiskInformationApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/hOTkyBYW`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//  重大危险源-全市各区重大危险源统计
export function getDistrictsDangerApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/UdYyxfqL`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 重大危险源-全市重大危险源统计
export function getCitysDangerApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/omgrJMsw`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//  全市重大危险源一张图-实时预警信息-本日监测动态
export function getTodayMonitorApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/hM0wsra5`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 全市重大危险源一张图-实时预警信息-本日统计
export function getDayStatisticsApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/N5CoBmCE`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 全市重大危险源一张图-实时预警信息-本月统计
export function getMonthStatisticsApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/fO7vUcvQ`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 全市重大危险源一张图-公共 - 应急预案
export function getEmergencyPlanApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/INGmWT9L`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
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
