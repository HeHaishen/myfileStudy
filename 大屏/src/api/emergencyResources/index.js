/*
 * @Author: peng yuanzhen
 * @Date: 2021-08-11 15:51:13
 * @LastEditTime: 2021-09-03 16:32:44
 * @LastEditors: hehaishen
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\api\emergencyResources\index.js
 */

import request from "@/request/request.js";

//应急资源一张图-统计资源
export function getStatisticalResourcesApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/hFqTLbOp`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
//应急资源一张图-统计资源-详情
export function getStatisticalResourcesDetailApi(codes, data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/${codes}`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 应急资源一张图-应急队伍
export function getEmergencyTeamApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/X0EX684t`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//  应急资源一张图-应急人员
export function getEmergencyCrewApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/lvueDz9j`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//  应急资源一张图-应急队伍-讯录表
export function getRecordTableApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/idsm/api/indicator/data/d0d4EEqp`,
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
    data,
  });
}

// 获取摄像头
export function getVideoListApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",contents: "6666", tels: ["15820330954"]
    url: `/facility/channel/find`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data
  });
}

export function getViedeo(url) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",contents: "6666", tels: ["15820330954"]
    url: `${url}`,
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}

//开始直播
export function startVideo(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",contents: "6666", tels: ["15820330954"]
    url: `/facility/channel/streamStart`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data
  });
}

export function keepVideoLife(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",contents: "6666", tels: ["15820330954"]
    url: `/facility/channel/streamTouch`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data
  });
}

export function stopVideoLife(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",contents: "6666", tels: ["15820330954"]
    url: `/facility/channel/streamTouch`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data
  });
}