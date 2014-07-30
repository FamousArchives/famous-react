'use strict';

var createClass = require('react/lib/ReactCompositeComponent').createClass;
var DOM = require('react/lib/ReactDOM');
var Renderable = require('../core/Renderable');

var VideoMixin = {
  type: 'Video',
  mixins: [Renderable],
  render: function(){
    return this.transferPropsTo(DOM.video());
  }
};

module.exports = createClass(VideoMixin);
