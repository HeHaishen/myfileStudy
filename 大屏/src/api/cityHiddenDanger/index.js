import request from "@/request/request.js";

// 全市隐患企业  center-left  检查-处罚-文书
export function getAllDatas(data) {
  return request({
    url: `/big-screen/api/waterloggingPoint/findInspect`,
    method: "get",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//企业注册数
export function getRegisterData(data) {
  return request({
    url: `/idsm/api/indicator/data/c6tC5fMO`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//企业隐患分类统计
export function getclassifyData(data) {
  return request({
    url: `/idsm/api/indicator/data/YSXnpoy8`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//企业隐患上报排名--按八大行业排名
export function getLevelEight(data) {
  return request({
    url: `/idsm/api/indicator/data/WdLceVY5`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//企业隐患上报排名--按区排名
export function getLevelArea(data) {
  return request({
    url: `/idsm/api/indicator/data/4wSjxa7P`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

//企业检查统计 - 检查
export function getExamineDatas(data) {
  return request({
    url: `/idsm/api/indicator/data/3A9L4DJM`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}


//事故总数行业分布情况
export function getAccidentTotal(data) {
  return request({
    url: `/idsm/api/indicator/data/qkifbsSc`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 企业事故风险情况 - 全部 - 各等级分布
export function AllEnterpriseAccident(data) {
  return request({
    url: `/idsm/api/indicator/data/WPKn4XaE`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 企业事故风险情况 -切换 - 各等级分布
export function OtherEnterpriseAccident(data) {
  return request({
    url: `/idsm/api/indicator/data/zw3h1C21`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 企业事故风险情况 -全部-行业事故统计
export function getAllaccidentChart(data) {
  return request({
    url: `/idsm/api/indicator/data/zZnhl6ZH`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 企业事故风险情况 -切换-行业事故统计
export function getOccupationChart(data) {
  return request({
    url: `/idsm/api/indicator/data/5gt1uEsk`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}




// 企业事故风险情况 -全部-区域事故统计
export function getAllAreaChart(data) {
  return request({
    url: `/idsm/api/indicator/data/YmFzoUUF`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}


// 企业事故风险情况 -切换-区域事故统计
export function getOtherAreaChart(data) {
  return request({
    url: `/idsm/api/indicator/data/hAXbA8dp`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 企业事故风险情况 八大行业统计展现总数
export function getEightTotal(data) {
  return request({
    url: `/idsm/api/indicator/data/fNQmCltf`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 企业事故风险情况 四个专项统计展现总数
export function getFourTotal(data) {
  return request({
    url: `/idsm/api/indicator/data/KVsek78o`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 企业事故风险情况 - 企业检查统计 - 全部
export function getCheckData(data) {
  return request({
    url: `/idsm/api/indicator/data/YQRdxqlA`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 企业事故风险情况 - 企业检查统计 - 按区域
export function getCheckArea(data) {
  return request({
    url: `/idsm/api/indicator/data/ye7Hp0gL`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 企业隐患信息统计 - 注册企业列表
export function getEnterpriseInforList(data) {
  return request({
    url: `/idsm/api/indicator/data/wBEwPM80`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 企业隐患信息统计 - 企业检查统计-待检查企业
export function commonApi(code,data) {
  return request({
    url: `/idsm/api/indicator/data/${code}`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}