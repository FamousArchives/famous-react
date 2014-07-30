'use strict';

var Engine = require('famous/core/Engine');
var ReactUpdates = require('react/lib/ReactUpdates');

// Put React on famo.us's tick
/*
var FamousBatchingStrategy = {
  isBatchingUpdates: true,
  batchedUpdates: function(cb, a, b) {
    cb(a, b);
  }
};

ReactUpdates.injection.injectBatchingStrategy(FamousBatchingStrategy);
Engine.on('prerender', ReactUpdates.flushBatchedUpdates.bind(ReactUpdates));
*/

module.exports = Engine;