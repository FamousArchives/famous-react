'use strict';

var omit = require('lodash.omit');
var createComponent = require('../../createComponent');
var Renderable = require('./Renderable');

var reserved = [
  // react props
  'height', 'width', 'className', 'style', 'children',
  // overriden by react props
  'content', 'size', 'classes', 'properties',
  // standard react props
  'ref', 'key'
];

var SurfaceMixin = {
  setOptions: function(props) {
    var famousNode = this.getFamous();
    var hasSize = (typeof props.width !== 'undefined' || typeof props.height !== 'undefined');
    if (famousNode.setSize && hasSize) {
      famousNode.setSize([props.width, props.height]);
    }

    if (famousNode.setClasses && typeof props.className === 'string') {
      famousNode.setClasses(props.className.split(' '));
    }

    if (famousNode.setProperties && typeof props.style === 'object') {
      famousNode.setProperties(props.style);
    }

    if (famousNode.setContent && props.children) {
      famousNode.setContent(props.children);
    }

    if (famousNode.setOptions) {
      var filteredProps = omit(props, reserved);
      famousNode.setOptions(filteredProps);
    }
  }
};

var Surface = createComponent('Surface', Renderable, SurfaceMixin);
Surface.Mixin = SurfaceMixin;

module.exports = Surface;