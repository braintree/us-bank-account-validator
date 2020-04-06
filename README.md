# US Bank Account Validator

US Bank Account Validator provides validation utilities for US bank routing and account numbers. It includes first-class support for "potential" validity so you can use it to present appropriate UI to your user as they type.

## Installation

You can install us-bank-account-validator through npm.

```sh
npm install us-bank-account-validator
```

## Example

In Node/Webpack/Browserify:

```js
var valid = require("us-bank-account-validator");

var routingValidation = valid.routingNumber("4111");

if (routingValidation.isValid) {
  renderFullyValidRoutingNumber();
} else if (!routingValidation.isPotentiallyValid) {
  renderInvalidRoutingNumber();
}
```

In the browser with `<script>` tags:

```html
<script src="path/to/us-bank-account-validator.js"></script>
<script>
  var accountValidation = valid.accountNumber("4111");

  if (accountValidation.isValid) {
    renderFullyValidAccountNumber();
  } else if (!accountValidation.isPotentiallyValid) {
    renderInvalidAccountNumber();
  }
</script>
```

## API

### `valid.routingNumber(value: string): object`

Will return something like this:

```js
{
  // if false, indicates there is no way the number could be valid
  isPotentiallyValid: true,

  // if true, number is fully valid for submission
  isValid: false
}
```

Valid routing numbers come from a hard-coded list of possible numbers, which you can find in `src/routing-number-list.js`.

### `valid.accountNumber(value: string): object`

Will return something like this:

```js
{
  // if false, indicates there is no way the number could be valid
  isPotentiallyValid: true,

  // if true, number is fully valid for submission
  isValid: false
}
```

Valid account numbers are strings between 4 and characters. They are usually numeric but not always, which is why this is a simple length check.
