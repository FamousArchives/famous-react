'use strict';

var ReactDOMComponent = require('react/lib/ReactDOMComponent');
var createComponent = require('../../createComponent');

// This is a mixin for components with multiple children
// This is internal, you don't need to use this

// TODO: move famous prop parsing from surface to here

var BaseMixin = {
  getDOMNode: function() {
    var famousEl = this.getFamous();
    // unmounted
    if (!famousEl) {
      return;
    }

    // context
    if (famousEl.container) {
      return famousEl.container;
    }
    // surface
    return famousEl._element;
  },

  getFamous: function() {
    // context
    if (this._node) {
      return this;
    }
    // surface
    return this.node;
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
    child._mountImage = childNode;
    this.node.add(childNode);
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
    var mountedImages = this.mountChildren(
      children,
      transaction
    );
    // Each mount image corresponds to one of the flattened children
    var i = 0;
    for (var key in this._renderedChildren) {
      if (this._renderedChildren.hasOwnProperty(key)) {
        var child = this._renderedChildren[key];
        child._mountImage = mountedImages[i];
        this.node.add(mountedImages[i]);
        i++;
      }
    }
  }
};

module.exports = createComponent('Base', ReactDOMComponent, BaseMixin);