define(["exports","./when-23b1aa97","./Math-e9e583a9","./WebGLConstants-c32c4572"],function(e,r,N,t){"use strict";var n={UNSIGNED_BYTE:t.WebGLConstants.UNSIGNED_BYTE,UNSIGNED_SHORT:t.WebGLConstants.UNSIGNED_SHORT,UNSIGNED_INT:t.WebGLConstants.UNSIGNED_INT,getSizeInBytes:function(e){switch(e){case n.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case n.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case n.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT}},fromSizeInBytes:function(e){switch(e){case 2:return n.UNSIGNED_SHORT;case 4:return n.UNSIGNED_INT;case 1:return n.UNSIGNED_BYTE}},validate:function(e){return r.defined(e)&&(e===n.UNSIGNED_BYTE||e===n.UNSIGNED_SHORT||e===n.UNSIGNED_INT)},createTypedArray:function(e,r){return new(e>=N.CrystalMath.SIXTY_FOUR_KILOBYTES?Uint32Array:Uint16Array)(r)},createTypedArrayFromArrayBuffer:function(e,r,t,n){return new(e>=N.CrystalMath.SIXTY_FOUR_KILOBYTES?Uint32Array:Uint16Array)(r,t,n)}},t=Object.freeze(n);e.IndexDatatype=t});
