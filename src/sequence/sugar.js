'use strict';
var clone = require('lodash.clone');

function sugar(inState) {
  var nextState = clone(inState);

  // TODO: clone needed?
  // TODO: change x/y/z to translate
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
  return nextState;
}

module.exports = sugar;