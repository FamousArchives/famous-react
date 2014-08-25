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
    displayName: 'famous-'+type,
    mixins: [Renderable],
    getDefaultProps: function(){
      return {
        component: DOM[type]
      };
    }
  });
  return ctor;
}

// to override react dom with our better dom
// uncomment this and export DOM
// DOM.injection.injectComponentClasses(output);

module.exports = output;
