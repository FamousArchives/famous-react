'use strict';

var CanvasSurface = require('famous/surfaces/CanvasSurface');
var createComponent = require('../../createComponent');
var Surface = require('../core/Surface');

var CanvasMixin = {
  createFamousNode: function() {
    return new CanvasSurface();
  },
  formatProps: function(props) {
    delete props.content;
    if (!props.canvasSize && props.size) {
      props.canvasSize = props.size;
    }
    this.getFamous().setSize(props.size, props.canvasSize);
    return props;
  }
};

module.exports = createComponent('Canvas', Surface, CanvasMixin);
