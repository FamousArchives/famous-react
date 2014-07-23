'use strict';

var ReactComponent = require('react/lib/ReactComponent');
var DOMPropertyOperations = require('react/lib/DOMPropertyOperations');
var ReactDOMComponent = require('react/lib/ReactDOMComponent');
var ReactBrowserComponentMixin = require('react/lib/ReactBrowserComponentMixin');
var ReactEventEmitter = require('react/lib/ReactEventEmitter');
var Engine = require('famous/core/Engine');

var createComponent = require('../../createComponent');
var BaseMixin = require('./Base');

// Root node for an application
// Equivalent of engine.createContext()

var ContextMixin = {
  mountComponent: function(rootID, transaction, mountDepth) {
    this._tagOpen = '<div';
    this._tagClose = '</div>';
    this.tagName = 'DIV';

    ReactComponent.Mixin.mountComponent.call(
      this,
      rootID,
      transaction,
      mountDepth
    );
    transaction.getReactMountReady().enqueue(this, this.componentDidMount);

    return (
        this._createOpenTagMarkupAndPutListeners(transaction) +
        this._tagClose
      );
  },

  componentDidMount: function() {
    this.node = Engine.createContext(this.getDOMNode());

    var transaction = ReactComponent.ReactReconcileTransaction.getPooled();
    transaction.perform(
      this.mountAndInjectChildren,
      this,
      this.props.children,
      transaction
    );
    ReactComponent.ReactReconcileTransaction.release(transaction);
  }
};

module.exports = createComponent('Context', BaseMixin, ContextMixin);