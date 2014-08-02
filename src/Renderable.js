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

function applyPropsToModifer(props, mod){
  // TODO: reset if null
  // TODO: specify transitions in a tuple
  if (props.transform) {
    mod.setTransform(props.transform, true);
  }
  if (typeof props.opacity !== 'undefined') {
    mod.setOpacity(props.opacity, true);
  }
  if (props.origin) {
    mod.setOrigin(props.origin, true);
  }
  if (props.align) {
    mod.setAlign(props.align, true);
  }

  if (typeof props.width !== 'undefined' || typeof props.height === 'undefined') {
    mod.setSize([props.width, props.height], true);
  }
}

module.exports = RenderableMixin;
