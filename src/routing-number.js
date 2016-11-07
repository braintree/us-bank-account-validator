'use strict';

var routingNumberList = require('./routing-number-list');

var allowedRoutingNumbers = routingNumberList.reduce(function (result, number) {
  result[number] = true;
  return result;
}, Object.create(null));

module.exports = function (value) {
  var isValid = value in allowedRoutingNumbers;
  var isPotentiallyValid = /^\d{0,8}$/.test(value);

  if (typeof value !== 'string') {
    return {
      isValid: false,
      isPotentiallyValid: false
    };
  }

  return {
    isValid: isValid,
    isPotentiallyValid: isValid || isPotentiallyValid
  };
};
