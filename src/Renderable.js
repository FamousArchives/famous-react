'use strict';

var Engine = require('famous/core/Engine');
var ElementOutput = require('famous/core/ElementOutput');
var StateModifier = require('famous/modifiers/StateModifier');
var PropTypes = require('react/lib/ReactPropTypes');

var RenderableMixin = {
  propTypes: {
    height: PropTypes.number,
    width: PropTypes.number,
    transform: PropTypes.arrayOf(PropTypes.number),
    origin: PropTypes.arrayOf(PropTypes.number),
    align: PropTypes.arrayOf(PropTypes.number)
  },
  tick: function(){
    this.modifier.modify(this.famous);
    this.famous.commit(this.modifier._modifier._output);
  },
  componentDidMount: function(){
    var el = this.getDOMNode();
    this.famous = new ElementOutput(el);
    this.modifier = new StateModifier();
    this.componentWillReceiveProps(this.props);
    this.tick();
    Engine.on('prerender', this.tick);
  },
  componentDidUnmount: function(){
    Engine.removeListener('prerender', this.tick);
  },
  componentWillReceiveProps: function(props){
    applyPropsToModifer(props, this.modifier);
    this.tick();
  }
};

function getTransitionValue(val) {
  // config
  if (typeof val === 'object' && !Array.isArray(val)) {
    return val;
  }
  // primitive
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
  // TODO: size transition but we have two fields?
  var size = getTransitionValue([props.width, props.height]);
  
  if (transform.value) {
    mod.setTransform(transform.value, transform.transition);
  }
  if (opacity.value) {
    mod.setOpacity(opacity.value, opacity.transition);
  }
  if (origin.value) {
    mod.setOrigin(origin.value, origin.transition);
  }

  if (align.value) {
    mod.setAlign(align.value, align.transition);
  }
  if (size.value) {
    mod.setSize(size.value, size.transition);
  }
}

module.exports = RenderableMixin;
