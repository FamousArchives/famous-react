'use strict';

var ImageSurface = require('famous/surfaces/ImageSurface');
var createComponent = require('../../createComponent');
var Surface = require('../core/Surface');

var ImageMixin = {
  createFamousNode: function() {
    return new ImageSurface();
  },
  formatProps: function(props, origProps) {
    props.content = origProps.src;
    return props;
  }
};

module.exports = createComponent('Image', Surface, ImageMixin);
