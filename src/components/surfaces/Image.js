'use strict';

var createClass = require('react/lib/ReactCompositeComponent').createClass;
var DOM = require('react/lib/ReactDOM');
var Renderable = require('../core/Renderable');

var ImageMixin = {
  type: 'Image',
  mixins: [Renderable],
  render: function(){
    return this.transferPropsTo(DOM.img());
  }
};

module.exports = createClass(ImageMixin);
