'use strict';

var omit = require('lodash.omit');
var ReactComponent = require('react/lib/ReactComponent');
var ReactDOMComponent = require('react/lib/ReactDOMComponent');
var createComponent = require('../../createComponent');
var Base = require('./Base');

// Used for comparison during mounting to avoid a lot of null checks
var BLANK_PROPS = {};

var reserved = [
  // react props
  'height', 'width', 'className', 'style', 'children',
  // overriden by react props
  'content', 'size', 'classes', 'properties',
  // standard react props
  'ref', 'key'
];

var RenderableMixin = {
  construct: function(props) {
    ReactDOMComponent.prototype.construct.apply(this, arguments);
    this.node = this.createFamousNode();
  },

  mountComponent: function(rootID, transaction, mountDepth) {
    Base.Mixin.mountComponent.apply(this, arguments);

    // write id so react events work
    this.node.on('deploy', function(){
      this._currentTarget.setAttribute('data-reactid', rootID);
    });

    this.applyNodeProps(BLANK_PROPS, this.props, transaction);
    return this.getFamous();
  },
  setOptions: function(props, transaction) {
    var famousNode = this.getFamous();
    var hasSize = (typeof props.width !== 'undefined' || typeof props.height !== 'undefined');
    if (famousNode.setSize && hasSize) {
      famousNode.setSize([props.width, props.height]);
    }

    if (famousNode.setClasses && typeof props.className === 'string') {
      famousNode.setClasses(props.className.split(' '));
    }

    if (famousNode.setProperties && typeof props.style === 'object') {
      famousNode.setProperties(props.style);
    }

    if (famousNode.setContent && props.children) {
      famousNode.setContent(props.children);
    }

    if (famousNode.setOptions) {
      var filteredProps = omit(props, reserved);
      famousNode.setOptions(filteredProps);
    }
  }
};

var Renderable = createComponent('Renderable', Base, RenderableMixin);
Renderable.Mixin = RenderableMixin;

module.exports = Renderable;
