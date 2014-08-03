'use strict';

function getTransitionValue(val) {
  // config
  if (typeof val === 'object' && !Array.isArray(val)) {
    return val;
  }
  // primitive, use auto transition
  return {
    value: val,
    transition: true
  };
}

function applyPropsToModifer(props, mod) {
  var transform = getTransitionValue(props.transform);
  var opacity = getTransitionValue(props.opacity);
  var origin = getTransitionValue(props.origin);
  var align = getTransitionValue(props.align);
  
  if (typeof transform.value !== 'undefined') {
    mod.setTransform(transform.value, transform.transition);
  }
  if (typeof opacity.value !== 'undefined') {
    mod.setOpacity(opacity.value, opacity.transition);
  }
  if (typeof origin.value !== 'undefined') {
    mod.setOrigin(origin.value, origin.transition);
  }
  if (typeof align.value !== 'undefined') {
    mod.setAlign(align.value, align.transition);
  }
}

module.exports = applyPropsToModifer;