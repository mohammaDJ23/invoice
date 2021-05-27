import Header from "../home/header";
import TableReport from "./table-report";
import * as Invoice from "../../shared/types";

const InvoicesReport: React.FC<Invoice.Invoice.InvoicesReportComponentsOptions> = ({
  invoicesReport
}) => {
  return (
    <div>
      <Header products={[]} button={<div></div>} />
      <TableReport invoicesReport={invoicesReport} />
    </div>
  );
};

export default InvoicesReport;
