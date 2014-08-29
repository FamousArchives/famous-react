'use strict';

var async = require('async');

function applyState(nextState, mod, cb) {
  // TODO: move sugar state change logic here
  // map over sugar transform
  var tasks = Object.keys(nextState).map(function(type){
    var def = nextState[type];
    return async.apply(applyStateChange, {
      type: type,
      value: def.value,
      transition: def.transition
    }, mod);
  });

  async.parallel(tasks, cb);
}

function applyStateChange(stateChange, mod, cb) {
  if (stateChange.type === 'opacity') {
    return mod.setOpacity(stateChange.value, stateChange.transition, cb);
  }
  if (stateChange.type === 'origin') {
    return mod.setOrigin(stateChange.value, stateChange.transition, cb);
  }
  if (stateChange.type === 'align') {
    return mod.setAlign(stateChange.value, stateChange.transition, cb);
  }

  var transform = mod._transformState;

  if (stateChange.type === 'scale') {
    return transform.setScale(stateChange.value, stateChange.transition, cb);
  }
  if (stateChange.type === 'rotate') {
    return transform.setRotate(stateChange.value, stateChange.transition, cb);
  }
  if (stateChange.type === 'skew') {
    return transform.setSkew(stateChange.value, stateChange.transition, cb);
  }
  if (stateChange.type === 'transform') {
    return transform.setTransform(stateChange.value, stateChange.transition, cb);
  }

  // TODO: use TransitionableTransform translate for x, y, z

  // TODO: use set for
  // perspective, height, width,

  // pass through unsupported for now
  cb();
}

module.exports = applyState;