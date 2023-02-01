/*
 * @Description: 森林防火-平时
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Aidam_Bo
 * @Date: 2021-06-09 21:33:56
 * @LastEditTime: 2021-11-06 16:37:44
 */
import request from "@/request/request.js";
// 全市植被统计
const serverName = `/big-screen` // 测试环境
export function vegetationCount(data) {
    return request({
      url:`${serverName}/api/vegetation/cityVegetationCount`,
      method: "get",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
  }
// 当前救灾物资
export function nowDisasterRelief(data) {
  return request({
    url:`${serverName}/api/responseTeamInstance/currentMaterialCount?eventId=2521067874866184192`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 当前队伍救火情况
export function nowFireBrigade(data) {
  return request({
    url:`${serverName}/api/responseTeamInstance/responseTeamStaff?eventId=2521067874866184192`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 当前火灾专家情况
export function nowTeamExpert(data) {
  return request({
    url:`${serverName}/api/responseTeamInstance/responseTeamExpert?eventId=2521067874866184192`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 当前火灾专家情况-变更
export function nowTeamExpertChange(data=null) {
  return request({
    url:`${serverName}/api/responseTeamExpert/find`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data:data?data:{body:{},page: 1, pageSize: 10, sortName: 'sid',sortOrder: 'desc'}
  });
}
// 物联点数据实时展示
export function iotVideoCount(data) {
  return request({
    url:`${serverName}/api/iotVideo/iotVideoCount`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 全国主要城市火灾趋势图
export function fileCountByCity(data) {
  return request({
    url:`${serverName}/api/File/fileCountByCity`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 全市历年火灾趋势图
export function fileCountByYear(data) {
  return request({
    url:`${serverName}/api/File/fileCountByYear`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 当前蓄水情况
export function reservoirCountByMonth(data) {
  return request({
    url:`${serverName}/api/reservoir/reservoirCountByMonth`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 全市水资源统计
export function cityVegetationCount(data) {
  return request({
    url:`${serverName}/api/reservoir/cityVegetationCount`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
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


//图层规划数据结构
export function getDatainfo(areaSn, data) {
  return request({
    url: `/idsm/api/indicator/data/${areaSn}`,
    method: "POST",
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
// 获取水库树
export function getThreeListApi(data) {
  return request({
    url: `/idsm/api/indicator/data/${data.codes}`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data: { body: { ...data.send } },
  });
}