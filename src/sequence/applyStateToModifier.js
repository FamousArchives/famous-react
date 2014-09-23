'use strict';

var async = require('async');
var sugar = require('./sugar');
var Transform = require('famous/core/Transform');

var defaults = {
  translate: [0, 0, 0],
  scale: [1, 1, 1],
  rotate: [0, 0, 0],
  skew: [0, 0, 0],
  transform: Transform.identity
};

function toStruct(k, v) {
  var isObject = v != null;
  var val = (isObject && v.value != null) ? v.value : null;
  var trans = (isObject && v.transition != null) ? v.transition : null;

  return {
    type: k,
    value: val,
    transition: trans
  };
}

function applyState(nextState, mod, cb) {
  var sugarState = sugar(nextState);
  var tasks = Object.keys(sugarState)
    .map(function(type){
      return toStruct(type, sugarState[type]);
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
    size: mod.setSize.bind(mod),
    opacity: mod.setOpacity.bind(mod),
    origin: mod.setOrigin.bind(mod),
    align: mod.setAlign.bind(mod),

    translate: transform.setTranslate.bind(transform),
    scale: transform.setScale.bind(transform),
    rotate: transform.setRotate.bind(transform),
    skew: transform.setSkew.bind(transform),
    transform: mod.setTransform.bind(mod)
  };
  var setter = setters[stateChange.type];

  if (!setter) {
    throw new Error('Unsupported transition: ' + stateChange.type);
  }

  var val = (stateChange.value != null) ? stateChange.value : defaults[stateChange.type];

  if (val != null) {
    // TODO: only apply if changed
    console.log(stateChange.type, val, stateChange.transition);
    setter(val, stateChange.transition, cb);
  }
}

module.exports = applyState;