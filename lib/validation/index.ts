import validator from "validator";

import * as Invoice from "../../shared/types";

const {
  isLength,
  isNumeric,
  isInt,
  isDecimal,
  matches,
  normalizeEmail,
  isStrongPassword
} = validator;

export const validation: Invoice.Invoice.ValidationOptions = ({ name, value }) => {
  let isValid = true;

  switch (name) {
    case Invoice.Invoice.InputNameOptions.TITLE:
      isValid =
        isValid &&
        isLength(value, { min: 3, max: 30 }) &&
        matches(value, /^[a-zA-z]+([\s][a-zA-Z]+)*$/);

      break;

    case Invoice.Invoice.InputNameOptions.DESCRIPTION:
      isValid =
        isValid &&
        isLength(value, { min: 3, max: 50 }) &&
        matches(value, /^[a-zA-z]+([\s][a-zA-Z]+)*$/);

      break;

    case Invoice.Invoice.InputNameOptions.PRICE:
      isValid =
        isValid &&
        isNumeric(value) &&
        isDecimal(value, { force_decimal: false, decimal_digits: "2" }) &&
        +value >= 1 &&
        +value <= 2000;

      break;

    case Invoice.Invoice.InputNameOptions.QUANTITY:
      isValid = isValid && isNumeric(value) && isInt(value, { min: 1, max: 10 });

      break;

    case Invoice.Invoice.InputNameOptions.NAME:
      isValid =
        isValid &&
        matches(value, /^[a-zA-z]+([\s][a-zA-Z]+)*$/) &&
        isLength(value, { min: 3, max: 30 });

      break;

    case Invoice.Invoice.InputNameOptions.EMAIL:
      isValid =
        isValid &&
        matches(
          value,
          /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/
        );

      if (isValid) {
        normalizeEmail(value);
      }

      break;

    case Invoice.Invoice.InputNameOptions.ADDRESS:
      isValid = isValid && isLength(value, { min: 3, max: 50 });

      break;

    case Invoice.Invoice.InputNameOptions.PASSWORD:
      isValid =
        isValid &&
        isStrongPassword(value, { minLength: 8 }) &&
        isLength(value, { min: 8, max: 50 }) &&
        !(value[0] === " " || value[value.length - 1] === " ");

      break;

    default:
      return false;
  }

  if (isValid) {
    value = value.trim();
  }

  return isValid;
};
