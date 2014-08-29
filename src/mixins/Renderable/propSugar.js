'use strict';

// DEPRECATED

function propSugar(nextProps) {
  if (nextProps.center) {
    if (nextProps.center === 'vertical') {
      nextProps.align = [0, 0.5];
      nextProps.origin = [0, 0.5];
    } else if (nextProps.center === 'horizontal') {
      nextProps.align = [0.5, 0];
      nextProps.origin = [0.5, 0];
    } else if (nextProps.center === true) {
      nextProps.origin = [0.5, 0.5];
      nextProps.align = [0.5, 0.5];
    }
  }
  return nextProps;
}

module.exports = propSugar;