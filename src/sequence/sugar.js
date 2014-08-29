'use strict';

function sugar(nextState) {
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
  }
  nextState.size = [nextState.width, nextState.size];
  return nextState;
}

module.exports = sugar;