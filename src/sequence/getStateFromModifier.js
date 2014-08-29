'use strict';

function getState(mod) {
  var transformState = mod._transformState;

  var size = mod.getSize();
  var align = mod.getAlign();
  var origin = mod.getOrigin();
  var opacity = mod.getOpacity();

  var transform = transformState.get();
  var skew = transformState.skew.get();
  var translate = transformState.translate.get();
  var rotate = transformState.rotate.get();
  var scale = transformState.scale.get();

  var center = false;
  // TODO: check origin combos too
  if (align[0] === 0.5 && align[1] === 0) {
    center = 'horizontal';
  }
  if (align[0] === 0 && align[1] === 0.5) {
    center = 'vertical';
  }
  if (align[0] === 0.5 && align[1] === 0.5) {
    center = true;
  }

  return {
    x: translate[0],
    y: translate[1],
    z: translate[2],
    rotate: rotate,
    scale: scale,
    skew: skew,
    perspective: null, // TODO
    height: size[1],
    width: size[0],
    opacity: opacity,
    origin: origin,
    align: align,
    transform: transform,
    center: center
  };
}

module.exports = getState;