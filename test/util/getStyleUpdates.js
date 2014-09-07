/*global describe, it*/
'use strict';

var should = require('chai').should();
var clone = require('lodash.clone');
var getStyleUpdates = require('../../src/util/getStyleUpdates');

var style = {
  zIndex: 1,
  height: 1,
  width: 1,
  opacity: 1,
  transform: 1,
  webkitTransform: 1,
  mozTransform: 1,
  transformOrigin: 1,
  webkitTransformOrigin: 1,
  mozTransformOrigin: 1,
  perspective: 1,
  webkitPerspective: 1,
  mozPerspective: 1
};

describe('getStyleUpdates', function(){
  it('should return undefined on no changes', function(done){
    var oldStyle = clone(style);
    var newStyle = clone(style);
    var diff = getStyleUpdates(oldStyle, newStyle);
    should.not.exist(diff);
    done();
  });
  it('should return same object on null last', function(done){
    var newStyle = clone(style);
    var diff = getStyleUpdates(null, newStyle);
    diff.should.equal(newStyle);
    done();
  });
  it('should return changes object on null last', function(done){
    var oldStyle = clone(style);
    var newStyle = clone(style);
    newStyle.opacity = 2;

    var diff = getStyleUpdates(oldStyle, newStyle);
    diff.should.eql({
      opacity: 2
    });
    done();
  });
});