import * as Invoice from "../../shared/types";

class CompanyInvoice implements Invoice.Invoice.InvoiceFromOptions {
  static build: Invoice.Invoice.CompanyInvoiceBuildOptions<string> = (marketer, phone, email) => {
    return new CompanyInvoice(marketer, phone, email);
  };

  constructor(public marketer: string, public phone: string, public email: string) {}
}

export default CompanyInvoice;
