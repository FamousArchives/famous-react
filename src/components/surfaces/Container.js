'use strict';

var ContainerSurface = require('famous/Surfaces/ContainerSurface');
var createComponent = require('../../createComponent');
var Renderable = require('../core/Renderable');

var ContainerMixin = {
  createFamousNode: function() {
    return new ContainerSurface();
  }
};

module.exports = createComponent('Container', Renderable, ContainerMixin);
