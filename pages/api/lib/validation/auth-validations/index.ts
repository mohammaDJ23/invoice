import validator from "validator";

import { AuthDataOptions, Invoice } from "../../types";

const { matches, isLength, normalizeEmail, isStrongPassword } = validator;

export const authValidations = (data: AuthDataOptions) => {
  let isValid = true;

  Object.keys(data).forEach(input => {
    switch (input) {
      case Invoice.NAME: {
        const value = data[Invoice.NAME];

        isValid =
          isValid &&
          matches(value, /^[a-zA-z]+([\s][a-zA-Z]+)*$/) &&
          isLength(value, { min: 3, max: 30 });

        break;
      }

      case Invoice.EMAIL: {
        const value = data[Invoice.EMAIL];

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
      }

      case Invoice.PASSWORD: {
        const value = data[Invoice.PASSWORD];

        isValid =
          isValid &&
          isStrongPassword(value, { minLength: 8 }) &&
          isLength(value, { min: 8, max: 50 }) &&
          !(value[0] === " " || value[value.length - 1] === " ");

        break;
      }

      default:
        return false;
    }
  });

  return isValid;
};
