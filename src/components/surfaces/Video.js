'use strict';

var VideoSurface = require('famous/surfaces/VideoSurface');
var createComponent = require('../../createComponent');
var Surface = require('../core/Surface');

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

module.exports = createComponent('Image', Surface, VideoMixin);
