define(["./when-23b1aa97","./Transforms-21fa56f0","./Cartesian2-fe435665","./Math-e9e583a9","./ComponentDatatype-db261df2","./GeometryAttribute-e2cab2f1","./GeometryAttributes-bf6191be","./RuntimeError-acd9a015","./WebGLConstants-c32c4572"],function(r,a,i,e,o,u,c,t,n){"use strict";function s(){this._workerName="createPlaneOutlineGeometry"}s.packedLength=0,s.pack=function(e,t){return t},s.unpack=function(e,t,n){return r.defined(n)?n:new s};var y=new i.Cartesian3(-.5,-.5,0),m=new i.Cartesian3(.5,.5,0);return s.createGeometry=function(){var e=new c.GeometryAttributes,t=new Uint16Array(8),n=new Float64Array(12);return n[0]=y.x,n[1]=y.y,n[2]=y.z,n[3]=m.x,n[4]=y.y,n[5]=y.z,n[6]=m.x,n[7]=m.y,n[8]=y.z,n[9]=y.x,n[10]=m.y,n[11]=y.z,e.position=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n}),t[0]=0,t[1]=1,t[2]=1,t[3]=2,t[4]=2,t[5]=3,t[6]=3,t[7]=0,new u.Geometry({attributes:e,indices:t,primitiveType:u.PrimitiveType.LINES,boundingSphere:new a.BoundingSphere(i.Cartesian3.ZERO,Math.sqrt(2))})},function(e,t){return r.defined(t)&&(e=s.unpack(e,t)),s.createGeometry(e)}});
