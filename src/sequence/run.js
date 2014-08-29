'use strict';

var async = require('async');

function applyStep(fn, mod, cb) {
  var currState = getState(mod);
  var nextState = fn(currState);
  applyState(nextState, mod, cb);
}

function getState(mod) {
  return {}; // TODO: impl
}

function applyState(nextState, mod, cb) {
  // TODO: apply nextState to modifier
  // and wait for animation to end
}

function runSequence(sequence, mod, cb) {
  var steps = sequence.getSteps();
  var tasks = steps.map(function(fn) {
    return async.apply(applyStep, fn, mod);
  });
  async.series(tasks, cb);
}