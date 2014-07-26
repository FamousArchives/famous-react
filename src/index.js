'use strict';

var hook = require('./hook');
var Context = require('./components/core/Context');
var ImageSurface = require('./components/surfaces/Image');
var VideoSurface = require('./components/surfaces/Video');
var CanvasSurface = require('./components/surfaces/Canvas');
var ContainerSurface = require('./components/surfaces/Container');
var StateModifier = require('./components/modifiers/State');

module.exports = {
  Context: Context,
  surfaces: {
    Image: ImageSurface,
    Video: VideoSurface,
    Canvas: CanvasSurface,
    Container: ContainerSurface,
  },
  modifiers: {
    State: StateModifier
  }
};