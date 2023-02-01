## 地图方法使用介绍

## 初始化地图 


## 标*为必传属性
## 点图层

## 1.地图打点 ：pGzznCore.setPointLayerToMap(array,object,callback) 

### array 数组集合：
| name                |  type          | Description                                         | 
|:--------------      |:---------------|:----------------------------------------------------|
| array |array    |  array数据集合,数据集合中每个对象中，必须属性：sid、name、lon、lat    |


### object 参数：
| name                |  type          | Description                                         | 
|:--------------      |:--------|:----------------------------------------------------|
| *imgUrl        | string         |  图片路径，必须                                      |
|imgUrlObj| object <br>{keys:"string",start:"string",end:"string"}| 图片路径字段自定义，<br>keys：string,字段名称;<br>start：string,开始路径名称;<br>end：string,结束路径名称|
|imgSize| object {width:"number",height:"number"}| 自定义图片大小,<br>width：number,宽度大小;<br>height：number,高度大小|
| *type          | string         |  类型，必须，用于区别图层信息,<br>命名规则字符串需要含有"<font color=red>defaultType</font>",并且不使用含有特殊字符"<font color=red>_</font>",<br>type图层存在，不重新添加新图层，会直接显示该图层,<br>for example："defaultType" 、"defaultTypesgtj"、"defaultType1"等             |
| layerName      | string         |  图层名称                                            |
|lonLat|object <br>{ lon: "string", lat: "string" }| 自定义经纬度字段，<br>lon:string,字段名称；<br>lat:string,字段名称|
|info | array <br>[{title:"string",textIndex:"string"}]|浮云框显示对应参数，<br>title：string,浮云框对应左边名称;<br>textIndex：string,浮云框对应右边数值字段keys值|
|callback|function|回调函数|


### Example:
```
var lists = [
  {
    "sid": "18",
    "teamId": "19",
    "name": "增城区应急救援大队",
    "teamName": "张惠",
    "contacts": "18520620148",
    "onDutyNum": "15",
    "leaveNum": "0",
    "retireNum": "0",
    "lon": "113.439629",
    "lat": "23.624533",   
  },
  
];
var infos = [
  { title: "名称", textIndex: "name" },
  { title: "类型", textIndex: "typeName" },
  { title: "电话", textIndex: "telephone" },
  { title: "地址", textIndex: "addr" },
];
var objs = {
  imgUrl: 'gzznGIS/Image/gjh/sgtj'+e.type+'.png',
  imgUrlObj:{keys:"level",start:'gzznGIS/Image/gjh/sgtj'+e.type,end:'.png'},
  imgSize:{width:32,height:32},
  type: "defaultTypesg",
  info:infos,
  layerName: "四馆"
};

pGzznCore.setPointLayerToMap(lists, objs)

 ```

 ## 2.地图点定位：pGzznCore.flyToPoint(point,object,callback)

### point 坐标点
| name                |  type          | Description                                         | 
|:--------------      |:---------------|:----------------------------------------------------|
| *point |object {x:"number",y:"number",z:"number"}    |  点坐标, x:number,对应lon；y:number,对应lat;z:number,  |

### object 参数：
| name                |  type          | Description                                         | 
|:--------------      |:---------------|:----------------------------------------------------|
|*data|array|point属性数据|
| *type          | string         |  类型，必须，用于查询图层信息,是否存在地图，对应图层点显示浮云框                |
| layerName      | string         |  图层名称                                            |
|lonLat|object <br> {lon:"string",lat:"string" }| 自定义经纬度字段，<br>lon:string,字段名称；<br>lat:string,字段名称|
|isFlagPopule|boolean|是否显示浮云框，显示为true，默认false|
|info | array <br>[{title:"string",textIndex:"string"}]|浮云框显示对应参数，<br>title：string,浮云框对应左边名称;<br>textIndex：string,浮云框对应右边数值字段keys值|
|phoneInfo|object <br>{phone:"string",name:"string"}|显示"打电话"、"发短信"按钮；<br>phone：string,电话号码对应字段；<br>name：string，名称对应字段|
|video|object <br>{keys:"string",start:"string",end:"string"，isVideo:"string",videoUrl:"string"}|显示"查看视频"按钮；<br>keys：string,自定义视频链接字段；<br>start：string，自定义视频链接开始字符串；<br>end：string，自定义视频链接结束字符串；<br>isVideo：string,判断是否有视频字段；<br>videoUrl：string，查看视频路径|
|callback|function|回调函数|


### Example：
 ```
 var items = {
  "sid": "18",
  "teamId": "19",
  "name": "增城区应急救援大队",
  "teamName": "张惠",
  "contacts": "18520620148",
  "onDutyNum": "15",
  "leaveNum": "0",
  "retireNum": "0",
  "lon": "113.439629",
  "lat": "23.624533",   
};
var infos = [
  { title: "名称", textIndex: "name" },
  { title: "类型", textIndex: "typeName" },
  { title: "电话", textIndex: "telephone" },
  { title: "地址", textIndex: "addr" },
];
 var objs = {
    data:[items],
    type:"defaultTypesg",
    layerName: "四馆",
    info:infos,
    phoneInfo:{phone:"telephone",name:"name"},
    video:{keys:"name",start:"/big-screen/#/moreVideos?name=",end:"",isVideo:"isVideo",videoUrl:""}
    isFlagPopule:true
  };  
  pGzznCore.flyToPoint({x:items.lon,y:items.lat,z:13673},objs)

 ```

 ## 3.删除点图层或者隐藏点图层：pGzznCore.pointLayerRemove(object)

### object 参数：
| name                |  type          | Description                                         | 
|:--------------      |:---------------|:----------------------------------------------------|
| *type          | string         |  类型，必须，用于查询图层信息,是否存在地图                |
| isFlag          | boolean         |  是否删除图层,<br>true为删除图层、保存图层信息，<br>false为删除图层，不保存图层信息              |
### Example：
```
//删除的点图层
pGzznCore.pointLayerRemove({type:"defaultTypesg",isFlag:true})

//删除的点图层
pGzznCore.pointLayerRemove({type:"defaultTypesg"})

```




