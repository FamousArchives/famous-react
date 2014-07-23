'use strict';

var ReactComponent = require('react/lib/ReactComponent');
var ReactEventEmitter = require('react/lib/ReactEventEmitter');
var ReactMount = require('react/lib/ReactMount');

var createComponent = require('../../createComponent');
var BaseMixin = require('./Base');
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

var SurfaceMixin = {
  mountComponent: function(rootID, transaction, mountDepth) {
    ReactComponent.Mixin.mountComponent.apply(this, arguments);
    // TODO: add this._rootNodeID to node
    this.node = this.createFamousNode();
    this.node.on('deploy', function(){
      // write id
      this._currentTarget.setAttribute('data-reactid', rootID);
    });
    this.applyNodeProps(BLANK_PROPS, this.props, transaction);
    return this.node;
  },

  receiveComponent: function(nextComponent, transaction) {
    var props = nextComponent.props;
    this.applyNodeProps(this.props, props, transaction);
    this.props = props;
  },

  applyNodeProps: function(oldProps, props, transaction) {
    var formattedProps = {};
    if (typeof props.height !== 'undefined' || typeof props.width !== 'undefined') {
      formattedProps.size = [props.height, props.width];
    }
    if (typeof props.className === 'string') {
      formattedProps.classes = props.className.split(' ');
    }

    if (typeof props.style === 'object') {
      formattedProps.properties = props.style;
    }

    if (props.children) {
      formattedProps.content = props.children;
    }
    
    if (this.formatProps) {
      formattedProps = this.formatProps(formattedProps, props, oldProps);
    }

    // wire up event listeners
    // TODO: remove old ones from oldProps
    // TODO: move this to a different fn?
    for (var propKey in props) {
      if (!props.hasOwnProperty(propKey)) {
        continue;
      }
      var propValue = props[propKey];
      if (propValue == null) {
        continue;
      }
      if (registrationNameModules[propKey]) {
        putListener(this._rootNodeID, propKey, propValue, transaction);
        //this.getFamous().on(propKey.split('on')[1].toLowerCase(), propValue);
      }
    }

    this.getFamous().setOptions(formattedProps);
  }
};

module.exports = createComponent('Surface', BaseMixin, SurfaceMixin);
