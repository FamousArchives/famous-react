'use strict';

var ImageSurface = require('famous/Surfaces/ImageSurface');
var createComponent = require('../../createComponent');
var Renderable = require('../core/Renderable');

var ImageMixin = {
  createFamousNode: function() {
    return new ImageSurface();
  },
  formatProps: function(props, oldProps) {
    if (typeof props.src === 'string') {
      props.children = props.src;
      delete props.src;
    }
    return props;
  }
};

module.exports = createComponent('Image', Renderable, ImageMixin);
