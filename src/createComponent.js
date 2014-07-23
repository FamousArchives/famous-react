'use strict';

var mixInto = require('react/lib/mixInto');

module.exports = function (name) {
  var Component = function() {
    /*
    for (var i = 1, l = args.length; i < l; i++) {
      if (typeof args[i] === 'function') {
        args[i].call(this, arguments);
      }
    }
    */
  };
  Component.displayName = name;

  // mix in all arguments after 1
  for (var i = 1, l = arguments.length; i < l; i++) {
    // a component
    if (arguments[i].type) {
      mixInto(Component, arguments[i].type.prototype);
    // a class
    } else if(arguments[i].prototype) {
      mixInto(Component, arguments[i].prototype);
    // an object
    } else {
      mixInto(Component, arguments[i]);
    }
  }

  // this allows people to 
  var ConvenienceConstructor = function() {
    // TODO: apply arguments to the constructor
    var inst = new Component();

    // react classes have a .construct
    if (inst.construct) {
      inst.construct.apply(inst, arguments);
    }
    return inst;
  };

  // some meta info
  ConvenienceConstructor.type = Component;
  Component.prototype.type = Component;
  return ConvenienceConstructor;
};
