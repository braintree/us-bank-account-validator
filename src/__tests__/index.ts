import routingNumber from "../routing-number";
import accountNumber from "../account-number";
import validator = require("..");

describe("module", function () {
  it("sets `routingNumber` to the right module", function () {
    expect(validator.routingNumber).toBe(routingNumber);
  });

  it("sets `accountNumber` to the right module", function () {
    expect(validator.accountNumber).toBe(accountNumber);
  });
});
