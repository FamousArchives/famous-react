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
var propSugar = require('./propSugar');
var TransitionParent = require('./TransitionParent');

var defaultState = {
  transform: Transform.identity,
  opacity: 1,
  origin: [0, 0],
  size: [0, 0],
  align: null
};

var RenderableMixin = {
  mixins: [TransitionParent],

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

  getDefaultProps: function() {
    return {
      style: {
        backfaceVisibility: 'hidden',
        transformStyle: 'flat'
      }
    };
  },

  componentWillMount: function() {
    this.createFamous();
    this.componentWillReceiveProps(this.props);
    this.tick();
  },

  componentDidMount: function() {
    this.tick();
    // add our tick to the event loop
    Engine.on('prerender', this.tick);
  },

  componentWillEnter: function(cb) {
    cb();
  },

  componentDidEnter: function() {

  },

  componentWillLeave: function(cb) {
    cb();
  },

  componentDidLeave: function() {

  },

  componentWillUnmount: function() {
    // remove our tick from the event loop
    Engine.removeListener('prerender', this.tick);
  },

  componentWillReceiveProps: function(nextProps) {
    // some props sugar
    nextProps = propSugar(nextProps);

    // apply our props to the modifier
    applyPropsToModifer(nextProps, this.famous.modifier);
  },

  createFamous: function() {
    // TODO: break this out
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

  tick: function() {
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