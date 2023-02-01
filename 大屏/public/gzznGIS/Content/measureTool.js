export const measureTool = {
    viewer: null,
    drawList: [],
    handler:null,
    selectMeasure(objs, callBack) {
        if (!this.viewer) {
            this.viewer = pGzznCore.viewer;
        }
        if (objs.type == "line") {
            this.measureLine(objs, callBack)
        } else if (objs.type == "Polygon") {
            this.measurePolygon(objs, callBack)
        }
    },
    measureLine(objs, callBack) {
        var viewer = this.viewer;
        var _this = this;
        var handler = new Crystal.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
        var positions = [];
        var poly = null;
        var distance = 0;
        var cartesian = null;
        var floatingPoint;
        var labelPt;
        handler.setInputAction(function (movement) {
            let ray = viewer.camera.getPickRay(movement.endPosition);
            cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            if (!Crystal.defined(cartesian)) //跳出地球时异常
                return;
            if (positions.length >= 2) {
                if (!Crystal.defined(poly)) {
                    poly = new PolyLinePrimitive(positions);
                } else {
                    positions.pop();
                    positions.push(cartesian);
                }
            }
        }, Crystal.ScreenSpaceEventType.MOUSE_MOVE);

        handler.setInputAction(function (movement) {
            let ray = viewer.camera.getPickRay(movement.position);
            cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            if (!Crystal.defined(cartesian)) //跳出地球时异常
                return;
            if (positions.length == 0) {
                positions.push(cartesian.clone());
            }
            positions.push(cartesian);
            //记录鼠标单击时的节点位置，异步计算贴地距离
            labelPt = positions[positions.length - 1];
            if (positions.length > 2) {
                getSpaceDistance(positions);
            } else if (positions.length == 2) {
                //在三维场景中添加Label
                floatingPoint = viewer.entities.add({
                    name: '',
                    position: labelPt,
                    point: {
                        pixelSize: 5,
                        color: Crystal.Color.WHITE,
                        outlineColor: Crystal.Color.RED,
                        outlineWidth: 1,
                    }
                });
                //_this.drawList[_this.drawList.length-1].point.push(floatingPoint);
            }
        }, Crystal.ScreenSpaceEventType.LEFT_CLICK);

        handler.setInputAction(function (movement) {
            handler.destroy(); //关闭事件句柄
            handler = undefined;
            positions.pop(); //最后一个点无效
            if (positions.length == 1){
                viewer.entities.remove(floatingPoint);
                _this.drawList[_this.drawList.length - 1].point.splice(_this.drawList[_this.drawList.length - 1].point.length - 1, 1);
            }
                
        }, Crystal.ScreenSpaceEventType.RIGHT_CLICK);

        var PolyLinePrimitive = (function () {
            function _(positions) {
                this.options = {
                    name: '',
                    polyline: {
                        show: true,
                        positions: [],
                        material: Crystal.Color.BLUE.withAlpha(0.8),
                        width: 3,
                        clampToGround: true
                    }
                };
                this.positions = positions;
                this._init();
            }

            _.prototype._init = function () {
                var _self = this;
                var _update = function () {
                    return _self.positions;
                };
                //实时更新polyline.positions
                this.options.polyline.positions = new Crystal.CallbackProperty(_update, false);
                var addedEntity = viewer.entities.add(this.options);
                
                _this.drawList.push({ type: "line", entity: addedEntity,point:[floatingPoint] });
            };

            return _;
        })();

        //空间两点距离计算函数
        function getSpaceDistance(positions) {
            //只计算最后一截，与前面累加
            //因move和鼠标左击事件，最后两个点坐标重复
            var i = positions.length - 3;
            var point1cartographic = Crystal.Cartographic.fromCartesian(positions[i]);
            var point2cartographic = Crystal.Cartographic.fromCartesian(positions[i + 1]);
            getTerrainDistance(point1cartographic, point2cartographic);
        }

        function getTerrainDistance(point1cartographic, point2cartographic) {
            var geodesic = new Crystal.EllipsoidGeodesic();
            geodesic.setEndPoints(point1cartographic, point2cartographic);
            var s = geodesic.surfaceDistance;
            var cartoPts = [point1cartographic];
            for (var jj = 1000; jj < s; jj += 1000) {　　//分段采样计算距离
                var cartoPt = geodesic.interpolateUsingSurfaceDistance(jj);
                cartoPts.push(cartoPt);
            }
            cartoPts.push(point2cartographic);
            //返回两点之间的距离
            var promise = Crystal.sampleTerrain(viewer.terrainProvider, 8, cartoPts);
            Crystal.when(promise, function (updatedPositions) {
                for (var jj = 0; jj < updatedPositions.length - 1; jj++) {
                    var geoD = new Crystal.EllipsoidGeodesic();
                    geoD.setEndPoints(updatedPositions[jj], updatedPositions[jj + 1]);
                    var innerS = geoD.surfaceDistance;
                    innerS = Math.sqrt(Math.pow(innerS, 2) + Math.pow(updatedPositions[jj + 1].height - updatedPositions[jj].height, 2));
                    distance += innerS;
                }
                //在三维场景中添加Label
                var lon1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(labelPt).longitude;
                var lat1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(labelPt).latitude;
                var lonLat = "(" + Crystal.Math.toDegrees(lon1).toFixed(2) + "," + Crystal.Math.toDegrees(lat1).toFixed(2) + ")";
                var textDisance = distance.toFixed(2) + "米";
                if (distance > 10000)
                    textDisance = (distance / 1000.0).toFixed(2) + "千米";
                floatingPoint = viewer.entities.add({
                    name: '',
                    position: labelPt,
                    point: {
                        pixelSize: 5,
                        color: Crystal.Color.WHITE,
                        outlineColor: Crystal.Color.RED,
                        outlineWidth: 2,
                    },
                    label: {
                        text: textDisance,
                        font: '18px sans-serif',
                        fillColor: Crystal.Color.GOLD,
                        style: Crystal.LabelStyle.FILL_AND_OUTLINE,
                        outlineWidth: 2,
                        verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
                        pixelOffset: new Crystal.Cartesian2(10, -10),
                    }
                });
                _this.drawList[_this.drawList.length-1].point.push(floatingPoint);
            });
        }
    },
    measurePolygon(objs, callBack) {    
        var _this = this;
        var initNum = _this.drawList.length;
        var viewer = this.viewer;
        // 鼠标事件
        var handler = new Crystal.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
        var hierarchy, options, floatingPoint;
        var tempPoints = [];
        var polygon = null;
        var cartesian = null;
        var color = objs && objs.color ? objs.color : "BLUE";
        var ColorType = Array.isArray(color) ? new Crystal.Color(color[0] / 255, color[1] / 255, color[2] / 255, color[3]) : Crystal.Color.fromCssColorString(color).withAlpha(0.4);
        var PolygonPrimitive = (function () {
            function _(positions) {
                options = {
                    //name: "多边形",
                    polygon: {
                        hierarchy: [],
                        perPositionHeight: true,
                        material: ColorType,
                    },
                };
                hierarchy = positions;
                this._init();
            }

            _.prototype._init = function () {
                var _update = function () {
                    return new Crystal.PolygonHierarchy(hierarchy);
                };
                options.polygon.hierarchy = new Crystal.CallbackProperty(
                    _update,
                    false
                );
                _this.drawList.push({ type: "Polygon", entity: _this.viewer.entities.add(options),point:[floatingPoint] });
            };
            return _;
        })();

        var positions = [];
        handler.setInputAction(function (movement) {
            let ray = viewer.camera.getPickRay(movement.endPosition);
            cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            //positions.pop();//移除最后一个
            //positions.push(cartesian);
            if (positions.length >= 2) {
                var dynamicPositions = new Crystal.CallbackProperty(function () {
                    return new Crystal.PolygonHierarchy(positions);
                    //return positions;
                }, false);
                if (!polygon) {
                    polygon = new PolygonPrimitive(positions);
                } else {
                    if (cartesian != undefined) {
                        positions.pop();
                        cartesian.y += 1 + Math.random();
                        positions.push(cartesian);
                    }
                }

            }
        }, Crystal.ScreenSpaceEventType.MOUSE_MOVE);

        handler.setInputAction(function (movement) {
            let ray = viewer.camera.getPickRay(movement.position);
            cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            if (positions.length == 0) {
                positions.push(cartesian.clone());
            }
            positions.push(cartesian);
            //在三维场景中添加点
            var cartographic = Crystal.Cartographic.fromCartesian(positions[positions.length - 1]);
            var longitudeString = Crystal.Math.toDegrees(cartographic.longitude);
            var latitudeString = Crystal.Math.toDegrees(cartographic.latitude);
            var heightString = cartographic.height;
            var labelText = "(" + longitudeString.toFixed(2) + "," + latitudeString.toFixed(2) + ")";
            tempPoints.push({ lon: longitudeString, lat: latitudeString, hei: heightString });
            floatingPoint = viewer.entities.add({
                name: '',
                position: positions[positions.length - 1],
                point: {
                    pixelSize: 5,
                    color: Crystal.Color.WHITE,
                    outlineColor: Crystal.Color.RED,
                    outlineWidth: 2,
                    heightReference: Crystal.HeightReference.CLAMP_TO_GROUND
                },
                // label: {
                //     text: labelText,
                //     font: '18px sans-serif',
                //     fillColor: Crystal.Color.GOLD,
                //     style: Crystal.LabelStyle.FILL_AND_OUTLINE,
                //     outlineWidth: 2,
                //     verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
                //     pixelOffset: new Crystal.Cartesian2(20, -20),
                // }
            });
            if(_this.drawList.length > initNum ){
                _this.drawList[_this.drawList.length-1].point.push(floatingPoint);
            }        
        }, Crystal.ScreenSpaceEventType.LEFT_CLICK);
        handler.setInputAction(function (movement) {
            handler.destroy();
            handler = undefined;
            positions.pop();
            var getArea2 = getArea3(tempPoints) ;
            //var textArea = getArea1(tempPoints) + "平方公里";
            var labels = viewer.entities.add({
                name: '',
                position: positions[positions.length - 1],
                label: {
                    text: getArea2,
                    font: '18px sans-serif',
                    fillColor: Crystal.Color.GOLD,
                    style: Crystal.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 2,
                    verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
                    pixelOffset: new Crystal.Cartesian2(10, -10),
                    heightReference: Crystal.HeightReference.CLAMP_TO_GROUND
                }
            });
            _this.drawList[_this.drawList.length-1].point.push(labels);
        }, Crystal.ScreenSpaceEventType.RIGHT_CLICK);
        var radiansPerDegree = Math.PI / 180.0;//角度转化为弧度(rad)
        var degreesPerRadian = 180.0 / Math.PI;//弧度转化为角度

        function getArea3(path) {
            let radius = 6371009
            let len = path.length;
            if (len < 3) return 0;
            let total = 0;
            let prev = path[len - 1];
            let prevTanLat = Math.tan(((Math.PI / 2 - prev.lat / 180 * Math.PI) / 2));
            let prevLng = (prev.lon) / 180 * Math.PI;
            for (let i in path) {
                let tanLat = Math.tan((Math.PI / 2 -
                    (path[i].lat) / 180 * Math.PI) / 2);
                let lng = (path[i].lon) / 180 * Math.PI;
                total += polarTriangleArea(tanLat, lng, prevTanLat, prevLng);
                prevTanLat = tanLat;
                prevLng = lng;
            }
            let s =Math.abs(total * (radius * radius));
            let slabel;
            if(s>10000){
                slabel = (s / 1000000.0).toFixed(4) + "平方公里";
            }else{
                slabel = s.toFixed(4) + "平方米";
            }
            return slabel;
        }
        function polarTriangleArea(tan1, lng1, tan2, lng2) {
            let deltaLng = lng1 - lng2;
            let t = tan1 * tan2;
            return 2 * Math.atan2(t * Math.sin(deltaLng), 1 + t * Math.cos(deltaLng));
        }

        //计算多边形面积
        function getArea(points) {
            var res = 0;
            //拆分三角曲面
            for (var i = 0; i < points.length - 2; i++) {
                var j = (i + 1) % points.length;
                var k = (i + 2) % points.length;
                var totalAngle = Angle(points[i], points[j], points[k]);
                var dis_temp1 = distance(positions[i], positions[j]);
                var dis_temp2 = distance(positions[j], positions[k]);
                res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle));
            }
            return (res / 1000000.0).toFixed(4);
        }

        /*角度*/
        function Angle(p1, p2, p3) {
            var bearing21 = Bearing(p2, p1);
            var bearing23 = Bearing(p2, p3);
            var angle = bearing21 - bearing23;
            if (angle < 0) {
                angle += 360;
            }
            return angle;
        }
        /*方向*/
        function Bearing(from, to) {
            var lat1 = from.lat * radiansPerDegree;
            var lon1 = from.lon * radiansPerDegree;
            var lat2 = to.lat * radiansPerDegree;
            var lon2 = to.lon * radiansPerDegree;
            var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
            if (angle < 0) {
                angle += Math.PI * 2.0;
            }
            angle = angle * degreesPerRadian;//角度
            return angle;
        }
        function distance(point1, point2) {
            var point1cartographic = Crystal.Cartographic.fromCartesian(point1);
            var point2cartographic = Crystal.Cartographic.fromCartesian(point2);
            /**根据经纬度计算出距离**/
            var geodesic = new Crystal.EllipsoidGeodesic();
            geodesic.setEndPoints(point1cartographic, point2cartographic);
            var s = geodesic.surfaceDistance;
            //返回两点之间的距离
            s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
            return s;
        }
    },
    clear(num) {
        if(this.drawList.length == 0) return;
       // _this.drawList.push({ type: "Polygon", entity: _this.viewer.entities.add(options),point:[] });
       if(parseFloat(num) == 1){
          let listNum = this.drawList.length - 1;
          let popval = this.drawList[listNum];
          this.removeEntities(popval);
          this.drawList.splice(listNum, 1);
       }else{
          this.drawList.forEach(item=>{
            this.removeEntities(item);
          })
          this.drawList = [];
       }
    },
    removeEntities(popVal){
       if(!popVal) return;
       let point = popVal.point;
       let entitys = popVal.entity;
       if(entitys){
        this.viewer.entities.remove(entitys);
       }
       if(point.length>0){
        point.forEach(item => {
            this.viewer.entities.remove(item);
        });
       }
    }
};