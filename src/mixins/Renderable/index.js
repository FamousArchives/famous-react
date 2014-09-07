'use strict';

var Engine = require('famous/core/Engine');
var PropTypes = require('react/lib/ReactPropTypes');
var CSSPropertyOperations = require('react/lib/CSSPropertyOperations');

var getStyleUpdates = require('../../util/getStyleUpdates');
var cloneStyle = require('../../util/cloneStyle');
var createFamous = require('../../util/createFamous');
var applyPropsToModifer = require('../../util/applyPropsToModifer');
var propSugar = require('./propSugar');
var defaultState = require('./defaultState');
var AsyncParent = require('../AsyncParent');

// TODO: vendor prefixing
// TODO: only apply if there is children?
var initialStyle = {
  backfaceVisibility: 'hidden',
  transformStyle: 'flat'
};

var RenderableMixin = {
  mixins: [AsyncParent],

  propTypes: {
    center: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,

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
    align: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.object
    ]),
  },

  getDefaultProps: function() {
    return {
      style: initialStyle
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
    // TODO: run unmounted -> mounted sequence
    cb();
  },

  componentDidEnter: function() {

  },

  componentWillLeave: function(cb) {
    // TODO: run mounted -> unmounted sequence
    cb();
  },

  componentDidLeave: function() {

  },

  componentWillUnmount: function() {
    // remove our tick from the event loop
    Engine.removeListener('prerender', this.tick);
  },

  componentWillReceiveProps: function(nextProps) {
    // TODO: switch this all out with a sequence

    // some props sugar
    nextProps = propSugar(nextProps);

    // apply our props to the modifier
    applyPropsToModifer(nextProps, this.famous.modifier);
  },

  createFamous: function() {
    this.famous = createFamous();
    this.famous.isRoot = !this.props._owner;

    // register with parent famous RenderNode for spec
    if (!this.famous.isRoot) {
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

    var styleUpdates = getStyleUpdates(lastStyle, nextStyle);
    if (styleUpdates) {
      CSSPropertyOperations.setValueForStyles(this.getDOMNode(), styleUpdates);
      this.famous.element.lastStyle = cloneStyle(nextStyle);
    }
  }
};

module.exports = RenderableMixin;