/*global describe, it*/
'use strict';

var should = require('chai').should();
var sequence = require('../../src/sequence');

var stepFn = function(state){
  return {
    x: 100
  };
};

var stepFn2 = function(state){
  return {
    y: 100
  };
};


describe('sequence', function(){
  it('should work when called as function', function(done){
    var seq = sequence();
    should.exist(seq);
    seq.steps().should.eql([]);
    done();
  });
  it('should work when called as class', function(done){
    var seq = new sequence();
    should.exist(seq);
    seq.steps().should.eql([]);
    done();
  });

  it('should take steps as an argument', function(done){
    var steps = [stepFn];
    var seq = sequence(steps);
    seq.steps().should.eql(steps);
    done();
  });

  it('should clone into a new sequence', function(done){
    var steps = [stepFn];
    var seq = sequence(steps);
    var newSeq = seq.clone();

    seq.steps().should.not.equal(newSeq.steps());
    seq.steps().should.eql(steps);
    newSeq.steps().should.eql(steps);
    done();
  });

  it('should add steps and return a new sequence', function(done){
    var seq = sequence();
    var newSeq = seq.step(stepFn);

    seq.steps().should.not.equal(newSeq.steps());
    seq.steps().should.eql([]);
    newSeq.steps().should.eql([stepFn]);
    done();
  });

  it('should inverse steps and return a new sequence', function(done){
    var seq = sequence([stepFn, stepFn2]);
    var newSeq = seq.inverse();

    seq.steps().should.not.equal(newSeq.steps());

    seq.steps().should.eql([stepFn, stepFn2]);
    newSeq.steps().should.eql([stepFn2, stepFn]);
    done();
  });
});