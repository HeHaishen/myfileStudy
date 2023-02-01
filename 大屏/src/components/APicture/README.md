<!--
 * @Description: 一张图-使用说明
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-06-08 10:22:55
 * @LastEditTime: 2021-07-22 17:42:11
-->
# 一张图组件
===========================
 ###### 主要用于
 一、龙舟水一张图-战时
 二、森林火灾趋势一张图-平时
 三、森林火灾趋势一张图-战时

===========================
 
## 一张图组件说明和使用



### 使用说明
------------------------------------------
## c-table 组件的使用
##### 引入方式：
``` ecmascript 6
import Clist from '@/components/APicture/c-table'
```
##### 在data中传入值
``` ecmascript 6
data(){
    return {
        tableHeaderList:[
        {title:'监测时间',index:0,textIndex:'time',width:'15%'},
        {title:'监测内容',index:1,textIndex:'content',width:'40%'},
        {title:'级别',index:2,textIndex:'level',width:'15%'},
        {title:'来源',index:3,textIndex:'resource',width:'30%'},
      ],
        tabelListData:[
        {time:'2021-05-13',content:'[红色预警]监测到xoooxxoow企业器温度达到55c',level:1,resource:'****企业',index:0},
        {time:'2021-05-13',content:'[红色预警]监测到xoooxxoow企业器温度达到55c',level:2,resource:'****企业',index:0},
        {time:'2021-05-13',content:'[红色预警]监测到xoooxxoow企业器温度达到55c',level:3,resource:'****企业',index:0},
        {time:'2021-05-13',content:'[红色预警]监测到xoooxxoow企业器温度达到55c',level:3,resource:'****企业',index:0},
        ]
    }
}
methods:{
  tableTdClick(obj){},
}
```
##### template中引入
``` html
<clist :columns="tableHeaderList" :listData="tabelListData" @tableTdClick="tableTdClick" >
   <template slot="time" slot-scope="{record,text}">
             {{record}}
    </template>
</clist>
```
##### api说明传值说明
  columns 中必须遵循

    columns  必须是数组
       title：在表头中显示的字段
       index：暂时未使用，可填可不填
       textIndex：必填字段-字段未，dataList 中对应渲染的字段
       width：表格中的宽度，默认为表头长度的平均分，如果填写则是填写对应的如：'100px'、'30%'
 
  组件在template 中的使用说明
 
    遵循template 包裹
    如下使用：
      <template slot="time" slot-scope="{record,text}">
      </template>

      slot="time" 你要显示或修改对应的字段
      slot-scope="{record,text}" 
         record 返回当前行的对象，
         test 当前对应字段显示的字段
    默认的表格行列点击事件
    tableTdClick(lineItem:i,lineKey:k,columnsItem:item,columnsKeys:keys)
    