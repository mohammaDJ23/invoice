import { useRouter } from "next/dist/client/router";
import * as Invoice from "../../../shared/types";
import Button from "../../../shared/ui/button";

import classes from "./company-invoice.module.css";

const CompanyInvoice: React.FC<Invoice.Invoice.CompanyInvoiceOptions> = ({
  marketer,
  phone,
  email,
  date,
  invoiceNumber
}) => {
  const router = useRouter();

  const invoiceFrom = () => (
    <div>
      <p>Invoice From:</p>

      <p>
        <b>Marketer:</b> <span>{marketer}</span>
      </p>

      <p>
        <b>Phone:</b> <span>{phone}</span>
      </p>

      <p>
        <b>Email:</b> <span>{email}</span>
      </p>

      <Button
        type="button"
        label="SEE ALL INVOICE REPORT"
        onClick={() => router.push("/invoices-report")}
        style={{ marginTop: "10px" }}
      />
    </div>
  );

  const invoice = () => (
    <div>
      <h1 className="text-center">INVOICE</h1>

      <div>
        <p className="d-flex align-items-center justify-content-between">
          <b>Invoice Number:</b>

          <span># {invoiceNumber}</span>
        </p>

        <p className="d-flex align-items-center justify-content-between">
          <b>Invoice Date: </b> <span>{date}</span>
        </p>
      </div>
    </div>
  );

  return (
    <div
      className={[
        classes.companyInvoice,
        "d-flex align-items-center justify-content-between"
      ].join(" ")}
    >
      {invoiceFrom()}
      {invoice()}
    </div>
  );
};

export default CompanyInvoice;
