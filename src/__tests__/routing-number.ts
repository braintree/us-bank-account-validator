import routingNumber from "../routing-number";
import * as routingToBankname from "./routing-to-bank-name.json";

describe("routingNumber", () => {
  it("is invalid for non-strings", () => {
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
      new String("322484401"), // eslint-disable-line no-new-wrappers
    ].forEach((value) => {
      expect(routingNumber(value)).toEqual({
        isValid: false,
        isPotentiallyValid: false,
      });
    });
  });

  it("is potentially valid for partial strings", () => {
    [
      "",
      "3",
      "32",
      "322",
      "3224",
      "32248",
      "322484",
      "3224844",
      "32248440",
    ].forEach((value) => {
      expect(routingNumber(value)).toEqual({
        isValid: false,
        isPotentiallyValid: true,
      });
    });
  });

  it("is valid for correct numbers", () => {
    Object.keys(routingToBankname).forEach((value) => {
      expect(routingNumber(value)).toEqual({
        isValid: true,
        isPotentiallyValid: true,
      });
    });
  });

  it("is invalid for numbers that are too long", () => {
    ["3224844012", "32248440100", "0322484401"].forEach((value) => {
      expect(routingNumber(value)).toEqual({
        isValid: false,
        isPotentiallyValid: false,
      });
    });
  });

  it("is invalid for values not in the list", () => {
    [
      "999999999",
      "074986820 ",
      " 074986820",
      "a074986820",
      "074986820o",
    ].forEach((value) => {
      expect(routingNumber(value)).toEqual({
        isValid: false,
        isPotentiallyValid: false,
      });
    });
  });
});
