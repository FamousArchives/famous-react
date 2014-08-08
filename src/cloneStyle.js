'use strict';

// this is all inlined for performance reasons
function cloneStyle(style) {
  var out = {
    zIndex: style.zIndex,
    transform: style.transform,
    webkitTransform: style.webkitTransform,
    height: style.height,
    width: style.width,
    opacity: style.opacity,
    transformOrigin: style.transformOrigin,
    webkitTransformOrigin: style.webkitTransformOrigin
  };
  return out;
}

module.exports = cloneStyle;