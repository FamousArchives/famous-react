'use strict';

function getCenter(origin, align) {
  if (!align) {
    return false;
  }

  // TODO: check origin combos too
  if (align[0] === 0.5 && align[1] === 0) {
    return 'horizontal';
  }
  if (align[0] === 0 && align[1] === 0.5) {
    return 'vertical';
  }
  if (align[0] === 0.5 && align[1] === 0.5) {
    return true;
  }
  return false;
}

function getState(mod) {
  var transformState = mod._transformState;

  var size = mod.getSize();
  var align = mod.getAlign();
  var origin = mod.getOrigin();
  var opacity = mod.getOpacity();

  var transform = mod.getTransform();
  var skew = transformState.skew.get();
  var translate = transformState.translate.get();
  var rotate = transformState.rotate.get();
  var scale = transformState.scale.get();
  var center = getCenter(origin, align);

  return {
    translate: translate,
    x: translate[0],
    y: translate[1],
    z: translate[2],
  
    rotate: rotate,
    rotateX: rotate[0],
    rotateY: rotate[1],
    rotateZ: rotate[2],

    scale: scale,
    skew: skew,
    perspective: null,
    width: (size ? size[0] : null),
    height: (size ? size[1] : null),
    opacity: opacity,
    origin: origin,
    align: align,
    transform: transform,
    center: center
  };
}

module.exports = getState;