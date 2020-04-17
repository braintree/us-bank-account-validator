import type { BankValidity } from "./types";

export default function (value: string | unknown): BankValidity {
  if (typeof value !== "string") {
    return {
      isValid: false,
      isPotentiallyValid: false,
    };
  }

  return {
    isValid: value.length >= 4 && value.length <= 17,
    isPotentiallyValid: value.length <= 17,
  };
}
