'use strict';

var expect = require('chai').expect;
var validator = require('..');

describe('module', function () {
  it('sets `routingNumber` to the right module', function () {
    expect(validator.routingNumber).to.equal(require('../src/routing-number'));
  });

  it('sets `accountNumber` to the right module', function () {
    expect(validator.accountNumber).to.equal(require('../src/account-number'));
  });
});
