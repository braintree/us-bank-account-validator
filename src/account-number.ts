import type { BankValidity } from "./types";

export default function (value): BankValidity {
  const isString = typeof value === "string";

  return {
    isValid: isString && value.length >= 4 && value.length <= 17,
    isPotentiallyValid: isString && value.length <= 17,
  };
}
