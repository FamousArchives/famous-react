'use strict';

var ReactComponent = require('react/lib/ReactComponent');
var ReactDOMComponent = require('react/lib/ReactDOMComponent');
var ReactBrowserComponentMixin = require('react/lib/ReactBrowserComponentMixin');
var createComponent = require('../../createComponent');
var Surface = require('famous/core/Surface');

// This is a mixin for components with multiple children
// This is internal, you don't need to use this

// TODO: move famous prop parsing from surface to here

var BaseMixin = {
  getDOMNode: function() {
    var famousEl = this.getFamous();

    // unmounted or root el
    if (!famousEl) {
      return ReactBrowserComponentMixin.getDOMNode.call(this, arguments);
    }

    // context
    if (famousEl.container) {
      return famousEl.container;
    }
    // surface
    return famousEl._element;
  },

  getFamous: function() {
    return this.node;
  },

  mountComponent: function(rootID, transaction, mountDepth) {
    ReactComponent.Mixin.mountComponent.apply(this, arguments);
    transaction.getReactMountReady().enqueue(this, this.componentDidMount);
  },

  componentDidMount: function() {
    if (!this.props.children) {
      return;
    }
    var transaction = ReactComponent.ReactReconcileTransaction.getPooled();
    transaction.perform(
      this.mountAndInjectChildren,
      this,
      this.props.children,
      transaction
    );
    ReactComponent.ReactReconcileTransaction.release(transaction);
  },

  /**
   * Moves a child component to the supplied index.
   *
   * @param {ReactComponent} child Component to move.
   * @param {number} toIndex Destination index of the element.
   * @protected
   */
  moveChild: function(child, toIndex) {
    // Famous doesn't let you move shit around.
    return;
  },

  /**
   * Creates a child component.
   *
   * @param {ReactComponent} child Component to create.
   * @param {object} childNode ART node to insert.
   * @protected
   */
  createChild: function(child, childNode) {
    // react
    if (typeof childNode === 'string') {
      childNode = new Surface({content: childNode});
    }

    child._mountImage = childNode;
    this.getFamous().add(childNode);
  },

  /**
   * Removes a child component.
   *
   * @param {ReactComponent} child Child to remove.
   * @protected
   */
  removeChild: function(child) {
    child._mountImage.eject();
    child._mountImage = null;
  },

  /**
   * Override to bypass batch updating because it is not necessary.
   *
   * @param {?object} nextChildren.
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @override {ReactMultiChild.Mixin.updateChildren}
   */
  updateChildren: function(nextChildren, transaction) {
    this._mostRecentlyPlacedChild = null;
    this._updateChildren(nextChildren, transaction);
  },

  // Shorthands
  mountAndInjectChildren: function(children, transaction) {
    var mountedImages = this.mountChildren(children, transaction);
    // Each mount image corresponds to one of the flattened children
    Object.keys(this._renderedChildren).forEach(function(k, idx){
      this.createChild(this._renderedChildren[k], mountedImages[idx]);
    }, this);
  }
};

var Base = createComponent('Base', ReactDOMComponent, BaseMixin);
Base.Mixin = BaseMixin;

module.exports = Base;