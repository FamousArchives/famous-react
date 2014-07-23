'use strict';

var hook = require('./hook');
var Context = require('./components/core/Context');
var Image = require('./components/surfaces/Image');
var Canvas = require('./components/surfaces/Canvas');

module.exports = {
  Context: Context,
  Image: Image,
  Canvas: Canvas
};