'use strict';

var hook = require('./hook');
var Context = require('./components/core/Context');
var Image = require('./components/surfaces/Image');
var Video = require('./components/surfaces/Video');
var Canvas = require('./components/surfaces/Canvas');
var Container = require('./components/surfaces/Container');

module.exports = {
  Context: Context,
  Image: Image,
  Video: Video,
  Canvas: Canvas,
  Container: Container
};