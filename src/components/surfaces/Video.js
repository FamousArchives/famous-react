'use strict';

var VideoSurface = require('famous/Surfaces/VideoSurface');
var createComponent = require('../../createComponent');
var Renderable = require('../core/Renderable');

var VideoMixin = {
  createFamousNode: function() {
    return new VideoSurface();
  },
  formatProps: function(props, oldProps) {
    if (typeof props.autoPlay === 'boolean') {
      props.autoplay = props.autoPlay;
      delete props.autoPlay;
    }
    if (typeof props.src === 'string') {
      props.children = props.src;
      delete props.src;
    }
    return props;
  }
};

module.exports = createComponent('Image', Renderable, VideoMixin);
