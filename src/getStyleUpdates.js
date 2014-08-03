'use strict';

// pulled from ReactDOMComponent and cleaned up
function getStyleUpdates(lastStyle, nextStyle){
  if (lastStyle === nextStyle) {
    return;
  }
  if (!lastStyle) {
    return nextStyle;
  }

  var styleName;
  var styleUpdates;

  // Unset styles on `lastStyle` but not on `nextStyle`.
  for (styleName in lastStyle) {
    if (lastStyle.hasOwnProperty(styleName) &&
        (!nextStyle || !nextStyle.hasOwnProperty(styleName))) {
      styleUpdates = styleUpdates || {};
      styleUpdates[styleName] = '';
    }
  }

  // Update styles that changed since `lastStyle`.
  for (styleName in nextStyle) {
    if (nextStyle.hasOwnProperty(styleName) &&
        lastStyle[styleName] !== nextStyle[styleName]) {
      styleUpdates = styleUpdates || {};
      styleUpdates[styleName] = nextStyle[styleName];
    }
  }

  return styleUpdates;
}

module.exports = getStyleUpdates;