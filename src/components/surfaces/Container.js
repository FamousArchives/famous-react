'use strict';

var ContainerSurface = require('famous/surfaces/ContainerSurface');
var createComponent = require('../../createComponent');
var Surface = require('../core/Surface');

var ContainerMixin = {
  createFamousNode: function() {
    return new ContainerSurface();
  }
};

module.exports = createComponent('Container', Surface, ContainerMixin);
