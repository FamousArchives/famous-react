'use strict';

var async = require('async');
var applyState = require('./applyStateToModifier');
var getState = require('./getStateFromModifier');

function applyStep(fn, mod, cb) {
  var currState = getState(mod);
  var nextState = fn(currState);
  applyState(nextState, mod, cb);
}

function runSequence(sequence, mod, cb) {
  var steps = sequence.getSteps();
  var tasks = steps.map(function(fn) {
    return async.apply(applyStep, fn, mod);
  });
  async.series(tasks, cb);
}

module.exports = runSequence;