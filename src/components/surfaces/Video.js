'use strict';

var VideoSurface = require('famous/surfaces/VideoSurface');
var createComponent = require('../../createComponent');
var Renderable = require('../core/Renderable');

var VideoMixin = {
  createFamousNode: function() {
    return new VideoSurface();
  },
  formatProps: function(props, origProps) {
    props.content = origProps.src;
    return props;
  },
  setOptions: function(props) {
    this.getFamous().setOptions(props);
  }
};

module.exports = createComponent('Image', Renderable, VideoMixin);
