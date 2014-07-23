'use strict';

var Surface = require('famous/core/Surface');
var cloneWithProps = require('react/lib/cloneWithProps');
var renderComponent = require('react/lib/ReactMount').renderComponent;

function ReactSurface() {
  Surface.apply(this, arguments);
}
ReactSurface.prototype = Object.create(Surface.prototype);
ReactSurface.prototype.constructor = ReactSurface;

ReactSurface.prototype.deploy = function deploy (target) {
  var content = cloneWithProps(this.getContent(), {_surface: this});
  renderComponent(content, target);
};

module.exports = ReactSurface;