'use strict';

var Surface = require('famous/core/Surface');
var createComponent = require('../../createComponent');
var Renderable = require('../core/Renderable');

var ReactMixin = {
  createFamousNode: function() {
    return new Surface({
      content: this.props.children
    });
  }
};

module.exports = createComponent('React', Renderable, ReactMixin);
