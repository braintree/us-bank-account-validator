export type BankValidity = {
  isValid: boolean;
  isPotentiallyValid: boolean;
};

export type RoutingNumberValidity = BankValidity & {
  isCheckDigitValid: boolean;
};
