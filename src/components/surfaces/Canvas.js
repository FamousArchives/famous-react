'use strict';

var createClass = require('react/lib/ReactCompositeComponent').createClass;
var DOM = require('react/lib/ReactDOM');
var Renderable = require('../core/Renderable');

var CanvasMixin = {
  type: 'Canvas',
  mixins: [Renderable],
  render: function(){
    return this.transferPropsTo(DOM.canvas());
  }
};

module.exports = createClass(CanvasMixin);
