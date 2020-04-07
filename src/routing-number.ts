import routingNumberList from "./routing-number-list";
import type { BankValidity } from "./types";

const allowedRoutingNumbers = routingNumberList.reduce(function (
  result,
  number
) {
  result[number] = true;

  return result;
},
Object.create(null));

export default function (value): BankValidity {
  const isValid = value in allowedRoutingNumbers;
  const isPotentiallyValid = /^\d{0,8}$/.test(value);

  if (typeof value !== "string") {
    return {
      isValid: false,
      isPotentiallyValid: false,
    };
  }

  return {
    isValid,
    isPotentiallyValid: isValid || isPotentiallyValid,
  };
}
