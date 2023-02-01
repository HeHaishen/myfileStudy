/*
 * @Description:
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-06-09 21:33:56
 * @LastEditTime: 2021-08-27 16:42:53
 */
import request from "@/request/request.js";
const serverName = `/big-screen`; // 测试环境
//坐标点- 队伍所带物资、装备、人数详情
export function getTeamInfo(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/responseTeamInstance/teamPositionInfo?eventId=2521067874866184192`,
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
// 事件下派任务管理详情
export function eventTaskSendDetail(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/ers/emergency-anon/ondutyCommand/detail`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 火灾队伍年度统计
export function yearsStaticsFire(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `${serverName}/api/responseTeamInstance/fireAccidentCount?eventId=${data["body"].sid}`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 获取事件详情
export function getEventDetail(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/ers/emergency-anon/ondutyEvent/findEvent`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 获取到达队伍
export function getArriveTeam(data) {
  return request({
    url: `/big-screen/api/responseTeamInstance/ranks`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// }
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
// 获取当前队伍情况-根据队伍Id
export function getTeamDetail(data){
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/big-screen/api/responseTeamInstance/responseTeamStaff?sid=${data.sid}`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 根据队伍Id获取队伍人员
export function getTeamMembers(data){
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/big-screen/api/responseTeamInstance/responseStaffInfo?sid=${data.teamId}`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 应急专家
export function getExpertDetail(data){
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/big-screen/api/responseTeamExpert/find`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 获取广州实况天气
// 
export function getNowWeater(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/weather/api/live/findWeatherLiveHours`,
    method: "POSt",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 获取广州24小时天气情况
export function oneDataWeater(data){
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/weather/api/live/get24HoursWeatherLive/440100000000`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 获取7天天气
export function getSeventDayWeater(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/weather/api/forecast/findWeatherForecasts`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
