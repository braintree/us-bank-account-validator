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
  const isPotentiallyValid = isCheckDigitValid(value);

  return {
    isValid,
    isPotentiallyValid: isValid || isPotentiallyValid,
  };
}

/**
 * reference: https://en.wikipedia.org/wiki/ABA_routing_transit_number#Check_digit
 * @param abaRoutingNumber an ABA routing number to be checked
 * @returns whether check digit of the ABA routing number is valid
 */
const isCheckDigitValid = (abaRoutingNumber: string) => {
  try {
    if (!/^\d+$/.test(abaRoutingNumber)) return false;
    if (abaRoutingNumber.length !== 9) return false;

    const d = abaRoutingNumber.split("").map((digit) => parseInt(digit));

    const res =
      // prettier-ignore
      (
        (3 * (d[0] + d[3] + d[6])) +
        (7 * (d[1] + d[4] + d[7])) +
        (1 * (d[2] + d[5] + d[8]))
      )
            % 10 === 0;

    return res;
  } catch (e) {
    return false;
  }
};
