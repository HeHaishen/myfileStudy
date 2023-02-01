<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-24 15:37:02
 * @LastEditTime: 2021-09-09 10:00:59
-->
### 弹窗使用
=============
-------------
####一、引入方式
   不需要引入

####二、teamplate使用方式
使用方法一
 说明：此方法不会触发自动关闭，需要在当前引用的组件触发关闭
```` html
    <button @click="open($event)">打开</button>
    <pop-up-layer 
     :show="show"
      :setStyles="{}"
        @doClose="close"
        :sendEvent="templateEvent"
         title="标题"
        opsition="pageRight"
         ref="myPopUpLayer">
          <template slot="content">
              中间内容。。。。
          </template>
    </pop-up-layer>
````

 ````js es5 es6
 export default{
     data(){
         return{
           show:false 
         }
     },
     methos:{
      // 点击展示
      open($event){
          this.show = true
          this.templateEvent = $event
      }  
      // 点击关闭
      close () {
           this.show = false
      }
     }
 }
 ````
 使用方法二
 说明：此方法不会触发自动关闭，需要在当前引用的组件触发关闭
```` html
    <button @click="open($event)">打开</button>
    <pop-up-layer 
      :setStyles="{}"
        @initMounted="initMounted"
         opsition="pageRight"
         title="标题"
         ref="myPopUpLayer">
         <template slot="content">中间内容。。。。</template>
    </pop-up-layer>
````
 ````js es5 es6
 export default{
     data(){
         return{
           show:false 
         }
     },
     methos:{
      // 点击展示
      open($event){
        this.$refs.myPopUpLayer.$emit('showTemplate')
        this.$refs.myPopUpLayer.saveEvent = $event
          // 如果设置opsition=pageRight\btnBottom\btnLeft\btnRight\btnTop 需要传入$event
      }  
      // 点击关闭
    
     }
 }
 ````
####四、api 和调用说明
initMounted 
beforeClose
doClose
closeTemplate

btnBottom:点击按钮的底部,
btnLeft:点击按的左侧，
btnRight:点击按钮的右侧；
btnTop:点击按钮的右侧； 
页面位置
pageTop:页面顶部
pagetLeft：页面左部
pageCenter：页面中间
pageRight:页面右侧
slefPoint：自定义


