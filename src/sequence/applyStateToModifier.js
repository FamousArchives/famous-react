'use strict';

var async = require('async');
var sugar = require('./sugar');

// TODO: reconcile changes of nested values
function applyState(nextState, mod, cb) {
  var tasks = Object.keys(sugar(nextState))
    .map(function(type){
      var def = nextState[type];
      return {
        type: type,
        value: def.value,
        transition: def.transition
      };
    })
    .map(function(def){
      return async.apply(applySingleState, def, mod);
    });

  async.parallel(tasks, cb);
}

function applySingleState(stateChange, mod, cb) {
  var transform = mod._transformState;
  var setters = {
    perspective: null,
    size: mod.setSize,
    opacity: mod.setOpacity,
    origin: mod.setOrigin,
    align: mod.setAlign,
    translate: transform.setTranslate,
    scale: transform.setScale,
    rotate: transform.setRotate,
    skew: transform.setSkew,
    transform: transform.setTransform
  };
  var setter = setters[stateChange.type];

  if (!setter) {
    throw new Error('Unsupported transition: ' + stateChange.type);
  }

  setter(stateChange.value, stateChange.transition, cb);
}

module.exports = applyState;