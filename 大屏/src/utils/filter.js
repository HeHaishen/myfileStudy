/*
 * @Author: liuxin
 * @Date: 2021-06-18 17:18:35
 * @LastEditTime: 2021-06-23 10:54:06
 * @LastEditors: Please set LastEditors
 * @Description: 全局filter方法
 * @FilePath: \big-screen-vue\src\utils\filter.js
 */
import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})
// 日期截取 2021-06-15 格式
Vue.filter('timeFormat', function (val) {
  if (!val) {
    return val
  }
  return val.match(/^\d{4}-\d{1,2}-\d{1,2}/g).join('')
})

/**
 * 数值 精度输出过滤器
 */
Vue.filter('precision', function (value,p) {
  if (!value) {
    return 0
  }
  return value.toFixed(p)
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('json', function (value) {
  if (!value) {
    return '';
  }
  return JSON.stringify(value)
})

 // 日期截取为 2021-06-15 格式
Vue.filter('timeFormat', function (value) {
    if (!value) {
        return value
      }
      return value.match(/^\d{4}-\d{1,2}-\d{1,2}/g).join('')
  })
   
//过滤器做字数限制并显示省略号{{value | ellipsis(15)}}
Vue.filter('ellipsis', (value, num) => {
  const nums = num || '5';
  if (!value) return '';
  if (value.length > nums) {
    return value.slice(0, nums) + '...';
  }
  return value;
})

Vue.filter('conversion', function (value) {
  let val = value
  if (!val) {
    val = 0
  }
  if (val.toString().length >= 13) {
    const volume = val / 1000000000000
    const realVal = parseFloat(volume).toFixed(2);
    return realVal + "万亿"
  } else if (val.toString().length >= 9) {
    const volume = val / 100000000
    const realVal = parseFloat(volume).toFixed(2);
    return realVal + "亿"
  } else if (val.toString().length >4) {
    const volume = val / 10000
    const realVal = parseFloat(volume).toFixed(2);
    return realVal + "万"
  } else {
    const realVal = parseFloat(val).toFixed();
    return realVal + ""
  }
})