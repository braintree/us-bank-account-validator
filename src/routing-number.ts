import routingNumberList from "./routing-number-list";
import type { BankValidity } from "./types";

const allowedRoutingNumbers = routingNumberList.reduce((result, number) => {
  result[number] = true;

  return result;
}, Object.create(null));

export default function (value: string | unknown): BankValidity {
  if (typeof value !== "string") {
    return {
      isValid: false,
      isPotentiallyValid: false,
    };
  }

  const isValid = value in allowedRoutingNumbers;
  const isPotentiallyValid = /^\d{0,8}$/.test(value);

  return {
    isValid,
    isPotentiallyValid: isValid || isPotentiallyValid,
  };
}
