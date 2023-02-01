define(["./arrayRemoveDuplicates-72d928ba","./BoundingRectangle-e4803dfe","./Transforms-21fa56f0","./Cartesian2-fe435665","./Math-e9e583a9","./ComponentDatatype-db261df2","./CoplanarPolygonGeometryLibrary-bc8c4c7e","./when-23b1aa97","./GeometryAttribute-e2cab2f1","./GeometryAttributes-bf6191be","./GeometryInstance-f73501bb","./GeometryPipeline-ad571d9b","./IndexDatatype-5483de1e","./PolygonGeometryLibrary-275fb1ab","./PolygonPipeline-7f6972cc","./VertexFormat-4b1610fd","./RuntimeError-acd9a015","./WebGLConstants-c32c4572","./OrientedBoundingBox-fcf7a49b","./EllipsoidTangentPlane-3934f12e","./IntersectionTests-5927aeeb","./Plane-95acb6df","./AttributeCompression-dc95bf1b","./EncodedCartesian3-c1064016","./ArcType-94cbcc5d","./EllipsoidRhumbLine-5fcd2f7f"],function(f,e,L,E,T,D,h,l,_,V,v,C,k,x,R,s,t,a,n,r,o,i,p,y,c,m){"use strict";var I=new E.Cartesian3,P=new e.BoundingRectangle,M=new E.Cartesian2,H=new E.Cartesian2,w=new E.Cartesian3,A=new E.Cartesian3,F=new E.Cartesian3,G=new E.Cartesian3,B=new E.Cartesian3,O=new E.Cartesian3,z=new L.Quaternion,S=new L.Matrix3,N=new L.Matrix3,Q=new E.Cartesian3;function u(e){var t=(e=l.defaultValue(e,l.defaultValue.EMPTY_OBJECT)).polygonHierarchy,a=l.defaultValue(e.vertexFormat,s.VertexFormat.DEFAULT);this._vertexFormat=s.VertexFormat.clone(a),this._polygonHierarchy=t,this._stRotation=l.defaultValue(e.stRotation,0),this._ellipsoid=E.Ellipsoid.clone(l.defaultValue(e.ellipsoid,E.Ellipsoid.WGS84)),this._workerName="createCoplanarPolygonGeometry",this.packedLength=x.PolygonGeometryLibrary.computeHierarchyPackedLength(t)+s.VertexFormat.packedLength+E.Ellipsoid.packedLength+2}u.fromPositions=function(e){return new u({polygonHierarchy:{positions:(e=l.defaultValue(e,l.defaultValue.EMPTY_OBJECT)).positions},vertexFormat:e.vertexFormat,stRotation:e.stRotation,ellipsoid:e.ellipsoid})},u.pack=function(e,t,a){return a=l.defaultValue(a,0),a=x.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,a),E.Ellipsoid.pack(e._ellipsoid,t,a),a+=E.Ellipsoid.packedLength,s.VertexFormat.pack(e._vertexFormat,t,a),a+=s.VertexFormat.packedLength,t[a++]=e._stRotation,t[a]=e.packedLength,t};var d=E.Ellipsoid.clone(E.Ellipsoid.UNIT_SPHERE),g=new s.VertexFormat,b={polygonHierarchy:{}};return u.unpack=function(e,t,a){t=l.defaultValue(t,0);var n=x.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=n.startingIndex,delete n.startingIndex;var r=E.Ellipsoid.unpack(e,t,d);t+=E.Ellipsoid.packedLength;var o=s.VertexFormat.unpack(e,t,g);t+=s.VertexFormat.packedLength;var i=e[t++],t=e[t];return(a=!l.defined(a)?new u(b):a)._polygonHierarchy=n,a._ellipsoid=E.Ellipsoid.clone(r,a._ellipsoid),a._vertexFormat=s.VertexFormat.clone(o,a._vertexFormat),a._stRotation=i,a.packedLength=t,a},u.createGeometry=function(e){var t=e._vertexFormat,a=e._polygonHierarchy,n=e._stRotation,r=a.positions;if(!((r=f.arrayRemoveDuplicates(r,E.Cartesian3.equalsEpsilon,!0)).length<3)){var o=w,i=A,l=F,s=B,p=O;if(h.CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments(r,G,s,p)){o=E.Cartesian3.cross(s,p,o);o=E.Cartesian3.normalize(o,o),E.Cartesian3.equalsEpsilon(G,E.Cartesian3.ZERO,T.CrystalMath.EPSILON6)||(y=e._ellipsoid.geodeticSurfaceNormal(G,Q),E.Cartesian3.dot(o,y)<0&&(o=E.Cartesian3.negate(o,o),s=E.Cartesian3.negate(s,s)));var y=h.CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction(G,s,p),c=h.CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction(G,s,p);t.tangent&&(i=E.Cartesian3.clone(s,i)),t.bitangent&&(l=E.Cartesian3.clone(p,l));var a=x.PolygonGeometryLibrary.polygonsFromHierarchy(a,y,!1),y=a.hierarchy,m=a.polygons;if(0!==y.length){for(var r=y[0].outerRing,a=L.BoundingSphere.fromPoints(r),u=x.PolygonGeometryLibrary.computeBoundingRectangle(o,c,r,n,P),d=[],g=0;g<m.length;g++){var b=new v.GeometryInstance({geometry:function(e,t,a,n,r,o,i,l){var s=e.positions,p=R.PolygonPipeline.triangulate(e.positions2D,e.holes);p.length<3&&(p=[0,1,2]),(e=k.IndexDatatype.createTypedArray(s.length,p.length)).set(p);var y=S;0!==n?(p=L.Quaternion.fromAxisAngle(o,n,z),y=L.Matrix3.fromQuaternion(p,y),(t.tangent||t.bitangent)&&(p=L.Quaternion.fromAxisAngle(o,-n,z),u=L.Matrix3.fromQuaternion(p,N),i=E.Cartesian3.normalize(L.Matrix3.multiplyByVector(u,i,i),i),t.bitangent&&(l=E.Cartesian3.normalize(E.Cartesian3.cross(o,i,l),l)))):y=L.Matrix3.clone(L.Matrix3.IDENTITY,y);var c=H;t.st&&(c.x=a.x,c.y=a.y);for(var m=s.length,u=3*m,d=new Float64Array(u),g=t.normal?new Float32Array(u):void 0,b=t.tangent?new Float32Array(u):void 0,f=t.bitangent?new Float32Array(u):void 0,h=t.st?new Float32Array(2*m):void 0,v=0,C=0,x=0,P=0,w=0,A=0;A<m;A++){var F,G=s[A];d[v++]=G.x,d[v++]=G.y,d[v++]=G.z,t.st&&(F=r(L.Matrix3.multiplyByVector(y,G,I),M),E.Cartesian2.subtract(F,c,F),G=T.CrystalMath.clamp(F.x/a.width,0,1),F=T.CrystalMath.clamp(F.y/a.height,0,1),h[w++]=G,h[w++]=F),t.normal&&(g[C++]=o.x,g[C++]=o.y,g[C++]=o.z),t.tangent&&(b[P++]=i.x,b[P++]=i.y,b[P++]=i.z),t.bitangent&&(f[x++]=l.x,f[x++]=l.y,f[x++]=l.z)}return u=new V.GeometryAttributes,t.position&&(u.position=new _.GeometryAttribute({componentDatatype:D.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:d})),t.normal&&(u.normal=new _.GeometryAttribute({componentDatatype:D.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:g})),t.tangent&&(u.tangent=new _.GeometryAttribute({componentDatatype:D.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:b})),t.bitangent&&(u.bitangent=new _.GeometryAttribute({componentDatatype:D.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:f})),t.st&&(u.st=new _.GeometryAttribute({componentDatatype:D.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:h})),new _.Geometry({attributes:u,indices:e,primitiveType:_.PrimitiveType.TRIANGLES})}(m[g],t,u,n,c,o,i,l)});d.push(b)}y=C.GeometryPipeline.combineInstances(d)[0];y.attributes.position.values=new Float64Array(y.attributes.position.values),y.indices=k.IndexDatatype.createTypedArray(y.attributes.position.values.length/3,y.indices);r=y.attributes;return t.position||delete r.position,new _.Geometry({attributes:r,indices:y.indices,primitiveType:y.primitiveType,boundingSphere:a})}}}},function(e,t){return l.defined(t)&&(e=u.unpack(e,t)),u.createGeometry(e)}});
