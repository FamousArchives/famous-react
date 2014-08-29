'use strict';

var Transitionable = require('../Transitionable');

// DEPRECATED

function applyPropsToModifer(props, mod) {
  // TODO: dirty checking here
  // TODO: animation callbacks
  if (typeof props.transform !== 'undefined') {
    var transform = Transitionable(props.transform);
    mod.setTransform(transform.value, transform.transition);
  }
  if (typeof props.opacity !== 'undefined') {
    var opacity = Transitionable(props.opacity);
    mod.setOpacity(opacity.value, opacity.transition);
  }
  if (typeof props.origin !== 'undefined') {
    var origin = Transitionable(props.origin);
    mod.setOrigin(origin.value, origin.transition);
  }
  if (typeof props.align !== 'undefined') {
    var align = Transitionable(props.align);
    mod.setAlign(align.value, align.transition);
  }

  mod.setSize([props.width, props.height]);
}

module.exports = applyPropsToModifer;