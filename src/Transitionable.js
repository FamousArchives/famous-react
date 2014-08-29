'use strict';

// this was an experiment
// this is going away soon

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