define(["exports","./Cartesian2-fe435665","./Transforms-21fa56f0","./EllipsoidTangentPlane-3934f12e","./Math-e9e583a9","./PolylinePipeline-1446d6ce"],function(a,O,p,d,N,V){"use strict";var G=Object.freeze({ROUNDED:0,MITERED:1,BEVELED:2}),R=[new O.Cartesian3,new O.Cartesian3],I=new O.Cartesian3,L=new O.Cartesian3,j=new O.Cartesian3,Q=new O.Cartesian3,F=new O.Cartesian3,U=new O.Cartesian3,_=new O.Cartesian3,q=new O.Cartesian3,Y=new O.Cartesian3,Z=new O.Cartesian3,g=new O.Cartesian3,k={},H=new O.Cartographic;function J(a,e,r,n){var t=a[0],a=a[1],a=O.Cartesian3.angleBetween(t,a),i=Math.ceil(a/n),s=new Array(i);if(e===r){for(l=0;l<i;l++)s[l]=e;return s.push(r),s}for(var o=(r-e)/i,l=1;l<i;l++){var C=e+l*o;s[l]=C}return s[0]=e,s.push(r),s}var f=new O.Cartesian3,m=new O.Cartesian3;var w=new O.Cartesian3(-1,0,0),h=new p.Matrix4,v=new p.Matrix4,x=new p.Matrix3,P=p.Matrix3.IDENTITY.clone(),E=new O.Cartesian3,M=new p.Cartesian4,T=new O.Cartesian3;function K(a,e,r,n,t,i,s,o){var l=E,C=M;h=p.Transforms.eastNorthUpToFixedFrame(a,t,h),l=p.Matrix4.multiplyByPointAsVector(h,w,l);var l=O.Cartesian3.normalize(l,l),e=(l=l,e=e,a=a,t=t,t=new d.EllipsoidTangentPlane(a,t),l=t.projectPointOntoPlane(O.Cartesian3.add(a,l,f),f),a=t.projectPointOntoPlane(O.Cartesian3.add(a,e,m),m),e=O.Cartesian2.angleBetween(l,a),0<=a.x*l.y-a.y*l.x?-e:e);x=p.Matrix3.fromRotationZ(e,x),T.z=i,h=p.Matrix4.multiplyTransformation(h,p.Matrix4.fromRotationTranslation(x,T,v),h);var c=P;c[0]=s;for(var u=0;u<o;u++)for(var y=0;y<r.length;y+=3)C=O.Cartesian3.fromArray(r,y,C),C=p.Matrix3.multiplyByVector(c,C,C),C=p.Matrix4.multiplyByPoint(h,C,C),n.push(C.x,C.y,C.z);return n}var l=new O.Cartesian3;function W(a,e,r,n,t,i,s){for(var o=0;o<a.length;o+=3)n=K(O.Cartesian3.fromArray(a,o,l),e,r,n,t,i[o/3],s,1);return n}function X(a,e){for(var r=a.length,n=new Array(3*r),t=0,i=e.x+e.width/2,s=e.y+e.height/2,o=0;o<r;o++)n[t++]=a[o].x-i,n[t++]=0,n[t++]=a[o].y-s;return n}var B=new p.Quaternion,z=new O.Cartesian3,S=new p.Matrix3;function $(a,e,r,n,t,i,s,o,l,C){var c,u=O.Cartesian3.angleBetween(O.Cartesian3.subtract(e,a,Z),O.Cartesian3.subtract(r,a,g)),y=n===G.BEVELED?0:Math.ceil(u/N.CrystalMath.toRadians(5)),d=t?p.Matrix3.fromQuaternion(p.Quaternion.fromAxisAngle(O.Cartesian3.negate(a,Z),u/(y+1),B),S):p.Matrix3.fromQuaternion(p.Quaternion.fromAxisAngle(a,u/(y+1),B),S);if(e=O.Cartesian3.clone(e,z),0<y)for(var f=C?2:1,m=0;m<y;m++)e=p.Matrix3.multiplyByVector(d,e,e),c=O.Cartesian3.subtract(e,a,Z),c=O.Cartesian3.normalize(c,c),t||(c=O.Cartesian3.negate(c,c)),s=K(i.scaleToGeodeticSurface(e,g),c,o,s,i,l,1,f);else c=O.Cartesian3.subtract(e,a,Z),c=O.Cartesian3.normalize(c,c),t||(c=O.Cartesian3.negate(c,c)),s=K(i.scaleToGeodeticSurface(e,g),c,o,s,i,l,1,1),r=O.Cartesian3.clone(r,z),c=O.Cartesian3.subtract(r,a,Z),c=O.Cartesian3.normalize(c,c),t||(c=O.Cartesian3.negate(c,c)),s=K(i.scaleToGeodeticSurface(r,g),c,o,s,i,l,1,1);return s}k.removeDuplicatesFromShape=function(a){for(var e=a.length,r=[],n=e-1,t=0;t<e;n=t++){var i=a[n],s=a[t];O.Cartesian2.equals(i,s)||r.push(s)}return r},k.angleIsGreaterThanPi=function(a,e,r,n){n=new d.EllipsoidTangentPlane(r,n),a=n.projectPointOntoPlane(O.Cartesian3.add(r,a,f),f),e=n.projectPointOntoPlane(O.Cartesian3.add(r,e,m),m);return 0<=e.x*a.y-e.y*a.x};var aa=new O.Cartesian3,ea=new O.Cartesian3;k.computePositions=function(a,e,r,n,t){var i=n._ellipsoid,s=function(a,e){for(var r=new Array(a.length),n=0;n<a.length;n++){var t=a[n];H=e.cartesianToCartographic(t,H),r[n]=H.height,a[n]=e.scaleToGeodeticSurface(t,t)}return r}(a,i),o=n._granularity,l=n._cornerType,C=(t?function(a,e){var r=a.length,n=new Array(6*r),t=0,i=e.x+e.width/2,s=e.y+e.height/2,o=a[0];n[t++]=o.x-i,n[t++]=0,n[t++]=o.y-s;for(var l=1;l<r;l++){var C=(o=a[l]).x-i,c=o.y-s;n[t++]=C,n[t++]=0,n[t++]=c,n[t++]=C,n[t++]=0,n[t++]=c}return o=a[0],n[t++]=o.x-i,n[t++]=0,n[t++]=o.y-s,n}:X)(e,r),e=t?X(e,r):void 0,c=r.height/2,u=r.width/2,y=a.length,d=[],r=t?[]:void 0,f=I,m=L,p=j,g=Q,w=F,h=U,v=_,x=q,P=Y,E=a[0],M=a[1];g=i.geodeticSurfaceNormal(E,g),f=O.Cartesian3.subtract(M,E,f),f=O.Cartesian3.normalize(f,f),x=O.Cartesian3.cross(g,f,x);var T,x=O.Cartesian3.normalize(x,x),B=s[0],z=s[1];t&&(r=K(E,x,e,r,i,B+c,1,1)),P=O.Cartesian3.clone(E,P),E=M,m=O.Cartesian3.negate(f,m);for(var S=1;S<y-1;S++){var A=t?2:1,M=a[S+1],f=O.Cartesian3.subtract(M,E,f);f=O.Cartesian3.normalize(f,f),p=O.Cartesian3.add(f,m,p),p=O.Cartesian3.normalize(p,p);var g=i.geodeticSurfaceNormal(E,g),D=O.Cartesian3.multiplyByScalar(g,O.Cartesian3.dot(f,g),aa);O.Cartesian3.subtract(f,D,D),O.Cartesian3.normalize(D,D);var b=O.Cartesian3.multiplyByScalar(g,O.Cartesian3.dot(m,g),ea);O.Cartesian3.subtract(m,b,b),O.Cartesian3.normalize(b,b),!N.CrystalMath.equalsEpsilon(Math.abs(O.Cartesian3.dot(D,b)),1,N.CrystalMath.EPSILON7)?(p=O.Cartesian3.cross(p,g,p),p=O.Cartesian3.cross(g,p,p),p=O.Cartesian3.normalize(p,p),D=1/Math.max(.25,O.Cartesian3.magnitude(O.Cartesian3.cross(p,m,Z))),(b=k.angleIsGreaterThanPi(f,m,E,i))?(w=O.Cartesian3.add(E,O.Cartesian3.multiplyByScalar(p,D*u,p),w),h=O.Cartesian3.add(w,O.Cartesian3.multiplyByScalar(x,u,h),h),R[0]=O.Cartesian3.clone(P,R[0]),R[1]=O.Cartesian3.clone(h,R[1]),T=J(R,B+c,z+c,o),d=W(V.PolylinePipeline.generateArc({positions:R,granularity:o,ellipsoid:i}),x,C,d,i,T,1),x=O.Cartesian3.cross(g,f,x),x=O.Cartesian3.normalize(x,x),v=O.Cartesian3.add(w,O.Cartesian3.multiplyByScalar(x,u,v),v),l===G.ROUNDED||l===G.BEVELED?$(w,h,v,l,b,i,d,C,z+c,t):d=K(E,p=O.Cartesian3.negate(p,p),C,d,i,z+c,D,A)):(w=O.Cartesian3.add(E,O.Cartesian3.multiplyByScalar(p,D*u,p),w),h=O.Cartesian3.add(w,O.Cartesian3.multiplyByScalar(x,-u,h),h),R[0]=O.Cartesian3.clone(P,R[0]),R[1]=O.Cartesian3.clone(h,R[1]),T=J(R,B+c,z+c,o),d=W(V.PolylinePipeline.generateArc({positions:R,granularity:o,ellipsoid:i}),x,C,d,i,T,1),x=O.Cartesian3.cross(g,f,x),x=O.Cartesian3.normalize(x,x),v=O.Cartesian3.add(w,O.Cartesian3.multiplyByScalar(x,-u,v),v),l===G.ROUNDED||l===G.BEVELED?$(w,h,v,l,b,i,d,C,z+c,t):d=K(E,p,C,d,i,z+c,D,A)),P=O.Cartesian3.clone(v,P),m=O.Cartesian3.negate(f,m)):(d=K(P,x,C,d,i,B+c,1,1),P=E),B=z,z=s[S+1],E=M}R[0]=O.Cartesian3.clone(P,R[0]),R[1]=O.Cartesian3.clone(E,R[1]),T=J(R,B+c,z+c,o),d=W(V.PolylinePipeline.generateArc({positions:R,granularity:o,ellipsoid:i}),x,C,d,i,T,1),t&&(r=K(E,x,e,r,i,z+c,1,1));y=d.length,e=t?y+r.length:y,e=new Float64Array(e);return e.set(d),t&&e.set(r,y),e},a.CornerType=G,a.PolylineVolumeGeometryLibrary=k});
