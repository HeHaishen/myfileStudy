define(["exports","./Cartesian2-fe435665","./Math-e9e583a9","./Transforms-21fa56f0"],function(a,E,V,C){"use strict";var r={},h=new E.Cartesian3,c=new E.Cartesian3,u=new C.Quaternion,x=new C.Matrix3;function A(a,r,t,e,i,n,s,o,l,y){r=a+r;E.Cartesian3.multiplyByScalar(e,Math.cos(r),h),E.Cartesian3.multiplyByScalar(t,Math.sin(r),c),E.Cartesian3.add(h,c,h);r=Math.cos(a);r*=r;a=Math.sin(a);a*=a;a=n/Math.sqrt(s*r+i*a)/o;return C.Quaternion.fromAxisAngle(h,a,u),C.Matrix3.fromQuaternion(u,x),C.Matrix3.multiplyByVector(x,l,y),E.Cartesian3.normalize(y,y),E.Cartesian3.multiplyByScalar(y,o,y),y}var R=new E.Cartesian3,W=new E.Cartesian3,S=new E.Cartesian3,f=new E.Cartesian3;r.raisePositionsToHeight=function(a,r,t){for(var e=r.ellipsoid,i=r.height,n=r.extrudedHeight,r=t?a.length/3*2:a.length/3,s=new Float64Array(3*r),o=a.length,l=t?o:0,y=0;y<o;y+=3){var C=y+1,h=y+2,c=E.Cartesian3.fromArray(a,y,R);e.scaleToGeodeticSurface(c,c);var u=E.Cartesian3.clone(c,W),x=e.geodeticSurfaceNormal(c,f),M=E.Cartesian3.multiplyByScalar(x,i,S);E.Cartesian3.add(c,M,c),t&&(E.Cartesian3.multiplyByScalar(x,n,M),E.Cartesian3.add(u,M,u),s[y+l]=u.x,s[C+l]=u.y,s[h+l]=u.z),s[y]=c.x,s[C]=c.y,s[h]=c.z}return s};var B=new E.Cartesian3,Q=new E.Cartesian3,b=new E.Cartesian3;r.computeEllipsePositions=function(a,r,t){var e=a.semiMinorAxis,i=a.semiMajorAxis,n=a.rotation,s=a.center,a=8*a.granularity,o=e*e,l=i*i,y=i*e,C=E.Cartesian3.magnitude(s),h=E.Cartesian3.normalize(s,B),c=E.Cartesian3.cross(E.Cartesian3.UNIT_Z,s,Q),c=E.Cartesian3.normalize(c,c),u=E.Cartesian3.cross(h,c,b),x=1+Math.ceil(V.CrystalMath.PI_OVER_TWO/a),M=V.CrystalMath.PI_OVER_TWO/(x-1),f=V.CrystalMath.PI_OVER_TWO-x*M;f<0&&(x-=Math.ceil(Math.abs(f)/M));var m,z,_,O,d,p=r?new Array(3*(x*(x+2)*2)):void 0,w=0,P=R,T=W,a=4*x*3,I=a-1,g=0,v=t?new Array(a):void 0,P=A(f=V.CrystalMath.PI_OVER_TWO,n,u,c,o,y,l,C,h,P);for(r&&(p[w++]=P.x,p[w++]=P.y,p[w++]=P.z),t&&(v[I--]=P.z,v[I--]=P.y,v[I--]=P.x),f=V.CrystalMath.PI_OVER_TWO-M,m=1;m<x+1;++m){if(P=A(f,n,u,c,o,y,l,C,h,P),T=A(Math.PI-f,n,u,c,o,y,l,C,h,T),r){for(p[w++]=P.x,p[w++]=P.y,p[w++]=P.z,_=2*m+2,z=1;z<_-1;++z)O=z/(_-1),d=E.Cartesian3.lerp(P,T,O,S),p[w++]=d.x,p[w++]=d.y,p[w++]=d.z;p[w++]=T.x,p[w++]=T.y,p[w++]=T.z}t&&(v[I--]=P.z,v[I--]=P.y,v[I--]=P.x,v[g++]=T.x,v[g++]=T.y,v[g++]=T.z),f=V.CrystalMath.PI_OVER_TWO-(m+1)*M}for(m=x;1<m;--m){if(P=A(-(f=V.CrystalMath.PI_OVER_TWO-(m-1)*M),n,u,c,o,y,l,C,h,P),T=A(f+Math.PI,n,u,c,o,y,l,C,h,T),r){for(p[w++]=P.x,p[w++]=P.y,p[w++]=P.z,_=2*(m-1)+2,z=1;z<_-1;++z)O=z/(_-1),d=E.Cartesian3.lerp(P,T,O,S),p[w++]=d.x,p[w++]=d.y,p[w++]=d.z;p[w++]=T.x,p[w++]=T.y,p[w++]=T.z}t&&(v[I--]=P.z,v[I--]=P.y,v[I--]=P.x,v[g++]=T.x,v[g++]=T.y,v[g++]=T.z)}P=A(-(f=V.CrystalMath.PI_OVER_TWO),n,u,c,o,y,l,C,h,P);a={};return r&&(p[w++]=P.x,p[w++]=P.y,p[w++]=P.z,a.positions=p,a.numPts=x),t&&(v[I--]=P.z,v[I--]=P.y,v[I--]=P.x,a.outerPositions=v),a},a.EllipseGeometryLibrary=r});
