'use strict';

var ReactComponent = require('react/lib/ReactComponent');

var createComponent = require('../../createComponent');
var Base = require('./Base');

// Used for comparison during mounting to avoid a lot of null checks
var BLANK_PROPS = {};

var RenderableMixin = {
  mountComponent: function(rootID, transaction, mountDepth) {
    Base.Mixin.mountComponent.apply(this, arguments);

    this.node = this.createFamousNode();
    this.node.on('deploy', function(){
      // write id so react events work
      this._currentTarget.setAttribute('data-reactid', rootID);
    });
    this.applyNodeProps(BLANK_PROPS, this.props, transaction);
    return this.getFamous();
  }
};

var Renderable = createComponent('Renderable', Base, RenderableMixin);
Renderable.Mixin = RenderableMixin;

module.exports = Renderable;
