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

  it("can validate a potentially valid routing number dynamically", () => {
    // 645442104 is not an assigned routing number, but has a valid form
    expect(routingNumber("645442104")).toEqual({
      isValid: true,
      isPotentiallyValid: true,
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

  it("is returns false for invalid routing numbers", () => {
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

  it("is invalid for routing numbers with invalid first-two-digit prefix", () => {
    [
      "130000000", // prefix 13: gap between range 0–12 and 21–32
      "200000000", // prefix 20: gap between range 0–12 and 21–32
      "330000000", // prefix 33: gap between range 21–32 and 61–72
      "600000000", // prefix 60: gap between range 21–32 and 61–72
      "730000000", // prefix 73: gap between range 61–72 and 80
      "810000000", // prefix 81: above 80
    ].forEach((value) => {
      expect(routingNumber(value)).toEqual({
        isValid: false,
        isPotentiallyValid: false,
      });
    });
  });

  it("is invalid for routing numbers with valid prefix but failing checksum", () => {
    // prefix 02 (valid, in 0–12), checksum: 3*0 + 7*(2+0+2) + 1*(1+0+3) = 32, 32%10 ≠ 0
    expect(routingNumber("021000023")).toEqual({
      isValid: false,
      isPotentiallyValid: false,
    });
  });
});
