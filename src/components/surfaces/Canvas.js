'use strict';

var CanvasSurface = require('famous/surfaces/CanvasSurface');
var createComponent = require('../../createComponent');
var Renderable = require('../core/Renderable');

var CanvasMixin = {
  createFamousNode: function() {
    return new CanvasSurface();
  },
  formatProps: function(props) {
    delete props.content;
    if (!props.canvasSize && props.size) {
      props.canvasSize = props.size;
    }
    return props;
  },
  setOptions: function(props) {
    if (props.canvasSize || props.size) {
      this.getFamous().setSize(props.size, props.canvasSize);
    }
    this.getFamous().setOptions(props);
  }
};

module.exports = createComponent('Canvas', Renderable, CanvasMixin);
