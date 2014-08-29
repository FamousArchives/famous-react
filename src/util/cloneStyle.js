'use strict';

// this is all inlined for performance reasons
function cloneStyle(style) {
  var out = {
    zIndex: style.zIndex,
    height: style.height,
    width: style.width,
    opacity: style.opacity,

    transform: style.transform,
    webkitTransform: style.webkitTransform,
    mozTransform: style.mozTransform,

    transformOrigin: style.transformOrigin,
    webkitTransformOrigin: style.webkitTransformOrigin,
    mozTransformOrigin: style.mozTransformOrigin,

    perspective: style.perspective,
    webkitPerspective: style.webkitPerspective,
    mozPerspective: style.mozPerspective
  };
  return out;
}

module.exports = cloneStyle;