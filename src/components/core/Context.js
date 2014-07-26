'use strict';

var ReactComponent = require('react/lib/ReactComponent');
var DOMPropertyOperations = require('react/lib/DOMPropertyOperations');
var ReactDOMComponent = require('react/lib/ReactDOMComponent');
var ReactBrowserComponentMixin = require('react/lib/ReactBrowserComponentMixin');
var ReactEventEmitter = require('react/lib/ReactEventEmitter');
var Engine = require('famous/core/Engine');

var createComponent = require('../../createComponent');
var Base = require('./Base');

// Root node for an application
// Equivalent of engine.createContext()
var BLANK_PROPS = {};

var ContextMixin = {
  // TODO: get react to render html nodes instead
  // of strings so this can use Renderable under the hood
  mountComponent: function(rootID, transaction, mountDepth) {
    this._tagOpen = '<div';
    this._tagClose = '</div>';
    this.tagName = 'DIV';

    Base.Mixin.mountComponent.apply(this, arguments);

    return (
      this._createOpenTagMarkupAndPutListeners(transaction) +
      this._tagClose
    );
  },

  componentDidMount: function() {
    this.node = Engine.createContext(this.getDOMNode());
    Base.Mixin.componentDidMount.apply(this, arguments);
    this.applyNodeProps(BLANK_PROPS, this.props);
  },

  setOptions: function(props) {
    var famousNode = this.getFamous();
    var hasSize = (typeof props.width !== 'undefined' || typeof props.height !== 'undefined');
    if (famousNode.setSize && hasSize) {
      famousNode.setSize([props.width, props.height]);
    }
  }
};

var Context = createComponent('Context', Base, ContextMixin);
Context.Mixin = ContextMixin;

module.exports = Context;