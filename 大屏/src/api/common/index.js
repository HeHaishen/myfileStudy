/*
 * @Description:
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-08-05 18:00:57
 * @LastEditTime: 2021-10-08 17:15:53
 */
import request from "@/request/request.js";

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
//  获取视频行政机构 http://10.100.100.112/system/basic/area/find
export function getArrTreeList(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/system/basic/area/find`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 根据区获取子集机构
export function getArrTreeChildrenList(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",
    url: `/system/basic/area/children/${data.codes}`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data: { ...data.send },
  });
}
// 发送短信
// /sms/api/msg/send/msg-abs/msg-abs-tmpl
export function sendMessageApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",contents: "6666", tels: ["15820330954"]
    url: `/sms/api/msg/send/msg-abs/msg-abs-tmpl`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data: { ...data.send },
  });
}
// 获取视频标签分类
// /sms/api/msg/send/msg-abs/msg-abs-tmpl
// 危化标签
export function getVideoTaskDangerous(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",contents: "6666", tels: ["15820330954"]
    url: `/itag/api/define/load/DEVICE_CHEMICAL_ENT`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 重点监控路段
export function getVideoCheckSee(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",contents: "6666", tels: ["15820330954"]
    url: `/itag/api/define/load/DEVICE_KEY_MONITOER`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 三防重点监控区域
export function getThreeImportCheckSee(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",contents: "6666", tels: ["15820330954"]
    url: `/itag/api/define/load/DEVICE_THREE_PROOFING`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// /itag/api/define/load/DEVICE_GOVERNMENT_CIRCUM
// 政府周边监控区域
export function getGovOverCheckSee(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",contents: "6666", tels: ["15820330954"]
    url: `/itag/api/define/load/DEVICE_GOVERNMENT_CIRCUM`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 综合类
export function getAllTypeCheckSee(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",contents: "6666", tels: ["15820330954"]
    url: `/itag/api/define/load/DEVICE_COMPOSITE`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 获取摄像头
export function getVideoListApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",contents: "6666", tels: ["15820330954"]
    url: `/facility/channel/find`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 获取地铁线路，如21号线
export function getMetroLineApi(data) {
  return request({
    // url: "/api/responseTeamInstance/ranksResourcesCount",contents: "6666", tels: ["15820330954"]
    url: `/facility/baseDeviceOwner/findRootBaseDeviceOwnerListByType?typeId=1111111110`,
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 拨打电话号码
export function toCallBegin(data) {
  return request({
    // url: "/rcsm/conferenceCall/initiateConferenceCall",contents: "6666", tels: ["15820330954"]
    url: `/rcsm/conferenceCall/initiateConferenceCall`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 拨打电话状态
export function checkCallStatus(data) {
  return request({
    // url: "/rcsm/conferenceCall/initiateConferenceCall",contents: "6666", tels: ["15820330954"]
    // /rcsm/conferenceCall/getConferenceCallStatus
    // /rcsm/consult/getConferenceStatus//
    url: `/rcsm/conferenceCall/getConferenceCallStatus`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 挂断电话
export function cutCall(data) {
  return request({
    // url: "/rcsm/conferenceCall/initiateConferenceCall",contents: "6666", tels: ["15820330954"]
    url: `/rcsm/conferenceCall/closeConferenceCall`,
    method: "DELETE",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 开始直播(支持批量)
export function beginVideoStream(data) {
  return request({
    // url: "/rcsm/conferenceCall/initiateConferenceCall",contents: "6666", tels: ["15820330954"]
    url: `/facility/channel/streamStart`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 保持直播-存活(直播流心跳)
export function videoStreamActive(data) {
  return request({
    // url: "/rcsm/conferenceCall/initiateConferenceCall",contents: "6666", tels: ["15820330954"]
    url: `/facility/channel/streamTouch`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 停止直播(支持批量)
export function stopVideoStream(data) {
  return request({
    // url: "/rcsm/conferenceCall/initiateConferenceCall",contents: "6666", tels: ["15820330954"]
    url: `/facility/channel/streamStop`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 根据id 获取文件
export function useIdGetFile(data) {
  return request({
    url: `/doc/apiore/preview/public/${data.fileId}`,
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
//获取视频分组根节点名称
export function getGrounpList(data) {
  return request({
    url: `/facility/group/findRootGroupList`,
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 根据视频分组获取上墙列表
export function getGrounpOneVideoList(data) {
  return request({
    url: `/facility/group/findGroupWallChannels`,
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 新增/修改视频分组基本信息
export function addEditVideoGrounpMsg(data) {
  return request({
    url: `/facility/group/save`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 根据ID获取视频分组详情
export function useIdGetGrounpDetail(data) {
  return request({
    url: `/facility/group/findDetail?sid=${data.sid}`,
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
// 删除视频分组
export function deleteGrounp(data) {
  // /facility/group/delete
  return request({
    url: `/facility/group/delete`,
    method: "DELETE",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data: data,
  });
}
// 给分组添加视频
export function addGrounpVideo(data) {
  // /facility/group/delete
  return request({
    url: `/facility/groupChannel/add`,
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data: data,
  });
}
// 分组添加上墙视频
export function addGrounpWallVideo(data){
  return request({
    url: `/facility/groupChannel/upWall`,
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data: data,
  })
}
// 移除分组视频
export function removeGrounpWallVideo(data){
  return request({
    url: `/facility/groupChannel/remove`,
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  })
}
// 置顶视频墙
export function videoTopping(data){
  return request({
    url: `/facility/groupChannel/topping`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  })
}
// 取消置顶视频墙
export function cancelVideoTopping(data){
  return request({
    url: `/facility/groupChannel/cancelTopping`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  })
}
// 根据分组id获取所有视频列表-有是否选中字段
export function userGrounpIdGetAllVideo(data){
  return request({
    url: `/facility/group/findAllChannels`,
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  })
}
// 获取当前视频状态
export function getVideoNowStatus(data) {
  return request({
    url: `/facility/channel/getChannelStatus/${data.deviceId}/${data.id}`,
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  })
}