## 分页组件使用说明
### 参数说明
  - 1.total:传入的页数--默认0
  - 2.currentPage-当前点击的页面--默认1
  - 3.changePages-对外暴露的方法，可以修改当前分页
    + 返回的参数
    + + pages--点击分页返回的页数
    + + size --点击返回的当前页的条数
### 引入
``` ecmascript 6
    import ChangePage from '@/components/APicture/changePage'
    data(){
        return {
            total:0,
            currentPage：1,
        }
    },
    componts:{ChangePage}


```

### 页面中模板使用
``` html 
 <ChangePage  :total="50" :currentPage="1" @changePages="changePages"/>
```
