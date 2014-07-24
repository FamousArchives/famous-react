'use strict';

var omit = require('lodash.omit');
var ReactComponent = require('react/lib/ReactComponent');
var ReactEventEmitter = require('react/lib/ReactEventEmitter');
var ReactMount = require('react/lib/ReactMount');

var createComponent = require('../../createComponent');
var Base = require('./Base');
var registrationNameModules = ReactEventEmitter.registrationNameModules;

// Used for comparison during mounting to avoid a lot of null checks
var BLANK_PROPS = {};

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

var RenderableMixin = {
  mountComponent: function(rootID, transaction, mountDepth) {
    ReactComponent.Mixin.mountComponent.apply(this, arguments);
    this.node = this.createFamousNode();
    this.node.on('deploy', function(){
      // write id so react events work
      this._currentTarget.setAttribute('data-reactid', rootID);
    });
    this.applyNodeProps(BLANK_PROPS, this.props, transaction);
    return this.node;
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

    console.log('applying props', this, props);

    // wire up event listeners
    // TODO: remove old ones from oldProps
    // TODO: move this to a different fn?
    propKeys.filter(function(k){
      return !!registrationNameModules[k] && props[k] != null;
    })
    .forEach(function(k){
      putListener(this._rootNodeID, k, props[k], transaction);
    }, this);

    if (this.setOptions) {
      this.setOptions(props);
    }
  }
};

var Renderable = createComponent('Renderable', Base, RenderableMixin);
Renderable.Mixin = RenderableMixin;

module.exports = Renderable;
