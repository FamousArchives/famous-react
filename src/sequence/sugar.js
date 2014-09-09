'use strict';

var clone = require('lodash.clone');

// TODO: allow overrides by specifying whole value

function sugar(nextState) {
  var state = clone(nextState);

  // center
  if (state.center === 'vertical') {
    state.align = [0, 0.5];
    state.origin = [0, 0.5];
  } else if (state.center === 'horizontal') {
    state.align = [0.5, 0];
    state.origin = [0.5, 0];
  } else if (state.center === true) {
    state.origin = [0.5, 0.5];
    state.align = [0.5, 0.5];
  }
  delete state.center;

  // sizing
  state.size = [
    state.width,
    state.height
  ];
  delete state.width;
  delete state.height;

  // translation
  state.translate = [
    state.x,
    state.y,
    state.z
  ];
  delete state.x;
  delete state.y;
  delete state.z;

  // rotation
  state.rotate = [
    state.rotateX,
    state.rotateY,
    state.rotateZ
  ];
  delete state.rotateX;
  delete state.rotateY;
  delete state.rotateZ;

  // scale
  state.scale = [
    state.scaleX,
    state.scaleY,
    state.scaleZ
  ];
  delete state.scaleX;
  delete state.scaleY;
  delete state.scaleZ;

  // skew
  state.skew = [
    state.skewX,
    state.skewY,
    state.skewZ
  ];
  delete state.skewX;
  delete state.skewY;
  delete state.skewZ;

  return state;
}

module.exports = sugar;