'use strict';

var createClass = require('react/lib/ReactCompositeComponent').createClass;
var DOM = require('react/lib/ReactDOM');
var omit = require('lodash.omit');
var Renderable = require('./Renderable');

var famousProps = [
  'opacity',
  'transform',
  'origin',
  'align',
  'ref',
  'key',
  'height',
  'width'
];

var output = {};
Object.keys(DOM).forEach(function(type){
  output[type] = createWrapper(type);
});

function createWrapper(type){
  var domFn = DOM[type];

  var ctor = createClass({
    displayName: 'famous-'+type,
    mixins: [Renderable],

    render: function(){
      var filteredProps = filter(this.props);
      var el = domFn(filteredProps, this.props.children);
      return el;
    }
  });
  return ctor;
}

function filter(props) {
  return omit(props, famousProps);
}

// to override react dom with our better dom
// uncomment this and export DOM
// DOM.injection.injectComponentClasses(output);

module.exports = output;
