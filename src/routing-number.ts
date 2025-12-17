import type { BankValidity } from "./types";

export default function (value: string | unknown): BankValidity {
  if (typeof value !== "string") {
    return {
      isValid: false,
      isPotentiallyValid: false,
    };
  }

  const isValid = checkRTNAlgorithmically(value);
  const isPotentiallyValid = /^\d{0,8}$/.test(value);

  return {
    isValid,
    isPotentiallyValid: isValid || isPotentiallyValid,
  };
}

/**
 * Determines whether the routing number is valid by checking dynamically against the ABA RTN standard.
 * @param abaRoutingNumber an ABA routing number to be checked
 * @returns whether the ABA routing number is valid
 */
const checkRTNAlgorithmically = (abaRoutingNumber: string): boolean => {
  if (!/^\d+$/.test(abaRoutingNumber)) return false;
  if (abaRoutingNumber.length !== 9) return false;

  const firstTwoDigits = Number(abaRoutingNumber.substring(0, 1));

  if (
    !(firstTwoDigits >= 0 && firstTwoDigits <= 12) &&
    !(firstTwoDigits >= 21 && firstTwoDigits <= 32) &&
    !(firstTwoDigits >= 61 && firstTwoDigits <= 72) &&
    firstTwoDigits !== 80 // traveler's checks
  ) {
    return false;
  }

  const chars = abaRoutingNumber.split("").map((digit) => parseInt(digit, 10));

  const isCheckDigitValid =
    // prettier-ignore
    (
        (3 * (chars[0] + chars[3] + chars[6])) +
        (7 * (chars[1] + chars[4] + chars[7])) +
        (1 * (chars[2] + chars[5] + chars[8]))
      )
            % 10 === 0;

  if (!isCheckDigitValid) {
    return false;
  }

  return true;
};
