'use strict';

var expect = require('chai').expect;
var accountNumber = require('../src/account-number');

describe('accountNumber', function () {
  it('is invalid for non-strings', function () {
    [
      0,
      1,
      12345,
      322484401,
      true,
      false,
      null,
      undefined, // eslint-disable-line no-undefined
      [],
      {},
      new String('322484401') // eslint-disable-line no-new-wrappers
    ].forEach(function (value) {
      expect(accountNumber(value)).to.deep.equal({
        isValid: false,
        isPotentiallyValid: false
      });
    });
  });

  it('is potentially valid for partial stirngs', function () {
    [
      '',
      '0',
      '01',
      '012'
    ].forEach(function (value) {
      expect(accountNumber(value)).to.deep.equal({
        isValid: false,
        isPotentiallyValid: true
      });
    });
  });

  it('is valid for strings between 4 and 17 characters long', function () {
    [
      '0000',
      '1234',
      '    ',
      'abcd',
      '01234567890123456',
      '0123A567B901-3Z56',
      '0123456789012345',
      '01234567890',
      '-----------'
    ].forEach(function (value) {
      expect(accountNumber(value)).to.deep.equal({
        isValid: true,
        isPotentiallyValid: true
      });
    });
  });

  it('is invalid for strings that are too long', function () {
    [
      '012345678901234567',
      '01234567890123456  ',
      '0123456789012345699',
      'ba01234567890123456',
      '-------------------'
    ].forEach(function (value) {
      expect(accountNumber(value)).to.deep.equal({
        isValid: false,
        isPotentiallyValid: false
      });
    });
  });
});
