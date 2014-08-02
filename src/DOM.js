'use strict';

var createClass = require('react/lib/ReactCompositeComponent').createClass;
var DOM = require('react/lib/ReactDOM');
var Renderable = require('./Renderable');

var output = {};
Object.keys(DOM).forEach(function(type){
  output[type] = createWrapper(type);
});

function createWrapper(type){
  var ctor = createClass({
    displayName: type,
    mixins: [Renderable],
    render: function(){
      var el = DOM[type](this.props, this.props.children);
      return el;
    }
  });

  return ctor;
}

module.exports = output;
