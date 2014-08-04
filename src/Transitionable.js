'use strict';

module.exports = function(value, transition) {
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