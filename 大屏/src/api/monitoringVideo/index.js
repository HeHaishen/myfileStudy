import request from "@/request/request.js";

// 获取监控视频列表
export function getVideoList(data) {
    return request({
        url: `/big-screen/api/iotVideo/find`,
        method: "post",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data,
    });
}

// 获取监控视频链接
export function getPlayVideo(params) {
    return request({
        url: `/big-screen/api/screenVideo/playVideo/`+params.sid,
        method: "get",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        params,
    });
}
