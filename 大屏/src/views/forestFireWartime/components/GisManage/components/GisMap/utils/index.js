// 腾讯地图 自定义 弹窗
export class CustomOverlay {
    constructor(distanceY=10,bgColor="rgba(30, 46, 69, 0.5)"){
		this.distanceY = distanceY; // 点到弹窗距离
		this.bgColor = bgColor;
	}
}

CustomOverlay.prototype = new qq.maps.Overlay();
//定义construct,实现这个接口来初始化自定义的Dom元素
CustomOverlay.prototype.construct = function() {
    var div = this.div = document.createElement("div");
	this.arrowDiv = document.createElement("arrow");
	this.closeDiv = document.createElement("div");
	this.contentDiv = document.createElement("div");
	
	var arrowStyle = this.arrowDiv.style;
	arrowStyle.position = "absolute";
	arrowStyle.left = "50%";
	arrowStyle.bottom = "-20px";
	arrowStyle['border-width'] = "10px";
	arrowStyle['border-style'] = "solid dashed dashed";
	arrowStyle['border-color'] = this.bgColor + "transparent transparent";
	arrowStyle['transform'] = "translateX(-50%)";	
	
    var divStyle = this.div.style;
    divStyle.position = "absolute";
    divStyle.cursor = "pointer";
	divStyle['z-index'] = 1000;
	divStyle.display = "none";
	divStyle['user-select'] = "none";
	
	var closeStyle = this.closeDiv.style;
	closeStyle.position = "absolute";
	closeStyle.right = "4px";
	closeStyle.top = "0px";
	closeStyle['text-align'] = "center";
	closeStyle.width = "18px";
	closeStyle.height = "14px";
	closeStyle.font = "Tahoma, Verdana, sans-serif";
	closeStyle.color = "#c3c3c3";
	closeStyle['text-decoration'] = "none";
	closeStyle['font-weight'] = "bold";
	closeStyle.background = "transparent";
	closeStyle.color = "#ffffff";
	closeStyle['z-index'] = 1000;
	this.closeDiv.className = "custom-overlay-close";
	
	this.closeDiv.innerHTML = "x";
    this.contentDiv.innerHTML = '';
	this.div.appendChild(this.closeDiv);
	this.div.appendChild(this.contentDiv);
	this.div.appendChild(this.arrowDiv);
	
    //将dom添加到覆盖物层
    var panes = this.getPanes();
    //设置panes的层级，overlayMouseTarget可接收点击事件
    panes.overlayMouseTarget.appendChild(div);
 
    var self = this;
    this.closeDiv.onclick = function() {
        self.close()
    }
}
//实现draw接口来绘制和更新自定义的dom元素
CustomOverlay.prototype.draw = function() {
	if(this.position){
		var overlayProjection = this.getProjection();
		//返回覆盖物容器的相对像素坐标
		var pixel = overlayProjection.fromLatLngToDivPixel(this.position);
		var divStyle = this.div.style;
		var divObj = window.getComputedStyle(this.div,null);
		var width = Number(divObj.width.replace('px',''));
		var height = Number(divObj.height.replace('px',''));
		
		divStyle.left = pixel.x - (width / 2) + "px";
		divStyle.top = pixel.y - height - this.distanceY + "px";
	}
}

CustomOverlay.prototype.setContent = function(position, html=''){
	this.position = position;
	this.contentDiv.innerHTML = html;
	this.draw()
}

CustomOverlay.prototype.open = function(){
	var divStyle = this.div.style;
	divStyle.display = 'block';
}

CustomOverlay.prototype.close = function(position){
	var divStyle = this.div.style;
	divStyle.display = 'none';
}

//实现destroy接口来删除自定义的Dom元素，此方法会在setMap(null)后被调用
CustomOverlay.prototype.destroy = function() {
    this.div.onclick = null;
    this.div.parentNode.removeChild(this.div);
    this.div = null;
}