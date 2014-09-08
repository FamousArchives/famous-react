/*global describe, it*/
'use strict';

var should = require('chai').should();
var sugar = require('../../src/sequence/sugar');

describe('sequence/sugar', function(){
  // centering
  it('should work with vertical center', function(done){
    sugar({
      center: 'vertical'
    }).should.eql({
      align: [0, 0.5],
      origin: [0, 0.5]
    });
    done();
  });
  it('should work with horizontal center', function(done){
    sugar({
      center: 'horizontal'
    }).should.eql({
      align: [0.5, 0],
      origin: [0.5, 0]
    });
    done();
  });
  it('should work with patented tru-technology center', function(done){
    sugar({
      center: true
    }).should.eql({
      align: [0.5, 0.5],
      origin: [0.5, 0.5]
    });
    done();
  });

  // size
  it('should work with height', function(done){
    sugar({
      height: 100
    }).should.eql({
     size: [undefined, 100]
    });
    done();
  });
  it('should work with width', function(done){
    sugar({
      width: 100
    }).should.eql({
     size: [100, undefined]
    });
    done();
  });
  it('should work with height and width', function(done){
    sugar({
      height: 100,
      width: 200
    }).should.eql({
     size: [200, 100]
    });
    done();
  });
});