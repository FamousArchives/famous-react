'use strict';

function ensureStep(o) {
  // already a func
  if (typeof o === 'function') {
    return o;
  }

  // wrap obj
  if (typeof o === 'object') {
    return function() {
      return o;
    };
  }

  throw new Error('Invalid Step');
}

module.exports = ensureStep;