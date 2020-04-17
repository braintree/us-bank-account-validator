import accountNumber from "../account-number";

describe("accountNumber", () => {
  it("is invalid for non-strings", () => {
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
      new String("322484401"), // eslint-disable-line no-new-wrappers
    ].forEach((value) => {
      expect(accountNumber(value)).toEqual({
        isValid: false,
        isPotentiallyValid: false,
      });
    });
  });

  it("is potentially valid for partial strings", () => {
    ["", "0", "01", "012"].forEach((value) => {
      expect(accountNumber(value)).toEqual({
        isValid: false,
        isPotentiallyValid: true,
      });
    });
  });

  it("is valid for strings between 4 and 17 characters long", () => {
    [
      "0000",
      "1234",
      "    ",
      "abcd",
      "01234567890123456",
      "0123A567B901-3Z56",
      "0123456789012345",
      "01234567890",
      "-----------",
    ].forEach((value) => {
      expect(accountNumber(value)).toEqual({
        isValid: true,
        isPotentiallyValid: true,
      });
    });
  });

  it("is invalid for strings that are too long", () => {
    [
      "012345678901234567",
      "01234567890123456  ",
      "0123456789012345699",
      "ba01234567890123456",
      "-------------------",
    ].forEach((value) => {
      expect(accountNumber(value)).toEqual({
        isValid: false,
        isPotentiallyValid: false,
      });
    });
  });
});
