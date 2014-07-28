'use strict';

var omit = require('lodash.omit');
var ReactComponent = require('react/lib/ReactComponent');
var ReactDOMComponent = require('react/lib/ReactDOMComponent');
var ReactBrowserComponentMixin = require('react/lib/ReactBrowserComponentMixin');
var ReactEventEmitter = require('react/lib/ReactEventEmitter');
var ReactMount = require('react/lib/ReactMount');

var createComponent = require('../../createComponent');
var Surface = require('famous/core/Surface');

var registrationNameModules = ReactEventEmitter.registrationNameModules;

// This is a mixin for components with multiple children
// This is internal, you don't need to use this

var ELEMENT_NODE_TYPE = 1;
function putListener(id, registrationName, listener, transaction) {
  var container = ReactMount.findReactContainerForID(id);
  if (container) {
    var doc = container.nodeType === ELEMENT_NODE_TYPE ?
      container.ownerDocument :
      container;
    ReactEventEmitter.listenTo(registrationName, doc);
  }
  transaction.getPutListenerQueue().enqueuePutListener(
    id,
    registrationName,
    listener
  );
}

function addChain(chain, node){
  if (!node.props || !node.props.children) {
    return;
  }

  var children = node.props.children;
  if (children && !Array.isArray(children)) {
    children = [children];
  }
  children.forEach(function(child){
    console.log('adding', child, child.getFamous());
    var nextChain = chain.add(child.getFamous());
    addChain(nextChain, child);
  });
}

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

  receiveComponent: function(nextComponent, transaction) {
    if (nextComponent === this) {
      // Since props and context are immutable after the component is
      // mounted, we can do a cheap identity compare here to determine
      // if this is a superfluous reconcile.
      return;
    }

    ReactComponent.Mixin.receiveComponent.apply(this, arguments);

    var props = nextComponent.props;
    this.applyNodeProps(this.props, props, transaction);
    this.props = props;
  },

  applyNodeProps: function(oldProps, props, transaction) {
    var propKeys = Object.keys(props);
    if (propKeys.length === 0) {
      return;
    }
    var noChangeProps = propKeys.filter(function(k){
      return props[k] === oldProps[k];
    });

    props = omit(props, noChangeProps);
    propKeys = Object.keys(props);
    if (propKeys.length === 0) {
      return;
    }

    if (this.formatProps) {
      props = this.formatProps(props, oldProps);
    }

    // wire up event listeners
    // TODO: remove old ones from oldProps
    // TODO: move this to a different fn?
    // TODO: route context events through here? they dont have transaction, only surfaces
    if (transaction) {
      propKeys.filter(function(k){
        return !!registrationNameModules[k] && props[k] != null;
      })
      .forEach(function(k){
        putListener(this._rootNodeID, k, props[k], transaction);
      }, this);
    }

    // call custom component logic
    if (this.setOptions) {
      this.setOptions(props, transaction);
    }
  },

  /**
   * Moves a child component to the supplied index.
   *
   * @param {ReactComponent} child Component to move.
   * @param {number} toIndex Destination index of the element.
   * @protected
   */
  moveChild: function(child, toIndex) {
    // Famous doesn't let you move nodes around
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
    // react string
    if (typeof childNode === 'string') {
      childNode = new Surface({
        size: [true, true],
        content: childNode
      });
    }

    // childNode is a famous node now
    child._mountImage = childNode;
    var famousNode = this.getFamous();

    // modifier, copy their children to us
    if (childNode._modifier) {
      var chain = famousNode.add(childNode);
      addChain(chain, child);
    } else {
      // surface
      famousNode.add(childNode);
    }
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