import request from "@/request/request.js";

//地图侧边栏共用接口
export function commonApi(data) {
  return request({
    url: `/idsm/api/indicator/data/${data.code}`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 获取三防主要风险隐患-总条数
export function getHiddenDangerTotal(data, code = "44n0aZ5o") {
  return request({
    url: `/idsm/api/indicator/data/${code}`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 获取三防主要风险隐患-积水内涝
export function getPondingDatas(data, code = "nTOpFrxN") {
  return request({
    url: `/idsm/api/indicator/data/${code}`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 获取三防主要风险隐患-积水内涝 - 列表
export function getPondingListDatas(data) {
  return request({
    url: `/idsm/api/indicator/data/yaEmD59r`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 获取三防主要风险隐患-地质
export function getGeologyDatas(data) {
  return request({
    url: `/idsm/api/indicator/data/64K46QmB`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 获取三防主要风险隐患-列表
export function getGeologyListDatas(data) {
  return request({
    url: `/idsm/api/indicator/data/tlVsBH1w`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 获取三防主要风险隐患-水利工程隐患 - 列表
export function getProjectListDatas(data) {
  return request({
    url: `/idsm/api/indicator/data/fLbHj70g`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 获取全市三防-指挥机构
export function getConductInstitution(data) {
  return request({
    url: `/idsm/api/indicator/data/E72TxYux`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 获取全市三防-指挥人员信息
export function getCommanderInformation(data) {
  return request({
    url: `/idsm/api/indicator/data/cPErOBpT`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 获取全市三防-水库防汛责任人
export function getReservoirFlood(data) {
  return request({
    url: `/idsm/api/indicator/data/CESlAEHl`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 获取获取全市三防-堤围防汛责任人
export function getBundFlood(data) {
  return request({
    url: `/idsm/api/indicator/data/l3gdmA46`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 获取全市三防-危险区域人群
export function getRiskZonePopulation(data) {
  return request({
    url: `/idsm/api/indicator/data/9ROu7265`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 获取全市三防-三本台账
export function getThreeParameter(data) {
  return request({
    url: `/idsm/api/indicator/data/Z3MD26UZ`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 气象信息 - 实况 - 珠江潮位图
export function getzjcwt(data) {
  return request({
    url: `/idsm/api/indicator/data/Or6gPb5G`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//降水量 - 按区
export function getRainfallCity(data) {
  return request({
    url: `/idsm/api/indicator/data/D0Ok2enz`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//降水量-获取按区日降水量
export function getRainfallDay(data) {
  return request({
    url: `/idsm/api/indicator/data/WF45qgey`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//降水量-获取按小时降水量
export function getRainfallHour(data) {
  return request({
    url: `/idsm/api/indicator/data/q8GNBk4B`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
//三防应急响应-列表
export function getResponseList(data) {
  return request({
    url: `/idsm/api/indicator/data/vWe4mxlb`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//获取区域选择
export function getAreaSelect(data) {
  return request({
    url: `/idsm/api/indicator/data/Z67lpx15`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//获取三防响应情况统计
export function getResponseStatus(data) {
  return request({
    url: `/idsm/api/indicator/data/sPVmX6Ub`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//获取三防快报list
export function getBulletinList(data) {
  return request({
    url: `/idsm/api/indicator/data/0rpAZ5MN`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
export function getMonitorList(data) {
  return request({
    url: `/idsm/api/indicator/data/AftHmnNo`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 水库水情
export function getReservoirWater(data) {
  return request({
    url: `/idsm/api/indicator/data/Aeil5JZO`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 水库水情---详情
export function getReservoirWaterDetail(data) {
  return request({
    url: `/idsm/api/indicator/data/72BEfbRK`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 河湖水情
export function getRiversWater(data) {
  return request({
    url: `/idsm/api/indicator/data/KY7wSI6R`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 河湖水情-详情
export function getRiversWaterDetail(data) {
  return request({
    url: `/idsm/api/indicator/data/vYlnuEF3`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 泵站水闸水情
export function getPumpLockWater(data) {
  return request({
    url: `/idsm/api/indicator/data/X6joaYih`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 泵站水闸水情-详情
export function getPumpLockWaterDetail(data) {
  return request({
    url: `/idsm/api/indicator/data/YhR4bhQH`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 积水内涝点
export function getWaterlogging(data) {
  return request({
    url: `/idsm/api/indicator/data/hygk7oRD`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 积水内涝点
export function getWaterloggingDetail(data) {
  return request({
    url: `/idsm/api/indicator/data/IrHQk4Ie`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 全市三防-应急预案
export function getReponsePlan(data) {
  return request({
    url: `/idsm/api/indicator/data/8t1fMerM`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
// 全市三防-历史灾情防御措施
export function getPreventionMeasures(data) {
  return request({
    url: `/idsm/api/indicator/data/2KSEil3F`,
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

// 获取水库详情列表
export function getReservoirApi(data) {
  return request({
    url: `/idsm/api/indicator/data/${data.codes}`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
  //  气象预警
export function meteorologicalWarningTable(data) {
  return request({
    url: '/idsm/api/indicator/data/V7VGXneq/yjtype/1',
    method: 'post',
    data
  })
}