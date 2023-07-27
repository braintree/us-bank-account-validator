import routingNumberList from "./routing-number-list";
import type { RoutingNumberValidity } from "./types";

const allowedRoutingNumbers = routingNumberList.reduce((result, number) => {
  result[number] = true;

  return result;
}, Object.create(null));

export default function (value: string | unknown): RoutingNumberValidity {
  if (typeof value !== "string") {
    return {
      isValid: false,
      isPotentiallyValid: false,
      isCheckDigitValid: false,
    };
  }

  const isValid = value in allowedRoutingNumbers;
  const isPotentiallyValid = /^\d{0,8}$/.test(value);
  const isCheckDigitValid = getIsCheckDigitValid(value);

  return {
    isValid,
    isPotentiallyValid: isValid || isPotentiallyValid,
    isCheckDigitValid,
  };
}

/**
 * reference: https://en.wikipedia.org/wiki/ABA_routing_transit_number#Check_digit
 * @param abaRoutingNumber an ABA routing number to be checked
 * @returns whether check digit of the ABA routing number is valid
 */
const getIsCheckDigitValid = (abaRoutingNumber: string) => {
  try {
    if (!/^\d+$/.test(abaRoutingNumber)) return false;
    if (abaRoutingNumber.length !== 9) return false;

    const d = abaRoutingNumber.split("").map((digit) => parseInt(digit, 10));

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
