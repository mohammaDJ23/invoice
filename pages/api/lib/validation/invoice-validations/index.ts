import validator from "validator";

import {
  InvoiceDataOptions,
  Invoice,
  InvoicePriceValidationOptions
} from "../../types";

const {
  isLength,
  isNumeric,
  isInt,
  isDecimal,
  matches,
  normalizeEmail,
  trim
} = validator;

const productsValidation = (products: InvoiceDataOptions[Invoice.PRODUCTS]) => {
  let isValid = true;

  products.forEach(product => {
    Object.keys(product).forEach(key => {
      switch (key) {
        case Invoice.TITLE: {
          const value = product[Invoice.TITLE];

          isValid =
            isValid &&
            isLength(value, { min: 3, max: 30 }) &&
            matches(value, /^[a-zA-z]+([\s][a-zA-Z]+)*$/);

          break;
        }

        case Invoice.DESCRIPTION: {
          const value = product[Invoice.DESCRIPTION];

          isValid =
            isValid &&
            isLength(value, { min: 3, max: 50 }) &&
            matches(value, /^[a-zA-z]+([\s][a-zA-Z]+)*$/);

          break;
        }

        case Invoice.PRICE: {
          const value = trim(product[Invoice.PRICE].toString());

          isValid =
            isValid &&
            isNumeric(value) &&
            isDecimal(value, { force_decimal: false, decimal_digits: "2" }) &&
            +value >= 1 &&
            +value <= 2000;

          break;
        }

        case Invoice.QUANTITY: {
          const value = trim(product[Invoice.QUANTITY].toString());

          isValid = isValid && isNumeric(value) && isInt(value, { min: 1, max: 10 });

          break;
        }

        case Invoice.TOTAL: {
          const value = trim(product[Invoice.TOTAL].toString());

          isValid =
            isValid &&
            isNumeric(value) &&
            isDecimal(value, { force_decimal: false, decimal_digits: "2" });

          break;
        }

        case Invoice.ID: {
          isValid = true;

          break;
        }

        default:
          return false;
      }
    });
  });

  return isValid;
};

const invoiceValidation = (invoice: InvoiceDataOptions[Invoice.INVOICE]) => {
  let isValid = true;

  Object.keys(invoice).forEach(key => {
    switch (key) {
      case Invoice.NAME: {
        const value = invoice[Invoice.NAME];

        isValid =
          isValid &&
          matches(value, /^[a-zA-z]+([\s][a-zA-Z]+)*$/) &&
          isLength(value, { min: 3, max: 30 });

        break;
      }

      case Invoice.EMAIL: {
        const value = invoice[Invoice.EMAIL];

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

      case Invoice.ADDRESS: {
        const value = trim(invoice[Invoice.ADDRESS]);

        isValid = isValid && isLength(value, { min: 3, max: 50 });

        break;
      }

      default:
        return false;
    }
  });

  return isValid;
};

const invoicePriceValidation = (prices: InvoicePriceValidationOptions) => {
  let isValid = true;

  Object.keys(prices).forEach(price => {
    const value = trim(prices[price]);

    isValid =
      isValid &&
      isNumeric(value) &&
      isDecimal(value, { force_decimal: false, decimal_digits: "2" });
  });

  return isValid;
};

export const invoiceValidations = (data: InvoiceDataOptions) => {
  let isValid = true;

  isValid = isValid && productsValidation(data[Invoice.PRODUCTS]);
  isValid = isValid && invoiceValidation(data[Invoice.INVOICE]);

  isValid =
    isValid &&
    invoicePriceValidation({
      subTotal: data[Invoice.SUB_TOTAL],
      tax: data[Invoice.TAX],
      total: data[Invoice.TOTAL]
    });

  return isValid;
};
