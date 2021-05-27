import { useCallback, useContext } from "react";

import * as Invoice from "../../../shared/types";
import ProductsReportModal from "../../../shared/ui/products-report-modal";
import InvoiceItemReport from "./invoice-item-report";
import { ProductsReportContext } from "../../../shared/context/products-report";

import classes from "./table-report.module.css";

const TableReport: React.FC<Invoice.Invoice.TableReportOptions> = ({
  invoicesReport
}) => {
  const { productsReportHandler, products } = useContext(ProductsReportContext);

  const selectInvoiceHandler = useCallback(
    (index: number) => {
      productsReportHandler(invoicesReport[index].products);
    },
    [productsReportHandler]
  );

  return (
    <>
      <table className={[classes.tableReport, "w-100 h-100"].join(" ")}>
        <thead>
          <tr>
            <th>NO.</th>
            <th>INVOICE INFO</th>
            <th>SUB TOTAL</th>
            <th>TAX</th>
            <th>TOTAL</th>
            <th>CREATED AT</th>
          </tr>
        </thead>

        {invoicesReport.length > 0 && (
          <tbody>
            {invoicesReport &&
              invoicesReport.map((report, index) => (
                <InvoiceItemReport
                  key={report.id}
                  index={index}
                  {...report}
                  selectInvoiceHandler={selectInvoiceHandler}
                />
              ))}
          </tbody>
        )}

        {invoicesReport.length === 0 && (
          <caption className="text-center">No invoices available here</caption>
        )}
      </table>

      {products.length > 0 && <ProductsReportModal products={products} />}
    </>
  );
};

export default TableReport;
