/*
 * @Description: 指标接口 
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-10 16:13:31
 * @LastEditors:  
 * @LastEditTime: 2021-11-03 14:27:29
 */
import request from "@/request/request.js";
const serverName = `/big-screen`; // 测试环境

/** 获取指标接口
 *  @param {String} code 指标code
 *  @param {Object} data api 参数
 */
export function getIdsmApi(code, data) {
  return request({
    url: `/idsm/api/indicator/data/${code}`,
    method: "post",
    data,
  });
}

/** 灾情险情及风险隐患上报信息 */
export function yjzhPreventionDangerFindNew(data) {
  return request({
    url: `/prevention/yjzh/preventionDanger/findByEvent`,
    method: "post",
    data,
  });
}

/** 灾情险情及风险隐患上报信息 */
export function yjzhPreventionDangerFind(data) {
  return request({
    url: `/prevention/yjzh/preventionDanger/find`,
    method: "post",
    data,
  });
}
/** 一张图-三指标综合统计 */
export function mapStatisticalThreeIndicators(data) {
  return request({
    url: `/prevention/yjzh/preventionDanger/mapStatisticalThreeIndicators`,
    method: "post",
    data,
  });
}

// 现场救援抢险组织和指挥系统 - 获取分析研判数据
export function getStudyList(data) {
  return request({
    url: `${serverName}/api/channels/findCount`,
    data,
    method: "post",
  });
}

// 现场救援抢险组织和指挥系统 - 获取分析研判详情数据
export function findTypeDetail(data) {
  return request({
    url: `${serverName}/api/channels/findList`,
    data,
    method: "post",
  });
}
/** 获取通讯录群组树 */
export function groupTreeWith(sid) {
  return request({
    url: `/msg-abs/abs/group/children/${sid}`,
    method: 'get',
  })
}

/** 群组用户查询 */
export function getGroupUserFind(data) {
  return request({
    url: `/msg-abs/abs/groupUser/findGroupUsers`,
    method: 'post',
    data
  })
}

/** 指令下达保存 */
export function plansDisDespicableSave(data) {
  return request({
    url: `/contingencyplans/api/plansDisDespicable/save`,
    method: 'post',
    data
  })
}

/** 指令跟踪 */
export function plansDisDespicableFind(data) {
  return request({
    url: `/contingencyplans/api/plansDisDespicable/find`,
    method: 'post',
    data
  })
}

/** 指令下达 详情 */
export function plansDisDespicableDetailWith(sid) {
  return request({
    url: `/contingencyplans/api/plansDisDespicable/detail/${sid}`,
    method: 'get',
  })
}

/** 灾损统计 根据事件查询 */
export function disasterDamageDetailWith(eventId) {
  return request({
    url: `/contingencyplans/api/disasterDamage/find`,
    method: 'post',
    data: {
      body: {
        eventId
      }
    }
  })
}

/** 灾损统计 保存 */
export function disasterDamageSave(data) {
  let url = '/contingencyplans/api/disasterDamage/save'
  if (data.sid) {
    url = '/contingencyplans/api/disasterDamage/update'
  }
  return request({
    url,
    method: 'post',
    data
  })
}

/** 队伍情况 根据事件查询 */
export function disasterReliefTeamDetailWith(eventId) {
  return request({
    url: `/contingencyplans/api/disasterReliefTeam/find`,
    method: 'post',
    data: {
      body: {
        eventId
      }
    }
  })
}

/** 队伍情况 保存 */
export function disasterReliefTeamSave(data) {
  let url = '/contingencyplans/api/disasterReliefTeam/save'
  if (data.sid) {
    url = '/contingencyplans/api/disasterReliefTeam/update'
  }
  return request({
    url,
    method: 'post',
    data
  })
}

/** 队伍情况 删除 */
export function disasterReliefTeamDelete(data) {
  return request({
    url: `/contingencyplans/api/disasterReliefTeam/delete`,
    method: 'delete',
    data
  })
}

/** 资源调配 根据事件查询 */
export function provisioningDetailWith(eventId) {
  return request({
    url: `/contingencyplans/api/provisioning/find`,
    method: 'post',
    data: {
      body: {
        eventId
      }
    }
  })
}

/** 资源调配 保存 */
export function provisioningSave(data) {
  let url = '/contingencyplans/api/provisioning/save'
  if (data.sid) {
    url = '/contingencyplans/api/provisioning/update'
  }
  return request({
    url,
    method: 'post',
    data
  })
}

/** 资源调配 删除 */
export function provisioningDelete(data) {
  return request({
    url: `/contingencyplans/api/provisioning/delete`,
    method: 'delete',
    data
  })
}


/** 进展情况 */
export function contingencyplansDisposetaskResultFindResult(data) {
  return request({
    url: `/contingencyplans/api/contingencyplansDisposetaskResult/findResult`,
    method: 'post',
    data
  })
}


// 现场救援抢险组织和指挥系统 - 获取分类列表详情-坐标
export function findTypeDetailSite(data) {
  return request({
    url: `${serverName}/api/channels/findPolygonData`,
    data,
    method: "post",
  });
}

