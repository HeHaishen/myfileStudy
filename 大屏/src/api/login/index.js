/*
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-11-08 10:55:19
 * @LastEditTime: 2021-11-08 14:54:55
 */
/*
 * @Description:
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-06-01 15:40:52
 * @LastEditTime: 2021-11-08 09:52:17
 */
import request from "@/request/request.js";
const serverName = `/big-screen`
// const serverName = ``
// 登录服务
export function userLogin(data) {
  return request({
    url: `${serverName}/api/login/login`,
    method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}

export function isAuthed(data){
  return request({
    url: `/login/isAuthed`,
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    data,
  });
}
