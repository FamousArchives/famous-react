/*global describe, it*/
'use strict';

var should = require('chai').should();
var ensureStep = require('../../src/sequence/ensureStep');

describe('sequence/ensureStep', function(){
  it('should return function when input is function', function(done){
    var fn = function(){};
    ensureStep(fn).should.equal(fn);
    done();
  });
  it('should return function wrapper when input is object', function(done){
    var o = {
      a: 123,
      b: 345
    };
    ensureStep(o)().should.eql(o);
    done();
  });
});