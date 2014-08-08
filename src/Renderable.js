'use strict';

var Engine = require('famous/core/Engine');
var RenderNode = require('famous/core/RenderNode');
var ElementOutput = require('famous/core/ElementOutput');
var StateModifier = require('famous/modifiers/StateModifier');
var Transform = require('famous/core/Transform');
var PropTypes = require('react/lib/ReactPropTypes');
var CSSPropertyOperations = require('react/lib/CSSPropertyOperations');

var getStyleUpdates = require('./getStyleUpdates');
var cloneStyle = require('./cloneStyle');
var applyPropsToModifer = require('./applyPropsToModifer');

var defaultState = {
  transform: Transform.identity,
  opacity: 1,
  origin: [0, 0],
  size: [0, 0],
  align: null
};

var RenderableMixin = {
  propTypes: {
    _owner: PropTypes.object,
    center: PropTypes.bool,
    opacity: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    transform: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.object
    ]),
    origin: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.object
    ]),
    size: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.bool),
      PropTypes.object
    ]),
    align: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.object
    ]),
  },

  getDefaultProps: function(){
    return {
      style: {}
    };
  },

  componentWillMount: function(){
    this.createFamous();
    this.componentWillReceiveProps(this.props);
    this.tick();
  },

  componentDidMount: function(){
    this.tick();
    // add our tick to the event loop
    Engine.on('prerender', this.tick);
  },

  componentWillUnmount: function(){
    // remove our tick from the event loop
    Engine.removeListener('prerender', this.tick);
  },

  componentWillReceiveProps: function(newProps){
    // some props sugar
    if (newProps.center) {
      if (newProps.center === 'vertical') {
        newProps.align = [0, 0.5];
        newProps.origin = [0, 0.5];
      } else if (newProps.center === 'horizontal') {
        newProps.align = [0.5, 0];
        newProps.origin = [0.5, 0];
      } else if (newProps.center === true) {
        newProps.origin = [0.5, 0.5];
        newProps.align = [0.5, 0.5];
      }
    }

    // modify children if we have them
    if (newProps.children) {
      newProps.children = this.attachToChildren(newProps.children);
    }

    // apply our props to the modifier
    applyPropsToModifer(newProps, this.famous.modifier);
  },

  attachToChildren: function(children) {
    if (Array.isArray(children)) {
      // multi child
      return children.map(this.attachToChildren);
    }
    // single child
    children.props._owner = this;
    return children;
  },

  createFamous: function() {
    this.famous = {};

    // create a fake element that props will go on
    this.famous.element = {
      style: {},
      lastStyle: null
    };

    // create a modifier
    this.famous.modifier = new StateModifier();

    // attach famous to this fake element
    this.famous.elementOutput = new ElementOutput(this.famous.element);

    // create our nodes
    this.famous.isRoot = !this.props._owner;
    this.famous.node = new RenderNode(this.famous.modifier);
    this.famous.node.add(this.famous.elementOutput);

    // register with parent famous RenderNode for spec
    if (!this.famous.isRoot) {
      //console.log(this.props._owner.constructor.displayName, '->', this.constructor.displayName);
      this.props._owner.famous.node.add(this.famous.node);
    }
  },

  tick: function(){
    // updates the spec of this node
    // and all child nodes
    if (this.famous.isRoot) {
      this.famous.node.commit(defaultState);
    }

    if (!this.isMounted()) {
      return;
    }

    // diff our faked element with the last run
    // so we only update when stuff changes
    var lastStyle = this.famous.element.lastStyle;
    var nextStyle = this.famous.element.style;

    var styleUpdates = lastStyle ? getStyleUpdates(lastStyle, nextStyle) : nextStyle;
    if (styleUpdates) {
      CSSPropertyOperations.setValueForStyles(this.getDOMNode(), styleUpdates);
      this.famous.element.lastStyle = cloneStyle(nextStyle);
    }
  }
};

module.exports = RenderableMixin;
