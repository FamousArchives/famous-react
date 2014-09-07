/*global describe, it*/
'use strict';

var should = require('chai').should();
var clone = require('lodash.clone');
var cloneStyle = require('../../src/util/cloneStyle');

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

describe('cloneStyle', function(){
  it('should clone all values', function(done){
    var oldStyle = clone(style);
    var newStyle = cloneStyle(oldStyle);
    newStyle.should.eql(oldStyle);
    done();
  });
  it('should clone only style values', function(done){
    var oldStyle = clone(style);
    oldStyle.fake = 1;

    var newStyle = cloneStyle(oldStyle);
    newStyle.should.eql(style);
    newStyle.should.not.eql(oldStyle);
    done();
  });
});