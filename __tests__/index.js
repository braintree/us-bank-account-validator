const validator = require('..');

describe('module', function () {
  it('sets `routingNumber` to the right module', function () {
    expect(validator.routingNumber).toBe(require('../src/routing-number'));
  });

  it('sets `accountNumber` to the right module', function () {
    expect(validator.accountNumber).toBe(require('../src/account-number'));
  });
});
