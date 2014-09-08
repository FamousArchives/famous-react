'use strict';
var clone = require('lodash.clone');

function someExists() {
  var args = Array.prototype.slice.apply(arguments);
  return args.some(function(v){
    return v != null;
  });
}

function sugar(nextState) {
  var state = clone(nextState);

  if (state.center) {
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
  }
  if (someExists(state.width, state.height)) {
    state.size = [
      state.width,
      state.height
    ];
    delete state.width;
    delete state.height;
  }

  if (someExists(state.x, state.y, state.z)) {
    state.translate = [
      state.x,
      state.y,
      state.z
    ];
    delete state.x;
    delete state.y;
    delete state.z;
  }
  if (someExists(state.rotateX, state.rotateY, state.rotateZ)) {
    state.rotate = [
      state.rotateX,
      state.rotateY,
      state.rotateZ
    ];
    delete state.rotateX;
    delete state.rotateY;
    delete state.rotateZ;
  }
  return state;
}

module.exports = sugar;