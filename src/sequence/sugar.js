'use strict';
var clone = require('lodash.clone');

function sugar(inState) {
  var nextState = clone(inState);

  if (nextState.center) {
    if (nextState.center === 'vertical') {
      nextState.align = [0, 0.5];
      nextState.origin = [0, 0.5];
    } else if (nextState.center === 'horizontal') {
      nextState.align = [0.5, 0];
      nextState.origin = [0.5, 0];
    } else if (nextState.center === true) {
      nextState.origin = [0.5, 0.5];
      nextState.align = [0.5, 0.5];
    }
    delete nextState.center;
  }
  if (nextState.width != null || nextState.height != null) {
    nextState.size = [nextState.width, nextState.height];
    delete nextState.width;
    delete nextState.height;
  }
  if (nextState.x != null || nextState.y != null || nextState.z != null) {
    nextState.translate = [nextState.x, nextState.y, nextState.z];
    delete nextState.x;
    delete nextState.y;
    delete nextState.z;
  }
  return nextState;
}

module.exports = sugar;