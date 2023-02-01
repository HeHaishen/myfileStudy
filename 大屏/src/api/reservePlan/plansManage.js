import request from "@/request/request.js";
import qs from 'qs'
/** 应急预案类型分组的原数目 */
export function planBasicInformationFindPlanCategoryList(data) {
	return request({
	  url: `/contingencyplans/drp/planBasicInformation/findPlanCategoryList`,
	  method: 'post',
	  data
	})
  }

// 查询数字化预案列表
export function plansFind(data) {
	return request({
		url: '/contingencyplans/drp/planBasicInformation/find',
		method: 'post',
		data
	})
}

// 新增预案基本信息
export function plansBasicSave(data) {
	return request({
		url: '/contingencyplans/drp/planBasicInformation/saveReturnObj',
		method: 'post',
		data
	})
}

// 修改预案基本信息
export function plansBasicUpdate(data) {
	return request({
		url: '/contingencyplans/drp/planBasicInformation/update',
		method: 'post',
		data
	})
}

// 预案草稿批量提交
export function plansAudit(data) {
	return request({
		url: '/contingencyplans/drp/planBasicInformation/reductionAudit',
		method: 'post',
		data
	})
}

// 预案删除到回收站
export function plansLogicDelete(data) {
	return request({
		url: '/contingencyplans/drp/planBasicInformation/logicDelete',
		method: 'delete',
		data
	})
}

// 数字化预案关联组织机构接口 start
// 关联组织机构列表
export function planGroupFind(data) {
	return request({
		url: '/contingencyplans/drp/planGroup/find',
		method: 'post',
		data
	})
}

// 获取组织机构
export function planGroupInfoFind(data) {
	return request({
		url: '/idsm/api/indicator/data/igDv6P7F',
		method: 'post',
		data
	})
}
// 获取组织机构成员
export function planGroupInfoFindMember(data) {
	return request({
		url: '/idsm/api/indicator/data/pNSpe9up',
		method: 'post',
		data
	})
}
// 关联组织机构详情
export function planGroupDetail(params) {
	return request({
		url: '/contingencyplans/drp/planGroup/detail/'+params.sid,
		method: 'get'
	})
}
// 新增关联组织机构
export function planGroupSave(data) {
	return request({
		url: '/contingencyplans/drp/planGroup/save',
		method: 'post',
		data
	})
}
// 编辑关联组织机构
export function planGroupUpdate(data) {
	return request({
		url: '/contingencyplans/drp/planGroup/update',
		method: 'post',
		data
	})
}
// 删除组织机构详情
export function planGroupdDelete(data) {
	return request({
		url: '/contingencyplans/drp/planGroup/delete',
		method: 'delete',
		data
	})
}

// 数字化预案关联组织机构成员
export function planGroupUsers(data) {
	return request({
		url: '/contingencyplans/drp/planGroupUsers/find',
		method: 'post',
		data
	})
}

// 查询多个关联组织机构的成员
export function planGroupsUsers(data) {
	return request({
		url: '/contingencyplans/drp/planGroupUsers/findByIdsDrpPlanGroupId',
		method: 'post',
		data
	})
}


// 数字化预案关联组织机构接口 end

// 数字化预案等级接口 start
// 数字化预案等级列表
export function planGradeFind(data) {
	return request({
		url: '/contingencyplans/drp/planGrade/find',
		method: 'post',
		data
	})
}
// 数字化预案等级详情
export function planGradeDetail(params) {
	return request({
		url: '/contingencyplans/drp/planGrade/detail/'+params.sid,
		method: 'get'
	})
}
// 新增数字化预案等级
export function planGradeSave(data) {
	return request({
		url: '/contingencyplans/drp/planGrade/save',
		method: 'post',
		data
	})
}
// 编辑数字化预案等级
export function planGradeUpdate(data) {
	return request({
		url: '/contingencyplans/drp/planGrade/update',
		method: 'post',
		data
	})
}
// 删除数字化预案等级
export function planGradedDelete(data) {
	return request({
		url: '/contingencyplans/drp/planGrade/delete',
		method: 'delete',
		data
	})
}

// 数字化预案等级接口 end

// 数字化应急处置  start

// 数字化应急处置列表
export function planDisposeFind(data) {
	return request({
		url: '/contingencyplans/drp/planDispose/find',
		method: 'post',
		data
	})
}

// 新增数字化应急处置
export function planDisposeSave(data) {
	return request({
		url: '/contingencyplans/drp/planDispose/save',
		method: 'post',
		data
	})
}

// 编辑数字化应急处置
export function planDisposeUpdate(data) {
	return request({
		url: '/contingencyplans/drp/planDispose/update',
		method: 'post',
		data
	})
}

// 删除数字化应急处置
export function planDisposeDelete(data) {
	return request({
		url: '/contingencyplans/drp/planDispose/delete',
		method: 'delete',
		data
	})
}

// 数字化应急处置 end


// 获取预案装备列表
export function getEquipment(sid) {
	return request({
		url: '/contingencyplans/drp/planBasicInformation/getEquipment/'+sid,
		method: 'get',
	})
}

// 获取预案物资列表
export function getMaterials(sid) {
	return request({
		url: '/contingencyplans/drp/planBasicInformation/getMaterials/'+sid,
		method: 'get',
	})
}


// 预案还原
export function planRestore(data) {
	return request({
		url: '/contingencyplans/drp/planBasicInformation/restore',
		method: 'post',
		data
	})
}

// 预案真实删除
export function planDelete(data) {
	return request({
		url: '/contingencyplans/drp/planBasicInformation/delete',
		method: 'delete',
		data
	})
}

// 预案保存流程图数据
export function updateModelJson(data) {
	return request({
		url: '/contingencyplans/drp/planBasicInformation/updateModelJson',
		method: 'post',
		data
	})
}

// 查询应急通讯录
export function queryFindAddressBook(data) {
	return request({
		url: '/contingencyplans/drp/planBasicInformation/findAddressBook',
		method: 'post',
		data
	})
}

// 上传附件
export function uploadFile(sid,data) {
	return request({
		url: `/doc/api/store/upload/batch/planconfiguration/${sid}`,
		method: 'post',
		headers: { 'content-type': 'multipart/form-data;charset=UTF-8', },
		data:qs.stringify(data)
	})
}

// 删除附件
export function deleteFile(data) {
	return request({
		url: `/doc/api/store/delete/${data}`,
		method: "delete",
		headers: { "Content-Type": "application/json;charset=UTF-8" },
		data,
	})
}

 // 获取区域数据列表
 export function getareaList(data) {
	return request({
	  url: `/system/basic/area/children/${data.sid}`,
	  method: "get",
	  headers: { "Content-Type": "application/json;charset=UTF-8" },
	  data,
	});
   }