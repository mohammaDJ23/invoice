import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

import Container from "../../shared/ui/container";
import * as Invoice from "../../shared/types";
import { invoicesReportOperation } from "../api/lib/api/invoices-report";
import { HttpError } from "../api/lib/models/error";
import Modal from "../../shared/ui/modal";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../shared/context/modal";
import Header from "../../components/home/header";
import Button from "../../shared/ui/button";
import InvoicesReportComponents from "../../components/invoices-report";

const InvoicesReport: React.FC<Invoice.Invoice.InvoicesReportOpetions> = ({
  invoicesReport,
  error
}) => {
  const router = useRouter();
  const { modalHandler, isShow } = useContext(ModalContext);

  useEffect(() => {
    if (!error) {
      return;
    }

    modalHandler(true);
  }, [modalHandler, error]);

  if (error) {
    return (
      <Container>
        <Header
          products={[]}
          button={
            <Button
              type="button"
              label="REDIRECT TO HOME"
              onClick={() => {
                modalHandler(false);
                router.replace("/");
              }}
            />
          }
        />

        {error && isShow && <Modal action="error" content={error} />}
      </Container>
    );
  }

  invoicesReport = JSON.parse(
    invoicesReport as Exclude<
      Invoice.Invoice.InvoicesReportOpetions,
      Invoice.Invoice.InvoicesReportOpetions
    >
  );

  return (
    <Container>
      <InvoicesReportComponents invoicesReport={invoicesReport} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return {
        redirect: {
          destination: "/auth",
          permanent: false
        }
      };
    }

    const { invoicesReport } = await invoicesReportOperation(session.user.id);

    return {
      props: {
        invoicesReport: JSON.stringify(invoicesReport)
      }
    };
  } catch (error) {
    return {
      props: {
        error: new HttpError(error.message, 500).message
      }
    };
  }
};

export default InvoicesReport;
