import request from "@/request/request.js";
const serverName = `/idsm`; // 测试环境
const serverNameOther = `/big-screen`; // 测试环境

//公共方法
export function commonApi(data, code) {
  return request({
    url: `${serverName}/api/indicator/data/${code}`,
    method: "post",
    data,
  });
}

// 视频分组
export function getVideoInfo(data) {
  return request({
    url: `${serverNameOther}/api/waterloggingPoint/findBigChannelsForZM`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

// 监测预警信息
export function getMonitor(data) {
  return request({
    url: `${serverName}/api/indicator/data/qWEtyhfg`,
    method: "post",
    data,
  });
}

// 分类预警数统计
export function getClassifyWarning(data) {
  return request({
    url: `${serverName}/api/indicator/data/rmGWpexI`,
    method: "post",
    data,
  });
}

// 预警提示
export function getWarnTips(data) {
  return request({
    url: `${serverName}/api/indicator/data/Eu6e86U8`,
    method: "post",
    data,
  });
}

// 各地隐患数量
export function getNumberOfHidden(data) {
  return request({
    url: `${serverName}/api/indicator/data/mGRRkpst`,
    method: "post",
    data,
  });
}

// 应急队伍table
export function getTableTeam(data) {
  return request({
    url: `${serverName}/api/indicator/data/EwbN8mBD`,
    method: "post",
    data,
  });
}

// 应急物资table
export function getTableMaterials(data) {
  return request({
    url: `${serverName}/api/indicator/data/8iOR1xVy`,
    method: "post",
    data,
  });
}

// 应急预案table
export function getTablePlan(data) {
  return request({
    url: `${serverName}/api/indicator/data/4LUNdw9p`,
    method: "post",
    data,
  });
}

// 危化品名录table
export function getTableDirectories(data) {
  return request({
    url: `${serverName}/api/indicator/data/I2CHuVbU`,
    method: "post",
    data,
  });
}

// 事故案例table
export function getTableModel(data) {
  return request({
    url: `${serverName}/api/indicator/data/OYqMWSWy`,
    method: "post",
    data,
  });
}



// 各地片区应急资源:与‘各地隐患数量’接口相关联,code值根据上面接口获取
export function getEmergencyResource(data) {
  return request({
    url: `${serverName}/api/indicator/data/TKBM1Xtm`,
    method: "post",
    data,
  });
}

// 企业、车辆、品种数量统计表
export function getResourceStatistics(data) {
  return request({
    url: `${serverName}/api/indicator/data/vUQkfz7A`,
    method: "post",
    data,
  });
}

// 涉危企业统计
export function getDangerousCompany(data) {
  return request({
    url: `${serverName}/api/indicator/data/VozdXpN8`,
    method: "post",
    data,
  });
}

// 重点监管企业统计
export function getRegulatoryFocus(data) {
  return request({
    url: `${serverName}/api/indicator/data/JwjlCii9`,
    method: "post",
    data,
  });
}


// 危化品存量统计- 总量
export function getStockStatisticsTotal(data) {
  return request({
    url: `${serverName}/api/indicator/data/1Lh831bK`,
    method: "post",
    data,
  });
}

// 危化品存量统计 - 各区分类统计
export function getStockStatisticsClassify(data) {
  return request({
    url: `${serverName}/api/indicator/data/RhzkJpdN`,
    method: "post",
    data,
  });
}

// 危险化学品-检查
export function getCompanyExamine(data) {
  return request({
    url: `${serverName}/api/indicator/data/3A9L4DJM`,
    method: "post",
    data,
  });
}

// 危险化学品-隐患
export function getCompanyHiddenDanger(data) {
  return request({
    url: `${serverName}/api/indicator/data/n14hVAKl`,
    method: "post",
    data,
  });
}

// 危险化学品-文书
export function getCompanyWrit(data) {
  return request({
    url: `${serverName}/api/indicator/data/T9laGZVs`,
    method: "post",
    data,
  });
}

// 执法文书统计
export function getEnforceTheLaw(data) {
  return request({
    url: `${serverName}/api/indicator/data/uvXwhRnY`,
    method: "post",
    data,
  });
}

// 隐患统计-分类统计
export function getHiddenDangerClassify(data) {
  return request({
    url: `${serverName}/api/indicator/data/t7v4Tqiu`,
    method: "post",
    data,
  });
}

// 一般隐患统计
export function getHiddenDangerCommon(data) {
  return request({
    url: `${serverName}/api/indicator/data/4zN9bs69`,
    method: "post",
    data,
  });
}

//获取危化图片
export function finHidentImg() {
  return request({
    url: `../inner/api/statisticsPic/detail/1431084590453374976`,
    method: "get",
  });
}



