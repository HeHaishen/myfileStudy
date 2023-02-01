/*
 * @Author: your name
 * @Date: 2021-09-06 13:52:37
 * @LastEditTime: 2021-09-16 15:07:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\hazardousChemicals\components\utils\tableData.js
 */
/* 应急队伍 */
export let columnsTeam = [
  { textIndex: "index", title: "序号", width: "10%" },
  { textIndex: "teamName", title: "队伍名称", width: "30%" },
  { textIndex: "person", title: "负责人", width: "15%" },
  { textIndex: "phone", title: "联系电话", width: "20%" },
  { textIndex: "option", title: "定位", width: "15%" },
  { textIndex: "checked", title: "", width: "10%" },
];

/* 应急物资 */
export let columnsMaterials = [
  { textIndex: "index", title: "序号", width: "10%" },
  { textIndex: "name", title: "仓库名称", width: "30%" },
  { textIndex: "person", title: "负责人", width: "15%" },
  { textIndex: "phone", title: "联系电话", width: "20%" },
  { textIndex: "type", title: "类型", width: "15%" },
  { textIndex: "checked", title: "", width: "10%" },
];

/* 应急预案 */
export let columnsPlan = [
  { textIndex: "index", title: "序号", width: "10%" },
  { textIndex: "name", title: "预案名称", width: "45%" },
  { textIndex: "type", title: "类型", width: "25%" },
  { textIndex: "printedTime", title: "印发时间", width: "20%" },
];

/* 危化品名录 */
export let columnsDirectories = [
  { textIndex: "index", title: "序号", width: "10%" },
  // { textIndex: "nuNumber", title: "联合国编号", width: "20%" },
  { textIndex: "cas", title: "CAS", width: "20%" },
  { textIndex: "productName", title: "品名", width: "35%" },
  { textIndex: "commonName", title: "俗名", width: "35%" },
];

/* 事故案例 */
export let columnsModel = [
  { textIndex: "index", title: "序号", width: "10%" },
  { textIndex: "name", title: "名称", width: "35%" },
  { textIndex: "accidentType", title: "事故类别", width: "20%" },
  { textIndex: "level", title: "事故等级", width: "15%" },
  { textIndex: "time", title: "事故发生时间", width: "20%" },
];

/* 涉危企业总数 */
export let columnsDanger = [
  { textIndex: "index", title: "序号", width: "10%" },
  { textIndex: "name", title: "企业名称", width: "30%" },
  { textIndex: "tagName", title: "企业分类", width: "15%" },
  { textIndex: "address", title: "地址", width: "30%" },
  { textIndex: "option", title: "定位", width: "15%" },
];

/* 重点监管企业总数 */
export let columnsEmphasis = [
  { textIndex: "index", title: "序号", width: "10%" },
  { textIndex: "companyName", title: "企业名称", width: "50%" },
  { textIndex: "type", title: "企业分类", width: "20%" },
  { textIndex: "street", title: "地址", width: "20%" },
];

/* 运输车辆总数 */
export let columnsTransport = [
  { textIndex: "index", title: "序号", width: "10%" },
  { textIndex: "areaName", title: "区域", width: "45%" },
  { textIndex: "num", title: "数量", width: "45%" },
];

/* 运输车辆详情 */
export let columnsTransportDetail = [
  { textIndex: "index", title: "序号", width: "10%" },
  { textIndex: "areaName", title: "区域", width: "45%" },
  { textIndex: "licenseNum", title: "车牌", width: "45%" },
];
/* 运输车辆详情2 */
export let columnsTransportDetail2 = [
  { textIndex: "index", title: "序号", width: "10%" },
  { textIndex: "licenseNum", title: "车牌", width: "25%" },
  { textIndex: "driver", title: "司机", width: "15%" },
  { textIndex: "phone", title: "联系电话", width: "50%" },
];

/* 涉危品种总数 */
export let columnsVariety = [
  { textIndex: "index", title: "序号", width: "10%" },
  { textIndex: "name", title: "品名", width: "50%" },
  { textIndex: "salesVolume", title: "销售量/吨", width: "20%" },
  { textIndex: "remark", title: "备注", width: "20%" },
];

/* 导出 */
/* export default {
  columnsTeam,
}; */
