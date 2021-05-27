import { memo } from "react";
import * as Invoice from "../../../../shared/types";

import classes from "./invoice-item-report.module.css";

const InvoiceItemReport: React.FC<Invoice.Invoice.InvoiceItemReportOptions> = ({
  index,
  id,
  invoiceInfo,
  products,
  subTotal,
  tax,
  total,
  createdAt,
  selectInvoiceHandler
}) => {
  return (
    <tr
      title="Click to see products."
      className={[classes.invoiceItemReport, "hover"].join(" ")}
      onClick={() => selectInvoiceHandler(index)}
    >
      <td>{index + 1}</td>

      <td>
        <p>{invoiceInfo.name}</p>
        <p>{invoiceInfo.email}</p>
        <p>{invoiceInfo.address}</p>
      </td>

      <td>${subTotal}</td>
      <td>${tax}</td>
      <td>${total}</td>
      <td>{createdAt}</td>
    </tr>
  );
};

export default memo(InvoiceItemReport);
