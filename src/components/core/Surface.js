'use strict';

var ReactComponent = require('react/lib/ReactComponent');
var ReactEventEmitter = require('react/lib/ReactEventEmitter');

var createComponent = require('../../createComponent');
var BaseMixin = require('./Base');
var registrationNameModules = ReactEventEmitter.registrationNameModules;

// Used for comparison during mounting to avoid a lot of null checks
var BLANK_PROPS = {};

var SurfaceMixin = {
  mountComponent: function() {
    ReactComponent.Mixin.mountComponent.apply(this, arguments);
    this.node = this.createFamousNode();
    this.applyNodeProps(BLANK_PROPS, this.props);
    return this.node;
  },

  receiveComponent: function(nextComponent, transaction) {
    var props = nextComponent.props;
    this.applyNodeProps(this.props, props);
    this.props = props;
  },

  applyNodeProps: function(oldProps, props) {
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
        this.getFamous().on(propKey.split('on')[1].toLowerCase(), propValue);
      }
    }

    this.getFamous().setOptions(formattedProps);
  }
};

module.exports = createComponent('Surface', BaseMixin, SurfaceMixin);
