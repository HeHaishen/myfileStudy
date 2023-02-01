<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: sude
 * @LastEditors: hehaishen
 * @Date: 2021-06-01 14:09:38
 * @LastEditTime: 2021-07-19 18:12:34
-->
# hpyj

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

==========
### 项目说明
1.项目具体接口和项目代码规范请参考项目中md文件说明；
2.项目中如出现什么问题，请提前说明情况；
3.api接入，如有问题可直接跟（暴仪辉）联系处理
### 项目结构
### 目录说明
|--public
|--src
    |--api ====>公共接口数据配置入口
    |--assets ===>项目图片、字体、svg
    |--components ===> 公共组件
    |--config     ===> 设置坐标，token
    |--core
    |--router   ====>路由入口
    |--store   ====>vuex入口
    |--utils   ====>公共方法，公共封装，混入
    |--views   ====>页面组件
    |--app.vue ====>vue入口
    |--main.js ====>vue主配置文件
    |--permission.js ====>路由拦截和权限处理
    
### 目录说明

### 项目中，图表使用的是echart 
### 一、具体使用方法

  1、使用方法
   通过prototype 暴露$echart
   代码如下：
  ```ecmascript 6
   let chartDiv = this.$echarts.init(元素名称)
   chartDiv.setOption(ChartOption(data))
   function chartOption(data){
     let option = {
        title:{},
        tooltip:{},
        xAxis:{},
        yAxis:{},
        series:{}
     }
     return option
   }
  ```
  --------------------
  ### 接口请求使用如下
  一、在src/api/apis/
  1.命名规范
   必须以文件夹
   如：index.js
  2.使用
  ```ecmascript 6
    import { getTeamInfo} from "@/api/dragonBoat";
    getTeamInfo.Function(data).then((res)=>{}).catch((err)=>{})
  ```
### vue组件规范
--------------------------
一、在view文件夹下建立对应的文件夹
ps:
  |--emergencyResources 文件夹
    |--components ====>对应组件，一般情况下时该页面的独有组件 左，右，中间，3个模块
    |--index.vue ===>入口文件
    |--index.less ===> 组件对应样式-所有样式写在这里
二、less 书写规范
  @w:100 /5760; 5760为设计稿宽度
  @h:100 /1080; 1080为设计稿高度
  (1)高度相关和文字使用vh*@h
  (2)宽度使用vw*@w
  ps： 
  ```less
    @w:100 /5760;
    @h:100 /1080;
    .model-title {
        height: 48vh * @h;
        width: 100%;
        font-size: 22vh * @h;
        color: #eaeff2;
        font-weight: bold;
        line-height: 48vh * @h;
        padding-left: 20vw * @w;
        .box-sizing();
        border-bottom:1px #29619f solid;
    }
  ```
  三、其他规范有待补充
