export interface InvoiceDataOptions {
  products: {
    title: string;
    description: string;
    price: number;
    quantity: number;
    total: number;
  }[];

  invoice: {
    name: string;
    email: string;
    address: string;
  };

  subTotal: string;
  tax: string;
  total: string;
}

export interface AuthDataOptions {
  name: string;
  email: string;
  password: string;
}

export interface InvoicePriceValidationOptions {
  subTotal: InvoiceDataOptions[Invoice.SUB_TOTAL];
  tax: InvoiceDataOptions[Invoice.TAX];
  total: InvoiceDataOptions[Invoice.TOTAL];
}

export enum Invoice {
  SUB_TOTAL = "subTotal",
  TAX = "tax",
  TOTAL = "total",
  PRODUCTS = "products",
  ID = "id",
  TITLE = "title",
  DESCRIPTION = "description",
  PRICE = "price",
  QUANTITY = "quantity",
  INVOICE = "invoice",
  NAME = "name",
  EMAIL = "email",
  ADDRESS = "addres",
  PASSWORD = "password"
}
