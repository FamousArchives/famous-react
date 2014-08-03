'use strict';

var Engine = require('famous/core/Engine');
var ElementOutput = require('famous/core/ElementOutput');
var StateModifier = require('famous/modifiers/StateModifier');
var PropTypes = require('react/lib/ReactPropTypes');
var CSSPropertyOperations = require('react/lib/CSSPropertyOperations');
var merge = require('react/lib/merge');

var getStyleUpdates = require('./getStyleUpdates');
var applyPropsToModifer = require('./applyPropsToModifer');

var RenderableMixin = {
  propTypes: {
    transform: PropTypes.arrayOf(PropTypes.number),
    origin: PropTypes.arrayOf(PropTypes.number),
    align: PropTypes.arrayOf(PropTypes.number)
  },
  tick: function(){
    // calculate the new styles
    this._famous.modifier.modify(this._famous.node);
    this._famous.node.commit(this._famous.modifier._modifier._output);
    
    // no need to touch the dom while unmounted
    if (!this.isMounted()) {
      return;
    }

    // diff our faked element with the last run
    // so we only update when stuff changes
    var lastStyle = this._famous.element.previousStyle;
    var nextStyle = this._famous.element.style;
    var styleUpdates = lastStyle ? getStyleUpdates(lastStyle, nextStyle) : nextStyle;
    if (styleUpdates) {
      CSSPropertyOperations.setValueForStyles(this.getDOMNode(), styleUpdates);
      this._famous.element.previousStyle = merge(nextStyle);
    }
  },
  componentWillMount: function(){
    this._famous = {};

    // create a fake element that props will go on
    this._famous.element = {
      style: {},
      previousStyle: null
    };

    // attach famous to this fake element
    this._famous.node = new ElementOutput();
    this._famous.node._element = this._famous.element;

    // attach our modifier to our famous node
    this._famous.modifier = new StateModifier();
  },
  componentWillUnmount: function(){
    // halt the animation on our modifier
    this._famous.modifier.halt();

    // remove our tick from the event loop
    Engine.removeListener('prerender', this.tick);
  },
  componentDidMount: function(){
    // add our tick to the event loop
    Engine.on('prerender', this.tick);

    // update our props for the first time
    this.componentWillReceiveProps(this.props);
  },

  componentWillReceiveProps: function(newProps){
    applyPropsToModifer(newProps, this._famous.modifier);
    this.tick();
  }
};

module.exports = RenderableMixin;
