/*
 * @Description: 龙舟水-战时
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-06-10 14:01:54
 * @LastEditTime: 2021-06-28 21:02:05
 */
import request from "@/request/request.js";
//坐标点- 队伍所带物资、装备、人数详情
const serverName = `/big-screen` // 测试环境
// const serverName = ``
export function getTeamInfo(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/responseTeamInstance/teamPositionInfo?eventId=2521067874866184192`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 获取物联网设备
export function getIotDevice(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/iotVideo/iotEquipmentCount`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 选中应急队伍获取远程数据
export function choseTeamGetDatas(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/responseTeamInstance/teamPositionInfo?eventId=2521067874866184192&sid=${data}`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 查询内涝点
export function searchWaterlogging(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/waterloggingPoint/find`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 左侧事件列表
export function leftEventList(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/ers/emergency-anon/ondutyEvent/findEvent`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 点击事件显示事件详情
export function leftEventDetail(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/ers/emergency-anon/ondutyEventIec/findEventIec`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 获取地图点击类型
export function fileTypeLon(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/waterloggingPoint/fileTypeLon`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//获取天气预报数据
export function getWeather(areaSn, data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/weather/api/live/get24HoursWeatherLive/` + areaSn,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//获取天气预报数据-未来七天
export function getWeatherSeven(areaSn, data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/weather/api/forecast/getNext7DayWeatherForecast/` + areaSn,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//当前实况气象
export function getNowWeather(areaSn, data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/weather/api/live/getWeatherLive/` + areaSn,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 查询装备
export function geteQuipment(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/ers/emergency/equipmentManage/find`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 查询设施
export function getFacilities(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/ers/emergency/storageManage/find`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 查询应急人员
export function getTeamPerson(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/responseTeamInstance/responseStaffInfo`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 查询应水位监测
export function getWaterLevel(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/waterLevel/find`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 获取应急预案
export function getEmergencyPlan (data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/emergencyPlan/find`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 查询应急预案详情
export function emergencyDetail (data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/emergencyPlan/detail/${data.sid}`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}