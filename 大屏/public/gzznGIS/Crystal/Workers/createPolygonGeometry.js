define(["./when-23b1aa97","./Cartesian2-fe435665","./ArcType-94cbcc5d","./GeometryOffsetAttribute-506315d8","./BoundingRectangle-e4803dfe","./Transforms-21fa56f0","./Math-e9e583a9","./ComponentDatatype-db261df2","./EllipsoidGeodesic-27d7f111","./EllipsoidTangentPlane-3934f12e","./GeometryAttribute-e2cab2f1","./GeometryInstance-f73501bb","./GeometryPipeline-ad571d9b","./IndexDatatype-5483de1e","./PolygonGeometryLibrary-275fb1ab","./PolygonPipeline-7f6972cc","./VertexFormat-4b1610fd","./RuntimeError-acd9a015","./WebGLConstants-c32c4572","./IntersectionTests-5927aeeb","./Plane-95acb6df","./AttributeCompression-dc95bf1b","./EncodedCartesian3-c1064016","./arrayRemoveDuplicates-72d928ba","./EllipsoidRhumbLine-5fcd2f7f","./GeometryAttributes-bf6191be"],function(z,W,y,Y,e,U,j,Q,c,A,q,E,G,O,V,F,f,t,r,a,o,i,n,s,l,u){"use strict";var K=new W.Cartographic,Z=new W.Cartographic;var D=new e.BoundingRectangle,J=new W.Cartesian3,X=new W.Cartesian3,$=new W.Cartesian3,ee=new W.Cartesian3,te=new W.Cartesian3,re=new W.Cartesian3,ae=new W.Cartesian3,oe=new W.Cartesian3,ie=new W.Cartesian3,ne=new W.Cartesian2,se=new W.Cartesian2,le=new W.Cartesian3,ue=new U.Quaternion,pe=new U.Matrix3,ye=new U.Matrix3;function L(e){var t,r=e.vertexFormat,a=e.geometry,o=e.shadowVolume,i=a.attributes.position.values,n=i.length,s=e.wall,l=e.top||s,u=e.bottom||s;if(r.st||r.normal||r.tangent||r.bitangent||o){var p=e.boundingRectangle,y=e.tangentPlane,c=e.ellipsoid,g=e.stRotation,d=e.perPositionHeight,m=ne;m.x=p.x,m.y=p.y;var h,f=r.st?new Float32Array(n/3*2):void 0;r.normal&&(h=d&&l&&!s?a.attributes.normal.values:new Float32Array(n));var b,_=r.tangent?new Float32Array(n):void 0,v=r.bitangent?new Float32Array(n):void 0,P=o?new Float32Array(n):void 0,C=0,w=0,x=X,T=$,I=ee,A=!0,E=pe,G=ye;G=0!==g?(b=U.Quaternion.fromAxisAngle(y._plane.normal,g,ue),E=U.Matrix3.fromQuaternion(b,E),b=U.Quaternion.fromAxisAngle(y._plane.normal,-g,ue),U.Matrix3.fromQuaternion(b,G)):(E=U.Matrix3.clone(U.Matrix3.IDENTITY,E),U.Matrix3.clone(U.Matrix3.IDENTITY,G));var O=0,V=0;l&&u&&(O=n/2,V=n/3,n/=2);for(var F=0;F<n;F+=3){var D,L,N,H,R,M,S,B,k=W.Cartesian3.fromArray(i,F,le);r.st&&(D=U.Matrix3.multiplyByVector(E,k,J),D=c.scaleToGeodeticSurface(D,D),L=y.projectPointOntoPlane(D,se),W.Cartesian2.subtract(L,m,L),N=j.CrystalMath.clamp(L.x/p.width,0,1),H=j.CrystalMath.clamp(L.y/p.height,0,1),u&&(f[C+V]=N,f[C+1+V]=H),l&&(f[C]=N,f[C+1]=H),C+=2),(r.normal||r.tangent||r.bitangent||o)&&(R=w+1,M=w+2,s?(F+3<n&&(S=W.Cartesian3.fromArray(i,F+3,te),A&&(B=W.Cartesian3.fromArray(i,F+n,re),d&&(t=k,D=S,L=B,N=void 0,N=(H=c).cartesianToCartographic(t,K).height,(t=H.cartesianToCartographic(D,Z)).height=N,H.cartographicToCartesian(t,D),(D=H.cartesianToCartographic(L,Z)).height=N-100,H.cartographicToCartesian(D,L)),W.Cartesian3.subtract(S,k,S),W.Cartesian3.subtract(B,k,B),x=W.Cartesian3.normalize(W.Cartesian3.cross(B,S,x),x),A=!1),W.Cartesian3.equalsEpsilon(S,k,j.CrystalMath.EPSILON10)&&(A=!0)),(r.tangent||r.bitangent)&&(I=c.geodeticSurfaceNormal(k,I),r.tangent&&(T=W.Cartesian3.normalize(W.Cartesian3.cross(I,x,T),T)))):(x=c.geodeticSurfaceNormal(k,x),(r.tangent||r.bitangent)&&(d&&(ae=W.Cartesian3.fromArray(h,w,ae),oe=W.Cartesian3.cross(W.Cartesian3.UNIT_Z,ae,oe),oe=W.Cartesian3.normalize(U.Matrix3.multiplyByVector(G,oe,oe),oe),r.bitangent&&(ie=W.Cartesian3.normalize(W.Cartesian3.cross(ae,oe,ie),ie))),T=W.Cartesian3.cross(W.Cartesian3.UNIT_Z,x,T),T=W.Cartesian3.normalize(U.Matrix3.multiplyByVector(G,T,T),T),r.bitangent&&(I=W.Cartesian3.normalize(W.Cartesian3.cross(x,T,I),I)))),r.normal&&(e.wall?(h[w+O]=x.x,h[R+O]=x.y,h[M+O]=x.z):u&&(h[w+O]=-x.x,h[R+O]=-x.y,h[M+O]=-x.z),(l&&!d||s)&&(h[w]=x.x,h[R]=x.y,h[M]=x.z)),o&&(s&&(x=c.geodeticSurfaceNormal(k,x)),P[w+O]=-x.x,P[R+O]=-x.y,P[M+O]=-x.z),r.tangent&&(e.wall?(_[w+O]=T.x,_[R+O]=T.y,_[M+O]=T.z):u&&(_[w+O]=-T.x,_[R+O]=-T.y,_[M+O]=-T.z),l&&(d?(_[w]=oe.x,_[R]=oe.y,_[M]=oe.z):(_[w]=T.x,_[R]=T.y,_[M]=T.z))),r.bitangent&&(u&&(v[w+O]=I.x,v[R+O]=I.y,v[M+O]=I.z),l&&(d?(v[w]=ie.x,v[R]=ie.y,v[M]=ie.z):(v[w]=I.x,v[R]=I.y,v[M]=I.z))),w+=3)}r.st&&(a.attributes.st=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:f})),r.normal&&(a.attributes.normal=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:h})),r.tangent&&(a.attributes.tangent=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:_})),r.bitangent&&(a.attributes.bitangent=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:v})),o&&(a.attributes.extrudeDirection=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:P}))}return e.extrude&&z.defined(e.offsetAttribute)&&(g=i.length/3,b=new Uint8Array(g),e.offsetAttribute===Y.GeometryOffsetAttribute.TOP?l&&u||s?b=Y.arrayFill(b,1,0,g/2):l&&(b=Y.arrayFill(b,1)):(g=e.offsetAttribute===Y.GeometryOffsetAttribute.NONE?0:1,b=Y.arrayFill(b,g)),a.attributes.applyOffset=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:b})),a}var g=new W.Cartographic,d=new W.Cartographic,m={westOverIDL:0,eastOverIDL:0},h=new c.EllipsoidGeodesic;function p(e,t,r,a,o){if(o=z.defaultValue(o,new W.Rectangle),!z.defined(e)||e.length<3)return o.west=0,o.north=0,o.south=0,o.east=0,o;if(r===y.ArcType.RHUMB)return W.Rectangle.fromCartesianArray(e,t,o);h.ellipsoid.equals(t)||(h=new c.EllipsoidGeodesic(void 0,void 0,t)),o.west=Number.POSITIVE_INFINITY,o.east=Number.NEGATIVE_INFINITY,o.south=Number.POSITIVE_INFINITY,o.north=Number.NEGATIVE_INFINITY,m.westOverIDL=Number.POSITIVE_INFINITY,m.eastOverIDL=Number.NEGATIVE_INFINITY;for(var i,n=1/j.CrystalMath.chordLength(a,t.maximumRadius),s=e.length,l=t.cartesianToCartographic(e[0],d),u=g,p=1;p<s;p++)i=u,u=l,l=t.cartesianToCartographic(e[p],i),h.setEndPoints(u,l),_(h,n,o,m);return i=u,u=l,l=t.cartesianToCartographic(e[0],i),h.setEndPoints(u,l),_(h,n,o,m),o.east-o.west>m.eastOverIDL-m.westOverIDL&&(o.west=m.westOverIDL,o.east=m.eastOverIDL,o.east>j.CrystalMath.PI&&(o.east=o.east-j.CrystalMath.TWO_PI),o.west>j.CrystalMath.PI&&(o.west=o.west-j.CrystalMath.TWO_PI)),o}var b=new W.Cartographic;function _(e,t,r,a){for(var o=e.surfaceDistance,i=Math.ceil(o*t),n=0<i?o/(i-1):Number.POSITIVE_INFINITY,s=0,l=0;l<i;l++){var u=e.interpolateUsingSurfaceDistance(s,b);s+=n;var p=u.longitude,u=u.latitude;r.west=Math.min(r.west,p),r.east=Math.max(r.east,p),r.south=Math.min(r.south,u),r.north=Math.max(r.north,u);p=0<=p?p:p+j.CrystalMath.TWO_PI;a.westOverIDL=Math.min(a.westOverIDL,p),a.eastOverIDL=Math.max(a.eastOverIDL,p)}}var N=[];function v(e){var t,r=e.polygonHierarchy,a=z.defaultValue(e.vertexFormat,f.VertexFormat.DEFAULT),o=z.defaultValue(e.ellipsoid,W.Ellipsoid.WGS84),i=z.defaultValue(e.granularity,j.CrystalMath.RADIANS_PER_DEGREE),n=z.defaultValue(e.stRotation,0),s=z.defaultValue(e.perPositionHeight,!1),l=s&&z.defined(e.extrudedHeight),u=z.defaultValue(e.height,0),p=z.defaultValue(e.extrudedHeight,u);l||(t=Math.max(u,p),p=Math.min(u,p),u=t),this._vertexFormat=f.VertexFormat.clone(a),this._ellipsoid=W.Ellipsoid.clone(o),this._granularity=i,this._stRotation=n,this._height=u,this._extrudedHeight=p,this._closeTop=z.defaultValue(e.closeTop,!0),this._closeBottom=z.defaultValue(e.closeBottom,!0),this._polygonHierarchy=r,this._perPositionHeight=s,this._perPositionHeightExtrude=l,this._shadowVolume=z.defaultValue(e.shadowVolume,!1),this._workerName="createPolygonGeometry",this._offsetAttribute=e.offsetAttribute,this._arcType=z.defaultValue(e.arcType,y.ArcType.GEODESIC),this._rectangle=void 0,this._textureCoordinateRotationPoints=void 0,this.packedLength=V.PolygonGeometryLibrary.computeHierarchyPackedLength(r)+W.Ellipsoid.packedLength+f.VertexFormat.packedLength+12}v.fromPositions=function(e){return new v({polygonHierarchy:{positions:(e=z.defaultValue(e,z.defaultValue.EMPTY_OBJECT)).positions},height:e.height,extrudedHeight:e.extrudedHeight,vertexFormat:e.vertexFormat,stRotation:e.stRotation,ellipsoid:e.ellipsoid,granularity:e.granularity,perPositionHeight:e.perPositionHeight,closeTop:e.closeTop,closeBottom:e.closeBottom,offsetAttribute:e.offsetAttribute,arcType:e.arcType})},v.pack=function(e,t,r){return r=z.defaultValue(r,0),r=V.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,r),W.Ellipsoid.pack(e._ellipsoid,t,r),r+=W.Ellipsoid.packedLength,f.VertexFormat.pack(e._vertexFormat,t,r),r+=f.VertexFormat.packedLength,t[r++]=e._height,t[r++]=e._extrudedHeight,t[r++]=e._granularity,t[r++]=e._stRotation,t[r++]=e._perPositionHeightExtrude?1:0,t[r++]=e._perPositionHeight?1:0,t[r++]=e._closeTop?1:0,t[r++]=e._closeBottom?1:0,t[r++]=e._shadowVolume?1:0,t[r++]=z.defaultValue(e._offsetAttribute,-1),t[r++]=e._arcType,t[r]=e.packedLength,t};var P=W.Ellipsoid.clone(W.Ellipsoid.UNIT_SPHERE),C=new f.VertexFormat,w={polygonHierarchy:{}};return v.unpack=function(e,t,r){t=z.defaultValue(t,0);var a=V.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=a.startingIndex,delete a.startingIndex;var o=W.Ellipsoid.unpack(e,t,P);t+=W.Ellipsoid.packedLength;var i=f.VertexFormat.unpack(e,t,C);t+=f.VertexFormat.packedLength;var n=e[t++],s=e[t++],l=e[t++],u=e[t++],p=1===e[t++],y=1===e[t++],c=1===e[t++],g=1===e[t++],d=1===e[t++],m=e[t++],h=e[t++],t=e[t];return(r=!z.defined(r)?new v(w):r)._polygonHierarchy=a,r._ellipsoid=W.Ellipsoid.clone(o,r._ellipsoid),r._vertexFormat=f.VertexFormat.clone(i,r._vertexFormat),r._height=n,r._extrudedHeight=s,r._granularity=l,r._stRotation=u,r._perPositionHeightExtrude=p,r._perPositionHeight=y,r._closeTop=c,r._closeBottom=g,r._shadowVolume=d,r._offsetAttribute=-1===m?void 0:m,r._arcType=h,r.packedLength=t,r},v.computeRectangle=function(e,t){var r=z.defaultValue(e.granularity,j.CrystalMath.RADIANS_PER_DEGREE),a=z.defaultValue(e.arcType,y.ArcType.GEODESIC),o=e.polygonHierarchy,e=z.defaultValue(e.ellipsoid,W.Ellipsoid.WGS84);return p(o.positions,e,a,r,t)},v.createGeometry=function(e){var t=e._vertexFormat,r=e._ellipsoid,a=e._granularity,o=e._stRotation,i=e._polygonHierarchy,n=e._perPositionHeight,s=e._closeTop,l=e._closeBottom,u=e._arcType;if(!((d=i.positions).length<3)){var p=A.EllipsoidTangentPlane.fromPoints(d,r),i=V.PolygonGeometryLibrary.polygonsFromHierarchy(i,p.projectPointsOntoPlane.bind(p),!n,r),y=i.hierarchy,c=i.polygons;if(0!==y.length){var g,d=y[0].outerRing,d=V.PolygonGeometryLibrary.computeBoundingRectangle(p.plane.normal,p.projectPointOntoPlane.bind(p),d,o,D),m=[],h=e._height,f=e._extrudedHeight,b={perPositionHeight:n,vertexFormat:t,geometry:void 0,tangentPlane:p,boundingRectangle:d,ellipsoid:r,stRotation:o,bottom:!1,top:!0,wall:!1,extrude:!1,arcType:u};if(e._perPositionHeightExtrude||!j.CrystalMath.equalsEpsilon(h,f,0,j.CrystalMath.EPSILON2))for(b.extrude=!0,b.top=s,b.bottom=l,b.shadowVolume=e._shadowVolume,b.offsetAttribute=e._offsetAttribute,g=0;g<c.length;g++){var _,v=function(e,t,r,a,o,i,n,s,l){var u={walls:[]};if(i||n){var p=V.PolygonGeometryLibrary.createGeometryFromPositions(e,t,r,o,s,l),t=p.attributes.position.values,y=p.indices;if(i&&n){var c,i=t.concat(t),g=i.length/3;(c=O.IndexDatatype.createTypedArray(g,2*y.length)).set(y);for(var d=y.length,m=g/2,h=0;h<d;h+=3){var f=c[h]+m,b=c[h+1]+m,_=c[h+2]+m;c[h+d]=_,c[h+1+d]=b,c[h+2+d]=f}p.attributes.position.values=i,o&&s.normal&&(s=p.attributes.normal.values,p.attributes.normal.values=new Float32Array(i.length),p.attributes.normal.values.set(s)),p.indices=c}else if(n){for(g=t.length/3,c=O.IndexDatatype.createTypedArray(g,y.length),h=0;h<y.length;h+=3)c[h]=y[h+2],c[h+1]=y[h+1],c[h+2]=y[h];p.indices=c}u.topAndBottom=new E.GeometryInstance({geometry:p})}var p=a.outerRing,v=A.EllipsoidTangentPlane.fromPoints(p,e).projectPointsOntoPlane(p,N);F.PolygonPipeline.computeWindingOrder2D(v)===F.WindingOrder.CLOCKWISE&&(p=p.slice().reverse());var P=V.PolygonGeometryLibrary.computeWallGeometry(p,e,r,o,l);u.walls.push(new E.GeometryInstance({geometry:P}));var C=a.holes;for(h=0;h<C.length;h++){var w=C[h],v=A.EllipsoidTangentPlane.fromPoints(w,e).projectPointsOntoPlane(w,N);F.PolygonPipeline.computeWindingOrder2D(v)===F.WindingOrder.COUNTER_CLOCKWISE&&(w=w.slice().reverse()),P=V.PolygonGeometryLibrary.computeWallGeometry(w,e,r,o,l),u.walls.push(new E.GeometryInstance({geometry:P}))}return u}(r,c[g],a,y[g],n,s,l,t,u);s&&l?(_=v.topAndBottom,b.geometry=V.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(_.geometry,h,f,r,n)):s?((_=v.topAndBottom).geometry.attributes.position.values=F.PolygonPipeline.scaleToGeodeticHeight(_.geometry.attributes.position.values,h,r,!n),b.geometry=_.geometry):l&&((_=v.topAndBottom).geometry.attributes.position.values=F.PolygonPipeline.scaleToGeodeticHeight(_.geometry.attributes.position.values,f,r,!0),b.geometry=_.geometry),(s||l)&&(b.wall=!1,_.geometry=L(b),m.push(_));var P=v.walls;b.wall=!0;for(var C=0;C<P.length;C++){var w=P[C];b.geometry=V.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(w.geometry,h,f,r,n),w.geometry=L(b),m.push(w)}}else for(g=0;g<c.length;g++){var x,T,I=new E.GeometryInstance({geometry:V.PolygonGeometryLibrary.createGeometryFromPositions(r,c[g],a,n,t,u)});I.geometry.attributes.position.values=F.PolygonPipeline.scaleToGeodeticHeight(I.geometry.attributes.position.values,h,r,!n),b.geometry=I.geometry,I.geometry=L(b),z.defined(e._offsetAttribute)&&(T=I.geometry.attributes.position.values.length,x=new Uint8Array(T/3),T=e._offsetAttribute===Y.GeometryOffsetAttribute.NONE?0:1,Y.arrayFill(x,T),I.geometry.attributes.applyOffset=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:x})),m.push(I)}p=G.GeometryPipeline.combineInstances(m)[0];p.attributes.position.values=new Float64Array(p.attributes.position.values),p.indices=O.IndexDatatype.createTypedArray(p.attributes.position.values.length/3,p.indices);d=p.attributes,o=U.BoundingSphere.fromVertices(d.position.values);return t.position||delete d.position,new q.Geometry({attributes:d,indices:p.indices,primitiveType:p.primitiveType,boundingSphere:o,offsetAttribute:e._offsetAttribute})}}},v.createShadowVolume=function(e,t,r){var a=e._granularity,o=e._ellipsoid,t=t(a,o),r=r(a,o);return new v({polygonHierarchy:e._polygonHierarchy,ellipsoid:o,stRotation:e._stRotation,granularity:a,perPositionHeight:!1,extrudedHeight:t,height:r,vertexFormat:f.VertexFormat.POSITION_ONLY,shadowVolume:!0,arcType:e._arcType})},Object.defineProperties(v.prototype,{rectangle:{get:function(){var e;return z.defined(this._rectangle)||(e=this._polygonHierarchy.positions,this._rectangle=p(e,this._ellipsoid,this._arcType,this._granularity)),this._rectangle}},textureCoordinateRotationPoints:{get:function(){return z.defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=function(e){var t=-e._stRotation;if(0==t)return[0,0,0,1,1,0];var r=e._ellipsoid,a=e._polygonHierarchy.positions,e=e.rectangle;return q.Geometry._textureCoordinateRotationPoints(a,t,r,e)}(this)),this._textureCoordinateRotationPoints}}}),function(e,t){return(e=z.defined(t)?v.unpack(e,t):e)._ellipsoid=W.Ellipsoid.clone(e._ellipsoid),v.createGeometry(e)}});
