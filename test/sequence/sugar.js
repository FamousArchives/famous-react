/*global describe, it*/
'use strict';

var should = require('chai').should();
var sugar = require('../../src/sequence/sugar');

describe('sequence/sugar', function(){
  // centering
  it('should work with vertical center', function(done){
    var out = sugar({
      center: 'vertical'
    });
    out.align.should.eql([0, 0.5]);
    out.origin.should.eql([0, 0.5]);
    done();
  });
  it('should work with horizontal center', function(done){
    var out = sugar({
      center: 'horizontal'
    });
    out.align.should.eql([0.5, 0]);
    out.origin.should.eql([0.5, 0]);
    done();
  });
  it('should work with patented tru-technology center', function(done){
    var out = sugar({
      center: true
    });
    out.align.should.eql([0.5, 0.5]);
    out.origin.should.eql([0.5, 0.5]);
    done();
  });

  // size
  it('should work with height', function(done){
    sugar({
      height: 100
    }).size.should.eql([undefined, 100]);
    done();
  });
  it('should work with width', function(done){
    sugar({
      width: 100
    }).size.should.eql([100, undefined]);
    done();
  });
  it('should work with height and width', function(done){
    sugar({
      height: 100,
      width: 200
    }).size.should.eql([200, 100]);
    done();
  });

  // translate
  it('should work with x', function(done){
    sugar({
      x: 100
    }).translate.should.eql([100, undefined, undefined]);
    done();
  });
  it('should work with y', function(done){
    sugar({
      y: 100
    }).translate.should.eql([undefined, 100, undefined]);
    done();
  });
  it('should work with z', function(done){
    sugar({
      z: 100
    }).translate.should.eql([undefined, undefined, 100]);
    done();
  });
  it('should work with x, y, and z', function(done){
    sugar({
      x: 100,
      y: 200,
      z: 300
    }).translate.should.eql([100, 200, 300]);
    done();
  });

  // rotate
  it('should work with rotateX', function(done){
    sugar({
      rotateX: 100
    }).rotate.should.eql([100, undefined, undefined]);
    done();
  });
  it('should work with rotateY', function(done){
    sugar({
      rotateY: 100
    }).rotate.should.eql([undefined, 100, undefined]);
    done();
  });
  it('should work with rotateZ', function(done){
    sugar({
      rotateZ: 100
    }).rotate.should.eql([undefined, undefined, 100]);
    done();
  });
  it('should work with rotateX, Y, and Z', function(done){
    sugar({
      rotateX: 100,
      rotateY: 200,
      rotateZ: 300
    }).rotate.should.eql([100, 200, 300]);
    done();
  });

  // scale
  it('should work with scaleX', function(done){
    sugar({
      scaleX: 100
    }).scale.should.eql([100, undefined, undefined]);
    done();
  });
  it('should work with scaleY', function(done){
    sugar({
      scaleY: 100
    }).scale.should.eql([undefined, 100, undefined]);
    done();
  });
  it('should work with scaleZ', function(done){
    sugar({
      scaleZ: 100
    }).scale.should.eql([undefined, undefined, 100]);
    done();
  });
  it('should work with scaleX, Y, and Z', function(done){
    sugar({
      scaleX: 100,
      scaleY: 200,
      scaleZ: 300
    }).scale.should.eql([100, 200, 300]);
    done();
  });

  // skew
  it('should work with skewX', function(done){
    sugar({
      skewX: 100
    }).skew.should.eql([100, undefined, undefined]);
    done();
  });
  it('should work with skewY', function(done){
    sugar({
      skewY: 100
    }).skew.should.eql([undefined, 100, undefined]);
    done();
  });
  it('should work with skewZ', function(done){
    sugar({
      skewZ: 100
    }).skew.should.eql([undefined, undefined, 100]);
    done();
  });
  it('should work with skewX, Y, and Z', function(done){
    sugar({
      skewX: 100,
      skewY: 200,
      skewZ: 300
    }).skew.should.eql([100, 200, 300]);
    done();
  });
});