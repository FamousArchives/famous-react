'use strict';

var RenderNode = require('famous/core/RenderNode');
var ElementOutput = require('famous/core/ElementOutput');
var StateModifier = require('famous/modifiers/StateModifier');

function createFamous(){
  var el = {
    style: {},
    lastStyle: null
  };
  var mod = new StateModifier();
  var elementOutput = new ElementOutput(el);
  var node = new RenderNode(mod);
  node.add(elementOutput);

  return {
    element: el,
    modifier: mod,
    node: node
  };
}

module.exports = createFamous;