var defaultCoordOverview={x:113.37652765338402,y:22.18582614242309,z:128049.10867947878,heading:0.10864090115905523,pitch:-0.9255029875731733,roll:6.283167508136866};//摄像头初始
var defaultCoordHiddendanger={x:113.46748100301589,y:21.183956654719427,z:279105.0246692052,heading:0.10864069030539003,pitch:-0.9255015322565523,roll:6.283167772059272};//摄像头初始
var defaultCoordBoatNormal={x:113.19873554472487,y:20.593291365363168,z:370624.1047583685,heading:0.10864001047007044,pitch:-0.9254968399685453,roll:6.283168623001024};//摄像头初始
var defaultCoordResource={x:113.2436415287522,y:20.835064725722795,z:338268.96755514375,heading:0.10863847189753084,pitch:-0.9254862203162322,roll:6.2831705488250265};//摄像头初始
var defaultCoordHChemicals = {x:113.3168812276921,y:21.871442077107307,z:184354.12526804538,heading:0.10864030738275243,pitch:-0.9254988892973479,roll:6.283168251358607};
var defaultCoordCitysDanger = {x:113.29439110870024,y:20.897591006590055,z:336452.1476512077,heading:0.1086375878025887,pitch:-0.9254801178741596,roll:6.283171655449438};
var defaultCoordDustExplosion = {x:113.32412815316063,y:21.791679546878406,z:185736.75939031353,heading:0.1086407979349664,pitch:-0.9255022751191362,roll:6.28316763734089};
var defaultCoordThreeProofing = {x:113.34293404960862,y:22.079295953381454,z:143115.61272376316,heading:0.1086410076563773,pitch:-0.9255037226173135,roll:6.283167374835855};
var defaultCoordAchievement = {x:113.3379488464316,y:21.21344096920578,z:277703.8215040384,heading:0.10863987028017341,pitch:-0.9254958723551856,roll:6.283168798475424};
var defaultCoord = {x:113.21018959011877,y:20.717161774713418,z:358653.73182913277,heading:0.10863854946424034,pitch:-0.9254867557122983,roll:6.283170451734819};
var terrainUrl = 'gzznGIS/Terrain'; //地形url:Terrain
var websiteUrl = ''; //网站url
var tempEntity = null; //临时实体
var locEntity = null; //定位实体
var pGzznCore = null; //单例
var WaterStationState = true;
var WaterloggingPointState = true;
var EventWartimeState = true;
var oneMagFlag = 0; //一张图的标识
var droneStopTime = 0; //无人机结束时间
var layerLocation = 0; //图层面板位置的标识
var layerLocationWidth = 0; //图层面板宽度的标识
var mapToolLocation = 0; //地图组件位置的标识
var mapOffsetPixel = 0; //适应前端对div进行偏移X
var mapOffsetYPixel = 0; //适应前端对div进行偏移Y

var webGISDataUrl = '/bigscreen/api/keyProtectionDTO/findByGisDataKeys'; //GIS数据接口
var webEnterprisesUrl = '/bigscreen/api/priorityEnterprises/detail/'; //监管企业详情接口
var webNursingHomeUrl = '/bigscreen/api/nursingHome/detail/'; //养老院详情接口
var webGasStationHomeUrl = '/bigscreen/api/gasStation/detail/'; //加油站详情接口
var webSchoolHomeUrl = '/bigscreen/api/school/detail/'; //学校详情接口

var webTeamTypeUrl = '/ers/rescue/teamtype/find'; //应急队伍类型接口
var webTeamDetailUrl = '/ers/rescue/team/detail/'; //应急队伍详情接口
var webShelterUrl = '/ers/shelter/manage/find'; //避难场所详情接口
var webUmtmanageUrl = '/ers/umt/manage/find'; //医院详情接口

var webCameraUrl = '/bigscreen/api/camera/getCamera'; //视频详情接口
//------------------------------216配置-----------------------------
var webFirefightingTeamUrl = '/big-screen/api/responseTeamInstance/responseTeamStaff'; //救火队伍 /big-screen/api/teamInstancePath/pathDeilt
var webFireExpertsUrl = '/big-screen/api/responseTeamInstance/responseTeamExpert?eventId=2521067874866184192'; //救火专家

var webVedioFliterFind = '/idsm/api/indicator/data/IA055fXW';//视频查询
var webIoTUrl = '/big-screen/api/iotVideo/find'; //物联网
var webDroneUrl = '/big-screen/api/uavPath/find'; //无人机

var webRainfallUrl = '/big-screen/api/rainfall/find'; //降雨量

var webWaterloggingPointUrl = '/big-screen/api/waterloggingPoint/find' ; //内涝点
var webWaterLevelUrl = '/big-screen/api/waterLevel/find'; //水位站
var webRainfallStationUrl = '/big-screen/api/rainfallStation/find'; //雨量站
var webReservoirUrl = '/big-screen/api/reservoir/find'; //水库
var webBewareUrl = '/big-screen/api/beware/find'; //堤防

var webTeamPositionInfoUrl = '/big-screen/api/responseTeamInstance/teamPositionInfo'; //应急队伍接口
var webTeamResourcesUrl = '/big-screen/api/responseTeamInstance/ranksResourcesCount'; //应急队伍所带的物资、装备和人员
var webEventListUrl = '/ers/emergency-anon/ondutyEvent/findEvent'; //事件列表接口

var webeQuipmentManageUrl = '/ers/emergency/equipmentManage/find'; //应急装备接口 

var webStorageManageUrl = '/ers/emergency/storageManage/find'; //应急储备库 即重要设施 
var webMaterialsUrl = '/ers/supply/find'; //应急物资接口

var webTeamPersonUrl = '/big-screen/api/responseTeamInstance/responseStaffInfo'; //应急人员
var webUavTealTimePathUrl = '/big-screen/api/uavPath/findUavTealTimePath'; //无人机实时路径接口
var webFindTealTimePathUrl = '/big-screen/api/teamInstancePath/findTealTimePath'; //应急队伍实时路径接口

var webShelterAreaUrl = '/big-screen/api/shelter/find'; //避难场所区域接口

var webAviationUrl = '/big-screen/api/aviationFireBase/find'; //航空消防接口
var webHelicopterUrl = '/big-screen/api/waterIntakePoint/find'; //直升机取水接口
var webChannelsUrl = '/big-screen/api/waterloggingPoint/findChannels'; //城管危化接口 /big-screen/api/channels/find
var webVedioPlayUrl = 'http://10.194.92.110:10000/play.html?serial='; //城管危化视频的播放地址 44010000032006000056&code=
var webVedioFlvUrl = '/facility/channel/streamStart'; //视频流地址
var webVedioFlvStopUrl = '/facility/channel/streamStop/'; //{deviceId}/{id}
var webVedioFlvTouchUrl = '/facility/channel/streamTouch/'; //{deviceId}/{id} 视频心跳

var webTrafficUrl = '/idsm/api/indicator/data/'; //重要交通设施

var webRainfallPicUrl = 'http://www.tqyb.com.cn/data/obtMap/BCGZ_RainA.png'; //广州气象局的降雨量图片
var webTyphoonUrl = 'http://www.tqyb.com.cn/designs/images/wball/winball-home.png'; //广州气象局的台风路径图片

var webChannelsZMUrl = '/idsm/api/indicator/data/LQcgZPIU'; 