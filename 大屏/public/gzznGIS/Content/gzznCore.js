function gzznCore(crystalID,cOptions){ //广州应急指挥调度平台
	var viewer = null;
	var viewerEx = null;
	var viewerEx2 = null;
	if(cOptions!=undefined){ //适配可视化的调用
		if(cOptions.terrainUrl!=undefined){
			terrainUrl = cOptions.terrainUrl;
		}
		if(cOptions.websiteUrl!=undefined){
			websiteUrl = cOptions.websiteUrl;
		}
	}
	else{
		cOptions = {};
	}
	if(terrainUrl!=''){
		let terrainProvider = new Crystal.CrystalTerrainProvider({url: terrainUrl});
		//cOptions.terrainProvider = terrainProvider;
		cOptions.terrainProvider = new Crystal.EllipsoidTerrainProvider({});
		// cOptions.requestRenderMode = true;
		// cOptions.maximumRenderTimeChange = Infinity;
		//cOptions.resolutionScale = 0.8;
		viewer = new Crystal.Viewer(crystalID,cOptions);		
	}
	else{
		viewer = new Crystal.Viewer(crystalID);
	}
	//viewer.scene.requestRenderMode = true;
	//viewer.scene.maximumRenderTimeChange = Infinity;

	//viewer.scene.requestRender();
	//viewer.scene.terrainProvider = new Crystal.EllipsoidTerrainProvider({});
	//-------------------加载中科星图的底图----------------------------
	/**
	viewer.scene.imageryLayers.removeAll();
	var providerTest = new Crystal.WebMapServiceImageryProvider({
		url : 'http://10.201.30.23:8310/tilecache/service/wms',
		layers : 'GuangZhou_Image-JPEG-4326',
		parameters : {
			transparent : true,     //是否透明
			format : 'image/jpeg',
			version: '1.1.0',
			srs:'EPSG:4326',
			MAP_KEY:'be9a5db1671a659738216ed9f1d255fa',
		}
	});
	viewer.imageryLayers.addImageryProvider(providerTest); */
	
	viewer.animation.container.style.visibility = 'hidden';
	viewer.timeline.container.style.visibility = 'hidden';
	//viewer.mainToolbar.style.visibility = 'hidden';
	viewer.leftToolbar.style.visibility = 'hidden';
	viewer.infoBox.container.style.visibility = 'hidden';
	viewer.infoBox.container.style.display = 'none';
	layer.config({extend : 'style.css',skin : 'layer-ext-lyz'});
	CrystalNavigation.umd(viewer, {'enableCompass':true,'enableZoomControls':true,'enableDistanceLegend':true,'enableCompassOuterRing':true,});
	var infoDiv = '<div id="trackPopUp" style="display:none;font-size: 28px;font-weight: 400;">'+
	'<div id="trackPopUpContent" class="leaflet-popup_lyz" style="top:5px;left:0;">'+'<a class="leaflet-popup-close-button_track" href="#" style="font-size: 30px;">×</a>' +
	  '<div class="leaflet-popup-content-wrapper_lyz" style="border: 2px solid #01ffff;">'+
	    '<div id="trackPopUpLink" class="leaflet-popup-content_lyz"></div>'+
	  '</div>'+
	  '<div class="leaflet-popup-tip-container_lyz">'+
	    '<div class="leaflet-popup-tip_warning"></div>'+
	  '</div>'+
	'</div>'+
	'</div>';
	$("#" + crystalID).append(infoDiv); /**<div class="leaflet-popup-content-wrapper_lyz" style="border: 8px solid #D91441;">*/
	this.infoWindow = '<div id="windowPopUp" style="display:none;font-size: 28px;font-weight: 400;">'+
	'<div id="windowPopUpContent" class="leaflet-popup_lyz" style="top:5px;left:0;">'+'<a class="leaflet-popup-close-button_lyz" href="#" style="font-size: 30px;">×</a>' +
	  '<div class="leaflet-popup-content-wrapper_lyz" style="border: 2px solid #01ffff;">'+
	    '<div id="windowPopUpLink" class="leaflet-popup-content_lyz"></div>'+
	  '</div>'+
	  '<div class="leaflet-popup-tip-container_lyz">'+
	    '<div class="leaflet-popup-tip_warning"></div>'+
	  '</div>'+
	'</div>'+
	'</div>';
	$("#" + crystalID).append(this.infoWindow);
	var handler3D = new Crystal.ScreenSpaceEventHandler(viewer.scene.canvas);
	var zgLineDataSource = null;
	var gdLineDataSource = null;
	var gzLineDataSource = null;
	var lwLineDataSource = null;
	var hpLineDataSource = null;
	var guangZhouDataSource = null;
	var gzPointDataSource = null;
	var geoJsonAreaDataSource = null;
	var layer3DIndex = null;
	var sectionIndex = [];
	var locationIndex = null;
	var measureIndex = null;
	var navigationIndex = null;
	var cameraListIndex = null;
	var bookmarkListIndex = null;
	var plottingIndex = null;
	var plottingStyleIndex = null;
	var flyingThroughIndex = null;
	var flyingThroughParamIndex = null;
	var mSelectPlot = null;
	var mGroundPrimitives = [];
	var mEntities = [];
	var nEntities = [];
	var mPlotEntities = [];
	var mTempPlotEntities = [];
	var shedEntities = [];
	var splitScreenLinkage = false;
	var splitScreenLinkageEx = false;
	var leftViewPortHint = null;
	var leftViewPort = null;
	var leftViewPortHandler = null;
	var flyingEntity = null;
	var particleSystem = [];
	var pEntities = [];
	var particleSnow = null;
	var particleRain = null;
	var particleFog = null;
	var programIndex = null;
	var campIndex = null;
	var czmlRoutedataSource = null;
	var routeThroughParamIndex = null;
	var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
	var y_PI = 3.1415926535897932384626;
	var axis = 6378245.0;
	var ee = 0.00669342162296594323;
	var crystalPanorama = null;
	var panoramaLng = 113.3417701633946;
	var panoramaLat = 23.146842269703498;
	var panoramaAtl = 17.0806190541792;
	var panoramaEventHandler = null;
	var leftClickFunction = null;
	var configurationIndex = null;
	var switchSunlight = false;
	var terrainTransparencyIndex = null;
	var TerrainTransparency = null;
	var terrainExcavationIndex = null;
	var terrainClipPlan = null;
	var pDetailsInfo = null;
	var teamType = new Array();
	var storageType = {"0":"常备药物","1":"灭火器材","2":"医疗用品","3":"粮食储备","4":"通用类"};
	var storageGrade = {"1":"一级","2":"二级","3":"三级","4":"四级","5":"五级"};
	var warehouseFlag = new Array();
	var loctionArray = [8,7,6,5,4,3,2,1];
	var videoArray = new Array();
	var video1Array = new Array();
	var videoIdArray = new Array();
	var videoDeviceIdArray = new Array();
	var cameraFlags = {
		looking : false,
		moveForward : false,
		moveBackward : false,
		moveUp : false,
		moveDown : false,
		moveLeft : false,
		moveRight : false
	};
	var droneEntities = []; //存储实时巡航无人机实体与轨迹实体
	var droneStatus = new Array(); //存储无人机实时状态信息，支持多架无人机
	this.coordTransition = function(){
		
	}
	function wgs84togcj02(lng, lat){
		if (out_of_china(lng, lat)) {
          return [lng, lat]
        } else {
          var dlat = transformlat(lng - 105.0, lat - 35.0);
          var dlng = transformlng(lng - 105.0, lat - 35.0);
          var radlat = lat / 180.0 * y_PI;
          var magic = Math.sin(radlat);
          magic = 1 - ee * magic * magic;
          var sqrtmagic = Math.sqrt(magic);
          dlat = (dlat * 180.0) / ((axis * (1 - ee)) / (magic * sqrtmagic) * y_PI);
          dlng = (dlng * 180.0) / (axis / sqrtmagic * Math.cos(radlat) * y_PI);
          var mglat = lat + dlat;
          var mglng = lng + dlng;
          return [mglng, mglat]
        }
	}
	function gcj02towgs84(lng, lat){
		if (out_of_china(lng, lat)) {
          return [lng, lat]
        } else {
          var dlat = transformlat(lng - 105.0, lat - 35.0);
          var dlng = transformlng(lng - 105.0, lat - 35.0);
          var radlat = lat / 180.0 * y_PI;
          var magic = Math.sin(radlat);
          magic = 1 - ee * magic * magic;
          var sqrtmagic = Math.sqrt(magic);
          dlat = (dlat * 180.0) / ((axis * (1 - ee)) / (magic * sqrtmagic) * y_PI);
          dlng = (dlng * 180.0) / (axis / sqrtmagic * Math.cos(radlat) * y_PI);
          var mglat = lat + dlat;
          var mglng = lng + dlng;
          return [lng * 2 - mglng, lat * 2 - mglat]
        }
	}
	function bd09towgs84(lng, lat) {
		if (out_of_china(lng, lat)) {
			return [lng, lat];
		} else {
			var x = lng - 0.0065;
			var y = lat - 0.006;
			var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
			var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
			var gg_lng = z * Math.cos(theta);
			var gg_lat = z * Math.sin(theta);
			
			var dlat = transformlat(gg_lng - 105.0, gg_lat - 35.0);
			var dlng = transformlng(gg_lng - 105.0, gg_lat - 35.0);
			var radlat = gg_lat / 180.0 * y_PI;
			var magic = Math.sin(radlat);
				magic = 1 - ee * magic * magic;
			var sqrtmagic = Math.sqrt(magic);
			    dlat = (dlat * 180.0) / ((axis * (1 - ee)) / (magic * sqrtmagic) * y_PI);
			    dlng = (dlng * 180.0) / (axis / sqrtmagic * Math.cos(radlat) * y_PI);
			var mglat = gg_lat + dlat;
			var mglng = gg_lng + dlng;
			return [gg_lng * 2 - mglng, gg_lat * 2 - mglat]
		}
	}
	function wgs84tobd09(lng, lat) {
		if (out_of_china(lng, lat)) {
			return [lng, lat];
		} else {
			var dlat = transformlat(lng - 105.0, lat - 35.0);
			var dlng = transformlng(lng - 105.0, lat - 35.0);
			var radlat = lat / 180.0 * y_PI;
			var magic = Math.sin(radlat);
			magic = 1 - ee * magic * magic;
			var sqrtmagic = Math.sqrt(magic);
			dlat = (dlat * 180.0) / ((axis * (1 - ee)) / (magic * sqrtmagic) * y_PI);
			dlng = (dlng * 180.0) / (axis / sqrtmagic * Math.cos(radlat) * y_PI);
			var mglat = lat + dlat;
			var mglng = lng + dlng;
			var z = Math.sqrt(mglng * mglng + mglat * mglat) + 0.00002 * Math.sin(mglat * x_PI);
			var theta = Math.atan2(mglat, mglng) + 0.000003 * Math.cos(mglng * x_PI);
			bd_lng = z * Math.cos(theta) + 0.0065;
			bd_lat = z * Math.sin(theta) + 0.006;
			return [bd_lng, bd_lat];
		}
	}
	function transformlat(lng, lat) {
		var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
		ret += (20.0 * Math.sin(6.0 * lng * y_PI) + 20.0 * Math.sin(2.0 * lng * y_PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(lat * y_PI) + 40.0 * Math.sin(lat / 3.0 * y_PI)) * 2.0 / 3.0;
		ret += (160.0 * Math.sin(lat / 12.0 * y_PI) + 320 * Math.sin(lat * y_PI / 30.0)) * 2.0 / 3.0;
		return ret
	}
	function transformlng(lng, lat) {
		var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
		ret += (20.0 * Math.sin(6.0 * lng * y_PI) + 20.0 * Math.sin(2.0 * lng * y_PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(lng * y_PI) + 40.0 * Math.sin(lng / 3.0 * y_PI)) * 2.0 / 3.0;
		ret += (150.0 * Math.sin(lng / 12.0 * y_PI) + 300.0 * Math.sin(lng / 30.0 * y_PI)) * 2.0 / 3.0;
		return ret
	}
	function out_of_china(lng, lat) {
		return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
	}
	function rtPickMouse(mouse_move) {
		if(document.getElementById('camera_alt')==null){return;}
		document.getElementById('camera_alt').innerHTML = '视点高：' + viewer.camera.positionCartographic.height.toFixed(2) + '米';
		var cPoint = new Crystal.Cartesian2(mouse_move.x, mouse_move.y);
		var cPick = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
		if (cPick != undefined) {
			var geoPoint = viewer.scene.globe.ellipsoid.cartesianToCartographic(cPick);
			var height = viewer.scene.globe.getHeight(geoPoint);
			document.getElementById('env_lon').innerHTML = '经度：' + Crystal.Math.toDegrees(geoPoint.longitude).toFixed(6);
			document.getElementById('env_lat').innerHTML = '纬度：' + Crystal.Math.toDegrees(geoPoint.latitude).toFixed(6);
			if(height == undefined){
				document.getElementById('env_alt').innerHTML = '海拔：NaN米';
			}
			else{
				document.getElementById('env_alt').innerHTML = '海拔：' + height.toFixed(2) + '米';	
			}
		}
	}
	function rtPick() {
		/**
		if(document.getElementById('camera_alt')==null){return;}
		document.getElementById('camera_alt').innerHTML = '视点高：' + viewer.camera.positionCartographic.height.toFixed(2) + '米';
		var main = document.getElementById(crystalID);
	    var mainWidth = main.offsetWidth / 2;
	    var mainHeight = main.offsetHeight / 2;
		var cPoint = new Crystal.Cartesian2(mainWidth, mainHeight);
		var cPick = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
		if (cPick != undefined) {
			var geoPoint = viewer.scene.globe.ellipsoid.cartesianToCartographic(cPick);
			var height = viewer.scene.globe.getHeight(geoPoint);
			document.getElementById('env_lon').innerHTML = '经度：' + Crystal.Math.toDegrees(geoPoint.longitude).toFixed(6);
			document.getElementById('env_lat').innerHTML = '纬度：' + Crystal.Math.toDegrees(geoPoint.latitude).toFixed(6);
			if(height == undefined){
				document.getElementById('env_alt').innerHTML = '海拔：NaN米';
			}
			else{
				document.getElementById('env_alt').innerHTML = '海拔：' + height.toFixed(2) + '米';	
			}
		} */
		var cameraHeight = viewer.scene.globe.ellipsoid.cartesianToCartographic(viewer.camera.position).height;
		var moveRate = cameraHeight / 100.0;
		if (cameraFlags.moveForward) {
			viewer.camera.moveForward(moveRate);
		}
		if (cameraFlags.moveBackward) {
			viewer.camera.moveBackward(moveRate);
		}
		if (cameraFlags.moveUp) {
			viewer.camera.moveUp(moveRate);
		}
		if (cameraFlags.moveDown) {
			viewer.camera.moveDown(moveRate);
		}
		if (cameraFlags.moveLeft) {
			viewer.camera.moveLeft(moveRate);
		}
		if (cameraFlags.moveRight) {
			viewer.camera.moveRight(moveRate);
		}
	}
	function getFlagForKeyCode(keyCode) {
		switch (keyCode) {
		case 'W'.charCodeAt(0):
			return 'moveUp';
		case 'S'.charCodeAt(0):
			return 'moveDown';
		case 'Q'.charCodeAt(0):
			return 'moveForward';
		case 'E'.charCodeAt(0):
			return 'moveBackward';
		case 'D'.charCodeAt(0):
			return 'moveRight';
		case 'A'.charCodeAt(0):
			return 'moveLeft';					
		case 40:
			return 'moveDown';
		case 37:
			return 'moveLeft';
		case 39:
			return 'moveRight';
		case 38:
			return 'moveUp';
		default:
			return undefined;
		}
	}
	// document.addEventListener('keydown', function(e) {
	// 	var flagName = getFlagForKeyCode(e.keyCode);
	// 	if (typeof flagName !== 'undefined') {
	// 		cameraFlags[flagName] = true;
	// 	}
	// }, false);
	// document.addEventListener('keyup', function(e) {
	// 	var flagName = getFlagForKeyCode(e.keyCode);
	// 	if (typeof flagName !== 'undefined') {
	// 		cameraFlags[flagName] = false;
	// 	}
	// }, false);
	function rtPickEx() {
		if(splitScreenLinkageEx){
			
		}
	}
	function switchFocus(){
		if(splitScreenLinkage){
			viewerEx.scene.camera.setView({
				destination: Crystal.Cartesian3.fromRadians(viewer.camera.positionCartographic.longitude,viewer.camera.positionCartographic.latitude,viewer.camera.positionCartographic.height),
				orientation: {
					heading: viewer.camera.heading,
					pitch: viewer.camera.pitch,
					roll: viewer.camera.roll
				}
			});
		}
	}
	function switchFocusEx(){
		if(splitScreenLinkageEx){
			viewer.scene.camera.setView({
				destination: Crystal.Cartesian3.fromRadians(viewerEx.camera.positionCartographic.longitude,viewerEx.camera.positionCartographic.latitude,viewerEx.camera.positionCartographic.height),
				orientation: {
					heading: viewerEx.camera.heading,
					pitch: viewerEx.camera.pitch,
					roll: viewerEx.camera.roll
				}
			});
		}
	}
	function switchTrigger(e){
		e = e || window.event;
		var node = e.target || e.srcElement;
		if( window._lastNode != node ){
			if(node.parentElement){
				if(node.parentElement.parentElement){
					if(node.parentElement.parentElement.parentElement){
						if(node.parentElement.parentElement.parentElement.parentElement){
							if(node.parentElement.parentElement.parentElement.parentElement.id == crystalID){
								splitScreenLinkage = true;
								splitScreenLinkageEx = false;
							}
							else if(node.parentElement.parentElement.parentElement.parentElement.id == (crystalID + 'Ex')){
								splitScreenLinkage = false;
								splitScreenLinkageEx = true;
							}
						}
					}
				}
			}
		}
	}
	function loadZgPolyline(){
		if(zgLineDataSource == null){
			Crystal.GeoJsonDataSource.load('Model/zgLine.json',{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				zgLineDataSource = dataSource;
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity = entities[i];
					entity.polyline.width = 3;
					entity.polyline.material = Crystal.Color.RED.withAlpha(0.9);
				}
			});
		}
		else{
			viewer.dataSources.add(zgLineDataSource);
		}
	}
	function loadGdPolyline(){
		if(gdLineDataSource == null){
			Crystal.GeoJsonDataSource.load('Model/gdLine.json',{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				gdLineDataSource = dataSource;
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity = entities[i];
					entity.polyline.width = 3;
					entity.polyline.material = Crystal.Color.RED.withAlpha(0.9);
				}
			});
		}
		else{
			viewer.dataSources.add(gdLineDataSource);
		}
	}
	this.gzLineightColour = false;
	function loadGzPolyline(){
		if(gzLineDataSource == null){
			Crystal.GeoJsonDataSource.load(websiteUrl+'gzznGIS/Model/gzLine.json',{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				gzLineDataSource = dataSource;
				var entities = dataSource.entities.values;

				for(var i=0;i<entities.length;i++){
					var entity = entities[i];
					entity.polyline.width = (!pGzznCore.gzLineightColour ? 3 : 2) ;
					entity.polyline.material = Crystal.Color.RED.withAlpha((!pGzznCore.gzLineightColour ? 0.9 : 0.3));
				}
			});
		}
		else{
			viewer.dataSources.add(gzLineDataSource);
		}
	}
	function loadLwPolyline(){
		if(lwLineDataSource == null){
			Crystal.GeoJsonDataSource.load('Model/lwLine.json',{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				lwLineDataSource = dataSource;
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity = entities[i];
					entity.polyline.width = 3;
					entity.polyline.material = Crystal.Color.RED.withAlpha(0.9);
				}
			});
		}
		else{
			viewer.dataSources.add(lwLineDataSource);
		}
	}
	function loadHpPolyline(){
		if(hpLineDataSource == null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/hpLine.json',{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				hpLineDataSource = dataSource;
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity = entities[i];
					entity.polyline.width = 3;
					entity.polyline.material = Crystal.Color.fromCssColorString('#1EBAE0');
				}
			});
		}
		else{
			viewer.dataSources.add(hpLineDataSource);
		}
	}
	this.FlyTo = function(pParam,callBack){
		pGzznCore.indicatorShow(); //所有地图都打开蒙板
		initMainToolLocation();	
		if(pParam == undefined||pParam==2){
			initNavigationLocation();
			setTimeout(function(){viewer.camera.flyTo({
				destination : Crystal.Cartesian3.fromDegrees(defaultCoord.x, defaultCoord.y, defaultCoord.z),
				orientation : {
					heading : defaultCoord.heading,
					pitch : defaultCoord.pitch,
					roll : defaultCoord.roll
				},
				complete : function(){
					openLayer3D(pParam);
					if(pParam==2){
						oneMagFlag = 2;
						let pParam = {page: 1,pageSize: 100000,body:{eventType: "10007"}}
						$.ajax({
							type : 'POST',
							contentType : "application/json;charset-UTF-8",
							url:webEventListUrl,
							cache:false,
							async:true,
							data:JSON.stringify(pParam),
							success:function(pData) {
								let vValue = pData.body;
								let geoEventList = {};
								geoEventList.type = "FeatureCollection";
								geoEventList.totalFeatures = vValue.length;
								geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
								let geoFeatures = [];
								for(let i =0;i<vValue.length;i++){
									let geometry = {};
									geometry.type = "Point";
									if(vValue[i].eventCoordinate==null){
										continue;
									}
									let arrCoord = vValue[i].eventCoordinate.split(',');
									geometry.coordinates = [parseFloat(arrCoord[0]),parseFloat(arrCoord[1])];
									let propertie = {};
									propertie.NAME = vValue[i].eventName;
									propertie.LOCATION = vValue[i].eventPlace;
									propertie.TIME = vValue[i].eventTime;
									propertie.REMARK = vValue[i].eventDiscribe;
									propertie.LEVEL = vValue[i].eventLevel;
									propertie.LAYER = 20;

									let geoFeature = {};
									geoFeature.type = "Feature";
									geoFeature.id = "Event_"+vValue[i].sid;
									geoFeature.geometry = geometry;
									geoFeature.geometry_name = "the_geom";
									geoFeature.properties = propertie;
									geoFeatures.push(geoFeature);
								}
								geoEventList.features = geoFeatures;
								Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
									DrowningEventSource = dataSource;
									viewer.dataSources.add(dataSource);
									var entities = dataSource.entities.values;
									for(var i=0;i<entities.length;i++){
										var entity=entities[i];
										entity.billboard.width=35;
										entity.billboard.height=45;
										if(entity._properties._LEVEL._value == '4'){
											entity.billboard.image = 'gzznGIS/Image/iEvent4.svg';
										}
										else if(entity._properties._LEVEL._value == '3'){
											entity.billboard.image = 'gzznGIS/Image/iEvent3.svg';
										}
										else if(entity._properties._LEVEL._value == '2'){
											entity.billboard.image = 'gzznGIS/Image/iEvent2.svg';
										}
										else if(entity._properties._LEVEL._value == '1'){
											entity.billboard.image = 'gzznGIS/Image/iEvent1.svg';
										}
										if(i==0){
											mEntity = entity;
										}
									}
									if(mEntity!=null){
										viewer.flyTo(mEntity,{
											offset : {
												heading : viewer.camera.heading,
												pitch : viewer.camera.pitch,
												range : 24659
										}});
										setTimeout(function(){
											let name = mEntity._name;
											let time = mEntity._properties._TIME._value;
											let address = mEntity._properties._LOCATION._value;
											let remake = mEntity._properties._REMARK._value;
											pEventInfo = mEntity._id;
											let content1= '';
											content1 ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
													+'<tr><td width="10%" style="color:white;">时间：</td><td width="85%" style="color:white;">'+time+'</td></tr>'
													+'<tr><td width="10%" style="color:white;">地点：</td><td width="85%" style="color:white;">'+address+'</td></tr>'
													+'<tr><td width="10%" style="color:white;">简介：</td><td width="85%" style="color:white;max-width: 600px;">'+remake+'</td></tr>';
											content1+='</tbody></table>';
											var main = document.getElementById(crystalID);
											var mainWidth = main.offsetWidth / 2;
											var mainHeight = main.offsetHeight / 2;
											let screenPos = {'x':mainWidth,'y':mainHeight};//Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, mEntity.position._value);
											var cPoint = new Crystal.Cartesian2(screenPos.x, screenPos.y);
											var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
											var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
											var height = viewer.scene.globe.getHeight(geoPt1);
											var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
											var content= {};
											content.content=content1;
											content.position=Crystal.Cartesian3.fromDegrees(point[0], point[1], height);
											content.screen = screenPos;
											viewer.selectedEntity = mEntity;
											infoWindow(content);
											function infoWindow(obj) {
												$('#trackPopUpLink').empty();
												$('#trackPopUpLink').append(obj.content);    		            	
												function positionPopUp (c) {
													var x = c.x - ($('#trackPopUpContent').width()) / 2;
													var y = c.y - ($('#trackPopUpContent').height());
													$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-50) + 'px, 0)');
												}
												var c = new Crystal.Cartesian2(obj.screen.x, obj.screen.y);
												$('#trackPopUp').show();
												positionPopUp(c);
												
												removeEventHandler = viewer.scene.postRender.addEventListener(function () {
													try{
														var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
														if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
															positionPopUp(changedC);
															c = changedC;
														}
													}
													catch(err){}
												});
												
												$('.leaflet-popup-close-button_track').click(function() {
													//viewer.selectedEntity = undefined;
													//if(!pUrgentType){
														//viewer.dataSources.remove(DrowningEventSource);
													//}
													$('#trackPopUp').hide();
													$('#trackPopUpLink').empty();
													//offWartime();
													removeEventHandler.call();
													return false;
												});
												return "";
											};
											eventRange(mEntity,1000.0,false);
											droneFlyPath();
											var layer3D = document.getElementById('layer3D');
											//打开古树名木
											{
												if(layer3D!=null){
												   let isBool = layer3D.children[0].contentWindow.getTreeNodeState(111);
												   if(!isBool){
													   layer3D.children[0].contentWindow.setTreeNode(111);
												   }
												}
											}
											//打开救火队伍
											{
												if(layer3D!=null){
												   let isBool = layer3D.children[0].contentWindow.getTreeNodeState(181);
												   if(!isBool){
													   layer3D.children[0].contentWindow.setTreeNode(181);
												   }
												}
											}
											//打开救火专家
											{
												if(layer3D!=null){
												   let isBool = layer3D.children[0].contentWindow.getTreeNodeState(182);
												   if(!isBool){
													   layer3D.children[0].contentWindow.setTreeNode(182);
												   }
												}
											}
											//打开避难场所
											{
												if(layer3D!=null){
												   let isBool = layer3D.children[0].contentWindow.getTreeNodeState(201);
												   if(!isBool){
													   layer3D.children[0].contentWindow.setTreeNode(201);
												   }
												}												   
											}
											//打开蓄水池
											{
												if(layer3D!=null){
												   let isBool = layer3D.children[0].contentWindow.getTreeNodeState(175);
												   if(!isBool){
													   layer3D.children[0].contentWindow.setTreeNode(175);
												   }
												}
											}
											//打开摄像头
											//{
												//if(layer3D!=null){
												   //let isBool = layer3D.children[0].contentWindow.getTreeNodeState(193);
												   //if(!isBool){
													   //layer3D.children[0].contentWindow.setTreeNode(193);
												   //}
												//}
											//}
											//打开城管危化视频
											//{
												//if(layer3D!=null){
												   //let isBool = layer3D.children[0].contentWindow.getTreeNodeState(1640);
												   //if(!isBool){
													   //layer3D.children[0].contentWindow.setTreeNode(1640);
												   //}
												//}
											//}
										}, 3000);
									}
								});
							},
							error:function(data) {
								console.log("EnterprisesDataError");
							}
						});
					}
					else{
						setTimeout(function(){
							//var layer3D = document.getElementById('layer3D');
							//打开城管危化视频
							//{
								//if(layer3D!=null){
								   //let isBool = layer3D.children[0].contentWindow.getTreeNodeState(1640);
								   //if(!isBool){
									   //layer3D.children[0].contentWindow.setTreeNode(1640);
								   //}
								//}
							//}
						}, 3000);
					}
				}
			});},3000);
		}
		else{
			if(pParam==1){
				oneMagFlag = 1;
				initNavigationLocation(callBack);
			}
			else if(pParam==10){
				viewer.camera.flyTo({
					destination : Crystal.Cartesian3.fromDegrees(defaultCoordOverview.x, defaultCoordOverview.y, defaultCoordOverview.z),
					orientation : {
						heading : defaultCoordOverview.heading,
						pitch : defaultCoordOverview.pitch,
						roll : defaultCoordOverview.roll
					},
					complete : function(){
						//document.getElementById("windowPopUpLink").style.minWidth = "550px";
						//document.getElementById("trackPopUpLink").style.minWidth = "550px";
					}
				}); 
			}
			else if(pParam==11){ //全市隐患企业一张图
				initNavigationLocation();
				viewer.camera.flyTo({
					destination : Crystal.Cartesian3.fromDegrees(defaultCoordHiddendanger.x, defaultCoordHiddendanger.y, defaultCoordHiddendanger.z),
					orientation : {
						heading : defaultCoordHiddendanger.heading,
						pitch : defaultCoordHiddendanger.pitch,
						roll : defaultCoordHiddendanger.roll
					},
					complete : function(){
					}
				}); 
			}
			else if(pParam==12){ //危化一张图
				viewer.camera.flyTo({
					destination : Crystal.Cartesian3.fromDegrees(defaultCoordHChemicals.x, defaultCoordHChemicals.y, defaultCoordHChemicals.z),
					orientation : {
						heading : defaultCoordHChemicals.heading,
						pitch : defaultCoordHChemicals.pitch,
						roll : defaultCoordHChemicals.roll
					},
					complete : function(){
						//document.getElementById("windowPopUpLink").style.minWidth = "550px";
						//document.getElementById("trackPopUpLink").style.minWidth = "550px";
						addPromiseGzHazardousPoint();
					}
				}); 
			}
			else if(pParam==13){ //龙舟水平时
				initNavigationLocation();
				viewer.camera.flyTo({
					destination : Crystal.Cartesian3.fromDegrees(defaultCoordBoatNormal.x, defaultCoordBoatNormal.y, defaultCoordBoatNormal.z),
					orientation : {
						heading : defaultCoordBoatNormal.heading,
						pitch : defaultCoordBoatNormal.pitch,
						roll : defaultCoordBoatNormal.roll
					},
					complete : function(){
					}
				}); 
			}
			else if(pParam==15){ //三防
				initNavigationLocation();
				viewer.camera.flyTo({
					destination : Crystal.Cartesian3.fromDegrees(defaultCoordThreeProofing.x, defaultCoordThreeProofing.y, defaultCoordThreeProofing.z),
					orientation : {
						heading : defaultCoordThreeProofing.heading,
						pitch : defaultCoordThreeProofing.pitch,
						roll : defaultCoordThreeProofing.roll
					},
					complete : function(){
						//document.getElementById("windowPopUpLink").style.minWidth = "550px";
						//document.getElementById("trackPopUpLink").style.minWidth = "550px";
					}
				}); 
			}
			else if(pParam==16){ //重大危险源
				initNavigationLocation();
				viewer.camera.flyTo({
					destination : Crystal.Cartesian3.fromDegrees(defaultCoordCitysDanger.x, defaultCoordCitysDanger.y, defaultCoordCitysDanger.z),
					orientation : {
						heading : defaultCoordCitysDanger.heading,
						pitch : defaultCoordCitysDanger.pitch,
						roll : defaultCoordCitysDanger.roll
					},
					complete : function(){
						//document.getElementById("windowPopUpLink").style.minWidth = "550px";
						//document.getElementById("trackPopUpLink").style.minWidth = "550px";
					}
				}); 
			}
			else if(pParam==17){ //应急资源一张图
				initNavigationLocation();
				viewer.camera.flyTo({
					destination : Crystal.Cartesian3.fromDegrees(defaultCoordResource.x, defaultCoordResource.y, defaultCoordResource.z),
					orientation : {
						heading : defaultCoordResource.heading,
						pitch : defaultCoordResource.pitch,
						roll : defaultCoordResource.roll
					},
					complete : function(){
						//document.getElementById("windowPopUpLink").style.minWidth = "550px";
						//document.getElementById("trackPopUpLink").style.minWidth = "550px";
					}
				}); 
			}
			else if(pParam==18){ //粉尘涉爆一张图
				//initNavigationLocation();
				viewer.camera.flyTo({
					destination : Crystal.Cartesian3.fromDegrees(defaultCoordDustExplosion.x, defaultCoordDustExplosion.y, defaultCoordDustExplosion.z),
					orientation : {
						heading : defaultCoordDustExplosion.heading,
						pitch : defaultCoordDustExplosion.pitch,
						roll : defaultCoordDustExplosion.roll
					},
					complete : function(){
						//document.getElementById("windowPopUpLink").style.minWidth = "550px";
						//document.getElementById("trackPopUpLink").style.minWidth = "550px";
					}
				}); 
			}
			else if(pParam==19){
				viewer.camera.flyTo({
					destination : Crystal.Cartesian3.fromDegrees(defaultCoordAchievement.x, defaultCoordAchievement.y, defaultCoordAchievement.z),
					orientation : {
						heading : defaultCoordAchievement.heading,
						pitch : defaultCoordAchievement.pitch,
						roll : defaultCoordAchievement.roll
					},
					complete : function(){
						//document.getElementById("windowPopUpLink").style.minWidth = "550px";
						//document.getElementById("trackPopUpLink").style.minWidth = "550px";
					}
				}); 
			}
		}
	}
	function droneRealTimeFly(){ //根据无人机实时回传的状态信息飞行
		var DronePrimitive = (function () {
			function _(mPositions,headingPitchRoll) {
				this.options = {
					name: 'DroneRealTime02',
					position:null,
					orientation:null,
					model: {
						uri: 'gzznGIS/Model/Drone.glb',
						scale: 5,
						minimumPixelSize: 128
					}
				};
				this.positions = mPositions;
				this.HeadingPitchRoll = headingPitchRoll;
				this._init();
			}
			_.prototype._init = function () {
				var _self = this;
				var _update = function () {
					let tempPos = _self.positions[_self.positions.length-1];
					return Crystal.Cartesian3.fromDegrees(tempPos.x, tempPos.y, tempPos.z);
				};
				var _updateN = function () {
					let tempPos = _self.positions[_self.positions.length-1];
					let cPos = Crystal.Cartesian3.fromDegrees(tempPos.x, tempPos.y, tempPos.z);
					let hpr = new Crystal.HeadingPitchRoll(_self.HeadingPitchRoll.heading, _self.HeadingPitchRoll.pitch, _self.HeadingPitchRoll.roll);
					return Crystal.Transforms.headingPitchRollQuaternion(cPos, hpr);
				};
				this.options.position = new Crystal.CallbackProperty(_update, false);
				this.options.orientation = new Crystal.CallbackProperty(_updateN, false);
				flyingEntity = viewer.entities.add(this.options);
			};
			return _;
		})();
		
	}
	var timelineTick = 1;
	var timeGreenStart = 0;
	var timeGreenEnd = 0;
	this.addPromiseUpdateTeamPath = function(vValue,callBack){
		if(teamRealPathFlag==0){return;}
		if(timeGreenStart==0){timeGreenStart=vValue;}else{timeGreenEnd=vValue;}
		if(teamRealPathPoint.length == teamRealPathFlag){
			for (let i = 0;i < teamEntities.length;i++){
				viewer.entities.remove(teamEntities[i]);
			}
			teamEntities = [];
			for(let i=0;i<teamRealpathData.features.length;i++){
				let feature = teamRealpathData.features[i];
				let coord = null;
				let coordPath = null;
				if(teamPathArray[feature.id].length<=timelineTick){
					coord = teamPathArray[feature.id][teamPathArray[feature.id].length-1];
					coordPath = teamRouteArray[feature.id];
					if(teamArriveArray[feature.id]==undefined){
						let backJson = {};
						let arrValue = feature.id.split('_');
						let sid;
						if(arrValue.length>1){
							sid = arrValue[1];
						}
						backJson.sid = sid;
						backJson.name = feature.properties.NAME;
						backJson.people = feature.properties.PersonnelNum;
						backJson.teamId = feature.properties.TeamName;
						backJson.phone = feature.properties.Contacts;
						backJson.equipmentList = feature.properties.EquipmentList;
						backJson.sceneReliefMaterialsList = feature.properties.SceneReliefMaterialsList;
						if(callBack!=undefined){
							callBack(backJson);	
						}
						teamArriveArray[feature.id] =1;
					}
				}
				else{
					coord = teamPathArray[feature.id][timelineTick];
					coordPath = teamRouteArray[feature.id].slice(0,(2+timelineTick*2));
					if(feature.id == teamEntitieSid){
						if( $('#trackPopUp').css("display") != 'none' ){
							Crystal.when(Crystal.sampleTerrain(viewer.scene.terrainProvider,12,[new Crystal.Cartographic(coord.x, coord.y, 3000.0)]), function (updatedPositions) {
								let pos = Crystal.Cartesian3.fromDegrees(updatedPositions[0].longitude,updatedPositions[0].latitude,updatedPositions[0].height)
								var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, pos);
								function positionPopUp (c) {
									var x = c.x - ($('#trackPopUpContent').width()) / 2;
									var y = c.y - ($('#trackPopUpContent').height());
									$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
								}
								positionPopUp(changedC);
							});
						}
					}
				}
				let arrCoord = [];
					arrCoord.push(coord.x);
					arrCoord.push(coord.y);
					feature.geometry.coordinates = arrCoord;
					teamEntities.push(viewer.entities.add({
					name: '',
					corridor: {                    
						positions: Crystal.Cartesian3.fromDegreesArray(coordPath),
						material: Crystal.Color.fromCssColorString('#01ffff'),
						width: 32.0,
						outline : true,
						outlineColor : Crystal.Color.RED
					}
				}));
			}
			viewer.dataSources.remove(teamPositionInfoDataSource);
			teamPositionInfoDataSource = null;
			Crystal.GeoJsonDataSource.load(teamRealpathData,{clampToGround: true}).then(function (dataSource) {
				teamPositionInfoDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					entity.billboard.width=35;
					entity.billboard.height=45;
					entity.billboard.image = 'gzznGIS/Image/forTeam.svg';
					if(teamArriveArray[entity.id]!=undefined){
						entity.billboard.show = false;
					}
				}
			});
			timelineTick++;
		}
	}
	this.addPromiseRollbackTeamPath = function(vValue){
		let tempValue = Math.floor(vValue);
		let index = Math.floor(timeGreenEnd) - tempValue;
		let timeIndex = timelineTick - index;
		for (let i = 0;i < teamEntities.length;i++){
			viewer.entities.remove(teamEntities[i]);
		}
		teamEntities = [];
		if(timeIndex<0){timeIndex=0;}
		teamRollbackArray = new Array();
		for(let i=0;i<teamRealpathData.features.length;i++){
			let feature = teamRealpathData.features[i];
			let coord = null;
			let coordPath = null;
			if(teamPathArray[feature.id].length<=timeIndex){
				coord = teamPathArray[feature.id][teamPathArray[feature.id].length-1];
				coordPath = teamRouteArray[feature.id];
				if(teamRollbackArray[feature.id]==undefined){
					teamRollbackArray[feature.id] =1;
				}
			}
			else{
				coord = teamPathArray[feature.id][timeIndex];
				coordPath = teamRouteArray[feature.id].slice(0,(2+timeIndex*2));
			}
			let arrCoord = [];
			arrCoord.push(coord.x);
			arrCoord.push(coord.y);
			feature.geometry.coordinates = arrCoord;
			teamEntities.push(viewer.entities.add({
				name: '',
				corridor: {                    
					positions: Crystal.Cartesian3.fromDegreesArray(coordPath),
					material: Crystal.Color.fromCssColorString('#01ffff'),
					width: 32.0,
					outline : true,
					outlineColor : Crystal.Color.RED
				}
			}));
		}
		viewer.dataSources.remove(teamPositionInfoDataSource);
		teamPositionInfoDataSource = null;
		Crystal.GeoJsonDataSource.load(teamRealpathData,{clampToGround: true}).then(function (dataSource) {
			teamPositionInfoDataSource = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				entity.billboard.image = 'gzznGIS/Image/forTeam.svg';
				if(teamRollbackArray[entity.id]!=undefined){
					entity.billboard.show = false;
				}
			}
		});
		
	}
	var teamEntities = [];
	var teamRealPathPoint = [];
	var teamRealPathFlag = 0;
	var teamRealpathData = null;
	var teamPathArray = new Array();
	var teamRouteArray = new Array();
	var teamArriveArray = new Array();
	var teamRollbackArray = new Array();
	function teamRealPathNew(geoData){
		if(mEntity==null){return;}
		let cartesian = mEntity._position._value;
		let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
		let style = {styleValue:'0',isTrueMid:false}
		let dest = {};
		dest.x = Crystal.Math.toDegrees(cartographic.longitude);
		dest.y = Crystal.Math.toDegrees(cartographic.latitude);
		teamRealPathFlag = geoData.features.length;
		teamRealpathData = geoData;
		teamPathArray = new Array();
		teamRouteArray = new Array();
		teamArriveArray = new Array();
		teamRollbackArray = new Array();
		timelineTick = 1;
		teamRealPathPoint = [];
		Crystal.GeoJsonDataSource.load(teamRealpathData,{clampToGround: true}).then(function (dataSource) {
			teamPositionInfoDataSource = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				entity.billboard.image = 'gzznGIS/Image/forTeam.svg';
			}
		});
		for(let i=0;i<geoData.features.length;i++){
			let sJson = [];
			let coord = geoData.features[i].geometry.coordinates;
			let org = {};
			org.x = coord[0];
			org.y = coord[1];
			sJson.push(org);
			sJson.push(dest);
			let sid = geoData.features[i].id;
			RequestTianDiTuRoute(sJson,style,sid);
		}
	}
	function RequestTianDiTuRoute(strJson, strStyle, strID){
		let orig = '';
		let dest = '';
		let mid = '';
		for(let i = 0; i< strJson.length; i++){
			if(i==0){
				orig = strJson[0].x + ',' + strJson[0].y;
			}
			else if(i==strJson.length-1){
				dest = strJson[strJson.length-1].x + ',' + strJson[strJson.length-1].y;
			}
			else{
				mid = strJson[i].x + ',' + strJson[i].y + ';';
			}
		}
		mid = mid.substr(0,mid.length-1);
		let style = strStyle.styleValue;
		let isTrueMid = strStyle.isTrueMid;
		let strUrl = null;
		if(isTrueMid){
			strUrl = 'http://api.tianditu.gov.cn/drive?postStr={"orig":"'+orig+'","dest":"'+dest+'","mid":"'+mid+'","style":"'+style+'"}&type=search&tk=2ca23b42d039bb3facdcae2f61ab9c82';
		}
		else{
			strUrl = 'http://api.tianditu.gov.cn/drive?postStr={"orig":"'+orig+'","dest":"'+dest+'","style":"'+style+'"}&type=search&tk=2ca23b42d039bb3facdcae2f61ab9c82';
		}
		const xhr = new XMLHttpRequest();
	    var geoJson = strUrl;
	    xhr.responseType = 'text/xml';
	    xhr.open('get', geoJson, true);
	    xhr.onload = function () {
		   if (xhr.status >= 200 && xhr.status < 300) {
			 geoJson = xhr.response;
			 let returnJson = xmlStrToJsonObj(geoJson);
			 let arrJson = returnJson.split(';');
			 let routePath = [];
			 let arrResult = [];
			 for(let i = 0;i < arrJson.length;i++){
				 let temp = arrJson[i].split(',');
				 if(temp.length == 2){
					 routePath.push(parseFloat(temp[0]));
					 routePath.push(parseFloat(temp[1]));
					 let tempJ = {};
					 tempJ.x = parseFloat(temp[0]);
					 tempJ.y = parseFloat(temp[1]);
					 arrResult.push(tempJ);
				 }
			 }
			 teamRealPathPoint.push(1);
			 teamPathArray[strID] = arrResult;
			 teamRouteArray[strID] = routePath;
			 mEntities.push(viewer.entities.add({
					name: '',
					corridor: {                    
						positions: Crystal.Cartesian3.fromDegreesArray(routePath),
						material: Crystal.Color.DARKBLUE.withAlpha(0.8),
						width: 32.0,
						outline : true,
						outlineColor : Crystal.Color.RED
					}
				}));
		   } else {
			 throw new Error(xhr.statusText);
		   }
	   };
	   xhr.send();
	}
	function teamRealPath(){ //应急队伍实时行走路径
		$.ajax({
			type : 'GET',
			contentType : "application/json;charset-UTF-8",
			url:webFindTealTimePathUrl+'?pageSize=100000&page=1',
			cache:false,
			async:true,
			success:function(pData) {
				for (var i = 0;i < mEntities.length;i++)
				{
					viewer.entities.remove(mEntities[i]);
				}
				mEntities = [];
				for (var i = 0;i < nEntities.length;i++)
				{
					//viewer.dataSources.remove(dataSource.entities.getById(nEntities[i]));
				}
				nEntities = [];
				for(let i=0;i<pData.body.length;i++){
					if(pData.body[i].latLons.length>0){
						let routePath = [];
						let arrResult = [];
						let routeID = 'Vehicle'+i;
						for(let j=0;j<pData.body[i].latLons.length;j++){
							let tData = pData.body[i].latLons[j];
							routePath.push(parseFloat(tData[0]));
							routePath.push(parseFloat(tData[1]));
							let time = j * 10.0;
							arrResult.push(time);
							arrResult.push(parseFloat(tData[0]));
							arrResult.push(parseFloat(tData[1]));
							arrResult.push(50); 
						}
						let czml = [
							{
							  id: 'document',
							  name: '',
							  version: '1.0',
							  clock: {
								interval: '2012-08-04T16:00:00Z/2012-08-04T16:06:00Z',//规定时间范围
								currentTime: '2012-08-04T16:00:00Z',//当前时间
								multiplier: 1,
							  },
							},
							{
							  id: routeID,
							  name: '',
							  position: { 
								interpolationAlgorithm: 'LINEAR',
								forwardExtrapolationType: 'HOLD',
								epoch: '2012-08-04T16:00:00Z',
								cartographicDegrees: [],
							  },
							  model: {
								gltf: 'gzznGIS/Model/GroundVehicle.glb',
								minimumPixelSize: 40,
								maximumScale: 1.5,
							  },
							  orientation: {
								velocityReference: '#position',
							  },
							},
						  ];
						czml[1].position.cartographicDegrees = arrResult;
						let czmlRoutedataSource = new Crystal.CzmlDataSource.load(czml);
						nEntities.push(czmlRoutedataSource);
						pEntities.push(routeID);
						viewer.dataSources.add(czmlRoutedataSource);
						mEntities.push(viewer.entities.add({
							name: '',
							corridor: {                    
								positions: Crystal.Cartesian3.fromDegreesArray(routePath),
								material: Crystal.Color.RED.withAlpha(0.8),
								width: 5.0,
								outline : true,
								outlineColor : Crystal.Color.RED
							}
						}));
					}
				}
				nEntities[0].then(function(dataSource){
					let tempEntity = dataSource.entities.getById(pEntities[0]);
					viewer.flyTo(tempEntity);
				});
				
			},
			error:function(data) {
				console.log("EnterprisesDataError");
			}
		});
	}
	function droneFlyPath(){ //无人机的飞行路径，回放
		$.ajax({
			type : 'GET',
			contentType : "application/json;charset-UTF-8",
			url:webUavTealTimePathUrl+'?pageSize=100000&page=1',
			cache:false,
			async:true,
			success:function(pData) {
				let vValue = [];
				for(let i=0;i<pData.body[0].latLons.length;i++){
					let tData = pData.body[0].latLons[i];
					let mData = {};
					mData.x=parseFloat(tData[0]);
					mData.y=parseFloat(tData[1]);
					mData.z=500;
					vValue.push(mData);
				}
				let start = Crystal.JulianDate.fromDate(new Date());
				let __position = computeCirclularFlight(start.clone(), vValue);
				let stop = Crystal.JulianDate.addSeconds(start, droneStopTime, new Crystal.JulianDate());
				viewer.clock.startTime = start.clone();
				viewer.clock.stopTime = stop.clone();
				viewer.clock.currentTime = stop.clone();
				viewer.clock.clockRange = Crystal.ClockRange.LOOP_STOP;
				viewer.clock.multiplier = 1;
				viewer.clock.canAnimate = true;
				viewer.timeline.zoomTo(start, stop);
				flyingEntity = viewer.entities.add({
					availability: new Crystal.TimeIntervalCollection([new Crystal.TimeInterval({
						start: start,
						stop: stop
					})]),
					position: __position,
					orientation: new Crystal.VelocityOrientationProperty(__position),
					model: {
						uri: 'gzznGIS/Model/Drone.glb',
						scale: 5,
						minimumPixelSize: 64
					},
					path: {
						resolution: 1,
						material: new Crystal.PolylineGlowMaterialProperty({
							glowPower: 0.1,
							color: Crystal.Color.YELLOW
						}),
						width: 10,
						show:true
					},
					id:'DroneRealTime01'
				});
				flyingEntity.position.setInterpolationOptions({
					interpolationDegree : 5,
					interpolationAlgorithm : Crystal.LagrangePolynomialApproximation
				});
			},
			error:function(data) {
				console.log("EnterprisesDataError");
			}
		});
	}
	this.addPromiseSpecialists = function(vValue, is_Bool){ //专家队伍
		
	}
	var enterprisesDataSource = null;
	this.addPromiseEnterprises = function(is_Bool){ //监管企业
		if(is_Bool){
			if(enterprisesDataSource == null){
				let strJson={};
					strJson.body = ["Enterprises"];
					strJson.page = 1;
					strJson.pageSize = 10000;
					strJson.sortName = "sid";
					strJson.sortOrder = "desc";
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webGISDataUrl,
					cache:false,
					async:true,
					data:JSON.stringify(strJson),
					success:function(pData) {
						let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].longitude),parseFloat(pData.body[i].latitude)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.TYPE = "Enterprises";
							propertie.LAYER = 10;

							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "Enterprises_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							enterprisesDataSource = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 24;
								entity.billboard.height = 22;
								entity.billboard.image = 'gzznGIS/Image/enterprise.png';
							}
						});
					},
					error:function(data) {
						console.log("EnterprisesDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(enterprisesDataSource);
			}
		}
		else{
			viewer.dataSources.remove(enterprisesDataSource);
		}
	}
	var SchoolDataSource = null;
	this.addPromiseSchool = function(is_Bool){ //学校
		if(is_Bool){
			if(SchoolDataSource == null){
				let strJson={};
					strJson.body = ["School"];
					strJson.page = 1;
					strJson.pageSize = 10000;
					strJson.sortName = "sid";
					strJson.sortOrder = "desc";
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webGISDataUrl,
					cache:false,
					async:true,
					data:JSON.stringify(strJson),
					success:function(pData) {
						let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].longitude),parseFloat(pData.body[i].latitude)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.TYPE = "School";
							propertie.LAYER = 11;

							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "School_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							SchoolDataSource = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 24;
								entity.billboard.height = 22;
								entity.billboard.image = 'gzznGIS/Image/school.png';
							}
						});
					},
					error:function(data) {
						console.log("SchoolDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(SchoolDataSource);
			}
		}
		else{
			viewer.dataSources.remove(SchoolDataSource);
		}
	}
	var gasStationDataSource = null;
	this.addPromiseGasStation = function(is_Bool){ //加油站
		if(is_Bool){
			if(gasStationDataSource == null){
				let strJson={};
					strJson.body = ["GasStation"];
					strJson.page = 1;
					strJson.pageSize = 10000;
					strJson.sortName = "sid";
					strJson.sortOrder = "desc";
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webGISDataUrl,
					cache:false,
					async:true,
					data:JSON.stringify(strJson),
					success:function(pData) {
						let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].longitude),parseFloat(pData.body[i].latitude)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.TYPE = "GasStation";
							propertie.LAYER = 12;

							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "GasStation_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							gasStationDataSource = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 24;
								entity.billboard.height = 22;
								entity.billboard.image = 'gzznGIS/Image/gasStation.png';
							}
						});
					},
					error:function(data) {
						console.log("GasStationDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(gasStationDataSource);
			}
		}
		else{
			viewer.dataSources.remove(gasStationDataSource);
		}
	}
	var nursingHomeDataSource = null;
	this.addPromiseNursingHome = function(is_Bool){ //养老院
		if(is_Bool){
			if(nursingHomeDataSource == null){
				let strJson={};
					strJson.body = ["NursingHome"];
					strJson.page = 1;
					strJson.pageSize = 10000;
					strJson.sortName = "sid";
					strJson.sortOrder = "desc";
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webGISDataUrl,
					cache:false,
					async:true,
					data:JSON.stringify(strJson),
					success:function(pData) {
						let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].longitude),parseFloat(pData.body[i].latitude)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.TYPE = "NursingHome";
							propertie.LAYER = 13;

							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "NursingHome_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							nursingHomeDataSource = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 24;
								entity.billboard.height = 22;
								entity.billboard.image = 'gzznGIS/Image/nursingHome.png';
							}
						});
					},
					error:function(data) {
						console.log("NursingHomeDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(nursingHomeDataSource);
			}
		}
		else{
			viewer.dataSources.remove(nursingHomeDataSource);
		}
	}
	var dangerousTransportVehiclesDataSource = null;
	this.addPromiseDangerousTransportVehicles = function (is_Bool){ //危运车辆
		if(is_Bool){
			if(dangerousTransportVehiclesDataSource == null){
				let strJson={};
					strJson.body = ["DangerousTransportVehicles"];
					strJson.page = 1;
					strJson.pageSize = 10000;
					strJson.sortName = "sid";
					strJson.sortOrder = "desc";
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webGISDataUrl,
					cache:false,
					async:true,
					data:JSON.stringify(strJson),
					success:function(pData) {
						let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].longitude),parseFloat(pData.body[i].latitude)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.TYPE = "DangerousTransportVehicles";
							propertie.LAYER = 14;

							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "DangerousTransportVehicles_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							dangerousTransportVehiclesDataSource = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 24;
								entity.billboard.height = 22;
								entity.billboard.image = 'gzznGIS/Image/dangerousTransportVehicles.png';
							}
						});
					},
					error:function(data) {
						console.log("DangerousTransportVehiclesDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(dangerousTransportVehiclesDataSource);
			}
		}
		else{
			viewer.dataSources.remove(dangerousTransportVehiclesDataSource);
		}
	}
	var cameraDataSource = null;
	var cameraPage = 1;
	this.addPromiseCamera = function(is_Bool){ //监控视频
		if(is_Bool){
			if(cameraDataSource == null){
				let strJson={};
					strJson.body = ["Camera"];
					strJson.page = cameraPage;
					strJson.pageSize = 3000;
					strJson.sortName = "sid";
					strJson.sortOrder = "desc";
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webGISDataUrl,
					cache:false,
					async:true,
					data:JSON.stringify(strJson),
					success:function(pData) {
						let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].longitude),parseFloat(pData.body[i].latitude)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.TYPE = "Camera";
							propertie.LAYER = 15;

							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "Camera_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							cameraDataSource = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 24;
								entity.billboard.height = 22;
								entity.billboard.image = 'gzznGIS/Image/camera.png';
							}
						});
						/** 接口服务没有做分页功能
						cameraPage++;
						setTimeout(function()  {
							addPromiseCamera();
						}, 5); */
					},
					error:function(data) {
						console.log("CameraDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(cameraDataSource);
			}
		}
		else{
			viewer.dataSources.remove(cameraDataSource);
		}
	}
	function addPromiseCamera(){
		let strJson={};
			strJson.body = ["Camera"];
			strJson.page = cameraPage;
			strJson.pageSize = 3000;
			strJson.sortName = "sid";
			strJson.sortOrder = "desc";
		$.ajax({
			type : 'POST',
			contentType : "application/json;charset-UTF-8",
			url:webGISDataUrl,
			cache:false,
			async:true,
			data:JSON.stringify(strJson),
			success:function(pData) {
				if(pData.body.length == 0){
					return;
				}
				let geoEnterprisesList = {};
				geoEnterprisesList.type = "FeatureCollection";
				geoEnterprisesList.totalFeatures = pData.body.length;
				geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
				let geoFeatures = [];
				for(let i =0;i<pData.body.length;i++){
					let geometry = {};
					geometry.type = "Point";
					geometry.coordinates = [parseFloat(pData.body[i].longitude),parseFloat(pData.body[i].latitude)];
					if(geometry.coordinates[0]==0){
						continue;
					}
					if(isNaN(geometry.coordinates[0])){						
						continue;
					}
					let propertie = {};
					propertie.NAME = pData.body[i].name;
					propertie.TYPE = "Camera";
					propertie.LAYER = 15;

					let geoFeature = {};
					geoFeature.type = "Feature";
					geoFeature.id = "Camera_"+pData.body[i].sid;
					geoFeature.geometry = geometry;
					geoFeature.geometry_name = "the_geom";
					geoFeature.properties = propertie;
					geoFeatures.push(geoFeature);
				}
				geoEnterprisesList.features = geoFeatures;
				Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
					viewer.dataSources.add(dataSource);
					cameraDataSource = dataSource;
					var entities = dataSource.entities.values;
					for(var i=0;i<entities.length;i++){
						let entity = entities[i];
						entity.billboard.width = 24;
						entity.billboard.height = 22;
						entity.billboard.image = 'gzznGIS/Image/camera.png';
					}
				});
				cameraPage++;
				setTimeout(function()  {
					addPromiseCamera();
				}, 5);
			},
			error:function(data) {
				console.log("CameraDataError");
			}
		});
	}
	var forTeamDataSource = null;
	this.addPromiseForTeam = function(is_Bool){ //救援队伍
		if(is_Bool){
			if(forTeamDataSource == null){
				let strJson={};
					strJson.body = ["ForTeam"];
					strJson.page = 1;
					strJson.pageSize = 10000;
					strJson.sortName = "sid";
					strJson.sortOrder = "desc";
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webGISDataUrl,
					cache:false,
					async:true,
					data:JSON.stringify(strJson),
					success:function(pData) {
						let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].longitude),parseFloat(pData.body[i].latitude)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.TYPE = "ForTeam";
							propertie.LAYER = 16;

							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "ForTeam_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							forTeamDataSource = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 24;
								entity.billboard.height = 22;
								entity.billboard.image = 'gzznGIS/Image/forTeam.png';
							}
						});
					},
					error:function(data) {
						console.log("ForTeamDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(forTeamDataSource);
			}
		}
		else{
			viewer.dataSources.remove(forTeamDataSource);
		}
	}
	var shelterDataSource = null;
	var shelterClickFlag = 0;
	this.addPromiseShelterNew = function(){
		if(shelterClickFlag%2==0){
			addPromiseShelter(false);
		}
		else{
			viewer.dataSources.remove(shelterDataSource);
		}
		shelterClickFlag++;
	}
	function addPromiseShelter(is_Bool=true){ //避难场所216
		if(shelterDataSource == null){
			let strJson={};
				strJson.body = {};
				strJson.page = 1;
				strJson.pageSize = 100000;
				strJson.sortName = "sid";
				strJson.sortOrder = "desc";
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webShelterAreaUrl,
				cache:false,
				async:true,
				data:JSON.stringify(strJson),
				success:function(pData) {
					let geoEnterprisesList = {};
					geoEnterprisesList.type = "FeatureCollection";
					geoEnterprisesList.totalFeatures = pData.body.length;
					geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){						
							continue;
						}
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						propertie.Address = pData.body[i].address;
						propertie.Contacts = pData.body[i].contacts;
						propertie.ContactsPhone = pData.body[i].contactsPhone;
						propertie.Type = shelterType[pData.body[i].type];
						propertie.Area = pData.body[i].area;
						propertie.Capacity = pData.body[i].capacity;
						propertie.CountyCode = pData.body[i].countyCode;

						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "Shelter_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
					}
					geoEnterprisesList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
						viewer.dataSources.add(dataSource);
						shelterDataSource = dataSource;
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							let entity = entities[i];
							entity.billboard.width = 35;
							entity.billboard.height = 45;
							entity.billboard.image = 'gzznGIS/Image/shelter.svg';
						}
						if(oneMagFlag!=2){
							if(is_Bool){
								viewer.flyTo(shelterDataSource);	
							}
						}
					});
				},
				error:function(data) {
					console.log("ShelterDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(shelterDataSource);
			if(oneMagFlag!=2){
				if(is_Bool){
					viewer.flyTo(shelterDataSource);
				}
			}
		}
	}
	var hospitalDataSource = null;
	this.addPromiseHospital = function(is_Bool){ //医院
		if(is_Bool){
			if(hospitalDataSource == null){
				let strJson={};
					strJson.body = ["Hospital"];
					strJson.page = 1;
					strJson.pageSize = 10000;
					strJson.sortName = "sid";
					strJson.sortOrder = "desc";
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webGISDataUrl,
					cache:false,
					async:true,
					data:JSON.stringify(strJson),
					success:function(pData) {
						let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].longitude),parseFloat(pData.body[i].latitude)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.TYPE = "Hospital";
							propertie.LAYER = 18;

							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "Hospital_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							hospitalDataSource = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 24;
								entity.billboard.height = 22;
								entity.billboard.image = 'gzznGIS/Image/hospital.png';
							}
						});
					},
					error:function(data) {
						console.log("HospitalDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(hospitalDataSource);
			}
		}
		else{
			viewer.dataSources.remove(hospitalDataSource);
		}
	}
	var materialStorageDataSource = null;
	this.addPromiseMaterialStorage = function(is_Bool){ //物资仓库
		if(is_Bool){
			if(materialStorageDataSource == null){
				let strJson={};
					strJson.body = ["MaterialStorage"];
					strJson.page = 1;
					strJson.pageSize = 10000;
					strJson.sortName = "sid";
					strJson.sortOrder = "desc";
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webGISDataUrl,
					cache:false,
					async:true,
					data:JSON.stringify(strJson),
					success:function(pData) {
						let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].longitude),parseFloat(pData.body[i].latitude)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.TYPE = "MaterialStorage";
							propertie.LAYER = 19;

							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "MaterialStorage_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							materialStorageDataSource = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 24;
								entity.billboard.height = 22;
								entity.billboard.image = 'gzznGIS/Image/materialStorage.svg';
							}
						});
					},
					error:function(data) {
						console.log("HospitalDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(materialStorageDataSource);
			}
		}
		else{
			viewer.dataSources.remove(materialStorageDataSource);
		}
	}
	function addPromiseTeamType(){
		let strJson = {};
		strJson.body = {};
		$.ajax({
			type : 'POST',
			contentType : "application/json;charset-UTF-8",
			url:webTeamTypeUrl,
			cache:false,
			async:true,
			data:JSON.stringify(strJson),
			success:function(pData) {
				for(let i=0;i<pData.body.length;i++){
					teamType[pData.body[i].sid] = pData.body[i].name;
				}
			},
			error:function(data) {
				console.log("HospitalDataError");
			}
		});
	}
	//addPromiseTeamType();
	function addPromiseMaterialsList(){
		let pParam = {page: 1,pageSize: 100000,body: {name: ''}};
		$.ajax({
			type : 'POST',
			contentType : "application/json;charset-UTF-8",
			url:webMaterialsUrl,
			cache:false,
			async:true,
			data:JSON.stringify(pParam),
			success:function(pData) {
				for(let i =0;i<pData.body.length;i++){
					if(warehouseFlag[pData.body[i].warehouseId]==undefined){
						warehouseFlag[pData.body[i].warehouseId] = [];
						warehouseFlag[pData.body[i].warehouseId].push(pData.body[i]);
					}
					else{
						warehouseFlag[pData.body[i].warehouseId].push(pData.body[i]);
					}
				}
			},
			error:function(data) {
				
			}
		});
	}
	
	function initNavigationLocation(callBack){
		let offset = mapToolLocation - 1433;
		document.getElementsByClassName('compass')[0].style.right = offset+100+"px";
		document.getElementsByClassName('navigation-controls')[0].style.right = offset+165+"px";
		document.getElementById('envCenterInfo').style.right = offset+"px";
		let mainWidth = document.getElementById(crystalID).offsetWidth;
		let clientWidth = document.body.clientWidth;
		let tempWidth = (clientWidth - mainWidth)/2;
		let leftToolbarLoc = 120;
		if(layerLocation>tempWidth){
			leftToolbarLoc = layerLocation - tempWidth + 20; //10
		}
		document.getElementsByClassName('distance-legend')[0].style.left = leftToolbarLoc + "px";
		//if(clientWidth<3000){
			//document.getElementById("trackPopUp").style.fontSize="20px";
			//document.getElementById("windowPopUp").style.fontSize="20px";
		//}
		callBack && callBack()
	}
	
	function initMainToolLocation(){ //默认工具条的右边定位
		let offset = 62;
		if(mapToolLocation!=0){
			offset = mapToolLocation - 1433 + 163;
		}
		let mainToolbar = document.getElementsByClassName('crystal-viewer-toolbar')[0];
		mainToolbar.style.top = "550px";
		mainToolbar.style.right = offset+"px";
		document.getElementsByClassName('crystal-viewer-geocoderContainer')[0].style.display = 'none';
		document.getElementsByClassName('crystal-home-button')[0].style.display = 'none';
		document.getElementsByClassName('crystal-sceneModePicker-wrapper')[0].style.display = 'none';
		let clientWidth = document.body.clientWidth;
		if(clientWidth<3000){
			document.querySelector(".status-bar").style.fontSize = '20px';
			let tempVideoZM = document.getElementById("videoZM");
			if(tempVideoZM!=undefined){
				//document.getElementById("videoZM").style.cssText = "width: 200px; height: 520px;font-size: 20px;";
				tempVideoZM.style.width = "200px";
				tempVideoZM.style.height = "520px";
				tempVideoZM.style.fontSize = "20px";
			}
			document.getElementById("trackPopUp").style.fontSize="20px";
			document.getElementById("windowPopUp").style.fontSize="20px";
	    }
	}
	function initMapToolLocation(){ //自定义工具条的左边定位
		let mainWidth = document.getElementById(crystalID).offsetWidth;
		let clientWidth = document.body.clientWidth;
		let tempWidth = (clientWidth - mainWidth)/2;
		let leftToolbarLoc = 120;
		if(layerLocation>tempWidth){
			leftToolbarLoc = layerLocation - tempWidth + 20; //10
		}
		let leftToolbar = document.getElementsByClassName('crystal-viewer-leftToolbar')[0];
		leftToolbar.style.visibility = "visible";
		if(layerLocationWidth!=0){
			leftToolbar.style.top = "110px";
		}
		else{
			leftToolbar.style.top = "210px";
		}
		leftToolbar.style.left = leftToolbarLoc + "px";
		leftToolbar.style.background  = "#00ffff";
		document.getElementById("envLayers").style.fontSize = "28px";
		document.getElementById("envToolBox").style.display = "none";
		document.getElementById("envBusiness").style.display = "none";
		document.getElementById("envLayers").style.display = "";
	}
	function openLayer3D(pParam){
		document.getElementById("envLayers").style.display = "none";
		if(layer3DIndex == null){
			var cmtoPx = $("#" + crystalID).height() - 350;
			var cmtoPy = $("#" + crystalID).width() / 2.6;
			if(layerLocation!=0){
				cmtoPy = layerLocation + 20;
			}
			var data = [];
			if(layerLocationWidth!=0){
				data.push(layerLocationWidth+'px');
			}
			else{
				data.push('560px');
			}
			data.push(cmtoPx + 'px');
			layer3DIndex = layer.open({
				id: "layer3D",
				title: '<i class="fa fa-tasks"></i> 图层',
				type: 2,
				content: websiteUrl+'gzznGIS/ToolBox/layer.html',
				shade: false,
				area: data,
				closeBtn :0,
				offset: ['210px', cmtoPy + 'px'],
				cancel: function(){
				   	layer3DIndex = null;
					initMapToolLocation();
				}
			});
		}
	}
	var layer216Index = null;
	function openLayer216(pParam){
		if(layer216Index == null){
			var cmtoPx = $("#" + crystalID).height() - 350;
			var cmtoPy = $("#" + crystalID).width()/1.5;
			var data = [];
			data.push('560px');
			data.push(cmtoPx + 'px');
			layer216Index = layer.open({
				id: "layer216",
				title: '<i class="fa fa-tasks"></i> 图层',
				type: 2,
				content: websiteUrl+'gzznGIS/ToolBox/layer216.html',
				shade: false,
				area: data,
				offset: ['210px', cmtoPy + 'px'],
				cancel: function(){
				   	layer216Index = null;
				}
			});
		}
	}
	function openSectionAnalysis(pJsonStr){
		if(sectionIndex.length > 0){
			layer.close(sectionIndex[sectionIndex.length - 1]);
			sectionIndex.pop();
		}
		var cmtoPx = 300;
		var cmtoWidth = $("#" + crystalID).width() - 20;
		var data = [];
		data.push(cmtoWidth+'px');
		data.push(cmtoPx + 'px');
		sectionIndex.push(layer.open({
			title: '<i class="fa fa-tasks"></i> 剖面分析',
			type: 2,
			content: 'ToolBox/section.html?strJson=' + pJsonStr,
			shade: false,
			area: data,
			offset: ['50px', '10px']
		}));
	}
	function mouse_move_method(movement){
		rtPickMouse(movement.endPosition);
		var pick = viewer.scene.pick(movement.endPosition);
		if(pick){
			if(pick.id==undefined){
				return;
			}
			pDetailsInfo = pick.id._id;
			if(pDetailsInfo==undefined){return;}
			movement.endPosition.x = movement.endPosition.x + mapOffsetPixel;
			movement.endPosition.y = movement.endPosition.y + mapOffsetYPixel;
			if(pDetailsInfo.indexOf("OldTree") > -1){

				var lists = [
					{
						name:"树种名",
						value:pick.id._properties._SZM._value
					},
					{
						name:"树种科名",
						value:pick.id._properties._SZKM._value
					},
					{
						name:"树种属名",
						value:pick.id._properties._SZSM._value
					},
					{
						name:"树种类别",
						value:pick.id._properties._LB._value
					},
					{
						name:"保护级别",
						value:pick.id._properties._BHJB._value
					},
					{
						name:"树种树龄",
						value:pick.id._properties._SL._value,
						unit:"年"
					},
					{
						name:"树种树高",
						value:pick.id._properties._SG._value.toFixed(1),
						unit:"米"
					},
					{
						name:"树种地址",
						value:pick.id._properties._XZQ._value+pick.id._properties._DZ._value
					},
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("TradeTree") > -1){

				var lists = [
					{
						name:"树种名",
						value:pick.id._properties._SZMC._value
					},
					{
						name:"树种科名",
						value:pick.id._properties._SZKM._value
					},
					{
						name:"树种树高",
						value:pick.id._properties._XDSSG._value.toFixed(1),
						unit:"米"
					},
					{
						name:"树种冠幅",
						value:pick.id._properties._XDSGF._value.toFixed(1),
						unit:"米"
					},
					{
						name:"树种胸径",
						value:pick.id._properties._XDSXJ._value*5,
						unit:"厘米"
					},
					{
						name:"树种地址",
						value:pick.id._properties._QS._value+pick.id._properties._SSDL._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("BigTree") > -1){

				var lists = [
					{
						name:"树种名",
						value:pick.id._properties._ZWZM._value
					},
					{
						name:"树种科名",
						value:pick.id._properties._SZKM._value
					},
					{
						name:"树种属名",
						value:pick.id._properties._SZSM._value
					},
					{
						name:"树种类别",
						value:pick.id._properties._LB._value
					},
					{
						name:"树种树高",
						value:pick.id._properties._SG._value,
						unit:"米"
					},
					{
						name:"东西冠幅",
						value:pick.id._properties._DXGF._value.toFixed(1),
						unit:"米"
					},
					{
						name:"南北冠幅",
						value:pick.id._properties._NBGF._value.toFixed(1),
						unit:"米"
					},
					{
						name:"树种胸径",
						value:pick.id._properties._XJ._value,
						unit:"厘米"
					},
					{
						name:"树种地址",
						value:pick.id._properties._QS._value+pick.id._properties._DZMS._value,
						unit:"厘米"
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("Reservoir_") > -1){
				
				var address = pick.id._properties._BZ._value == null ? '' : pick.id._properties._BZ._value.replace('地址：','');
				var lists = [
					{
						name:"蓄水池类型",
						value:pick.id._properties._LX._value
					},
					{
						name:"蓄水量",
						value:pick.id._properties._CSL._value,
						unit:"m³"
					},
					{
						name:"占地面积",
						value:pick.id._properties._ZDMJ._value,
						unit:"㎡"
					},
					{
						name:"管理单位",
						value:pick.id._properties._GLDW._value
					},
					{
						name:"地址",
						value:pick.id._properties._XZQH._value+address
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("Observatory") > -1){
				
				var lists = [
					{
						name:"瞭望塔名称",
						value:pick.id._properties._MC._value
					},
					{
						name:"类型",
						value:pick.id._properties._LX._value
					},
					{
						name:"建筑材质",
						value:pick.id._properties._JZCZ._value
					},
					{
						name:"通行情况",
						value:pick.id._properties._TXQK._value
					},
					{
						name:"地址",
						value:pick.id._properties._XZQH._value+pick.id._properties._WZ._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("FireFocus") > -1){
				
				var lists = [
					{
						name:"设施类型",
						value:pick.id._properties._LX._value
					},
					{
						name:"地址",
						value:pick.id._properties._XZQH._value+pick.id._properties._SSQZ._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("ParkVideo") > -1){
			
				var lists = [
					{
						name:"摄像头名称",
						value:pick.id._properties._SBMC._value
					},
					{
						name:"地址",
						value:pick.id._properties._GLBM._value+pick.id._properties._XKZH._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("FireVideo") > -1){
				
				var lists = [
					{
						name:"摄像头名称",
						value:pick.id._properties._SBMC._value
					},
					{
						name:"地址",
						value:pick.id._properties._GLBM._value+pick.id._properties._XKZH._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("UrbanVideo") > -1){

				var lists = [
					{
						name:"摄像头名称",
						value:pick.id._properties._NAME._value,
						leftWidth:"30%",
						rightWidth:"60%"
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("Broadcast") > -1){
				
				var lists = [
					{
						name:"广播名称",
						value:pick.id._properties._SBMC._value
					},
					{
						name:"地址",
						value:pick.id._properties._QS._value+pick.id._properties._GLBM._value+pick.id._properties._AZWZ._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("FireMantle") > -1){
				
				var lists = [
					{
						name:"防火树种",
						value:pick.id._properties._SZ._value
					},
					{
						name:"防火带宽",
						value:pick.id._properties._KD._value,
						unit:"m"
					},
					{
						name:"防火带长",
						value:pick.id._properties._CD._value,
						unit:"m"
					},
					{
						name:"地址",
						value:pick.id._properties._SSQX._value+pick.id._properties._SSZJ._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("WaterLevel") > -1){
				
				var lists = [
					{
						name:"水位站名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"实时水位",
						value:pick.id._properties._NUM._value+pick.id._properties._Unit._value
					},
					{
						name:"水位站地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("WaterloggingPoint") > -1){
				
				var lists = [
					{
						name:"内涝点名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"内涝程度",
						value:pick.id._properties._Degree._value
					},
					{
						name:"内涝情况",
						value:pick.id._properties._Condition._value
					},
					{
						name:"内涝地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("WaterloggingBlack") > -1){
				
				var lists = [
					{
						name:"内涝黑点",
						value:pick.id._properties._NAME._value
					},
					{
						name:"负责单位",
						value:pick.id._properties._Unit._value
					},
					{
						name:"领导",
						value:pick.id._properties._Contact._value
					},
					{
						name:"电话",
						value:pick.id._properties._Phone._value
					},
					{
						name:"情况",
						value:pick.id._properties._Remark._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("Reservoirs") > -1){
				
				var lists = [
					{
						name:"水库名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"水库水位",
						value:pick.id._properties._WaterLevel._value,
						unit:"m"
					},
					{
						name:"水库水量",
						value:pick.id._properties._WaterYield._value,
						unit:"㎡"
					},
					{
						name:"水库地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("RainfallStationsBlack") > -1){
				
				var lists = [
					{
						name:"雨量站名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("ReservoirBlack") > -1){
				
				var lists = [
					{
						name:"水库名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"领导",
						value:pick.id._properties._Contact._value
					},
					{
						name:"电话",
						value:pick.id._properties._Phone._value
					},
					{
						name:"水位",
						value:pick.id._properties._WaterLevel._value,
						unit:"m"
					},
					{
						name:"水量",
						value:pick.id._properties._WaterYield._value,
						unit:"㎡"
					},
					{
						name:"警戒水位",
						value:pick.id._properties._WarningWaterLevel._value,
						unit:"m"
					},
					{
						name:"地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("FireExperts") > -1){
				
				var lists = [
					{
						name:"专家组名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"火灾专家数量",
						value:pick.id._properties._FireExpertNum._value,
						unit:"个"
					},
					{
						name:"其他专家数量",
						value:pick.id._properties._OtherExpertNum._value,
						unit:"个"
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("RainfallStation") > -1){
				
				var lists = [
					{
						name:"雨量站名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"实时降雨量",
						value:pick.id._properties._RealTimeRainfall._value+pick.id._properties._Unit._value
					},
					{
						name:"今日降雨量",
						value:pick.id._properties._TodayRainfall._value+pick.id._properties._Unit._value
					},
					{
						name:"雨量站地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);
				
			}else if(pDetailsInfo.indexOf("Beware") > -1){
				
				var lists = [
					{
						name:"堤防名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"值班人员",
						value:pick.id._properties._DutyName._value
					},
					{
						name:"堤防地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("Tunnel") > -1){
				
				var lists = [
					{
						name:"涵隧名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"内涝程度",
						value:pick.id._properties._Degree._value
					},
					{
						name:"内涝情况",
						value:pick.id._properties._Condition._value
					},
					{
						name:"涵隧地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("Shelter") > -1){
				
				var lists = [
					{
						name:"避难场所名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"类型",
						value:pick.id._properties._Type._value
					},
					{
						name:"面积",
						value:pick.id._properties._Area._value,
						unit:"平方米"
					},
					{
						name:"可容纳人数",
						value:pick.id._properties._Capacity._value,
						unit:"人"
					},
					{
						name:"联系人",
						value:pick.id._properties._Contacts._value
					},
					{
						name:"联系人电话",
						value:pick.id._properties._ContactsPhone._value
					},
					{
						name:"场所地址",
						value:pick.id._properties._Address._value
					}
				];
                var PhoneMessages = {
					name:pick.id._properties._NAME._value,
					number:pick.id._properties._ContactsPhone._value,
					phone:true,
					messages:true
				} 
				setInfowindow(movement,lists,null,PhoneMessages);

			}else if(pDetailsInfo.indexOf("Citypark") > -1){
				
				var JSZTVal = pick.id._properties._JSZT._value==null?'':pick.id._properties._JSZT._value;
				var lists = [
					{
						name:"城市公园名称",
						value:pick.id._properties._GYMC._value
					},
					{
						name:"服务电话",
						value:pick.id._properties._FFDH._value
					},
					{
						name:"公园总面积",
						value:pick.id._properties._GYZMJ._value,
						unit:"平方米"
					},
					{
						name:"建设状态",
						value:JSZTVal
					},
					{
						name:"公园分类",
						value:pick.id._properties._GYFL._value
					},
					{
						name:"公园地址",
						value:pick.id._properties._DZ._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("ForestPark") > -1){
				
				var JSZTVal = pick.id._properties._JSZT._value==null?'':pick.id._properties._JSZT._value;
				var lists = [
					{
						name:"森林公园名称",
						value:pick.id._properties._GYMC._value
					},
					{
						name:"公园总面积",
						value:pick.id._properties._GYZMJ._value,
						unit:"公顷"
					},
					{
						name:"建设状态",
						value:JSZTVal
					},
					{
						name:"公园分类",
						value:pick.id._properties._GYFL._value
					},
					{
						name:"公园地址",
						value:pick.id._properties._DZ._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("WetlandPark") > -1){
				
				var JSZTVal = pick.id._properties._JSZT._value==null?'':pick.id._properties._JSZT._value;
				var lists = [
					{
						name:"湿地公园名称",
						value:pick.id._properties._GYMC._value
					},
					{
						name:"公园总面积",
						value:pick.id._properties._PFMJ._value,
						unit:"公顷"
					},
					{
						name:"建设状态",
						value:JSZTVal
					},
					{
						name:"湿地类型",
						value:pick.id._properties._SDLX._value
					},
					{
						name:"公园地址",
						value:pick.id._properties._DZ._value
					}
				];
				setInfowindow(movement,lists);
		
			}else if(pDetailsInfo.indexOf("DroneRealTime") > -1){
				
				var lists = [
					{
						name:"无人机名称",
						value:"森防无人机01"
					},
					{
						name:"飞行高度",
						value:"500米"
					},
					{
						name:"飞行速度",
						value:"36km/h"
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("FirefightingTeam") > -1){

				var equipmentList = pick.id._properties._EquipmentList._value;
				var sceneReliefMaterialsList = pick.id._properties._SceneReliefMaterialsList._value;
				var lists = [
					{
						name:"队长",
						value:pick.id._properties._TeamName._value
					},
					{
						name:"电话",
						value:pick.id._properties._Contacts._value
					},
					{
						name:"人员",
						value:pick.id._properties._PersonnelNum._value
					},
					{
						name:"所有装备",
						value:""
					}
				];
				for(let i=0;i<equipmentList.length;i++){
					let unit = equipmentList[i].unit==null?'':equipmentList[i].unit;						
					lists.push({
						name:equipmentList[i].materialName,
						value:equipmentList[i].materialNum,
						unit:unit
					})
				}
				lists.push({
					name:"所有物资",
					value:""
				})
				for(let i=0;i<sceneReliefMaterialsList.length;i++){
					let unit = sceneReliefMaterialsList[i].unit==null?'':sceneReliefMaterialsList[i].unit;
					lists.push({
						name:sceneReliefMaterialsList[i].materialName,
						value:sceneReliefMaterialsList[i].materialNum,
						unit:unit
					})
				}
				setInfowindow(movement,lists,pick.id._properties._NAME._value);

			}else if(pDetailsInfo.indexOf("AviationTemp") > -1||pDetailsInfo.indexOf("AviationBase") > -1){
				
				var lists = [
					{
						name:"消防名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"消防地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("AviationWater") > -1){
				
				var lists = [
					{
						name:"取水点名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"类型",
						value:pick.id._properties._Type._value
					},
					{
						name:"取水地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);
		
			}else if(pDetailsInfo.indexOf("Hidden") > -1){
				
				var lists = [
					{
						name:"监管片区名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"安全负责人",
						value:pick.id._properties._Director._value
					},
					{
						name:"联系电话",
						value:pick.id._properties._Phone._value
					},
					{
						name:"隐患数量",
						value:pick.id._properties._Num._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("Airport") > -1){
			
				var lists = [
					{
						name:"机场名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"电话",
						value:pick.id._properties._Phone._value
					},
					{
						name:"地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("Railway") > -1){

				var lists = [
					{
						name:"火车站名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("Metro") > -1){
				
				var lists = [
					{
						name:"地铁站名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"线路",
						value:pick.id._properties._Type._value
					},
					{
						name:"地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("Harbor") > -1){
				
				var lists = [
					{
						name:"港口名称",
						value:pick.id._properties._NAME._value
					},
					{
						name:"电话",
						value:pick.id._properties._Phone._value
					},
					{
						name:"地址",
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("Hazardous") > -1){

				var nameTip = '名称',
					contactTip = '联系人员',
					phoneTip = '联系电话',
					typeTip = '类型',
					addressTip = '地址';

				if(pick.id._properties._Layer._value==0){
					nameTip = '企业名称';
					typeTip = '企业类型';
					addressTip = '企业地址';
				}else if(pick.id._properties._Layer._value==1){
					nameTip = '危险源名称';
					typeTip = '危险源类型';
					addressTip = '危险源地址';
				}else if(pick.id._properties._Layer._value==2){
					nameTip = '隐患名称';
					typeTip = '隐患类型';
					addressTip = '隐患地址';
				}else if(pick.id._properties._Layer._value==3){
					nameTip = '场所名称';
					typeTip = '场所类型';
					addressTip = '场所地址';
				}

				var lists = [
					{
						name:nameTip,
						value:pick.id._properties._NAME._value
					},
					{
						name:contactTip,
						value:pick.id._properties._Contact._value
					},
					{
						name:phoneTip,
						value:pick.id._properties._Phone._value
					},
					{
						name:typeTip,
						value:pick.id._properties._Type._value
					},
					{
						name:addressTip,
						value:pick.id._properties._Address._value
					}
				];
				setInfowindow(movement,lists);
			}
			else if(pDetailsInfo.indexOf("TeamLoc") > -1){
			
				var lists = [
					{
						name:"队伍名称",
						value:pick.id._properties._NAME._value,
						leftWidth:"25%",
						rightWidth:"65%"
					},
					{
						name:"队伍人数",
						value:pick.id._properties._Count._value,
						leftWidth:"25%",
						rightWidth:"65%"
					},
					{
						name:"联系电话",
						value:pick.id._properties._Phone._value,
						leftWidth:"25%",
						rightWidth:"65%"
					}
				];
				setInfowindow(movement,lists);

			}else if(pDetailsInfo.indexOf("ForTeam") > -1){
				var lists = [];
				if(pick.id._properties._Layer!=undefined&&pick.id._properties._Layer._value==4){				
					lists = [
						{
							name:"名称",
							value:pick.id._properties._NAME._value,
							leftWidth:"25%",
							rightWidth:"65%"
					   },
					   {
							name:"地址",
							value:pick.id._properties._Address._value,
							leftWidth:"25%",
							rightWidth:"65%"
						}
					];	
				}else if(pick.id._properties._Layer!=undefined&&pick.id._properties._Layer._value==12){
	
						lists = [
							{
								name:"名称",
								value:pick.id._properties._NAME._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"领导",
								value:pick.id._properties._DutyName._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"类型",
								value:pick.id._properties._ParentName._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"地址",
								value:pick.id._properties._Address._value,
								leftWidth:"25%",
								rightWidth:"65%"
							}
						];

				}else if(pick.id._properties._Layer!=undefined&&(pick.id._properties._Layer._value==13 || pick.id._properties._Layer._value==14 || pick.id._properties._Layer._value==17)){
					
						lists = [
							{
								name:"名称",
								value:pick.id._properties._NAME._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"类型",
								value:pick.id._properties._ParentName._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"地址",
								value:pick.id._properties._Address._value,
								leftWidth:"25%",
								rightWidth:"65%"
							}
						];

				}else if(pick.id._properties._Layer!=undefined&&pick.id._properties._Layer._value==15){
					
						lists = [
							{
								name:"名称",
								value:pick.id._properties._NAME._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"程度",
								value:pick.id._properties._Degree._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"情况",
								value:pick.id._properties._Condition._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"类型",
								value:pick.id._properties._ParentName._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"地址",
								value:pick.id._properties._Address._value,
								leftWidth:"25%",
								rightWidth:"65%"
							}
						];
				}else if(pick.id._properties._Layer!=undefined&&pick.id._properties._Layer._value==16){
			
						lists = [
							{
								name:"名称",
								value:pick.id._properties._NAME._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"责任单位",
								value:pick.id._properties._DutyUnit._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"类型",
								value:pick.id._properties._ParentName._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"地址",
								value:pick.id._properties._Address._value,
								leftWidth:"25%",
								rightWidth:"65%"
							}
						];

				}else if(pick.id._properties._Layer!=undefined&&pick.id._properties._Layer._value==18){
					
						lists = [
							{
								name:"名称",
								value:pick.id._properties._NAME._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"线路",
								value:pick.id._properties._Line._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"类型",
								value:pick.id._properties._ParentName._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"地址",
								value:pick.id._properties._Address._value,
								leftWidth:"25%",
								rightWidth:"65%"
							}
						];
				}else{
					
						lists = [
							{
								name:"名称",
								value:pick.id._properties._NAME._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"领导",
								value:pick.id._properties._DutyName._value,
								leftWidth:"25%",
								rightWidth:"65%"
							},
							{
								name:"电话",
								value:pick.id._properties._PersonPhone._value,
								leftWidth:"25%",
								rightWidth:"65%"
							}
						];
					if(pick.id._properties._Address!=undefined){
						
						lists.push(
							{
								name:"地址",
								value:pick.id._properties._Address._value,
								leftWidth:"25%",
								rightWidth:"65%"
							})

					}else if(pick.id._properties._Type!=undefined){
						
					    lists.push(
							{
								name:"类型",
								value:pick.id._properties._Type._value,
								leftWidth:"25%",
								rightWidth:"65%"
							})

					}else if(pick.id._properties._Num!=undefined){
						
						lists.push(
							{
								name:"容纳人数",
								value:pick.id._properties._Num._value,
								unit:"人",
								leftWidth:"25%",
								rightWidth:"65%"
							})
						lists.push(
							{
								name:"面积",
								value:pick.id._properties._Area._value,
								unit:"m²",
								leftWidth:"25%",
								rightWidth:"65%"
							})
					}
				}	
				
				setInfowindow(movement,lists);			
				
			}else if(pDetailsInfo.indexOf("defaultType") > -1){
				if(pick.id._properties.isFlagPopule){
                    return;
				}
				var lists = [];
				var typeStr = pDetailsInfo.split("_")[0];
				var pointLayer = pGzznCore.findArray(poitArray,"layerType",typeStr);
				//console.log(pointLayer,'pointLayer.val0-0');
				var infoList = pointLayer.val.info;
				var phoneInfo = pointLayer.val.phoneInfo;
                for(var i=0;i<infoList.length;i++){
     
					lists.push({
						name:infoList[i].title,
						value:pick.id._properties[infoList[i].textIndex]?pick.id._properties[infoList[i].textIndex]._value:""
					});
				}
			    var PhoneMessages = null;
				if(phoneInfo){
					PhoneMessages = {
						name:pick.id._properties[phoneInfo.name] ? pick.id._properties[phoneInfo.name]._value : "",
						number:pick.id._properties[phoneInfo.phone] ? pick.id._properties[phoneInfo.phone]._value : "",
						phone:true,
						messages:true
					} 
				}
                var video = pointLayer.val.video;
				if(video){
					var videostr = video ?(pick.id. _properties[video.keys] && pick.id. _properties[video.keys]._value ? pick.id. _properties[video.keys]._value : "") : "";
					var isVideoStr = video.isVideo ? (pick.id. _properties[video.isVideo] &&  parseFloat(pick.id. _properties[video.isVideo]._value)>0 ? true : false) : (pick.id. _properties.isVideo &&  parseFloat(pick.id. _properties.isVideo._value)>0 ? true : false) ;  
					if(videostr && isVideoStr){
						var videoUrl = video ? video.start+videostr+video.end : (video.videoUrl ? video.viedeoUrl : "");
						PhoneMessages.video = videoUrl;
					}
					
				}
				
				setInfowindow(movement,lists,null,PhoneMessages);
			}else{
				if(pick.id._name==undefined||pick.id._name===''){
					return;
				}
			
				var lists = [pick.id._name];
				setInfowindow(movement,lists);
			}
		}
		else{
			$('#windowPopUp').hide();
		}
	}
	function setInfowindow(movement,lists,titles,PhoneMessages,ids,isTransferXY,marker){				
		var infoIds = ids ? ids : "#windowPopUp";	
		if(isTransferXY){
			var x = movement.x;
			var y = movement.y;
		}else{
			var x = infoIds == "#trackPopUp" ? movement.position.x : movement.endPosition.x;
			var y = infoIds == "#trackPopUp" ? movement.position.y : movement.endPosition.y;
		}									
		
		var cPoint = new Crystal.Cartesian2(x, y);
		var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
		var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
		var height = viewer.scene.globe.getHeight(geoPt1);
		var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
		var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
		var content= '';
		if(titles){
			content += '<div style="width: 100%;height: 30px;color: white;display: flex;justify-content: flex-start;">'+
				'<span style="display: block;height: 24px;width: 6px;background: #00fffe;flex-shrink: 0;margin-right: 18px;"></span>'+
				'<label style="display: block;height: 30px;line-height: 30px;font-size: 24px; font-weight: bold;color: white;position: absolute;top: 12px;left: 40px;">'+ titles +'</label>'+
				'</div>';
		}
		
		content +='<table><tbody>'
		for(var i=0;i<lists.length;i++){
			if(lists[i].name){
				var unit = lists[i].unit ? lists[i].unit : "";
				var val = ( lists[i].value || lists[i].value == 0 )? lists[i].value : "";
				var leftWidth = lists[i].leftWidth ? lists[i].leftWidth : "20%";
				var rightWidth = lists[i].rightWidth ? lists[i].rightWidth : "70%";
				content += '<tr><td width="'+leftWidth+'" style="color:white;">'+lists[i].name+'：</td><td width="'+rightWidth+'" style="color:white;max-width:580px">'+ val + unit+'</td></tr>';
			}else if(!lists[i].name && !lists[i].value){
				content += '<tr><td style="color:white;">'+lists[i]+'</td></tr>';
			}			
		}
		
		content += '</tbody></table>';
		if(PhoneMessages && ((PhoneMessages && PhoneMessages.number) || (PhoneMessages.video))){
			teamEntitieJson.name = PhoneMessages.name;
			teamEntitieJson.phone = PhoneMessages.number ;
			content+='<div style="text-align:center;margin-top: 5px;">';
			if(PhoneMessages.phone){
				content+='<span title="打电话" onclick="pGzznCore.addPromisePhone()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-right: 10px;">'+
					'<img src="gzznGIS/Image/iphone.png"  alt="" style="vertical-align: sub;"/> 打电话'+
				'</span>';
			}
			     		
			if(PhoneMessages.messages){			
				content+='<span  title="发短信" onclick="pGzznCore.addPromiseMessages()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-left: 10px;">'+
							'<img src="gzznGIS/Image/inote.png"  alt="" style="vertical-align: sub;"/> 发短信'+
						'</span>';
			}
			if(PhoneMessages.video){
				viedeoUrl = PhoneMessages.video;
				content+='<span title="查看视频" onclick="pGzznCore.addPromiseVideo()"  style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-left: 10px;">'+
					'<img src="gzznGIS/Image/gjh/video.svg"  alt="" style="vertical-align: sub;"/> 查看视频'+
				'</span>';
			}
			content+='</div>';
		}
		
		
		$('#windowPopUp').hide();
		if(infoIds == "#trackPopUp"){
			$(".leaflet-popup-close-button_track").click();
			$('#trackPopUp').hide();
		}
		
		var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
		
		infoWindow(obj);
		function infoWindow(obj) {
			$(infoIds+'Link').empty();
			$(infoIds+'Link').append(obj.content);    		            	
			function positionPopUp (c) {
				var x = c.x - ($(infoIds+'Content').width()) / 2;
				var y = c.y - ($(infoIds+'Content').height());
				$(infoIds+'Content').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
			}
			var c = new Crystal.Cartesian2(x, y);
			$(infoIds).show();
			positionPopUp(c);
			
			var removeHandler = viewer.scene.postRender.addEventListener(function (res) {
				try{
					var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
					if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
						positionPopUp(changedC);
						c = changedC;
					}
				}
				catch(err){}
			});

			$(".leaflet-popup_lyz").css("max-width","780px");
			var closeBtn = infoIds == "#trackPopUp" ? '.leaflet-popup-close-button_track':'.leaflet-popup-close-button_lyz';
			$(closeBtn).click(function() {
				if(marker){
					marker._properties.isFlagPopule = false;
				}
				
				viewer.selectedEntity = undefined;
				$(infoIds).hide();
				$(infoIds+'Link').empty();
				removeHandler.call();
				return false;
			});
			return "";
		}
	}
	var viedeoUrl = "";
	this.addPromiseVideo = function(){
		console.group("222")
		console.log(viedeoUrl,'222')
		console.groupEnd()
		addPromiseVideo(viedeoUrl)
	}
	var tempMouseClick = null;
	function mouse_click_method(movement){
		var pick = viewer.scene.pick(movement.position);
		if(pick){
			if(pick.id == undefined){
				viewer.selectedEntity = undefined;
				if(pick.id != undefined && pick.id._name != undefined && pick.id._name === ''){
					if(pick.id._id.indexOf('plot') > -1){
						mSelectPlot = pick.id;
					}
				}
				return;
			}
			if(pick.id._name === ''){
				viewer.selectedEntity = undefined;
			}
			pDetailsInfo = pick.id._id;
			if(pDetailsInfo==undefined){return;}
			movement.position.x = movement.position.x + mapOffsetPixel;
			movement.position.y = movement.position.y + mapOffsetYPixel;
			if(pDetailsInfo.indexOf("Enterprises") > -1){
				addPromiseEnterprisesInfo(pDetailsInfo, movement);
			}else if(pDetailsInfo.indexOf("defaultType") > -1){				
				var lists = [];
				var typeStr = pDetailsInfo.split("_")[0];
				var pointLayer = pGzznCore.findArray(poitArray,"layerType",typeStr);
				var infoList = pointLayer.val.info;
				var phoneInfo = pointLayer.val.phoneInfo;
                for(var i=0;i<infoList.length;i++){
     
					lists.push({
						name:infoList[i].title,
						value:pick.id._properties[infoList[i].textIndex]?pick.id._properties[infoList[i].textIndex]._value:""
					});
				}
			    var PhoneMessages = null;
				if(phoneInfo){
					PhoneMessages = {
						name:pick.id._properties[phoneInfo.name] ? pick.id._properties[phoneInfo.name]._value : "",
						number:pick.id._properties[phoneInfo.phone] ? pick.id._properties[phoneInfo.phone]._value : "",
						phone:true,
						messages:true
					} 
				}
				var video = pointLayer.val.video;
				if(video){
					var videostr = video ?(pick.id. _properties[video.keys] && pick.id. _properties[video.keys]._value ? pick.id. _properties[video.keys]._value : "") : "";
					var isVideoStr = video.isVideo ? (pick.id. _properties[video.isVideo] &&  parseFloat(pick.id. _properties[video.isVideo]._value)>0 ? true : false) : (pick.id. _properties.isVideo &&  parseFloat(pick.id. _properties.isVideo._value)>0 ? true : false) ;  
					if(videostr && isVideoStr){
						var videoUrl = video ? video.start+videostr+video.end : (video.videoUrl ? video.videoUrl : "");
						PhoneMessages.video = videoUrl;
					}
					
				}
				pick.id._properties.isFlagPopule = true;
				setInfowindow(movement,lists,null,PhoneMessages,"#trackPopUp",null,pick.id);
			}
			else if(pDetailsInfo.indexOf("School") > -1){
				addPromiseSchoolInfo(pDetailsInfo, movement);
			}
			else if(pDetailsInfo.indexOf("GasStation") > -1){
				addPromiseGasStationInfo(pDetailsInfo, movement);
			}
			else if(pDetailsInfo.indexOf("NursingHome") > -1){
				addPromiseNursingHomeInfo(pDetailsInfo, movement);
			}
			else if(pDetailsInfo.indexOf("ForTeam") > -1){
				addPromiseForTeamInfo(pick.id, movement);
			}
			else if(pDetailsInfo.indexOf("TeamLoc") > -1){
				addPromiseTeamLocInfo(pick.id, movement);
			}
			else if(pDetailsInfo.indexOf("Hazardous") > -1){
				addPromiseHazardousInfo(pick.id, movement);
			}
			else if(pDetailsInfo.indexOf("ReservoirBlack") > -1){
				addPromiseReservoirBlack(pick.id, movement);
			}
			else if(pDetailsInfo.indexOf("WaterloggingBlack") > -1){
				addPromiseWaterloggingBlack(pick.id, movement);
			}
			else if(pDetailsInfo.indexOf("Shelter") > -1){
				addPromiseShelterInfo(pDetailsInfo, movement);
			}
			else if(pDetailsInfo.indexOf("Hospital") > -1){
				addPromiseHospitalInfo(pDetailsInfo, movement);
			}
			else if(pDetailsInfo.indexOf("MaterialStorage") > -1){
				addPromiseMaterialStorageInfo(pDetailsInfo, movement);
			}
			else if(pDetailsInfo.indexOf("Camera") > -1||pDetailsInfo.indexOf("LotVedio") > -1||pDetailsInfo.indexOf("FireVideo") > -1||pDetailsInfo.indexOf("ParkVideo") > -1||pDetailsInfo.indexOf("UrbanVideo") > -1){
				addPromiseCameraInfo(pDetailsInfo, pick.id._name, pick.id._properties._DeviceId._value);
			}
			else if(pDetailsInfo.indexOf("Event") > -1){
				let isBool = false;
				if(mEntity!=undefined&&mEntity._id.indexOf("Event") > -1){
					if(mEntity._id!=pDetailsInfo&&oneMagFlag==1){
						let arrValue = pDetailsInfo.split('_');
						if(arrValue.length>1){
							dragonBoatEventByMap(arrValue[1]);
							isBool = true;
						}
					}
					else if(mEntity._id!=pDetailsInfo&&oneMagFlag==2){
						isBool = true;
					}
				}
				else if(mEntity==undefined){
					if(oneMagFlag==1){
						let arrValue = pDetailsInfo.split('_');
						if(arrValue.length>1){
							dragonBoatEventByMap(arrValue[1]);
							isBool = true;
						}
					}
					else if(oneMagFlag==2){
						isBool = true;
					}
				}
				mEntity = pick.id;
				addPromiseClickEventInfo(movement);
				if(isBool){
					viewer.flyTo(mEntity,{
						duration: 3,
						offset : {
							heading : Crystal.Math.toRadians(0.0),
							pitch : Crystal.Math.toRadians(-45),
							range : 8500
					}});
					setTimeout(function(){
						clearEventRange();
						if(EventWartimeState&&oneMagFlag==2){
							eventRange(mEntity, vRadius,false);	
						}
						else if(EventWartimeState&&oneMagFlag==1){
							eventRange(mEntity, vRadius);
						}
					}, 3000);
				}
			}
			else if(pDetailsInfo.indexOf("TeamPositionInfo") > -1||pDetailsInfo.indexOf("FirefightingTeam") > -1){ //应急队伍
				addPromiseTeamPositionInfo(pDetailsInfo, pick.id._name,pick.id._properties._Contacts._value, movement.position.x, movement.position.y);
			}
			else if(pDetailsInfo.indexOf("GuangZhouPoint") > -1){
				tempMouseClick = movement;
				hChemicalsStatistics(pick.id._name);
			}
			if(pick.primitive._primitive!=undefined&&pick.primitive._primitive._primitiveOptions!=undefined&&pick.primitive._primitive._primitiveOptions.geometryInstances.length>0){
				if(pick.primitive._primitive._primitiveOptions.geometryInstances[0].id!=undefined||pick.primitive._primitive._primitiveOptions.geometryInstances[0].id!=''){
					if(pick.primitive._primitive._primitiveOptions.geometryInstances[0].id==undefined){return;}
				}
			}
		}
	}
	this.onVerifyAIImage = function (vValue){
		hChemicalsResource({
					code: '5',
					name:'危化品企业',
					areaName: vValue,
				  });
	}
	this.addPromiseHChemicalsStatistics = function(vValue,vRegion){
		document.getElementById("trackPopUpLink").style.minWidth = "300px";
		var cPoint = new Crystal.Cartesian2(tempMouseClick.position.x, tempMouseClick.position.y);
		var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
		var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
		var height = viewer.scene.globe.getHeight(geoPt1);
		var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
		var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
		var name = '危化品企业总数';
		var content= '';
		content ='<div style="width: 100%;height: 30px;color: white;display: flex;justify-content: flex-start;"><span style="display: block;height: 24px;width: 6px;background: #00fffe;flex-shrink: 0;margin-right: 18px;"></span><label style="display: block;height: 30px;line-height: 30px;font-size: 24px; font-weight: bold;color: white;position: absolute;top: 12px;left: 40px;">'+ name +'</label></div><table style="text-align: center;position: relative;left: 130px;"><tbody>'
						    +'<tr><td width="80%" style="color:white;"><span onclick="pGzznCore.onVerifyAIImage(\''+vRegion+'\')" style="color: #00fffe;font-weight: bold;cursor: pointer;">'+vValue+'</span></td></tr>';
		$('#windowPopUp').hide();
		var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
		infoWindow(obj);
		function infoWindow(obj) {
			$('#trackPopUpLink').empty();
			$('#trackPopUpLink').append(obj.content);    		            	
			function positionPopUp (c) {
				var x = c.x - ($('#trackPopUpContent').width()) / 2;
				var y = c.y - ($('#trackPopUpContent').height());
				$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
			}
			var c = new Crystal.Cartesian2(tempMouseClick.position.x, tempMouseClick.position.y);
			$('#trackPopUp').show();
			positionPopUp(c);
			
			var removeHandler = viewer.scene.postRender.addEventListener(function () {
				try{
					var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
					if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
						positionPopUp(changedC);
						c = changedC;
					}
				}
				catch(err){}
			});
			
			$('.leaflet-popup-close-button_track').click(function() {
				viewer.selectedEntity = undefined;
				$('#trackPopUp').hide();
				$('#trackPopUpLink').empty();
				removeHandler.call();
				return false;
			});
			return "";
		}
	}
	this.mapClickTeamPhoneMessage = false;

	this.addPromisePhone = function(phone){
		teamEntitieJson.event = window.event;
		if(pGzznCore.mapClickTeamPhoneMessage){
			mapClickTeamPhone(teamEntitieJson);
		}else{
			clickTeamPhone(teamEntitieJson);
		}	
	}
	
	this.addPromiseMessages = function(message){
		teamEntitieJson.event = window.event;
		if(pGzznCore.mapClickTeamPhoneMessage){
			mapClickTeamMessage(teamEntitieJson);
		}else{
			clickTeamMessage(teamEntitieJson);
		}
		
	}

	var teamEntitieSid = null;
	var teamEntitieJson = {};
	function addPromiseTeamPositionInfo(sid, vName, contacts, movementX, movementY){
		teamEntitieSid = sid;
		let arrValue = sid.split('_');
		if(arrValue.length>1){
			sid = arrValue[1];
			$.ajax({
				type : 'GET',
				contentType : "application/json;charset-UTF-8",
				url:webTeamResourcesUrl+'?sid='+sid,
				cache:false,
				async:true,
				success:function(pData) {
					var cPoint = new Crystal.Cartesian2(movementX, movementY);
					var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
					var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
				    var height = viewer.scene.globe.getHeight(geoPt1);
				    var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
				    var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
					var name = vName;
					var people = pData.body.personnelNum;
					var phone = pData.body.contacts==undefined?contacts:pData.body.contacts;
					teamEntitieJson.name = name;
					teamEntitieJson.phone = phone;
					var content= '';
					content ='<div style="width: 100%;height: 30px;color: white;display: flex;justify-content: flex-start;"><span style="display: block;height: 24px;width: 6px;background: #00fffe;flex-shrink: 0;margin-right: 18px;"></span><label style="display: block;height: 30px;line-height: 30px;font-size: 24px; font-weight: bold;color: white;position: absolute;top: 12px;left: 40px;">'+ name +'</label></div><table><tbody>'
						    +'<tr><td width="30%" style="color:white;">人员：</td><td width="70%" style="color:white;"><span style="color: #00fffe;font-weight: bold;">'+people+'</span>人</td></tr>'
							+'<tr><td width="30%" style="color:white;">队伍电话：</td><td width="70%" style="color:white;"><span style="color: #00fffe;font-weight: bold;">'+phone+'</span></td></tr>'
							+'<tr><td width="30%" style="color:white;">所有装备：</td><td width="70%" style="color:white;"></td></tr>';
				    for(let i=0;i<pData.body.equipmentList.length;i++){
						let unit = pData.body.equipmentList[i].unit==null?'':pData.body.equipmentList[i].unit;
						content+='<tr><td width="30%" style="color:white;">'+pData.body.equipmentList[i].materialName+'：</td><td width="70%" style="color:white;"><span style="color: #00fffe;font-weight: bold;">'+pData.body.equipmentList[i].materialNum+'</span>'+unit+'</td></tr>';
					}
					content+='<tr><td width="30%" style="color:white;">所有物资：</td><td width="70%" style="color:white;"></td></tr>';
					for(let i=0;i<pData.body.sceneReliefMaterialsList.length;i++){
						let unit = pData.body.sceneReliefMaterialsList[i].unit==null?'':pData.body.sceneReliefMaterialsList[i].unit;
						content+='<tr><td width="30%" style="color:white;">'+pData.body.sceneReliefMaterialsList[i].materialName+'：</td><td width="70%" style="color:white;"><span style="color: #00fffe;font-weight: bold;">'+pData.body.sceneReliefMaterialsList[i].materialNum+'</span>'+unit+'</td></tr>';
					}
					content+='</tbody></table><div style="text-align:center;margin-top: 5px;"><a href="#" title="打电话" onclick="pGzznCore.addPromisePhone()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-right: 10px;"><img src="gzznGIS/Image/iphone.png"  alt="" style="vertical-align: sub;"/> 打电话 </a><a href="#" title="发短信" onclick="pGzznCore.addPromiseMessages()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-left: 10px;"><img src="gzznGIS/Image/inote.png"  alt="" style="vertical-align: sub;"/> 发短信 </a></div>';
					$('#windowPopUp').hide();
					var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
					infoWindow(obj);
					function infoWindow(obj) {
						$('#trackPopUpLink').empty();
						$('#trackPopUpLink').append(obj.content);    		            	
						function positionPopUp (c) {
							var x = c.x - ($('#trackPopUpContent').width()) / 2;
							var y = c.y - ($('#trackPopUpContent').height());
							$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
						}
						var c = new Crystal.Cartesian2(movementX, movementY);
						$('#trackPopUp').show();
						positionPopUp(c);
						
						var removeHandler = viewer.scene.postRender.addEventListener(function () {
							try{
								var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
								if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
									positionPopUp(changedC);
									c = changedC;
								}
							}
							catch(err){}
						});
						
						$('.leaflet-popup-close-button_track').click(function() {
							viewer.selectedEntity = undefined;
							$('#trackPopUp').hide();
							$('#trackPopUpLink').empty();
							removeHandler.call();
							return false;
						});
						return "";
					}
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
	}
	function addPromiseClickEventInfo(movement){
		let name = mEntity._name;
		let time = mEntity._properties._TIME._value;
		let address = mEntity._properties._LOCATION._value;
		let remake = mEntity._properties._REMARK._value;
		pEventInfo = mEntity._id;
		viewer.selectedEntity = mEntity;
		let content1= '';
		content1 ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
				+'<tr><td width="10%" style="color:white;">时间：</td><td width="85%" style="color:white;">'+time+'</td></tr>'
				+'<tr><td width="10%" style="color:white;">地点：</td><td width="85%" style="color:white;">'+address+'</td></tr>'
				+'<tr><td width="10%" style="color:white;">简介：</td><td width="85%" style="color:white;max-width: 600px;">'+remake+'</td></tr>';
		content1+='</tbody></table>';
		var content= {};
		content.content=content1;
		var cPoint = new Crystal.Cartesian2(movement.position.x, movement.position.y);
		var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
		var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
		var height = viewer.scene.globe.getHeight(geoPt1);
		var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
		content.position = Crystal.Cartesian3.fromDegrees(point[0], point[1], height);
		content.screen = movement.position;//Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, mEntity.position._value);
		$('#windowPopUp').hide();
		infoWindow(content);
		function infoWindow(obj) {
			$('#trackPopUpLink').empty();
			$('#trackPopUpLink').append(obj.content);    		            	
			function positionPopUp (c) {
				var x = c.x - ($('#trackPopUpContent').width()) / 2;
				var y = c.y - ($('#trackPopUpContent').height());
				$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
			}
			var c = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);//new Crystal.Cartesian2(obj.screen.x, obj.screen.y);
			$('#trackPopUp').show();
			positionPopUp(c);
			
			removeEventHandler = viewer.scene.postRender.addEventListener(function () {
				try{
					var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
					if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
						positionPopUp(changedC);
						c = changedC;
					}
				}
				catch(err){}
			});
			
			$('.leaflet-popup-close-button_track').click(function() {
				//viewer.selectedEntity = undefined;
				//if(!pUrgentType){
					//viewer.dataSources.remove(DrowningEventSource);
				//}
				$('#trackPopUp').hide();
				$('#trackPopUpLink').empty();
				//offWartime();
				removeEventHandler.call();
				return false;
			});
			return "";
		}
	}
	function addPromiseCameraInfo(sid, name, movement){
		var vWidth = document.body.clientWidth / 2;
		var vHeight = document.body.clientHeight / 2;
		var changedC = {"x":vWidth,"y":vHeight};
		let clientWidth = document.body.clientWidth;
		var cmtoPx = changedC.y - 301;
		var cmtoPy = changedC.x + 150;
		var cmtoArea = ['648px','412px'];
		var cmtoW = 648;
		var cmtoH = 412;
		var locFlag = loctionArray.pop();
		if(clientWidth<3000){
			if(locFlag==1){ //右
				cmtoPx = changedC.y - 206;
				cmtoPy = changedC.x + 150;
			}
			else if(locFlag==2){ //左
				cmtoPx = changedC.y - 206;
				cmtoPy = changedC.x - 798;
			}
			else if(locFlag==3){ //右右
				cmtoPx = changedC.y - 206;
				cmtoPy = changedC.x + 803;
			}
			else if(locFlag==4){ //左左
				cmtoPx = changedC.y - 206;
				cmtoPy = changedC.x - 1451;
			}
			else if(locFlag==5){ //右右右
				cmtoPx = changedC.y - 206;
				cmtoPy = changedC.x + 1456;
			}
			else if(locFlag==6){ //左左左
				cmtoPx = changedC.y - 206;
				cmtoPy = changedC.x - 2104;
			}
			else if(locFlag==7){ //右右右右
				cmtoPx = changedC.y - 206;
				cmtoPy = changedC.x + 2109;
			}
			else if(locFlag==8){ //左左左左
				cmtoPx = changedC.y - 206;
				cmtoPy = changedC.x - 2757;
			}
		}
		else{
			cmtoArea = ['972px','618px'];
			cmtoW = 972;
			cmtoH = 618;
			if(locFlag==1){ //右
				cmtoPx = changedC.y - 309;
				cmtoPy = changedC.x + 150;
			}
			else if(locFlag==2){ //左
				cmtoPx = changedC.y - 309;
				cmtoPy = changedC.x - 1122;
			}
			else if(locFlag==3){ //右右
				cmtoPx = changedC.y - 309;
				cmtoPy = changedC.x + 1127;
			}
			else if(locFlag==4){ //左左
				cmtoPx = changedC.y - 309;
				cmtoPy = changedC.x - 2099;
			}
			else if(locFlag==5){ //右右右
				cmtoPx = changedC.y - 309;
				cmtoPy = changedC.x + 2104;
			}
			else if(locFlag==6){ //左左左
				cmtoPx = changedC.y - 309;
				cmtoPy = changedC.x - 3076;
			}
			else if(locFlag==7){ //右右右右
				cmtoPx = changedC.y - 309;
				cmtoPy = changedC.x + 3081;
			}
			else if(locFlag==8){ //左左左左
				cmtoPx = changedC.y - 309;
				cmtoPy = changedC.x - 4053;
			}
		}
		
		var data = [];
		data.push(cmtoPx + 'px');
		data.push(cmtoPy + 'px');
		var videoID = layer.open({
			id: "plottingIndex3D"+sid,
			title: '<i class="fa fa-edit"></i> ' + name==undefined?'':name,
			type: 2,
			content: 'gzznGIS/ToolBox/video.html?strJson='+escape(sid+'_'+movement+'_'+cmtoW+'_'+cmtoH),
			shade: false,
			area: cmtoArea,
			offset: data,
			cancel: function(index, layero){
				let mDetailsInfo = videoIdArray[index];
				var locFlag = video1Array["plottingIndex3D"+mDetailsInfo];
				if(locFlag!=0){
					loctionArray.push(locFlag);
					loctionArray.sort(function sortNumber(a,b){return b - a});
				}
				video1Array["plottingIndex3D"+mDetailsInfo] = 0;
				viewer.selectedEntity = undefined;
				closeChannelStream(videoDeviceIdArray[index]);
			}
		});
		var pVideo1 = video1Array["plottingIndex3D"+sid];
		if(pVideo1==undefined||pVideo1==0){
			videoArray["plottingIndex3D"+sid] = videoID; 
			video1Array["plottingIndex3D"+sid] = locFlag;
			videoIdArray[videoID] = sid;
			videoDeviceIdArray[videoID] = sid+'_'+movement;
		}
		else{
			loctionArray.push(locFlag);
			loctionArray.sort(function sortNumber(a,b){return b - a});
		}
	}
	function closeChannelStream(vValue){
		let arrValue = vValue.split('_');
		if(arrValue.length>1){
			let sBody = [];
			let formData = {};
			formData.deviceId = arrValue[2];
			formData.id = arrValue[1];
			formData.playUrlMap = {};
			formData.success = true;
			formData.cause = '';
			sBody.push(formData);
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webVedioFlvStopUrl,
				data : JSON.stringify(sBody),
				dataType : "JSON",
				cache:false,
				async:true,
				success:function(pData) {
				   
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
	}
	function addPromiseMaterialStorageInfo(sid, movement){
		let arrValue = sid.split('_');
		if(arrValue.length>1){
			sid = arrValue[1];
			let strJson = {};
			strJson.page = 1;
			strJson.pageSize = 10;
			let sBody = {};
			sBody.sid = sid;
			strJson.body = sBody;
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webStorageManageUrl,
				cache:false,
				async:true,
				data:JSON.stringify(strJson),
				success:function(pData) {
					var cPoint = new Crystal.Cartesian2(movement.position.x, movement.position.y);
					var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
					var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
				    var height = viewer.scene.globe.getHeight(geoPt1);
				    var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
				    var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
					var name = pData.body[0].name;
					var people = pData.body[0].pnicipal;
					var phone = pData.body[0].pnicipalPlhone;
					var address = pData.body[0].locationName;
					var type = storageType[pData.body[0].type];
					var number = storageGrade[pData.body[0].grade];
					var content= '';
					content ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
						    +'<tr><td width="20%" style="color:white;">领导：</td><td width="70%" style="color:white;">'+people+'</td></tr>'
							+'<tr><td width="20%" style="color:white;">电话：</td><td width="70%" style="color:white;">'+phone+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">地址：</td><td width="70%" style="color:white;">'+address+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">类型：</td><td width="70%" style="color:white;">'+type+'</td></tr>'
							+'<tr><td width="20%" style="color:white;">等级：</td><td width="70%" style="color:white;">'+number+'</td></tr>'
							+'<tr><td width="20%" style="color:white;">仓库资源：</td><td width="70%" style="color:white;"></td></tr>';
					let t = warehouseFlag[sid];
					if(t!=undefined){
						if(t.length>30){
							for(let i = 0;i<30;i++){
								content+='<tr><td style="color:white;">'+t[i].name+'：'+t[i].currNum+t[i].unit+'</td></tr>';
							}
							content+='<tr><td style="color:white;">...</td></tr>';
						}
						else{
							for(let i = 0;i<t.length;i++){
								content+='<tr><td style="color:white;">'+t[i].name+'：'+t[i].currNum+t[i].unit+'</td></tr>';
							}
						}
					}
					else{
						content += '<tr><td style="color:white;">无资源</td></tr>';
					}
					content+='</tbody></table>';
					//+'</tbody></table>';	
					$('#trackPopUp').hide();
					var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
					infoWindow(obj);
					function infoWindow(obj) {
						$('#windowPopUpLink').empty();
						$('#windowPopUpLink').append(obj.content);    		            	
						function positionPopUp (c) {
							var x = c.x - ($('#windowPopUpContent').width()) / 2;
							var y = c.y - ($('#windowPopUpContent').height());
							$('#windowPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
						}
						var c = new Crystal.Cartesian2(movement.position.x, movement.position.y);
						$('#windowPopUp').show();
						positionPopUp(c);
						
						var removeHandler = viewer.scene.postRender.addEventListener(function () {
							try{
								var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
								if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
									positionPopUp(changedC);
									c = changedC;
								}
							}
							catch(err){}
						});
						
						$('.leaflet-popup-close-button_lyz').click(function() {
							viewer.selectedEntity = undefined;
							$('#windowPopUp').hide();
							$('#windowPopUpLink').empty();
							removeHandler.call();
							return false;
						});
						return "";
					}
				},
				error:function(data) {
					console.log("HospitalDataError");
				}
			});
		}
	}
	function addPromiseHospitalInfo(sid, movement){
		let arrValue = sid.split('_');
		if(arrValue.length>1){
			sid = arrValue[1];
			let strJson = {};
			strJson.page = 1;
			strJson.pageSize = 10;
			let sBody = {};
			sBody.sid = sid;
			strJson.body = sBody;
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webUmtmanageUrl,
				cache:false,
				async:true,
				data:JSON.stringify(strJson),
				success:function(pData) {
					var cPoint = new Crystal.Cartesian2(movement.position.x, movement.position.y);
					var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
					var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
				    var height = viewer.scene.globe.getHeight(geoPt1);
				    var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
				    var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
					var name = pData.body[0].umtName;
					var people = pData.body[0].governor;
					var phone = pData.body[0].tel;
					var address = pData.body[0].locationName;
					var type = pData.body[0].unitProperties;
					var number = pData.body[0].supportPower;
					var content= '';
					content ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
						    +'<tr><td width="20%" style="color:white;">领导：</td><td width="70%" style="color:white;">'+people+'</td></tr>'
							+'<tr><td width="20%" style="color:white;">电话：</td><td width="70%" style="color:white;">'+phone+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">地址：</td><td width="70%" style="color:white;">'+address+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">类型：</td><td width="70%" style="color:white;">'+type+'</td></tr>'
							+'<tr><td width="20%" style="color:white;">支援能力：</td><td width="70%" style="color:white;">'+number+'</td></tr>'
						    +'</tbody></table>';	
					$('#trackPopUp').hide();
					var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
					infoWindow(obj);
					function infoWindow(obj) {
						$('#windowPopUpLink').empty();
						$('#windowPopUpLink').append(obj.content);    		            	
						function positionPopUp (c) {
							var x = c.x - ($('#windowPopUpContent').width()) / 2;
							var y = c.y - ($('#windowPopUpContent').height());
							$('#windowPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
						}
						var c = new Crystal.Cartesian2(movement.position.x, movement.position.y);
						$('#windowPopUp').show();
						positionPopUp(c);
						
						var removeHandler = viewer.scene.postRender.addEventListener(function () {
							try{
								var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
								if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
									positionPopUp(changedC);
									c = changedC;
								}
							}
							catch(err){}
						});
						
						$('.leaflet-popup-close-button_lyz').click(function() {
							viewer.selectedEntity = undefined;
							$('#windowPopUp').hide();
							$('#windowPopUpLink').empty();
							removeHandler.call();
							return false;
						});
						return "";
					}
				},
				error:function(data) {
					console.log("HospitalDataError");
				}
			});
		}
	}
	function addPromiseShelterInfo(sid, movement){
		let arrValue = sid.split('_');
		if(arrValue.length>1){
			sid = arrValue[1];
			let strJson = {};
			strJson.page = 1;
			strJson.pageSize = 10;
			let sBody = {};
			sBody.sid = sid;
			strJson.body = sBody;
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webShelterUrl,
				cache:false,
				async:true,
				data:JSON.stringify(strJson),
				success:function(pData) {
					var cPoint = new Crystal.Cartesian2(movement.position.x, movement.position.y);
					var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
					var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
				    var height = viewer.scene.globe.getHeight(geoPt1);
				    var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
				    var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
					var name = pData.body[0].placesName;
					var people = pData.body[0].governor;
					var phone = pData.body[0].tel;
					var address = pData.body[0].locationName;
					var type = pData.body[0].purpose;
					var area = pData.body[0].area;
					var number = pData.body[0].galleryful;
					var content= '';
					content ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
						    +'<tr><td width="20%" style="color:white;">领导：</td><td width="70%" style="color:white;">'+people+'</td></tr>'
							+'<tr><td width="20%" style="color:white;">电话：</td><td width="70%" style="color:white;">'+phone+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">地址：</td><td width="70%" style="color:white;">'+address+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">类型：</td><td width="70%" style="color:white;">'+type+'</td></tr>'
							+'<tr><td width="20%" style="color:white;">面积：</td><td width="70%" style="color:white;">'+area+'㎞²</td></tr>'
							+'<tr><td width="20%" style="color:white;">容纳人数：</td><td width="70%" style="color:white;">'+number+'</td></tr>'
						    +'</tbody></table>';	
					$('#trackPopUp').hide();
					var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
					infoWindow(obj);
					function infoWindow(obj) {
						$('#windowPopUpLink').empty();
						$('#windowPopUpLink').append(obj.content);    		            	
						function positionPopUp (c) {
							var x = c.x - ($('#windowPopUpContent').width()) / 2;
							var y = c.y - ($('#windowPopUpContent').height());
							$('#windowPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
						}
						var c = new Crystal.Cartesian2(movement.position.x, movement.position.y);
						$('#windowPopUp').show();
						positionPopUp(c);
						
						var removeHandler = viewer.scene.postRender.addEventListener(function () {
							try{
								var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
								if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
									positionPopUp(changedC);
									c = changedC;
								}
							}
							catch(err){}
						});
						
						$('.leaflet-popup-close-button_lyz').click(function() {
							viewer.selectedEntity = undefined;
							$('#windowPopUp').hide();
							$('#windowPopUpLink').empty();
							removeHandler.call();
							return false;
						});
						return "";
					}
				},
				error:function(data) {
					console.log("HospitalDataError");
				}
			});
		}
	}
	function addPromiseWaterloggingBlack(nEntitie, movement){
		var cPoint = new Crystal.Cartesian2(movement.position.x, movement.position.y);
		var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
		var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
		var height = viewer.scene.globe.getHeight(geoPt1);
		var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
		var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
		var name = nEntitie._properties._NAME._value;
		var unit = nEntitie._properties._Unit._value;
		var people = nEntitie._properties._Contact._value;
		var phone = nEntitie._properties._Phone._value;
		var remark = nEntitie._properties._Remark._value;
		teamEntitieJson.name = name;
		teamEntitieJson.phone = phone;
		//var address = pData.body.addr;
		//var type = teamType[pData.body.type];
		var content= '';
		content ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
				+'<tr><td width="20%" style="color:white;">负责单位：</td><td width="70%" style="color:white;">'+unit+'</td></tr>'
				+'<tr><td width="20%" style="color:white;">领导：</td><td width="70%" style="color:white;">'+people+'</td></tr>'
				+'<tr><td width="20%" style="color:white;">电话：</td><td width="70%" style="color:white;">'+phone+'</td></tr>'
				+'<tr><td width="20%" style="color:white;">情况：</td><td width="70%" style="color:white;">'+remark+'</td></tr>'
				//+'<tr><td width="20%" style="color:white;">类型：</td><td width="70%" style="color:white;">'+type+'</td></tr>'
				+'</tbody></table>';
		content+='<div style="text-align:center;margin-top: 5px;"><a href="#" title="打电话" onclick="pGzznCore.addPromisePhone()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-right: 10px;"><img src="gzznGIS/Image/iphone.png"  alt="" style="vertical-align: sub;"/> 打电话 </a><a href="#" title="发短信" onclick="pGzznCore.addPromiseMessages()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-left: 10px;"><img src="gzznGIS/Image/inote.png"  alt="" style="vertical-align: sub;"/> 发短信 </a></div>';
		$('#windowPopUp').hide();
		var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
		infoWindow(obj);
		function infoWindow(obj) {
			$('#trackPopUpLink').empty();
			$('#trackPopUpLink').append(obj.content);    		            	
			function positionPopUp (c) {
				var x = c.x - ($('#trackPopUpContent').width()) / 2;
				var y = c.y - ($('#trackPopUpContent').height());
				$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
			}
			var c = new Crystal.Cartesian2(movement.position.x, movement.position.y);
			$('#trackPopUp').show();
			positionPopUp(c);
			
			var removeHandler = viewer.scene.postRender.addEventListener(function () {
				try{
					var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
					if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
						positionPopUp(changedC);
						c = changedC;
					}
				}
				catch(err){}
			});
			
			$('.leaflet-popup-close-button_track').click(function() {
				viewer.selectedEntity = undefined;
				$('#trackPopUp').hide();
				$('#trackPopUpLink').empty();
				removeHandler.call();
				return false;
			});
			return "";
		}
	}
	function addPromiseReservoirBlack(nEntitie, movement){
		var cPoint = new Crystal.Cartesian2(movement.position.x, movement.position.y);
		var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
		var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
		var height = viewer.scene.globe.getHeight(geoPt1);
		var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
		var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
		teamEntitieJson.name = nEntitie._properties._Contact._value;
		teamEntitieJson.phone = nEntitie._properties._Phone._value;
		//var address = pData.body.addr;
		//var type = teamType[pData.body.type];
		var content= '';
		content ='<div style="color: white;font-weight: bold;">'+ nEntitie._properties._NAME._value +'</div><table><tbody>'
				+'<tr><td width="20%" style="color:white;">领导：</td><td width="70%" style="color:white;">'+nEntitie._properties._Contact._value+'</td></tr>'
						+'<tr><td width="20%" style="color:white;">电话：</td><td width="70%" style="color:white;">'+nEntitie._properties._Phone._value+'</td></tr>'
						+'<tr><td width="20%" style="color:white;">水位：</td><td width="70%" style="color:white;">'+nEntitie._properties._WaterLevel._value+'m</td></tr>'
						+'<tr><td width="20%" style="color:white;">水量：</td><td width="70%" style="color:white;">'+nEntitie._properties._WaterYield._value+'㎡</td></tr>'
						+'<tr><td width="20%" style="color:white;">警戒水位：</td><td width="70%" style="color:white;">'+nEntitie._properties._WarningWaterLevel._value+'m</td></tr>'
						+'<tr><td width="20%" style="color:white;">地址：</td><td width="70%" style="color:white;">'+nEntitie._properties._Address._value+'</td></tr>'
						+'</tbody></table>';
		content+='<div style="text-align:center;margin-top: 5px;"><a href="#" title="打电话" onclick="pGzznCore.addPromisePhone()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-right: 10px;"><img src="gzznGIS/Image/iphone.png"  alt="" style="vertical-align: sub;"/> 打电话 </a><a href="#" title="发短信" onclick="pGzznCore.addPromiseMessages()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-left: 10px;"><img src="gzznGIS/Image/inote.png"  alt="" style="vertical-align: sub;"/> 发短信 </a></div>';
		$('#windowPopUp').hide();
		var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
		infoWindow(obj);
		function infoWindow(obj) {
			$('#trackPopUpLink').empty();
			$('#trackPopUpLink').append(obj.content);    		            	
			function positionPopUp (c) {
				var x = c.x - ($('#trackPopUpContent').width()) / 2;
				var y = c.y - ($('#trackPopUpContent').height());
				$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
			}
			var c = new Crystal.Cartesian2(movement.position.x, movement.position.y);
			$('#trackPopUp').show();
			positionPopUp(c);
			
			var removeHandler = viewer.scene.postRender.addEventListener(function () {
				try{
					var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
					if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
						positionPopUp(changedC);
						c = changedC;
					}
				}
				catch(err){}
			});
			
			$('.leaflet-popup-close-button_track').click(function() {
				viewer.selectedEntity = undefined;
				$('#trackPopUp').hide();
				$('#trackPopUpLink').empty();
				removeHandler.call();
				return false;
			});
			return "";
		}
	}
	function addPromiseHazardousInfo(nEntitie, movement){
		var cPoint = new Crystal.Cartesian2(movement.position.x, movement.position.y);
		var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
		var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
		var height = viewer.scene.globe.getHeight(geoPt1);
		var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
		var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
		if(nEntitie._properties._Layer!=undefined&&nEntitie._properties._Layer._value==4){
			return;
		}
		var name = nEntitie._properties._NAME._value;
		var people = nEntitie._properties._Contact._value;
		var phone = nEntitie._properties._Phone._value;
		var address = nEntitie._properties._Address==undefined?undefined:nEntitie._properties._Address._value;
		teamEntitieJson.name = name;
		teamEntitieJson.phone = phone;
		//var address = pData.body.addr;
		//var type = teamType[pData.body.type];
		var content= '';
		content ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
				+'<tr><td width="20%" style="color:white;">领导：</td><td width="70%" style="color:white;">'+people+'</td></tr>'
				+'<tr><td width="20%" style="color:white;">电话：</td><td width="70%" style="color:white;">'+phone+'</td></tr>'
				//+'<tr><td width="20%" style="color:white;">地址：</td><td width="70%" style="color:white;">'+address+'</td></tr>'
				//+'<tr><td width="20%" style="color:white;">类型：</td><td width="70%" style="color:white;">'+type+'</td></tr>'
		if(address!=undefined){
			content+= '<tr><td width="25%" style="color:white;">地址：</td><td width="65%" style="color:white;">'+address+'</td></tr></tbody></table>';
		}
		else{
			content+= '</tbody></table>';
		}
		content+='<div style="text-align:center;margin-top: 5px;"><a href="#" title="打电话" onclick="pGzznCore.addPromisePhone()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-right: 10px;"><img src="gzznGIS/Image/iphone.png"  alt="" style="vertical-align: sub;"/> 打电话 </a><a href="#" title="发短信" onclick="pGzznCore.addPromiseMessages()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-left: 10px;"><img src="gzznGIS/Image/inote.png"  alt="" style="vertical-align: sub;"/> 发短信 </a></div>';
		$('#windowPopUp').hide();
		var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
		infoWindow(obj);
		function infoWindow(obj) {
			$('#trackPopUpLink').empty();
			$('#trackPopUpLink').append(obj.content);    		            	
			function positionPopUp (c) {
				var x = c.x - ($('#trackPopUpContent').width()) / 2;
				var y = c.y - ($('#trackPopUpContent').height());
				$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
			}
			var c = new Crystal.Cartesian2(movement.position.x, movement.position.y);
			$('#trackPopUp').show();
			positionPopUp(c);
			
			var removeHandler = viewer.scene.postRender.addEventListener(function () {
				try{
					var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
					if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
						positionPopUp(changedC);
						c = changedC;
					}
				}
				catch(err){}
			});
			
			$('.leaflet-popup-close-button_track').click(function() {
				viewer.selectedEntity = undefined;
				$('#trackPopUp').hide();
				$('#trackPopUpLink').empty();
				removeHandler.call();
				return false;
			});
			return "";
		}
	}
	function addPromiseTeamLocInfo(nEntitie, movement){
		var cPoint = new Crystal.Cartesian2(movement.position.x, movement.position.y);
		var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
		var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
		var height = viewer.scene.globe.getHeight(geoPt1);
		var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
		var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
		if(nEntitie._properties._Layer!=undefined&&nEntitie._properties._Layer._value==4){
			return;
		}
		var name = nEntitie._properties._NAME._value;
		var phone = nEntitie._properties._Phone._value;
		var count = nEntitie._properties._Count._value;
		teamEntitieJson.name = name;
		teamEntitieJson.phone = phone;
		var content= '';
		content ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
				+'<tr><td width="20%" style="color:white;">队伍人数：</td><td width="70%" style="color:white;">'+count+'</td></tr>'
				+'<tr><td width="20%" style="color:white;">联系电话：</td><td width="70%" style="color:white;">'+phone+'</td></tr>'
				+'</tbody></table>';
		content+='<div style="text-align:center;margin-top: 5px;"><a href="#" title="打电话" onclick="pGzznCore.addPromisePhone()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-right: 10px;"><img src="gzznGIS/Image/iphone.png"  alt="" style="vertical-align: sub;"/> 打电话 </a><a href="#" title="发短信" onclick="pGzznCore.addPromiseMessages()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-left: 10px;"><img src="gzznGIS/Image/inote.png"  alt="" style="vertical-align: sub;"/> 发短信 </a></div>';
		$('#windowPopUp').hide();
		var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
		infoWindow(obj);
		function infoWindow(obj) {
			$('#trackPopUpLink').empty();
			$('#trackPopUpLink').append(obj.content);    		            	
			function positionPopUp (c) {
				var x = c.x - ($('#trackPopUpContent').width()) / 2;
				var y = c.y - ($('#trackPopUpContent').height());
				$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
			}
			var c = new Crystal.Cartesian2(movement.position.x, movement.position.y);
			$('#trackPopUp').show();
			positionPopUp(c);
			
			var removeHandler = viewer.scene.postRender.addEventListener(function () {
				try{
					var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
					if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
						positionPopUp(changedC);
						c = changedC;
					}
				}
				catch(err){}
			});
			
			$('.leaflet-popup-close-button_track').click(function() {
				viewer.selectedEntity = undefined;
				$('#trackPopUp').hide();
				$('#trackPopUpLink').empty();
				removeHandler.call();
				return false;
			});
			return "";
		}
	}
	function addPromiseForTeamInfo(nEntitie, movement){
		var cPoint = new Crystal.Cartesian2(movement.position.x, movement.position.y);
		var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
		var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
		var height = viewer.scene.globe.getHeight(geoPt1);
		var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
		var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
		if(nEntitie._properties._Layer!=undefined&&nEntitie._properties._Layer._value==4){
			return;
		}
		if(nEntitie._properties._Layer!=undefined&&nEntitie._properties._Layer._value==12){
			return;
		}
		if(nEntitie._properties._Layer!=undefined&&nEntitie._properties._Layer._value==13){
			return;
		}
		if(nEntitie._properties._Layer!=undefined&&nEntitie._properties._Layer._value==14){
			return;
		}
		if(nEntitie._properties._Layer!=undefined&&nEntitie._properties._Layer._value==15){
			return;
		}
		if(nEntitie._properties._Layer!=undefined&&nEntitie._properties._Layer._value==16){
			return;
		}
		if(nEntitie._properties._Layer!=undefined&&nEntitie._properties._Layer._value==17){
			return;
		}
		if(nEntitie._properties._Layer!=undefined&&nEntitie._properties._Layer._value==18){
			return;
		}
		var name = nEntitie._properties._NAME._value;
		var people = nEntitie._properties._PersonName._value;
		var phone = nEntitie._properties._PersonPhone._value;
		var address = nEntitie._properties._Address==undefined?undefined:nEntitie._properties._Address._value;
		teamEntitieJson.name = name;
		teamEntitieJson.phone = phone;
		//var address = pData.body.addr;
		//var type = teamType[pData.body.type];
		var content= '';
		content ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
				+'<tr><td width="30%" style="color:white;">领导：</td><td width="70%" style="color:white;">'+people+'</td></tr>'
				+'<tr><td width="30%" style="color:white;">电话：</td><td width="70%" style="color:white;">'+phone+'</td></tr>'
				//+'<tr><td width="20%" style="color:white;">地址：</td><td width="70%" style="color:white;">'+address+'</td></tr>'
				//+'<tr><td width="20%" style="color:white;">类型：</td><td width="70%" style="color:white;">'+type+'</td></tr>'
		if(address!=undefined){
			content+= '<tr><td width="25%" style="color:white;">地址：</td><td width="65%" style="color:white;">'+address+'</td></tr></tbody></table>';
		}
		else if(nEntitie._properties._Type!=undefined){
			content+= '<tr><td width="25%" style="color:white;">类型：</td><td width="65%" style="color:white;">'+nEntitie._properties._Type._value+'</td></tr></tbody></table>';
		}
		else if(nEntitie._properties._Num!=undefined){
			content+= '<tr><td width="25%" style="color:white;">容纳人数：</td><td width="65%" style="color:white;">'+nEntitie._properties._Num._value+'人</td></tr><tr><td width="25%" style="color:white;">面积：</td><td width="65%" style="color:white;">'+nEntitie._properties._Area._value+'m²</td></tr></tbody></table>';
		}
		else{
			content+= '</tbody></table>';
		}
		content+='<div style="text-align:center;margin-top: 5px;"><a href="#" title="打电话" onclick="pGzznCore.addPromisePhone()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-right: 10px;"><img src="gzznGIS/Image/iphone.png"  alt="" style="vertical-align: sub;"/> 打电话 </a><a href="#" title="发短信" onclick="pGzznCore.addPromiseMessages()" style="background-color: #013E97;border: none;color: white;padding:5px;border-radius:5px;cursor: pointer;margin-left: 10px;"><img src="gzznGIS/Image/inote.png"  alt="" style="vertical-align: sub;"/> 发短信 </a></div>';
		$('#windowPopUp').hide();
		var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
		infoWindow(obj);
		function infoWindow(obj) {
			$('#trackPopUpLink').empty();
			$('#trackPopUpLink').append(obj.content);    		            	
			function positionPopUp (c) {
				var x = c.x - ($('#trackPopUpContent').width()) / 2;
				var y = c.y - ($('#trackPopUpContent').height());
				$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
			}
			var c = new Crystal.Cartesian2(movement.position.x, movement.position.y);
			$('#trackPopUp').show();
			positionPopUp(c);
			
			var removeHandler = viewer.scene.postRender.addEventListener(function () {
				try{
					var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
					if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
						positionPopUp(changedC);
						c = changedC;
					}
				}
				catch(err){}
			});
			
			$('.leaflet-popup-close-button_track').click(function() {
				viewer.selectedEntity = undefined;
				$('#trackPopUp').hide();
				$('#trackPopUpLink').empty();
				removeHandler.call();
				return false;
			});
			return "";
		}
	}
	function addPromiseNursingHomeInfo(sid, movement){
		let arrValue = sid.split('_');
		if(arrValue.length>1){
			sid = arrValue[1];
			$.ajax({
				type : 'GET',
				contentType : "application/json;charset-UTF-8",
				url:webNursingHomeUrl+sid,
				cache:false,
				async:true,
				success:function(pData) {
					var cPoint = new Crystal.Cartesian2(movement.position.x, movement.position.y);
					var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
					var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
				    var height = viewer.scene.globe.getHeight(geoPt1);
				    var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
				    var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
					var name = pData.body.nursingHomeName;
					var people = pData.body.leader;
					var phone = pData.body.contactPhone;
					var address = pData.body.address;
					var type = pData.body.type;
					var content= '';
					content ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
						    +'<tr><td width="20%" style="color:white;">领导：</td><td width="70%" style="color:white;">'+people+'</td></tr>'
							+'<tr><td width="20%" style="color:white;">电话：</td><td width="70%" style="color:white;">'+phone+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">地址：</td><td width="70%" style="color:white;">'+address+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">类型：</td><td width="70%" style="color:white;">'+type+'</td></tr>'
						    +'</tbody></table>';	
					$('#trackPopUp').hide();
					var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
					infoWindow(obj);
					function infoWindow(obj) {
						$('#windowPopUpLink').empty();
						$('#windowPopUpLink').append(obj.content);    		            	
						function positionPopUp (c) {
							var x = c.x - ($('#windowPopUpContent').width()) / 2;
							var y = c.y - ($('#windowPopUpContent').height());
							$('#windowPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
						}
						var c = new Crystal.Cartesian2(movement.position.x, movement.position.y);
						$('#windowPopUp').show();
						positionPopUp(c);
						
						var removeHandler = viewer.scene.postRender.addEventListener(function () {
							try{
								var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
								if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
									positionPopUp(changedC);
									c = changedC;
								}
							}
							catch(err){}
						});
						
						$('.leaflet-popup-close-button_lyz').click(function() {
							viewer.selectedEntity = undefined;
							$('#windowPopUp').hide();
							$('#windowPopUpLink').empty();
							removeHandler.call();
							return false;
						});
						return "";
					}
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
	}
	function addPromiseGasStationInfo(sid, movement){
		let arrValue = sid.split('_');
		if(arrValue.length>1){
			sid = arrValue[1];
			$.ajax({
				type : 'GET',
				contentType : "application/json;charset-UTF-8",
				url:webGasStationHomeUrl+sid,
				cache:false,
				async:true,
				success:function(pData) {
					var cPoint = new Crystal.Cartesian2(movement.position.x, movement.position.y);
					var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
					var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
				    var height = viewer.scene.globe.getHeight(geoPt1);
				    var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
				    var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
					var name = pData.body.petrolStationName;
					var status = pData.body.status;
					//var phone = pData.body.contactPhone;
					var address = pData.body.address;
					var type = pData.body.type;
					var content= '';
					content ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
						    +'<tr><td width="20%" style="color:white;">状态：</td><td width="70%" style="color:white;">'+status+'</td></tr>'
							//+'<tr><td width="20%" style="color:white;">电话：</td><td width="70%" style="color:white;">'+phone+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">地址：</td><td width="70%" style="color:white;">'+address+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">类型：</td><td width="70%" style="color:white;">'+type+'</td></tr>'
						    +'</tbody></table>';	
					$('#trackPopUp').hide();
					var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
					infoWindow(obj);
					function infoWindow(obj) {
						$('#windowPopUpLink').empty();
						$('#windowPopUpLink').append(obj.content);    		            	
						function positionPopUp (c) {
							var x = c.x - ($('#windowPopUpContent').width()) / 2;
							var y = c.y - ($('#windowPopUpContent').height());
							$('#windowPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
						}
						var c = new Crystal.Cartesian2(movement.position.x, movement.position.y);
						$('#windowPopUp').show();
						positionPopUp(c);
						
						var removeHandler = viewer.scene.postRender.addEventListener(function () {
							try{
								var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
								if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
									positionPopUp(changedC);
									c = changedC;
								}
							}
							catch(err){}
						});
						
						$('.leaflet-popup-close-button_lyz').click(function() {
							viewer.selectedEntity = undefined;
							$('#windowPopUp').hide();
							$('#windowPopUpLink').empty();
							removeHandler.call();
							return false;
						});
						return "";
					}
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
	}
	function addPromiseSchoolInfo(sid, movement){
		let arrValue = sid.split('_');
		if(arrValue.length>1){
			sid = arrValue[1];
			$.ajax({
				type : 'GET',
				contentType : "application/json;charset-UTF-8",
				url:webSchoolHomeUrl+sid,
				cache:false,
				async:true,
				success:function(pData) {
					var cPoint = new Crystal.Cartesian2(movement.position.x, movement.position.y);
					var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
					var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
				    var height = viewer.scene.globe.getHeight(geoPt1);
				    var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
				    var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
					var name = pData.body.schoolName;
					var people = pData.body.leader;
					var phone = pData.body.contactPhone;
					var address = pData.body.address;
					var type = pData.body.type;
					var content= '';
					content ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
						    +'<tr><td width="20%" style="color:white;">领导：</td><td width="70%" style="color:white;">'+people+'</td></tr>'
							+'<tr><td width="20%" style="color:white;">电话：</td><td width="70%" style="color:white;">'+phone+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">地址：</td><td width="70%" style="color:white;">'+address+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">类型：</td><td width="70%" style="color:white;">'+type+'</td></tr>'
						    +'</tbody></table>';	
					$('#trackPopUp').hide();
					var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
					infoWindow(obj);
					function infoWindow(obj) {
						$('#windowPopUpLink').empty();
						$('#windowPopUpLink').append(obj.content);    		            	
						function positionPopUp (c) {
							var x = c.x - ($('#windowPopUpContent').width()) / 2;
							var y = c.y - ($('#windowPopUpContent').height());
							$('#windowPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
						}
						var c = new Crystal.Cartesian2(movement.position.x, movement.position.y);
						$('#windowPopUp').show();
						positionPopUp(c);
						
						var removeHandler = viewer.scene.postRender.addEventListener(function () {
							try{
								var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
								if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
									positionPopUp(changedC);
									c = changedC;
								}
							}
							catch(err){}
						});
						
						$('.leaflet-popup-close-button_lyz').click(function() {
							viewer.selectedEntity = undefined;
							$('#windowPopUp').hide();
							$('#windowPopUpLink').empty();
							removeHandler.call();
							return false;
						});
						return "";
					}
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
	}
	function addPromiseEnterprisesInfo(sid, movement){
		let arrValue = sid.split('_');
		if(arrValue.length>1){
			sid = arrValue[1];
			$.ajax({
				type : 'GET',
				contentType : "application/json;charset-UTF-8",
				url:webEnterprisesUrl+sid,
				cache:false,
				async:true,
				success:function(pData) {
					var cPoint = new Crystal.Cartesian2(movement.position.x, movement.position.y);
					var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
					var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
				    var height = viewer.scene.globe.getHeight(geoPt1);
				    var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
				    var destination = Crystal.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
					var name = pData.body.companyName;
					var people = pData.body.contact;
					var phone = pData.body.contactPhone;
					var address = pData.body.address;
					var type = pData.body.industryType;
					var content= '';
					content ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
						    +'<tr><td width="20%" style="color:white;">企业法人：</td><td width="70%" style="color:white;">'+people+'</td></tr>'
							+'<tr><td width="20%" style="color:white;">电话：</td><td width="70%" style="color:white;">'+phone+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">地址：</td><td width="70%" style="color:white;">'+address+'</td></tr>'
						    +'<tr><td width="20%" style="color:white;">类型：</td><td width="70%" style="color:white;">'+type+'</td></tr>'
						    +'</tbody></table>';	
					$('#trackPopUp').hide();
					var obj = {position:Crystal.Cartesian3.fromDegrees(point[0], point[1], height),destination:destination,content:content};
					infoWindow(obj);
					function infoWindow(obj) {
						$('#windowPopUpLink').empty();
						$('#windowPopUpLink').append(obj.content);    		            	
						function positionPopUp (c) {
							var x = c.x - ($('#windowPopUpContent').width()) / 2;
							var y = c.y - ($('#windowPopUpContent').height());
							$('#windowPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-30) + 'px, 0)');
						}
						var c = new Crystal.Cartesian2(movement.position.x, movement.position.y);
						$('#windowPopUp').show();
						positionPopUp(c);
						
						var removeHandler = viewer.scene.postRender.addEventListener(function () {
							try{
								var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
								if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
									positionPopUp(changedC);
									c = changedC;
								}
							}
							catch(err){}
						});
						
						$('.leaflet-popup-close-button_lyz').click(function() {
							viewer.selectedEntity = undefined;
							$('#windowPopUp').hide();
							$('#windowPopUpLink').empty();
							removeHandler.call();
							return false;
						});
						return "";
					}
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
	}
	this.removeTickEventListener = function(){
		viewer.clock.onTick.removeEventListener(rtPick);
	}
	viewer.clock.onTick.addEventListener(rtPick); //关掉地图中心的坐标信息，采用鼠标移动的坐标信息
	//loadGdPolyline();
	//loadLwPolyline();
	loadGzPolyline();
	handler3D.setInputAction(function(movement) {mouse_move_method(movement);}, Crystal.ScreenSpaceEventType.MOUSE_MOVE);
	handler3D.setInputAction(function(movement) {mouse_click_method(movement);}, Crystal.ScreenSpaceEventType.LEFT_CLICK);
	document.getElementById('envLayers').addEventListener('click', function () {
		openLayer3D();
		document.getElementById('envLayers').blur();
	}, false);
	document.getElementById('envCalculator').addEventListener('click', function () {
		if(navigationIndex != null){
			layer.close(navigationIndex);
		}
		if(locationIndex != null){
			layer.close(locationIndex);
		}
		if(plottingIndex != null){
			layer.close(plottingIndex);
		}
		if(plottingStyleIndex != null){
			layer.close(plottingStyleIndex);
		}
		var cmtoPx = $("#" + crystalID).height() - 221;
		var data = [];
		data.push(cmtoPx + 'px');
		data.push('10px');
		measureIndex = layer.open({
			id: "measure3D",
			title: '<i class="fa fa-calculator"></i> 图上量算',
			type: 2,
			content: 'ToolBox/measure.html',
			shade: false,
			area: '358px',
			offset: data,
			cancel: function(){
			   	measureIndex = null;
			}
		});
	}, false);
	document.getElementById('envMapPin').addEventListener('click', function () {
		if(navigationIndex != null){
			layer.close(navigationIndex);
		}
		if(measureIndex != null){
			layer.close(measureIndex);
		}
		var cmtoPx = $("#" + crystalID).height() - 250;
		var data = [];
		data.push(cmtoPx + 'px');
		data.push('10px');
		locationIndex = layer.open({
			id: "locationIndex3D",
			title: '<i class="fa fa-map-pin"></i> 坐标定位',
			type: 2,
			content: 'ToolBox/location.html',
			shade: false,
			area: ['358px','220px'],
			offset: data,
			cancel: function(){
			   	locationIndex = null;
				if(locEntity != null){
					viewer.entities.remove(locEntity);
				}
			}
		});
	}, false);
	document.getElementById('envPlane').addEventListener('click', function () {
		if(measureIndex != null){
			layer.close(measureIndex);
		}
		if(locationIndex != null){
			layer.close(locationIndex);
		}
		var cmtoPx = $("#" + crystalID).height() - 250;
		var data = [];
		data.push(cmtoPx + 'px');
		data.push('10px');
		navigationIndex = layer.open({
			id: "navigation3D",
			title: '<i class="fa fa-paper-plane"></i> 地区导航',
			type: 2,
			content: 'ToolBox/navigation.html',
			shade: false,
			area: ['358px','220px'],
			offset: data,
			cancel: function(){
			   	navigationIndex = null;
				if(geoJsonAreaDataSource != null){
					viewer.dataSources.remove(geoJsonAreaDataSource);
				}
				if(guangZhouDataSource != null){
					viewer.dataSources.remove(guangZhouDataSource);
				}
				if(gzPointDataSource != null){
					viewer.dataSources.remove(gzPointDataSource);
				}
			}
		});
	}, false);
	document.getElementById('envEdit').addEventListener('click', function () {
		if(cameraListIndex != null){
			layer.close(cameraListIndex);
		}
		var cmtoPx = 300;
		var cmtoPx2 = $("#" + crystalID).width() - 346;
		var data = [];
		data.push(cmtoPx + 'px');
		data.push(cmtoPx2+'px');
		bookmarkListIndex = layer.open({
			id: "bookmarkListIndex3D",
			title: '<i class="fa fa-edit"></i> 我的标记',
			type: 2,
			content: 'ToolBox/bookmarkList.html',
			shade: false,
			area: ['336px','468px'],
			offset: data,
			cancel: function(){
				bookmarkListIndex = null;
			}
		});
	}, false);
	document.getElementById('envTags').addEventListener('click', function () {
		if(bookmarkListIndex != null){
			layer.close(bookmarkListIndex);
		}
		var cmtoPx = 300;
		var cmtoPx2 = $("#" + crystalID).width() - 346;
		var data = [];
		data.push(cmtoPx + 'px');
		data.push(cmtoPx2+'px');
		cameraListIndex = layer.open({
			id: "cameraListIndex3D",
			title: '<i class="fa fa-paper-plane"></i> 视角书签',
			type: 2,
			content: 'ToolBox/cameraList.html',
			shade: false,
			area: ['336px','468px'],
			offset: data,
			cancel: function(){
				cameraListIndex = null;
			}
		});
	}, false);
	document.getElementById('envGroup').addEventListener('click', function () {
		if(navigationIndex != null){
			layer.close(navigationIndex);
		}
		if(locationIndex != null){
			layer.close(locationIndex);
		}
		if(measureIndex != null){
			layer.close(measureIndex);
		}
		var cmtoPx = $("#" + crystalID).height() - 250;
		var cmtoPy = 10;
		var data = [];
		data.push(cmtoPx + 'px');
		data.push(cmtoPy + 'px');
		plottingIndex = layer.open({
			id: "plottingIndex3D",
			title: '<i class="fa fa-edit"></i> 图上标绘',
			type: 2,
			content: './ToolBox/plotting.html',
			shade: false,
			area: ['358px','220px'],
			offset: data,
			cancel: function(){
				plottingIndex = null;				
			}
		});
		cmtoPx = $("#" + crystalID).height() - 250;
		cmtoPy = 373;
		data = [];
		data.push(cmtoPx + 'px');
		data.push(cmtoPy + 'px');
		plottingStyleIndex = layer.open({
			id: "plottingStyle3D",
			title: '<i class="fa fa-edit"></i> 标绘样式',
			type: 2,
			content: './ToolBox/style.html',
			shade: false,
			area: ['358px','220px'],
			offset: data,
			cancel: function(){
				plottingStyleIndex = null;
				mSelectPlot = null;
			}
		});
	}, false);
	document.getElementById('envRestore').addEventListener('click', function () {
		if(document.getElementById('crystalContainerEx') == undefined){
			if(document.getElementById('crystalPanorama') != undefined){
				document.getElementById(crystalID).style.cssText = 'width: 100%;position: absolute;left: 0%;';
				document.getElementById('crystalPanorama').remove();
				for (var i = 0;i < mEntities.length;i++)
				{
					viewer.entities.remove(mEntities[i]);
				}
				mEntities = [];
				panoramaLng = 113.3417701633946;
				panoramaLat = 23.146842269703498;
				panoramaAtl = 17.0806190541792;
				panoramaEventHandler.destroy();
				viewer.crystalWidget.screenSpaceEventHandler.setInputAction(leftClickFunction, Crystal.ScreenSpaceEventType.LEFT_CLICK);
			}
			$('#' + crystalID).before('<div id="crystalContainerEx"></div>');
			document.getElementById('crystalContainer').style.cssText = 'width: 50%;position: absolute;left: 50%;display: inline-block;';
			document.getElementById('crystalContainerEx').style.cssText = 'width: 50%;height: 100%;display: inline-block;';
			if(terrainUrl!=''){
				var terrainProvider = new Crystal.CrystalTerrainProvider({url: terrainUrl});
				viewerEx = new Crystal.Viewer('crystalContainerEx',{terrainProvider:terrainProvider,envToolPicker:false,fullscreenButton:false,animation:false,
					timeline:false,sceneModePicker:false,homeButton:false,geocoder:false,imageryProviderViewModelsIndex:1});
			}
			else{
				viewerEx = new Crystal.Viewer('crystalContainerEx',{envToolPicker:false,fullscreenButton:false,animation:false,
					timeline:false,sceneModePicker:false,homeButton:false,geocoder:false,imageryProviderViewModelsIndex:1});
			}
			document.body.onmouseover = switchTrigger;
			viewer.camera.moveEnd.addEventListener(switchFocus);
			viewerEx.camera.moveEnd.addEventListener(switchFocusEx);
			viewerEx.camera.flyTo({
				destination : Crystal.Cartesian3.fromRadians(viewer.camera.positionCartographic.longitude,viewer.camera.positionCartographic.latitude,viewer.camera.positionCartographic.height),
				orientation : {
					heading : viewer.camera.heading,
					pitch : viewer.camera.pitch,
					roll : viewer.camera.roll
				}
			});
			if(layer3DIndex != null){
				layer.close(layer3DIndex);
				layer3DIndex = null;
			}
		}
		else{
			viewer.camera.moveEnd.removeEventListener(switchFocus);
			viewerEx.camera.moveEnd.removeEventListener(switchFocusEx);
			document.body.onmouseover = null;
			document.getElementById('crystalContainer').style.cssText = 'width: 100%;position: absolute;left: 0%;';
			document.getElementById('crystalContainerEx').remove();
			viewerEx = null;
		}
	}, false);
	document.getElementById('envColumns').addEventListener('click', function () {
		if(document.getElementById("rollerSlider") == undefined){
			leftViewPort = viewer.imageryLayers.addImageryProvider(new Crystal.WebMapTileServiceImageryProvider({
				url: "http://t0.tianditu.gov.cn/vec_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=2ca23b42d039bb3facdcae2f61ab9c82",
				format: 'tiles',
				tileMatrixSetID: 'c',
				tilingScheme: new Crystal.GeographicTilingScheme(),
				tileMatrixLabels: ['1', '2', '3', '4','5', '6', '7', '8', '9', '10','11','12', '13', '14', '15', '16', '17', '18', '19'],
				layer: "tdtVecAnnoLayer",
				style: "default",
				show: false
			}));
			leftViewPortHint = viewer.imageryLayers.addImageryProvider(new Crystal.WebMapTileServiceImageryProvider({
				url: "http://t0.tianditu.gov.cn/cva_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=2ca23b42d039bb3facdcae2f61ab9c82",
				format: 'tiles',
				tileMatrixSetID: 'c',
				tilingScheme: new Crystal.GeographicTilingScheme(),
				tileMatrixLabels: ['1', '2', '3', '4','5', '6', '7', '8', '9', '10','11','12', '13', '14', '15', '16', '17', '18', '19'],
				layer: "tdtVecAnnoLayer",
				style: "default",
				show: false
			}));
			leftViewPort.splitDirection = Crystal.ImagerySplitDirection.LEFT;
			leftViewPortHint.splitDirection = Crystal.ImagerySplitDirection.LEFT;
			$('#' + crystalID).append('<div id="rollerSlider"></div>');
			var slider = document.getElementById("rollerSlider");
			viewer.scene.imagerySplitPosition = slider.offsetLeft / slider.parentElement.offsetWidth;
			leftViewPortHandler = new Crystal.ScreenSpaceEventHandler(slider);
			var moveActive = false;
			function move(movement) {
			  if (!moveActive) {
				return;
			  }
			  var relativeOffset = movement.endPosition.x;
			  var splitPosition =(slider.offsetLeft + relativeOffset) / slider.parentElement.offsetWidth;
			  slider.style.left = 100.0 * splitPosition + "%";
			  viewer.scene.imagerySplitPosition = splitPosition;
			}
			leftViewPortHandler.setInputAction(function () {
			  moveActive = true;
			}, Crystal.ScreenSpaceEventType.LEFT_DOWN);
			leftViewPortHandler.setInputAction(function () {
			  moveActive = true;
			}, Crystal.ScreenSpaceEventType.PINCH_START);

			leftViewPortHandler.setInputAction(move, Crystal.ScreenSpaceEventType.MOUSE_MOVE);
			leftViewPortHandler.setInputAction(move, Crystal.ScreenSpaceEventType.PINCH_MOVE);

			leftViewPortHandler.setInputAction(function () {
			  moveActive = false;
			}, Crystal.ScreenSpaceEventType.LEFT_UP);
			leftViewPortHandler.setInputAction(function () {
			  moveActive = false;
			}, Crystal.ScreenSpaceEventType.PINCH_END);
		}
		else{
			viewer.imageryLayers.remove(leftViewPortHint);
			viewer.imageryLayers.remove(leftViewPort);
			document.getElementById('rollerSlider').remove();
			leftViewPortHint = null;
			leftViewPort = null;
			leftViewPortHandler.destroy();
			leftViewPortHandler = null;
		}
	}, false);
	document.getElementById('envSendo').addEventListener('click', function () {
		var cmtoPx = 300;
		var cmtoPx2 = $("#" + crystalID).width() - 346;
		var data = [];
		data.push(cmtoPx + 'px');
		data.push(cmtoPx2+'px');
		flyingThroughIndex = layer.open({
			id: "flyingThrough3D",
			title: '<i class="fa fa-send-o"></i> 飞行漫游',
			type: 2,
			content: 'ToolBox/flying.html',
			shade: false,
			area: ['336px','468px'],
			offset: data,
			cancel: function(){
				flyingThroughIndex = null;
				DeleteFlyingPathInside();
			}
		});
	}, false);
	document.getElementById('envPrint').addEventListener('click', function () {
		printscreenScene();
	}, false);
	document.getElementById('envCamp').addEventListener('click', function () {
		var cmtoPx = 300;
		var cmtoPx2 = $("#" + crystalID).width() - 346;
		var data = [];
		data.push(cmtoPx + 'px');
		data.push(cmtoPx2+'px');
		campIndex = layer.open({
			id: "camp3D",
			title: '<i class="fa fa-free-code-camp"></i> 粒子效果',
			type: 2,
			content: 'ToolBox/camp.html',
			shade: false,
			area: ['336px','468px'],
			offset: data,
			cancel: function(){
				campIndex = null;
				clearParticle();
			}
		});
	}, false);
	document.getElementById('envShare').addEventListener('click', function () {
		if(document.getElementById("mainPart23D") == undefined){
		$('#' + crystalID).before('<iframe id="mainPart23D" width="100%" height="100%" src="ToolBox/print.html" style="display:none;border-width:0px;"></iframe>');
			let pImage = new Image();
			viewer.render();
			pImage = viewer.scene.canvas.toDataURL("image/png");
			setTimeout(function(){$("#mainPart23D").contents().find("#printMap").attr("src",pImage);},300);
			setTimeout(function(){document.getElementById("mainPart23D").contentWindow.print();},500);
		}
		else{
			let pImage = new Image();
			viewer.render();
			pImage = viewer.scene.canvas.toDataURL("image/png");
			$("#mainPart23D").contents().find("#printMap").attr("src",pImage);
			setTimeout(function(){document.getElementById("mainPart23D").contentWindow.print();},300);
		}
	}, false);
	document.getElementById('envProgram').addEventListener('click', function () {
		var cmtoPx = 300;
		var cmtoPx2 = $("#" + crystalID).width() - 346;
		var data = [];
		data.push(cmtoPx + 'px');
		data.push(cmtoPx2+'px');
		programIndex = layer.open({
			id: "program3D",
			title: '<i class="fa fa-location-arrow"></i> 路径规划',
			type: 2,
			content: 'ToolBox/route.html',
			shade: false,
			area: ['336px','468px'],
			offset: data,
			cancel: function(){
				programIndex = null;
				clearRoute();
			}
		});
	}, false);
	document.getElementById('envView').addEventListener('click', function () {
		if(document.getElementById('crystalPanorama') == undefined){
			if(document.getElementById('crystalContainerEx') != undefined){
				viewer.camera.moveEnd.removeEventListener(switchFocus);
				viewerEx.camera.moveEnd.removeEventListener(switchFocusEx);
				document.body.onmouseover = null;
				document.getElementById('crystalContainer').style.cssText = 'width: 100%;position: absolute;left: 0%;';
				document.getElementById('crystalContainerEx').remove();
				viewerEx = null;
			}
			$('#' + crystalID).before('<div id="crystalPanorama"></div>');
			document.getElementById(crystalID).style.cssText = 'width: 50%;position: absolute;left: 50%;display: inline-block;';
			document.getElementById('crystalPanorama').style.cssText = 'width: 50%;height: 100%;display: inline-block;';
			crystalPanorama = new BMap.Panorama('crystalPanorama');
			crystalPanorama.setPov({heading: -40, pitch: 6});
			let coord = wgs84tobd09(panoramaLng, panoramaLat);
			crystalPanorama.setPosition(new BMap.Point(coord[0], coord[1]));
			viewer.scene.camera.setView({
				destination: new Crystal.Cartesian3.fromDegrees(panoramaLng, panoramaLat, 500),
				orientation: {
					heading: Crystal.Math.toRadians(0.0),
					pitch: Crystal.Math.toRadians(-90.0),
					roll: viewer.camera.roll
				}
			});
			mEntities.push(viewer.entities.add({
				name: '街景拖曳',
				position: Crystal.Cartesian3.fromDegrees(panoramaLng, panoramaLat, panoramaAtl), 
				billboard: {
					image: 'Image/location.png',
					verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
					width: 32,
					height: 32
				}
			}));
			if(layer3DIndex != null){
				layer.close(layer3DIndex);
				layer3DIndex = null;
			}
			crystalPanorama.addEventListener('position_changed', function(e){
				crystalPanoramaCallBack(e);
			});
			crystalPanorama.addEventListener('pov_changed', function(e){
				crystalPanoramaCallBack(e);
			});
			PanoramaEventDrag();
		}
		else{
			document.getElementById(crystalID).style.cssText = 'width: 100%;position: absolute;left: 0%;';
			document.getElementById('crystalPanorama').remove();
			for (var i = 0;i < mEntities.length;i++)
			{
				viewer.entities.remove(mEntities[i]);
			}
			mEntities = [];
			panoramaLng = 113.3417701633946;
			panoramaLat = 23.146842269703498;
			panoramaAtl = 17.0806190541792;
			panoramaEventHandler.destroy();
			viewer.crystalWidget.screenSpaceEventHandler.setInputAction(leftClickFunction, Crystal.ScreenSpaceEventType.LEFT_CLICK);
			openLayer3D();
		}
	}, false);
	function crystalPanoramaCallBack(e){
		if (e.type == 'onpov_changed') { 
			viewer.scene.camera.setView({
				destination: new Crystal.Cartesian3.fromDegrees(panoramaLng, panoramaLat, 500),
				orientation: {
					heading: Crystal.Math.toRadians(crystalPanorama.getPov().heading),
					pitch: Crystal.Math.toRadians(-90.0),
					roll: viewer.camera.roll
				}
			});
		}
		else if (e.type == 'onposition_changed') {
			let coord = bd09towgs84(crystalPanorama.getPosition().lng, crystalPanorama.getPosition().lat);
			panoramaLng = coord[0];
			panoramaLat = coord[1];
			viewer.scene.camera.setView({
				destination: new Crystal.Cartesian3.fromDegrees(panoramaLng, panoramaLat, 500),
				orientation: {
					heading: Crystal.Math.toRadians(crystalPanorama.getPov().heading),
					pitch: Crystal.Math.toRadians(-90.0),
					roll: viewer.camera.roll
				}
			});
			viewer.entities.remove(mEntities[mEntities.length-1]);
			mEntities.pop();
			mEntities.push(viewer.entities.add({
				name: '街景拖曳',
				position: Crystal.Cartesian3.fromDegrees(panoramaLng, panoramaLat, panoramaAtl), 
				billboard: {
					image: 'Image/location.png',
					verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
					width: 32,
					height: 32
				}
			}));
		}
	}
	function PanoramaEventDrag(){
		leftClickFunction = viewer.crystalWidget.screenSpaceEventHandler.getInputAction(Crystal.ScreenSpaceEventType.LEFT_CLICK);
		viewer.crystalWidget.screenSpaceEventHandler.removeInputAction(Crystal.ScreenSpaceEventType.LEFT_CLICK);
		panoramaEventHandler = new Crystal.ScreenSpaceEventHandler(viewer.scene.canvas);
		var is_Click = false;
		var postionArr = [];
		panoramaEventHandler.setInputAction(function (movement) {
			var pick = viewer.scene.pick(movement.position);
			if(pick){
				if(pick.id==undefined||pick.id._name==undefined||pick.id._name===''){
					return;
				}
				if(pick.id._name==='街景拖曳'){
					is_Click = !is_Click;
					if(!is_Click){
						let ray = viewer.camera.getPickRay(movement.position);
						let cartesian = viewer.scene.globe.pick(ray, viewer.scene);
						let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
						panoramaLng = Crystal.Math.toDegrees(cartographic.longitude);
						panoramaLat = Crystal.Math.toDegrees(cartographic.latitude);
						let coord = wgs84tobd09(panoramaLng, panoramaLat);
						crystalPanorama.setPosition(new BMap.Point(coord[0], coord[1]));
						viewer.scene.camera.setView({
							destination: new Crystal.Cartesian3.fromDegrees(panoramaLng, panoramaLat, 500),
							orientation: {
								heading: Crystal.Math.toRadians(0.0),
								pitch: Crystal.Math.toRadians(-90.0),
								roll: viewer.camera.roll
							}
						});
					}
				}
			}
		}, Crystal.ScreenSpaceEventType.LEFT_CLICK);
		panoramaEventHandler.setInputAction(function (movement) {
			if(is_Click){
				var ray = viewer.camera.getPickRay(movement.endPosition);
				var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
				if(mEntities.length > 0){
					viewer.entities.remove(mEntities[mEntities.length - 1]);
					mEntities.pop();
				}
				mEntities.push(viewer.entities.add({
					name: '街景拖曳',
					position: cartesian, 
					billboard: {
						image: 'Image/location.png',
						verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
						width: 32,
						height: 32
					}
				}));
			}
		}, Crystal.ScreenSpaceEventType.MOUSE_MOVE);
	}
	document.getElementById('envCog').addEventListener('click', function () {
		if(configurationIndex==null){
		    var cmtoPx = $("#" + crystalID).height()/2 - 150;
		    var cmtoPx2 = $("#" + crystalID).width()/2 - 225;
		    var data = [];
		    data.push(cmtoPx + 'px');
		    data.push(cmtoPx2+'px');
		    configurationIndex = layer.open({
					id: "configurationIndex3D",
					title: '<i class="fa fa-cog"></i> 参数配置',
					type: 2,
					content: 'ToolBox/configuration.html',
					shade: false,
					area: ['450px','300px'],
					offset: data,
					cancel: function(){
						configurationIndex = null;
					}
				});
			}
	}, false);
	document.getElementById('envSpatial').addEventListener('click', function () {
		var cmtoPx = 300;
		var cmtoPx2 = $("#" + crystalID).width() - 346;
		var data = [];
		data.push(cmtoPx + 'px');
		data.push(cmtoPx2+'px');
		analysisIndex = layer.open({
			id: "analysis3D",
			title: '<i class="fa fa-area-chart"></i> 空间分析',
			type: 2,
			content: 'ToolBox/analysis.html',
			shade: false,
			area: ['336px','468px'],
			offset: data,
			cancel: function(){
				analysisIndex = null;
				for(var i = 0;i<shedEntities.length;i++){
					shedEntities[i].clear();				
				}
				shedEntities = [];
				for (var i = 0;i < mEntities.length;i++)
				{
					viewer.entities.remove(mEntities[i]);
				}
				mEntities = [];
				for (var i = 0;i < nEntities.length;i++)
				{
					viewer.entities.remove(nEntities[i]);
				}
				nEntities = [];
				if(terrainClipPlan!=null){
					terrainClipPlan.clear();
				}
			}
		});
	}, false);
	var P = {version: "1.0.0"}
	P.PlotUtils = {}, P.PlotUtils.distance = function(t, o) {
		return Math.sqrt(Math.pow(t[0] - o[0], 2) + Math.pow(t[1] - o[1], 2))
	}, P.PlotUtils.wholeDistance = function(t) {
		for (var o = 0, e = 0; e < t.length - 1; e++) o += P.PlotUtils.distance(t[e], t[e + 1]);
		return o
	}, P.PlotUtils.getBaseLength = function(t) {
		return Math.pow(P.PlotUtils.wholeDistance(t), .99)
	}, P.PlotUtils.mid = function(t, o) {
		return [(t[0] + o[0]) / 2, (t[1] + o[1]) / 2]
	}, P.PlotUtils.getCircleCenterOfThreePoints = function(t, o, e) {
		var r = [(t[0] + o[0]) / 2, (t[1] + o[1]) / 2],
			n = [r[0] - t[1] + o[1], r[1] + t[0] - o[0]],
			g = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2],
			i = [g[0] - t[1] + e[1], g[1] + t[0] - e[0]];
		return P.PlotUtils.getIntersectPoint(r, n, g, i)
	}, P.PlotUtils.getIntersectPoint = function(t, o, e, r) {
		if (t[1] == o[1]) {
			var n = (r[0] - e[0]) / (r[1] - e[1]),
				g = n * (t[1] - e[1]) + e[0],
				i = t[1];
			return [g, i]
		}
		if (e[1] == r[1]) {
			var s = (o[0] - t[0]) / (o[1] - t[1]);
			return g = s * (e[1] - t[1]) + t[0], i = e[1], [g, i]
		}
		return s = (o[0] - t[0]) / (o[1] - t[1]), n = (r[0] - e[0]) / (r[1] - e[1]), i = (s * t[1] - t[0] - n * e[1] + e[0]) / (s - n), g = s * i - s * t[1] + t[0], [g, i]
	}, P.PlotUtils.getAzimuth = function(t, o) {
		var e, r = Math.asin(Math.abs(o[1] - t[1]) / P.PlotUtils.distance(t, o));
		return o[1] >= t[1] && o[0] >= t[0] ? e = r + Math.PI : o[1] >= t[1] && o[0] < t[0] ? e = P.Constants.TWO_PI - r : o[1] < t[1] && o[0] < t[0] ? e = r : o[1] < t[1] && o[0] >= t[0] && (e = Math.PI - r), e
	}, P.PlotUtils.getAngleOfThreePoints = function(t, o, e) {
		var r = P.PlotUtils.getAzimuth(o, t) - P.PlotUtils.getAzimuth(o, e);
		return 0 > r ? r + P.Constants.TWO_PI : r
	}, P.PlotUtils.isClockWise = function(t, o, e) {
		return (e[1] - t[1]) * (o[0] - t[0]) > (o[1] - t[1]) * (e[0] - t[0])
	}, P.PlotUtils.getPointOnLine = function(t, o, e) {
		var r = o[0] + t * (e[0] - o[0]),
			n = o[1] + t * (e[1] - o[1]);
		return [r, n]
	}, P.PlotUtils.getCubicValue = function(t, o, e, r, n) {
		t = Math.max(Math.min(t, 1), 0);
		var g = 1 - t,
			i = t * t,
			s = i * t,
			a = g * g,
			l = a * g,
			u = l * o[0] + 3 * a * t * e[0] + 3 * g * i * r[0] + s * n[0],
			c = l * o[1] + 3 * a * t * e[1] + 3 * g * i * r[1] + s * n[1];
		return [u, c]
	}, P.PlotUtils.getThirdPoint = function(t, o, e, r, n) {
		var g = P.PlotUtils.getAzimuth(t, o),
			i = n ? g + e : g - e,
			s = r * Math.cos(i),
			a = r * Math.sin(i);
		return [o[0] + s, o[1] + a]
	}, P.PlotUtils.getArcPoints = function(t, o, e, r) {
		var n, g, i = [],
			s = r - e;
		s = 0 > s ? s + P.Constants.TWO_PI : s;
		for (var a = 0; a <= P.Constants.FITTING_COUNT; a++) {
			var l = e + s * a / P.Constants.FITTING_COUNT;
			n = t[0] + o * Math.cos(l), g = t[1] + o * Math.sin(l), i.push([n, g])
		}
		return i
	}, P.PlotUtils.getBisectorNormals = function(t, o, e, r) {
		var n = P.PlotUtils.getNormal(o, e, r),
			g = Math.sqrt(n[0] * n[0] + n[1] * n[1]),
			i = n[0] / g,
			s = n[1] / g,
			a = P.PlotUtils.distance(o, e),
			l = P.PlotUtils.distance(e, r);
		if (g > P.Constants.ZERO_TOLERANCE) if (P.PlotUtils.isClockWise(o, e, r)) {
			var u = t * a,
				c = e[0] - u * s,
				p = e[1] + u * i,
				h = [c, p];
			u = t * l, c = e[0] + u * s, p = e[1] - u * i;
			var d = [c, p]
		} else u = t * a, c = e[0] + u * s, p = e[1] - u * i, h = [c, p], u = t * l, c = e[0] - u * s, p = e[1] + u * i, d = [c, p];
		else c = e[0] + t * (o[0] - e[0]), p = e[1] + t * (o[1] - e[1]), h = [c, p], c = e[0] + t * (r[0] - e[0]), p = e[1] + t * (r[1] - e[1]), d = [c, p];
		return [h, d]
	}, P.PlotUtils.getNormal = function(t, o, e) {
		var r = t[0] - o[0],
			n = t[1] - o[1],
			g = Math.sqrt(r * r + n * n);
		r /= g, n /= g;
		var i = e[0] - o[0],
			s = e[1] - o[1],
			a = Math.sqrt(i * i + s * s);
		i /= a, s /= a;
		var l = r + i,
			u = n + s;
		return [l, u]
	}, P.PlotUtils.getCurvePoints = function(t, o) {
		for (var e = P.PlotUtils.getLeftMostControlPoint(o), r = [e], n = 0; n < o.length - 2; n++) {
			var g = o[n],
				i = o[n + 1],
				s = o[n + 2],
				a = P.PlotUtils.getBisectorNormals(t, g, i, s);
			r = r.concat(a)
		}
		var l = P.PlotUtils.getRightMostControlPoint(o);
		r.push(l);
		var u = [];
		for (n = 0; n < o.length - 1; n++) {
			g = o[n], i = o[n + 1], u.push(g);
			for (var t = 0; t < P.Constants.FITTING_COUNT; t++) {
				var c = P.PlotUtils.getCubicValue(t / P.Constants.FITTING_COUNT, g, r[2 * n], r[2 * n + 1], i);
				u.push(c)
			}
			u.push(i)
		}
		return u
	}, P.PlotUtils.getLeftMostControlPoint = function(o) {
		var e = o[0],
			r = o[1],
			n = o[2],
			g = P.PlotUtils.getBisectorNormals(0, e, r, n),
			i = g[0],
			s = P.PlotUtils.getNormal(e, r, n),
			a = Math.sqrt(s[0] * s[0] + s[1] * s[1]);
		if (a > P.Constants.ZERO_TOLERANCE) var l = P.PlotUtils.mid(e, r),
			u = e[0] - l[0],
			c = e[1] - l[1],
			p = P.PlotUtils.distance(e, r),
			h = 2 / p,
			d = -h * c,
			f = h * u,
			E = d * d - f * f,
			v = 2 * d * f,
			A = f * f - d * d,
			_ = i[0] - l[0],
			y = i[1] - l[1],
			m = l[0] + E * _ + v * y,
			O = l[1] + v * _ + A * y;
		else m = e[0] + t * (r[0] - e[0]), O = e[1] + t * (r[1] - e[1]);
		return [m, O]
	}, P.PlotUtils.getRightMostControlPoint = function(o) {
		var e = o.length,
			r = o[e - 3],
			n = o[e - 2],
			g = o[e - 1],
			i = P.PlotUtils.getBisectorNormals(0, r, n, g),
			s = i[1],
			a = P.PlotUtils.getNormal(r, n, g),
			l = Math.sqrt(a[0] * a[0] + a[1] * a[1]);
		if (l > P.Constants.ZERO_TOLERANCE) var u = P.PlotUtils.mid(n, g),
			c = g[0] - u[0],
			p = g[1] - u[1],
			h = P.PlotUtils.distance(n, g),
			d = 2 / h,
			f = -d * p,
			E = d * c,
			v = f * f - E * E,
			A = 2 * f * E,
			_ = E * E - f * f,
			y = s[0] - u[0],
			m = s[1] - u[1],
			O = u[0] + v * y + A * m,
			T = u[1] + A * y + _ * m;
		else O = g[0] + t * (n[0] - g[0]), T = g[1] + t * (n[1] - g[1]);
		return [O, T]
	}, P.PlotUtils.getBezierPoints = function(t) {
		if (t.length <= 2) return t;
		for (var o = [], e = t.length - 1, r = 0; 1 >= r; r += .01) {
			for (var n = y = 0, g = 0; e >= g; g++) {
				var i = P.PlotUtils.getBinomialFactor(e, g),
					s = Math.pow(r, g),
					a = Math.pow(1 - r, e - g);
				n += i * s * a * t[g][0], y += i * s * a * t[g][1]
			}
			o.push([n, y])
		}
		return o.push(t[e]), o
	}, P.PlotUtils.getBinomialFactor = function(t, o) {
		return P.PlotUtils.getFactorial(t) / (P.PlotUtils.getFactorial(o) * P.PlotUtils.getFactorial(t - o))
	}, P.PlotUtils.getFactorial = function(t) {
		if (1 >= t) return 1;
		if (2 == t) return 2;
		if (3 == t) return 6;
		if (4 == t) return 24;
		if (5 == t) return 120;
		for (var o = 1, e = 1; t >= e; e++) o *= e;
		return o
	}, P.PlotUtils.getQBSplinePoints = function(t) {
		if (t.length <= 2) return t;
		var o = 2,
			e = [],
			r = t.length - o - 1;
		e.push(t[0]);
		for (var n = 0; r >= n; n++) for (var g = 0; 1 >= g; g += .05) {
			for (var i = y = 0, s = 0; o >= s; s++) {
				var a = P.PlotUtils.getQuadricBSplineFactor(s, g);
				i += a * t[n + s][0], y += a * t[n + s][1]
			}
			e.push([i, y])
		}
		return e.push(t[t.length - 1]), e
	}, P.PlotUtils.getQuadricBSplineFactor = function(t, o) {
		return 0 == t ? Math.pow(o - 1, 2) / 2 : 1 == t ? (-2 * Math.pow(o, 2) + 2 * o + 1) / 2 : 2 == t ? Math.pow(o, 2) / 2 : 0
	},P.Constants = {
		TWO_PI: 2 * Math.PI,
		HALF_PI: Math.PI / 2,
		FITTING_COUNT: 100,
		ZERO_TOLERANCE: 1e-4
	}
	this.measureClear = function(pFlag){
		if(pFlag == 1){
			for (var i = 0;i < mPlotEntities.length;i++)
			{
				viewer.entities.remove(mPlotEntities[i]);
			}
			mPlotEntities = [];
		}
		else if(pFlag == 2){
			for(var i = 0;i<shedEntities.length;i++){
				shedEntities[i].clear();				
			}
			shedEntities = [];
		}
		else{
			for (var i = 0;i < mEntities.length;i++)
			{
				viewer.entities.remove(mEntities[i]);
			}
			mEntities = [];
		}
	}
	this.closeSpatialQuery = function(){
		for (var i = 0;i < mEntities.length;i++){
			viewer.entities.remove(mEntities[i]);
		}
		mEntities = [];
		for (var i = 0;i < nEntities.length;i++){
			viewer.entities.remove(nEntities[i]);
		}
		nEntities = [];
		for (var i = 0;i < mGroundPrimitives.length;i++){
			viewer.scene.groundPrimitives.remove(mGroundPrimitives[i]);
		}
		mGroundPrimitives = [];
	}
	this.measureDel = function(){
		if(mPlotEntities.length > 0){
			viewer.entities.remove(mPlotEntities[mPlotEntities.length - 1]);
		}
		mPlotEntities.pop();
	}
	this.measureChangeStyle = function(value){
		if(mSelectPlot != null){
			if(mSelectPlot._polygon != undefined){
				mSelectPlot._polygon.material = Crystal.Color.fromCssColorString(value.fillColor).withAlpha(value.fillTransparency);
				mSelectPlot._polygon.outline = value.isBorder;
				mSelectPlot._polygon.outlineColor = Crystal.Color.fromCssColorString(value.borderColor).withAlpha(value.fillTransparency);
				mSelectPlot._polygon.outline = value.borderWidth;
			}
			else if(mSelectPlot._rectangle != undefined){
				mSelectPlot._rectangle.material = Crystal.Color.fromCssColorString(value.fillColor).withAlpha(value.fillTransparency);
				mSelectPlot._rectangle.outline = value.isBorder;
				mSelectPlot._rectangle.outlineColor = Crystal.Color.fromCssColorString(value.borderColor).withAlpha(value.fillTransparency);
				mSelectPlot._rectangle.outline = value.borderWidth;
			}
			else if(mSelectPlot._ellipse != undefined){
				mSelectPlot._ellipse.material = Crystal.Color.fromCssColorString(value.fillColor).withAlpha(value.fillTransparency);
				mSelectPlot._ellipse.outline = value.isBorder;
				mSelectPlot._ellipse.outlineColor = Crystal.Color.fromCssColorString(value.borderColor).withAlpha(value.fillTransparency);
				mSelectPlot._ellipse.outline = value.borderWidth;
			}
			mSelectPlot = null;
		}
	}
	this.measureInit = function(pParam, callBack){
		var fun = viewer.crystalWidget.screenSpaceEventHandler.getInputAction(Crystal.ScreenSpaceEventType.LEFT_CLICK);
		viewer.crystalWidget.screenSpaceEventHandler.removeInputAction(Crystal.ScreenSpaceEventType.LEFT_CLICK);
		viewer.crystalWidget.screenSpaceEventHandler.removeInputAction(Crystal.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
		var handlerMeasure = new Crystal.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
		var mPositions = [];
		var tPositions = [];
		var lPositions = [];
		var cartesian = null;
		var ray = null;
		var mDistance = 0;
		var mAngle = 0;
		var mUnit = pParam.Unit == 'auto' ? true : false;
		var lengthUnit = {"auto":"自动","m":"米","km":"公里","mile":"海里","zhang":"丈"};
		var areaUnit = {"auto":"自动","m":"平方米","km":"平方公里","mu":"亩","ha":"公顷"};
		var plotJson = {};
		plotJson.fillColor = "#ff0000";
		plotJson.fillTransparency = 0.8;
		plotJson.borderColor = "#000000";
		plotJson.borderTransparency = 0.8;
		plotJson.borderWidth = 3;
		plotJson.isBorder = true;
		var pStyle3D = document.getElementById("plottingStyle3D");
		if(pStyle3D != null){
			plotJson = pStyle3D.firstElementChild.contentWindow.GetParam();
		}
		var bookJson = {};
		bookJson.styleValue = "0";
		bookJson.styleLength = "10";
		var vText = '';
		var poly = null;
		var parent_entity = null;
		var mTemp = null;
		viewer.scene.globe.depthTestAgainstTerrain = true;
		handlerMeasure.setInputAction(function (movement) {
			movement.position.x = movement.position.x - 1433; //这里是前端把地图做了偏移，需要把屏幕坐标做相应的偏移，才是对的。
			cartesian = viewer.scene.pickPosition(movement.position);
			if(cartesian != undefined){
				if(pParam.Flag == 0){
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
					}
					mPositions.push(cartesian);
					var textDisance = mDistance + lengthUnit[pParam.Unit];
					if(mPositions.length == 2){
						mEntities.push(viewer.entities.add({
							name: '',
							position: mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							}
						}));
					}
					else{
						mEntities.push(viewer.entities.add({
							name: '',
							position: mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							},
							label: {
								text: textDisance,
								font: '18px sans-serif',
								style: Crystal.LabelStyle.FILL,
								outlineWidth: 1,
								fillColor: Crystal.Color.WHITE,
								verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
								pixelOffset: new Crystal.Cartesian2(20, -20),
								heightReference: Crystal.HeightReference.NONE,
								showBackground: true,
								backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
							}
						}));
					}
				}
				else if(pParam.Flag == 1){
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
					}
					mPositions.push(cartesian);
					var textDisance = mDistance + lengthUnit[pParam.Unit];
					if(mPositions.length == 2){
						mEntities.push(viewer.entities.add({
							name: '',
							position: mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							}
						}));
					}
					else{
						mEntities.push(viewer.entities.add({
							name: '',
							position: mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							},
							label: {
								text: textDisance,
								font: '18px sans-serif',
								style: Crystal.LabelStyle.FILL,
								outlineWidth: 1,
								fillColor: Crystal.Color.WHITE,
								verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
								pixelOffset: new Crystal.Cartesian2(20, -20),
								heightReference: Crystal.HeightReference.NONE,
								showBackground: true,
								backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
							}
						}));
					}
				}
				else if(pParam.Flag == 2){
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
						mPositions.push(cartesian);
						parent_entity = viewer.entities.add({
							name: '',
							polyline: {
								show: false,
								positions: mPositions,
								material: new Crystal.PolylineGlowMaterialProperty({
									glowPower: 0.1,
									color: Crystal.Color.YELLOW
								}),
								width: 10
							}
						});
						mEntities.push(parent_entity);
					}
					var textDisance = mDistance + lengthUnit[pParam.Unit];
					if(mDistance == 0){
						mEntities.push(viewer.entities.add({
							name: '',
							position: mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference:Crystal.HeightReference.NONE
							}
						}));
					}
					else{
						let point1cartographic = Crystal.Cartographic.fromCartesian(mPositions[0]);
						let point2cartographic = Crystal.Cartographic.fromCartesian(mPositions[1]);
						viewer.entities.remove(mEntities[mEntities.length - 1]);
						mEntities.push(viewer.entities.add({
							name: '',
							position: Crystal.Cartesian3.fromRadians(point1cartographic.longitude, point1cartographic.latitude, point2cartographic.height),
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference:Crystal.HeightReference.NONE
							},
							label: {
								text: textDisance,
								font: '18px sans-serif',                
								style: Crystal.LabelStyle.FILL,
								outlineWidth: 1,
								fillColor: Crystal.Color.WHITE,
								verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
								pixelOffset: new Crystal.Cartesian2(0, -20),
								heightReference: Crystal.HeightReference.NONE,
								showBackground: true,
								backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
							}
						}));
						handlerMeasure.destroy();
						viewer.scene.globe.depthTestAgainstTerrain = false;
						viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
					}
				}
				else if(pParam.Flag == 3){
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
						mPositions.push(cartesian);
						parent_entity = viewer.entities.add({
							name: '',
							polyline: {
								show: false,
								positions: mPositions,
								material: new Crystal.PolylineGlowMaterialProperty({
									glowPower: 0.1,
									color: Crystal.Color.YELLOW
								}),
								width: 10
							}
						});
						mEntities.push(parent_entity);
						mEntities.push(viewer.entities.add({
							name: '',
							position: mPositions[0],
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							}
						}));
					}
					else{
						handlerMeasure.destroy();
						viewer.scene.globe.depthTestAgainstTerrain = false;
						viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
						viewer.entities.remove(mEntities[mEntities.length - 1]);
						mEntities.push(viewer.entities.add({
							name: '',
							position: mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							}
						}));
						let point1cartographic = Crystal.Cartographic.fromCartesian(mPositions[0]);
						let point2cartographic = Crystal.Cartographic.fromCartesian(mPositions[1]);
						let point_temp = Crystal.Cartesian3.fromRadians(point1cartographic.longitude, point1cartographic.latitude, point2cartographic.height);
						let tempPositions1 = [];
						tempPositions1.push(mPositions[0].clone());
						tempPositions1.push(point_temp.clone());
						let tempPositions2 = [];
						tempPositions2.push(point_temp.clone());
						tempPositions2.push(mPositions[1].clone());
						let midpointV = new Crystal.Cartesian3();
						Crystal.Cartesian3.midpoint(tempPositions1[0], tempPositions1[tempPositions1.length - 1], midpointV);
						let midpointH = new Crystal.Cartesian3();
						Crystal.Cartesian3.midpoint(tempPositions2[0], tempPositions2[tempPositions2.length - 1], midpointH);
						mEntities.push(viewer.entities.add({
							name: '',
							position: midpointV,
							label: {
								text: vText,
								font: '18px sans-serif',
								style: Crystal.LabelStyle.FILL,
								outlineWidth: 1,
								fillColor: Crystal.Color.WHITE,
								verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
								pixelOffset: new Crystal.Cartesian2(0, 9),
								heightReference: Crystal.HeightReference.NONE,
								showBackground: true,
								backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
							}
						}));
						let dis = getSpaceDistance(mPositions);
						let tS = Math.sqrt(Math.pow(dis, 2) - Math.pow(mDistance, 2)).toFixed(2);
						lengthUnitConversion(dis);
						let vLength = mDistance + lengthUnit[pParam.Unit];
						let midpoint = new Crystal.Cartesian3();
						Crystal.Cartesian3.midpoint(mPositions[0], mPositions[mPositions.length - 1], midpoint);
						mEntities.push(viewer.entities.add({
							name: '',
							position: midpoint,
							label: {
								text: vLength,
								font: '18px sans-serif',
								style: Crystal.LabelStyle.FILL,
								outlineWidth: 1,
								fillColor: Crystal.Color.WHITE,
								verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
								pixelOffset: new Crystal.Cartesian2(0, 5),
								heightReference: Crystal.HeightReference.NONE,
								showBackground: true,
								backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
							}
						}));
						lengthUnitConversion(tS);
						let vLine = mDistance + lengthUnit[pParam.Unit];
						mEntities.push(viewer.entities.add({
							name: '',
							position: point_temp,
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							}
						}));
						mEntities.push(viewer.entities.add({
							name: '',
							position: midpointH,
							label: {
								text: vLine,
								font: '18px sans-serif',
								style: Crystal.LabelStyle.FILL,
								outlineWidth: 1,
								fillColor: Crystal.Color.WHITE,
								verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
								pixelOffset: new Crystal.Cartesian2(0, -20),
								heightReference: Crystal.HeightReference.NONE,
								showBackground: true,
								backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
							}
						}));
					}
				}
				else if(pParam.Flag == 4){
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
					}
					mPositions.push(cartesian);
					let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
					tPositions.push(cartographic.clone());
					tPositions.push(cartographic);
					mEntities.push(viewer.entities.add({
						name: '',
						position: mPositions[mPositions.length - 1],
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference: Crystal.HeightReference.NONE
						}
					}));
					if (mPositions.length == 3) {
						if(mDistance != 0){
							handlerMeasure.destroy();
							viewer.scene.globe.depthTestAgainstTerrain = false;
							viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
						}
					}
				}
				else if(pParam.Flag == 5 || pParam.Flag == 103){
					let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
						tPositions.push(cartographic.clone());
						nEntities.push(viewer.entities.add({
							name: '',
							position:mPositions[mPositions.length - 1],
							label: {
								text: vText,
								font: '18px sans-serif',
								style: Crystal.LabelStyle.FILL,
								outlineWidth: 1,
								fillColor: Crystal.Color.WHITE,
								verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
								pixelOffset: new Crystal.Cartesian2(20, -20),
								showBackground: true,
								backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
							}
						}));
					}
					mPositions.push(cartesian);
					tPositions.push(cartographic);
					mEntities.push(viewer.entities.add({
						name: '',
						position: mPositions[mPositions.length - 1],
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference: Crystal.HeightReference.NONE
						}
					}));
				}
				else if(pParam.Flag == 6){
					let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
						tPositions.push(cartographic.clone());
					}
					mPositions.push(cartesian);
					tPositions.push(cartographic);
					var textDisance = mDistance + lengthUnit[pParam.Unit];
					if(mPositions.length == 2){
						mEntities.push(viewer.entities.add({
							name: '',
							position: mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							}
						}));
					}
					else{
						mEntities.push(viewer.entities.add({
							name: '',
							position: mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							},
							label: {
								text: textDisance,
								font: '18px sans-serif',
								style: Crystal.LabelStyle.FILL,
								outlineWidth: 1,
								fillColor: Crystal.Color.WHITE,
								verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
								pixelOffset: new Crystal.Cartesian2(20, -20),
								heightReference: Crystal.HeightReference.NONE,
								showBackground: true,
								backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
							}
						}));
					}
					if(mPositions.length == 3){
						handlerMeasure.destroy();
						viewer.scene.globe.depthTestAgainstTerrain = false;
						viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
						let length = 200;
						let disTeam = mDistance/length;
						let terrainSamplePositions = [];
						let jsonStr = "";
						for (let i = 0; i < length; ++i) {
							let lon = Crystal.Math.lerp(tPositions[0].longitude, tPositions[1].longitude, i / (length - 1));
							let lat = Crystal.Math.lerp(tPositions[0].latitude, tPositions[1].latitude, i / (length - 1));
							let position = Crystal.Cartographic.fromRadians(lon, lat);
							terrainSamplePositions.push(position);
							let temp = (disTeam*(i + 1)).toFixed(3);
							jsonStr += temp + ",";
						}
						jsonStr = jsonStr.substring(0,jsonStr.length - 1);
						jsonStr += "-";
						Crystal.when(Crystal.sampleTerrainMostDetailed(viewer.terrainProvider, terrainSamplePositions), function(samples) {
							let offset = 10.0;
							for (let i = 0; i< samples.length; ++i) {
								samples[i].height += offset;
								jsonStr += samples[i].height.toFixed(3) + ",";
							}
							jsonStr = jsonStr.substring(0, jsonStr.length - 1);
							openSectionAnalysis(jsonStr);
						});
					}
				}
				else if(pParam.Flag == 7){
					let pBookmark3D = document.getElementById("bookmarkParam3D");
					if(pBookmark3D != null){
						bookJson = pBookmark3D.firstElementChild.contentWindow.getParam();
					}
					if(bookJson.styleValue == '0'){
						handlerMeasure.destroy();
						viewer.scene.globe.depthTestAgainstTerrain = false;
					    viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
						nEntities.push(viewer.entities.add({
							name: '',
							position: cartesian, 
							billboard: {
								image: 'Image/location.png',
								verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
								width: 32,
								height: 32
							}
						}));
						var returnObj = {};
						returnObj.id = nEntities[nEntities.length - 2]._id;
						returnObj.x = Crystal.Math.toDegrees(viewer.camera.positionCartographic.longitude);
						returnObj.y = Crystal.Math.toDegrees(viewer.camera.positionCartographic.latitude);
						returnObj.z = viewer.camera.positionCartographic.height;
						returnObj.heading = viewer.camera.heading;
						returnObj.pitch = viewer.camera.pitch;
						returnObj.roll = viewer.camera.roll;
						callBack(returnObj);
					}
					else{
						if (mPositions.length == 0) {
							mPositions.push(cartesian.clone());
						}
						mPositions.push(cartesian);
						mTempPlotEntities.push(viewer.entities.add({
							name: '',
							position: mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							}
						}));
					}
				}
				else if(pParam.Flag == 8){
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
					}
					mPositions.push(cartesian);
					let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
					let pFlying3D = document.getElementById("flyingThroughParam3D");
					let pHeight = 0;
					if(pFlying3D != null){
						pHeight = pFlying3D.firstElementChild.contentWindow.getHeight();
						let pCoord = {};
						pCoord.x = Crystal.Math.toDegrees(cartographic.longitude);
						pCoord.y = Crystal.Math.toDegrees(cartographic.latitude);
						pCoord.z = cartographic.height + parseFloat(pHeight);
						tPositions.push(pCoord);
						let pStr = {};
						pStr.longitude = Crystal.Math.toDegrees(cartographic.longitude).toFixed(6);
						pStr.latitude = Crystal.Math.toDegrees(cartographic.latitude).toFixed(6);
						pStr.number = tPositions.length;
						pFlying3D.firstElementChild.contentWindow.setParam(pStr);
					}
					var textDisance = mDistance + lengthUnit[pParam.Unit];
					if(mPositions.length == 2){
						mEntities.push(viewer.entities.add({
							name: '',
							position: mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							}
						}));
					}
					else{
						mEntities.push(viewer.entities.add({
							name: '',
							position: mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							},
							label: {
								text: textDisance,
								font: '18px sans-serif',
								style: Crystal.LabelStyle.FILL,
								outlineWidth: 1,
								fillColor: Crystal.Color.WHITE,
								verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
								pixelOffset: new Crystal.Cartesian2(20, -20),
								heightReference: Crystal.HeightReference.NONE,
								showBackground: true,
								backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
							}
						}));
					}
				}
				else if(pParam.Flag == 9){
					handlerMeasure.destroy();
					viewer.scene.globe.depthTestAgainstTerrain = false;
					viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
					pEntities.push(viewer.entities.add({
						name: '',
						position: cartesian, 
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference: Crystal.HeightReference.NONE
						}
					}));
					if(pParam.Data == 1){
						particleSystem.push(viewer.scene.primitives.add(new Crystal.ParticleSystem({
							image : 'Image/fire.png',
							imageSize : new Crystal.Cartesian2(20, 20),
							startScale : 1.0,
							endScale : 4.0,
							particleLife : 1.0,
							speed : 5.0,
							emitter : new Crystal.CircleEmitter(0.5),
							emissionRate : 5.0,
							emitterModelMatrix : computeEmitterModelMatrix(),
							modelMatrix : computeModelMatrix(),
							lifetime : 16.0
						})));
					}
					else if(pParam.Data == 2){
						particleSystem.push(viewer.scene.primitives.add(new Crystal.ParticleSystem({
							image : 'Image/smoke.png',
							imageSize : new Crystal.Cartesian2(20, 20),
							startScale : 1.0,
							endScale : 4.0,
							particleLife : 1.0,
							speed : 5.0,
							emitter : new Crystal.CircleEmitter(0.5),
							emissionRate : 5.0,
							emitterModelMatrix : computeEmitterModelMatrix(),
							modelMatrix : computeModelMatrix(),
							lifetime : 16.0
						})));
					}
					viewer.clock.shouldAnimate = true;
				}
				else if(pParam.Flag == 10){
					let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
					let pCoord = {};
					pCoord.x = Crystal.Math.toDegrees(cartographic.longitude);
					pCoord.y = Crystal.Math.toDegrees(cartographic.latitude);
					pCoord.z = cartographic.height;
					tPositions.push(pCoord);
					if(mPositions.length == 0){
						mPositions.push(cartesian.clone());
					}
					mPositions.push(cartesian);
					let pRoute3D = document.getElementById("routeThroughParam3D");
					let isTrueMid = false;
					if(pRoute3D != null){
						mTemp = pRoute3D.firstElementChild.contentWindow.getParam();
						isTrueMid = mTemp.isTrueMid;
					}
					if (mPositions.length == 2) {
						mEntities.push(viewer.entities.add({
							name: '',
							position: cartesian, 
							billboard: {
								image: 'Image/start.png',
								verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
								width: 32,
								height: 32
							}
						}));
					}
					else{
						if(isTrueMid){
							mEntities.push(viewer.entities.add({
								name: '',
								position: cartesian, 
								billboard: {
									image: 'Image/mid.png',
									verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
									width: 32,
									height: 32
								}
							}));
						}
						else{
							handlerMeasure.destroy();
							viewer.scene.globe.depthTestAgainstTerrain = false;
							viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
							mEntities.push(viewer.entities.add({
								name: '',
								position: mPositions[mPositions.length - 1], 
								billboard: {
									image: 'Image/end.png',
									verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
									width: 32,
									height: 32
								}
							}));
							RequestTianDiTuPlan(tPositions, mTemp);
							callBack(tPositions, mTemp);
						}
					}
				}
				else if(pParam.Flag == 11){
					if (mPositions.length == 0) {
						//let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
						//cartographic.height = cartographic.height + 1.8;
						//let temp = Crystal.Cartographic.toCartesian(cartographic);
						mPositions.push(cartesian.clone());
						//mPositions.push(temp);
						mEntities.push(viewer.entities.add({
							name: '',
							position: cartesian, 
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							}
						}));
					}
					else{
						shedEntities.push(new Crystal.Viewshed(viewer, {
								viewPosition:mPositions[0],
								viewPositionEnd:mPositions[1]
						}));
						viewer.selectedEntity = undefined;
						handlerMeasure.destroy();
						viewer.scene.globe.depthTestAgainstTerrain = false;
						viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);	
					}
					mPositions.push(cartesian);
				}
				else if(pParam.Flag == 12){
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
						mEntities.push(viewer.entities.add({
							name: '',
							position: cartesian, 
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							}
						}));
					}
					mPositions.push(cartesian);
					if(mPositions.length >2){
let direction = Crystal.Cartesian3.normalize(Crystal.Cartesian3.subtract(mPositions[mPositions.length-1], mPositions[0], new Crystal.Cartesian3()), new Crystal.Cartesian3());
						let rayLine = new Crystal.Ray(mPositions[0], direction);
						let result = viewer.scene.pickFromRay(rayLine, [mEntities[mEntities.length-1], mEntities[mEntities.length-2],mEntities[mEntities.length-3]]);
						if (Crystal.defined(result) && Crystal.defined(result.object)) {
							drawResultLine(result.position, mPositions[0], Crystal.Color.CHARTREUSE);
							drawResultLine(result.position, mPositions[mPositions.length-1], Crystal.Color.RED);
						} else {
							drawResultLine(mPositions[0], mPositions[mPositions.length-1], Crystal.Color.CHARTREUSE);
						}
						poly = null;
						viewer.entities.remove(mEntities[mEntities.length-1]);
						viewer.entities.remove(mEntities[mEntities.length-2]);
						mPositions.pop();
						mPositions.pop();
						mPositions.push(mPositions[0].clone());
						nEntities.push(viewer.entities.add({
							name: '',
							position: cartesian, 
							point: {
								pixelSize: 5,
								color: Crystal.Color.WHITE,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2,
								heightReference: Crystal.HeightReference.NONE
							}
						}));
					}
				}
				else if(pParam.Flag == 13){
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
					}
					mPositions.push(cartesian);
					mEntities.push(viewer.entities.add({
						name: '',
						position: mPositions[mPositions.length - 1],
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference: Crystal.HeightReference.NONE
						}
					}));
				}
				else if(pParam.Flag == 14){
					let pBuffer3D = document.getElementById("bufferArea3D");
					if(pBuffer3D != null){
						bookJson = pBuffer3D.firstElementChild.contentWindow.getParam();
					}
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
					}
					mPositions.push(cartesian);
					mEntities.push(viewer.entities.add({
						name: '',
						position: mPositions[mPositions.length - 1],
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference: Crystal.HeightReference.NONE
						}
					}));
					if(bookJson.styleValue == "0"){
						let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
						let pCoord = [];
						pCoord.push(Crystal.Math.toDegrees(cartographic.longitude));
						pCoord.push(Crystal.Math.toDegrees(cartographic.latitude));
						let pointF = turf.point(pCoord);
						let buffered = turf.buffer(pointF, parseFloat(bookJson.styleLength), { units: 'meters' });
						let coordinates = buffered.geometry.coordinates;
						let points = coordinates[0];
						let degreesArray = pointsToDegreesArray(points);
						addBufferPolyogn(degreesArray);
						handlerMeasure.destroy();
						viewer.scene.globe.depthTestAgainstTerrain = false;
						viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
					}
					else if(bookJson.styleValue == "1" || bookJson.styleValue == "2"){
						let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
						let pCoord = [];
						pCoord.push(Crystal.Math.toDegrees(cartographic.longitude));
						pCoord.push(Crystal.Math.toDegrees(cartographic.latitude));
						tPositions.push(pCoord);
					}
				}
				else if(pParam.Flag == 20){
					let cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
					let x = Crystal.Math.toDegrees(cartographic.longitude);
					let y = Crystal.Math.toDegrees(cartographic.latitude);
					if (mPositions.length == 2) {
						viewer.selectedEntity = undefined;
						handlerMeasure.destroy();
						viewer.scene.globe.depthTestAgainstTerrain = false;
						viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
					}
					if (mPositions.length == 0) {
						mPositions.push(x);
						mPositions.push(y);
						lPositions.push(x);
						lPositions.push(y);
					}
				}
				else if(pParam.Flag == 21){
					mPositions.push(cartesian);
					if (mPositions.length == 2) {
						mPositions.push(cartesian.clone());
					}
					mTempPlotEntities.push(viewer.entities.add({
						name: '',
						position: mPositions[mPositions.length - 1],
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference: Crystal.HeightReference.NONE
						}
					}));
				}
				else if(pParam.Flag == 22){
					mPositions.push(cartesian);
					if (mPositions.length == 2) {
						mPositions.push(cartesian.clone());
					}
					mTempPlotEntities.push(viewer.entities.add({
						name: '',
						position: mPositions[mPositions.length - 1],
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference: Crystal.HeightReference.NONE
						}
					}));
				}
				else if(pParam.Flag == 23 || pParam.Flag == 24){
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
					}
					mPositions.push(cartesian);
					mTempPlotEntities.push(viewer.entities.add({
						name: '',
						position: mPositions[mPositions.length - 1],
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference: Crystal.HeightReference.NONE
						}
					}));
					if(mPositions.length == 3){
						viewer.selectedEntity = undefined;
						for(var i = 0;i < mTempPlotEntities.length;i++){
							viewer.entities.remove(mTempPlotEntities[i]);	
						}
						viewer.selectedEntity = undefined;
						handlerMeasure.destroy();
						viewer.scene.globe.depthTestAgainstTerrain = false;
						viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
					}
				}
				else if(pParam.Flag == 25){
					mPositions.push(cartesian);
					mPlotEntities.push(viewer.entities.add({
						name: '',
						position: mPositions[mPositions.length - 1],
						billboard: {
							image: 'Image/flag.png',
							verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
							pixelOffset: new Crystal.Cartesian2(24, 0),
							width: 48,
							height: 48
						}
					}));
					viewer.selectedEntity = undefined;
					handlerMeasure.destroy();
					viewer.scene.globe.depthTestAgainstTerrain = false;
					viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
				}
				else if(pParam.Flag == 26){
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
					}
					mPositions.push(cartesian);
					mTempPlotEntities.push(viewer.entities.add({
						name: '',
						position: mPositions[mPositions.length - 1],
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference: Crystal.HeightReference.NONE
						}
					}));
					if(mPositions.length == 3){
						for(var i = 0;i < mTempPlotEntities.length;i++){
							viewer.entities.remove(mTempPlotEntities[i]);	
						}
						viewer.selectedEntity = undefined;
						handlerMeasure.destroy();
						viewer.scene.globe.depthTestAgainstTerrain = false;
						viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
					}
				}
				else if(pParam.Flag == 27 || pParam.Flag == 28){
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
					}
					mPositions.push(cartesian);
					mTempPlotEntities.push(viewer.entities.add({
						name: '',
						position: mPositions[mPositions.length - 1],
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference: Crystal.HeightReference.NONE
						}
					}));
				}
				else if(pParam.Flag == 100){
					let cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
					let x = Crystal.Math.toDegrees(cartographic.longitude);
					let y = Crystal.Math.toDegrees(cartographic.latitude);
					let z = cartographic.height;
					console.log({'x':x,'y':y,'z':z});
					viewer.selectedEntity = undefined;
					handlerMeasure.destroy();
					viewer.scene.globe.depthTestAgainstTerrain = false;
					viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
				}
				else if(pParam.Flag == 101){
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
					}
					mPositions.push(cartesian);
					mEntities.push(viewer.entities.add({
						name: '',
						position:mPositions[mPositions.length - 1],
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference:Crystal.HeightReference.NONE
						}
					}));
					nEntities.push(viewer.entities.add({
						name: '',
						position:mPositions[mPositions.length - 1],
						label: {
							text: vText,
							font: '18px sans-serif',
							style: Crystal.LabelStyle.FILL,
							outlineWidth: 1,
							fillColor: Crystal.Color.WHITE,
							verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
							pixelOffset: new Crystal.Cartesian2(20, -20),
							showBackground: true,
							backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
						}
					}));
					if(mPositions.length == 3){
						viewer.selectedEntity = undefined;
						handlerMeasure.destroy();
						viewer.scene.globe.depthTestAgainstTerrain = false;
						viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun,Crystal.ScreenSpaceEventType.LEFT_CLICK);
						viewer.entities.remove(nEntities[nEntities.length - 1]);
						nEntities.pop();
						var circleOutline = new Crystal.CircleOutlineGeometry({
						   center : mPositions[0],
						   radius : parseFloat(mDistance)*1000
						});
						var geometry = Crystal.CircleOutlineGeometry.createGeometry(circleOutline);
						var float64ArrayPositions = geometry.attributes.position.values;
						var pos = [].slice.call(float64ArrayPositions);
						var posTemp = [];
						for(var i = 0;i<pos.length;i=i+3){
							var sT = new Crystal.Cartesian3(pos[i],pos[i+1],pos[i+2]);
							let cartographic = Crystal.Cartographic.fromCartesian(sT);
							posTemp.push(Crystal.Math.toDegrees(cartographic.longitude));
							posTemp.push(Crystal.Math.toDegrees(cartographic.latitude));
						}
						var instance = new Crystal.GeometryInstance({
						  geometry : new Crystal.GroundPolylineGeometry({
							 positions : Crystal.Cartesian3.fromDegreesArray(posTemp),
							 loop : true,
							 width : 4.0
						  }),
						  attributes : {
							 color : Crystal.ColorGeometryInstanceAttribute.fromColor(Crystal.Color.fromCssColorString('green').withAlpha(0.7))
						  }
						});
						var gInstance = new Crystal.GroundPolylinePrimitive({
							geometryInstances : instance,
							appearance : new Crystal.PolylineColorAppearance()
						});
						mGroundPrimitives.push(gInstance);
						viewer.scene.groundPrimitives.add(gInstance);
					}
				}
				else if(pParam.Flag == 102){
					if (mPositions.length == 0) {
						mPositions.push(cartesian.clone());
						tPositions.push(cartesian.clone());
						tPositions.push(cartesian.clone());
						lPositions.push(cartesian.clone());
					}
					mPositions.push(cartesian);
					tPositions.push(cartesian);
					mEntities.push(viewer.entities.add({
						name: '',
						position:mPositions[mPositions.length - 1],
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference:Crystal.HeightReference.NONE
						}
					}));
					nEntities.push(viewer.entities.add({
						name: '',
						position:mPositions[mPositions.length - 1],
						label: {
							text: vText,
							font: '18px sans-serif',
							style: Crystal.LabelStyle.FILL,
							outlineWidth: 1,
							fillColor: Crystal.Color.WHITE,
							verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
							pixelOffset: new Crystal.Cartesian2(20, -20),
							showBackground: true,
							backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
						}
					}));
					if(mPositions.length == 3){
						viewer.selectedEntity = undefined;
						handlerMeasure.destroy();
						viewer.scene.globe.depthTestAgainstTerrain = false;
						viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun,Crystal.ScreenSpaceEventType.LEFT_CLICK);
						viewer.entities.remove(nEntities[nEntities.length - 1]);
						nEntities.pop();
						var posTemp = [];
						posTemp.push(lPositions[0].west);
						posTemp.push(lPositions[0].south);
						posTemp.push(lPositions[0].east);
						posTemp.push(lPositions[0].south);
						posTemp.push(lPositions[0].east);
						posTemp.push(lPositions[0].north);
						posTemp.push(lPositions[0].west);
						posTemp.push(lPositions[0].north);
						/**
						for(var i = 0;i<tPositions.length;i++){
							let cartographic = Crystal.Cartographic.fromCartesian(tPositions[i]);
							posTemp.push(Crystal.Math.toDegrees(cartographic.longitude));
							posTemp.push(Crystal.Math.toDegrees(cartographic.latitude));
						} */
						var instance = new Crystal.GeometryInstance({
						  geometry : new Crystal.GroundPolylineGeometry({
							 positions : Crystal.Cartesian3.fromRadiansArray(posTemp),
							 loop : true,
							 width : 4.0
						  }),
						  attributes : {
							 color : Crystal.ColorGeometryInstanceAttribute.fromColor(Crystal.Color.fromCssColorString('green').withAlpha(0.7))
						  }
						});
						var gInstance = new Crystal.GroundPolylinePrimitive({
							geometryInstances : instance,
							appearance : new Crystal.PolylineColorAppearance()
						});
						mGroundPrimitives.push(gInstance);
						viewer.scene.groundPrimitives.add(gInstance);
						
					}
				}
			}
		}, Crystal.ScreenSpaceEventType.LEFT_CLICK);
		handlerMeasure.setInputAction(function (movement) {
			movement.endPosition.x = movement.endPosition.x - 1433;
			cartesian = viewer.scene.pickPosition(movement.endPosition);
			if(cartesian != undefined){
				if (mPositions.length >= 2) {
					if(pParam.Flag == 0){
						if (!Crystal.defined(poly)) {
							poly = new PolyLinePrimitive(mPositions);
							new PointPrimitive(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
						let dis = getSpaceDistance(mPositions);
						lengthUnitConversion(dis);
						vText = mDistance + lengthUnit[pParam.Unit];
					}
					else if(pParam.Flag == 1){
						if (!Crystal.defined(poly)) {
							poly = new PolyLinePrimitiveAffixed(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
						let dis = getSurfaceDistance(mPositions);
						lengthUnitConversion(dis);
					}
					else if(pParam.Flag == 2){
						if (!Crystal.defined(poly)) {
							poly = new PolyLineHeightPrimitive(mPositions);
							new PointPrimitive(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
						let dis = getHeight(mPositions);
						lengthUnitConversion(dis);
						vText = mDistance + lengthUnit[pParam.Unit];
					}
					else if(pParam.Flag == 3){
						if (!Crystal.defined(poly)) {
							poly = new TriangulationPrimitive(mPositions);
							new PointPrimitive(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
						let dis = getHeight(mPositions);
						lengthUnitConversion(dis);
						vText = mDistance + lengthUnit[pParam.Unit];
					}
					else if(pParam.Flag == 4){
						if (!Crystal.defined(poly)) {
							poly = new PolyLinePrimitiveAngle(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
							let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
							tPositions.pop();
							tPositions.push(cartographic);
						}
						let dis = getSpaceDistance(mPositions);
						mAngle = Bearing(tPositions);
						lengthUnitConversion(dis);
					}
					else if(pParam.Flag == 5){
						if (!Crystal.defined(poly)) {
							poly = new PolygonPrimitive(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
							let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
							tPositions.pop();
							tPositions.push(cartographic);
						}
						let dis = getArea(tPositions, mPositions);
						areaUnitConversion(dis);
					}
					else if(pParam.Flag == 6){
						if (!Crystal.defined(poly)) {
							poly = new PolyLinePrimitiveAffixed(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
							let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
							tPositions.pop();
							tPositions.push(cartographic);
						}
						let dis = getSurfaceDistance(mPositions);
						lengthUnitConversion(dis);
					}
					else if(pParam.Flag == 7){
						if(bookJson.styleValue == '1'){
							if (!Crystal.defined(poly)) {
								poly = new PolyLinePrimitiveAffixed(mPositions);
							} else {
								mPositions.pop();
								mPositions.push(cartesian);
							}
						}
						else{
							if (!Crystal.defined(poly)) {
								poly = new PolygonPrimitive(mPositions);
							} else {
								mPositions.pop();
								mPositions.push(cartesian);
							}
						}
					}
					else if(pParam.Flag == 8){
						if (!Crystal.defined(poly)) {
							poly = new PolyLinePrimitiveAffixed(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
						let dis = getSurfaceDistance(mPositions);
						lengthUnitConversion(dis);
					}
					else if(pParam.Flag == 10){
						if (!Crystal.defined(poly)) {
							poly = new PolyLinePrimitiveAffixed(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
					}
					else if(pParam.Flag == 11 || pParam.Flag == 12){
						if (!Crystal.defined(poly)) {
							poly = new PolyLinePrimitive(mPositions);
							new PointPrimitive(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
						let dis = getSpaceDistance(mPositions);
						lengthUnitConversion(dis);
						vText = mDistance + lengthUnit[pParam.Unit];
					}
					else if(pParam.Flag == 13){
						if (!Crystal.defined(poly)) {
							poly = new PolygonPrimitive(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
					}
					else if(pParam.Flag == 14){
						if(bookJson.styleValue == "2"){
							if (!Crystal.defined(poly)) {
								poly = new PolygonPrimitive(mPositions);
							} else {
								mPositions.pop();
								mPositions.push(cartesian);
							}
						}
						else if(bookJson.styleValue == "1"){
							if (!Crystal.defined(poly)) {
								poly = new PolyLinePrimitiveAffixed(mPositions);
							} else {
								mPositions.pop();
								mPositions.push(cartesian);
							}
						}
					}
					else if(pParam.Flag == 20){
						if (!Crystal.defined(poly)) {
							poly = new PolygonPrimitiveAffixed(mPositions, lPositions);
						} else {
							lPositions.pop();
							lPositions.pop();
							let cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);		
							let x = Crystal.Math.toDegrees(cartographic.longitude);
							let y = Crystal.Math.toDegrees(cartographic.latitude);
							lPositions.push(x);
							lPositions.push(y);
						}
					}
					else if(pParam.Flag == 21){
						if(mPositions.length > 2){
							if (!Crystal.defined(poly)) {
								poly = new PolygonPrimitiveAffixed(mPositions);
							} else {
								mPositions.pop();
								mPositions.push(cartesian);
							}
						}
					}
					else if(pParam.Flag == 22){
						if(mPositions.length > 2){
							if (!Crystal.defined(poly)) {
								poly = new PolygonPrimitiveAffixed(mPositions);
							} else {
								mPositions.pop();
								mPositions.push(cartesian);
							}
						}
					}
					else if(pParam.Flag == 23){
						if (!Crystal.defined(poly)) {
							poly = new CirclePrimitiveAffixed(mPositions);        			
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
					}
					else if(pParam.Flag == 24){
						if (!Crystal.defined(poly)) {
							poly = new CirclePrimitiveAffixed(mPositions);        			
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
					}
					else if(pParam.Flag == 26){
						if (!Crystal.defined(poly)) {
							poly = new RectanglePrimitiveAffixed(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
					}
					else if(pParam.Flag == 27){
						if (!Crystal.defined(poly)) {
							poly = new PolygonPrimitive(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
					}
					else if(pParam.Flag == 28){
						if (!Crystal.defined(poly)) {
							poly = new PolyLinePrimitiveAffixed(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
					}
					else if(pParam.Flag == 101){
						if (!Crystal.defined(poly)) {
							poly = new CircleRangePrimitive(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
						}
						let dis = getSpaceDistance(mPositions);
						lengthUnitConversion(dis);
						vText = mDistance + lengthUnit[pParam.Unit];
						if(nEntities.length > 0){
							viewer.entities.remove(nEntities[nEntities.length - 1]);
							nEntities.pop();
						}
						nEntities.push(viewer.entities.add({
							name: '',
							position:mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.RED,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2
							},
							label: {
								text: vText,
								font: '18px sans-serif',
								style: Crystal.LabelStyle.FILL,
								outlineWidth: 1,
								fillColor: Crystal.Color.WHITE,
								verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
								pixelOffset: new Crystal.Cartesian2(20, -20),
								showBackground: true,
								backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
							}
						}));
					}
					else if(pParam.Flag == 102){
						if (!Crystal.defined(poly)) {
							poly = new RectanglePrimitiveAffixedQuery(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
							tPositions.pop();
							tPositions.pop();
							lPositions.pop();
							let cartesian1 = new Crystal.Cartesian3(mPositions[0].x,cartesian.y,cartesian.z);
							let cartesian2 = Crystal.Rectangle.fromCartesianArray(mPositions);
							tPositions.push(cartesian1);
							tPositions.push(cartesian);
							lPositions.push(cartesian2);
						}
						let dis = getRectangleArea(tPositions);
						areaUnitConversion(dis);
						vText = mDistance + areaUnit[pParam.Unit];
						if(nEntities.length > 0){
							viewer.entities.remove(nEntities[nEntities.length - 1]);
							nEntities.pop();
						}
						nEntities.push(viewer.entities.add({
							name: '',
							position:mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.RED,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2
							},
							label: {
								text: vText,
								font: '18px sans-serif',
								style: Crystal.LabelStyle.FILL,
								outlineWidth: 1,
								fillColor: Crystal.Color.WHITE,
								verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
								pixelOffset: new Crystal.Cartesian2(20, -20),
								showBackground: true,
								backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
							}
						}));
					}
					else if(pParam.Flag == 103){
						if (!Crystal.defined(poly)) {
							poly = new PolygonPrimitive(mPositions);
						} else {
							mPositions.pop();
							mPositions.push(cartesian);
							let cartographic = Crystal.Cartographic.fromCartesian(cartesian);
							tPositions.pop();
							tPositions.push(cartographic);
						}
						let dis = getArea(tPositions, mPositions);
						areaUnitConversion(dis);
						vText = mDistance + areaUnit[pParam.Unit];
						if(nEntities.length > 0){
							viewer.entities.remove(nEntities[nEntities.length - 1]);
							nEntities.pop();
						}
						nEntities.push(viewer.entities.add({
							name: '',
							position:mPositions[mPositions.length - 1],
							point: {
								pixelSize: 5,
								color: Crystal.Color.RED,
								outlineColor: Crystal.Color.RED,
								outlineWidth: 2
							},
							label: {
								text: vText,
								font: '18px sans-serif',
								style: Crystal.LabelStyle.FILL,
								outlineWidth: 1,
								fillColor: Crystal.Color.WHITE,
								verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
								pixelOffset: new Crystal.Cartesian2(20, -20),
								showBackground: true,
								backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
							}
						}));
					}
				}
				else if(pParam.Flag == 7){
					if(bookJson.styleValue == '0'){
						if(nEntities.length > 0){
							viewer.entities.remove(nEntities[nEntities.length - 1]);
							nEntities.pop();
						}
						nEntities.push(viewer.entities.add({
							name: '',
							position: cartesian, 
							billboard: {
								image: 'Image/location.png',
								verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
								width: 32,
								height: 32
							}
						}));
					}
				}
				else if(pParam.Flag == 12){
					if(nEntities.length > 0){
						viewer.entities.remove(nEntities[nEntities.length - 1]);
						nEntities.pop();
					}
					nEntities.push(viewer.entities.add({
						name: '',
						position: cartesian,
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference: Crystal.HeightReference.NONE
						}
					}));
				}
			}
		}, Crystal.ScreenSpaceEventType.MOUSE_MOVE);
		handlerMeasure.setInputAction(function (movement) {
			if(mEntities.length > 0){
				viewer.entities.remove(mEntities[mEntities.length - 1]);
			}
			if(pParam.Flag == 0){
				viewer.entities.remove(mEntities[mEntities.length - 2]);
			}
			else if(pParam.Flag == 5){
				mEntities.push(viewer.entities.add({
					name : '',
					position : mPositions[mPositions.length - 1],				
					label : {
						text: mDistance + areaUnit[pParam.Unit],
						font: '18px sans-serif',
						style: Crystal.LabelStyle.FILL,
						outlineWidth: 1,
						fillColor: Crystal.Color.WHITE,
						verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
						pixelOffset: new Crystal.Cartesian2(20, -20),
						heightReference: Crystal.HeightReference.NONE,
						showBackground: true,
						backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
					}
				}));
			}
			else if(pParam.Flag == 8){
				if(flyingThroughParamIndex != null){
					layer.close(flyingThroughParamIndex);
				}
				tPositions.pop();
				callBack(tPositions);
			}
			else if(pParam.Flag == 10){
				viewer.entities.remove(mEntities[mEntities.length - 2]);
				mEntities.push(viewer.entities.add({
					name: '',
					position: mPositions[mPositions.length - 1], 
					billboard: {
						image: 'Image/end.png',
						verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
						width: 32,
						height: 32
					}
				}));
				tPositions.pop();
				RequestTianDiTuPlan(tPositions, mTemp);
				callBack(tPositions, mTemp);
			}
			else if(pParam.Flag == 7 || pParam.Flag == 21 || pParam.Flag == 22 || pParam.Flag == 27 || pParam.Flag == 28){
				if(pParam.Flag == 22){
					mPositions.pop();
					mPositions.pop();
				}
				for(let i = 0;i < mTempPlotEntities.length;i++){
					viewer.entities.remove(mTempPlotEntities[i]);
				}
				mTempPlotEntities = [];
			}
			else if(pParam.Flag == 103){
				tPositions.pop();
				var posTemp = [];
				for(var i = 0;i<tPositions.length;i++){
					posTemp.push(Crystal.Math.toDegrees(tPositions[i].longitude));
					posTemp.push(Crystal.Math.toDegrees(tPositions[i].latitude));
				}
				var instance = new Crystal.GeometryInstance({
				  geometry : new Crystal.GroundPolylineGeometry({
					 positions : Crystal.Cartesian3.fromDegreesArray(posTemp),
					 loop : true,
					 width : 4.0
				  }),
				  attributes : {
					 color : Crystal.ColorGeometryInstanceAttribute.fromColor(Crystal.Color.fromCssColorString('green').withAlpha(0.7))
				  }
				});
				var gInstance = new Crystal.GroundPolylinePrimitive({
					geometryInstances : instance,
					appearance : new Crystal.PolylineColorAppearance()
				});
				mGroundPrimitives.push(gInstance);
				viewer.scene.groundPrimitives.add(gInstance);
				//viewer.entities.remove(nEntities[nEntities.length - 1]);
				//nEntities.pop();
			}
			if(pParam.Flag == 7){
				var returnObj = {};
				returnObj.id = nEntities[nEntities.length - 2]._id;
				returnObj.x = Crystal.Math.toDegrees(viewer.camera.positionCartographic.longitude);
				returnObj.y = Crystal.Math.toDegrees(viewer.camera.positionCartographic.latitude);
				returnObj.z = viewer.camera.positionCartographic.height;
				returnObj.heading = viewer.camera.heading;
				returnObj.pitch = viewer.camera.pitch;
				returnObj.roll = viewer.camera.roll;
				callBack(returnObj);
			}
			let clippingPlanes = [];
			if(pParam.Flag == 13){
				mPositions.pop();
				mPositions = Crystal.arrayRemoveDuplicates(mPositions,Crystal.Cartesian3.equalsEpsilon, true);
				let pPage = document.getElementById("terrainExcavation3D");
				let pHeight = 30;
				if(pPage != null){
					pHeight = parseFloat(pPage.firstElementChild.contentWindow.getParam().styleValue);
				}
				terrainClipPlan = new Crystal.TerrainClipPlan(viewer, {
					height: pHeight,
					splitNum: 50,
					wallImg: "Image/fire.png",
					bottomImg: "Image/fire.png"
				});
				terrainClipPlan.updateData(mPositions);
			}
			else if(pParam.Flag == 14){
				if(bookJson.styleValue == "1"){
					let polylineF = turf.lineString(tPositions);
					let buffered = turf.buffer(polylineF, parseFloat(bookJson.styleLength), { units: 'meters' });
					let coordinates = buffered.geometry.coordinates;
					let points = coordinates[0];
					let degreesArray = pointsToDegreesArray(points);
					addBufferPolyogn(degreesArray);
				}
				else if(bookJson.styleValue == "2"){
					tPositions.pop();
					let pCoord = [];
					pCoord.push(tPositions[0][0]);
					pCoord.push(tPositions[0][1]);
					tPositions.push(pCoord);
					let polygonF = turf.polygon([tPositions]);
					let buffered = turf.buffer(polygonF, parseFloat(bookJson.styleLength), { units: 'meters' });
					let coordinates = buffered.geometry.coordinates;
					let points = coordinates[0];
					let degreesArray = pointsToDegreesArray(points);
					addBufferPolyogn(degreesArray);
				}
			}
			viewer.selectedEntity = undefined;
			handlerMeasure.destroy();
			viewer.scene.globe.depthTestAgainstTerrain = false;
			viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
		}, Crystal.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
		var PolyLinePrimitive = (function () {
			function _(mPositions) {
				this.options = {
					name: '',
					polyline: {
						show: true,
						positions: [],
						material: new Crystal.PolylineGlowMaterialProperty({
							glowPower: 0.1,
							color: Crystal.Color.YELLOW
						}),
						width: 10
					}
				};
				this.positions = mPositions;
				this._init();
			}
			_.prototype._init = function () {
				var _self = this;
				var _update = function () {
					return _self.positions;
				};
				this.options.polyline.positions = new Crystal.CallbackProperty(_update, false);
				mEntities.push(viewer.entities.add(this.options));
			};
			return _;
		})();
		var PointPrimitive = (function(){
			function _(mPositions){
				this.options = {
					name: '',
					point: {
						pixelSize: 5,
						color: Crystal.Color.RED,
						outlineColor: Crystal.Color.RED,
						outlineWidth: 2
					},
					label: {
						text: vText,
						font: '18px sans-serif',
						style: Crystal.LabelStyle.FILL,
						outlineWidth: 1,
						fillColor: Crystal.Color.WHITE,
						verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
						pixelOffset: new Crystal.Cartesian2(20, -20),
						showBackground: true,
						backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
					}
				};
				this.positions = mPositions;
				this._init();
			}
			_.prototype._init = function(){
				var _self = this;
				var _update = function(){
					return _self.positions[_self.positions.length-1];
				};
				var _updateText = function(){
					return vText;
				};
				this.options.position = new Crystal.CallbackProperty(_update,false);
				this.options.label.text = new Crystal.CallbackProperty(_updateText,false);
				mEntities.push(viewer.entities.add(this.options));
			};
			return _;
		})();
		var PolyLinePrimitiveAffixed = (function () {
			function _(mPositions) {
				if(pParam.Flag == 1 || pParam.Flag == 6 || pParam.Flag == 8 || pParam.Flag == 10 || pParam.Flag == 14){
					this.options = {
						name: '',
						corridor: {                    
							positions: [],
							material: Crystal.Color.YELLOW.withAlpha(0.8),
							width: 5.0,
							outline : true,
							outlineColor : Crystal.Color.RED
						}
					};
				}
				else if(pParam.Flag == 28){
					this.options = {
						name: '',
						corridor: {                    
							positions: [],
							material: Crystal.Color.fromCssColorString(plotJson.fillColor).withAlpha(plotJson.fillTransparency),
							width: plotJson.borderWidth,
							outline : plotJson.isBorder,
							outlineColor : plotJson.borderColor
						}
					};
				}
				else if(pParam.Flag == 7){
					this.options = {
						name: '',
						corridor: {                    
							positions: [],
							material: Crystal.Color.RED.withAlpha(0.8),
							width: 10.0,
							outline : true,
							outlineColor : Crystal.Color.RED
						}
					};
				}
				this.positions = mPositions;
				this._init();
			}
			_.prototype._init = function () {
				var _self = this;
				var _update = function () {
					return _self.positions;
				};
				this.options.corridor.positions = new Crystal.CallbackProperty(_update, false);
				if(pParam.Flag == 1 || pParam.Flag == 6 || pParam.Flag == 8 || pParam.Flag == 10 || pParam.Flag == 14){
					mEntities.push(viewer.entities.add(this.options));
				}
				else if(pParam.Flag == 28){
					mPlotEntities.push(viewer.entities.add(this.options));
				}
				else if(pParam.Flag == 7){
					nEntities.push(viewer.entities.add(this.options));
				}
			};
			return _;
		})();
		var PolyLineHeightPrimitive = (function(){
			function _(mPositions){
				this.options = {
					parent: parent_entity,
					name:'',
					polyline : {					
						show : true,
						positions : [],
						material: new Crystal.PolylineGlowMaterialProperty({
							glowPower: 0.1,
							color: Crystal.Color.YELLOW
						}),
						width: 10						
					},
					ellipse : {
						show : true,
						material : Crystal.Color.GREEN.withAlpha(0.5),
						outlineColor: Crystal.Color.YELLOW,
						outline : true
					}
				};
				this.positions = mPositions;
				this._init();
			}
			_.prototype._init = function(){
				var _self = this;
				var _update = function(){	
					var temp_position = [];
					temp_position.push( _self.positions[0]);
					var point1cartographic = Crystal.Cartographic.fromCartesian(_self.positions[0]);
					var point2cartographic = Crystal.Cartographic.fromCartesian(_self.positions[1]);					
					var point_temp = Crystal.Cartesian3.fromRadians(point1cartographic.longitude, point1cartographic.latitude, point2cartographic.height);	
					temp_position.push(point_temp);
					return temp_position;
				};
				var _update_ellipse = function(){
					return _self.positions[0];
				};
				var _semiMinorAxis = function(){
					var point1cartographic = Crystal.Cartographic.fromCartesian(_self.positions[0]);
					var point2cartographic = Crystal.Cartographic.fromCartesian(_self.positions[1]);
					var geodesic = new Crystal.EllipsoidGeodesic();
					geodesic.setEndPoints(point1cartographic, point2cartographic);
					var s = geodesic.surfaceDistance;
					return s;
				};
				var _height =  function(){
					var height_temp = getHeightL(_self.positions);
					return height_temp;
				};
				this.options.polyline.positions = new Crystal.CallbackProperty(_update,false);
				this.options.position = new Crystal.CallbackProperty(_update_ellipse,false);
				this.options.ellipse.semiMinorAxis = new Crystal.CallbackProperty(_semiMinorAxis,false);
				this.options.ellipse.semiMajorAxis = new Crystal.CallbackProperty(_semiMinorAxis,false);
				this.options.ellipse.height =  new Crystal.CallbackProperty(_height,false);
				mEntities.push(viewer.entities.add(this.options));
			};
			return _;
		})();
		var TriangulationPrimitive = (function () {
			function _(mPositions) {
				this.options = {
					name: '',
					polyline: {
						show: true,
						positions: [],
						material: new Crystal.PolylineGlowMaterialProperty({
							glowPower: 0.1,
							color: Crystal.Color.YELLOW
						}),
						width: 10
					}
				};
				this.optionsV = {
					parent: parent_entity,
					name:'',
					polyline : {
						show : true,
						positions : [],
						material :  new Crystal.PolylineDashMaterialProperty({
								color: Crystal.Color.RED
							}),
						width : 2
					}
				};
				this.optionsH = {
					parent: parent_entity,
					name:'',
					polyline : {
						show : true,
						positions : [],
						material :  new Crystal.PolylineDashMaterialProperty({
								color: Crystal.Color.RED
							}),
						width : 2					
					}
				};
				this.positions = mPositions;
				this._init();
			}
			_.prototype._init = function () {
				var _self = this;
				var _update = function () {
					return _self.positions;
				};
				var _updateV = function () {
					let point1cartographic = Crystal.Cartographic.fromCartesian(_self.positions[0]);
					let point2cartographic = Crystal.Cartographic.fromCartesian(_self.positions[1]);
					let point_temp = Crystal.Cartesian3.fromRadians(point1cartographic.longitude, point1cartographic.latitude, point2cartographic.height);
					let tempPositions1 = [];
					tempPositions1.push(_self.positions[0].clone());
					tempPositions1.push(point_temp.clone());
					return tempPositions1;
				};
				var _updateH = function () {
					let point1cartographic = Crystal.Cartographic.fromCartesian(_self.positions[0]);
					let point2cartographic = Crystal.Cartographic.fromCartesian(_self.positions[1]);
					let point_temp = Crystal.Cartesian3.fromRadians(point1cartographic.longitude, point1cartographic.latitude, point2cartographic.height);
					let tempPositions2 = [];
					tempPositions2.push(point_temp.clone());
					tempPositions2.push(mPositions[1].clone());
					return tempPositions2;
				};
				this.options.polyline.positions = new Crystal.CallbackProperty(_update, false);
				this.optionsV.polyline.positions = new Crystal.CallbackProperty(_updateV, false);
				this.optionsH.polyline.positions = new Crystal.CallbackProperty(_updateH, false);
				mEntities.push(viewer.entities.add(this.options));
				mEntities.push(viewer.entities.add(this.optionsV));
				mEntities.push(viewer.entities.add(this.optionsH));
			};
			return _;
		})();
		var PolyLinePrimitiveAngle = (function () {
			function _(mPositions) {
				this.options = {
					name: '',
					polyline: {
						show: true,
						positions: [],
						material: new Crystal.PolylineGlowMaterialProperty({
							glowPower: 0.1,
							color: Crystal.Color.YELLOW
						}),
						width: 10
					}
				};
				this.optionsHint = {
						name : '',
						label : {
							text: mDistance + lengthUnit[pParam.Unit],
							font: '18px sans-serif',
							style: Crystal.LabelStyle.FILL,
							outlineWidth: 1,
							fillColor: Crystal.Color.WHITE,
							verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
							pixelOffset: new Crystal.Cartesian2(20, -20),
							heightReference: Crystal.HeightReference.NONE,
							showBackground: true,
							backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
						}
				};
				this.positions = mPositions;
				this._init();
			}
			_.prototype._init = function () {
				var _self = this;
				var _update = function () {
					return _self.positions;
				};
				var _update_ellipse = function(){
					return _self.positions[_self.positions.length - 1];
				};
				var _update_text = function(){
					return "距离：" + mDistance + lengthUnit[pParam.Unit] +" 角度：" + mAngle.toFixed(2) + "度";
				};
				this.options.polyline.positions = new Crystal.CallbackProperty(_update, false);
				this.optionsHint.position = new Crystal.CallbackProperty(_update_ellipse, false);
				this.optionsHint.label.text = new Crystal.CallbackProperty(_update_text, false);
				mEntities.push(viewer.entities.add(this.options));
				mEntities.push(viewer.entities.add(this.optionsHint));
			};
			return _;
		})();
		var PolygonPrimitive = (function(){
			function _(mPositions){
				if(pParam.Flag == 5 || pParam.Flag == 13 || pParam.Flag == 14){
					this.options = {
						name: '',
						polygon : {
							hierarchy : [],
							material: Crystal.Color.YELLOW.withAlpha(0.3)							
						}
					};
				}
				else if(pParam.Flag == 27){
					this.options = {
						id: 'plot-' + Crystal.createGuid(),
						name: '',
						polygon : {
							hierarchy : [],
							material: Crystal.Color.fromCssColorString(plotJson.fillColor).withAlpha(plotJson.fillTransparency),
							outline : plotJson.isBorder,
							outlineColor : Crystal.Color.fromCssColorString(plotJson.borderColor).withAlpha(plotJson.fillTransparency),
							outlineWidth : plotJson.borderWidth
						}
					};
				}
				else if(pParam.Flag == 7){
					this.options = {
						name: '',
						polygon : {
							hierarchy : [],
							material: Crystal.Color.RED.withAlpha(0.3)							
						}
					};
				}
				else if(pParam.Flag == 103){
					this.options = {
						name: '',
						polygon : {
							hierarchy : [],
							material: Crystal.Color.fromCssColorString('rgba(255,100,86,0.2)')
						}
					};
				}
				this.hierarchy = mPositions;
				this._init();
			}
			_.prototype._init = function(){
				var _self = this;
				var _update = function(){
					return new Crystal.PolygonHierarchy(_self.hierarchy);
				};
				this.options.polygon.hierarchy = new Crystal.CallbackProperty(_update,false);
				if(pParam.Flag == 5 || pParam.Flag == 13 || pParam.Flag == 14 || pParam.Flag == 103){
					mEntities.push(viewer.entities.add(this.options));	
				}
				else if(pParam.Flag == 27){
					mPlotEntities.push(viewer.entities.add(this.options));
				}
				else if(pParam.Flag == 7){
					nEntities.push(viewer.entities.add(this.options));
				}
			};
			return _;
		})();
		var PolygonPrimitiveAffixed = (function(){
			function _(mPositions, lPositions){
				this.options = {
						id: 'plot-' + Crystal.createGuid(),
						name: '',
						polygon : {
							hierarchy : [],
							material : Crystal.Color.fromCssColorString(plotJson.fillColor).withAlpha(plotJson.fillTransparency),
							outline : plotJson.isBorder,
							outlineColor : Crystal.Color.fromCssColorString(plotJson.borderColor).withAlpha(plotJson.fillTransparency),
							outlineWidth : plotJson.borderWidth
						}
				};
				this.hierarchy = mPositions;
				this._init();
			}
			_.prototype._init = function(){
				var _self = this;
				var _update = function(){
					var returnData = [];
					if(pParam.Flag == 20){
						let res = fineArrow(mPositions, lPositions);
						let index = JSON.stringify(res).indexOf("null");
						if (index != -1) return [];
						for (let i = 0; i < res.length; i++) {
							let c3 = new Crystal.Cartesian3(res[i].x, res[i].y, res[i].z);
							returnData.push(c3);
						}
					}
					else if(pParam.Flag == 21){
						let lnglatArr = [];
						for (let i = 0; i < mPositions.length; i++) {
							let lnglat = cartesianToLatlng(mPositions[i]);
							lnglatArr.push(lnglat);
						}
						let res = tailedAttackArrow(lnglatArr);
						let index = JSON.stringify(res.polygonalPoint).indexOf("null");
						if (index == -1) returnData = res.polygonalPoint;
					}
					else if(pParam.Flag == 22){
						let lnglatArr = [];
						for (let i = 0; i < mPositions.length; i++) {
							let lnglat = cartesianToLatlng(mPositions[i]);
							lnglatArr.push(lnglat)
						}
						let res = doubleArrow(lnglatArr);
						var index = JSON.stringify(res.polygonalPoint).indexOf("null");
						if (index == -1) returnData = res.polygonalPoint;
					}
					return new Crystal.PolygonHierarchy(returnData);
				};
				this.options.polygon.hierarchy = new Crystal.CallbackProperty(_update,false);
				mPlotEntities.push(viewer.entities.add(this.options));
			};
			return _;
		})();
		var CirclePrimitiveAffixed = (function () {
			function _(mPositions) {
				this.options = {
					id: 'plot-' + Crystal.createGuid(),
					position: mPositions[0],
					name: '',
					ellipse: {
						semiMinorAxis: 0,
						semiMajorAxis: 0,
						material: Crystal.Color.fromCssColorString(plotJson.fillColor).withAlpha(plotJson.fillTransparency),
						heightReference: Crystal.HeightReference.clampToGroud,
						outline : plotJson.isBorder,
						outlineColor : Crystal.Color.fromCssColorString(plotJson.borderColor).withAlpha(plotJson.fillTransparency),
						outlineWidth : plotJson.borderWidth
					}
				};
				this.positions = mPositions;
				this._init();
			}
			_.prototype._init = function () {
				var _self = this;
				var _update = function () {
					return parseFloat(getSpaceDistance(_self.positions));
				};
				var _updateMinor = function () {
					return parseFloat(getSpaceDistance(_self.positions)) * 0.6;
				};
				if(pParam.Flag == 23){
					this.options.ellipse.semiMajorAxis = this.options.ellipse.semiMinorAxis = new Crystal.CallbackProperty(_update, false);
				}
				else{
					this.options.ellipse.semiMajorAxis = new Crystal.CallbackProperty(_update, false);
					this.options.ellipse.semiMinorAxis = new Crystal.CallbackProperty(_updateMinor, false);
				}
				mPlotEntities.push(viewer.entities.add(this.options));
			};
			return _;
		})();
		var CircleRangePrimitive = (function(){
			function _(mPositions){
				this.options = {
					parent:mEntities[mEntities.length-1],
					name:'',
					corridor: {                    
						positions: [],
						material: Crystal.Color.RED.withAlpha(0.8),
						width: 32.0,
						outline : true,
						outlineColor : Crystal.Color.RED
					},
					ellipse : {
						show : true,
						material : Crystal.Color.fromCssColorString('rgba(255,100,86,0.2)'),  //   rgba(27,27,27,0.6)
						heightReference:Crystal.HeightReference.clampToGroud,
						outline : true
					},
					
				};
				this.positions = mPositions;
				this._init();
			}
			_.prototype._init = function(){
				var _self = this;
				var _update = function(){
					return _self.positions;
				};
				var _update_ellipse = function(){
					return _self.positions[0];
				};
				var _semiMinorAxis = function(){
					var point1cartographic = Crystal.Cartographic.fromCartesian(_self.positions[0]);
					var point2cartographic = Crystal.Cartographic.fromCartesian(_self.positions[1]);
					var geodesic = new Crystal.EllipsoidGeodesic();
					geodesic.setEndPoints(point1cartographic, point2cartographic);
					var s = geodesic.surfaceDistance;
					return s;
				};
				this.options.corridor.positions = new Crystal.CallbackProperty(_update,false);
				this.options.position = new Crystal.CallbackProperty(_update_ellipse,false);
				this.options.ellipse.semiMinorAxis = new Crystal.CallbackProperty(_semiMinorAxis,false);
				this.options.ellipse.semiMajorAxis = new Crystal.CallbackProperty(_semiMinorAxis,false);
				mEntities.push(viewer.entities.add(this.options));
			};
			return _;
		})();
		var RectanglePrimitiveAffixed = (function () {
			function _(mPositions) {
				this.options = {
					id: 'plot-' + Crystal.createGuid(),
					name: '',
					rectangle: {
						show: true,
						coordinates: [],
						material: Crystal.Color.fromCssColorString(plotJson.fillColor).withAlpha(plotJson.fillTransparency),
						outline : plotJson.isBorder,
						outlineColor : Crystal.Color.fromCssColorString(plotJson.borderColor).withAlpha(plotJson.fillTransparency),
						outlineWidth : plotJson.borderWidth
					}
				};
				this.coordinates = mPositions;
				this._init();
			}
			_.prototype._init = function () {
				var _self = this;
				var _update = function () {
					return Crystal.Rectangle.fromCartesianArray(_self.coordinates);
				};
				this.options.rectangle.coordinates = new Crystal.CallbackProperty(_update, false);
				mPlotEntities.push(viewer.entities.add(this.options));
			};
			return _;
		})();
		var RectanglePrimitiveAffixedQuery = (function () {
			function _(mPositions) {
				this.options = {
					name: '',
					rectangle: {
						show: true,
						coordinates: [],
						material: Crystal.Color.fromCssColorString('rgba(255,100,86,0.2)'),
						outline : true,
                        outlineWidth: 20,
                        outlineColor : Crystal.Color.RED
					}
				};
				this.coordinates = mPositions;
				this._init();
			}
			_.prototype._init = function () {
				var _self = this;
				var _update = function () {
					return Crystal.Rectangle.fromCartesianArray(_self.coordinates);
				};
				this.options.rectangle.coordinates = new Crystal.CallbackProperty(_update, false);
				mEntities.push(viewer.entities.add(this.options));
			};
			return _;
		})();
		function getSpaceDistance(positions) {
			var distance = 0;
			for (var i = 0; i < positions.length - 1; i++) {
				if(positions[i] != undefined && positions[i+1] != undefined){
					var point1cartographic = Crystal.Cartographic.fromCartesian(positions[i]);
					var point2cartographic = Crystal.Cartographic.fromCartesian(positions[i+1]);	
					var geodesic = new Crystal.EllipsoidGeodesic();
					geodesic.setEndPoints(point1cartographic, point2cartographic);
					var s = geodesic.surfaceDistance;    
					s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));	
					distance = distance + s;
				}
			}
			return distance.toFixed(2);
	    }
		function getSurfaceDistance(positions) {
			var distance = 0;
			for (var i = 0; i < positions.length - 1; i++) {
				if(positions[i] != undefined && positions[i+1] != undefined){
					var point1cartographic = Crystal.Cartographic.fromCartesian(positions[i]);
					var point2cartographic = Crystal.Cartographic.fromCartesian(positions[i+1]);	
					var geodesic = new Crystal.EllipsoidGeodesic();
					geodesic.setEndPoints(point1cartographic, point2cartographic);
					var s = geodesic.surfaceDistance;
					distance = distance + s;
				}
			}
			return distance.toFixed(2);
		}
		function lengthUnitConversion(dis){
			if(mUnit){
				if(dis > 10000){
					pParam.Unit = "km";
					mDistance = (dis/1000).toFixed(3);
				}
				else{
					pParam.Unit = "m";
					mDistance = dis;
				}
			}
			else{
				if(pParam.Unit == "m"){
					mDistance = dis;
				}
				else if(pParam.Unit == "km"){
					mDistance = (dis/1000).toFixed(3);
				}
				else if(pParam.Unit == "mile"){
					mDistance = (dis*0.00054).toFixed(5);
				}
				else if(pParam.Unit == "zhang"){
					mDistance = (dis*0.3).toFixed(2);
				}
			}
		}
		function areaUnitConversion(dis){
			if(mUnit){
				if(dis > 10000){
					pParam.Unit = "km";
					mDistance = (dis/1000000.0).toFixed(3);
				}
				else{
					pParam.Unit = "m";
					mDistance = dis.toFixed(3);
				}
			}
			else{
				if(pParam.Unit == "m"){
					mDistance = dis.toFixed(3);
				}
				else if(pParam.Unit == "km"){
					mDistance = (dis/1000000.0).toFixed(3);
				}
				else if(pParam.Unit == "mu"){
					mDistance = (dis/100.0).toFixed(3);
				}
				else if(pParam.Unit == "ha"){
					mDistance = (dis/10000.0).toFixed(2);
				}
			}
		}
		function getHeight(_positions){
			var cartographic = Crystal.Cartographic.fromCartesian(_positions[0]);
			var cartographic1 = Crystal.Cartographic.fromCartesian(_positions[1]);
			var height_temp = cartographic1.height - cartographic.height;
			return height_temp.toFixed(2);
		}
		function getHeightL(_positions){
			var cartographic1 = Crystal.Cartographic.fromCartesian(_positions[1]);
			var height_temp = cartographic1.height;
			return height_temp.toFixed(2);
		}
		function Bearing(positions){
			var lat1 = positions[0].latitude;
			var lon1 = positions[0].longitude;
			var lat2 = positions[positions.length - 1].latitude;
			var lon2 = positions[positions.length - 1].longitude;
			var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
			if (angle < 0) {
				angle += Math.PI * 2.0;
			}
			angle = angle * Crystal.Math.DEGREES_PER_RADIAN;
			return angle;
		}
		function getRectangleArea(positions) {
			var res = 0;
			var dis_temp1 = distance(positions[0], positions[1]);
			var dis_temp2 = distance(positions[1], positions[2]);
			res = dis_temp1 * dis_temp2;
			
			return res;
		}
		function getArea(points, positions) {
			var res = 0;
			for (var i = 0; i < points.length - 2; i++) {
				var j = (i + 1) % points.length;
				var k = (i + 2) % points.length;
				var totalAngle = Angle(points[i], points[j], points[k]);
				var dis_temp1 = distance(positions[i], positions[j]);
				var dis_temp2 = distance(positions[j], positions[k]);
				res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle)) ;
			}
			return res;
		}
		function Angle(p1, p2, p3) {
			let pFrom = [];
			pFrom.push(p2);
			pFrom.push(p1);
			let pTo = [];
			pTo.push(p2);
			pTo.push(p3);
			var bearing21 = Bearing(pFrom);
			var bearing23 = Bearing(pTo);
			var angle = bearing21 - bearing23;
			if (angle < 0) {
				angle += 360;
			}
			return angle;
		}
		function distance(point1, point2){
			var point1cartographic = Crystal.Cartographic.fromCartesian(point1);
			var point2cartographic = Crystal.Cartographic.fromCartesian(point2);
			var geodesic = new Crystal.EllipsoidGeodesic();
			geodesic.setEndPoints(point1cartographic, point2cartographic);
			var s = geodesic.surfaceDistance;
			s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
			return s;
		}
		var fineArrowDefualParam = {
			tailWidthFactor: 0.15,
			neckWidthFactor: 0.20,
			headWidthFactor: 0.25,
			headAngle: Math.PI / 8.5,
			neckAngle: Math.PI / 13
		};
		function fineArrow(tailPoint, headerPoint) {
			if ((tailPoint.length < 2) || (headerPoint.length < 2)) return;
			let tailWidthFactor = fineArrowDefualParam.tailWidthFactor;
			let neckWidthFactor = fineArrowDefualParam.neckWidthFactor;
			let headWidthFactor = fineArrowDefualParam.headWidthFactor;
			let headAngle = fineArrowDefualParam.headAngle;
			let neckAngle = fineArrowDefualParam.neckAngle;
			var o = [];
			o[0] = tailPoint;
			o[1] = headerPoint;
			e = o[0],
			r = o[1],
			n = P.PlotUtils.getBaseLength(o),
			g = n * tailWidthFactor,			
			i = n * neckWidthFactor,
			s = n * headWidthFactor,
			a = P.PlotUtils.getThirdPoint(r, e, P.Constants.HALF_PI, g, !0),
			l = P.PlotUtils.getThirdPoint(r, e, P.Constants.HALF_PI, g, !1),
			u = P.PlotUtils.getThirdPoint(e, r, headAngle, s, !1),
			c = P.PlotUtils.getThirdPoint(e, r, headAngle, s, !0),
			p = P.PlotUtils.getThirdPoint(e, r, neckAngle, i, !1),
			h = P.PlotUtils.getThirdPoint(e, r, neckAngle, i, !0),
			d = [];
			d.push(a[0], a[1], p[0], p[1], u[0], u[1], r[0], r[1], c[0], c[1], h[0], h[1], l[0], l[1], e[0], e[1]);
			return Crystal.Cartesian3.fromDegreesArray(d);
		}
		function cartesianToLatlng(cartesian) {
			var latlng = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
			var lat = Crystal.Math.toDegrees(latlng.latitude);
			var lng = Crystal.Math.toDegrees(latlng.longitude);
			return [lng, lat];
		}
		var tailedAttackArrowDefualParam = {
			headHeightFactor: .18,
			headWidthFactor: .3,
			neckHeightFactor: .85,
			neckWidthFactor: .15,
			tailWidthFactor: .1,
			headTailFactor: .8,
			swallowTailFactor: 1
		};
		function tailedAttackArrow(inputPoint) {
			inputPoint = dereplication(inputPoint);
			var tailWidthFactor = tailedAttackArrowDefualParam.tailWidthFactor;
			var swallowTailFactor = tailedAttackArrowDefualParam.swallowTailFactor;
			var swallowTailPnt = tailedAttackArrowDefualParam.swallowTailPnt;
			var result = {
				controlPoint: null,
				polygonalPoint: null
			};
			result.controlPoint = inputPoint;
			var t = inputPoint.length;
			if (!(2 > t)) {
				if (2 == inputPoint.length) {
					result.polygonalPoint = inputPoint;
					return result;
				}
				var o = inputPoint,
				e = o[0],
				r = o[1];
				P.PlotUtils.isClockWise(o[0], o[1], o[2]) && (e = o[1], r = o[0]);
				var n = P.PlotUtils.mid(e, r),
				g = [n].concat(o.slice(2)),
				i = getAttackArrowHeadPoints(g, e, r, tailedAttackArrowDefualParam),
				s = i[0],
				a = i[4],
				l = P.PlotUtils.distance(e, r),
				u = P.PlotUtils.getBaseLength(g),
				c = u * tailWidthFactor * swallowTailFactor;
				swallowTailPnt = P.PlotUtils.getThirdPoint(g[1], g[0], 0, c, !0);
				var p = l / u,
				h = getAttackArrowBodyPoints(g, s, a, p),
				t = h.length,
				d = [e].concat(h.slice(0, t / 2));
				d.push(s);
				var f = [r].concat(h.slice(t / 2, t));
				var newArray = [];
				f.push(a),
				d = P.PlotUtils.getQBSplinePoints(d),
				f = P.PlotUtils.getQBSplinePoints(f),
				newArray = array2Dto1D(d.concat(i, f.reverse(), [swallowTailPnt, d[0]]));
				result.polygonalPoint = Crystal.Cartesian3.fromDegreesArray(newArray);
			}
			return result;
		}
		function getAttackArrowHeadPoints(t, o, e, defaultParam) {
			var headHeightFactor = defaultParam.headHeightFactor;
			var headTailFactor = defaultParam.headTailFactor;
			var headWidthFactor = defaultParam.headWidthFactor;
			var neckWidthFactor = defaultParam.neckWidthFactor;
			var neckHeightFactor = defaultParam.neckHeightFactor;
			var r = P.PlotUtils.getBaseLength(t),
			n = r * headHeightFactor,
			g = t[t.length - 1];
			r = P.PlotUtils.distance(g, t[t.length - 2]);
			var i = P.PlotUtils.distance(o, e);
			n > i * headTailFactor && (n = i * headTailFactor);
			var s = n * headWidthFactor,
			a = n * neckWidthFactor;
			n = n > r ? r : n;
			var l = n * neckHeightFactor,
			u = P.PlotUtils.getThirdPoint(t[t.length - 2], g, 0, n, !0),
			c = P.PlotUtils.getThirdPoint(t[t.length - 2], g, 0, l, !0),
			p = P.PlotUtils.getThirdPoint(g, u, P.Constants.HALF_PI, s, !1),
			h = P.PlotUtils.getThirdPoint(g, u, P.Constants.HALF_PI, s, !0),
			d = P.PlotUtils.getThirdPoint(g, c, P.Constants.HALF_PI, a, !1),
			f = P.PlotUtils.getThirdPoint(g, c, P.Constants.HALF_PI, a, !0);
			return [d, p, g, h, f]
		}
		function array2Dto1D(array) {
			var newArray = [];
			array.forEach(function (elt) {
				newArray.push(elt[0]);
				newArray.push(elt[1]);
			});
			return newArray;
		}
		function getAttackArrowBodyPoints(t, o, e, r) {
			for (var n = P.PlotUtils.wholeDistance(t), g = P.PlotUtils.getBaseLength(t), i = g * r, s = P.PlotUtils.distance(o, e), a = (i - s) / 2, l = 0, u = [], c = [], p = 1; p < t.length - 1; p++) {
				var h = P.PlotUtils.getAngleOfThreePoints(t[p - 1], t[p], t[p + 1]) / 2;
				l += P.PlotUtils.distance(t[p - 1], t[p]);
				var d = (i / 2 - l / n * a) / Math.sin(h),
				f = P.PlotUtils.getThirdPoint(t[p - 1], t[p], Math.PI - h, d, !0),
				E = P.PlotUtils.getThirdPoint(t[p - 1], t[p], h, d, !1);
				u.push(f),
				c.push(E)
			}
			return u.concat(c)
		}
		function dereplication(array) {
			var last = array[array.length - 1];
			var change = false;
			var newArray = [];
			newArray = array.filter(function (i) {
				if (i[0] != last[0] && i[1] != last[1]) {
					return i;
				}
				change = true;
			});
			if (change) newArray.push(last);
			return newArray;
		}
		var doubleArrowDefualParam = {
			type: "doublearrow",
			headHeightFactor: .25,
			headWidthFactor: .3,
			neckHeightFactor: .85,
			fixPointCount: 4,
			neckWidthFactor: .15
		}
		function doubleArrow(inputPoint) {
			var connPoint = null;
			var tempPoint4 = null;
			var points = inputPoint;
			var result = {
				controlPoint: null,
				polygonalPoint: null
			};
			var t = inputPoint.length;
			if (!(2 > t)) {
				if (2 == t) return inputPoint;
				var o = points[0],
				e = points[1],
				r = points[2],
				t = inputPoint.length; 
				3 == t ? tempPoint4 = getTempPoint4(o, e, r) : tempPoint4 = points[3],
				3 == t || 4 == t ? connPoint = P.PlotUtils.mid(o, e) : connPoint = points[4];
				var n, g;
				P.PlotUtils.isClockWise(o, e, r) ? (n = getArrowPoints(o, connPoint, tempPoint4, !1), g = getArrowPoints(connPoint, e, r, !0)) : (n = getArrowPoints(e, connPoint, r, !1), g = getArrowPoints(connPoint, o, tempPoint4, !0));
				var i = n.length,
				s = (i - 5) / 2,
				a = n.slice(0, s),
				l = n.slice(s, s + 5),
				u = n.slice(s + 5, i),
				c = g.slice(0, s),
				p = g.slice(s, s + 5),
				h = g.slice(s + 5, i);
				c = P.PlotUtils.getBezierPoints(c);
				var d = P.PlotUtils.getBezierPoints(h.concat(a.slice(1)));
				u = P.PlotUtils.getBezierPoints(u);
				var f = c.concat(p, d, l, u);
				var newArray = array2Dto1D(f);
				result.controlPoint = [o, e, r, tempPoint4, connPoint];
				result.polygonalPoint = Crystal.Cartesian3.fromDegreesArray(newArray);
			}
			return result;
		}
		function getTempPoint4(t, o, e) {
			var r, n, g, i, s = P.PlotUtils.mid(t, o),
			a = P.PlotUtils.distance(s, e),
			l = P.PlotUtils.getAngleOfThreePoints(t, s, e);
			return l < P.Constants.HALF_PI ? (n = a * Math.sin(l), g = a * Math.cos(l), i = P.PlotUtils.getThirdPoint(t, s, P.Constants.HALF_PI, n, !1), r = P.PlotUtils.getThirdPoint(s, i, P.Constants.HALF_PI, g, !0)) : l >= P.Constants.HALF_PI && l < Math.PI ? (n = a * Math.sin(Math.PI - l), g = a * Math.cos(Math.PI - l), i = P.PlotUtils.getThirdPoint(t, s, P.Constants.HALF_PI, n, !1), r = P.PlotUtils.getThirdPoint(s, i, P.Constants.HALF_PI, g, !1)) : l >= Math.PI && l < 1.5 * Math.PI ? (n = a * Math.sin(l - Math.PI), g = a * Math.cos(l - Math.PI), i = P.PlotUtils.getThirdPoint(t, s, P.Constants.HALF_PI, n, !0), r = P.PlotUtils.getThirdPoint(s, i, P.Constants.HALF_PI, g, !0)) : (n = a * Math.sin(2 * Math.PI - l), g = a * Math.cos(2 * Math.PI - l), i = P.PlotUtils.getThirdPoint(t, s, P.Constants.HALF_PI, n, !0), r = P.PlotUtils.getThirdPoint(s, i, P.Constants.HALF_PI, g, !1)),
			r
		}
		function getArrowPoints(t, o, e, r) {
			var type = doubleArrowDefualParam.type;
			var headHeightFactor = doubleArrowDefualParam.headHeightFactor;
			var headWidthFactor = doubleArrowDefualParam.headWidthFactor;
			var neckHeightFactor = doubleArrowDefualParam.neckHeightFactor;
			var neckWidthFactor = doubleArrowDefualParam.neckWidthFactor;
			var n = P.PlotUtils.mid(t, o),
			g = P.PlotUtils.distance(n, e),
			i = P.PlotUtils.getThirdPoint(e, n, 0, .3 * g, !0),
			s = P.PlotUtils.getThirdPoint(e, n, 0, .5 * g, !0);
			i = P.PlotUtils.getThirdPoint(n, i, P.Constants.HALF_PI, g / 5, r),
			s = P.PlotUtils.getThirdPoint(n, s, P.Constants.HALF_PI, g / 4, r);
			var a = [n, i, s, e],
			l = getArrowHeadPoints(a, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor),
			u = l[0],
			c = l[4],
			p = P.PlotUtils.distance(t, o) / P.PlotUtils.getBaseLength(a) / 2,
			h = getArrowBodyPoints(a, u, c, p),
			d = h.length,
			f = h.slice(0, d / 2),
			E = h.slice(d / 2, d);
			return f.push(u),
			E.push(c),
			f = f.reverse(),
			f.push(o),
			E = E.reverse(),
			E.push(t),
			f.reverse().concat(l, E)
		}
		function getArrowHeadPoints(t, o, e) {
			var type = doubleArrowDefualParam.type;
			var headHeightFactor = doubleArrowDefualParam.headHeightFactor;
			var headWidthFactor = doubleArrowDefualParam.headWidthFactor;
			var neckHeightFactor = doubleArrowDefualParam.neckHeightFactor;
			var neckWidthFactor = doubleArrowDefualParam.neckWidthFactor;
			var r = P.PlotUtils.getBaseLength(t),
			n = r * headHeightFactor,
			g = t[t.length - 1],
			i = (P.PlotUtils.distance(o, e), n * headWidthFactor),
			s = n * neckWidthFactor,
			a = n * neckHeightFactor,
			l = P.PlotUtils.getThirdPoint(t[t.length - 2], g, 0, n, !0),
			u = P.PlotUtils.getThirdPoint(t[t.length - 2], g, 0, a, !0),
			c = P.PlotUtils.getThirdPoint(g, l, P.Constants.HALF_PI, i, !1),
			p = P.PlotUtils.getThirdPoint(g, l, P.Constants.HALF_PI, i, !0),
			h = P.PlotUtils.getThirdPoint(g, u, P.Constants.HALF_PI, s, !1),
			d = P.PlotUtils.getThirdPoint(g, u, P.Constants.HALF_PI, s, !0);
			return [h, c, g, p, d];
		}
		function getArrowBodyPoints(t, o, e, r) {
			for (var n = P.PlotUtils.wholeDistance(t), g = P.PlotUtils.getBaseLength(t), i = g * r, s = P.PlotUtils.distance(o, e), a = (i - s) / 2, l = 0, u = [], c = [], p = 1; p < t.length - 1; p++) {
				var h = P.PlotUtils.getAngleOfThreePoints(t[p - 1], t[p], t[p + 1]) / 2;
				l += P.PlotUtils.distance(t[p - 1], t[p]);
				var d = (i / 2 - l / n * a) / Math.sin(h),
				f = P.PlotUtils.getThirdPoint(t[p - 1], t[p], Math.PI - h, d, !0),
				E = P.PlotUtils.getThirdPoint(t[p - 1], t[p], h, d, !1);
				u.push(f),
				c.push(E)
			}
			return u.concat(c)
		}
		function computeModelMatrix(){
			let modelMatrix = null;
			let position = Crystal.Property.getValueOrUndefined(pEntities[pEntities.length - 1].position, Crystal.JulianDate.now(), new Crystal.Cartesian3());
			if (!Crystal.defined(position)) {
				return undefined;
			}
			let orientation = Crystal.Property.getValueOrUndefined(pEntities[pEntities.length - 1].orientation, Crystal.JulianDate.now(), new Crystal.Quaternion());
			if (!Crystal.defined(orientation)) {
				modelMatrix = Crystal.Transforms.eastNorthUpToFixedFrame(position, undefined, new Crystal.Matrix4());
			} else {
				modelMatrix = Crystal.Matrix4.fromRotationTranslation(Crystal.Matrix3.fromQuaternion(orientation, new Crystal.Matrix3()), position, new Crystal.Matrix4());
			}
			return modelMatrix;
		}
		function computeEmitterModelMatrix(){
			let hpr = Crystal.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, new Crystal.HeadingPitchRoll());
			let trs = new Crystal.TranslationRotationScale();
			trs.translation = Crystal.Cartesian3.fromElements(0.0, 0.0, 1.0, new Crystal.Cartesian3());
			trs.rotation = Crystal.Quaternion.fromHeadingPitchRoll(hpr, new Crystal.Quaternion());
			return Crystal.Matrix4.fromTranslationRotationScale(trs, new Crystal.Matrix4());
		}
		function drawResultLine(sPoint, ePoint, pColor){
			let arrPosition = [];
			arrPosition.push(sPoint);
			arrPosition.push(ePoint);
			nEntities.push(viewer.entities.add({
					name: '',
					polyline: {
						show: true,
						positions: arrPosition,
						material: pColor,
						width: 3
					}
			}));
		}
		function pointsToDegreesArray(points) {
			let degreesArray = [];
			points.map(item => {
				degreesArray.push(item[0]);
				degreesArray.push(item[1]);
			});
			return degreesArray;
		}
		function addBufferPolyogn(positions) {
			mEntities.push(viewer.entities.add({
				polygon: {
					hierarchy: new Crystal.PolygonHierarchy(Crystal.Cartesian3.fromDegreesArray(positions)),
					material: Crystal.Color.RED.withAlpha(0.6),
					classificationType: Crystal.ClassificationType.BOTH
				},
			}));
		}
	}
	function computeCirclularFlight(start, position){ //自己采的点与无人机的实时点的逻辑是不一样的。
		let property = new Crystal.SampledPositionProperty();
        for (let i = 0; i < position.length; i++) {
            if (i == 0) {
                let time = Crystal.JulianDate.addSeconds(start, i, new Crystal.JulianDate());
                let _position = Crystal.Cartesian3.fromDegrees(position[i].x, position[i].y, position[i].z);
                property.addSample(time, _position);
				mEntities.push(viewer.entities.add({
					name: '',
					position: _position,
					point: {
						pixelSize: 5,
						color: Crystal.Color.WHITE,
						outlineColor: Crystal.Color.RED,
						outlineWidth: 2,
						heightReference: Crystal.HeightReference.NONE
					}
				}));
            }
            else {
                let position_a = new Crystal.Cartesian3(property._property._values[i * 3 - 3], property._property._values[i * 3 - 2], property._property._values[i * 3 - 1]);
                let _position = Crystal.Cartesian3.fromDegrees(position[i].x, position[i].y, position[i].z);
                let positions = [Crystal.Ellipsoid.WGS84.cartesianToCartographic(position_a), Crystal.Cartographic.fromDegrees(position[i].x, position[i].y, position[i].z)];
                let a = new Crystal.EllipsoidGeodesic(positions[0], positions[1]);
                let longD = a.surfaceDistance;
                let _time = longD / 50;
                let time = Crystal.JulianDate.addSeconds(property._property._times[i - 1], _time, new Crystal.JulianDate());
				droneStopTime+=_time;
                property.addSample(time, _position);
				if(i == position.length - 1){
					mEntities.push(viewer.entities.add({
						name: '',
						position: _position,
						point: {
							pixelSize: 5,
							color: Crystal.Color.WHITE,
							outlineColor: Crystal.Color.RED,
							outlineWidth: 2,
							heightReference: Crystal.HeightReference.NONE
						}
					}));
				}
            }
        }
        return property;
	}
	this.locationCoord = function(lon, lat, alt){
		if(locEntity != null){
			viewer.entities.remove(locEntity);
		}
		locEntity = viewer.entities.add({
			name: '',
			position: Crystal.Cartesian3.fromDegrees(parseFloat(lon), parseFloat(lat), parseFloat(alt)), 
			billboard: {
				image: 'Image/location.png',
				verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
				width: 32,
				height: 32
			}
		});
		viewer.flyTo(locEntity,{
			offset : {
				heading : viewer.camera.heading,
				pitch : viewer.camera.pitch,
				range : 500
		}});
	}
	this.FlyingThroughParam = function(){
		var data = ['10px','275px'];
		flyingThroughParamIndex = layer.open({
			id: "flyingThroughParam3D",
			title: '<i class="fa fa-send-o"></i> 飞行漫游坐标点参数',
			type: 2,
			content: 'ToolBox/flyingParam.html',
			shade: false,
			area: ['260px','225px'],
			offset: data,
			cancel: function(){
				flyingThroughParamIndex = null;
			}
		});
	}
	this.RouteThroughParam = function(){
		var data = ['10px','275px'];
		routeThroughParamIndex = layer.open({
			id: "routeThroughParam3D",
			title: '<i class="fa fa-send-o"></i> 路径规划参数配置',
			type: 2,
			content: 'ToolBox/routeParam.html',
			shade: false,
			area: ['260px','283px'],
			offset: data,
			cancel: function(){
				routeThroughParamIndex = null;
			}
		});
	}
	this.BookmarkParam = function(){
		var data = ['10px','275px'];
		bookmarkParamIndex = layer.open({
			id: "bookmarkParam3D",
			title: '<i class="fa fa-edit"></i> 标记类型',
			type: 2,
			content: 'ToolBox/bookmarkParam.html',
			shade: false,
			area: ['260px','195px'],
			offset: data,
			cancel: function(){
				bookmarkParamIndex = null;
			}
		});
	}
	function printscreenScene(){
		var image = new Image();
		viewer.render();
		image = viewer.scene.canvas.toDataURL("image/png");
		saveFile(image);
	}
	function convertImageToCanvas(image) {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext("2d").drawImage(image, 0, 0);
        return canvas;
    }
	function saveFile(base64data) {
        var image = new Image();
        image.src = base64data;
        image.onload = function() {
            var canvas = convertImageToCanvas(image);
            url = canvas.toDataURL("image/jpeg");
            var a = document.createElement('a');
            var event = new MouseEvent('click');
            a.download = (new Date()).getTime() + ".jpg";
            a.href = url;
            a.dispatchEvent(event);
        }
    };
	function RequestTianDiTuPlan(strJson, strStyle){
		let orig = '';
		let dest = '';
		let mid = '';
		for(let i = 0; i< strJson.length; i++){
			if(i==0){
				orig = strJson[0].x + ',' + strJson[0].y;
			}
			else if(i==strJson.length-1){
				dest = strJson[strJson.length-1].x + ',' + strJson[strJson.length-1].y;
			}
			else{
				mid = strJson[i].x + ',' + strJson[i].y + ';';
			}
		}
		mid = mid.substr(0,mid.length-1);
		let style = strStyle.styleValue;
		let isTrueMid = strStyle.isTrueMid;
		let strUrl = null;
		if(isTrueMid){
			strUrl = 'http://api.tianditu.gov.cn/drive?postStr={"orig":"'+orig+'","dest":"'+dest+'","mid":"'+mid+'","style":"'+style+'"}&type=search&tk=2ca23b42d039bb3facdcae2f61ab9c82';
		}
		else{
			strUrl = 'http://api.tianditu.gov.cn/drive?postStr={"orig":"'+orig+'","dest":"'+dest+'","style":"'+style+'"}&type=search&tk=2ca23b42d039bb3facdcae2f61ab9c82';
		}
		const xhr = new XMLHttpRequest();
	    var geoJson = strUrl;
	    xhr.responseType = 'text/xml';
	    xhr.open('get', geoJson, true);
	    xhr.onload = function () {
		   if (xhr.status >= 200 && xhr.status < 300) {
			 geoJson = xhr.response;
			 let returnJson = xmlStrToJsonObj(geoJson);
			 let arrJson = returnJson.split(';');
			 let arrResult = [];
			 let routePath = [];
			 for(let i = 0;i < arrJson.length;i++){
				 let temp = arrJson[i].split(',');
				 if(temp.length == 2){
					 let time = i * 10.0;
					 arrResult.push(time);
					 arrResult.push(parseFloat(temp[0]));
					 arrResult.push(parseFloat(temp[1]));
					 arrResult.push(strJson[0].z); 
					 routePath.push(parseFloat(temp[0]));
					 routePath.push(parseFloat(temp[1]));
				 }
			 }
			 let czml = [
				{
				  id: 'document',
				  name: '',
				  version: '1.0',
				  clock: {
					interval: '2012-08-04T16:00:00Z/2012-08-04T16:06:00Z',//规定时间范围
					currentTime: '2012-08-04T16:00:00Z',//当前时间
					multiplier: 1,
				  },
				},
				{
				  id: 'Vehicle',
				  name: '',
				  position: { 
					interpolationAlgorithm: 'LINEAR',
					forwardExtrapolationType: 'HOLD',
					epoch: '2012-08-04T16:00:00Z',
					cartographicDegrees: [],
				  },
				  model: {
					gltf: 'Model/GroundVehicle.glb',
					minimumPixelSize: 40,
					maximumScale: 1.5,
				  },
				  orientation: {
					velocityReference: '#position',
				  },
				},
			  ];
			 czml[1].position.cartographicDegrees = arrResult;
			 if(style == '3'){
				 czml[1].model.gltf = 'Model/Man.glb';
			 }
			 czmlRoutedataSource = new Crystal.CzmlDataSource.load(czml);
			 viewer.dataSources.add(czmlRoutedataSource);
			 mEntities.push(viewer.entities.add({
					name: '',
					corridor: {                    
						positions: Crystal.Cartesian3.fromDegreesArray(routePath),
						material: Crystal.Color.GREEN.withAlpha(0.8),
						width: 5.0,
						outline : true,
						outlineColor : Crystal.Color.RED
					}
				}));
			 viewer.flyTo(mEntities[mEntities.length - (strJson.length+2)], {
				offset : {
					heading : Crystal.Math.toRadians(0.0),
					pitch : Crystal.Math.toRadians(-25),
					range : 300
				}
			 });
			 viewer.clock.shouldAnimate = true;
		   } else {
			 throw new Error(xhr.statusText);
		   }
	   };
	   xhr.send();
	}
	function xmlStrToJsonObj(xmlStr) {
		var xmlObj = xmlStrToXmlObj(xmlStr);
		var jsonObj = null;
		if (xmlObj.childNodes.length > 0) {
			jsonObj = xmlObjToJsonObj(xmlObj);
		}
		return jsonObj;
	}
	function xmlStrToXmlObj(xmlStr) {
		var xmlObj = {};
		if (document.all) {
			var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
			xmlDom.loadXML(xmlStr);
			xmlObj = xmlDom;
		} else {
			xmlObj = new DOMParser().parseFromString(xmlStr, "text/xml");
		}
		return xmlObj;
	 
	}	 
	function xmlObjToJsonObj(xmlDoc) {
		let elements = xmlDoc.getElementsByTagName("result");
		let nodeValue = elements[0].getElementsByTagName("routelatlon")[0].innerHTML;
		return nodeValue;
	}
	function DeleteFlyingPathInside(){
		viewer.animation.container.style.visibility = 'hidden';
		viewer.timeline.container.style.visibility = 'hidden';
		let distanceLegendDiv = document.getElementById('distanceLegendDiv').style;
		distanceLegendDiv.position = 'absolute';
		distanceLegendDiv.left = '0px';
		distanceLegendDiv.bottom = '0px';
		let envCenterInfo = document.getElementById('envCenterInfo').style;
		envCenterInfo.left = '0px';
		envCenterInfo.right = '0px';
		envCenterInfo.bottom = '0px';
		viewer.entities.remove(flyingEntity);
		flyingEntity = null;
		for (var i = 0;i < mEntities.length;i++)
		{
			viewer.entities.remove(mEntities[i]);
		}
		mEntities = [];
	}
	this.CloseRouteThroughParam = function(){
		if(routeThroughParamIndex!=null){
			layer.close(routeThroughParamIndex);
		}
	}
	this.CreateCzmlRoutePath = function(vValue, vStyle){
		if(czmlRoutedataSource != null){
			czmlRoutedataSource.then(function(dataSource){
				let tempEntity = dataSource.entities.getById("Vehicle");
				dataSource.entities.remove(tempEntity);
			});
			czmlRoutedataSource = null;
		}
		for (var i = 0;i < mEntities.length;i++)
		{
			viewer.entities.remove(mEntities[i]);
		}
		mEntities = [];
		let routePath = [];
		for(let i =0; i< vValue.length;i++){
			routePath.push(vValue[i].x);
			routePath.push(vValue[i].y);
			if(i==0){
				mEntities.push(viewer.entities.add({
					name: '',
					position: Crystal.Cartesian3.fromDegrees(vValue[i].x, vValue[i].y, vValue[i].z), 
					billboard: {
						image: 'Image/start.png',
						verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
						width: 32,
						height: 32
					}
				}));
			}
			else if(i==vValue.length-1){
				mEntities.push(viewer.entities.add({
					name: '',
					position: Crystal.Cartesian3.fromDegrees(vValue[i].x, vValue[i].y, vValue[i].z), 
					billboard: {
						image: 'Image/end.png',
						verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
						width: 32,
						height: 32
					}
				}));
			}
			else{
				mEntities.push(viewer.entities.add({
					name: '',
					position: Crystal.Cartesian3.fromDegrees(vValue[i].x, vValue[i].y, vValue[i].z), 
					billboard: {
						image: 'Image/mid.png',
						verticalOrigin:Crystal.VerticalOrigin.BOTTOM,
						width: 32,
						height: 32
					}
				}));
			}
		}
		mEntities.push(viewer.entities.add({
			name: '',
			corridor: {                    
				positions: Crystal.Cartesian3.fromDegreesArray(routePath),
				material: Crystal.Color.YELLOW.withAlpha(0.8),
				width: 5.0,
				outline : true,
				outlineColor : Crystal.Color.RED
			}
		}));
		RequestTianDiTuPlan(vValue, vStyle);
	}
	this.DeleteRoutePath = function(){
		if(czmlRoutedataSource != null){
			czmlRoutedataSource.then(function(dataSource){
				let tempEntity = dataSource.entities.getById("Vehicle");
				dataSource.entities.remove(tempEntity);
			});
			czmlRoutedataSource = null;
		}
		for (var i = 0;i < mEntities.length;i++)
		{
			viewer.entities.remove(mEntities[i]);
		}
		mEntities = [];
	}
	this.DeleteFlyingPath = function(){
		viewer.animation.container.style.visibility = 'hidden';
		viewer.timeline.container.style.visibility = 'hidden';
		let distanceLegendDiv = document.getElementById('distanceLegendDiv').style;
		distanceLegendDiv.position = 'absolute';
		distanceLegendDiv.left = '0px';
		distanceLegendDiv.bottom = '0px';
		let envCenterInfo = document.getElementById('envCenterInfo').style;
		envCenterInfo.left = '0px';
		envCenterInfo.right = '0px';
		envCenterInfo.bottom = '0px';
		viewer.entities.remove(flyingEntity);
		flyingEntity = null;
		this.measureClear();
	}
	this.CreateFlyingPath = function(vValue){
		viewer.animation.container.style.visibility = 'visible';
		viewer.timeline.container.style.visibility = 'visible';
		let distanceLegendDiv = document.getElementById('distanceLegendDiv').style;
		distanceLegendDiv.position = 'absolute';
		distanceLegendDiv.left = '170px';
		distanceLegendDiv.bottom = '25px';
		let envCenterInfo = document.getElementById('envCenterInfo').style;
		envCenterInfo.left = '170px';
		envCenterInfo.right = '50px';
		envCenterInfo.bottom = '25px';
		let start = Crystal.JulianDate.fromDate(new Date());
		let stop = Crystal.JulianDate.addSeconds(start, 360, new Crystal.JulianDate());
		let current = Crystal.JulianDate.addSeconds(start, 200, new Crystal.JulianDate());
		viewer.clock.startTime = start.clone();
		viewer.clock.stopTime = stop.clone();
		viewer.clock.currentTime = current.clone();
		viewer.clock.clockRange = Crystal.ClockRange.LOOP_STOP;
		viewer.clock.multiplier = 1;
		viewer.clock.canAnimate = true;
		viewer.timeline.zoomTo(start, stop);
		let __position = computeCirclularFlight(start.clone(), vValue);
		flyingEntity = viewer.entities.add({
			availability: new Crystal.TimeIntervalCollection([new Crystal.TimeInterval({
				start: start,
				stop: stop
			})]),
			position: __position,
			orientation: new Crystal.VelocityOrientationProperty(__position),
			model: {
				uri: 'gzznGIS/Model/Drone.glb',
				scale: 1,
				minimumPixelSize: 64
			},
			path: {
				resolution: 1,
				material: new Crystal.PolylineGlowMaterialProperty({
					glowPower: 0.1,
					color: Crystal.Color.YELLOW
				}),
				width: 10,
				show:true
			}
		});
		flyingEntity.position.setInterpolationOptions({
			interpolationDegree : 5,
			interpolationAlgorithm : Crystal.LagrangePolynomialApproximation
		});
		viewer.camera.flyTo({
			destination : new Crystal.Cartesian3(__position._property._values[0], __position._property._values[1], __position._property._values[2]),
			orientation : {
				heading : viewer.camera.heading,
				pitch : viewer.camera.pitch,
				roll : viewer.camera.roll
			},
			complete : function(){
				viewer.trackedEntity = flyingEntity;
			}
		});
	}
	this.OpenDepthTest = function(vValue){
		viewer.scene.globe.depthTestAgainstTerrain = vValue;
	}
	this.Screenshot = function(){
		var image = new Image();
		viewer.render();
		image = viewer.scene.canvas.toDataURL("image/png");
		var lon = Crystal.Math.toDegrees(viewer.camera.positionCartographic.longitude);
		var lat = Crystal.Math.toDegrees(viewer.camera.positionCartographic.latitude);
		var alt = viewer.camera.positionCartographic.height
		var returnObj = {};
		returnObj.image = image;
		returnObj.x = lon;
		returnObj.y = lat;
		returnObj.z = alt;
		returnObj.heading = viewer.camera.heading;
		returnObj.pitch = viewer.camera.pitch;
		returnObj.roll = viewer.camera.roll;
		return returnObj;
	}
	this.entityRename = function(id, name){
		var tempEntity = viewer.entities.getById(id);
		tempEntity._name = name;
	}
	this.entityRemove = function(id){
		for(let i = 0;i < nEntities.length;i++){
			if(nEntities[i]._id == id){
				viewer.entities.remove(nEntities[i]);
				if((i+1) == nEntities.length - 1){
					nEntities[i+1]._show = false;
				}
				break;
			}
		}
	}
	function clearRoute(){
		if(czmlRoutedataSource != null){
			czmlRoutedataSource.then(function(dataSource){
				let tempEntity = dataSource.entities.getById("Vehicle");
				dataSource.entities.remove(tempEntity);
			});
			czmlRoutedataSource = null;
		}
		for (var i = 0;i < mEntities.length;i++)
		{
			viewer.entities.remove(mEntities[i]);
		}
		mEntities = [];
	}
	function clearParticle(){
		for(let i = 0 ;i < particleSystem.length;i++){
			viewer.scene.primitives.remove(particleSystem[i]);
		}
		for(let i = 0 ;i < pEntities.length;i++){
			viewer.entities.remove(pEntities[i]);
		}
		particleSystem = [];
		pEntities = [];
	}
	this.particleSwitch = function(pParam){
		let collection = viewer.scene.postProcessStages;
		if(pParam.Data == 3){
			if(particleRain == null){
				particleRain = Crystal.PostProcessStageLibrary.createRainStage();
				collection.add(particleRain);
				viewer.scene.skyAtmosphere.hueShift = -0.8;
				viewer.scene.skyAtmosphere.saturationShift = -0.7;
				viewer.scene.skyAtmosphere.brightnessShift = -0.33;
				viewer.scene.fog.density = 0.001;
				viewer.scene.fog.minimumBrightness = 0.8;
			}
			else{
				collection.remove(particleRain);
				particleRain = null;
				viewer.scene.skyAtmosphere.hueShift = 0.0;
				viewer.scene.skyAtmosphere.saturationShift = 0.0;
				viewer.scene.skyAtmosphere.brightnessShift = 0.0;
				viewer.scene.fog.density = 2.0e-4;
				viewer.scene.fog.minimumBrightness = 0.03;
			}
		}
		else if(pParam.Data == 4){
			if(particleFog == null){
				particleFog = Crystal.PostProcessStageLibrary.createFogStage();
				collection.add(particleFog);
				viewer.scene.skyAtmosphere.hueShift = -0.8;
				viewer.scene.skyAtmosphere.saturationShift = -0.7;
				viewer.scene.skyAtmosphere.brightnessShift = -0.33;
				viewer.scene.fog.density = 0.001;
				viewer.scene.fog.minimumBrightness = 0.8;
			}
			else{
				collection.remove(particleFog);
				particleFog = null;
				viewer.scene.skyAtmosphere.hueShift = 0.0;
				viewer.scene.skyAtmosphere.saturationShift = 0.0;
				viewer.scene.skyAtmosphere.brightnessShift = 0.0;
				viewer.scene.fog.density = 2.0e-4;
				viewer.scene.fog.minimumBrightness = 0.03;
			}
		}
		else if(pParam.Data == 5){
			if(particleSnow == null){
				particleSnow = Crystal.PostProcessStageLibrary.createSnowStage();
				collection.add(particleSnow);
				viewer.scene.skyAtmosphere.hueShift = -0.8;
				viewer.scene.skyAtmosphere.saturationShift = -0.7;
				viewer.scene.skyAtmosphere.brightnessShift = -0.33;
				viewer.scene.fog.density = 0.001;
				viewer.scene.fog.minimumBrightness = 0.8;
			}
			else{
				collection.remove(particleSnow);
				particleSnow = null;
				viewer.scene.skyAtmosphere.hueShift = 0.0;
				viewer.scene.skyAtmosphere.saturationShift = 0.0;
				viewer.scene.skyAtmosphere.brightnessShift = 0.0;
				viewer.scene.fog.density = 2.0e-4;
				viewer.scene.fog.minimumBrightness = 0.03;
			}
		}
	}
	this.QueryLocation = function(vValue,vFlag){
		var vDataSource;
		var cFlag = false;
		for(var i = 0;i<vFlag.length;i++){
			var ObjFlag = vFlag[i];
			if(ObjFlag == "urbanDangerousDataSource") {
				for(let j=0;j<urbanDangerousDataSource.length;j++){
					var entities = urbanDangerousDataSource[j].entities.values;
					for(let z=0;z<entities.length;z++){
					var entity = entities[z];
						if(entity._name.indexOf(vValue) != -1){
							viewer.selectedEntity = entity;
							viewer.flyTo(entity,{
								offset : {
									heading : Crystal.Math.toRadians(0.0),
									pitch : Crystal.Math.toRadians(-90),
									range : 800
							}});
							cFlag = true;
							break;
						}
					}
					if(cFlag){
						break;
					}
				}
			}
			else if(ObjFlag == "dangerousDataSource"){
				for(let j=0;j<dangerousDataSource.length;j++){
					var entities = dangerousDataSource[j].entities.values;
					for(let z=0;z<entities.length;z++){
					var entity = entities[z];
						if(entity._name.indexOf(vValue) != -1){
							viewer.selectedEntity = entity;
							viewer.flyTo(entity,{
								offset : {
									heading : Crystal.Math.toRadians(0.0),
									pitch : Crystal.Math.toRadians(-90),
									range : 800
							}});
							cFlag = true;
							break;
						}
					}
					if(cFlag){
						break;
					}
				}
			}
		}
	}
	this.sunlightAnalysis = function(){
		if(!switchSunlight){
			viewer.scene.globe.enableLighting = true;
		    viewer.shadows = true;
		}
		else{
			viewer.scene.globe.enableLighting = false;
			viewer.shadows = false;
		}
		switchSunlight = !switchSunlight;
	}
	this.dataSourcesViewer = function (ObjFlag,pCheck){
		if(pCheck){
			if(ObjFlag == "gzLineDataSource") {
				loadGzPolyline();
			}
			else if(ObjFlag == "oldTreeDataSource") { //古树名木
				oldTreeImageProvider();
			}
			else if(ObjFlag == "tradeTreeDataSource") { //行道树
				tradeTreeImageProvider();
			}
			else if(ObjFlag == "bigTreeDataSource") { //大树
				bigTreeImageProvider();
			}
			else if(ObjFlag == "reservoirDataSource") { //蓄水池
				reservoirImageProvider();
			}
			else if(ObjFlag == "observatoryDataSource") { //瞭望台
				observatoryImageProvider();
			}
			else if(ObjFlag == "fireFocusDataSource") { //重点防护设施
				fireFocusImageProvider();
			}
			else if(ObjFlag == "parkVideoDataSource") { //公园视频
				parkVideoImageProvider();
			}
			else if(ObjFlag == "fireVideoDataSource") { //防火视频
				fireVideoImageProvider();
			}
			else if(ObjFlag == "urbanDangerousDataSource") { //城管危化视频
				urbanDangerousImageProvider();
			}
			else if(ObjFlag == "dangerousDataSource") { //危化视频
				dangerousImageProvider();
			}
			else if(ObjFlag == "broadcastDataSource") { //广播报警
				broadcastImageProvider();
			}
			else if(ObjFlag == "fireMantleDataSource") { //防火林带
				fireMantleImageProvider();
			}
			else if(ObjFlag == "firefightingTeamDataSource") { //救火队伍
				addPromiseFirefightingTeam();
			}
			else if(ObjFlag == "fireExpertsDataSource") { //救火专家
				addPromiseFireExperts();
			}
			else if(ObjFlag == "IoTDataSource") { //物联网  
				addPromiseIoT();
			}
			else if(ObjFlag == "droneDataSource") { //无人机
				addPromiseDrone();
			}
			else if(ObjFlag == "lotVedioDataSource") { //摄像头
				addPromiseLotVedio();
			}
			else if(ObjFlag == "shelterDataSource") { //避难场所
				addPromiseShelter();
			}
			else if(ObjFlag == "cityParkDataSource") { //城市公园
				cityParkImageProvider();
			}
			else if(ObjFlag == "forestParkDataSource") { //森林公园
				forestParkImageProvider();
			}
			else if(ObjFlag == "wetlandParkDataSource") { //湿地公园
				wetlandParkImageProvider();
			}
			else if(ObjFlag == "aviationTempDataSource") { //临时起降点
				aviationTempProvider();
			}
			else if(ObjFlag == "aviationBaseDataSource") { //航空消防基地
				aviationBaseProvider();
			}
			else if(ObjFlag == "aviationWaterDataSource") { //直升机取水点
				aviationWaterProvider();
			}
		}
		else{
			if(ObjFlag == "gzLineDataSource") {
				viewer.dataSources.remove(gzLineDataSource);
			}
			else if(ObjFlag == "oldTreeDataSource") {
				viewer.dataSources.remove(oldTreeDataSource);
			}
			else if(ObjFlag == "tradeTreeDataSource") {
				viewer.dataSources.remove(tradeTreeDataSource);
			}
			else if(ObjFlag == "bigTreeDataSource") {
				viewer.dataSources.remove(bigTreeDataSource);
			}
			else if(ObjFlag == "reservoirDataSource") {
				viewer.dataSources.remove(reservoirDataSource);
			}
			else if(ObjFlag == "observatoryDataSource") {
				viewer.dataSources.remove(observatoryDataSource);
			}
			else if(ObjFlag == "fireFocusDataSource") {
				viewer.dataSources.remove(fireFocusDataSource);
			}
			else if(ObjFlag == "parkVideoDataSource") {
				viewer.dataSources.remove(parkVideoDataSource);
			}
			else if(ObjFlag == "fireVideoDataSource") {
				viewer.dataSources.remove(fireVideoDataSource);
			}
			else if(ObjFlag == "urbanDangerousDataSource") {
				for(let i=0;i<urbanDangerousDataSource.length;i++){
					viewer.dataSources.remove(urbanDangerousDataSource[i]);
				}
				urbanBool = false;
			}
			else if(ObjFlag == "dangerousDataSource") {
				for(let i=0;i<dangerousDataSource.length;i++){
					viewer.dataSources.remove(dangerousDataSource[i]);
				}
				dangerousBool = false;
			}
			else if(ObjFlag == "broadcastDataSource") {
				viewer.dataSources.remove(broadcastDataSource);
			}
			else if(ObjFlag == "fireMantleDataSource") {
				viewer.dataSources.remove(fireMantleDataSource);
			}
			else if(ObjFlag == "firefightingTeamDataSource") {
				viewer.dataSources.remove(firefightingTeamDataSource);
			}
			else if(ObjFlag == "fireExpertsDataSource") { 
				viewer.dataSources.remove(fireExpertsDataSource);
			}
			else if(ObjFlag == "IoTDataSource") {
				viewer.dataSources.remove(IoTDataSource);
			}
			else if(ObjFlag == "droneDataSource") {
				viewer.dataSources.remove(droneDataSource);
			}
			else if(ObjFlag == "lotVedioDataSource") {
				viewer.dataSources.remove(lotVedioDataSource);
			}
			else if(ObjFlag == "shelterDataSource") {
				viewer.dataSources.remove(shelterDataSource);
			}
			else if(ObjFlag == "cityParkDataSource") {
				viewer.dataSources.remove(cityParkDataSource);
			}
			else if(ObjFlag == "forestParkDataSource") {
				viewer.dataSources.remove(forestParkDataSource);
			}
			else if(ObjFlag == "wetlandParkDataSource") {
				viewer.dataSources.remove(wetlandParkDataSource);
			}
			else if(ObjFlag == "aviationTempDataSource") {
				viewer.dataSources.remove(aviationTempDataSource);
			}
			else if(ObjFlag == "aviationBaseDataSource") {
				viewer.dataSources.remove(aviationBaseDataSource);
			}
			else if(ObjFlag == "aviationWaterDataSource") {
				viewer.dataSources.remove(aviationWaterDataSource);
			}
		}
	}
	this.lookAt = function(ObjFlag){
		if(ObjFlag == "gzLineDataSource") {
			viewer.flyTo(gzLineDataSource);
		}
		else if(ObjFlag == "oldTreeDataSource") {
			viewer.flyTo(oldTreeDataSource);
		}
		else if(ObjFlag == "tradeTreeDataSource") {
			viewer.flyTo(tradeTreeDataSource);
		}
		else if(ObjFlag == "bigTreeDataSource") {
			viewer.flyTo(bigTreeDataSource);
		}
		else if(ObjFlag == "reservoirDataSource") {
			viewer.flyTo(reservoirDataSource);
		}
		else if(ObjFlag == "observatoryDataSource") {
			viewer.flyTo(observatoryDataSource);
		}
		else if(ObjFlag == "fireFocusDataSource") {
			viewer.flyTo(fireFocusDataSource);
		}
		else if(ObjFlag == "parkVideoDataSource") {
			viewer.flyTo(parkVideoDataSource);
		}
		else if(ObjFlag == "fireVideoDataSource") {
			viewer.flyTo(fireVideoDataSource);
		}
		else if(ObjFlag == "broadcastDataSource") {
			viewer.flyTo(broadcastDataSource);
		}
		else if(ObjFlag == "fireMantleDataSource") {
			viewer.flyTo(fireMantleDataSource);
		}
		else if(ObjFlag == "firefightingTeamDataSource") {
			viewer.flyTo(firefightingTeamDataSource);
		}
		else if(ObjFlag == "fireExpertsDataSource") { 
			viewer.flyTo(fireExpertsDataSource);
		}
		else if(ObjFlag == "IoTDataSource") {
			viewer.flyTo(IoTDataSource);
		}
		else if(ObjFlag == "droneDataSource") {
			viewer.flyTo(droneDataSource);
		}
		else if(ObjFlag == "lotVedioDataSource") {
			viewer.flyTo(lotVedioDataSource);
		}
		else if(ObjFlag == "shelterDataSource") {
			viewer.flyTo(shelterDataSource);
		}
		else if(ObjFlag == "cityParkDataSource") {
			viewer.flyTo(cityParkDataSource);
		}
		else if(ObjFlag == "forestParkDataSource") {
			viewer.flyTo(forestParkDataSource);
		}
		else if(ObjFlag == "wetlandParkDataSource") {
			viewer.flyTo(wetlandParkDataSource);
		}
	}
	function addPromiseGzHazardousPoint(){
		Crystal.GeoJsonDataSource.load(geoJsonGzPoint,{clampToGround: true}).then(function (dataSource) {
			gzPointDataSource = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			for(var i = 0; i < entities.length; i++){
				var entity = entities[i];
				entity.billboard.width=24;
				entity.billboard.height=24;
				entity.billboard.image = 'gzznGIS/Image/u97.png';
			}
		});
	};
	function addPromiseGzPoint(){
		Crystal.GeoJsonDataSource.load(geoJsonGzPoint,{clampToGround: true}).then(function (dataSource) {
			gzPointDataSource = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			for(var i = 0; i < entities.length; i++){
				var entity = entities[i];
				entity.billboard = undefined;						
				entity.label = new Crystal.LabelGraphics({
					text: entity._name,
					font: '18px sans-serif',
					style: Crystal.LabelStyle.FILL,
					outlineWidth: 1,
					fillColor: Crystal.Color.BLACK,
					verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
					pixelOffset: new Crystal.Cartesian2(0, 0),
					heightReference: Crystal.HeightReference.NONE,
					showBackground: false,
					backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
				});
			}
		});
	};
	function addgeoJsonGuangZhou(){
		Crystal.GeoJsonDataSource.load(geoJsonGuangZhou,{clampToGround: true}).then(function (dataSource) {
		guangZhouDataSource = dataSource;
		viewer.dataSources.add(dataSource);
		var entities = dataSource.entities.values;
		for(var i = 0; i < entities.length; i++){
			var entity = entities[i];
			if(entity._name == "越秀区"){
				entity.polygon.material = Crystal.Color.fromCssColorString('rgba(177,204,145,0.8)');
			}
			else if(entity._name=="天河区"){
				entity.polygon.material = Crystal.Color.fromCssColorString('rgba(96,163,181,0.8)');
			}
			else if(entity._name=="海珠区"){
				entity.polygon.material = Crystal.Color.fromCssColorString('rgba(247,122,45,0.8)');
			}
			else if(entity._name=="白云区"){
				entity.polygon.material = Crystal.Color.fromCssColorString('rgba(250,250,100,0.8)');
			}
			else if(entity._name=="黄埔区"){
				entity.polygon.material = Crystal.Color.fromCssColorString('rgba(252,164,63,0.8)');
			}
			else if(entity._name=="番禺区"){
				entity.polygon.material = Crystal.Color.fromCssColorString('rgba(215,227,125,0.8)');
			}
			else if(entity._name=="花都区"){
				entity.polygon.material = Crystal.Color.fromCssColorString('rgba(40,146,199,0.8)');	
			}
			else if(entity._name=="南沙区"){
				entity.polygon.material = Crystal.Color.fromCssColorString('rgba(232,16,20,0.8)');
			}
			else if(entity._name=="从化区"){
				entity.polygon.material = Crystal.Color.fromCssColorString('rgba(242,77,31,0.8)');
			}
			else if(entity._name=="增城区"){
				entity.polygon.material = Crystal.Color.fromCssColorString('rgba(252,207,81,0.8)');
			}
			else if(entity._name=="荔湾区"){
				entity.polygon.material = Crystal.Color.fromCssColorString('rgba(140,184,164,0.8)');
			}
		}});
		viewer.flyTo(guangZhouDataSource);
	};
	this.showArea = function(vValue){
		if(guangZhouDataSource != null){
			viewer.dataSources.remove(guangZhouDataSource);
		}
		if(gzPointDataSource != null){
			viewer.dataSources.remove(gzPointDataSource);
		}
		if(geoJsonAreaDataSource != null){
			viewer.dataSources.remove(geoJsonAreaDataSource);
		}
		if(vValue == '广州市'){
			addgeoJsonGuangZhou();
			addPromiseGzPoint();
		}
		else if(vValue == '白云区'){
			Crystal.GeoJsonDataSource.load(geoJsonBaiyun,{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				geoJsonAreaDataSource = dataSource;
				var entities = dataSource.entities.values;
				for (var i = 0; i < entities.length; i++) {
					var entity = entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(250,250,100,0.8)');
				}
				viewer.flyTo(dataSource);
			});
		}
		else if(vValue == '越秀区'){
			Crystal.GeoJsonDataSource.load(geoJsonYueXiu,{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				geoJsonAreaDataSource = dataSource;
				var entities = dataSource.entities.values;
				for (var i = 0; i < entities.length; i++) {
					var entity = entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(177,204,145,0.8)');
				}
				viewer.flyTo(dataSource);
			});
		}
		else if(vValue == '天河区'){
			Crystal.GeoJsonDataSource.load(geoJsonTianHe,{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				geoJsonAreaDataSource = dataSource;
				var entities = dataSource.entities.values;
				for (var i = 0; i < entities.length; i++) {
					var entity = entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(96,163,181,0.8)');
				}
				viewer.flyTo(dataSource);
			});
		}
		else if(vValue == '海珠区'){
			Crystal.GeoJsonDataSource.load(geoJsonHaizhu,{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				geoJsonAreaDataSource = dataSource;
				var entities = dataSource.entities.values;
				for (var i = 0; i < entities.length; i++) {
					var entity = entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(247,122,45,0.8)');
				}
				viewer.flyTo(dataSource);
			});
		}
		else if(vValue == '黄埔区'){
			Crystal.GeoJsonDataSource.load(geoJsonHuangPu,{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				geoJsonAreaDataSource = dataSource;
				var entities = dataSource.entities.values;
				for (var i = 0; i < entities.length; i++) {
					var entity = entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(252,164,63,0.8)');
				}
				viewer.flyTo(dataSource);
			});
		}
		else if(vValue == '番禺区'){
			Crystal.GeoJsonDataSource.load(geoJsonPanyu,{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				geoJsonAreaDataSource = dataSource;
				var entities = dataSource.entities.values;
				for (var i = 0; i < entities.length; i++) {
					var entity = entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(215,227,125,0.8)');
				}
				viewer.flyTo(dataSource);
			});
		}
		else if(vValue == '花都区'){
			Crystal.GeoJsonDataSource.load(geoJsonHuaDu,{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				geoJsonAreaDataSource = dataSource;
				var entities = dataSource.entities.values;
				for (var i = 0; i < entities.length; i++) {
					var entity = entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(40,146,199,0.8)');	
				}
				viewer.flyTo(dataSource);
			});
		}
		else if(vValue == '南沙区'){
			Crystal.GeoJsonDataSource.load(geoJsonNianSha,{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				geoJsonAreaDataSource = dataSource;
				var entities = dataSource.entities.values;
				for (var i = 0; i < entities.length; i++) {
					var entity = entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(232,16,20,0.8)');
				}
				viewer.flyTo(dataSource);
			});
		}
		else if(vValue == '从化区'){
			Crystal.GeoJsonDataSource.load(geoJsonCongHua,{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				geoJsonAreaDataSource = dataSource;
				var entities = dataSource.entities.values;
				for (var i = 0; i < entities.length; i++) {
					var entity = entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(242,77,31,0.8)');
				}
				viewer.flyTo(dataSource);
			});
		}
		else if(vValue == '增城区'){
			Crystal.GeoJsonDataSource.load(geoJsonZhenChen,{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				geoJsonAreaDataSource = dataSource;
				var entities = dataSource.entities.values;
				for (var i = 0; i < entities.length; i++) {
					var entity = entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(252,207,81,0.8)');
				}
				viewer.flyTo(dataSource);
			});
		}
		else if(vValue == '荔湾区'){
			Crystal.GeoJsonDataSource.load(geoJsonLiwan,{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				geoJsonAreaDataSource = dataSource;
				var entities = dataSource.entities.values;
				for (var i = 0; i < entities.length; i++) {
					var entity = entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(140,184,164,0.8)');
				}
				viewer.flyTo(dataSource);
			});
		}
	}
	var vectorDatasource = null;
	/**
	vectorDatasource = new Crystal.Crystal3DTileset({
				url : 'Model/modelResult/tileset.json',
				maximumScreenSpaceError : 2,
				maximumNumberOfLoadedTiles : 1000,
				show : true
	});
	var VectorBuilding = viewer.scene.primitives.add(vectorDatasource);
	VectorBuilding.style = new Crystal.Crystal3DTileStyle({
		color: {
			conditions: [
				['${height} >= 80', 'rgba(45, 0, 75, 0.5)'],
				['${height} >= 70', 'rgb(102, 71, 151)'],
				['${height} >= 50', 'rgb(170, 162, 204)'],
				['${height} >= 40', 'rgb(224, 226, 238)'],
				['${height} >= 30', 'rgb(252, 230, 200)'],
				['${height} >= 20', 'rgb(248, 176, 87)'],
				['${height} >= 10', 'rgb(198, 106, 11)'],
				['true', 'rgb(127, 59, 8)']]
		}
	}); */
	viewer.scene.globe.depthTestAgainstTerrain = false;
	this.terrainTransparency = function(){
		var data = ['10px','275px'];
		terrainTransparencyIndex = layer.open({
			id: "terrainTransparency3D",
			title: '<i class="fa fa-edit"></i> 地表透明度',
			type: 2,
			content: 'ToolBox/transparency.html',
			shade: false,
			area: ['260px','195px'],
			offset: data,
			cancel: function(){
				terrainTransparencyIndex = null;
			}
		});
	}
	this.changeTransparency = function(value){
		if(TerrainTransparency == null){
			TerrainTransparency = new Crystal.TerrainTransparency(viewer);
		}
		TerrainTransparency.terrainTransparency = parseFloat(value);
	}
	this.terrainExcavation = function(value){
		var data = ['10px','275px'];
		terrainExcavationIndex = layer.open({
			id: "terrainExcavation3D",
			title: '<i class="fa fa-edit"></i> 地形开挖参数',
			type: 2,
			content: 'ToolBox/excavationParam.html',
			shade: false,
			area: ['260px','195px'],
			offset: data,
			cancel: function(){
				terrainExcavationIndex = null;
			}
		});
	}
	this.terrainClipPlanClear = function(){
		if(terrainClipPlan!=null){
			terrainClipPlan.clear();
			this.measureClear();
		}
	}
	this.bufferAreaParam = function(){
		var data = ['10px','275px'];
		bufferAreaIndex = layer.open({
			id: "bufferArea3D",
			title: '<i class="fa fa-edit"></i> 缓冲区参数',
			type: 2,
			content: 'ToolBox/bufferParam.html',
			shade: false,
			area: ['260px','255px'],
			offset: data,
			cancel: function(){
				bufferAreaIndex = null;
			}
		});
	}
	this.measureTest = function(){
		var fun = viewer.crystalWidget.screenSpaceEventHandler.getInputAction(Crystal.ScreenSpaceEventType.LEFT_CLICK);
		viewer.crystalWidget.screenSpaceEventHandler.removeInputAction(Crystal.ScreenSpaceEventType.LEFT_CLICK);
		viewer.crystalWidget.screenSpaceEventHandler.removeInputAction(Crystal.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
		var handlerMeasure = new Crystal.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
		handlerMeasure.setInputAction(function (movement) {
			var ray = viewer.camera.getPickRay(movement.position);
			var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
			if(cartesian!=undefined){
				let cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
				let x = Crystal.Math.toDegrees(cartographic.longitude);
				let y = Crystal.Math.toDegrees(cartographic.latitude);
				let z = cartographic.height;
				console.log({'x':x,'y':y,'z':z});
			}
			viewer.selectedEntity = undefined;
			handlerMeasure.destroy();
			viewer.crystalWidget.screenSpaceEventHandler.setInputAction(fun, Crystal.ScreenSpaceEventType.LEFT_CLICK);
		}, Crystal.ScreenSpaceEventType.LEFT_CLICK);
	}
	this.cameraParams = function(){
		let strJson = {};
		strJson.x = Crystal.Math.toDegrees(viewer.camera.positionCartographic.longitude);
		strJson.y = Crystal.Math.toDegrees(viewer.camera.positionCartographic.latitude);
		strJson.z = viewer.camera.positionCartographic.height;
		strJson.heading = viewer.camera.heading;
		strJson.pitch = viewer.camera.pitch;
		strJson.roll = viewer.camera.roll;
		return strJson;
	}
	this.indicatorShow = function(){
		var positions = Crystal.Cartesian3.fromDegreesArray([135.088511,53.560901,73.501142,53.560901,73.501142,8.302040,135.088511,8.302040]);
        var hole = Crystal.Cartesian3.fromDegreesArray(arrGzPolygon);
        var mHierarchy = {
            positions:positions,
            holes:[{positions:hole}]
        };
        var cuboid = viewer.entities.add({
            name: "",
            polygon:{
                hierarchy: mHierarchy,
                outline: true,
                outlineWidth: 100,
                arcType: Crystal.ArcType.RHUMB,
                material: Crystal.Color.fromCssColorString('rgba(5,26,55,.5)')
            }
        });
		
		Crystal.GeoJsonDataSource.load(geoJsonGzLine,{clampToGround: true}).then(function (dataSource) {
			viewer.dataSources.add(dataSource);
			gzLineDataSource = dataSource;
			var entities = dataSource.entities.values;
			for(var i=0;i<entities.length;i++){
				var entity = entities[i];
				entity.polyline.width = 3;
				entity.polyline.material = Crystal.Color.fromCssColorString('#00ffff');
			}
		});
	}
	var wetlandParkDataSource = null;
	function wetlandParkImageProvider(){ //湿地公园
		if(wetlandParkDataSource==null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/wetlandPark.json',{clampToGround: true}).then(function (dataSource) {
				wetlandParkDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(234,183,74,0.8)');
				}
				if(oneMagFlag!=2){
					viewer.flyTo(wetlandParkDataSource);
				}
			});
		}
		else{
			viewer.dataSources.add(wetlandParkDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(wetlandParkDataSource);
			}
		}
	}
	var forestParkDataSource = null;
	function forestParkImageProvider(){ //森林公园
		if(forestParkDataSource==null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/forestPark.json',{clampToGround: true}).then(function (dataSource) {
				forestParkDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(78,224,218,0.8)');
				}
				if(oneMagFlag!=2){
					viewer.flyTo(forestParkDataSource);
				}
			});
		}
		else{
			viewer.dataSources.add(forestParkDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(forestParkDataSource);
			}
		}
	}
	var cityParkDataSource = null;
	function cityParkImageProvider(){ //城市公园
		if(cityParkDataSource==null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/cityPark.json',{clampToGround: true}).then(function (dataSource) {
				cityParkDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					entity.polygon.material = Crystal.Color.fromCssColorString('rgba(148,240,133,0.8)');
				}
				if(oneMagFlag!=2){
					viewer.flyTo(cityParkDataSource);
				}
			});
		}
		else{
			viewer.dataSources.add(cityParkDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(cityParkDataSource);
			}
		}
	}
	var oldTreeDataSource = null;
	function oldTreeImageProvider(isFly=true){ //古树名木
		if(oldTreeDataSource==null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/oldTree.json',{clampToGround: true}).then(function (dataSource) {
				oldTreeDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					entity.billboard.width=35;
					entity.billboard.height=45;
					entity.billboard.image = 'gzznGIS/Image/oldTree.svg';
				}
				if(oneMagFlag!=2){
					viewer.flyTo(oldTreeDataSource);
				}
			});
		}
		else{
			viewer.dataSources.add(oldTreeDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(oldTreeDataSource);
			}
		}
	}
	var tradeTreeDataSource = null;
	function tradeTreeImageProvider(){ //行道树
		if(tradeTreeDataSource==null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/tradeTree.json',{clampToGround: true}).then(function (dataSource) {
				tradeTreeDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					entity.billboard.width=35;
					entity.billboard.height=45;
					entity.billboard.image = 'gzznGIS/Image/tradeTree.svg';
				}
				if(oneMagFlag!=2){
					viewer.flyTo(tradeTreeDataSource);
				}
			});
		}
		else{
			viewer.dataSources.add(tradeTreeDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(tradeTreeDataSource);
			}
		}
	}
	var bigTreeDataSource = null;
	function bigTreeImageProvider(){ //大树
		if(bigTreeDataSource==null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/bigTree.json',{clampToGround: true}).then(function (dataSource) {
				bigTreeDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					entity.billboard.width=35;
					entity.billboard.height=45;
					entity.billboard.image = 'gzznGIS/Image/bigTree.svg';
					//entity.billboard.image = 'gzznGIS/Image/bigTree.png';
				}
				if(oneMagFlag!=2){
					viewer.flyTo(bigTreeDataSource);
				}
			});
		}
		else{
			viewer.dataSources.add(bigTreeDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(bigTreeDataSource);
			}
		}
	}
	var reservoirDataSource = null;
	function reservoirImageProvider(isBool=true){ //蓄水池
		if(reservoirDataSource==null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/Reservoir.json',{clampToGround: true}).then(function (dataSource) {
				reservoirDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					entity.billboard.width=35;
					entity.billboard.height=45;
					entity.billboard.image = 'gzznGIS/Image/Reservoir.svg';
				}
				if(oneMagFlag!=2){
					viewer.flyTo(reservoirDataSource);
				}
			});
		}
		else{
			viewer.dataSources.add(reservoirDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(reservoirDataSource);
			}
		}
	}
	var observatoryDataSource = null;
	function observatoryImageProvider(){ //瞭望台
		if(observatoryDataSource==null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/Observatory.json',{clampToGround: true}).then(function (dataSource) {
				observatoryDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					entity.billboard.width=35;
					entity.billboard.height=45;
					entity.billboard.image = 'gzznGIS/Image/Observatory.svg';
				}
				if(oneMagFlag!=2){
					viewer.flyTo(observatoryDataSource);
				}				
			});
		}
		else{
			viewer.dataSources.add(observatoryDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(observatoryDataSource);
			}
		}
	}
	var fireFocusDataSource = null;
	function fireFocusImageProvider(){ //防火设施
		if(fireFocusDataSource==null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/FireFocus.json',{clampToGround: true}).then(function (dataSource) {
				fireFocusDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					entity.billboard.width=35;
					entity.billboard.height=45;
					entity.billboard.image = 'gzznGIS/Image/FireFocus.svg';
				}
				if(oneMagFlag!=2){
					viewer.flyTo(fireFocusDataSource);
				}
			});
		}
		else{
			viewer.dataSources.add(fireFocusDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(fireFocusDataSource);
			}
		}
	}
	var parkVideoDataSource = null;
	function parkVideoImageProvider(){ //公园视频
		if(parkVideoDataSource==null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/ParkVideo.json',{clampToGround: true}).then(function (dataSource) {
				parkVideoDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					entity.billboard.width=35;
					entity.billboard.height=45;
					entity.billboard.image = 'gzznGIS/Image/ParkVideo.svg';
				}
				if(oneMagFlag!=2){
					viewer.flyTo(fireVideoDataSource);
				}
			});
		}
		else{
			viewer.dataSources.add(parkVideoDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(fireVideoDataSource);
			}
		}
	}
	var fireVideoDataSource = null;
	function fireVideoImageProvider(){ //防火视频
		if(fireVideoDataSource==null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/FireVideo.json',{clampToGround: true}).then(function (dataSource) {
				fireVideoDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					entity.billboard.width=35;
					entity.billboard.height=45;
					entity.billboard.image = 'gzznGIS/Image/FireVideo.svg';
				}
				if(oneMagFlag!=2){
					viewer.flyTo(fireVideoDataSource);
				}
			});
		}
		else{
			viewer.dataSources.add(fireVideoDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(fireVideoDataSource);
			}
		}
	}
	var urbanDangerousZMDataSource = new Array();
	this.urbanDangerousRemoveProvider = function(vValue){
		viewer.dataSources.remove(urbanDangerousZMDataSource[vValue]);
	}
	this.urbanDangerousZMProvider = function(vValue){
		if(urbanDangerousZMDataSource[vValue]==undefined){
			let vedioQuery = {};
			vedioQuery.page = urbanPage;
			vedioQuery.pageSize = 100000;
			vedioQuery.sortName = "sid";
			vedioQuery.sortOrder = "desc";
			let vedioBody = {};
			vedioBody.zm = vValue;
			vedioQuery.body = vedioBody;
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webChannelsZMUrl,
				cache:false,
				async:true,
				data:JSON.stringify(vedioQuery),
				success:function(pData) {
					if(pData.body.data.length==0){
						urbanFinishBool=true;
						eventRangeQuery();
						if(urbanClickAddFalg){
							urbanDangerousLocation();
						}
						return;
					}
					let geoEventList = {};
						geoEventList.type = "FeatureCollection";
						geoEventList.totalFeatures = pData.body.data.length;
						geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.data.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body.data[i].longitude),parseFloat(pData.body.data[i].latitude)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body.data[i].name;
							propertie.DeviceId = pData.body.data[i].deviceId;
							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "UrbanVideo_"+pData.body.data[i].id;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
							urbanDangerousObj.push(geoFeature);
						}
						geoEventList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
							urbanDangerousZMDataSource[vValue] = dataSource;
							viewer.dataSources.add(dataSource);
							dataSource.clustering.enabled = clusterStyle.enabled;
							dataSource.clustering.pixelRange = clusterStyle.pixelRange;
							dataSource.clustering.minimumClusterSize = clusterStyle.minimumClusterSize;
							var pinBuilder = new Crystal.PinBuilder();
							customClusterStyle();
							function customClusterStyle(){
								dataSource.clustering.clusterEvent.addEventListener(function (clusteredEntities, cluster) {
									cluster.label.show = false;
									cluster.billboard.show = true;
									cluster.billboard.id = cluster.label.id;
									cluster.billboard.verticalOrigin = Crystal.VerticalOrigin.BOTTOM;
									cluster.billboard.image = pinBuilder.fromText(clusteredEntities.length, Crystal.Color.RED, 48).toDataURL();
								});
							}
							let pixelRange = dataSource.clustering.pixelRange;
							dataSource.clustering.pixelRange = 0;
							dataSource.clustering.pixelRange = pixelRange;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								var entity=entities[i];
								entity.billboard.width=35;
								entity.billboard.height=45;
								entity.billboard.image = 'gzznGIS/Image/ParkVideo.svg';
							}
						});
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(urbanDangerousZMDataSource[vValue]);
		}
	}
	var urbanDangerousDataSource = [];
	var urbanDangerousObj = [];
	var urbanPage = 1;
	var urbanBool = true;
	var urbanFinishBool = false;
	var clusterStyle = {"enabled":true,"pixelRange":60,"minimumClusterSize":50};
	var urbanClickFlag = 0;
	var urbanClickAddFalg = false;
	this.urbanDangerousImageProvider = function(){
		if(urbanClickFlag%2==0){
			urbanBool = true;
			if(urbanFinishBool&&urbanDangerousDataSource.length>0){
				for(let i=0;i<urbanDangerousDataSource.length;i++){
					viewer.dataSources.add(urbanDangerousDataSource[i]);
				}
			}
			else{
				urbanDangerousImageProvider();	
			}
		}
		else{
			urbanBool = false;
			for(let i=0;i<urbanDangerousDataSource.length;i++){
				viewer.dataSources.remove(urbanDangerousDataSource[i]);
			}
		}
		urbanClickFlag++;
	};
	var uDBQueryDataSource = null;
	function urbanDangerousBackQuery(){ //直接拿后台的摄像头
		if(mEntity==null){return;}
		viewer.dataSources.remove(uDBQueryDataSource);
		let cEast = viewer.scene.globe.ellipsoid.cartesianToCartographic(mEntity.position._value);
		let xE = Crystal.Math.toDegrees(cEast.longitude);
		let yE = Crystal.Math.toDegrees(cEast.latitude);
		let strJson={};
		let strBody = {};
		strBody.longitude = xE;
		strBody.latitude = yE;
		strBody.rows = 10;
		strJson.body = strBody;
		strJson.page = 1;
		strJson.pageSize = 10;
		strJson.sortName = 'sid';
		strJson.sortOrder = 'desc';
		$.ajax({
			type : 'POST',
			contentType : "application/json;charset-UTF-8",
			url:webTrafficUrl+'IA055fXW',
			cache:false,
			async:true,
			data:JSON.stringify(strJson),
			success:function(pData) {
				let geoEnterprisesList = {};
					geoEnterprisesList.type = "FeatureCollection";
					geoEnterprisesList.totalFeatures = pData.body.data.length;
					geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.data.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body.data[i].longitude),parseFloat(pData.body.data[i].latitude)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){						
							continue;
						}
						let propertie = {};
						propertie.NAME = pData.body.data[i].name;
						propertie.DeviceId = pData.body.data[i].deviceId;
						propertie.Address = pData.body.data[i].address;

						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "UrbanVideo_"+pData.body.data[i].id;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
					}
					geoEnterprisesList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
						viewer.dataSources.add(dataSource);
						uDBQueryDataSource = dataSource;
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							let entity = entities[i];
							entity.billboard.width = 35;
							entity.billboard.height = 45;
							entity.billboard.image = 'gzznGIS/Image/ParkVideo.svg';
						}
					});
					let videoList = [];
					for(let i =0;i<(pData.body.data.length>=2?2:pData.body.data.length);i++){
						let pJsons = {};
						pJsons.deviceId = pData.body.data[i].deviceId;
						pJsons.id = pData.body.data[i].id;
						pJsons.name = pData.body.data[i].name;
						videoList.push(pJsons);
						//addPromiseCameraInfo("UrbanVideo_"+pData.body.data[i].id,pData.body.data[i].name,pData.body.data[i].deviceId);
					}
					changeMorningVideoList(videoList);
			},
			error:function(data) {
				console.log("ShelterDataError");
			}
		});
	}
	var uDPage = 1;
	var uDObj = [];
	var uDFinishBool=false;
	function urbanDangerousLoad(){ //加载城管危化原始数据
		let vedioQuery = {};
		vedioQuery.page = uDPage;
		vedioQuery.pageSize = 10000;
		vedioQuery.sortName = "id";
		vedioQuery.sortOrder = "desc";
		let vedioBody = {};
		vedioQuery.body = vedioBody;
		$.ajax({
			type : 'POST',
			contentType : "application/json;charset-UTF-8",
			url:webChannelsUrl,
			cache:false,
			async:true,
			data:JSON.stringify(vedioQuery),
			success:function(pData) {
				if(pData.body.length==0){
					uDFinishBool=true;
					eventRangeVideoQuery();
					return;
				}
				uDObj.push(pData.body);
				setTimeout(function()  {
					uDPage++;
					urbanDangerousLoad();
				}, 5);
			},
			error:function(data) {
				console.log("EnterprisesDataError");
			}
		});
	}
	function urbanDangerousImageProvider(){ //城管危化视频
		urbanBool = true;
		if(urbanFinishBool){
			for(let i=0;i<urbanDangerousDataSource.length;i++){
				viewer.dataSources.add(urbanDangerousDataSource[i]);
			}
		}
		let vedioQuery = {};
		vedioQuery.page = urbanPage;
		vedioQuery.pageSize = 10000;
		vedioQuery.sortName = "id";
		vedioQuery.sortOrder = "desc";
		let vedioBody = {};
		vedioBody.deviceId = "44010000082006000055";
		vedioQuery.body = vedioBody;
		$.ajax({
			type : 'POST',
			contentType : "application/json;charset-UTF-8",
			url:webChannelsUrl,
			cache:false,
			async:true,
			data:JSON.stringify(vedioQuery),
			success:function(pData) {
				if(pData.body.length==0){
					urbanFinishBool=true;
					eventRangeQuery();
					if(urbanClickAddFalg){
						urbanDangerousLocation();
					}
					return;
				}
				let geoEventList = {};
					geoEventList.type = "FeatureCollection";
					geoEventList.totalFeatures = pData.body.length;
					geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body[i].longitude),parseFloat(pData.body[i].latitude)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){
							continue;
						}
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						propertie.DeviceId = pData.body[i].deviceId;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "UrbanVideo_"+pData.body[i].id;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
						urbanDangerousObj.push(geoFeature);
					}
					geoEventList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
						urbanDangerousDataSource.push(dataSource);
						viewer.dataSources.add(dataSource);
						dataSource.clustering.enabled = clusterStyle.enabled;
						dataSource.clustering.pixelRange = clusterStyle.pixelRange;
						dataSource.clustering.minimumClusterSize = clusterStyle.minimumClusterSize;
						var pinBuilder = new Crystal.PinBuilder();
						customClusterStyle();
						function customClusterStyle(){
							dataSource.clustering.clusterEvent.addEventListener(function (clusteredEntities, cluster) {
								cluster.label.show = false;
								cluster.billboard.show = true;
								cluster.billboard.id = cluster.label.id;
								cluster.billboard.verticalOrigin = Crystal.VerticalOrigin.BOTTOM;
								cluster.billboard.image = pinBuilder.fromText(clusteredEntities.length, Crystal.Color.RED, 48).toDataURL();
							});
						}
						let pixelRange = dataSource.clustering.pixelRange;
						dataSource.clustering.pixelRange = 0;
						dataSource.clustering.pixelRange = pixelRange;
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							var entity=entities[i];
							entity.billboard.width=35;
							entity.billboard.height=45;
							entity.billboard.image = 'gzznGIS/Image/ParkVideo.svg';
						}
					});
				setTimeout(function()  {
					if(urbanBool){
						urbanPage++;
						urbanDangerousImageProvider();
					}
				}, 5);
			},
			error:function(data) {
				console.log("EnterprisesDataError");
			}
		});
	}
	var dangerousDataSource = [];
	var dangerousFinishBool = false;
	var dangerousObj = [];
	var dangerousPage = 1;
	var dangerousClickFlag = 0;
	this.dangerousImageProvider = function(){
		if(dangerousClickFlag%2==0){
			if(dangerousFinishBool&&dangerousDataSource.length>0){
				for(let i=0;i<dangerousDataSource.length;i++){
					viewer.dataSources.add(dangerousDataSource[i]);
				}
			}
			else{
				dangerousImageProvider();	
			}
		}
		else{
			for(let i=0;i<dangerousDataSource.length;i++){
				viewer.dataSources.remove(dangerousDataSource[i]);
			}
		}
		dangerousClickFlag++;
	};
	function dangerousImageProvider(){ //危化视频
		dangerousBool = true;
		if(dangerousFinishBool){
			for(let i=0;i<dangerousDataSource.length;i++){
				viewer.dataSources.add(dangerousDataSource[i]);
			}
		}
		let vedioQuery = {};
		vedioQuery.page = dangerousPage;
		vedioQuery.pageSize = 10000;
		vedioQuery.sortName = "id";
		vedioQuery.sortOrder = "desc";
		let vedioBody = {};
		vedioBody.deviceId = '44010000032006000056';
		vedioQuery.body = vedioBody;
		$.ajax({
			type : 'POST',
			contentType : "application/json;charset-UTF-8",
			url:webChannelsUrl,
			cache:false,
			async:true,
			data:JSON.stringify(vedioQuery),
			success:function(pData) {
				if(pData.body.length==0){
					dangerousFinishBool=true;
					//eventRangeQuery();
					//if(urbanClickAddFalg){
						//urbanDangerousLocation();
					//}
					return;
				}
				let geoEventList = {};
					geoEventList.type = "FeatureCollection";
					geoEventList.totalFeatures = pData.body.length;
					geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body[i].longitude),parseFloat(pData.body[i].latitude)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){
							continue;
						}
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						propertie.DeviceId = pData.body[i].deviceId;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "UrbanVideo_"+pData.body[i].id;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
						dangerousObj.push(geoFeature);
					}
					geoEventList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
						dangerousDataSource.push(dataSource);
						viewer.dataSources.add(dataSource);
						dataSource.clustering.enabled = clusterStyle.enabled;
						dataSource.clustering.pixelRange = clusterStyle.pixelRange;
						dataSource.clustering.minimumClusterSize = clusterStyle.minimumClusterSize;
						var pinBuilder = new Crystal.PinBuilder();
						customClusterStyle();
						function customClusterStyle(){
							dataSource.clustering.clusterEvent.addEventListener(function (clusteredEntities, cluster) {
								cluster.label.show = false;
								cluster.billboard.show = true;
								cluster.billboard.id = cluster.label.id;
								cluster.billboard.verticalOrigin = Crystal.VerticalOrigin.BOTTOM;
								cluster.billboard.image = pinBuilder.fromText(clusteredEntities.length, Crystal.Color.RED, 48).toDataURL();
							});
						}
						let pixelRange = dataSource.clustering.pixelRange;
						dataSource.clustering.pixelRange = 0;
						dataSource.clustering.pixelRange = pixelRange;
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							var entity=entities[i];
							entity.billboard.width=35;
							entity.billboard.height=45;
							entity.billboard.image = 'gzznGIS/Image/ParkVideo.svg';
						}
					});
				setTimeout(function()  {
					if(dangerousBool){
						dangerousPage++;
						dangerousImageProvider();
					}
				}, 5);
			},
			error:function(data) {
				console.log("EnterprisesDataError");
			}
		});
	}
	var broadcastDataSource = null;
	function broadcastImageProvider(){ //广播报警
		if(broadcastDataSource==null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/Broadcast.json',{clampToGround: true}).then(function (dataSource) {
				broadcastDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					entity.billboard.width=35;
					entity.billboard.height=45;
					entity.billboard.image = 'gzznGIS/Image/Broadcast.svg';
				}
				if(oneMagFlag!=2){
					viewer.flyTo(broadcastDataSource);
				}
			});
		}
		else{
			viewer.dataSources.add(broadcastDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(broadcastDataSource);
			}
		}
	}
	var fireMantleDataSource = null;
	function fireMantleImageProvider(){ //防火林带
		if(fireMantleDataSource==null){
			Crystal.GeoJsonDataSource.load('gzznGIS/Model/FireMantle.json',{clampToGround: true}).then(function (dataSource) {
				fireMantleDataSource = dataSource;
				viewer.dataSources.add(dataSource);
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					var entity = entities[i];
					entity.polyline.width = 3;
					entity.polyline.material = Crystal.Color.fromCssColorString('#01ffff');
				}
				if(oneMagFlag!=2){
					viewer.flyTo(fireMantleDataSource);
				}
			});
		}
		else{
			viewer.dataSources.add(fireMantleDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(fireMantleDataSource);
			}
		}
	}
	var fireExpertsDataSource = null;
	var FireExpertsClickFlag = 0;
	this.addPromiseExperts = function(){
		if(FireExpertsClickFlag%2==0){
			addPromiseFireExperts(false);
		}
		else{
			viewer.dataSources.remove(fireExpertsDataSource);
		}
		FireExpertsClickFlag++;
	}
	function addPromiseFireExperts(isFly=true){ //救火专家
		if(fireExpertsDataSource==null){
			$.ajax({
				type : 'GET',
				contentType : "application/json;charset-UTF-8",
				url:webFireExpertsUrl,
				cache:false,
				async:true,
				success:function(pData) {
					let geoEventList = {};
					geoEventList.type = "FeatureCollection";
					geoEventList.totalFeatures = pData.body.length;
					geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){						
							continue;
						}
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						propertie.FireExpertNum = pData.body[i].fireExpertNum;
						propertie.OtherExpertNum = pData.body[i].otherExpertNum;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "FireExperts_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
					}
					geoEventList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
						fireExpertsDataSource = dataSource;
						viewer.dataSources.add(dataSource);
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							var entity=entities[i];
							entity.billboard.width=35;
							entity.billboard.height=45;
							entity.billboard.image = 'gzznGIS/Image/forExpert.svg';
						}
						if(oneMagFlag!=2){
							if(isFly){
								viewer.flyTo(fireExpertsDataSource);
							}
						}
						
					});
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(fireExpertsDataSource);
			if(oneMagFlag!=2){
				if(isFly){
					viewer.flyTo(fireExpertsDataSource);
				}
			}
		}
	}	
	var firefightingTeamDataSource = null;
	var firefightingTeamClickFlag = 0;
	this.addPromiseTeam = function(){
		if(firefightingTeamClickFlag%2==0){
			addPromiseFirefightingTeam(false);
		}
		else{
			viewer.dataSources.remove(firefightingTeamDataSource);
		}
		firefightingTeamClickFlag++;
	}
	function addPromiseFirefightingTeam(isFly=true){ //救火队伍
		if(firefightingTeamDataSource==null){
			$.ajax({
				type : 'GET',
				contentType : "application/json;charset-UTF-8",
				url:webFirefightingTeamUrl,
				cache:false,
				async:true,
				success:function(pData) {
					let geoEventList = {};
					geoEventList.type = "FeatureCollection";
					geoEventList.totalFeatures = pData.body.length;
					geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					let geoEventListOut = {};
					geoEventListOut.type = "FeatureCollection";
					geoEventListOut.totalFeatures = pData.body.length;
					geoEventListOut.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeaturesOut = [];
					for(let i =0;i<pData.body.length;i++){
						if(oneMagFlag!=2){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.PersonnelNum = pData.body[i].personnelNum;
							propertie.TeamName = pData.body[i].teamName;
							propertie.Contacts = pData.body[i].contacts;
							propertie.EquipmentList = pData.body[i].equipmentList;
							propertie.SceneReliefMaterialsList = pData.body[i].sceneReliefMaterialsList;
													
							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "FirefightingTeam_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						else{
							if(pData.body[i].sid=="18"||pData.body[i].sid=="126"||pData.body[i].sid=="127"){
								let geometryOut = {};
								geometryOut.type = "Point";
								geometryOut.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
								if(geometryOut.coordinates[0]==0){
									continue;
								}
								if(isNaN(geometryOut.coordinates[0])){						
									continue;
								}
								
								let propertieOut = {};
								propertieOut.NAME = pData.body[i].name;
								propertieOut.PersonnelNum = pData.body[i].personnelNum;
								propertieOut.TeamName = pData.body[i].teamName;
								propertieOut.Contacts = pData.body[i].contacts;
								propertieOut.EquipmentList = pData.body[i].equipmentList;
								propertieOut.SceneReliefMaterialsList = pData.body[i].sceneReliefMaterialsList;
														
								let geoFeatureOut = {};
								geoFeatureOut.type = "Feature";
								geoFeatureOut.id = "FirefightingTeam_"+pData.body[i].sid;
								geoFeatureOut.geometry = geometryOut;
								geoFeatureOut.geometry_name = "the_geom";
								geoFeatureOut.properties = propertieOut;
								geoFeaturesOut.push(geoFeatureOut);
							}
							else{
								let geometry = {};
								geometry.type = "Point";
								geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
								if(geometry.coordinates[0]==0){
									continue;
								}
								if(isNaN(geometry.coordinates[0])){						
									continue;
								}
								
								let propertie = {};
								propertie.NAME = pData.body[i].name;
								propertie.PersonnelNum = pData.body[i].personnelNum;
								propertie.TeamName = pData.body[i].teamName;
								propertie.Contacts = pData.body[i].contacts;
								propertie.EquipmentList = pData.body[i].equipmentList;
								propertie.SceneReliefMaterialsList = pData.body[i].sceneReliefMaterialsList;
														
								let geoFeature = {};
								geoFeature.type = "Feature";
								geoFeature.id = "FirefightingTeam_"+pData.body[i].sid;
								geoFeature.geometry = geometry;
								geoFeature.geometry_name = "the_geom";
								geoFeature.properties = propertie;
								geoFeatures.push(geoFeature);
							}
						}
					}
					geoEventList.features = geoFeatures;
					geoEventListOut.features = geoFeaturesOut;
					Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
						firefightingTeamDataSource = dataSource;
						viewer.dataSources.add(dataSource);
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							var entity=entities[i];
							entity.billboard.width=35;
							entity.billboard.height=45;
							entity.billboard.image = 'gzznGIS/Image/forTeam.svg';
						}
						if(oneMagFlag!=2){
							if(isFly){
								viewer.flyTo(firefightingTeamDataSource);
							}
						}
					});
					teamRealPathNew(geoEventListOut);
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(firefightingTeamDataSource);
			if(oneMagFlag!=2){
				if(isFly){
					viewer.flyTo(firefightingTeamDataSource);
				}
			}
		}
	}
	this.addPromiseFirefightingTeam = function(){ //救火队伍的对外接口
		addPromiseFirefightingTeam();
	}
	this.addPromiseFireExperts = function(){ // 救火专家的对外接口
		addPromiseFireExperts();
	}
	var DrowningEventSource = null;
	var mEntity = null;
	var vRadius = 1000.0;
	
	this.addPromiseEventRange = function(vValue,vFlag=true){ //事件的范围
		vRadius = vValue;
		clearEventRange();
		if(mEntity!=null){
			eventRange(mEntity,vRadius,vFlag);
		}
	}
	var postionArr =[];
	var arrEntityee =[];
	var primitiveOutline = null;
	var topright = {'lng':0.0,'lat':0.0};
	var bottomleft = {'lng':0.0,'lat':0.0};
	function clearEventRange(){
		postionArr = [];
		for(var i=0;i<arrEntityee.length;i++){
			viewer.entities.remove(arrEntityee[i]);
		}
		arrEntityee = [];
		viewer.scene.groundPrimitives.remove(primitiveOutline);
		primitiveOutline = null;
	}
	function eventRangeVideoQuery(){ //战时的事件实时搜索
		if(mEntity==null){return;}
		if(!uDFinishBool){return;}
		let cPos = mEntity.position._value;
		let cLengths = [1000.0,3000.0,100000.0];
		let cRanges = [];
		let cResults = [];
		let cTemp2000 = [];
		let cTemp3000 = [];
		let cVideo = 4;
		for(let i=0;i<cLengths.length;i++){
			let cEast = viewer.scene.globe.ellipsoid.cartesianToCartographic(getNorthPointByDistance(cPos,cLengths[i]));
			let cNorth = viewer.scene.globe.ellipsoid.cartesianToCartographic(getEastPointByDistance(cPos,cLengths[i]));
			let cSouth = viewer.scene.globe.ellipsoid.cartesianToCartographic(getSouthPointByDistance(cPos,cLengths[i]));
			let cWest = viewer.scene.globe.ellipsoid.cartesianToCartographic(getWestPointByDistance(cPos,cLengths[i]));
			let xE = Crystal.Math.toDegrees(cEast.longitude);
			let yE = Crystal.Math.toDegrees(cEast.latitude);
			let xN = Crystal.Math.toDegrees(cNorth.longitude);
			let yN = Crystal.Math.toDegrees(cNorth.latitude);
			let xS = Crystal.Math.toDegrees(cSouth.longitude);
			let yS = Crystal.Math.toDegrees(cSouth.latitude);
			let xW = Crystal.Math.toDegrees(cWest.longitude);
			let yW = Crystal.Math.toDegrees(cWest.latitude);
			let cRange = {};
			cRange.tLng = xE;
			cRange.tLat = yN;
			cRange.bLng = xW;
			cRange.bLat = yS;
			cRanges.push(cRange);
		}
		let breakFlag= false;
		for(let i=0;i<uDObj.length;i++){
			if(breakFlag){
				break;
			}
			for(let j=0;j<uDObj[i].length;j++){
				let lng = uDObj[i][j].longitude;
				let lat = uDObj[i][j].latitude;
				if(lng<cRanges[0].tLng&&lat<cRanges[0].tLat&&lng>cRanges[0].bLng&&lat>cRanges[0].bLat){
					cResults.push(uDObj[i][j]);
				}
				if(cResults.length == cVideo){
					breakFlag = true;
					break;
				}
				if(cTemp2000.length < cVideo){
					if(lng<cRanges[1].tLng&&lat<cRanges[1].tLat&&lng>cRanges[1].bLng&&lat>cRanges[1].bLat){
						cTemp2000.push(uDObj[i][j]);
					}
					if(cTemp3000.length < cVideo){
						if(lng<cRanges[2].tLng&&lat<cRanges[2].tLat&&lng>cRanges[2].bLng&&lat>cRanges[2].bLat){
							cTemp3000.push(uDObj[i][j]);
						}
					}
				}
			}
		}
		let cNum = cVideo - cResults.length;
		if(cTemp2000.length>0){
			if(cTemp2000.length >= cNum){
				for(let i=0;i<cNum;i++){
					cResults.push(cTemp2000[i]);
				}
				cNum = 0;
			}
			else{
				for(let i=0;i<cTemp2000.length;i++){
					cResults.push(cTemp2000[i]);
				}
				cNum = cNum - cTemp2000.length;
			}
		}
		if(cNum!=0){
			if(cTemp3000.length>0){
				if(cTemp3000.length >= cNum){
					for(let i=0;i<cNum;i++){
						cResults.push(cTemp3000[i]);
					}
				}
				else{
					for(let i=0;i<cTemp3000.length;i++){
						cResults.push(cTemp3000[i]);
					}
				}
			}
		}
		for(let i=0;i<cResults.length;i++){
			addPromiseCameraInfo("UrbanVideo_"+cResults[i].id,cResults[i].name,cResults[i].deviceId);
		}
	}
	function eventRangeQuery(){ //过滤得到离事件最近的六个视频点
		if(mEntity==null){return;}
		let cPos = mEntity.position._value;
		let cLengths = [1000.0,3000.0,100000.0];
		let cRanges = [];
		let cResults = [];
		let cTemp2000 = [];
		let cTemp3000 = [];
		let cVideo = 4;
		for(let i=0;i<cLengths.length;i++){
			let cEast = viewer.scene.globe.ellipsoid.cartesianToCartographic(getNorthPointByDistance(cPos,cLengths[i]));
			let cNorth = viewer.scene.globe.ellipsoid.cartesianToCartographic(getEastPointByDistance(cPos,cLengths[i]));
			let cSouth = viewer.scene.globe.ellipsoid.cartesianToCartographic(getSouthPointByDistance(cPos,cLengths[i]));
			let cWest = viewer.scene.globe.ellipsoid.cartesianToCartographic(getWestPointByDistance(cPos,cLengths[i]));
			let xE = Crystal.Math.toDegrees(cEast.longitude);
			let yE = Crystal.Math.toDegrees(cEast.latitude);
			let xN = Crystal.Math.toDegrees(cNorth.longitude);
			let yN = Crystal.Math.toDegrees(cNorth.latitude);
			let xS = Crystal.Math.toDegrees(cSouth.longitude);
			let yS = Crystal.Math.toDegrees(cSouth.latitude);
			let xW = Crystal.Math.toDegrees(cWest.longitude);
			let yW = Crystal.Math.toDegrees(cWest.latitude);
			let cRange = {};
			cRange.tLng = xE;
			cRange.tLat = yN;
			cRange.bLng = xW;
			cRange.bLat = yS;
			cRanges.push(cRange);
		}
		for(let i=0;i<urbanDangerousObj.length;i++){
			let lng = urbanDangerousObj[i].geometry.coordinates[0];
			let lat = urbanDangerousObj[i].geometry.coordinates[1];
			if(lng<cRanges[0].tLng&&lat<cRanges[0].tLat&&lng>cRanges[0].bLng&&lat>cRanges[0].bLat){
				cResults.push(urbanDangerousObj[i]);
			}
			if(cResults.length == cVideo){
				break;
			}
			if(cTemp2000.length < cVideo){
				if(lng<cRanges[1].tLng&&lat<cRanges[1].tLat&&lng>cRanges[1].bLng&&lat>cRanges[1].bLat){
					cTemp2000.push(urbanDangerousObj[i]);
				}
				if(cTemp3000.length < cVideo){
					if(lng<cRanges[2].tLng&&lat<cRanges[2].tLat&&lng>cRanges[2].bLng&&lat>cRanges[2].bLat){
						cTemp3000.push(urbanDangerousObj[i]);
					}
				}
			}
		}
		let cNum = cVideo - cResults.length;
		if(cTemp2000.length>0){
			if(cTemp2000.length >= cNum){
				for(let i=0;i<cNum;i++){
					cResults.push(cTemp2000[i]);
				}
				cNum = 0;
			}
			else{
				for(let i=0;i<cTemp2000.length;i++){
					cResults.push(cTemp2000[i]);
				}
				cNum = cNum - cTemp2000.length;
			}
		}
		if(cNum!=0){
			if(cTemp3000.length>0){
				if(cTemp3000.length >= cNum){
					for(let i=0;i<cNum;i++){
						cResults.push(cTemp3000[i]);
					}
				}
				else{
					for(let i=0;i<cTemp3000.length;i++){
						cResults.push(cTemp3000[i]);
					}
				}
			}
		}
		for(let i=0;i<cResults.length;i++){
			addPromiseCameraInfo(cResults[i].id,cResults[i].properties.NAME,cResults[i]._properties._DeviceId._value);
		}
	}
	function eventRange(entity, vRadius = 1000.0, vFlag=true){
		let cPos = entity.position._value;
		let pDis = getNorthPointByDistance(cPos,vRadius);
		let vText = vRadius/1000 + "公里";
		postionArr.push(cPos);
		postionArr.push(pDis);
		var circleOutline = new Crystal.CircleOutlineGeometry({
		   center : cPos,
		   radius : vRadius
		});
		var geometry = Crystal.CircleOutlineGeometry.createGeometry(circleOutline);
		var float64ArrayPositions = geometry.attributes.position.values;
		var pos = [].slice.call(float64ArrayPositions);
		var posTemp = [];
		for(var i = 0;i<pos.length;i=i+3){
			var sT = new Crystal.Cartesian3(pos[i],pos[i+1],pos[i+2]);
			let cartographic = Crystal.Cartographic.fromCartesian(sT);
			posTemp.push(Crystal.Math.toDegrees(cartographic.longitude));
			posTemp.push(Crystal.Math.toDegrees(cartographic.latitude));
		}
		var instance = new Crystal.GeometryInstance({
		  geometry : new Crystal.GroundPolylineGeometry({
			 positions : Crystal.Cartesian3.fromDegreesArray(posTemp),
			 loop : true,
			 width : 3.0
		  }),
		  attributes : {
			 color : Crystal.ColorGeometryInstanceAttribute.fromColor(Crystal.Color.fromCssColorString("red").withAlpha(0.8))
		  }
		});
		primitiveOutline = new Crystal.GroundPolylinePrimitive({
			geometryInstances : instance,
			appearance : new Crystal.PolylineColorAppearance()
		});
		viewer.scene.groundPrimitives.add(primitiveOutline);
		arrEntityee.push(viewer.entities.add({
			position: cPos,
			name: '',
			type:'Selection tool',
			ellipse: {
				semiMinorAxis: 400,
				semiMajorAxis: 400,
				material: Crystal.Color.fromCssColorString('rgba(255,100,86,0.2)'),
				heightReference:Crystal.HeightReference.clampToGroud,
				outline: true
			},
			id: 'eventcircl0'
		}));
		arrEntityee.push(viewer.entities.add({
			position: cPos,
			name: '',
			type:'Selection tool',
			ellipse: {
				semiMinorAxis: 700,
				semiMajorAxis: 700,
				material: Crystal.Color.fromCssColorString('rgba(255,100,86,0.2)'),
				heightReference:Crystal.HeightReference.clampToGroud,
				outline: true
			},
			id: 'eventcircl1'
		}));
		arrEntityee.push(viewer.entities.add({
			position: cPos,
			name: '',
			type:'Selection tool',
			ellipse: {
				semiMinorAxis: vRadius,
				semiMajorAxis: vRadius,
				material: Crystal.Color.fromCssColorString('rgba(27,27,27,0.3)'),
				heightReference:Crystal.HeightReference.clampToGroud,
				outline: true
			},
			id: 'eventcircl2'
		}));
		arrEntityee.push(viewer.entities.add({
			name: '',
			type:'Selection tool',
			corridor: {                    
				positions: postionArr,
				material: Crystal.Color.RED.withAlpha(0.8),
				width: 10.0,
				outline : true,
				outlineColor : Crystal.Color.RED
			},
			id: 'eventcircl12'
		}));
		let carto = Crystal.Cartographic.fromCartesian(pDis);
		let h = viewer.scene.globe.getHeight(carto);
		var positionsT = [
		    Crystal.Cartographic.fromCartesian(pDis)
		];
		var promise = Crystal.sampleTerrain(viewer.scene.terrainProvider,12,positionsT); 
		Crystal.when(promise, function (updatedPositions) {
			arrEntityee.push(viewer.entities.add({
				name:'点击后拖拽',
				position:Crystal.Cartesian3.fromRadians(updatedPositions[0].longitude,updatedPositions[0].latitude,updatedPositions[0].height),
				point: {
					pixelSize: 5,
					color: Crystal.Color.WHITE,
					outlineColor: Crystal.Color.RED,
					outlineWidth: 2,
					heightReference:Crystal.HeightReference.clampToGroud
				},
				label: {
					text: vText,
					font: '25px sans-serif',
					style: Crystal.LabelStyle.FILL,
					outlineWidth:1,
					fillColor:Crystal.Color.WHITE,
					verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
					pixelOffset: new Crystal.Cartesian2(20, -20),
					heightReference:Crystal.HeightReference.clampToGroud,
					showBackground:true,
					backgroundColor:new Crystal.Color(0.12,0.14,0.2,.6)
				}
			}));
		});
		
		eventDragRange(entity, vText);
		let cEast = viewer.scene.globe.ellipsoid.cartesianToCartographic(pDis);
		let cNorth = viewer.scene.globe.ellipsoid.cartesianToCartographic(getEastPointByDistance(cPos,vRadius));
		let cSouth = viewer.scene.globe.ellipsoid.cartesianToCartographic(getSouthPointByDistance(cPos,vRadius));
		let cWest = viewer.scene.globe.ellipsoid.cartesianToCartographic(getWestPointByDistance(cPos,vRadius));
		let xE = Crystal.Math.toDegrees(cEast.longitude);
		let yE = Crystal.Math.toDegrees(cEast.latitude);
		let xN = Crystal.Math.toDegrees(cNorth.longitude);
		let yN = Crystal.Math.toDegrees(cNorth.latitude);
		let xS = Crystal.Math.toDegrees(cSouth.longitude);
		let yS = Crystal.Math.toDegrees(cSouth.latitude);
		let xW = Crystal.Math.toDegrees(cWest.longitude);
		let yW = Crystal.Math.toDegrees(cWest.latitude);
		topright.lng = xE;
		topright.lat = yN;
		bottomleft.lng = xW;
		bottomleft.lat = yS;
		console.log(cPos,"cPos");
		var cartesian3= new Crystal.Cartesian3(cPos.x,cPos.y,cPos.z);
		var cartographic1=Crystal.Cartographic.fromCartesian(cartesian3);
		var lat=Crystal.Math.toDegrees(cartographic1.latitude);
		var lng=Crystal.Math.toDegrees(cartographic1.longitude);
		getSquareCoordinates([lng,lat]);
		if(!vFlag){		   
		   getTerrainSection(cWest,cEast,vRadius*2);
		}
	}
	function getTerrainSection(cStart, cEnd, cDistance){
		let length = 200;
		let disTeam = cDistance/length;
		let terrainSamplePositions = [];
		let jsonStr = "";
		for (let i = 0; i < length; ++i) {
			let lon = Crystal.Math.lerp(cStart.longitude, cEnd.longitude, i / (length - 1));
			let lat = Crystal.Math.lerp(cStart.latitude, cEnd.latitude, i / (length - 1));
			let position = Crystal.Cartographic.fromRadians(lon, lat);
			terrainSamplePositions.push(position);
			let temp = (disTeam*(i + 1)).toFixed(3);
			jsonStr += temp + ",";
		}
		jsonStr = jsonStr.substring(0,jsonStr.length - 1);
		jsonStr += "-";
		Crystal.when(Crystal.sampleTerrainMostDetailed(viewer.terrainProvider, terrainSamplePositions), function(samples) {
			let offset = 10.0;
			for (let i = 0; i< samples.length; ++i) {
				samples[i].height += offset;
				jsonStr += samples[i].height.toFixed(3) + ",";
			}
			jsonStr = jsonStr.substring(0, jsonStr.length - 1);
			mapInitPlaceChart(jsonStr);
		});
	}
	function eventDragRange(eEntity, vText){
		var fun = viewer.crystalWidget.screenSpaceEventHandler.getInputAction(Crystal.ScreenSpaceEventType.LEFT_CLICK);
		viewer.crystalWidget.screenSpaceEventHandler.removeInputAction(Crystal.ScreenSpaceEventType.LEFT_CLICK);
		viewer.crystalWidget.screenSpaceEventHandler.removeInputAction(Crystal.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
		var handlerEvent = new Crystal.ScreenSpaceEventHandler(viewer.scene.canvas);
		var EventRangePrimitive = (function(){
			function _(postionArr){
				this.options = {
					parent:eEntity,
					name:'',
					corridor: {                    
						positions: [],
						material: Crystal.Color.RED.withAlpha(0.8),
						width: 10.0,
						outline : true,
						outlineColor : Crystal.Color.RED
					},
					ellipse : {
						show : true,
						material : Crystal.Color.fromCssColorString('rgba(27,27,27,0.3)'),
						heightReference:Crystal.HeightReference.clampToGroud,
						outline : true
					}
				};
				this.positions = postionArr;
				this._init();
			}
			_.prototype._init = function(){
				var _self = this;
				var _update = function(){
					return _self.positions;
				};
				var _update_ellipse = function(){
					return _self.positions[0];
				};
				var _semiMinorAxis = function(){
					var point1cartographic = Crystal.Cartographic.fromCartesian(_self.positions[0]);
					var point2cartographic = Crystal.Cartographic.fromCartesian(_self.positions[1]);
					var geodesic = new Crystal.EllipsoidGeodesic();
					geodesic.setEndPoints(point1cartographic, point2cartographic);
					var s = geodesic.surfaceDistance;
					return s;
				};
				this.options.corridor.positions = new Crystal.CallbackProperty(_update,false);
				this.options.position = new Crystal.CallbackProperty(_update_ellipse,false);
				this.options.ellipse.semiMinorAxis = new Crystal.CallbackProperty(_semiMinorAxis,false);
				this.options.ellipse.semiMajorAxis = new Crystal.CallbackProperty(_semiMinorAxis,false);
				arrEntityee.push(viewer.entities.add(this.options));
			};
			return _;
		})();
		var poly = new EventRangePrimitive(postionArr);
		var is_Click = false;
		var mDistance = 1;
		function getSpaceDistance(positions) {
			var distance = 0;
			for (var i = 0; i < positions.length - 1; i++) {
				if(positions[i]!=undefined&&positions[i+1]!=undefined){
					var point1cartographic = Crystal.Cartographic.fromCartesian(positions[i]);
					var point2cartographic = Crystal.Cartographic.fromCartesian(positions[i+1]);	
					var geodesic = new Crystal.EllipsoidGeodesic();
					geodesic.setEndPoints(point1cartographic, point2cartographic);
					var s = geodesic.surfaceDistance;
					//s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));	
					distance = distance + s;
				}
			}
			return distance;//(distance/1000.0).toFixed(2);
	    }
		handlerEvent.setInputAction(function (movement) {
			//movement.position.x = movement.position.x - 1433;
			var pick = viewer.scene.pick(movement.position);
			if(pick){
				if(pick.id==undefined||pick.id._name==undefined||pick.id._name===''){
					return;
				}
				if(pick.id._name==='点击后拖拽'){
					is_Click = !is_Click;
					if(!is_Click){
						viewer.scene.groundPrimitives.remove(primitiveOutline);
						primitiveOutline = null;
						var ray = viewer.camera.getPickRay(movement.position);
						var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
						postionArr.pop();
						postionArr.push(cartesian);
						mDistance = getSpaceDistance(postionArr);
						var circleOutline = new Crystal.CircleOutlineGeometry({
						   center : postionArr[0],
						   radius : mDistance
						});
						var geometry = Crystal.CircleOutlineGeometry.createGeometry(circleOutline);
						var float64ArrayPositions = geometry.attributes.position.values;
						var pos = [].slice.call(float64ArrayPositions);
						var posTemp = [];
						for(var i = 0;i<pos.length;i=i+3){
							var sT = new Crystal.Cartesian3(pos[i],pos[i+1],pos[i+2]);
							let cartographic = Crystal.Cartographic.fromCartesian(sT);
							posTemp.push(Crystal.Math.toDegrees(cartographic.longitude));
							posTemp.push(Crystal.Math.toDegrees(cartographic.latitude));
						}
						var instance = new Crystal.GeometryInstance({
						  geometry : new Crystal.GroundPolylineGeometry({
							 positions : Crystal.Cartesian3.fromDegreesArray(posTemp),
							 loop : true,
							 width : 3.0
						  }),
						  attributes : {
							 color : Crystal.ColorGeometryInstanceAttribute.fromColor(Crystal.Color.fromCssColorString('red').withAlpha(0.8))
						  }
						});
						primitiveOutline = new Crystal.GroundPolylinePrimitive({
							geometryInstances : instance,
							appearance : new Crystal.PolylineColorAppearance()
						});
						viewer.scene.groundPrimitives.add(primitiveOutline);
					}
				}
			}
		}, Crystal.ScreenSpaceEventType.LEFT_CLICK);
		handlerEvent.setInputAction(function (movement) {
			if(is_Click){
				//movement.endPosition.x = movement.endPosition.x - 1433;
				var ray = viewer.camera.getPickRay(movement.endPosition);
				var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
				postionArr.pop();
				postionArr.push(cartesian);
				mDistance = getSpaceDistance(postionArr);
				vText = (mDistance/1000.0).toFixed(2) + '公里';
				if(arrEntityee.length > 0){
					viewer.entities.remove(arrEntityee[arrEntityee.length - 1]);
					arrEntityee.pop();
				}
				arrEntityee.push(viewer.entities.add({
					name: '点击后拖拽',
					position:postionArr[postionArr.length - 1],
					point: {
						pixelSize: 5,
						color: Crystal.Color.RED,
						outlineColor: Crystal.Color.RED,
						outlineWidth: 2
					},
					label: {
						text: vText,
						font: '25px sans-serif',
						style: Crystal.LabelStyle.FILL,
						outlineWidth: 1,
						fillColor: Crystal.Color.WHITE,
						verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
						pixelOffset: new Crystal.Cartesian2(20, -20),
						showBackground: true,
						backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
					}
				}));
			}
		}, Crystal.ScreenSpaceEventType.MOUSE_MOVE);
	}
	var teamPositionInfoDataSource = null;
	var equipmentDataSource = null;
	var storageDataSource = null;
	var teamPersonDataSource = null;
	function getSquareCoordinates(arrays){ //过滤数据
		viewer.dataSources.remove(teamPositionInfoDataSource);
		viewer.dataSources.remove(IoTDataSource);
		viewer.dataSources.remove(equipmentDataSource);
		viewer.dataSources.remove(storageDataSource);
		viewer.dataSources.remove(teamPersonDataSource);
		let page = 1;
		let pageSize = 100000;
		$.ajax({
			type : 'GET',
			contentType : "application/json;charset-UTF-8",
			url:webTeamPositionInfoUrl+'?pageSize=100000&page=1',  //过滤应急队伍
			cache:false,
			async:true,
			success:function(pData) {
				let mData = {};
				mData.body = [];
				let geoEventList = {};
				geoEventList.type = "FeatureCollection";
				geoEventList.totalFeatures = pData.body.length;
				geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
				let geoFeatures = [];
				for(let i =0;i<pData.body.length;i++){
					let geometry = {};
					geometry.type = "Point";
					let lng = parseFloat(pData.body[i].lng);
					let lat = parseFloat(pData.body[i].lat);
					geometry.coordinates = [lng,lat];
					if(geometry.coordinates[0]==0){
						continue;
					}
					if(isNaN(geometry.coordinates[0])){						
						continue;
					}
					if(lng<topright.lng&&lat<topright.lat&&lng>bottomleft.lng&&lat>bottomleft.lat){ 
						let propertie = {};
						propertie.NAME = pData.body[i].ranksName;
						propertie.TeamId = pData.body[i].teamId;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "TeamPositionInfo_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
						mData.body.push(pData.body[i]);
					}
				}
				geoEventList.features = geoFeatures;
				Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
					teamPositionInfoDataSource = dataSource;
					viewer.dataSources.add(dataSource);
					var entities = dataSource.entities.values;
					for(var i=0;i<entities.length;i++){
						var entity=entities[i];
						entity.billboard.width=35;
						entity.billboard.height=45;
						entity.billboard.image = 'gzznGIS/Image/forTeam.svg';
					}
				});
				remoteTeamInfoDatas(mData);
				teamRealPathNew(geoEventList);
			},
			error:function(data) {
				console.log("EnterprisesDataError");
			}
		});
		let pParam = {page: 1,pageSize: 100000,body:{}};
		let pParam1 = {page: 1,pageSize: 10,body:{ "latitude":arrays[1],
        "longitude":arrays[0]},"sortName": "name",
		"sortOrder": "desc"};
		$.ajax({
			type : 'POST',
			contentType : "application/json;charset-UTF-8",
			//url:webIoTUrl, //过滤物联网设备
			url:webVedioFliterFind,
			cache:false,
			async:true,
			data:JSON.stringify(pParam1),
			success:function(pData) {
				let mData = {};
				mData.body = [];
				let mLot = {};
				mLot.equipName = '物联网设备';
				mLot.sortNum = 0;
				mLot.unit = '台';
				mLot.iconUrl = 'gzznGIS/Image/lot.svg';
				let mDrone = {};
				mDrone.equipName = '无人机';
				mDrone.sortNum = 0;
				mDrone.unit = '架';
				mDrone.iconUrl = 'gzznGIS/Image/drone.svg';
				let mCamera = {};
				mCamera.equipName = '摄像头';
				mCamera.sortNum = 0;
				mCamera.unit = '个';
				mCamera.iconUrl = 'gzznGIS/Image/ParkVideo.svg';
				
				let geoEventList = {};
				geoEventList.type = "FeatureCollection";
				geoEventList.totalFeatures = pData.body.length;
				geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
				let geoFeatures = [];
				for(let i =0;i<pData.body.length;i++){
					let geometry = {};
					geometry.type = "Point";
					let lng = parseFloat(pData.body[i].lon);
					let lat = parseFloat(pData.body[i].lat);
					geometry.coordinates = [lng,lat];
					if(geometry.coordinates[0]==0){
						continue;
					}
					if(isNaN(geometry.coordinates[0])){						
						continue;
					}
					if(lng<topright.lng&&lat<topright.lat&&lng>bottomleft.lng&&lat>bottomleft.lat){
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						propertie.Type = pData.body[i].type;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "IoT_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
						if(pData.body[i].type=='0'){
							mDrone.sortNum++;
						}
						else if(pData.body[i].type=='1'){
							mCamera.sortNum++;
						}
						else if(pData.body[i].type=='2'){
							mLot.sortNum++;
						}
					}
				}
				mData.body.push(mLot);
				mData.body.push(mCamera);
				mData.body.push(mDrone);
				geoEventList.features = geoFeatures;
				Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
					IoTDataSource = dataSource;
					viewer.dataSources.add(dataSource);
					var entities = dataSource.entities.values;
					for(var i=0;i<entities.length;i++){
						var entity=entities[i];
						entity.billboard.width=35;
						entity.billboard.height=45;
						if(entity._properties._Type._value=='0'){
							entity.billboard.image = 'gzznGIS/Image/drone.svg';
						}
						else if(entity._properties._Type._value=='1'){
							entity.billboard.image = 'gzznGIS/Image/ParkVideo.svg';
						}
						else if(entity._properties._Type._value=='2'){
							entity.billboard.image = 'gzznGIS/Image/lot.svg';	
						}
					}
				});
				remoteIotDeviceDatas(mData);
			},
			error:function(data) {
				console.log("EnterprisesDataError");
			}
		});
		$.ajax({
			type : 'POST',
			contentType : "application/json;charset-UTF-8",
			url:webeQuipmentManageUrl, //过滤应急装备
			cache:false,
			async:true,
			data:JSON.stringify(pParam),
			success:function(pData) {
				let mData = {};
				mData.body = [];
				let geoEventList = {};
				geoEventList.type = "FeatureCollection";
				geoEventList.totalFeatures = pData.body.length;
				geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
				let geoFeatures = [];
				for(let i =0;i<pData.body.length;i++){
					let geometry = {};
					geometry.type = "Point";
					let lng = parseFloat(pData.body[i].longitude);
					let lat = parseFloat(pData.body[i].latitude);
					geometry.coordinates = [lng,lat];
					if(geometry.coordinates[0]==0){
						continue;
					}
					if(isNaN(geometry.coordinates[0])){						
						continue;
					}
					if(lng<topright.lng&&lat<topright.lat&&lng>bottomleft.lng&&lat>bottomleft.lat){
						let propertie = {};
						propertie.NAME = pData.body[i].equipmentName;
						propertie.EquipmentNum = pData.body[i].equipmentNum;
						propertie.MeasureUnit = pData.body[i].measureUnit;
						propertie.Owner = pData.body[i].owner;
						propertie.OwnerNum = pData.body[i].ownerNum;
						propertie.Address = pData.body[i].locationName;
						propertie.Manufacturer = pData.body[i].manufacturer;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "Equipment_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
						mData.body.push(pData.body[i]);
					}
				}
				geoEventList.features = geoFeatures;
				Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
					equipmentDataSource = dataSource;
					viewer.dataSources.add(dataSource);
					var entities = dataSource.entities.values;
					for(var i=0;i<entities.length;i++){
						var entity=entities[i];
						entity.billboard.width=35;
						entity.billboard.height=45;
						entity.billboard.image = 'gzznGIS/Image/iEquipment.svg';
					}
				});
				remoteQuipmentDatas(mData);
			},
			error:function(data) {
				console.log("EnterprisesDataError");
			}
		});
		$.ajax({
			type : 'POST',
			contentType : "application/json;charset-UTF-8",
			url:webStorageManageUrl, //过滤重要设施，即以前的应急保障库
			cache:false,
			async:true,
			data:JSON.stringify(pParam),
			success:function(pData) {
				let mData = {};
				mData.body = [];
				let geoEventList = {};
				geoEventList.type = "FeatureCollection";
				geoEventList.totalFeatures = pData.body.length;
				geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
				let geoFeatures = [];
				for(let i =0;i<pData.body.length;i++){
					let geometry = {};
					geometry.type = "Point";
					let lng = pData.body[i].location.lng;
					let lat = pData.body[i].location.lat;
					geometry.coordinates = [lng,lat];
					if(geometry.coordinates[0]==0){
						continue;
					}
					if(isNaN(geometry.coordinates[0])){						
						continue;
					}
					if(lng<topright.lng&&lat<topright.lat&&lng>bottomleft.lng&&lat>bottomleft.lat){
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						propertie.EquipmentNum = pData.body[i].capacity;
						propertie.MeasureUnit = pData.body[i].capacityUnit;
						propertie.Owner = pData.body[i].pnicipal;
						propertie.OwnerNum = pData.body[i].pnicipalPlhone;
						propertie.Address = pData.body[i].locationName;
						propertie.Manufacturer = pData.body[i].restock;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "Storage_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
						mData.body.push(pData.body[i]);
					}
				}
				geoEventList.features = geoFeatures;
				Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
					storageDataSource = dataSource;
					viewer.dataSources.add(dataSource);
					var entities = dataSource.entities.values;
					for(var i=0;i<entities.length;i++){
						var entity=entities[i];
						entity.billboard.width=35;
						entity.billboard.height=45;
						entity.billboard.image = 'gzznGIS/Image/iMaterials.svg';
					}
				});
				remoteFacilitieDatas(mData);
			},
			error:function(data) {
				console.log("EnterprisesDataError");
			}
		});
		$.ajax({
			type : 'GET',
			contentType : "application/json;charset-UTF-8",
			url:webTeamPersonUrl+'?pageSize=100000&page=1',  //过滤应急人员，以前应急人员是属于应急队伍的
			cache:false,
			async:true,
			success:function(pData) {
				let mData = {};
				mData.body = [];
				let geoEventList = {};
				geoEventList.type = "FeatureCollection";
				geoEventList.totalFeatures = pData.body.length;
				geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
				let geoFeatures = [];
				for(let i =0;i<pData.body.length;i++){
					if(pData.body[i]==null){
						continue;
					}
					let geometry = {};
					geometry.type = "Point";
					let lng = parseFloat(pData.body[i].lon);
					let lat = parseFloat(pData.body[i].lat);
					geometry.coordinates = [lng,lat];
					if(geometry.coordinates[0]==0){
						continue;
					}
					if(isNaN(geometry.coordinates[0])){						
						continue;
					}
					if(lng<topright.lng&&lat<topright.lat&&lng>bottomleft.lng&&lat>bottomleft.lat){ 
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "TeamPerson_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
						mData.body.push(pData.body[i]);
					}
				}
				geoEventList.features = geoFeatures;
				Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
					teamPersonDataSource = dataSource;
					viewer.dataSources.add(dataSource);
					var entities = dataSource.entities.values;
					for(var i=0;i<entities.length;i++){
						var entity=entities[i];
						entity.billboard.width=35;
						entity.billboard.height=45;
						entity.billboard.image = 'gzznGIS/Image/forTeam.svg';
					}
				});
				remoteTeamPersonDatas(mData);
			},
			error:function(data) {
				console.log("EnterprisesDataError");
			}
		});
		urbanDangerousBackQuery();
	}
	function getWestPointByDistance(position, distance) { //西点
		var localToWorld_Matrix = Crystal.Transforms.eastNorthUpToFixedFrame(position);
		return Crystal.Matrix4.multiplyByPoint(localToWorld_Matrix, Crystal.Cartesian3.fromElements(-distance, 0 , 0), new Crystal.Cartesian3())
	}
	function getSouthPointByDistance(position, distance) { //南点
		var localToWorld_Matrix = Crystal.Transforms.eastNorthUpToFixedFrame(position);
		return Crystal.Matrix4.multiplyByPoint(localToWorld_Matrix, Crystal.Cartesian3.fromElements(0, -distance , 0), new Crystal.Cartesian3())
	}
	function getEastPointByDistance(position, distance) { //北点
		var localToWorld_Matrix = Crystal.Transforms.eastNorthUpToFixedFrame(position);
		return Crystal.Matrix4.multiplyByPoint(localToWorld_Matrix, Crystal.Cartesian3.fromElements(0, distance , 0), new Crystal.Cartesian3())
	}
	function getNorthPointByDistance(position, distance) { //东点
		var localToWorld_Matrix = Crystal.Transforms.eastNorthUpToFixedFrame(position);
		return Crystal.Matrix4.multiplyByPoint(localToWorld_Matrix, Crystal.Cartesian3.fromElements(distance, 0 , 0), new Crystal.Cartesian3())
	}
	Date.prototype.Format = function (fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	this.addPromiseEventList = function(isWartime=true){
		let pParam = {page: 1,pageSize: 100000,body:{eventType: "10008"}}
		$.ajax({
			type : 'POST',
			contentType : "application/json;charset-UTF-8",
			url:webEventListUrl,
			cache:false,
			async:true,
			data:JSON.stringify(pParam),
			success:function(pData) {
				let vValue = pData.body;
				let geoEventList = {};
				geoEventList.type = "FeatureCollection";
				geoEventList.totalFeatures = vValue.length;
				geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
				let geoFeatures = [];
				for(let i =0;i<vValue.length;i++){
					let geometry = {};
					geometry.type = "Point";
					if(vValue[i].eventCoordinate==null){
						continue;
					}
					let arrCoord = vValue[i].eventCoordinate.split(',');
					geometry.coordinates = [parseFloat(arrCoord[0]),parseFloat(arrCoord[1])];
					let propertie = {};
					propertie.NAME = vValue[i].eventName;
					propertie.LOCATION = vValue[i].eventPlace;
					propertie.TIME = vValue[i].eventTime;
					propertie.REMARK = vValue[i].eventDiscribe;
					propertie.LEVEL = vValue[i].eventLevel;
					propertie.LAYER = 20;

					let geoFeature = {};
					geoFeature.type = "Feature";
					geoFeature.id = "Event_"+vValue[i].sid;
					geoFeature.geometry = geometry;
					geoFeature.geometry_name = "the_geom";
					geoFeature.properties = propertie;
					geoFeatures.push(geoFeature);
				}
				geoEventList.features = geoFeatures;
				Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
					DrowningEventSource = dataSource;
					viewer.dataSources.add(dataSource);
					var entities = dataSource.entities.values;
					for(var i=0;i<entities.length;i++){
						var entity=entities[i];
						entity.billboard.width=35;
						entity.billboard.height=45;
						if(entity._properties._LEVEL._value == '4'){
							entity.billboard.image = 'gzznGIS/Image/iEvent4.svg';
						}
						else if(entity._properties._LEVEL._value == '3'){
							entity.billboard.image = 'gzznGIS/Image/iEvent3.svg';
						}
						else if(entity._properties._LEVEL._value == '2'){
							entity.billboard.image = 'gzznGIS/Image/iEvent2.svg';
						}
						else if(entity._properties._LEVEL._value == '1'){
							entity.billboard.image = 'gzznGIS/Image/iEvent1.svg';
						}
						if(isWartime&&i==0){
							mEntity = entity;
						}
					}
					if(mEntity!=null){
						viewer.camera.flyTo({
							destination : Crystal.Cartesian3.fromDegrees(defaultCoord.x, defaultCoord.y, defaultCoord.z),
							orientation : {
								heading : defaultCoord.heading,
								pitch : defaultCoord.pitch,
								roll : defaultCoord.roll
							},
							complete : function(){
								//console.log((new Date()).Format("yyyy-MM-dd hh:mm:ss.S"));
								setTimeout(function(){
									//console.log((new Date()).Format("yyyy-MM-dd hh:mm:ss.S"));
									let flyPromise = viewer.flyTo(mEntity,{
										duration: 5,
										offset : {
											heading : viewer.camera.heading,
											pitch : viewer.camera.pitch,
											range : 8500
									}});
									flyPromise.then(function (flyPromise) {
										if (flyPromise) {
											let name = mEntity._name;
											let time = mEntity._properties._TIME._value;
											let address = mEntity._properties._LOCATION._value;
											let remake = mEntity._properties._REMARK._value;
											pEventInfo = mEntity._id;
											let content1= '';
											content1 ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
													+'<tr><td width="10%" style="color:white;">时间：</td><td width="85%" style="color:white;">'+time+'</td></tr>'
													+'<tr><td width="10%" style="color:white;">地点：</td><td width="85%" style="color:white;">'+address+'</td></tr>'
													+'<tr><td width="10%" style="color:white;">简介：</td><td width="85%" style="color:white;max-width: 600px;">'+remake+'</td></tr>';
											content1+='</tbody></table>';
											let screenPos = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, mEntity.position._value);
											var cPoint = new Crystal.Cartesian2(screenPos.x, screenPos.y);
											var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(cPoint), viewer.scene);
											var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
											var height = viewer.scene.globe.getHeight(geoPt1);
											var point = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
											var content= {};
											content.content=content1;
											content.position=Crystal.Cartesian3.fromDegrees(point[0], point[1], height);
											content.screen = screenPos;
											viewer.selectedEntity = mEntity;
											infoWindow(content);
											function infoWindow(obj) {
												$('#trackPopUpLink').empty();
												$('#trackPopUpLink').append(obj.content);    		            	
												function positionPopUp (c) {
													var x = c.x - ($('#trackPopUpContent').width()) / 2;
													var y = c.y - ($('#trackPopUpContent').height());
													$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-50) + 'px, 0)');
												}
												var c = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);//new Crystal.Cartesian2(obj.screen.x, obj.screen.y);
												$('#trackPopUp').show();
												positionPopUp(c);
												
												removeEventHandler = viewer.scene.postRender.addEventListener(function () {
													try{
														var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
														if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
															positionPopUp(changedC);
															c = changedC;
														}
													}
													catch(err){}
												});
												
												$('.leaflet-popup-close-button_track').click(function() {
													viewer.selectedEntity = undefined;
													$('#trackPopUp').hide();
													$('#trackPopUpLink').empty();
													removeEventHandler.call();
													return false;
												});
												return "";
											};
											eventRange(mEntity,vRadius);
										}
									}).otherwise(function (error) {
										console.log(error);
									});
								}, 5000 );
							}
						});
					}
				});
			},
			error:function(data) {
				console.log("EnterprisesDataError");
			}
		});
	}
	var removeEventHandler = null;
	this.addPromiseEventInfo = function(vValue,isWartime=true){
		$('#trackPopUp').hide();
		$('#trackPopUpLink').empty();
		if(removeEventHandler!=null){
			removeEventHandler.call();
		}
		clearEventRange();
		mEntity = DrowningEventSource.entities.getById('Event_'+vValue.sid);
		if(mEntity!=undefined){
			viewer.selectedEntity = mEntity;
			viewer.flyTo(mEntity,{
				duration: 3,
				offset : {
					heading : Crystal.Math.toRadians(0.0),
					pitch : Crystal.Math.toRadians(-45),
					range : 8500
			}});
			setTimeout(function(){
				let name = mEntity._name;
				let time = mEntity._properties._TIME._value;
				let address = mEntity._properties._LOCATION._value;
				let remake = mEntity._properties._REMARK._value;
				pEventInfo = mEntity._id;
				let content1= '';
				content1 ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
						+'<tr><td width="10%" style="color:white;">时间：</td><td width="85%" style="color:white;">'+time+'</td></tr>'
						+'<tr><td width="10%" style="color:white;">地点：</td><td width="85%" style="color:white;">'+address+'</td></tr>'
						+'<tr><td width="10%" style="color:white;">简介：</td><td width="85%" style="color:white;max-width: 600px;">'+remake+'</td></tr>';
				content1+='</tbody></table>';
				var content= {};
				content.content=content1;
				content.position=mEntity.position._value;
				content.screen = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, mEntity.position._value);
				infoWindow(content);
				function infoWindow(obj) {
					$('#trackPopUpLink').empty();
					$('#trackPopUpLink').append(obj.content);    		            	
					function positionPopUp (c) {
						var x = c.x - ($('#trackPopUpContent').width()) / 2;
						var y = c.y - ($('#trackPopUpContent').height());
						$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-50) + 'px, 0)');
					}
					var c = new Crystal.Cartesian2(obj.screen.x, obj.screen.y);
					$('#trackPopUp').show();
					positionPopUp(c);
					
					removeEventHandler = viewer.scene.postRender.addEventListener(function () {
						try{
							var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
							if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
								positionPopUp(changedC);
								c = changedC;
							}
						}
						catch(err){}
					});
					
					$('.leaflet-popup-close-button_track').click(function() {
						//viewer.selectedEntity = undefined;
						//if(!pUrgentType){
							//viewer.dataSources.remove(DrowningEventSource);
						//}
						$('#trackPopUp').hide();
						$('#trackPopUpLink').empty();
						//offWartime();
						removeEventHandler.call();
						return false;
					});
					return "";
				};
				if(isWartime){
					eventRange(mEntity, vRadius);
				}
				//teamRealPath();  //先关掉车辆的轨迹，用移动图标的方式。
			}, 3000);
		}
	}
	this.addPromiseEventInfo_ = function(vValue){
		viewer.dataSources.remove(DrowningEventSource);
		$('#trackPopUp').hide();
		$('#trackPopUpLink').empty();
		clearEventRange();
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = 1;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		
		let geometry = {};
		geometry.type = "Point";
		let arrCoord = vValue.eventCoordinate.split(',');
		geometry.coordinates = [parseFloat(arrCoord[0]),parseFloat(arrCoord[1])];
		let propertie = {};
		propertie.NAME = vValue.eventName;
		propertie.LOCATION = vValue.eventPlace;
		propertie.TIME = vValue.eventTime;
		propertie.REMARK = vValue.eventDiscribe;
		propertie.LEVEL = vValue.eventLevel;
		propertie.LAYER = 20;

		let geoFeature = {};
		geoFeature.type = "Feature";
		geoFeature.id = "Event_"+vValue.sid;
		geoFeature.geometry = geometry;
		geoFeature.geometry_name = "the_geom";
		geoFeature.properties = propertie;
		geoFeatures.push(geoFeature);
		
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			DrowningEventSource = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				if(entity._properties._LEVEL._value == '4'){
					entity.billboard.image = 'gzznGIS/Image/iEvent4.svg';
				}
				else if(entity._properties._LEVEL._value == '3'){
					entity.billboard.image = 'gzznGIS/Image/iEvent3.svg';
				}
				else if(entity._properties._LEVEL._value == '2'){
					entity.billboard.image = 'gzznGIS/Image/iEvent2.svg';
				}
				else if(entity._properties._LEVEL._value == '1'){
					entity.billboard.image = 'gzznGIS/Image/iEvent1.svg';
				}
				mEntity = entity;
				viewer.selectedEntity = entity;
				viewer.flyTo(entity,{
					duration: 3,
					offset : {
						heading : Crystal.Math.toRadians(0.0),
						pitch : Crystal.Math.toRadians(-45),
						range : 3800
				}});
				setTimeout(function(){
					let name = entity._name;
					let time = entity._properties._TIME._value;
					let address = entity._properties._LOCATION._value;
					let remake = entity._properties._REMARK._value;
					pEventInfo = entity._id;
					let content1= '';
					content1 ='<div style="color: white;font-weight: bold;">'+ name +'</div><table><tbody>'
							+'<tr><td width="10%" style="color:white;">时间：</td><td width="85%" style="color:white;">'+time+'</td></tr>'
							+'<tr><td width="10%" style="color:white;">地点：</td><td width="85%" style="color:white;">'+address+'</td></tr>'
							+'<tr><td width="10%" style="color:white;">简介：</td><td width="85%" style="color:white;">'+remake+'</td></tr>';
					content1+='</tbody></table>';
					var content= {};
					content.content=content1;
					content.position=entity.position._value;
					content.screen = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, entity.position._value);
					infoWindow(content);
					function infoWindow(obj) {
						$('#trackPopUpLink').empty();
						$('#trackPopUpLink').append(obj.content);    		            	
						function positionPopUp (c) {
							var x = c.x - ($('#trackPopUpContent').width()) / 2;
							var y = c.y - ($('#trackPopUpContent').height());
							$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + (y-50) + 'px, 0)');
						}
						var c = new Crystal.Cartesian2(obj.screen.x, obj.screen.y);
						$('#trackPopUp').show();
						positionPopUp(c);
						
						var removeHandler = viewer.scene.postRender.addEventListener(function () {
							try{
								var changedC = Crystal.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, obj.position);
								if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
									positionPopUp(changedC);
									c = changedC;
								}
							}
							catch(err){}
						});
						
						$('.leaflet-popup-close-button_track').click(function() {
							//viewer.selectedEntity = undefined;
							//if(!pUrgentType){
								//viewer.dataSources.remove(DrowningEventSource);
							//}
							$('#trackPopUp').hide();
							$('#trackPopUpLink').empty();
							//offWartime();
							removeHandler.call();
							return false;
						});
						return "";
					}
				}, 3000);
			}
		});
	}
	var aviationTempDataSource = null;
	function aviationTempProvider(isBool=true){ //临时起降点
		if(aviationTempDataSource==null){
			let pParam = {page: 1,pageSize: 100000,body:{type: "1"}}
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webAviationUrl,
				cache:false,
				async:true,
				data:JSON.stringify(pParam),
				success:function(pData) {
					let geoEventList = {};
					geoEventList.type = "FeatureCollection";
					geoEventList.totalFeatures = pData.body.length;
					geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){						
							continue;
						}
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						propertie.Address = pData.body[i].address;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "AviationTemp_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
					}
					geoEventList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
						aviationTempDataSource = dataSource;
						viewer.dataSources.add(dataSource);
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							var entity=entities[i];
							entity.billboard.width=35;
							entity.billboard.height=45;
							entity.billboard.image = 'gzznGIS/Image/iMaterials.svg';
						}
						if(oneMagFlag!=2){
							viewer.flyTo(aviationTempDataSource);
						}
					});
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(aviationTempDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(aviationTempDataSource);
			}
		}
	}
	var aviationBaseDataSource = null;
	function aviationBaseProvider(isBool=true){ //航空消防基地
		if(aviationBaseDataSource==null){
			let pParam = {page: 1,pageSize: 100000,body:{type: "2"}}
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webAviationUrl,
				cache:false,
				async:true,
				data:JSON.stringify(pParam),
				success:function(pData) {
					let geoEventList = {};
					geoEventList.type = "FeatureCollection";
					geoEventList.totalFeatures = pData.body.length;
					geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){						
							continue;
						}
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						propertie.Address = pData.body[i].address;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "AviationBase_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
					}
					geoEventList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
						aviationBaseDataSource = dataSource;
						viewer.dataSources.add(dataSource);
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							var entity=entities[i];
							entity.billboard.width=35;
							entity.billboard.height=45;
							entity.billboard.image = 'gzznGIS/Image/iMaterials.svg';
						}
						if(oneMagFlag!=2){
							viewer.flyTo(aviationBaseDataSource);
						}
					});
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(aviationBaseDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(aviationBaseDataSource);
			}
		}
	}
	var aviationWaterDataSource = null;
	var aviationWaterFlag = {'1':'河流','2':'湖泊','3':'水库','4':'鱼塘'};
	function aviationWaterProvider(isBool=true){ //直升机取水点
		if(aviationWaterDataSource==null){
			let pParam = {page: 1,pageSize: 100000,body:{}}
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webHelicopterUrl,
				cache:false,
				async:true,
				data:JSON.stringify(pParam),
				success:function(pData) {
					let geoEventList = {};
					geoEventList.type = "FeatureCollection";
					geoEventList.totalFeatures = pData.body.length;
					geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){						
							continue;
						}
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						propertie.Address = pData.body[i].address;
						propertie.Type = aviationWaterFlag[pData.body[i].type];
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "AviationWater_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
					}
					geoEventList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
						aviationWaterDataSource = dataSource;
						viewer.dataSources.add(dataSource);
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							var entity=entities[i];
							entity.billboard.width=35;
							entity.billboard.height=45;
							entity.billboard.image = 'gzznGIS/Image/helicopter.svg';
						}
						if(oneMagFlag!=2){
							viewer.flyTo(aviationWaterDataSource);
						}
					});
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(aviationWaterDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(aviationWaterDataSource);
			}
		}
	}
	var lotVedioDataSource = null;
	function addPromiseLotVedio(isBool=true){ //摄像头
		if(lotVedioDataSource==null){
			let pParam = {page: 1,pageSize: 100000,body:{type: "1"}}
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webIoTUrl,
				cache:false,
				async:true,
				data:JSON.stringify(pParam),
				success:function(pData) {
					let geoEventList = {};
					geoEventList.type = "FeatureCollection";
					geoEventList.totalFeatures = pData.body.length;
					geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){						
							continue;
						}
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "LotVedio_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
					}
					geoEventList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
						lotVedioDataSource = dataSource;
						viewer.dataSources.add(dataSource);
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							var entity=entities[i];
							entity.billboard.width=35;
							entity.billboard.height=45;
							entity.billboard.image = 'gzznGIS/Image/ParkVideo.svg';
						}
						if(oneMagFlag!=2){
							viewer.flyTo(lotVedioDataSource);
						}
					});
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(lotVedioDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(lotVedioDataSource);
			}
		}
	}
	var droneDataSource = null;
	function addPromiseDrone(){ //无人机
		if(droneDataSource==null){
			let pParam = {page: 1,pageSize: 100000,body:{type: "0"}}
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webIoTUrl,
				cache:false,
				async:true,
				data:JSON.stringify(pParam),
				success:function(pData) {
					let geoEventList = {};
					geoEventList.type = "FeatureCollection";
					geoEventList.totalFeatures = pData.body.length;
					geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){						
							continue;
						}
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "Drone_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
					}
					geoEventList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
						droneDataSource = dataSource;
						viewer.dataSources.add(dataSource);
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							var entity=entities[i];
							entity.billboard.width=35;
							entity.billboard.height=45;
							entity.billboard.image = 'gzznGIS/Image/drone.svg';
						}
						if(oneMagFlag!=2){
							viewer.flyTo(droneDataSource);
						}
					});
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(droneDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(droneDataSource);
			}
		}
	}
	var IoTDataSource = null;
	function addPromiseIoT(){ //物联网
		if(IoTDataSource==null){
			let pParam = {page: 1,pageSize: 100000,body:{type: "2"}}
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webIoTUrl,
				cache:false,
				async:true,
				data:JSON.stringify(pParam),
				success:function(pData) {
					let geoEventList = {};
					geoEventList.type = "FeatureCollection";
					geoEventList.totalFeatures = pData.body.length;
					geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){						
							continue;
						}
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "IoT_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
					}
					geoEventList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
						IoTDataSource = dataSource;
						viewer.dataSources.add(dataSource);
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							var entity=entities[i];
							entity.billboard.width=35;
							entity.billboard.height=45;
							entity.billboard.image = 'gzznGIS/Image/lot.svg';
						}
						if(oneMagFlag!=2){
							viewer.flyTo(IoTDataSource);
						}
					});
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(IoTDataSource);
			if(oneMagFlag!=2){
				viewer.flyTo(IoTDataSource);
			}
		}
	}
	
	var bewareDataSource = null;
	this.addPromiseBeware = function(is_Bool){ //堤防
		if(is_Bool){
			if(bewareDataSource==null){
				let pParam = {page: 1,pageSize: 100000,body:{}}
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webBewareUrl,
					cache:false,
					async:true,
					data:JSON.stringify(pParam),
					success:function(pData) {
						let geoEventList = {};
						geoEventList.type = "FeatureCollection";
						geoEventList.totalFeatures = pData.body.length;
						geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.DutyName = pData.body[i].dutyName;
							propertie.Address = pData.body[i].address;
							
							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "Beware_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEventList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
							bewareDataSource = dataSource;
							viewer.dataSources.add(dataSource);
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								var entity=entities[i];
								entity.billboard.width=35;
								entity.billboard.height=45;
								entity.billboard.image = 'gzznGIS/Image/beware.svg';
								//entity.billboard.image = 'gzznGIS/Image/beware.png';
							}
							viewer.flyTo(bewareDataSource);
						});
					},
					error:function(data) {
						console.log("EnterprisesDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(bewareDataSource);
				viewer.flyTo(bewareDataSource);
			}
		}
		else{
			viewer.dataSources.remove(bewareDataSource);
		}
	}
	var rainfallStationDataSource = null;
	this.addPromiseRainfallStation = function(is_Bool){ //雨量站
		if(is_Bool){
			if(rainfallStationDataSource==null){
				let pParam = {page: 1,pageSize: 100000,body:{}}
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webRainfallStationUrl,
					cache:false,
					async:true,
					data:JSON.stringify(pParam),
					success:function(pData) {
						let geoEventList = {};
						geoEventList.type = "FeatureCollection";
						geoEventList.totalFeatures = pData.body.length;
						geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.RealTimeRainfall = pData.body[i].realTimeRainfall;
							propertie.TodayRainfall = pData.body[i].todayRainfall;
							propertie.Unit = pData.body[i].unit;
							propertie.Address = pData.body[i].address;
							
							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "RainfallStation_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEventList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
							rainfallStationDataSource = dataSource;
							viewer.dataSources.add(dataSource);
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								var entity=entities[i];
								entity.billboard.width=35;
								entity.billboard.height=45;
								entity.billboard.image = 'gzznGIS/Image/Station.svg';
							}
							viewer.flyTo(rainfallStationDataSource);
						});
					},
					error:function(data) {
						console.log("EnterprisesDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(rainfallStationDataSource);
				viewer.flyTo(rainfallStationDataSource);
			}
		}
		else{
			viewer.dataSources.remove(rainfallStationDataSource);
		}
	}
	var waterLevelDataSource = null;
	this.addPromiseWaterLevel = function(is_Bool,isFly=true){ //水位站
		if(is_Bool){
			if(waterLevelDataSource==null){
				let pParam = {page: 1,pageSize: 100000,body:{}}
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webWaterLevelUrl,
					cache:false,
					async:true,
					data:JSON.stringify(pParam),
					success:function(pData) {
						let geoEventList = {};
						geoEventList.type = "FeatureCollection";
						geoEventList.totalFeatures = pData.body.length;
						geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.NUM = pData.body[i].value;
							propertie.Unit = pData.body[i].unit;
							propertie.Address = pData.body[i].address;
							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "WaterLevel_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEventList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
							waterLevelDataSource = dataSource;
							viewer.dataSources.add(dataSource);
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								var entity=entities[i];
								entity.billboard.width=35;
								entity.billboard.height=45;
								entity.billboard.image = 'gzznGIS/Image/WaterLevel.svg';
							}
							if(isFly){
								viewer.flyTo(waterLevelDataSource);
							}
						});
					},
					error:function(data) {
						console.log("EnterprisesDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(waterLevelDataSource);
				viewer.flyTo(waterLevelDataSource);
			}
		}
		else{
			viewer.dataSources.remove(waterLevelDataSource);
		}
	}
	var waterloggingPointDataSource = null;
	this.addPromiseWaterloggingPoint = function(is_Bool, isFly=true){ //内涝点
		if(is_Bool){
			if(waterloggingPointDataSource==null){
				let pParam = {page: 1,pageSize: 100000,body:{type:'1'}}
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webWaterloggingPointUrl,
					cache:false,
					async:true,
					data:JSON.stringify(pParam),
					success:function(pData) {
						let geoEventList = {};
						geoEventList.type = "FeatureCollection";
						geoEventList.totalFeatures = pData.body.length;
						geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.Degree = pData.body[i].degree;
							propertie.Condition = pData.body[i].condition;
							propertie.Address = pData.body[i].address;
							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "WaterloggingPoint_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEventList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
							waterloggingPointDataSource = dataSource;
							viewer.dataSources.add(dataSource);
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								var entity=entities[i];
								entity.billboard.width=35;
								entity.billboard.height=45;
								entity.billboard.image = 'gzznGIS/Image/waterloggingPoint.svg';
								//entity.billboard.image = 'gzznGIS/Image/waterloggingPoint.png';
							}
							if(isFly){
								viewer.flyTo(waterloggingPointDataSource);
							}
						});
					},
					error:function(data) {
						console.log("EnterprisesDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(waterloggingPointDataSource);
				viewer.flyTo(waterloggingPointDataSource);
			}
		}
		else{
			viewer.dataSources.remove(waterloggingPointDataSource);
		}
	}
	var tunnelDataSource = null;
	this.addPromiseTunnel = function(is_Bool, is_Fly=true){ //隧道
		if(is_Bool){
			if(tunnelDataSource==null){
				let pParam = {page: 1,pageSize: 100000,body:{type:'2'}}
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webWaterloggingPointUrl,
					cache:false,
					async:true,
					data:JSON.stringify(pParam),
					success:function(pData) {
						let geoEventList = {};
						geoEventList.type = "FeatureCollection";
						geoEventList.totalFeatures = pData.body.length;
						geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.Degree = pData.body[i].degree;
							propertie.Condition = pData.body[i].condition;
							propertie.Address = pData.body[i].address;
							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "Tunnel_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEventList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
							tunnelDataSource = dataSource;
							viewer.dataSources.add(dataSource);
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								var entity=entities[i];
								entity.billboard.width=35;
								entity.billboard.height=45;
								entity.billboard.image = 'gzznGIS/Image/tunnel.svg';
							}
							if(is_Fly){
								viewer.flyTo(tunnelDataSource);	
							}
						});
					},
					error:function(data) {
						console.log("EnterprisesDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(tunnelDataSource);
				viewer.flyTo(tunnelDataSource);
			}
		}
		else{
			viewer.dataSources.remove(tunnelDataSource);
		}
	}
	var reservoirsDataSource = null;
	this.addPromiseReservoirs = function(is_Bool){ //水库
		if(is_Bool){
			if(reservoirsDataSource==null){
				let pParam = {page: 1,pageSize: 100000,body:{}}
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webReservoirUrl,
					cache:false,
					async:true,
					data:JSON.stringify(pParam),
					success:function(pData) {
						let geoEventList = {};
						geoEventList.type = "FeatureCollection";
						geoEventList.totalFeatures = pData.body.length;
						geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.WaterLevel = pData.body[i].waterLevel;
							propertie.WaterYield = pData.body[i].waterYield;
							propertie.Address = pData.body[i].address;
							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "Reservoirs_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEventList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
							reservoirsDataSource = dataSource;
							viewer.dataSources.add(dataSource);
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								var entity=entities[i];
								entity.billboard.width=35;
								entity.billboard.height=45;
								entity.billboard.image = 'gzznGIS/Image/Reservoirs.svg';
							}
							viewer.flyTo(reservoirsDataSource);
						});
					},
					error:function(data) {
						console.log("EnterprisesDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(reservoirsDataSource);
				viewer.flyTo(reservoirsDataSource);
			}
		}
		else{
			viewer.dataSources.remove(reservoirsDataSource);
		}
	}
	this.addPromiseNephogram = function(){ //添加降雨量
		//$('#crystalContainerEx2').append('<img id="obtdisPic" src="'+webRainfallPicUrl+'" style="width: 100%; height: 100%;">');
		//$('#crystalContainerEx3').append('<img id="typhoonPic" src="'+webTyphoonUrl+'" style="width: 100%; height: 100%;">');
		
		if(terrainUrl!=''){
			var terrainProvider = new Crystal.CrystalTerrainProvider({url: terrainUrl});
			viewerEx2 = new Crystal.Viewer('crystalContainerEx2',{terrainProvider:terrainProvider,envToolPicker:false,fullscreenButton:false,animation:false,
				timeline:false,sceneModePicker:false,homeButton:false,geocoder:false,imageryProviderViewModelsIndex: 1,});
		}
		else{
			viewerEx2 = new Crystal.Viewer('crystalContainerEx2',{envToolPicker:false,fullscreenButton:false,animation:false,
				timeline:false,sceneModePicker:false,homeButton:false,geocoder:false,imageryProviderViewModelsIndex: 1,});
		}
		Crystal.GeoJsonDataSource.load('gzznGIS/Model/gzLine.json',{clampToGround: true}).then(function (dataSource) {
			viewerEx2.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			for(var i=0;i<entities.length;i++){
				var entity = entities[i];
				entity.polyline.width = 3;
				entity.polyline.material = Crystal.Color.RED.withAlpha(0.9);
			}
		});
		document.getElementById('crystalContainerEx2').lastChild.style.borderRadius = '10px';
		
		let pParam = {page: 1,pageSize: 100000,body:{}};
		$.ajax({
			type : 'POST',
			contentType : "application/json;charset-UTF-8",
			url:webRainfallUrl,
			cache:false,
			async:true,
			data:JSON.stringify(pParam),
			success:function(pData) {
				var lonmin=1000;
				var lonmax=-1000;
				var latmin=1000;
				var latmax=-1000;
				let valueMin = -1000;
				let valueMax = 1000;
				let mData = [];
				for(let i =0;i<pData.body.length;i++){
					let lon = parseFloat(pData.body[i].lon);
					let lat = parseFloat(pData.body[i].lat);
					let value = parseFloat(pData.body[i].value);
					let a= {};
					a["x"]=lon;
					a["y"]=lat;
					a["value"]= value;
					mData.push(a);
					lonmin = lon<lonmin?lon:lonmin;
					latmin = lat<latmin?lat:latmin;
					lonmax = lon>lonmax?lon:lonmax;
					latmax = lat>latmax?lat:latmax;
					valueMin = value<valueMin?value:valueMin;
					valueMax = value>valueMax?value:valueMax;
				}
				var xrange = lonmax-lonmin;
				var yrange = latmax-latmin;
				var heatmapExtent={west:lonmin-xrange/10,south:latmin-yrange/10, east:lonmax+xrange/10,north:latmax+yrange/10};
				var coloredtape={ //热力图的色带
						'gradient':{
							'.3': 'blue',
							'.65': 'yellow',
							'.8': 'orange',
							'.95': 'red'
						}
				};
				var heatmapObj = CrystalHeatmap.create(viewerEx2, heatmapExtent, (coloredtape ? coloredtape : {}));
				var is_Bool = heatmapObj.setWGS84Data(valueMin, valueMax, mData);
			},
			error:function(data) {
				console.log("EnterprisesDataError");
			}
		}); 
	}
	this.closeLayer3D = function(){
		layer.close(layer3DIndex);
	}
	var waterloggingDataSource = null;
	this.addPromiseWaterloggingPointLocation = function(record){ //这个内涝点跟上面的数据源不一致
		viewer.dataSources.remove(waterloggingDataSource);
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = 1;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<1;i++){
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(record.lon),parseFloat(record.lat)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){
				continue;
			}
			let propertie = {};
			propertie.NAME = record.name;
			propertie.Degree = record.degree;
			propertie.Address = record.address;
			propertie.Condition = record.condition;
			
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "WaterloggingPoint_"+record.sid;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			waterloggingDataSource = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			let tempEntity;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				entity.billboard.image = 'gzznGIS/Image/waterloggingPoint.svg';
				tempEntity = entity;
			}
			viewer.selectedEntity = tempEntity;
			viewer.flyTo(tempEntity,{
				duration: 3,
				offset : {
					heading : Crystal.Math.toRadians(0.0),
					pitch : Crystal.Math.toRadians(-45),
					range : 8500
			}});
		});		
	}
	this.addPromiseWaterStationLocation = function(sid){ //定位水位站
		if(waterLevelDataSource!=null){
			let tempEntity = waterLevelDataSource.entities.getById('WaterLevel_'+sid);
			if(!WaterStationState){
				viewer.dataSources.add(waterLevelDataSource);
				changeIconState('5');
			}
			if(tempEntity!=undefined){
				viewer.selectedEntity = tempEntity;
				viewer.flyTo(tempEntity,{
					duration: 3,
					offset : {
						heading : Crystal.Math.toRadians(0.0),
						pitch : Crystal.Math.toRadians(-45),
						range : 5500
				}});
			}
		}
		else{
			let pParam = {page: 1,pageSize: 100000,body:{}}
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webWaterLevelUrl,
				cache:false,
				async:true,
				data:JSON.stringify(pParam),
				success:function(pData) {
					let geoEventList = {};
					geoEventList.type = "FeatureCollection";
					geoEventList.totalFeatures = pData.body.length;
					geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){						
							continue;
						}
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						propertie.NUM = pData.body[i].value;
						propertie.Unit = pData.body[i].unit;
						propertie.Address = pData.body[i].address;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "WaterLevel_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
					}
					geoEventList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
						waterLevelDataSource = dataSource;
						viewer.dataSources.add(dataSource);
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							var entity=entities[i];
							entity.billboard.width=35;
							entity.billboard.height=45;
							entity.billboard.image = 'gzznGIS/Image/WaterLevel.svg';
						}
						let tempEntity = waterLevelDataSource.entities.getById('WaterLevel_'+sid);
						if(tempEntity!=undefined){
							viewer.selectedEntity = tempEntity;
							viewer.flyTo(tempEntity,{
								duration: 3,
								offset : {
									heading : Crystal.Math.toRadians(0.0),
									pitch : Crystal.Math.toRadians(-45),
									range : 5500
							}});
						}
						changeIconState('5');
					});
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		}
	}
	var fireTeamLDataSource = null;
	this.addPromiseFireTeamLoc = function(sid){ //关联面板
		if(teamPositionInfoDataSource!=null){
			let tempEntity = teamPositionInfoDataSource.entities.getById('FirefightingTeam_'+sid);
			/**
			var layer3D = document.getElementById('layer3D');
			if(layer3D!=null){
			   let isBool = layer3D.children[0].contentWindow.getTreeNodeState(181);
			   if(!isBool){
				   layer3D.children[0].contentWindow.setTreeNode(181);
			   }
			} */
			if(tempEntity!=undefined){
				viewer.selectedEntity = tempEntity;
				viewer.flyTo(tempEntity,{
					duration: 3,
					offset : {
						heading : Crystal.Math.toRadians(0.0),
						pitch : Crystal.Math.toRadians(-45),
						range : 5500
				}});
			}
		}
		/**
		else{
			$.ajax({
				type : 'GET',
				contentType : "application/json;charset-UTF-8",
				url:webFirefightingTeamUrl,
				cache:false,
				async:true,
				success:function(pData) {
					let geoEventList = {};
					geoEventList.type = "FeatureCollection";
					geoEventList.totalFeatures = pData.body.length;
					geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){						
							continue;
						}
						let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.PersonnelNum = pData.body[i].personnelNum;
							propertie.TeamName = pData.body[i].teamName;
							propertie.Contacts = pData.body[i].contacts;
							propertie.EquipmentList = pData.body[i].equipmentList;
							propertie.SceneReliefMaterialsList = pData.body[i].sceneReliefMaterialsList;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "FirefightingTeam_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
					}
					geoEventList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
						firefightingTeamDataSource = dataSource;
						//viewer.dataSources.add(dataSource);
						fireTeamLocationFlag = true;
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							var entity=entities[i];
							entity.billboard.width=35;
							entity.billboard.height=45;
							entity.billboard.image = 'gzznGIS/Image/forTeam.svg';
						}
						let tempEntity = firefightingTeamDataSource.entities.getById('FirefightingTeam_'+sid);
						if(tempEntity!=undefined){
							viewer.selectedEntity = tempEntity;
							viewer.flyTo(tempEntity,{
								duration: 3,
								offset : {
									heading : Crystal.Math.toRadians(0.0),
									pitch : Crystal.Math.toRadians(-45),
									range : 8500
							}});
						}
						var layer3D = document.getElementById('layer3D');
						if(layer3D==null){
							openLayer3D();
						}
						if(layer3D!=null){
						   layer3D.children[0].contentWindow.setTreeNode(181);
						} 
					});
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			}); 
		} */
	}
	this.addPromiseFireTeamLocation = function(pData){ //定位救火队伍，修改成单点定位，不关联面板
		viewer.dataSources.remove(fireTeamLDataSource);
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = 1;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<1;i++){
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(pData.lon),parseFloat(pData.lat)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){						
				continue;
			}
			let propertie = {};
				propertie.NAME = pData.name;
				propertie.PersonnelNum = pData.personnelNum;
				propertie.TeamName = pData.teamName;
				propertie.Contacts = pData.contacts;
				propertie.EquipmentList = pData.equipmentList;
				propertie.SceneReliefMaterialsList = pData.sceneReliefMaterialsList;
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "FirefightingTeam_"+pData.sid;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			fireTeamLDataSource = dataSource;
			viewer.dataSources.add(dataSource);
			fireTeamLocationFlag = true;
			var entities = dataSource.entities.values;
			let tempEntity;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				entity.billboard.image = 'gzznGIS/Image/forTeam.svg';
				tempEntity = entity;
			}
			viewer.selectedEntity = tempEntity;
			viewer.flyTo(tempEntity,{
				duration: 3,
				offset : {
					heading : Crystal.Math.toRadians(0.0),
					pitch : Crystal.Math.toRadians(-45),
					range : 8500
			}});
		});
	}
	var fireExpertLDataSource = null;
	this.addPromiseFireExpertLocation = function(pData){ //定位救火专家，修改成单点定位，不关联面板。
		viewer.dataSources.remove(fireExpertLDataSource);
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = 1;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<1;i++){
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(pData.lon),parseFloat(pData.lat)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){						
				continue;
			}
			let propertie = {};
			propertie.NAME = pData.name;
			propertie.FireExpertNum = pData.fireExpertNum;
			propertie.OtherExpertNum = pData.otherExpertNum;
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "FireExperts_"+pData.sid;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			fireExpertLDataSource = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			let tempEntity;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				entity.billboard.image = 'gzznGIS/Image/forExpert.svg';
				tempEntity = entity;
			}
			viewer.selectedEntity = tempEntity;
			viewer.flyTo(tempEntity,{
				duration: 3,
				offset : {
					heading : Crystal.Math.toRadians(0.0),
					pitch : Crystal.Math.toRadians(-45),
					range : 8500
			}});
		});
		/**
		if(fireExpertsDataSource!=null){
			let tempEntity = fireExpertsDataSource.entities.getById('FireExperts_'+sid);
			var layer3D = document.getElementById('layer3D');
			if(layer3D!=null){
			   let isBool = layer3D.children[0].contentWindow.getTreeNodeState(182);
			   if(!isBool){
				   layer3D.children[0].contentWindow.setTreeNode(182);
			   }
			}
			if(tempEntity!=undefined){
				viewer.selectedEntity = tempEntity;
				viewer.flyTo(tempEntity,{
					duration: 3,
					offset : {
						heading : Crystal.Math.toRadians(0.0),
						pitch : Crystal.Math.toRadians(-45),
						range : 5500
				}});
			}
		}
		else{
			$.ajax({
				type : 'GET',
				contentType : "application/json;charset-UTF-8",
				url:webFireExpertsUrl,
				cache:false,
				async:true,
				success:function(pData) {
					let geoEventList = {};
					geoEventList.type = "FeatureCollection";
					geoEventList.totalFeatures = pData.body.length;
					geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
					let geoFeatures = [];
					for(let i =0;i<pData.body.length;i++){
						let geometry = {};
						geometry.type = "Point";
						geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
						if(geometry.coordinates[0]==0){
							continue;
						}
						if(isNaN(geometry.coordinates[0])){						
							continue;
						}
						let propertie = {};
						propertie.NAME = pData.body[i].name;
						propertie.FireExpertNum = pData.body[i].fireExpertNum;
						propertie.OtherExpertNum = pData.body[i].otherExpertNum;
						let geoFeature = {};
						geoFeature.type = "Feature";
						geoFeature.id = "FireExperts_"+pData.body[i].sid;
						geoFeature.geometry = geometry;
						geoFeature.geometry_name = "the_geom";
						geoFeature.properties = propertie;
						geoFeatures.push(geoFeature);
					}
					geoEventList.features = geoFeatures;
					Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
						fireExpertsDataSource = dataSource;
						var entities = dataSource.entities.values;
						for(var i=0;i<entities.length;i++){
							var entity=entities[i];
							entity.billboard.width=35;
							entity.billboard.height=45;
							entity.billboard.image = 'gzznGIS/Image/forExpert.svg';
						}
						let tempEntity = fireExpertsDataSource.entities.getById('FireExperts_'+sid);
						if(tempEntity!=undefined){
							viewer.selectedEntity = tempEntity;
							viewer.flyTo(tempEntity,{
								duration: 3,
								offset : {
									heading : Crystal.Math.toRadians(0.0),
									pitch : Crystal.Math.toRadians(-45),
									range : 5500
							}});
						}
						var layer3D = document.getElementById('layer3D');
						if(layer3D==null){
							openLayer3D();
						}
						if(layer3D!=null){
						   layer3D.children[0].contentWindow.setTreeNode(182);
						}
					});
				},
				error:function(data) {
					console.log("EnterprisesDataError");
				}
			});
		} */
	}
	var shelterDataSourceArray = new Array();
	var shelterType = {'0':'室内','1':'室外','2':'室内、室外'};
	this.addPromiseShelterArea = function(cCode, is_Bool){ //避难场所按区域
		if(is_Bool){
			if(shelterDataSourceArray[cCode] == null){
				let strJson={};
					strJson.body = {countyCode:parseInt(cCode)};
					strJson.page = 1;
					strJson.pageSize = 100000;
					strJson.sortName = "sid";
					strJson.sortOrder = "desc";
				$.ajax({
					type : 'POST',
					contentType : "application/json;charset-UTF-8",
					url:webShelterAreaUrl,
					cache:false,
					async:true,
					data:JSON.stringify(strJson),
					success:function(pData) {
						let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body[i].lon),parseFloat(pData.body[i].lat)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body[i].name;
							propertie.Address = pData.body[i].address;
							propertie.Contacts = pData.body[i].contacts;
							propertie.ContactsPhone = pData.body[i].contactsPhone;
							propertie.Type = shelterType[pData.body[i].type];
							propertie.Area = pData.body[i].area;
							propertie.Capacity = pData.body[i].capacity;
							propertie.CountyCode = pData.body[i].countyCode;

							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "Shelter_"+pData.body[i].sid;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							shelterDataSourceArray[cCode] = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 35;
								entity.billboard.height = 45;
								entity.billboard.image = 'gzznGIS/Image/shelter.svg';
							}
							viewer.flyTo(shelterDataSourceArray[cCode]);
						});
					},
					error:function(data) {
						console.log("ShelterDataError");
					}
				});
			}
			else{
				viewer.dataSources.add(shelterDataSourceArray[cCode]);
				viewer.flyTo(shelterDataSourceArray[cCode]);
			}
		}
		else{
			viewer.dataSources.remove(shelterDataSourceArray[cCode]);
		}
	}
	function urbanDangerousLocation(){
		for(let i=0;i<urbanDangerousDataSource.length;i++){
			let tempEntity = urbanDangerousDataSource[i].entities.getById('UrbanVideo_'+sid);
			if(tempEntity!=undefined){
				viewer.selectedEntity = tempEntity;
				viewer.flyTo(tempEntity,{
					duration: 3,
					offset : {
						heading : Crystal.Math.toRadians(0.0),
						pitch : Crystal.Math.toRadians(-45),
						range : 5500
				}});
			}
			break;
		}
	}
	this.addUrbanDangerousLocation = function(sid){ //定位城管危化视频
		if(urbanDangerousDataSource.length>0){
			urbanDangerousLocation();
		}
		else{
			urbanClickAddFalg = true;
			urbanDangerousImageProvider();
		}
	}
	
	var harborDataSource = null;
	var harborClickFlag = 0;
	this.addPromiseHarbor = function(){
		if(harborClickFlag%2==0){
			addPromiseHarbor();
		}
		else{
			viewer.dataSources.remove(harborDataSource);
		}
		harborClickFlag++;
	}
	function addPromiseHarbor(){ //添加港口
		if(harborDataSource==null){
			let strJson={};
				strJson.body = {};
				strJson.page = 1;
				strJson.pageSize = 10000;
				strJson.sortName = "sid";
				strJson.sortOrder = "desc";
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webTrafficUrl+'lWUlPQxD',
				cache:false,
				async:true,
				data:JSON.stringify(strJson),
				success:function(pData) {
					let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.data.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.data.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body.data[i].lon),parseFloat(pData.body.data[i].lat)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body.data[i].name;
							propertie.Address = pData.body.data[i].address;
							propertie.Phone = pData.body.data[i].phone;
							
							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "Harbor_"+pData.body.data[i].rownum;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							harborDataSource = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 35;
								entity.billboard.height = 45;
								entity.billboard.image = 'gzznGIS/Image/Harbor.svg';
							}
						});
				},
				error:function(data) {
					console.log("ShelterDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(harborDataSource);
		}
	}
	
	var metroDataSource = null;
	var metroLineDataSource = null;
	var metroClickFlag = 0;
	this.addPromiseMetroListRemove = function(){
		viewer.dataSources.remove(metroLineDataSource);
	}
	this.addPromiseMetroList = function(record){
		viewer.dataSources.remove(metroLineDataSource);
		metroLineDataSource = null;
		let geoEnterprisesList = {};
		geoEnterprisesList.type = "FeatureCollection";
		geoEnterprisesList.totalFeatures = record.length;
		geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<record.length;i++){
			let t = JSON.stringify(record[i]);
			t = t.replace("max(lon)","lon");
			t = t.replace("max(lat)","lat");
			record[i] = JSON.parse(t);
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(record[i].lon),parseFloat(record[i].lat)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){						
				continue;
			}
			let propertie = {};
			propertie.NAME = record[i].site;
			propertie.Type = record[i].line;
			propertie.Address = record[i].position;
			
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "Metro_"+record[i].rownum;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEnterprisesList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
			metroLineDataSource = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			for(var i=0;i<entities.length;i++){
				let entity = entities[i];
				entity.billboard.width = 35;
				entity.billboard.height = 45;
				entity.billboard.image = 'gzznGIS/Image/Metro.svg';
			}
		});
	}
	this.addPromiseMetroLocation = function(record){
		if(metroLineDataSource!=null){
			let tempEntity = metroLineDataSource.entities.getById('Metro_'+record.rownum);
			if(tempEntity!=undefined){
				viewer.selectedEntity = tempEntity;
				viewer.flyTo(tempEntity,{
					duration: 3,
					offset : {
						heading : Crystal.Math.toRadians(0.0),
						pitch : Crystal.Math.toRadians(-45),
						range : 5500
				}});
			}
		}
	}
	this.addPromiseMetro = function(){
		if(metroClickFlag%2==0){
			addPromiseMetro();
		}
		else{
			viewer.dataSources.remove(metroDataSource);
		}
		metroClickFlag++;
	}
	function addPromiseMetro(){ //添加地铁站
		if(metroDataSource==null){
			let strJson={};
				strJson.body = {};
				strJson.page = 1;
				strJson.pageSize = 10000;
				strJson.sortName = "sid";
				strJson.sortOrder = "desc";
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webTrafficUrl+'n39hKkOY',
				cache:false,
				async:true,
				data:JSON.stringify(strJson),
				success:function(pData) {
					let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.data.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.data.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body.data[i].lon),parseFloat(pData.body.data[i].lat)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body.data[i].line+pData.body.data[i].site+pData.body.data[i].exportCode;
							propertie.Address = pData.body.data[i].position;
							
							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "Metro_"+pData.body.data[i].rownum;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							metroDataSource = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 35;
								entity.billboard.height = 45;
								entity.billboard.image = 'gzznGIS/Image/Metro.svg';
							}
						});
				},
				error:function(data) {
					console.log("ShelterDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(metroDataSource);
		}
	}
	
	var railwayDataSource = null;
	var railwayClickFlag = 0;
	this.addPromiseRailway = function(){
		if(railwayClickFlag%2==0){
			addPromiseRailway();
		}
		else{
			viewer.dataSources.remove(railwayDataSource);
		}
		railwayClickFlag++;
	}
	function addPromiseRailway(){ //添加火车站
		if(railwayDataSource==null){
			let strJson={};
				strJson.body = {};
				strJson.page = 1;
				strJson.pageSize = 10000;
				strJson.sortName = "sid";
				strJson.sortOrder = "desc";
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webTrafficUrl+'sUzADGrD',
				cache:false,
				async:true,
				data:JSON.stringify(strJson),
				success:function(pData) {
					let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.data.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.data.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body.data[i].lon),parseFloat(pData.body.data[i].lat)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body.data[i].name;
							propertie.Address = pData.body.data[i].address;
							
							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "Railway_"+pData.body.data[i].rownum;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							railwayDataSource = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 35;
								entity.billboard.height = 45;
								entity.billboard.image = 'gzznGIS/Image/Train.svg';
							}
						});
				},
				error:function(data) {
					console.log("ShelterDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(railwayDataSource);
		}
	}
	var hLocationDataSource = null;
	this.addPromiseHazardousQYLoction = function(pData,isFlag){
		viewer.dataSources.remove(hLocationDataSource);
		let dataSourceEn;
		if(isFlag==0){
			dataSourceEn = hazardousDataSource["重大危险源企业"];
		}
		else if(isFlag==1){
			dataSourceEn = hazardousDataSource["涉氨制冷"];
		}
		else if(isFlag==2){
			dataSourceEn = hazardousDataSource["可燃气体"];
		}
		//dosomething.
		let geoEnterprisesList = {};
			geoEnterprisesList.type = "FeatureCollection";
			geoEnterprisesList.totalFeatures = 1;
			geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
			let geoFeatures = [];
			for(let i =0;i<1;i++){
				let geometry = {};
				geometry.type = "Point";
				geometry.coordinates = [parseFloat(pData.lon),parseFloat(pData.lat)];
				if(geometry.coordinates[0]==0){
					continue;
				}
				if(isNaN(geometry.coordinates[0])){						
					continue;
				}
				let propertie = {};
				propertie.NAME = pData.name;
				propertie.Address = pData.address;
				propertie.Type = pData.tagName;
				propertie.Contact = pData.contact;
				propertie.Phone = pData.phone;
				propertie.Layer = 0;	

				let geoFeature = {};
				geoFeature.type = "Feature";
				geoFeature.id = "Hazardous_"+pData.rownum;
				geoFeature.geometry = geometry;
				geoFeature.geometry_name = "the_geom";
				geoFeature.properties = propertie;
				geoFeatures.push(geoFeature);
			}
			geoEnterprisesList.features = geoFeatures;
			Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				hLocationDataSource = dataSource;
				var entities = dataSource.entities.values;
				let tempEntity;
				for(var i=0;i<entities.length;i++){
					let entity = entities[i];
					entity.billboard.width = 32;
					entity.billboard.height = 32;
					if(isFlag==0){
						entity.billboard.image = 'gzznGIS/Image/重大危险源企业.png';
					}
					else if(isFlag==1){
						entity.billboard.image = 'gzznGIS/Image/油气长输.png';
					}
					if(isFlag==2){
						entity.billboard.image = 'gzznGIS/Image/重点监管化化工企业.png';
					}
					tempEntity = entity;
				}
				viewer.selectedEntity = tempEntity;
				viewer.flyTo(tempEntity,{
					duration: 3,
					offset : {
						heading : Crystal.Math.toRadians(0.0),
						pitch : Crystal.Math.toRadians(-45),
						range : 8500
				}});
			});
	}
	this.addPromiseHazardousQYRemove = function(isFlag){
		viewer.dataSources.remove(hazardousDataSource[isFlag]);
	}
	function addPromiseForTeam(pData,isFlag){
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = pData.body.data.length;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<pData.body.data.length;i++){
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(pData.body.data[i].lon),parseFloat(pData.body.data[i].lat)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){						
				continue;
			}
			let propertie = {};
			propertie.NAME = pData.body.data[i].teamName;
			propertie.PersonName = pData.body.data[i].personName;
			propertie.PersonPhone = pData.body.data[i].personPhone;
			//propertie.Address = pData.body.data[i].address;
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "ForTeam_"+pData.body.data[i].sid;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			hazardousDataSource[isFlag] = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				entity.billboard.image = 'gzznGIS/Image/forTeam.svg';
			}
			viewer.flyTo(hazardousDataSource[isFlag]);
		});
	}
	function waterloggingProofings(pData,isFlag){
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = pData.body.data.length;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<pData.body.data.length;i++){
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(pData.body.data[i].lon),parseFloat(pData.body.data[i].lat)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){						
				continue;
			}
			let propertie = {};
			propertie.NAME = pData.body.data[i].name;
			propertie.Degree = pData.body.data[i].degree;
			propertie.Condition = pData.body.data[i].condition;
			propertie.Address = pData.body.data[i].address;
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "WaterloggingPoint_"+pData.body.data[i].sid;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			hazardousDataSource[isFlag] = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				entity.billboard.image = 'gzznGIS/Image/waterloggingPoint.svg';
			}
			viewer.flyTo(hazardousDataSource[isFlag]);
		});
	}
	function waterloggingBlack(pData,isFlag){
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = pData.body.data.length;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<pData.body.data.length;i++){
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(pData.body.data[i].lon),parseFloat(pData.body.data[i].lat)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){						
				continue;
			}
			let propertie = {};
			propertie.NAME = pData.body.data[i].name;
			propertie.Unit = pData.body.data[i].responsibleUnit;
			let mL = pData.body.data[i].administrationPhone.length - 11;
			let contact = pData.body.data[i].administrationPhone.substring(0,mL);
			let phone = pData.body.data[i].administrationPhone.substring(mL,pData.body.data[i].administrationPhone.length);
			propertie.Contact = contact;
			propertie.Phone = phone;
			propertie.Remark = pData.body.data[i].governanceProgress;
			
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "WaterloggingBlack_"+pData.body.data[i].sid;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			hazardousDataSource[isFlag] = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				entity.billboard.image = 'gzznGIS/Image/waterloggingPoint.svg';
			}
			viewer.flyTo(hazardousDataSource[isFlag]);
		});
	}
	function addPromiseReservoirs(pData,isFlag){
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = pData.body.data.length;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<pData.body.data.length;i++){
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(pData.body.data[i].lon),parseFloat(pData.body.data[i].lat)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){						
				continue;
			}
			let propertie = {};
			propertie.NAME = pData.body.data[i].name;
			propertie.WaterLevel = pData.body.data[i].waterLevel==null?'':pData.body.data[i].waterLevel;
			propertie.WaterYield = pData.body.data[i].waterYield==null?'':pData.body.data[i].waterYield;
			propertie.WarningWaterLevel = pData.body.data[i].warningWaterLevel==null?'':pData.body.data[i].warningWaterLevel;
			propertie.Contact = pData.body.data[i].personName;
			propertie.Phone = pData.body.data[i].personPhone;
			propertie.Address = pData.body.data[i].address;
			
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "ReservoirBlack_"+pData.body.data[i].sid;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			hazardousDataSource[isFlag] = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				entity.billboard.image = 'gzznGIS/Image/Reservoirs.svg';
			}
			viewer.flyTo(hazardousDataSource[isFlag]);
		});
	}
	function addPromiseRainfallStation(pData,isFlag){
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = pData.body.data.length;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<pData.body.data.length;i++){
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(pData.body.data[i].lon),parseFloat(pData.body.data[i].lat)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){						
				continue;
			}
			let propertie = {};
			propertie.NAME = pData.body.data[i].name;
			propertie.Address = pData.body.data[i].address;
			
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "RainfallStationsBlack_"+pData.body.data[i].sid;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			hazardousDataSource[isFlag] = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				entity.billboard.image = 'gzznGIS/Image/Station.svg';
			}
		});
	}
	var hazardousDataSource = new Array();
	this.addPromiseHazardousQY = function(pData,isFlag,isLayer){
		if(isFlag=="易捞点"||isFlag=="易涝点"){
			waterloggingProofings(pData,isFlag);
		}
		else if(isFlag=="内涝黑点"){
			waterloggingBlack(pData,isFlag);
		}
		else if(isFlag=="水库"){
			addPromiseReservoirs(pData,isFlag);
		}
		else if(isFlag=="雨量站"){
			addPromiseRainfallStation(pData,isFlag);
		}
		else if(isFlag.indexOf("救援队伍")!= -1||isFlag.indexOf("救援力量")!= -1||isFlag=="市属救援"||isFlag=="区属救援"){
			addPromiseForTeam(pData,isFlag);
		}
		else{
			let geoEnterprisesList = {};
			geoEnterprisesList.type = "FeatureCollection";
			geoEnterprisesList.totalFeatures = pData.body.data.length;
			geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
			let geoFeatures = [];
			for(let i =0;i<pData.body.data.length;i++){
				let geometry = {};
				geometry.type = "Point";
				geometry.coordinates = [parseFloat(pData.body.data[i].lon),parseFloat(pData.body.data[i].lat)];
				if(geometry.coordinates[0]==0){
					continue;
				}
				if(isNaN(geometry.coordinates[0])){						
					continue;
				}
				let propertie = {};
				propertie.NAME = pData.body.data[i].name;
				propertie.Address = pData.body.data[i].areaName==undefined?pData.body.data[i].address:pData.body.data[i].areaName;
				propertie.Type = pData.body.data[i].tagName==undefined?isFlag:pData.body.data[i].tagName;
				propertie.Contact = pData.body.data[i].contact==undefined?pData.body.data[i].contacts:pData.body.data[i].contact;
				propertie.Phone = pData.body.data[i].phone==undefined?pData.body.data[i].contactsphone:pData.body.data[i].phone;
				if(propertie.Contact==undefined){
					propertie.Contact = pData.body.data[i].personName==null?'':pData.body.data[i].personName;
				}
				if(propertie.Phone==undefined){
					propertie.Phone = pData.body.data[i].personPhone==null?'':pData.body.data[i].personPhone;
				}
				if(isFlag.indexOf("避难场所")!= -1){
					propertie.Layer = 3;
				}
				else{
					propertie.Layer = isLayer;	
				}

				let geoFeature = {};
				geoFeature.type = "Feature";
				geoFeature.id = "Hazardous_"+pData.body.data[i].sid;
				geoFeature.geometry = geometry;
				geoFeature.geometry_name = "the_geom";
				geoFeature.properties = propertie;
				geoFeatures.push(geoFeature);
			}
			geoEnterprisesList.features = geoFeatures;
			Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
				viewer.dataSources.add(dataSource);
				hazardousDataSource[isFlag] = dataSource;
				var entities = dataSource.entities.values;
				for(var i=0;i<entities.length;i++){
					let entity = entities[i];
					entity.billboard.width = 32;
					entity.billboard.height = 32;
					if(isFlag=="生产企业"||isFlag=="生产"){
						entity.billboard.image = 'gzznGIS/Image/生产企业.png';
					}
					else if(isFlag=="经营企业"||isFlag=="经营"){
						entity.billboard.image = 'gzznGIS/Image/经营企业.png';
					}
					else if(isFlag=="使用企业"||isFlag=="使用"){
						entity.billboard.image = 'gzznGIS/Image/使用企业.png';
					}
					else if(isFlag=="危运车辆"){
						entity.billboard.image = 'gzznGIS/Image/危运车辆.png';
					}
					else if(isFlag=="民爆企业"){
						entity.billboard.image = 'gzznGIS/Image/民爆企业.png';
					}
					else if(isFlag=="烟花爆竹"){
						entity.billboard.image = 'gzznGIS/Image/烟花爆竹.png';
					}
					else if(isFlag=="油气长输"||isFlag=="涉氨"||isFlag=="涉氯"||isFlag=="油气运输"|| isFlag.indexOf("涉氨")!= -1||isFlag=="可燃气体"){
						entity.billboard.image = 'gzznGIS/Image/油气长输.png';
					}
					else if(isFlag=="运输企业"||isFlag=="运输"){
						entity.billboard.image = 'gzznGIS/Image/运输企业.png';
					}
					else if(isFlag=="重大危险源企业"|| isFlag.indexOf("危险源")!= -1){
						entity.billboard.image = 'gzznGIS/Image/重大危险源企业.png';
					}
					else if(isFlag=="重点监管化化工企业" || isFlag=="重大隐患企业" || isFlag.indexOf("隐患")!= -1){
						entity.billboard.image = 'gzznGIS/Image/重点监管化化工企业.png';
					}
					else if(isFlag.indexOf("避难场所")!= -1){
						entity.billboard.width = 35;
						entity.billboard.height = 45;
						entity.billboard.image = 'gzznGIS/Image/shelter.svg';
					}
					else if(isFlag.indexOf("指挥中心")!= -1){
						entity.billboard.width = 35;
						entity.billboard.height = 45;
						entity.billboard.image = 'gzznGIS/Image/commandCenter.svg';
					}
					else if(isFlag.indexOf("指挥中心分会场")!= -1){
						entity.billboard.width = 35;
						entity.billboard.height = 45;
						entity.billboard.image = 'gzznGIS/Image/commandCenter2.svg';
					}
					else if(isFlag=="学校"){
						entity.billboard.image = 'gzznGIS/Image/学校.png';
					}
					else if(isLayer==1&&isFlag.indexOf("区")!= -1){
						entity.billboard.image = 'gzznGIS/Image/重大危险源企业.png';
					}
					else if(isFlag.indexOf("冶金")!= -1){
						entity.billboard.image = 'gzznGIS/Image/metallurgical.png';
					}
					else if(isFlag.indexOf("有色")!= -1){
						entity.billboard.image = 'gzznGIS/Image/colored.png';
					}
					else if(isFlag.indexOf("建材")!= -1){
						entity.billboard.image = 'gzznGIS/Image/steel.png';
					}
					else if(isFlag.indexOf("机械")!= -1){
						entity.billboard.image = 'gzznGIS/Image/noCoal.png';
					}
					else if(isFlag.indexOf("轻工")!= -1){
						entity.billboard.image = 'gzznGIS/Image/Liquid.png';
					}
					else if(isFlag.indexOf("纺织")!= -1){
						entity.billboard.image = 'gzznGIS/Image/tailings.png';
					}
					else if(isFlag.indexOf("烟草")!= -1){
						entity.billboard.image = 'gzznGIS/Image/dust.png';
					}
					else if(isFlag.indexOf("商贸")!= -1){
						entity.billboard.image = 'gzznGIS/Image/Limitedspace.png';
					}
					else if(isFlag.indexOf("应急仓库")!= -1){
						entity.billboard.width = 35;
						entity.billboard.height = 45;
						entity.billboard.image = 'gzznGIS/Image/iMaterials.svg';
					}
					else if(isFlag.indexOf("管道企业")!= -1){
						entity.billboard.image = 'gzznGIS/Image/steel.png';
					}
					else if(isFlag.indexOf("其他")!= -1){
						entity.billboard.image = 'gzznGIS/Image/FireFocus.png';
					}
					else{
						entity.billboard.width = 35;
						entity.billboard.height = 45;
						entity.billboard.image = 'gzznGIS/Image/Aircraft.svg';
					}
				}
				viewer.flyTo(hazardousDataSource[isFlag]);
			});
		}
	}
	var hiddenDataSource = null;
	this.addPromiseAreaLoction = function(vValue){ //隐患片区的定位，这里用点代替了面
		viewer.dataSources.remove(hiddenDataSource);
		let geoEnterprisesList = {};
		geoEnterprisesList.type = "FeatureCollection";
		geoEnterprisesList.totalFeatures = 1;
		geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<1;i++){
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(vValue.lon),parseFloat(vValue.lat)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){						
				continue;
			}
			let propertie = {};
			propertie.NAME = vValue.subregion;
			propertie.Director = vValue.director;
			propertie.Num = vValue.num;
			propertie.Phone = vValue.phone;
			
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "Hidden_"+vValue.sid;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEnterprisesList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
			viewer.dataSources.add(dataSource);
			hiddenDataSource = dataSource;
			var entities = dataSource.entities.values;
			for(var i=0;i<entities.length;i++){
				let entity = entities[i];
				entity.billboard.width = 50;
				entity.billboard.height = 50;
				entity.billboard.image = 'gzznGIS/Image/location.png';
			}
		});
	}
	
	var airportDataSource = null;
	var airportClickFlag = 0;
	this.addPromiseAirport = function(){
		if(airportClickFlag%2==0){
			addPromiseAirport();
		}
		else{
			viewer.dataSources.remove(airportDataSource);
		}
		airportClickFlag++;
	}
	function addPromiseAirport(){ //添加机场
		if(airportDataSource==null){
			let strJson={};
				strJson.body = {};
				strJson.page = 1;
				strJson.pageSize = 10000;
				strJson.sortName = "sid";
				strJson.sortOrder = "desc";
			$.ajax({
				type : 'POST',
				contentType : "application/json;charset-UTF-8",
				url:webTrafficUrl+'13nKXfi4',
				cache:false,
				async:true,
				data:JSON.stringify(strJson),
				success:function(pData) {
					let geoEnterprisesList = {};
						geoEnterprisesList.type = "FeatureCollection";
						geoEnterprisesList.totalFeatures = pData.body.data.length;
						geoEnterprisesList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
						let geoFeatures = [];
						for(let i =0;i<pData.body.data.length;i++){
							let geometry = {};
							geometry.type = "Point";
							geometry.coordinates = [parseFloat(pData.body.data[i].lon),parseFloat(pData.body.data[i].lat)];
							if(geometry.coordinates[0]==0){
								continue;
							}
							if(isNaN(geometry.coordinates[0])){						
								continue;
							}
							let propertie = {};
							propertie.NAME = pData.body.data[i].facilities;
							propertie.Address = pData.body.data[i].address;
							propertie.Phone = pData.body.data[i].phone;
							

							let geoFeature = {};
							geoFeature.type = "Feature";
							geoFeature.id = "Airport_"+pData.body.data[i].rownum;
							geoFeature.geometry = geometry;
							geoFeature.geometry_name = "the_geom";
							geoFeature.properties = propertie;
							geoFeatures.push(geoFeature);
							break;
						}
						geoEnterprisesList.features = geoFeatures;
						Crystal.GeoJsonDataSource.load(geoEnterprisesList,{clampToGround: true}).then(function (dataSource) {
							viewer.dataSources.add(dataSource);
							airportDataSource = dataSource;
							var entities = dataSource.entities.values;
							for(var i=0;i<entities.length;i++){
								let entity = entities[i];
								entity.billboard.width = 35;
								entity.billboard.height = 45;
								entity.billboard.image = 'gzznGIS/Image/Aircraft.svg';
							}
						});
				},
				error:function(data) {
					console.log("ShelterDataError");
				}
			});
		}
		else{
			viewer.dataSources.add(airportDataSource);
		}
	}
	var dustExplosionDataSource = null;
	this.dustExplosionLocation = function(record){
		viewer.dataSources.remove(dustExplosionDataSource);
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = 1;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<1;i++){
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(record.lon),parseFloat(record.lat)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){
				continue;
			}
			let propertie = {};			
			propertie.NAME = record.name;
			propertie.DeviceId = record.deviceId;
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "UrbanVideo_"+record.sid;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			dustExplosionDataSource = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			let tempEntity;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				entity.billboard.image = 'gzznGIS/Image/ParkVideo.svg';
				tempEntity = entity;
			}
			viewer.selectedEntity = tempEntity;
			viewer.flyTo(tempEntity,{
				duration: 3,
				offset : {
					heading : Crystal.Math.toRadians(0.0),
					pitch : Crystal.Math.toRadians(-45),
					range : 5500
			}});
		});
	}
	this.videoSearchPlay = function(record){ //直接点击播放，不需要定位。
		addPromiseCameraInfo("UrbanVideo_"+record.id,record.name,record.deviceId);
	}
	var videoSearchDataListSource = null;
	this.videoSearchDataList = function(e){
		viewer.dataSources.remove(videoSearchDataListSource);
		let pData = []; //增加勾选的视频数据
		for(let i=0;i<e.checkedNodes.length;i++){
		  if(e.checkedNodes[i].data.props.deviceId != undefined){
			pData.push(e.checkedNodes[i].data.props);
		  }
		}
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = pData.length;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<pData.length;i++){
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(pData[i].longitude),parseFloat(pData[i].latitude)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){
				continue;
			}
			let propertie = {};
			propertie.NAME = pData[i].name;
			propertie.DeviceId = pData[i].deviceId;
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "UrbanVideo_"+pData[i].id;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			videoSearchDataListSource = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				entity.billboard.image = 'gzznGIS/Image/ParkVideo.svg';
			}
		});
	}
	var videoSearchDataSource = null;
	this.videoSearchLocation = function(record){
		viewer.dataSources.remove(videoSearchDataSource);
		let vedioQuery = {};
		vedioQuery.page = urbanPage;
		vedioQuery.pageSize = 10000;
		vedioQuery.sortName = "id";
		vedioQuery.sortOrder = "desc";
		let vedioBody = {};
		vedioBody.id = record.id;
		vedioQuery.body = vedioBody;
		$.ajax({
			type : 'POST',
			contentType : "application/json;charset-UTF-8",
			url:webChannelsUrl,
			cache:false,
			async:true,
			data:JSON.stringify(vedioQuery),
			success:function(pData) {
				let geoEventList = {};
				geoEventList.type = "FeatureCollection";
				geoEventList.totalFeatures = pData.body.length;
				geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
				let geoFeatures = [];
				for(let i =0;i<pData.body.length;i++){
					let geometry = {};
					geometry.type = "Point";
					geometry.coordinates = [parseFloat(pData.body[i].longitude),parseFloat(pData.body[i].latitude)];
					if(geometry.coordinates[0]==0){
						continue;
					}
					if(isNaN(geometry.coordinates[0])){
						continue;
					}
					let propertie = {};
					propertie.NAME = pData.body[i].name;
					propertie.DeviceId = pData.body[i].deviceId;
					let geoFeature = {};
					geoFeature.type = "Feature";
					geoFeature.id = "UrbanVideo_"+pData.body[i].id;
					geoFeature.geometry = geometry;
					geoFeature.geometry_name = "the_geom";
					geoFeature.properties = propertie;
					geoFeatures.push(geoFeature);
				}
				geoEventList.features = geoFeatures;
				Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
					videoSearchDataSource = dataSource;
					viewer.dataSources.add(dataSource);
					var entities = dataSource.entities.values;
					let tempEntity;
					for(var i=0;i<entities.length;i++){
						var entity=entities[i];
						entity.billboard.width=35;
						entity.billboard.height=45;
						entity.billboard.image = 'gzznGIS/Image/ParkVideo.svg';
						tempEntity = entity;
					}
					viewer.selectedEntity = tempEntity;
					viewer.flyTo(tempEntity,{
						duration: 3,
						offset : {
							heading : Crystal.Math.toRadians(0.0),
							pitch : Crystal.Math.toRadians(-45),
							range : 8500
					}});
				});
			},
			error:function(data) {
				console.log("EnterprisesDataError");
			}
		});
	}
	var teamDataSource = null;
	this.teamLocation = function(record){
		viewer.dataSources.remove(teamDataSource);
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = 1;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<1;i++){
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(record.positionX),parseFloat(record.positionY)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){
				continue;
			}
			let propertie = {};			
			propertie.NAME = record.teamName;
			propertie.Count = record.peopleCount;
			propertie.Phone = record.phone;
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "TeamLoc_"+record.rownum;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			teamDataSource = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			let tempEntity;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				entity.billboard.image = 'gzznGIS/Image/forTeam.svg';
				tempEntity = entity;
			}
			viewer.selectedEntity = tempEntity;
			viewer.flyTo(tempEntity,{
				duration: 3,
				offset : {
					heading : Crystal.Math.toRadians(0.0),
					pitch : Crystal.Math.toRadians(-45),
					range : 8500
			}});
		});
	}
	this.teamPowerLocation = function(record, clickFlag){
		viewer.dataSources.remove(teamDataSource);
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = 1;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<1;i++){
			let geometry = {};
			geometry.type = "Point";
			if(record.lon==undefined&&record.longitude==undefined){
				record.lon = record.jd;
				record.lat = record.wd;
			}
			if(clickFlag==18){
				let t = JSON.stringify(record);
				t = t.replace("max(lon)","lon");
				t = t.replace("max(lat)","lat");
				record = JSON.parse(t);
			}
			geometry.coordinates = [parseFloat(record.lon==undefined?record.longitude:record.lon),parseFloat(record.lat==undefined?record.latitude:record.lat)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){
				continue;
			}
			let propertie = {};
			if(clickFlag==0){
				propertie.NAME = record.teamName;
				propertie.PersonName = record.person==undefined?record.personName:record.person;
				propertie.PersonPhone = record.phone==undefined?record.personPhone:record.phone;
			}
			else if(clickFlag==3){
				propertie.NAME = record.name;
				propertie.PersonName = record.contacts;
				propertie.PersonPhone = record.contactsphone;
				propertie.Address = record.address;
			}
			else if(clickFlag==4){
				propertie.NAME = record.name;
				propertie.Address = record.address;
				propertie.Layer = 4
			}
			else if(clickFlag==9){
				propertie.NAME = record.name;
				propertie.Address = record.address;
				propertie.DeviceId = record.deviceId;
			}
			else if(clickFlag==10){
				propertie.NAME = record.mc==undefined?record.teamName:record.mc;
				propertie.PersonName = record.fzr==undefined?record.person:record.fzr;
				propertie.PersonPhone = record.fzryddh==undefined?record.phone:record.fzryddh;
				propertie.Type = record.lxmc==undefined?record.type:record.lxmc;
			}
			else if(clickFlag==11){
				propertie.NAME = record.mc==undefined?record.name:record.mc;
				propertie.PersonName = record.fzr==undefined?record.contacts:record.fzr;
				propertie.PersonPhone = record.fzryddh==undefined?record.contactsphone:record.fzryddh;
				propertie.Num = record.krnrs==null?'0':record.krnrs;
				propertie.Area = record.mj==null?'0':record.mj;
			}
			else if(clickFlag==12){
				propertie.NAME = record.name;
				propertie.Address = record.address;
				propertie.DutyName = record.dutyName;
				propertie.ParentName = record.parentName;
				propertie.Layer = 12
			}
			else if(clickFlag==13){
				propertie.NAME = record.name;
				propertie.Address = record.address;
				propertie.ParentName = record.parentName;
				propertie.Layer = 13
			}
			else if(clickFlag==14){
				propertie.NAME = record.name;
				propertie.Address = record.address;
				propertie.ParentName = record.parentName;
				propertie.Layer = 14
			}
			else if(clickFlag==15){
				propertie.NAME = record.name;
				propertie.Address = record.address;
				propertie.Degree = record.degree;
				propertie.Condition = record.condition;
				propertie.ParentName = record.parentName;
				propertie.Layer = 15
			}
			else if(clickFlag==16){
				propertie.NAME = record.name;
				propertie.Address = record.address;
				propertie.DutyUnit = record.dutyUnit;
				propertie.CameraCode = record.cameraCode;
				propertie.ParentName = record.parentName;
				propertie.Layer = 16
			}
			else if(clickFlag==17){
				propertie.NAME = record.name;
				propertie.Address = record.areaName;
				propertie.ParentName = record.parentName;
				propertie.Layer = 17
			}
			else if(clickFlag==18){
				propertie.NAME = record.name;
				propertie.Address = record.position;
				propertie.Line = record.line;
				propertie.ParentName = record.parentName;
				propertie.Layer = 18
			}
			let geoFeature = {};
			geoFeature.type = "Feature";
			if(clickFlag==9){
				geoFeature.id = "UrbanVideo_"+record.id;
			}
			else{
				geoFeature.id = "ForTeam_"+record.sid;
			}
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			teamDataSource = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			let tempEntity;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width=35;
				entity.billboard.height=45;
				if(clickFlag==0||clickFlag==10){
					entity.billboard.image = 'gzznGIS/Image/forTeam.svg';
				}
				else if(clickFlag==3||clickFlag==11){
					entity.billboard.image = 'gzznGIS/Image/shelter.svg';
				}
				else if(clickFlag==4){
					entity.billboard.width=45;
					entity.billboard.height=45;
					entity.billboard.image = 'gzznGIS/Image/location.png';
				}
				else if(clickFlag==9){
					entity.billboard.image = 'gzznGIS/Image/ParkVideo.svg';
				}
				else if(clickFlag==12){
					entity.billboard.image = 'gzznGIS/Image/beware.svg';
				}
				else if(clickFlag==13){
					entity.billboard.image = 'gzznGIS/Image/Station.svg';
				}
				else if(clickFlag==14){
					entity.billboard.image = 'gzznGIS/Image/WaterLevel.svg';
				}
				else if(clickFlag==15){
					entity.billboard.image = 'gzznGIS/Image/waterloggingPoint.svg';
				}
				else if(clickFlag==16){
					entity.billboard.image = 'gzznGIS/Image/ParkVideo.svg';
				}
				else if(clickFlag==17){
					entity.billboard.width=45;
					entity.billboard.height=45;
					entity.billboard.image = 'gzznGIS/Image/重大危险源企业.png';
				}
				else if(clickFlag==18){
					entity.billboard.image = 'gzznGIS/Image/Metro.svg';
				}
				tempEntity = entity;
			}
			viewer.selectedEntity = tempEntity;
			viewer.flyTo(tempEntity,{
				duration: 3,
				offset : {
					heading : Crystal.Math.toRadians(0.0),
					pitch : Crystal.Math.toRadians(-45),
					range : 8500
			}});
		});
	}
	
	var dChemicalLocDataSource = null;
	this.dChemicalLocation = function(record){
		viewer.dataSources.remove(dChemicalLocDataSource);
		let isFlag = '';
		let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = 1;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<1;i++){
			let geometry = {};
			geometry.type = "Point";
			geometry.coordinates = [parseFloat(record.lon),parseFloat(record.lat)];
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){
				continue;
			}
			let propertie = {};			
			propertie.NAME = record.name;
			propertie.Type = record.type;
			propertie.Region = record.areaName;
			isFlag = record.type;
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = "DChemical_"+record.sid;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);
		}
		geoEventList.features = geoFeatures;
		Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
			dChemicalLocDataSource = dataSource;
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values;
			let tempEntity;
			for(var i=0;i<entities.length;i++){
				var entity=entities[i];
				entity.billboard.width = 32;
				entity.billboard.height = 32;
				if(isFlag=="生产企业"||isFlag=="生产"){
					entity.billboard.image = 'gzznGIS/Image/生产企业.png';
				}
				else if(isFlag=="经营企业"||isFlag=="经营"){
					entity.billboard.image = 'gzznGIS/Image/经营企业.png';
				}
				else if(isFlag=="使用企业"||isFlag=="使用"){
					entity.billboard.image = 'gzznGIS/Image/使用企业.png';
				}
				else if(isFlag=="危运车辆"){
					entity.billboard.image = 'gzznGIS/Image/危运车辆.png';
				}
				else if(isFlag=="民爆企业"){
					entity.billboard.image = 'gzznGIS/Image/民爆企业.png';
				}
				else if(isFlag=="烟花爆竹"){
					entity.billboard.image = 'gzznGIS/Image/烟花爆竹.png';
				}
				else if(isFlag=="油气长输"||isFlag=="涉氨"||isFlag=="涉氯"||isFlag=="油气运输"|| isFlag.indexOf("涉氨")!= -1||isFlag=="可燃气体"){
					entity.billboard.image = 'gzznGIS/Image/油气长输.png';
				}
				else if(isFlag=="运输企业"||isFlag=="运输"){
					entity.billboard.image = 'gzznGIS/Image/运输企业.png';
				}
				else if(isFlag=="重大危险源企业"|| isFlag.indexOf("危险源")!= -1){
					entity.billboard.image = 'gzznGIS/Image/重大危险源企业.png';
				}
				else if(isFlag=="重点监管化化工企业" || isFlag=="重大隐患企业" || isFlag.indexOf("隐患")!= -1){
					entity.billboard.image = 'gzznGIS/Image/重点监管化化工企业.png';
				}
				else if(isFlag.indexOf("避难场所")!= -1){
					entity.billboard.width = 35;
					entity.billboard.height = 45;
					entity.billboard.image = 'gzznGIS/Image/shelter.svg';
				}
				else if(isFlag.indexOf("指挥中心")!= -1){
					entity.billboard.width = 35;
					entity.billboard.height = 45;
					entity.billboard.image = 'gzznGIS/Image/commandCenter.svg';
				}
				else if(isFlag.indexOf("指挥中心分会场")!= -1){
					entity.billboard.width = 35;
					entity.billboard.height = 45;
					entity.billboard.image = 'gzznGIS/Image/commandCenter2.svg';
				}
				else if(isFlag=="学校"){
					entity.billboard.image = 'gzznGIS/Image/学校.png';
				}
				else{
					entity.billboard.width = 35;
					entity.billboard.height = 45;
					entity.billboard.image = 'gzznGIS/Image/Aircraft.svg';
				}
				tempEntity = entity;
			}
			viewer.selectedEntity = tempEntity;
			viewer.flyTo(tempEntity,{
				duration: 3,
				offset : {
					heading : Crystal.Math.toRadians(0.0),
					pitch : Crystal.Math.toRadians(-45),
					range : 5500
			}});
		});
	}

    //单纯定位到特定点位
	this.flyToPoint = function(pointGeojson,objs,completeCallback){
		if(!pointGeojson.x || !pointGeojson.y){
			console.log("定位数据无坐标");
			return;
		}
		viewer.camera.flyTo({
			destination : Crystal.Cartesian3.fromDegrees(pointGeojson.x, pointGeojson.y, pointGeojson.z),
			// orientation : {
			// 	heading : pointGeojson.heading,
			// 	pitch : pointGeojson.pitch,
			// 	roll : pointGeojson.roll,
			// 	range : 24659
			// },
			complete : function(res){
				if(objs && objs.isFlagPopule){
					var pointLayer = pGzznCore.findArray(poitArray,"layerType",objs.type);
					if(!pointLayer){               
						return;
					}
					if(!pointLayer.val.isFlag){
						console.log("该图层没显示")
						return;
					}
					var isFlage = false;
					var dataSource = pointLayer.val.layerDataSource;
					var dataSourceLists = dataSource._entityCollection.values;	
					var geoEventList = getGeoFeature(objs.data,objs).features[0];	
					var entity;
					for(var i =0;i<dataSourceLists.length;i++){
						var lonLatx = dataSourceLists[i]._properties["lon"] ? "lon" : (objs.lonLat ? objs.lonLat.lon : "lon");
						var lonLaty = dataSourceLists[i]._properties["lat"] ? "lat" : (objs.lonLat ? objs.lonLat.lat : "lat");
						if(( dataSourceLists[i]._properties[lonLatx]._value == geoEventList.geometry.coordinates[0]) && (dataSourceLists[i]._properties[lonLaty]._value == geoEventList.geometry.coordinates[1])){
							isFlage = true
							for(var keys in geoEventList.properties){															
								if(keys != "DeviceId" && keys != "NAME" && dataSourceLists[i]._properties[keys] && geoEventList.properties[keys] && (dataSourceLists[i]._properties[keys]._value != geoEventList.properties[keys])){
									isFlage = false
								}
							}
							if(isFlage){
								entity = dataSourceLists[i];
								break;
							}
						}                     
					}
					var lists = [];
					var infoList = objs.info?objs.info:"";
					var phoneInfo = objs.phoneInfo?objs.phoneInfo:null;
					if(infoList){
						console.log("info isArray",Array.isArray(infoList));
						for(var i=0;i<infoList.length;i++){		
							lists.push({
								name:infoList[i].title,
								value:entity._properties[infoList[i].textIndex]?entity._properties[infoList[i].textIndex]._value:""
							});
						}	
					}else{						
						lists = [entity._properties._name];
					}
					
					var PhoneMessages = null;
					if(phoneInfo){
						PhoneMessages = {
							name:entity._properties[phoneInfo.name] ? entity._properties[phoneInfo.name]._value : "",
							number:entity._properties[phoneInfo.phone] ? entity._properties[phoneInfo.phone]._value : "",
							phone:true,
							messages:true
						} 
					}

					if(objs.video){
						var videostr = objs.video ?(entity. _properties[objs.video.keys] && entity. _properties[objs.video.keys]._value ? entity. _properties[objs.video.keys]._value : "") : "";
						var isVideoStr = objs.video.isVideo ? (entity. _properties[objs.video.isVideo] &&  parseFloat(entity. _properties[objs.video.isVideo]._value)>0 ? true : false) : (entity. _properties.isVideo &&  parseFloat(entity. _properties.isVideo._value)>0 ? true : false) ; 
						if(videostr && isVideoStr){
							var videoUrl = objs.video ? objs.video.start+videostr+objs.video.end : (objs.video? objs.video.videoUrl : "");
							PhoneMessages.video = videoUrl;
						}								
					}
					
					var main = document.getElementById(crystalID);
					var mainWidth = main.offsetWidth / 2;
					var mainHeight = main.offsetHeight / 2;
					let screenPos = {'x':mainWidth,'y':mainHeight};
					entity._properties.isFlagPopule = true;
					setInfowindow(screenPos,lists,null,PhoneMessages,"#trackPopUp",true,entity);

				}
				completeCallback && completeCallback(res)				
			}
		}); 		
	};


	var poitArray = [];
	this.findArray = function (Arrays,str,type,multi=false){
		var isflag = false;
		var multArray = [];
		if(Arrays.length==0){ return false; }
        for(var i=0;i<Arrays.length;i++){
			if(Arrays[i][str] == type && !multi){
				isflag = true;
				return {num:i,val:Arrays[i]}
			}
			if(Arrays[i][str] == type && multi){
				isflag = true;
				multArray.push({num:i,val:Arrays[i]})
			}
		}
		if(!isflag){
			return false;
		}
		return multArray;
	};
	this.deepClone = function(obj){

		let isArray = Array.isArray(obj)
		let cloneObj = isArray ? [] : {}
		for (let key in obj) {
			cloneObj[key] = obj[key] ? ((obj[key].constructor === Object) ? pGzznCore.deepClone(obj[key]) : obj[key]) : "";
		}
	
		return cloneObj;
	};
    //生成点，并且定位到特定点位
	//geofeatrue:点数据集合
	//objs.imgUrl 图片路径 'gzznGIS/Image/ParkVideo.svg'
	//objs.type  图层类型   UrbanVideo
	//objs.layerName 图层名称
	this.setPointLayerToMap = function(datas,objs,callback){
		    
		   //判断是否存在图层类型
		   var pointLayer = pGzznCore.findArray(poitArray,"layerType",objs.type);
		   if(pointLayer){               
			   viewer.dataSources.add(pointLayer.val.layerDataSource);
			   viewer.flyTo(pointLayer.val.layerDataSource,{
				offset : {
					heading : viewer.camera.heading,
					pitch : viewer.camera.pitch,
					range : 24659
			    }});
			   poitArray[pointLayer.num].isFlag = true;
               return; 
		   }		   
		   var geoEventList = getGeoFeature(datas,objs);		   
		   //console.log(geoEventList)	
			Crystal.GeoJsonDataSource.load(geoEventList,{clampToGround: true}).then(function (dataSource) {
				//console.log(dataSource)
				poitArray.push({
					layerName:objs.layerName,
					layerDataSource:dataSource,
					layerType:objs.type,
					isFlag:true,
					info:objs.info?objs.info:{},
					phoneInfo:objs.phoneInfo?objs.phoneInfo:null,
					video:objs.video
				})
				var addNewPoint = dataSource;
				viewer.dataSources.add(dataSource);
				dataSource.clustering.enabled = clusterStyle.enabled;
				dataSource.clustering.pixelRange = clusterStyle.pixelRange;
				dataSource.clustering.minimumClusterSize = clusterStyle.minimumClusterSize;
				var pinBuilder = new Crystal.PinBuilder();
				customClusterStyle();
				function customClusterStyle(){
					dataSource.clustering.clusterEvent.addEventListener(function (clusteredEntities, cluster) {
						cluster.label.show = false;
						cluster.billboard.show = true;
						cluster.billboard.id = cluster.label.id;
						cluster.billboard.verticalOrigin = Crystal.VerticalOrigin.BOTTOM;
						cluster.billboard.image = pinBuilder.fromText(clusteredEntities.length, Crystal.Color.RED, 48).toDataURL();						
					});
				}
				let pixelRange = dataSource.clustering.pixelRange;
				dataSource.clustering.pixelRange = 0;
				dataSource.clustering.pixelRange = pixelRange;
				var entities = dataSource.entities.values;
				var mEntity = null;
				var imgSize = objs.imgSize ? objs.imgSize : {width:35,height:45};
				for(var i=0;i<entities.length;i++){
					var entity=entities[i];
					//console.log(entity);
					entity.billboard.width=imgSize.width;
					entity.billboard.height=imgSize.height;
					var str = objs.imgUrlObj ?(entity. _properties[objs.imgUrlObj.keys] && entity. _properties[objs.imgUrlObj.keys]._value ? entity. _properties[objs.imgUrlObj.keys]._value : "") : "";
					var imgUrl = objs.imgUrlObj ? objs.imgUrlObj.start+str+objs.imgUrlObj.end : (objs.imgUrl? objs.imgUrl : "");
					entity.billboard.image = imgUrl;
					if(i==0){
						mEntity = entity;
					}
				}
				if(objs.isFlagRange){
					var RangeNum = objs.RangeNum ? objs.RangeNum :1000.0;					
					eventRange(mEntity,RangeNum,false);
					
				}
				//console.log(entity,1);	
				var isFlagFlyto = objs.type == "defaultType" ? true : false;		
				var flytoGeo = 	isFlagFlyto ? 	mEntity : entities;		
                var rangeNum = isFlagFlyto ? 24659 : 40000;
				var flyPromise = viewer.flyTo(flytoGeo,{
					offset : {
						//heading : Crystal.Math.toRadians(0.0),
						//pitch : Crystal.Math.toRadians(-45),
						heading : viewer.camera.heading,
						pitch : viewer.camera.pitch,
						range : rangeNum
				}});
							
				flyPromise.then(function(){
					callback && callback()
				})
			});
		
	};

	function getGeoFeature(datas,objs){
        let geoEventList = {};
		geoEventList.type = "FeatureCollection";
		geoEventList.totalFeatures = datas.length;
		geoEventList.crs = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG::4326"}};
		let geoFeatures = [];
		for(let i =0;i<datas.length;i++){
			let geometry = {};
			geometry.type = "Point";
			var x = datas[i].lon ? datas[i].lon : (objs.lonLat ? datas[i][objs.lonLat.lon] : datas[i]);
			var y = datas[i].lat ? datas[i].lat : (objs.lonLat ? datas[i][objs.lonLat.lat] : datas[i]);
			if(objs.zbtype == "baidu"){
				geometry.coordinates = bd09towgs84(parseFloat(x),parseFloat(y));
			}else{
				geometry.coordinates = [parseFloat(x),parseFloat(y)];
			}
			
			if(geometry.coordinates[0]==0){
				continue;
			}
			if(isNaN(geometry.coordinates[0])){
				continue;
			}
			let propertie = {};
			//console.log(datas[i],1)
			propertie = pGzznCore.deepClone(datas[i]);
			for(var keys in datas[i]){
				var a = keys;
				propertie[a[0].toUpperCase() + a.substr(1)] = datas[i][keys];
			}  
			let sid = datas[i].sid ? datas[i].sid : i;	
			propertie.NAME = datas[i].name;
			propertie.DeviceId = objs.type+"_"+sid;
			//console.log(datas[i],2)		
			let geoFeature = {};
			geoFeature.type = "Feature";
			geoFeature.id = objs.type+"_"+sid;
			geoFeature.geometry = geometry;
			geoFeature.geometry_name = "the_geom";
			geoFeature.properties = propertie;
			geoFeatures.push(geoFeature);	
		}
		geoEventList.features = geoFeatures;

		return geoEventList;
	};
	//删除对应点图层
	//objs.type : UrbanVideo
	this.pointLayerRemove = function(objs){
		
		$('.leaflet-popup-close-button_track').click();
		$('.leaflet-popup-close-button_lyz').click();
		$('#windowPopUp').hide();
		$('#trackPopUp').hide();
		var isSure = false;
		var pointLayer = pGzznCore.findArray(poitArray,"layerType",objs.type);
		if(pointLayer){	
			   viewer.dataSources.remove(pointLayer.val.layerDataSource);	
			   if(objs.type.indexOf("defaultType")!= -1){
				   var defaultTypeLayer = pGzznCore.findArray(poitArray,"layerType","defaultType");
				   defaultTypeLayer ? viewer.dataSources.remove(defaultTypeLayer.val.layerDataSource) : "";
			   }                
			   
			   if(!objs.isFlag){
					poitArray.splice(pointLayer.num,1); 
			   }else{
					poitArray[pointLayer.num].isFlag = false;
			   }
			   isSure = true;   
		}
		return isSure;
		
	};

	this.EllipseOutlineGeo = function(){
		var cuboid = [];

		var lonLat = bd09towgs84(parseFloat(113.370424),parseFloat(23.103804));
        // cuboid.push(viewer.entities.add({
		// 	//position: Crystal.Cartesian3.fromDegrees(113.358232,23.101537),
		// 	position: Crystal.Cartesian3.fromDegrees(lonLat[0],lonLat[1]),
		// 	name: '',
		// 	id:"ellipse_21",
		// 	ellipse: {
		// 	  semiMinorAxis: 3000.0,
		// 	  semiMajorAxis: 3000.0,
		// 	  height:0,
		// 	  outline: true,
		// 	  outlineWidth: 3,
		// 	  material: Crystal.Color.RED.withAlpha(0.1),
		// 	  outlineColor: Crystal.Color.BLUE,
		// 	  fill: false,
		// 	}
		  
		// }))
        
		// var lonLat = bd09towgs84(parseFloat(113.370424),parseFloat(23.103804));
        // cuboid.push(viewer.entities.add({
		// 	//position: Crystal.Cartesian3.fromDegrees(113.358232,23.101537),
		// 	position: Crystal.Cartesian3.fromDegrees(lonLat[0],lonLat[1]),
		// 	name: '',
		// 	id:"ellipse_20",
		// 	ellipse: {
		// 	  semiMinorAxis: 5000.0,
		// 	  semiMajorAxis: 5000.0,
		// 	  height:0,
		// 	  outline: true,
		// 	  outlineWidth: 3,
		// 	  material: Crystal.Color.YELLOW.withAlpha(0.1),
		// 	  outlineColor: Crystal.Color.YELLOW,	
		// 	  fill: false,	  
		// 	}
		  
		// }))
        // //[,Crystal.Color.YELLOW.withAlpha(0.3)]
		

		// var positions=Crystal.Cartesian3.fromDegreesArray([
		// 	113.350746,23.106615,
		// 	113.368095,23.106564,
		// 	113.367839,23.097075,
		// 	113.360647,23.097839,
		// 	113.358821,23.097943,
		// 	113.353753,23.099023,
		// 	113.350696,23.099622]);     
		// //同理,定义需要挖的形状的四个顶点
		// //var hole=Crystal.Cartesian3.fromDegreesArray([110,23,112,23,115,27,110,27]);
		// //定义需要传给hierrchy的参数
		// var x={
		// positions:positions,
		// //由于挖的这个洞,是x本身的一种数组集合,所以每一个对象里,又是一个x的形式
		// //holes:[{positions:hole}]
		// };

		// cuboid.push(viewer.entities.add({
		// 	name: "琶洲国际会展中心",
		// 	polygon:{
		// 		hierarchy:x,
		// 		height: 0,
		// 		//extrudedHeight: 21000,
		// 		outline: true,
		// 		outlineColor: Crystal.Color.RED,
		// 		outlineWidth: 5.0,
		// 		fill: false,
		// 		arcType: Crystal.ArcType.GEODESIC,
		// 		material:Crystal.Color.RED.withAlpha(0.3),				
		// 	}			
		// }));

		cuboid.push(viewer.entities.add({
			position:Crystal.Cartesian3.fromDegrees(113.389023,23.083446),
			label: {
				text: "引导区",
				font: '14px sans-serif',
				style: Crystal.LabelStyle.FILL,
				outlineWidth: 1,
				fillColor: Crystal.Color.WHITE,
				verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
				pixelOffset: new Crystal.Cartesian2(20, -20),
				showBackground: true,
				backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
			}
		}));
		
		cuboid.push(viewer.entities.add({
			position:Crystal.Cartesian3.fromDegrees(113.358232,23.101537),
			label: {
				text: "核心区",
				font: '14px sans-serif',
				style: Crystal.LabelStyle.FILL,
				outlineWidth: 1,
				fillColor: Crystal.Color.WHITE,
				verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
				pixelOffset: new Crystal.Cartesian2(10, -10),
				showBackground: true,
				backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
			}
		}));
		cuboid.push(viewer.entities.add({
			position:Crystal.Cartesian3.fromDegrees(113.356980,23.082440),
			label: {
				text: "管控区",
				font: '14px sans-serif',
				style: Crystal.LabelStyle.FILL,
				outlineWidth: 1,
				fillColor: Crystal.Color.WHITE,
				verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
				pixelOffset: new Crystal.Cartesian2(20, -20),
				showBackground: true,
				backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
			}
		}));
		viewer.zoomTo(viewer.entities)
	};

	this.drawCircleOutline = function(entity,vRadius = 1000.0,color="red",type,objs,callBack){
		    if(type == "line"){
				var polygon = new Crystal.PolygonOutlineGeometry({
					polygonHierarchy : new Crystal.PolygonHierarchy(
						Crystal.Cartesian3.fromDegreesArray(entity)
					)
				  });		  
				var geometry = Crystal.PolygonOutlineGeometry.createGeometry(polygon);	  				
			}else{	
				if(!objs.isbd09towgs84){
					var lonLat = bd09towgs84(parseFloat(entity.x),parseFloat(entity.y));
				}else{
					var lonLat = [parseFloat(entity.x),parseFloat(entity.y)];
				}			
				
				let cPos = Crystal.Cartesian3.fromDegrees(lonLat[0],lonLat[1]);
				let pDis = getNorthPointByDistance(cPos,vRadius);
				postionArr.push(cPos);
				postionArr.push(pDis);
				var circleOutline = new Crystal.CircleOutlineGeometry({
				   center : cPos,
				   radius : vRadius,
				   granularity: Math.PI / 1000,
				});
				var geometry = Crystal.CircleOutlineGeometry.createGeometry(circleOutline);
			}
			var float64ArrayPositions = geometry.attributes.position.values;
			var pos = [].slice.call(float64ArrayPositions);
			var posI = getGeometry(pos);
			var posTemp = [];
			for(var i = 0;i<pos.length;i=i+3){
				var sT = new Crystal.Cartesian3(pos[i],pos[i+1],pos[i+2]);
				let cartographic = Crystal.Cartographic.fromCartesian(sT);
				posTemp.push(Crystal.Math.toDegrees(cartographic.longitude));
				posTemp.push(Crystal.Math.toDegrees(cartographic.latitude));
			}
		    var ColorType =  Array.isArray(color) ? new Crystal.Color ( color[0]/255 , color[1]/255 , color[2]/255 , color[3] ): Crystal.Color.fromCssColorString(color).withAlpha(0.8);
			var instance = new Crystal.GeometryInstance({
			  geometry : new Crystal.GroundPolylineGeometry({
				 positions : Crystal.Cartesian3.fromDegreesArray(posTemp),
				 loop : true,
				 width : objs && objs.width ? objs.width : 10.0
			  }),
			  attributes : {
				 color : Crystal.ColorGeometryInstanceAttribute.fromColor(ColorType)
			  }
			});
			primitiveOutline = new Crystal.GroundPolylinePrimitive({
				geometryInstances : instance,
				appearance : new Crystal.PolylineColorAppearance()
			});
			viewer.scene.groundPrimitives.add(primitiveOutline);
			if(objs && objs.text){
				viewer.entities.add({
					position:Crystal.Cartesian3.fromDegrees(objs.lon,objs.lat),
					label: {
						text: objs.text,
						font: '16px sans-serif',
						style: Crystal.LabelStyle.FILL,
						outlineWidth: 1,
						//fillColor: Crystal.Color.WHITE,
						fillColor:ColorType,
						verticalOrigin: Crystal.VerticalOrigin.BOTTOM,
						pixelOffset: new Crystal.Cartesian2(20, -20),
						showBackground: true,
						backgroundColor: new Crystal.Color(0.12,0.14,0.2,.6)
					}
				})	
				
				// viewer.flyTo({properties:{lon:objs.lon,lat:objs.lat}},{
				// 	offset : {
				// 		heading : viewer.camera.heading,
				// 		pitch : viewer.camera.pitch,
				// 		range : 13365
				// }});
			}
			
           callBack && callBack(posI)
		   function getGeometry(pos) {
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
		  };	
			
	};
	this.drawLineToMap = function(lineData,color='red',appearance=true,objs){		
		var ColorType =  Array.isArray(color) ? new Crystal.Color ( color[0]/255 , color[1]/255 , color[2]/255 , color[3] ): Crystal.Color.fromCssColorString(color).withAlpha(0.8);
		//var lineData = [110.0,20.0,120.0,30.0];
		var instance = new Crystal.GeometryInstance({
			geometry : new Crystal.GroundPolylineGeometry({
			positions : Crystal.Cartesian3.fromDegreesArray(lineData),
			loop : true,
			width : 5.0
			}),
			attributes : {
				color : Crystal.ColorGeometryInstanceAttribute.fromColor(ColorType)	
			}
		});
		//实线 
		var ColorType1 =  Array.isArray(color) ? new Crystal.Color ( color[0]/255 , color[1]/255 , color[2]/255 , color[3] ): Crystal.Color.fromCssColorString('red').withAlpha(0.8);
		let appearanceS = appearance ? new Crystal.PolylineColorAppearance() : new Crystal.PolylineMaterialAppearance({
				material: Crystal.Material.fromType("PolylineDash",{
				color: ColorType1, //线条颜色
				gapColor: Crystal.Color.TRANSPARENT, //间隔颜色
				dashLength: 20.0 //短划线长度
			})
		})
		
		var primitiveOutline = new Crystal.GroundPolylinePrimitive({
			geometryInstances : instance,
			appearance : appearanceS
		});
		var billboards = viewer.scene.groundPrimitives.add(primitiveOutline);
        this.DrawLineBillboardsList.push({type:objs.type,billboards:billboards,});
	};
    this.DrawLineBillboardsList = [];
	this.drawLineRemove = function(objs){
        var lists = pGzznCore.findArray(pGzznCore.DrawLineBillboardsList,"type",objs.type,true);
		lists.forEach(function(item){
			viewer.scene.groundPrimitives.remove(item.val.billboards);
		})      
		//viewer.scene.groundPrimitives.removeAll();
	}
    //rgba(r,g,b,a)  colorArr[r,g,b,a]
	function handleColorType(colorArr) {
		var colorArr2 = {};
		for(let i = 0; i < colorArr.length - 1; i ++) {
		  colorArr2[i] = + colorArr[i] / 255
		}
		colorArr2[colorArr.length - 1] = + colorArr[colorArr.length - 1]
	  
		return new Crystal.Color(...colorArr2);
	}
    
    this.viewer = viewer;
}