'use strict';

var createClass = require('react/lib/ReactCompositeComponent').createClass;
var DOM = require('react/lib/ReactDOM');
var Renderable = require('./mixins/Renderable');

var output = {};
Object.keys(DOM).forEach(function(type){
  output[type] = createWrapper(type);
});

function createWrapper(type){
  return createClass({
    displayName: 'famous-'+type,
    mixins: [Renderable],
    getDefaultProps: function(){
      return {
        component: DOM[type]
      };
    }
  });
}

// to override react dom with our dom
// uncomment this and export DOM
// DOM.injection.injectComponentClasses(output);

module.exports = output;
