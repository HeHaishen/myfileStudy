/*
 * @Description: import request from "@/request/request.js";
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-11-03 09:23:26
 * @LastEditTime: 2021-11-09 12:01:19
 */
import request from "@/request/request.js";
const baseUrl = "/contingencyplans"; // http://10.100.100.112/contingencyplans/
/* 获取预案 */
export function getPlansList(data) {
  return request({
    url: `${baseUrl}/drp/planBasicInformation/find`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
/* 获取字典 */
export function planListType(data) {
  return request({
    url: `/system/basic/dict/load/${data}`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
/* 进入指挥记录 */
export function beginIntoEvent(data) {
  return request({
    url: `${baseUrl}/api/plansEventprogress/save`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

/* 启动预案 */
export function startPlanApi(data) {
  return request({
    url: `${baseUrl}/api/plansEventprogress/update`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
/* 根据预案id 获取对应指令 */
export function usePlanIdGetOrderApi(data) {
  return request({
    url: `${baseUrl}/drp/planDispose/findPlanDisposeMember`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
/* 预案详情-根据预案id */
export function planDetaisUseId(data) {
  return request({
    url: `${baseUrl}/drp/planBasicInformation/detail/${data.sid}`,
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
/* 获取文件 */
export function getFileUrl(data) {
  return request({
    url: `/doc/api/file/find`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
/* 下发指令 */
export function sendOrders(data) {
  return request({
    url: `${baseUrl}/api/plansDisDespicable/save`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
/* 一键下发指令 */
export function sendOrdersAll(data){
  return request({
    url: `${baseUrl}/api/plansDisDespicable//saveBatth`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

/* 退出指挥 */
export function exitCommand(data){
  return request({
    url: `${baseUrl}/api/plansEventprogress/stop`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 查询应急通讯录
export function queryFindAddressBook(data) {
  return request({
    url: `${baseUrl}/drp/planBasicInformation/findAddressBook`,
    method: "post",
    data,
  });
}
// 获取预案组织体系
export function getPlansGroupList(data){
  return request({
    url: `${baseUrl}/drp/planGroup/find`,
    method: "post",
    data,
  });
}
// 根据事件新建分组 /group/saveGroupChannel
export function addVideoGrounp(data){
  return request({
    url: `/facility/group/saveGroupChannel`,
    method: "post",
    data,
  });
}
// 根据事件获取分组 /group/saveGroupChannel
export function useEventVideoGrounp(data){
  return request({
    url: `/facility/group/findRootGroupList`,
    method: "post",
    data,
  });
}
// 数字化应急处置列表
export function planDisposeFind(data) {
	return request({
		url: `${baseUrl}/drp/planDispose/find`,
		method: 'post',
		data
	})
}

// 通过事件id 查询通讯录 /contingencyplans/drp/planBasicInformation/findAddressBookByEventId
export function useEventIdFindContact(data){
  return request({
		url: `${baseUrl}/drp/planBasicInformation/findAddressBookByEventId`,
		method: 'post',
		data
	})
}
