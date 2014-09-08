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
  // no changes
  it('should return undefined on no changes', function(done){
    var oldStyle = clone(style);
    var newStyle = clone(style);
    var diff = getStyleUpdates(oldStyle, newStyle);
    should.not.exist(diff);
    done();
  });

  // null to some styles
  it('should return same object on null last', function(done){
    var newStyle = clone(style);
    var diff = getStyleUpdates(null, newStyle);
    diff.should.equal(newStyle);
    done();
  });

  // empty to some styles
  it('should return changes on all new properties', function(done){
    var newStyle = clone(style);
    var diff = getStyleUpdates({}, newStyle);
    diff.should.eql(newStyle);
    done();
  });

  // existing value to existing value
  it('should return changes from one value to another', function(done){
    var oldStyle = clone(style);
    var newStyle = clone(style);
    newStyle.opacity = 2;

    var diff = getStyleUpdates(oldStyle, newStyle);
    diff.should.eql({
      opacity: 2
    });
    done();
  });

  // property removal
  it('should return removal changes when property deleted', function(done){
    var oldStyle = clone(style);
    var newStyle = clone(style);
    delete newStyle.opacity;

    var diff = getStyleUpdates(oldStyle, newStyle);
    diff.should.eql({
      opacity: ''
    });
    done();
  });
  it('should return removal changes when property set to null', function(done){
    var oldStyle = clone(style);
    var newStyle = clone(style);
    newStyle.opacity = null;

    var diff = getStyleUpdates(oldStyle, newStyle);
    diff.should.eql({
      opacity: ''
    });
    done();
  });
  it('should return removal changes when property set to undefined', function(done){
    var oldStyle = clone(style);
    var newStyle = clone(style);
    newStyle.opacity = undefined;

    var diff = getStyleUpdates(oldStyle, newStyle);
    diff.should.eql({
      opacity: ''
    });
    done();
  });

  // new value
  it('should return changes when adding property', function(done){
    var oldStyle = clone(style);
    delete oldStyle.opacity;

    var newStyle = clone(style);
    newStyle.opacity = 2;

    var diff = getStyleUpdates(oldStyle, newStyle);
    diff.should.eql({
      opacity: 2
    });
    done();
  });
});