/*global describe, it*/
'use strict';

var should = require('chai').should();
var createFamous = require('../../src/util/createFamous');

describe('createFamous', function(){
  it('should output an object with the required values', function(done){
    var fam = createFamous();
    should.exist(fam.node);
    should.exist(fam.modifier);
    should.exist(fam.element);
    should.exist(fam.element.style);
    should.not.exist(fam.element.lastStyle);

    done();
  });
});