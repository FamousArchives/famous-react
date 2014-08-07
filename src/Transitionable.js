'use strict';

module.exports = function(value, transition) {
  if (typeof value === 'object' && !Array.isArray(value)) {
    return value;
  }

  if (typeof transition === 'string') {
    transition = {
      method: transition
    };
  }

  return {
    value: value,
    transition: transition
  };
};