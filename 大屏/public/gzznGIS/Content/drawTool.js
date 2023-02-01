export const mapDrawTool = {
  viewer: null,
  drawList: [],
  handler: null,
  deleteSids: [],
  //标绘图形类型选择
  selectDrawTool(objs, callback) {
    if (!mapDrawTool.viewer) {
      mapDrawTool.viewer = pGzznCore.viewer;
    }
    if (this.handler) {
      this.clearDrawTool(this.handler, ["MOUSE_MOVE", "LEFT_CLICK", "RIGHT_CLICK"]);
    }
    if (objs.type == "circle") {
      this.DrawCircle(objs, callback);
    } else if (objs.type == "Rect") {
      this.DrawRect(objs, callback);
    } else if (objs.type == "Polygon") {
      this.drawPolygon(objs, callback);
    } else if (objs.type == "point") {
      this.drawPoint(objs, callback);
    } else if (objs.type == "line") {
      this.drawLine(objs, callback);
    } else if (objs.type == "ellipse") {
      this.DrawEllipse(objs, callback)
    }
  },
  createDrawTooltip(isFlag) {
    if (isFlag) {
      var tooltip = document.createElement('span');
      tooltip.className = "draw_toopltip_span";
      $("body").append(tooltip);
      $(".draw_toopltip_span").css({
        "max-width": "200px",
        display: "inline-block",
        position: "absolute",
        color: "#fff",
        background: "rgba(0, 44, 103, 0.45)",
        "box-shadow": "0 3px 14px 0.4",
        padding: "3px 5px",
        top: 0,
        left: 0
      });
      return tooltip;
    } else {
      return false;
    }

  },
  //画圆
  DrawCircle(objs, _callBack) {
    var color = objs && objs.color ? objs.color : "red";
    var ColorType = Array.isArray(color) ? new Crystal.Color(color[0] / 255, color[1] / 255, color[2] / 255, color[3]) : Crystal.Color.fromCssColorString(color).withAlpha(0.4);
    let _self = this;
    //_self.viewer.scene.globe.depthTestAgainstTerrain = true;
    let circle = {
      points: [],
      rect: null,
      entity: null,
      r: 1,
    };
    var tempPosition;
    let cartographic1;
    let p;
    let tempLon;
    let tempLat;
    var ShapeEventHandler = new Crystal.ScreenSpaceEventHandler(
      _self.viewer.scene.canvas
    );
    var tooltip = this.createDrawTooltip(objs.showDrawTooltip);
    //handlerList.push(ShapeEventHandler);
    ShapeEventHandler.setInputAction(function (click) {
      if (tooltip) {
        tooltip.style.left = click.position.x + 8 + "px";
        tooltip.style.top = click.position.y + 5 + "px";
      }
      tempPosition = _self.getPointFromWindowPoint(click.position);
      //选择的点在球面上
      if (tempPosition) {
        function callBackPos() {
          const minlon = Crystal.Math.toDegrees(circle.points[0].longitude);
          const minlat = Crystal.Math.toDegrees(circle.points[0].latitude);
          const maxlon = Crystal.Math.toDegrees(circle.points[1].longitude);
          const maxlat = Crystal.Math.toDegrees(circle.points[1].latitude);
          const r = _self.getFlatternDistance(minlat, minlon, maxlat, maxlon);
          if (parseFloat(objs.range)) {
            return parseFloat(objs.range) * 1000;
          } else if (r) {
            return r;
          }

          return 1;
        }
        if (circle.points.length == 0) {
          p = click.position;
          cartographic1 =
            Crystal.Ellipsoid.WGS84.cartesianToCartographic(tempPosition);
          circle.points.push(
            _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
              tempPosition
            )
          );
          circle.points.push(
            _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
              tempPosition
            )
          );
          tempLon = Crystal.Math.toDegrees(cartographic1.longitude);
          tempLat = Crystal.Math.toDegrees(cartographic1.latitude);
          circle.entity = _self.viewer.entities.add({
            position: Crystal.Cartesian3.fromDegrees(tempLon, tempLat),
            ellipse: {
              semiMinorAxis: new Crystal.CallbackProperty(callBackPos, false),
              semiMajorAxis: new Crystal.CallbackProperty(callBackPos, false),
              //条形材质
              material: ColorType,
            },
          });
          _self.drawList.push({ type: "circle", entity: circle.entity });
          //circle.entity.setEditable();
          if (tooltip) {
            tooltip.innerHTML = "请继续左键绘制下一个点,结束";
          }
          if (parseFloat(objs.range)) {
            leftFun();
          }
        } else {
          leftFun();
        }
        function leftFun() {
          _self.clearDrawTool(ShapeEventHandler, ["MOUSE_MOVE", "LEFT_CLICK"]);

          var tempCircle = new Crystal.CircleOutlineGeometry({
            center: Crystal.Cartesian3.fromDegrees(tempLon, tempLat),
            radius: callBackPos(),
            granularity: Math.PI / 100,
          });
          var geometry =
            Crystal.CircleOutlineGeometry.createGeometry(tempCircle);
          var float64ArrayPositionsIn = geometry.attributes.position.values;
          var positionsIn = [].slice.call(float64ArrayPositionsIn);
          var posI = _self.getGeometry(positionsIn);

          _self.setDrawList(objs, posI);
          _self.drawList[_self.drawList.length - 1].radius = callBackPos();
          _self.drawList[_self.drawList.length - 1].center = [tempLon, tempLat];
          //console.log(_self.drawList[_self.drawList.length - 1],"circle")
          _callBack && _callBack(_self.drawList[_self.drawList.length - 1]);
          if ($(".draw_toopltip_span") && $(".draw_toopltip_span").length > 0) {
            $(".draw_toopltip_span").remove();
          }
          $("#crystalContainer").unbind("mouseout");
        }
      }
    }, Crystal.ScreenSpaceEventType.LEFT_CLICK);

    ShapeEventHandler.setInputAction(function (movement) {
      if (tooltip) {
        $(".draw_toopltip_span").show();
        tooltip.style.left = movement.endPosition.x + 5 + "px";
        tooltip.style.top = movement.endPosition.y + 5 + "px";
      }

      if (tooltip && !tooltip.innerHTML) {
        tooltip.innerHTML = "左键单击,开始绘制圆心";
      }
      if (circle.points.length == 0) {
        return;
      }
      var moveEndPosition = _self.getPointFromWindowPoint(movement.endPosition);
      //选择的点在球面上
      if (moveEndPosition) {
        circle.points.pop();
        circle.points.push(
          _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
            moveEndPosition
          )
        );
      }
    }, Crystal.ScreenSpaceEventType.MOUSE_MOVE);

    if (tooltip) {
      $("#crystalContainer").bind("mouseout", function () {
        $(".draw_toopltip_span").hide();
      })
    }

    this.handler = ShapeEventHandler;
  },
  //画椭圆
  DrawEllipse(objs, _callBack) {
    var color = objs && objs.color ? objs.color : "red";
    var ColorType = Array.isArray(color) ? new Crystal.Color(color[0] / 255, color[1] / 255, color[2] / 255, color[3]) : Crystal.Color.fromCssColorString(color).withAlpha(0.4);
    let _self = this;
    //_self.viewer.scene.globe.depthTestAgainstTerrain = true;
    let circle = {
      points: [],
      rect: null,
      entity: null,
      r: 1,
    };
    var tempPosition;
    let cartographic1;
    let p;
    let tempLon;
    let tempLat;
    var ShapeEventHandler = new Crystal.ScreenSpaceEventHandler(
      _self.viewer.scene.canvas
    );
    var tooltip = this.createDrawTooltip(objs.showDrawTooltip);
    //handlerList.push(ShapeEventHandler);
    ShapeEventHandler.setInputAction(function (click) {
      if (tooltip) {
        tooltip.style.left = click.position.x + 8 + "px";
        tooltip.style.top = click.position.y + 5 + "px";
      }

      tempPosition = _self.getPointFromWindowPoint(click.position);
      //选择的点在球面上
      if (tempPosition) {
        function callBackPos(num) {
          const minlon = Crystal.Math.toDegrees(circle.points[0].longitude);
          const minlat = Crystal.Math.toDegrees(circle.points[0].latitude);
          const maxlon = Crystal.Math.toDegrees(circle.points[1].longitude);
          const maxlat = Crystal.Math.toDegrees(circle.points[1].latitude);
          if (num && circle.points[num]) {
            maxlon = Crystal.Math.toDegrees(circle.points[num].longitude);
            maxlat = Crystal.Math.toDegrees(circle.points[num].latitude);
          }
          const r = _self.getFlatternDistance(minlat, minlon, maxlat, maxlon);
          if (r) {
            return r;
          }

          return 1;
        }

        function _callBackPos() {
          let num = callBackPos(2);
          if (num) {
            return num * 0.6;
          }
          return 1;

        }
        if (circle.points.length == 0) {
          p = click.position;
          cartographic1 =
            Crystal.Ellipsoid.WGS84.cartesianToCartographic(tempPosition);
          circle.points.push(
            _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
              tempPosition
            )
          );
          circle.points.push(
            _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
              tempPosition
            )
          );
          tempLon = Crystal.Math.toDegrees(cartographic1.longitude);
          tempLat = Crystal.Math.toDegrees(cartographic1.latitude);

          circle.entity = _self.viewer.entities.add({
            position: Crystal.Cartesian3.fromDegrees(tempLon, tempLat),
            ellipse: {
              semiMinorAxis: new Crystal.CallbackProperty(_callBackPos, false),
              semiMajorAxis: new Crystal.CallbackProperty(callBackPos, false),
              //heightReference: Crystal.HeightReference.clampToGroud,
              //条形材质
              material: ColorType,
            },
          });
          _self.drawList.push({ type: "ellipse", entity: circle.entity });
          if (tooltip) {
            tooltip.innerHTML = "请继续左键绘制下一个点,结束";
          }
        } else {
          leftFun();
          if ($(".draw_toopltip_span") && $(".draw_toopltip_span").length > 0) {
            $(".draw_toopltip_span").remove();
          }
          $("#crystalContainer").unbind("mouseout");
        }
        function leftFun() {
          _self.clearDrawTool(ShapeEventHandler, ["MOUSE_MOVE", "LEFT_CLICK"]);

          var tempCircle = new Crystal.EllipseOutlineGeometry({
            center: Crystal.Cartesian3.fromDegrees(tempLon, tempLat),
            semiMinorAxis: _callBackPos(),
            semiMajorAxis: callBackPos(),
            rotation: Crystal.Math.toRadians(0),
            granularity: Math.PI / 100,
          });

          var geometry =
            Crystal.EllipseOutlineGeometry.createGeometry(tempCircle);
          //console.log(geometry,"geometry")
          var float64ArrayPositionsIn = geometry.attributes.position.values;
          var positionsIn = [].slice.call(float64ArrayPositionsIn);
          var posI = _self.getGeometry(positionsIn);

          _self.setDrawList(objs, posI);
          _self.drawList[_self.drawList.length - 1].radius = [_callBackPos(), callBackPos(2)].join(",");
          _self.drawList[_self.drawList.length - 1].center = [tempLon, tempLat];
          //console.log(_self.drawList[_self.drawList.length - 1],"circle")
          _callBack && _callBack(_self.drawList[_self.drawList.length - 1]);
        }
      }
    }, Crystal.ScreenSpaceEventType.LEFT_CLICK);

    ShapeEventHandler.setInputAction(function (movement) {
      if (tooltip) {
        $(".draw_toopltip_span").show();
        tooltip.style.left = movement.endPosition.x + 5 + "px";
        tooltip.style.top = movement.endPosition.y + 5 + "px";
      }

      if (tooltip && !tooltip.innerHTML) {
        tooltip.innerHTML = "左键单击,开始绘制椭圆圆心";
      }
      if (circle.points.length == 0) {
        return;
      }
      var moveEndPosition = _self.getPointFromWindowPoint(movement.endPosition);
      //选择的点在球面上
      if (moveEndPosition) {
        circle.points.pop();
        circle.points.push(
          _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
            moveEndPosition
          )
        );
      }
    }, Crystal.ScreenSpaceEventType.MOUSE_MOVE);

    if (tooltip) {
      $("#crystalContainer").bind("mouseout", function () {
        $(".draw_toopltip_span").hide();
      })
    }

    this.handler = ShapeEventHandler;
  },
  //画矩形
  DrawRect(objs, _callBack) {
    var color = objs && objs.color ? objs.color : "red";
    var ColorType = Array.isArray(color) ? new Crystal.Color(color[0] / 255, color[1] / 255, color[2] / 255, color[3]) : Crystal.Color.fromCssColorString(color).withAlpha(0.4);
    let _self = this;
    let pointsArr = [];
    let shape = {
      points: [],
      rect: null,
      entity: null,
    };
    var tempPosition;
    var handle = new Crystal.ScreenSpaceEventHandler(_self.viewer.scene.canvas);
    var tooltip = this.createDrawTooltip(objs.showDrawTooltip);
    //鼠标左键单击画点
    handle.setInputAction(function (click) {
      if (tooltip) {
        tooltip.style.left = click.position.x + 8 + "px";
        tooltip.style.top = click.position.y + 5 + "px";
      }
      tempPosition = _self.getPointFromWindowPoint(click.position);
      //选择的点在球面上
      if (tempPosition) {
        if (shape.points.length == 0) {
          pointsArr.push(tempPosition);
          shape.points.push(
            _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
              tempPosition
            )
          );
          shape.rect = Crystal.Rectangle.fromCartographicArray(shape.points);
          shape.rect.east += 0.000001;
          shape.rect.north += 0.000001;
          shape.entity = _self.viewer.entities.add({
            rectangle: {
              coordinates: shape.rect,
              material: ColorType,
              //outline: true,
              //outlineWidth: 3,
              outlineColor: Crystal.Color.RED,
              height: 0,
            },
          });
          _self.drawList.push({ type: "Rect", entity: shape.entity });
          if (tooltip) {
            tooltip.innerHTML = "请继续左键绘制下一个点,结束";
          }
          // _self.bufferEntity = _self.shape.entity;
        } else {
          _self.clearDrawTool(handle, ["MOUSE_MOVE", "LEFT_CLICK"]);

          var posI = _self.getRectGeometry([shape.rect]);

          _self.setDrawList(objs, posI);
          //console.log(posI, shape.rect, shape.points);
          _callBack && _callBack(_self.drawList[_self.drawList.length - 1]);
          if ($(".draw_toopltip_span") && $(".draw_toopltip_span").length > 0) {
            $(".draw_toopltip_span").remove();
          }
          $("#crystalContainer").unbind("mouseout");
        }
      }
    }, Crystal.ScreenSpaceEventType.LEFT_CLICK);
    //鼠标移动
    handle.setInputAction(function (movement) {
      if (tooltip) {
        $(".draw_toopltip_span").show();
        tooltip.style.left = movement.endPosition.x + 5 + "px";
        tooltip.style.top = movement.endPosition.y + 5 + "px";
      }

      if (tooltip && !tooltip.innerHTML) {
        tooltip.innerHTML = "左键单击,开始绘制矩形";
      }
      if (shape.points.length == 0) {
        return;
      }
      var moveEndPosition = _self.getPointFromWindowPoint(movement.endPosition);
      //选择的点在球面上
      if (moveEndPosition) {
        pointsArr[1] = moveEndPosition;
        shape.points[1] =
          _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
            moveEndPosition
          );
        shape.rect = Crystal.Rectangle.fromCartographicArray(shape.points);
        if (shape.rect.west == shape.rect.east) shape.rect.east += 0.000001;
        if (shape.rect.south == shape.rect.north) shape.rect.north += 0.000001;
        shape.entity.rectangle.coordinates = shape.rect;
      }
    }, Crystal.ScreenSpaceEventType.MOUSE_MOVE);

    if (tooltip) {
      $("#crystalContainer").bind("mouseout", function () {
        $(".draw_toopltip_span").hide();
      })
    }

    this.handler = handle;
  },
  //画多边形
  drawPolygon(objs, _callBack) {
    var color = objs && objs.color ? objs.color : "red";
    var ColorType = Array.isArray(color) ? new Crystal.Color(color[0] / 255, color[1] / 255, color[2] / 255, color[3]) : Crystal.Color.fromCssColorString(color).withAlpha(0.4);
    var _this = this;
    var hierarchy, options;
    var tooltip = this.createDrawTooltip(objs.showDrawTooltip);
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
        var _self = this;
        var _update = function () {
          return new Crystal.PolygonHierarchy(hierarchy);
        };
        options.polygon.hierarchy = new Crystal.CallbackProperty(
          _update,
          false
        );
        _this.drawList.push({ type: "Polygon", entity: _this.viewer.entities.add(options) });
      };
      return _;
    })();

    var handler = new Crystal.ScreenSpaceEventHandler(
      _this.viewer.scene.canvas
    );
    var positions = [];
    var poly = undefined;

    //鼠标单击画点
    handler.setInputAction(function (movement) {
      if (tooltip) {
        tooltip.style.left = movement.position.x + 8 + "px";
        tooltip.style.top = movement.position.y + 5 + "px";
      }
      var cartesian = _this.viewer.scene.camera.pickEllipsoid(
        movement.position,
        _this.viewer.scene.globe.ellipsoid
      );
      if (positions.length == 0) {
        positions.push(cartesian.clone());
      }
      positions.push(cartesian);
      if (tooltip) {
        tooltip.innerHTML = "请继续左键绘制下一个点,点击右键结束";
      }
    }, Crystal.ScreenSpaceEventType.LEFT_CLICK);
    //鼠标移动
    handler.setInputAction(function (movement) {
      if (tooltip) {
        $(".draw_toopltip_span").show();
        tooltip.style.left = movement.endPosition.x + 5 + "px";
        tooltip.style.top = movement.endPosition.y + 5 + "px";
      }

      if (tooltip && !tooltip.innerHTML) {
        tooltip.innerHTML = "左键单击,开始绘制多边形";
      }
      var cartesian = _this.viewer.scene.camera.pickEllipsoid(
        movement.endPosition,
        _this.viewer.scene.globe.ellipsoid
      );
      if (positions.length >= 2) {
        if (!Crystal.defined(poly)) {
          poly = new PolygonPrimitive(positions);
        } else {
          if (cartesian != undefined) {
            positions.pop();
            cartesian.y += 1 + Math.random();
            positions.push(cartesian);
          }
        }
      }
    }, Crystal.ScreenSpaceEventType.MOUSE_MOVE);
    //鼠标右键单击结束绘制
    handler.setInputAction(function (movement) {
      if (positions.length == 0) {
        return;
      }

      if (positions.length > 0 && positions.length < 3) {
        tooltip.innerHTML = "最少三个点，组成一个面，请继续左键绘制下一个点,点击右键结束";
        return;
      }
      _this.clearDrawTool(handler, ["MOUSE_MOVE", "LEFT_CLICK", "RIGHT_CLICK"]);
      var posI = _this.getPolygonGeometry(positions);
      _this.setDrawList(objs, posI);
      _callBack && _callBack(_this.drawList[_this.drawList.length - 1]);
      if ($(".draw_toopltip_span") && $(".draw_toopltip_span").length > 0) {
        $(".draw_toopltip_span").remove();
      }
      $("#crystalContainer").unbind("mouseout");
    }, Crystal.ScreenSpaceEventType.RIGHT_CLICK);
    if (tooltip) {
      $("#crystalContainer").bind("mouseout", function () {
        $(".draw_toopltip_span").hide();
      })
    }
    this.handler = handler;
  },
  //画点
  drawPoint(objs, _callBack) {
    var _this = this;
    //坐标存储
    var positions = [];

    var handler = new Crystal.ScreenSpaceEventHandler(
      _this.viewer.scene.canvas
    );
    var tooltip = this.createDrawTooltip(objs.showDrawTooltip);
    //单击鼠标左键画点
    handler.setInputAction(function (movement) {
      var cartesian = _this.viewer.scene.camera.pickEllipsoid(
        movement.position,
        _this.viewer.scene.globe.ellipsoid
      );
      positions.push(cartesian);
      var point = _this.viewer.entities.add({
        position: cartesian,
        // point: {
        //   color: Crystal.Color.RED,
        //   pixelSize: 6,
        //   heightReference: Crystal.HeightReference.CLAMP_TO_GROUND,
        // },
        billboard: {
          image: objs.imgUrl ? objs.imgUrl : 'gzznGIS/Image//flag.png',
          verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
          pixelOffset: new Crystal.Cartesian2(24, 0),
          width: 48,
          height: 48
        }
      });
      _this.drawList.push({ type: "point", entity: point });
      var posI = _this.getPolygonGeometry([cartesian]);
      _this.setDrawList(objs, posI);
    }, Crystal.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(function (movement) {
      if (tooltip) {
        $(".draw_toopltip_span").show();
        tooltip.style.left = movement.endPosition.x + 5 + "px";
        tooltip.style.top = movement.endPosition.y + 5 + "px";
      }

      if (tooltip && !tooltip.innerHTML) {
        tooltip.innerHTML = "左键单击标点,右键结束";
      }
    }, Crystal.ScreenSpaceEventType.MOUSE_MOVE)
    //单击鼠标右键结束画点
    handler.setInputAction(function (movement) {
      _this.clearDrawTool(handler, ["LEFT_CLICK", "RIGHT_CLICK", "MOUSE_MOVE"]);
      _callBack && _callBack(_this.drawList[_this.drawList.length - 1]);
      if ($(".draw_toopltip_span") && $(".draw_toopltip_span").length > 0) {
        $(".draw_toopltip_span").remove();
      }
      $("#crystalContainer").unbind("mouseout");
    }, Crystal.ScreenSpaceEventType.RIGHT_CLICK);

    if (tooltip) {
      $("#crystalContainer").bind("mouseout", function () {
        $(".draw_toopltip_span").hide();
      })
    }

    this.handler = handler;
  },
  //显示浮云框
  setDrawInfo(objs, callBack) {
    let _self = this;
    let viewer = this.viewer;
    let infoIds = objs.ids ? objs.ids : "#windowPopUp";
    let x = objs.lon, y = objs.lat;
    if (!x || !y) return;
    var destination = Crystal.Cartesian3.fromDegrees(x, y);
    var content = '';
    if (objs.titles) {
      content += '<div style="width: 100%;height: 30px;color: white;display: flex;justify-content: flex-start;">' +
        '<span style="display: block;height: 24px;width: 6px;background: #00fffe;flex-shrink: 0;margin-right: 18px;"></span>' +
        '<label style="display: block;height: 30px;line-height: 30px;font-size: 24px; font-weight: bold;color: white;position: absolute;top: 12px;left: 40px;">' + titles + '</label>' +
        '</div>';
    }
    let lists = objs.lists ? objs.lists : [];
    content += '<table><tbody>'
    for (var i = 0; i < lists.length; i++) {
      if (lists[i].name) {
        var unit = lists[i].unit ? lists[i].unit : "";
        var val = (lists[i].value || lists[i].value == 0) ? lists[i].value : "";
        var leftWidth = lists[i].leftWidth ? lists[i].leftWidth : "20%";
        var rightWidth = lists[i].rightWidth ? lists[i].rightWidth : "70%";
        content += '<tr><td width="' + leftWidth + '" style="color:white;">' + lists[i].name + '：</td><td width="' + rightWidth + '" style="color:white;max-width:580px">' +
          '<input style="color:#000;border: 0;outline: 0;border-radius: 5px;background: #fff;" type="text" autocomplete="off" name="' + lists[i].keys + '" value="' + val + '"/>' + unit + '</td></tr>';
      } else if (!lists[i].name && !lists[i].value) {
        content += '<tr><td style="color:white;">' + lists[i] + '</td></tr>';
      }
    }

    content += '</tbody></table>';
    content += '<div style="text-align:center;margin-top: 5px;">';
    content += '<span title="确定" class="sureBtn" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-right: 10px;"> 确定' +
      '</span>';
    content += '<span  title="取消" class="cancelBtn"  style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-left: 10px;"> 取消 </span>';
    content += '</div>';
    $('#windowPopUp').hide();
    if (infoIds == "#trackPopUp") {
      $(".leaflet-popup-close-button_track").click();
      $('#trackPopUp').hide();
    }
    var obj = { position: Crystal.Cartesian3.fromDegrees(x, y), destination: destination, content: content };

    infoWindow(obj);
    function infoWindow(obj) {
      $(infoIds + 'Link').empty();
      $(infoIds + 'Link').append(obj.content);
      function positionPopUp(c) {
        var x = c.x - ($(infoIds + 'Content').width()) / 2;
        var y = c.y - ($(infoIds + 'Content').height());
        $(infoIds + 'Content').css('transform', 'translate3d(' + x + 'px, ' + (y - 10) + 'px, 0)');
      }
      let xy = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, Crystal.Cartesian3.fromDegrees(x, y));
      var c = new Crystal.Cartesian2(xy.x, xy.y);
      $(infoIds).show();
      positionPopUp(c);

      var removeHandler = viewer.scene.postRender.addEventListener(function (res) {
        try {
          var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
          if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
            positionPopUp(changedC);
            c = changedC;
          }
        }
        catch (err) { }
      });
      $(".sureBtn").click(function () {
        infoSure(this);
      })
      $(".cancelBtn").click(function () {
        infoCancel(this);
      })
      $(".leaflet-popup_lyz").css("max-width", "780px");
      var closeBtn = infoIds == "#trackPopUp" ? '.leaflet-popup-close-button_track' : '.leaflet-popup-close-button_lyz';
      $(closeBtn).click(function () {
        // if (marker) {
        //   marker._properties.isFlagPopule = false;
        // }

        viewer.selectedEntity = undefined;
        $(infoIds).hide();
        $(infoIds + 'Link').empty();
        removeHandler.call();
        return false;
      });

      function infoSure(self) {
        var ele = $(self).parents('#trackPopUpLink').find("input[name='name']");
        objs.text = $.trim($(ele).val());
        _self.drawLabel(objs)
      };
      function infoCancel() {
        $(closeBtn).click();
      };
      return "";
    }
  },
  //标绘label
  drawLabel(objs) {
    var _self = this;
    if (_self.drawList[objs.num].label) {
      this.viewer.entities.remove(_self.drawList[objs.num].label);
    }
    var color = objs && objs.color ? objs.color : "red";
    var ColorType = Array.isArray(color) ? new Crystal.Color(color[0] / 255, color[1] / 255, color[2] / 255, color[3]) : Crystal.Color.fromCssColorString(color).withAlpha(0.8);
    let labels = _self.viewer.entities.add({
      position: Crystal.Cartesian3.fromDegrees(objs.lon, objs.lat),
      label: {
        text: objs.text,
        font: '14px sans-serif',
        style: Crystal.LabelStyle.FILL,
        outlineWidth: 1,
        fillColor: ColorType,
        verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
        pixelOffset: new Crystal.Cartesian2(0, 0),
        showBackground: true,
        backgroundColor: new Crystal.Color(0.12, 0.14, 0.2, .6),
        scale: 0.8,
        scaleByDistance: new Crystal.NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0),
        heightReference: Crystal.HeightReference.CLAMP_TO_GROUND
      }
    })
    _self.drawList[objs.num].label = labels;
    _self.drawList[objs.num].name = objs.text;
  },
  //画线
  drawLine(objs, _callBack) {
    var tooltip = this.createDrawTooltip(objs.showDrawTooltip);
    var color = objs && objs.color ? objs.color : "red";
    var ColorType = Array.isArray(color) ? new Crystal.Color(color[0] / 255, color[1] / 255, color[2] / 255, color[3]) : Crystal.Color.fromCssColorString(color);
    var _this = this;
    var options, lists;
    var PolyLinePrimitive = (function () {
      function _(positions) {
        options = {
          polyline: {
            show: true,
            positions: [],
            material: ColorType,
            width: 3
          }
        };
        lists = positions;
        this._init();
      }

      _.prototype._init = function () {
        var _self = this;
        var _update = function () {
          return lists;
        };
        //实时更新polyline.positions
        options.polyline.positions = new Crystal.CallbackProperty(_update, false);
        // _this.viewer.entities.add(options);
        _this.drawList.push({ type: "line", entity: _this.viewer.entities.add(options) });
      };
      return _;
    })();

    var handler = new Crystal.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
    var positions = [];
    var poly = undefined;
    //鼠标左键单击画点
    handler.setInputAction(function (movement) {
      if (tooltip) {
        tooltip.style.left = movement.position.x + 8 + "px";
        tooltip.style.top = movement.position.y + 5 + "px";
      }
      var cartesian = _this.viewer.scene.camera.pickEllipsoid(movement.position, _this.viewer.scene.globe.ellipsoid);
      if (positions.length == 0) {
        positions.push(cartesian.clone());
      }
      positions.push(cartesian);
      if (tooltip) {
        tooltip.innerHTML = "请继续左键绘制下一个点,点击右键结束";
      }
    }, Crystal.ScreenSpaceEventType.LEFT_CLICK);
    //鼠标移动
    handler.setInputAction(function (movement) {
      if (tooltip) {
        $(".draw_toopltip_span").show();
        tooltip.style.left = movement.endPosition.x + 5 + "px";
        tooltip.style.top = movement.endPosition.y + 5 + "px";
      }

      if (tooltip && !tooltip.innerHTML) {
        tooltip.innerHTML = "左键单击,开始画线";
      }
      var cartesian = _this.viewer.scene.camera.pickEllipsoid(movement.endPosition, _this.viewer.scene.globe.ellipsoid);
      if (positions.length >= 2) {
        if (!Crystal.defined(poly)) {
          poly = new PolyLinePrimitive(positions);
        } else {
          if (cartesian != undefined) {
            positions.pop();
            cartesian.y += (1 + Math.random());
            positions.push(cartesian);
          }
        }
      }
    }, Crystal.ScreenSpaceEventType.MOUSE_MOVE);
    //单击鼠标右键结束画线
    handler.setInputAction(function (movement) {
      if (positions.length == 0) {
        return;
      }
      _this.clearDrawTool(handler, ["MOUSE_MOVE", "LEFT_CLICK", "RIGHT_CLICK"]);
      //console.log(positions,"line")
      var posI = _this.getPolygonGeometry(positions);
      _this.setDrawList(objs, posI);
      _callBack && _callBack(_this.drawList[_this.drawList.length - 1]);
      if ($(".draw_toopltip_span") && $(".draw_toopltip_span").length > 0) {
        $(".draw_toopltip_span").remove();
      }
      $("#crystalContainer").unbind("mouseout");
    }, Crystal.ScreenSpaceEventType.RIGHT_CLICK);

    if (tooltip) {
      $("#crystalContainer").bind("mouseout", function () {
        $(".draw_toopltip_span").hide();
      })
    }
    this.handler = handler;
  },
  clearDrawTool(Handler, arrayType, callBack) {
    let viewer = this.viewer;
    if (!Handler) { return; }
    arrayType.forEach((item) => {
      if (Handler.getInputAction(Crystal.ScreenSpaceEventType[item])) {
        Handler.removeInputAction(
          Crystal.ScreenSpaceEventType[item]
        );
      }
    })
    Handler.destroy();
    this.handler = null;
    if ($(".draw_toopltip_span") && $(".draw_toopltip_span").length > 0) {
      $(".draw_toopltip_span").remove();
    }
    $("#crystalContainer").unbind("mouseout");
    callBack && callBack();
  },
  //计算两点间距离
  getFlatternDistance(lat1, lng1, lat2, lng2) {
    var EARTH_RADIUS = 6378137.0; //单位M
    var PI = Math.PI;

    function getRad(d) {
      return (d * PI) / 180.0;
    }
    var f = getRad((lat1 + lat2) / 2);
    var g = getRad((lat1 - lat2) / 2);
    var l = getRad((lng1 - lng2) / 2);

    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);

    var s, c, w, r, d, h1, h2;
    var a = EARTH_RADIUS;
    var fl = 1 / 298.257;

    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;

    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;

    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;

    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
  },
  getPointFromWindowPoint(point) {
    if (
      this.viewer.scene.terrainProvider.constructor.name ==
      "EllipsoidTerrainProvider"
    ) {
      return this.viewer.camera.pickEllipsoid(
        point,
        this.viewer.scene.globe.ellipsoid
      );
    } else {
      var ray = this.viewer.scene.camera.getPickRay(point);
      return this.viewer.scene.globe.pick(ray, this.viewer.scene);
    }
  },
  getGeometry(pos) {
    var posTemp = {
      geometry: [],
      lon: [],
      lat: [],
    };
    for (var i = 0; i < pos.length; i = i + 3) {
      var sT = new Crystal.Cartesian3(pos[i], pos[i + 1], pos[i + 2]);
      // circlepoints.push(sT);
      let cartographic = Crystal.Cartographic.fromCartesian(sT);
      posTemp.geometry.push(Crystal.Math.toDegrees(cartographic.longitude));
      posTemp.lon.push(Crystal.Math.toDegrees(cartographic.longitude));
      posTemp.geometry.push(Crystal.Math.toDegrees(cartographic.latitude));
      posTemp.lat.push(Crystal.Math.toDegrees(cartographic.latitude));
    }

    return posTemp;
  },
  getRectGeometry(pos) {
    var posTemp = {
      geometry: [],
      lon: [],
      lat: [],
    };
    for (var i = 0; i < pos.length; i++) {
      let northeast = Crystal.Rectangle.northeast(pos[i]),
        northwest = Crystal.Rectangle.northwest(pos[i]),
        southeast = Crystal.Rectangle.southeast(pos[i]),
        southwest = Crystal.Rectangle.southwest(pos[i]);
      const leftTop = [
        Crystal.Math.toDegrees(northwest.longitude),
        Crystal.Math.toDegrees(northwest.latitude),
      ], //左上角经度
        leftBottom = [
          Crystal.Math.toDegrees(southwest.longitude),
          Crystal.Math.toDegrees(southwest.latitude),
        ], //左下角经度
        rightTop = [
          Crystal.Math.toDegrees(northeast.longitude),
          Crystal.Math.toDegrees(northeast.latitude),
        ], //右上角经度
        rightBottom = [
          Crystal.Math.toDegrees(southeast.longitude),
          Crystal.Math.toDegrees(southeast.latitude),
        ]; //右下角经度
      posTemp.geometry = posTemp.geometry
        .concat(leftTop)
        .concat(leftBottom)
        .concat(rightBottom)
        .concat(rightTop);
      posTemp.lon.push(leftTop[0]);
      posTemp.lat.push(leftTop[1]);
      posTemp.lon.push(leftBottom[0]);
      posTemp.lat.push(leftBottom[1]);
      posTemp.lon.push(rightBottom[0]);
      posTemp.lat.push(rightBottom[1]);
      posTemp.lon.push(rightTop[0]);
      posTemp.lat.push(rightTop[1]);
    }

    return posTemp;
  },
  getPolygonGeometry(pos) {
    var posTemp = {
      geometry: [],
      lon: [],
      lat: [],
    };
    for (var i = 0; i < pos.length; i++) {
      var point = this.Cartesian3_to_WGS84(pos[i]);
      posTemp.geometry.push(point.lon);
      posTemp.geometry.push(point.lat);
      posTemp.lon.push(point.lon);
      posTemp.lat.push(point.lat);
    }
    return posTemp;
  },
  Cartesian3_to_WGS84(point) {
    var cartesian33 = new Crystal.Cartesian3(point.x, point.y, point.z);
    var cartographic = Crystal.Cartographic.fromCartesian(cartesian33);
    var lat = Crystal.Math.toDegrees(cartographic.latitude);
    var lng = Crystal.Math.toDegrees(cartographic.longitude);
    var alt = cartographic.height;
    return { lat: lat, lon: lng, alt: alt };
  },
  //WGS84坐标系转笛卡尔坐标系
  WGS84_to_Cartesian3(point) {
    var car33 = Crystal.Cartesian3.fromDegrees(point.lng, point.lat, point.alt);
    var x = car33.x;
    var y = car33.y;
    var z = car33.z;
    return { x: x, y: y, z: z };
  },
  setDrawList(objs, posI) {
    let _self = this;
    var nums = objs.drawListLayer ? objs.drawListLayer.num : (_self.drawList.length - 1);
    let popVal = _self.drawList[nums];
    popVal.geometry = posI;
    let pointLayerType = []
    if (objs.pointLayerType) {
      objs.pointLayerType.forEach(item => {
        pointLayerType.push(item + (nums + 1))
      });
    }
    popVal.pointLayerType = pointLayerType;
    objs.lon = posI.lon[0];
    objs.lat = posI.lat[0];
    objs.lists = [{ name: "名称", keys: "name", value: "" }];
    objs.ids = "#trackPopUp";
    objs.num = nums;
    popVal.objs = objs;
    _self.drawList[objs.num].strType = objs.strType;
    //popVal.entity_id = "draw_"+popVal.entity._id;
    //console.log(popVal.entity,"entity")
    if (objs.isFlagPopule) {
      _self.setDrawInfo(objs);
    }

    if (objs.labelShow && objs.text) {
      _self.drawLabel(objs);
    }
  },
  //选择渲染类型图形
  selectRender(objs, callback) {
    if (!this.viewer) {
      this.viewer = pGzznCore.viewer;
    }
    if (objs.sid) {
      let pointLayer = pGzznCore.findArray(this.drawList, "sid", objs.sid);
      if (pointLayer) {
        objs.drawListLayer = pointLayer;
      }
    }

    if (objs.type == "circle") {
      this.renderCircle(objs, callback);
    } else if (objs.type == "Rect") {
      this.renderRect(objs, callback);
    } else if (objs.type == "Polygon") {
      this.renderRect(objs, callback);
    } else if (objs.type == "point") {
      this.renderPoint(objs, callback);
    } else if (objs.type == "line") {
      this.renderLine(objs, callback);
    } else if (objs.type == "ellipse") {
      this.renderEllipse(objs, callback)
    }
  },
  //渲染圆
  renderCircle(objs, callback) {
    var color = objs && objs.color ? objs.color : "red";
    var ColorType = Array.isArray(color) ? new Crystal.Color(color[0] / 255, color[1] / 255, color[2] / 255, color[3]) : Crystal.Color.fromCssColorString(color).withAlpha(0.4);
    let _self = this;
    let tempLon = objs.lon, tempLat = objs.lat;
    if (!_self.viewer) {
      _self.viewer = pGzznCore.viewer;
    }
    let entity = _self.viewer.entities.add({
      position: Crystal.Cartesian3.fromDegrees(tempLon, tempLat),
      ellipse: {
        semiMinorAxis: objs.radius,
        semiMajorAxis: objs.radius,
        //条形材质
        material: ColorType,
      },
    });
    var num = objs.drawListLayer ? objs.drawListLayer.num : 0;
    if (objs.drawListLayer) {
      _self.drawList[num].entity = entity;
    } else {
      _self.drawList.push({ type: "circle", entity: entity });
      num = _self.drawList.length - 1;
    }

    _self.drawList[num].radius = objs.radius;
    _self.drawList[num].center = [tempLon, tempLat];
    let posI = _self.getposI(objs);

    _self.setDrawList(objs, posI);
    _self.drawList[num].sid = objs.sid;
    callback && callback(_self.drawList[num]);
  },
  //渲染椭圆
  renderEllipse(objs, callback) {
    var color = objs && objs.color ? objs.color : "red";
    var ColorType = Array.isArray(color) ? new Crystal.Color(color[0] / 255, color[1] / 255, color[2] / 255, color[3]) : Crystal.Color.fromCssColorString(color).withAlpha(0.4);
    let _self = this;
    let tempLon = objs.lon, tempLat = objs.lat;
    if (!_self.viewer) {
      _self.viewer = pGzznCore.viewer;
    }
    let entity = _self.viewer.entities.add({
      position: Crystal.Cartesian3.fromDegrees(tempLon, tempLat),
      ellipse: {
        semiMinorAxis: objs.radius.split(",")[0],
        semiMajorAxis: objs.radius.split(",")[1],
        //条形材质
        material: ColorType,
      },
    });
    var num = objs.drawListLayer ? objs.drawListLayer.num : 0;
    if (objs.drawListLayer) {
      _self.drawList[num].entity = entity;
    } else {
      _self.drawList.push({ type: "ellipse", entity: entity });
      num = _self.drawList.length - 1;
    }

    _self.drawList[num].radius = objs.radius;
    _self.drawList[num].center = [tempLon, tempLat];
    let posI = _self.getposI(objs);

    _self.setDrawList(objs, posI);
    _self.drawList[num].sid = objs.sid;
    callback && callback(_self.drawList[num]);
  },
  //渲染多边形
  renderRect(objs, callback) {
    var color = objs && objs.color ? objs.color : "red";
    var ColorType = Array.isArray(color) ? new Crystal.Color(color[0] / 255, color[1] / 255, color[2] / 255, color[3]) : Crystal.Color.fromCssColorString(color).withAlpha(0.4);
    let _self = this;
    if (!_self.viewer) {
      _self.viewer = pGzznCore.viewer;
    }
    let posI = _self.getposI(objs);

    let entity = _self.viewer.entities.add({
      polygon: {
        hierarchy: Crystal.Cartesian3.fromDegreesArray(posI.geometry),
        //perPositionHeight: true,
        material: ColorType,
      },
    });
    var num = objs.drawListLayer ? objs.drawListLayer.num : 0;
    if (objs.drawListLayer) {
      _self.drawList[num].entity = entity;
    } else {
      _self.drawList.push({ type: "Rect", entity: entity });
      num = _self.drawList.length - 1;
    }

    _self.setDrawList(objs, posI);
    _self.drawList[num].sid = objs.sid;
    callback && callback(_self.drawList[num]);
  },
  //渲染线
  renderLine(objs, callback) {
    var color = objs && objs.color ? objs.color : "red";
    var ColorType = Array.isArray(color) ? new Crystal.Color(color[0] / 255, color[1] / 255, color[2] / 255, color[3]) : Crystal.Color.fromCssColorString(color);
    let _self = this;
    if (!_self.viewer) {
      _self.viewer = pGzznCore.viewer;
    }
    let posI = _self.getposI(objs);
    let entity = _self.viewer.entities.add({
      polyline: {
        show: true,
        positions: Crystal.Cartesian3.fromDegreesArray(posI.geometry),
        material: ColorType,
        width: 3
      }
    })
    var num = objs.drawListLayer ? objs.drawListLayer.num : 0;
    if (num) {
      _self.drawList[num].entity = entity;
    } else {
      _self.drawList.push({ type: "line", entity: entity });
      num = _self.drawList.length - 1;
    }

    _self.setDrawList(objs, posI);
    _self.drawList[num].sid = objs.sid;
    callback && callback(_self.drawList[num]);
  },
  //渲染点
  renderPoint(objs, callback) {
    let _self = this;
    if (!_self.viewer) {
      _self.viewer = pGzznCore.viewer;
    }
    let posI = _self.getposI(objs);
    let entity = _self.viewer.entities.add({
      position: Crystal.Cartesian3.fromDegrees(posI.lon[0], posI.lat[0]),
      billboard: {
        image: objs.imgUrl ? objs.imgUrl : 'gzznGIS/Image//flag.png',
        verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
        pixelOffset: new Crystal.Cartesian2(24, 0),
        width: 48,
        height: 48
      }
    });
    var num = objs.drawListLayer ? objs.drawListLayer.num : 0;
    if (objs.drawListLayer) {
      _self.drawList[num].entity = entity;
    } else {
      _self.drawList.push({ type: "point", entity: entity });
      num = _self.drawList.length - 1;
    }

    _self.setDrawList(objs, posI);
    _self.drawList[num].sid = objs.sid;
    callback && callback(_self.drawList[num]);
  },
  chenckInput() {
    let reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  },
  getposI(objs) {
    var posTemp = {
      geometry: [],
      lon: [],
      lat: [],
    };
    posTemp.lon = objs.lons.split(',');
    posTemp.lat = objs.lats.split(',');
    for (var i = 0; i < posTemp.lon.length; i++) {
      let item = posTemp.lon[i];
      if (!item) continue;
      posTemp.geometry.push(item);
      posTemp.geometry.push(posTemp.lat[i]);
    }

    return posTemp;
  },
  //获取全局唯一值
  getGUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  },
  //工具条
  initToolLocation() { //默认工具条的右边定位
    pGzznCore.indicatorShow();
    let offset = 210;
    if (mapToolLocation != 0) {
      offset = mapToolLocation - 1433 + 163;
    }
    let mainToolbar = document.getElementsByClassName('crystal-viewer-toolbar')[0];
    mainToolbar.style.top = "200px";
    mainToolbar.style.left = offset + "px";
    document.getElementsByClassName('crystal-viewer-geocoderContainer')[0].style.display = 'none';
    document.getElementsByClassName('crystal-home-button')[0].style.display = 'none';
    document.getElementsByClassName('crystal-sceneModePicker-wrapper')[0].style.display = 'none';
    document.getElementsByClassName('crystal-toolbar-button')[0].style.display = 'none';
    $("button.crystal-button.crystal-toolbar-button[title='天地图影像']").hide();
    let clientWidth = document.body.clientWidth;
    if (clientWidth < 3000) {
      document.querySelector(".status-bar").style.fontSize = '20px';
      let tempVideoZM = document.getElementById("videoZM");
      if (tempVideoZM != undefined) {
        //document.getElementById("videoZM").style.cssText = "width: 200px; height: 520px;font-size: 20px;";
        tempVideoZM.style.width = "200px";
        tempVideoZM.style.height = "520px";
        tempVideoZM.style.fontSize = "20px";
      }
      document.getElementById("trackPopUp").style.fontSize = "20px";
      document.getElementById("windowPopUp").style.fontSize = "20px";
    }
    $(".crystal-baseLayerPicker-dropDown").css("left", 0)
  },
  initTool(top, right) {
    let mainToolbar = document.getElementsByClassName('crystal-viewer-toolbar')[0];
    mainToolbar.style.top = top;
    mainToolbar.style.right = right;
    $("button.crystal-button.crystal-toolbar-button[title='天地图影像']").hide();
  },
  clear(num, type, callBack) {
    var that = this;
    if (this.drawList.length > 0) {
      if (parseFloat(num) == 1) {
        let Layers = pGzznCore.findArray(this.drawList, "strType", type, true);
        //this.viewer.entities.remove(this.drawList[Layers.num].entity);       
        if (!Layers) {
          callBack && callBack();
          return
        };
        const nums = Layers[Layers.length - 1].num;
        let popVals = this.drawList[nums];
        removeFun(popVals);
        this.drawList.splice(nums, 1);
      } else {
        let listNum = [];
        for (let i = 0; i < this.drawList.length; i++) {
          const popVal = this.drawList[i];
          if (popVal.strType == type) {
            removeFun(popVal);
          } else {
            listNum.push(popVal);
          }
        }

        this.drawList = listNum;
      }

      function removeFun(popVal) {
        that.viewer.entities.remove(popVal.entity);
        if (popVal.label) {
          that.viewer.entities.remove(popVal.label);
        }
        if (popVal.pointLayerType) {
          popVal.pointLayerType.forEach((item) => {
            pGzznCore.pointLayerRemove({ type: item });
          })
        }
        if (popVal.sid) {
          that.deleteSids.push(popVal.sid);
        }
      }
      if (this.handler) {
        this.clearDrawTool(this.handler, ["MOUSE_MOVE", "LEFT_CLICK", "RIGHT_CLICK"]);
      }
      callBack && callBack();
    }

  },
  drawCircleOutline(entity, vRadius = 1000.0, color = "red", type, objs, callBack) {
    if (!mapDrawTool.viewer) {
      mapDrawTool.viewer = pGzznCore.viewer;
    }
    var viewer = this.viewer;
    var that = this;
    if (!entity || (type == "circle" && (!entity.x || !entity.y))) {
      return;
    }
    if (type == "Polygon") {
      var polygon = new Crystal.PolygonOutlineGeometry({
        polygonHierarchy: new Crystal.PolygonHierarchy(
          Crystal.Cartesian3.fromDegreesArray(entity)
        )
      });
      var geometry = Crystal.PolygonOutlineGeometry.createGeometry(polygon);
    } else {
      if (!objs.isbd09towgs84) {
        var lonLat = bd09towgs84(parseFloat(entity.x), parseFloat(entity.y));
      } else {
        var lonLat = [parseFloat(entity.x), parseFloat(entity.y)];
      }

      let cPos = Crystal.Cartesian3.fromDegrees(lonLat[0], lonLat[1]);
      var circleOutline = new Crystal.CircleOutlineGeometry({
        center: cPos,
        radius: vRadius,
        granularity: Math.PI / 1000,
      });
      var geometry = Crystal.CircleOutlineGeometry.createGeometry(circleOutline);
    }
    var float64ArrayPositions = geometry.attributes.position.values;
    var pos = [].slice.call(float64ArrayPositions);
    var posI = that.getGeometry(pos);

    var ColorType = Array.isArray(color) ? new Crystal.Color(color[0] / 255, color[1] / 255, color[2] / 255, color[3]) : Crystal.Color.fromCssColorString(color).withAlpha(0.8);
    var instance = new Crystal.GeometryInstance({
      geometry: new Crystal.GroundPolylineGeometry({
        positions: Crystal.Cartesian3.fromDegreesArray(posI.geometry),
        loop: true,
        width: objs && objs.width ? objs.width : 10.0
      }),
      attributes: {
        color: Crystal.ColorGeometryInstanceAttribute.fromColor(ColorType)
      }
    });
    primitiveOutline = new Crystal.GroundPolylinePrimitive({
      geometryInstances: instance,
      appearance: new Crystal.PolylineColorAppearance()
    });
    var primitiveOutline = viewer.scene.groundPrimitives.add(primitiveOutline);
    that.drawList.push({ type: type, entity: primitiveOutline, strType: objs.strType });
    if (objs && objs.text) {
      viewer.entities.add({
        position: Crystal.Cartesian3.fromDegrees(objs.lon, objs.lat),
        label: {
          text: objs.text,
          font: '16px sans-serif',
          style: Crystal.LabelStyle.FILL,
          outlineWidth: 1,
          //fillColor: Crystal.Color.WHITE,
          fillColor: ColorType,
          verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
          pixelOffset: new Crystal.Cartesian2(20, -20),
          showBackground: true,
          backgroundColor: new Crystal.Color(0.12, 0.14, 0.2, .6)
        }
      })
    }

    callBack && callBack(posI)
  }
};

