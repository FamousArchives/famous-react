'use strict';

var Engine = require('famous/core/Engine');
var RenderNode = require('famous/core/RenderNode');
var ElementOutput = require('famous/core/ElementOutput');
var StateModifier = require('famous/modifiers/StateModifier');
var PropTypes = require('react/lib/ReactPropTypes');
var CSSPropertyOperations = require('react/lib/CSSPropertyOperations');
var cloneWithProps = require('react/lib/cloneWithProps');
var merge = require('react/lib/merge');

var getStyleUpdates = require('./getStyleUpdates');
var applyPropsToModifer = require('./applyPropsToModifer');

var perfStyles = {
  webkitBackfaceVisibility: 'hidden',
  backfaceVisibility: 'hidden',
  webkitTransformStyle: 'flat',
  transformStyle: 'preserve-3d'
};

var RenderableMixin = {
  propTypes: {
    _owner: PropTypes.object,
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
    // add our tick to the event loop
    Engine.on('prerender', this._tick);
    this._createFamous();
    this.componentWillReceiveProps(this.props);
    this._tick();
  },

  componentWillUnmount: function(){
    // remove our tick from the event loop
    Engine.removeListener('prerender', this._tick);

    // halt the animation on our modifier
    this._famous.modifier.halt();
  },

  componentWillReceiveProps: function(newProps){
    applyPropsToModifer(newProps, this._famous.modifier);

    newProps.style = merge(newProps.style, perfStyles);

    // modify children if we have them
    if (!newProps.children) {
      return;
    }
    if (Array.isArray(newProps.children)) {
      // multi child
      newProps.children = newProps.children.map(this._attachTo);
    } else {
      // single child
      newProps.children = this._attachTo(newProps.children);
    }
  },

  _attachTo: function(child) {
    child.props._owner = this;
    return child;
  },

  _createFamous: function() {
    this._famous = {};

    // create a fake element that props will go on
    this._famous.element = {
      style: {},
      previousStyle: null
    };

    // create a modifier
    this._famous.modifier = new StateModifier();

    // attach famous to this fake element
    this._famous.elementOutput = new ElementOutput();
    this._famous.elementOutput._element = this._famous.element;

    // create our nodes
    this._famous.nodes = {};

    this._famous.isRoot = !this.props._owner;

    // TODO: split align into its own modifier
    this._famous.nodes.root = new RenderNode(this._famous.modifier);
    this._famous.nodes.el = this._famous.nodes.root.add(this._famous.elementOutput);

    // register with parent famous RenderNode for spec
    if (!this._famous.isRoot) {
      this.props._owner._famous.nodes.root.add(this._famous.nodes.root);
    } else {
      console.log(this._famous.nodes.root);
    }
  },

  // updates the spec of this node
  // and all child nodes
  _renderSpec: function(){
    var newState = this._famous.nodes.root.render();
    this._famous.nodes.el.commit(newState);
  },

  _tick: function(){
    // no need to touch the dom while unmounted
    if (!this.isMounted()) {
      return;
    }

    // calculate the new styles
    this._renderSpec();

    // diff our faked element with the last run
    // so we only update when stuff changes
    var lastStyle = this._famous.element.previousStyle;
    var nextStyle = this._famous.element.style;

    var styleUpdates = lastStyle ? getStyleUpdates(lastStyle, nextStyle) : nextStyle;
    if (styleUpdates) {
      CSSPropertyOperations.setValueForStyles(this.getDOMNode(), styleUpdates);
      this._famous.element.previousStyle = merge(nextStyle);
    }
  }
};

module.exports = RenderableMixin;
