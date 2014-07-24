'use strict';

var CanvasSurface = require('famous/surfaces/CanvasSurface');
var createComponent = require('../../createComponent');
var Surface = require('../core/Surface');

var CanvasMixin = {
  createFamousNode: function() {
    return new CanvasSurface();
  },

  setOptions: function(props) {
    Surface.Mixin.setOptions.apply(this, arguments);
    if (typeof props.width !== 'undefined' || typeof props.height !== 'undefined') {
      this.getFamous().setSize([props.width, props.height], [props.width, props.height]);
    }
  }
};

module.exports = createComponent('Canvas', Surface, CanvasMixin);
