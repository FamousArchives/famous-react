'use strict';

var CanvasSurface = require('famous/Surfaces/CanvasSurface');
var createComponent = require('../../createComponent');
var Renderable = require('../core/Renderable');

var CanvasMixin = {
  createFamousNode: function() {
    return new CanvasSurface();
  },

  setOptions: function(props) {
    Renderable.Mixin.setOptions.apply(this, arguments);
    if (typeof props.width !== 'undefined' || typeof props.height !== 'undefined') {
      this.getFamous().setSize([props.width, props.height], [props.width, props.height]);
    }
  }
};

module.exports = createComponent('Canvas', Renderable, CanvasMixin);
