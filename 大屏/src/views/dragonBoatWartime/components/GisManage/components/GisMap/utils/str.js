export const eventStr = (customData) => {
    
    if(customData.level == 1){
        let html = `
        <div class="eventStr1">
            <div class="eventStr1__title">
                <span class="eventStr1__title_left"></span>  ${customData.name}
            </div>
            <div class="eventStr1__content">
        `;
        html += '<div class="eventStr1__content_items">';
        customData.data.keyList.forEach(item=>{
            html += `<div class="eventStr1__content_item">${item.key} ${item.value}</div>`;
        })
        html += '</div>';

        html += '<div class="eventStr1__content_imgs">';
        customData.data.imgList.forEach(item=>{
            html += `<div class="eventStr1__content_img"><img src="${item}"></img></div>`;
        })
        html += `</div></div></div>`;
        return html;
    }else if(customData.level == 2){
        let html = `
        <div class="eventStr2">
            <div class="eventStr2__title">
                <span class="eventStr2__title_left"></span>  ${customData.name}
            </div>
            <div class="eventStr2__content">
        `;
        html += '<div class="eventStr2__content_items">';
        customData.data.keyList.forEach(item=>{
            html += `<div class="eventStr2__content_item">${item.key} ${item.value}</div>`;
        })
        html += '</div>';

        html += '<div class="eventStr2__content_imgs">';
        customData.data.imgList.forEach(item=>{
            html += `<div class="eventStr2__content_img"><img src="${item}"></img></div>`;
        })
        html += `</div></div></div>`;
        return html;
    }else if(customData.level == 3){
        let html = `
        <div class="eventStr3">
            <div class="eventStr3__title">
                <span class="eventStr3__title_left"></span>  ${customData.name}
            </div>
            <div class="eventStr3__content">
        `;
        html += '<div class="eventStr3__content_items">';
        customData.data.keyList.forEach(item=>{
            html += `<div class="eventStr3__content_item">${item.key} ${item.value}</div>`;
        })
        html += '</div>';

        html += '<div class="eventStr3__content_btns">';
        customData.data.btnList.forEach(item=>{
            html += `<div class="eventStr3__content_btn">${item}</div>`;
        })
        html += '</div>';

        html += '<div class="eventStr3__content_lists"><div style="margin: 20px 0;">本日动态监测</div>';
        html += `<div class="eventStr3__content_list">
            <div>监测时间</div>
            <div>监测内容</div>
            <div>级别</div>
            <div>来源</div>
        </div>
        `;
        customData.data.monitorList.forEach(item=>{
            html += `<div class="eventStr3__content_list">
            <div>${item.time}</div>
            <div>${item.content}</div>
            <div><span class="color${item.level}">${item.levelStr}</span></div>
            <div>${item.source}</div></div>`;
        })
        html += '</div>';

        html += `</div></div>`;
        return html;
    }
    else{ return ''; }
}