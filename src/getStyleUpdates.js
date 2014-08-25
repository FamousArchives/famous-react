'use strict';

var styleFields = require('./styleFields');

// TODO: cleverly inline styleFields to reduce a loop here
function getStyleUpdates(lastStyle, nextStyle) {
  var styleUpdates = {};
  var styleUpdated = false;

  styleFields.forEach(function(styleName) {
    var lastVal = lastStyle[styleName];
    var nextVal = nextStyle[styleName];
    if (!lastVal && !nextVal) {
      return;
    }

    if (lastVal !== nextVal) {
      styleUpdated = true;
      styleUpdates[styleName] = (nextVal || '');
    }
  });

  if (styleUpdated) {
    return styleUpdates;
  }
}

module.exports = getStyleUpdates;