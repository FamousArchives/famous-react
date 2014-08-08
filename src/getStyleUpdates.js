'use strict';

var styleFields = require('./styleFields');

// TODO: cleverly inline styleFields to reduce a loop here
function getStyleUpdates(lastStyle, nextStyle){
  var styleUpdates = {};
  var styleUpdated = false;

  if (lastStyle === nextStyle) {
    return;
  }

  styleFields.forEach(function updateStyle(styleName){
    var lastVal = lastStyle[styleName];
    var nextVal = nextStyle[styleName];
    if (!lastVal && !nextVal) {
      return;
    }
    if (lastVal && !nextVal) {
      styleUpdated = true;
      styleUpdates[styleName] = '';
      return;
    }
    if (lastVal !== nextVal) {
      styleUpdated = true;
      styleUpdates[styleName] = nextVal;
      return;
    }
  });

  if (!styleUpdated) {
    return;
  }

  return styleUpdates;
}

module.exports = getStyleUpdates;