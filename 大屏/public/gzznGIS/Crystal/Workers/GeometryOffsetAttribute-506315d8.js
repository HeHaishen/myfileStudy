define(["exports","./Math-e9e583a9","./when-23b1aa97"],function(e,t,l){"use strict";var a=Object.freeze({NONE:0,TOP:1,ALL:2});e.GeometryOffsetAttribute=a,e.arrayFill=function(e,t,a,f){if("function"==typeof e.fill)return e.fill(t,a,f);for(var r=e.length>>>0,n=(a=l.defaultValue(a,0))<0?Math.max(r+a,0):Math.min(a,r),i=(f=l.defaultValue(f,r))<0?Math.max(r+f,0):Math.min(f,r);n<i;)e[n]=t,n++;return e}});
