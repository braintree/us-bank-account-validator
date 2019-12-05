declare module 'us-bank-account-validator' {
    function routingNumber(routingNumber: string): ValidationResult;

    function accountNumber(accountNumber: string): ValidationResult;
}

interface ValidationResult {
    isPotentiallyValid: boolean;
    isValid: boolean;
}
