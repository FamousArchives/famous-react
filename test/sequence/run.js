/*global describe, it*/
'use strict';

var should = require('chai').should();
var StateModifier = require('famous/modifiers/StateModifier');
var sequence = require('../../src/sequence');
var run = require('../../src/sequence/run');

describe('sequence/run', function(){
  it('should execute one sequence step', function(done){
    var mod = new StateModifier();
    var seq = sequence()
      .step(function(){
        return {
          x: 100
        }
      });

    run(seq, mod, function(err){
      should.not.exist(err);
      done();
    });
  });
});