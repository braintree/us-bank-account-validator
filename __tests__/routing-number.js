const routingNumber = require('../src/routing-number');
const routingToBankname = require('./routing-to-bank-name');

describe('routingNumber', function () {
  it('is invalid for non-strings', function () {
    [
      0,
      1,
      322484401,
      true,
      false,
      null,
      undefined, // eslint-disable-line no-undefined
      [],
      {},
      new String('322484401') // eslint-disable-line no-new-wrappers
    ].forEach(function (value) {
      expect(routingNumber(value)).toEqual({
        isValid: false,
        isPotentiallyValid: false
      });
    });
  });

  it('is potentially valid for partial strings', function () {
    [
      '',
      '3',
      '32',
      '322',
      '3224',
      '32248',
      '322484',
      '3224844',
      '32248440'
    ].forEach(function (value) {
      expect(routingNumber(value)).toEqual({
        isValid: false,
        isPotentiallyValid: true
      });
    });
  });

  it('is valid for correct numbers', function () {
    Object.keys(routingToBankname).forEach(function (value) {
      expect(routingNumber(value)).toEqual({
        isValid: true,
        isPotentiallyValid: true
      });
    });
  });

  it('is invalid for numbers that are too long', function () {
    [
      '3224844012',
      '32248440100',
      '0322484401'
    ].forEach(function (value) {
      expect(routingNumber(value)).toEqual({
        isValid: false,
        isPotentiallyValid: false
      });
    });
  });

  it('is invalid for values not in the list', function () {
    [
      '999999999',
      '074986820 ',
      ' 074986820',
      'a074986820',
      '074986820o'
    ].forEach(function (value) {
      expect(routingNumber(value)).toEqual({
        isValid: false,
        isPotentiallyValid: false
      });
    });
  });
});
