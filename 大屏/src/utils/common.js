/*
 * @Description: 常见通用的js方法
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-22 16:35:04
 * @LastEditTime: 2021-11-03 10:54:12
 */

/*
 *使用 setFontSize()
 *send {px 字体大小,pageWidth = 默认5760}
 */
let setFontSize = (px, pageWidth = 5760) => {
  let docEl = document.documentElement,
    clientWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  if (!clientWidth) return;
  let fontSize = clientWidth / pageWidth;
  return px * fontSize;
};

/**
 * @description  对象中过滤为空、空字符串参数
 * @param par
 * @returns 
 */
const filterParams = (par) => {
  const _par = par;
  const _newPar = {};
  for (const key in _par) {
    if (
      (_par[key] == 0 || _par[key]) &&
      _par[key].toString().replace(/\s/g, "") !== ""
    ) {
      _newPar[key] = _par[key];
    }
  }
  return _newPar;
};
export { setFontSize, filterParams };
