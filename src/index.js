'use strict';

var hook = require('./hook');
var ImageSurface = require('./components/surfaces/Image');
var VideoSurface = require('./components/surfaces/Video');
var CanvasSurface = require('./components/surfaces/Canvas');

// TODO: require-dir this
module.exports = {
  surfaces: {
    Image: ImageSurface,
    Video: VideoSurface,
    Canvas: CanvasSurface
  }
};