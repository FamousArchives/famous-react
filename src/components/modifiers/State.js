'use strict';

var StateModifier = require('famous/modifiers/StateModifier');
var createComponent = require('../../createComponent');
var Base = require('../core/Base');


var StateModifierMixin = {
  mountComponent: function(rootID, transaction, mountDepth) {
    Base.Mixin.mountComponent.apply(this, arguments);

    this.node = this.createFamousNode();
    this.applyNodeProps({}, this.props, transaction);
    return this.getFamous();
  },

  createFamousNode: function() {
    return new StateModifier();
  },

  createChild: function(){},

  setOptions: function(props) {
    var famousNode = this.getFamous();

    // TODO: transforms should be a component
    // with start and end events
    if (typeof props.transform !== 'undefined') {
      famousNode.setTransform(props.transform);
    }

    if (typeof props.opacity !== 'undefined') {
      famousNode.setOpacity(props.opacity);
    }

    if (typeof props.origin !== 'undefined') {
      famousNode.setOrigin(props.origin);
    }

    if (typeof props.align !== 'undefined') {
      famousNode.setAlign(props.align);
    }

    var hasSize = (typeof props.width !== 'undefined' || typeof props.height !== 'undefined');
    if (famousNode.setSize && hasSize) {
      famousNode.setSize([props.width, props.height]);
    }
  }
};

module.exports = createComponent('StateModifier', Base, StateModifierMixin);
