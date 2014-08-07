'use strict';

function getStyleUpdates(lastStyle, nextStyle){
  if (lastStyle === nextStyle) {
    return;
  }

  var styleUpdates;

  // unset styles that were removed since lastStyle
  Object.keys(lastStyle).forEach(function(styleName){
    if (!nextStyle[styleName]) {
      styleUpdates = styleUpdates || {};
      styleUpdates[styleName] = '';
    }
  });

  // update styles that changed since lastStyle
  Object.keys(nextStyle).forEach(function(styleName){
    var nextVal = nextStyle[styleName];
    if (lastStyle[styleName] !== nextVal) {
      styleUpdates = styleUpdates || {};
      styleUpdates[styleName] = nextVal;
    }
  });

  return styleUpdates;
}

module.exports = getStyleUpdates;