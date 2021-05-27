import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

import * as Invoice from "../shared/types";
import HomeComponents from "../components/home";
import CompanyInvoice from "../lib/invoice-from";
import BillDate from "../lib/invoice";
import { useProductManagement } from "../shared/hooks/use-product-management";
import Container from "../shared/ui/container";
import { useContext, useEffect } from "react";
import { ModalContext } from "../shared/context/modal";
import { useRouter } from "next/dist/client/router";

const Home: React.FC<Invoice.Invoice.HomeOptions> = ({ invoiceFrom, invoice }) => {
  const {
    products,
    subTotal,
    tax,
    total,
    showAddProductMenu,
    showAddProductMenuHandler,
    addProductHandler,
    removeProductHandler,
    removeAllProductsHandler
  } = useProductManagement();

  invoiceFrom = JSON.parse(
    invoiceFrom as Exclude<
      Invoice.Invoice.CompanyInvoiceOptions,
      Invoice.Invoice.CompanyInvoiceOptions
    >
  );

  return (
    <Container>
      <HomeComponents
        invoiceFrom={invoiceFrom}
        invoice={invoice}
        products={products}
        showAddProductMenu={showAddProductMenu}
        subTotal={subTotal}
        tax={tax}
        total={total}
        showAddProductHandler={showAddProductMenuHandler}
        addProductHandler={addProductHandler}
        removeProductHandler={removeProductHandler}
        removerAllProductshandler={removeAllProductsHandler}
      />
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

    return {
      props: {
        invoiceFrom: JSON.stringify(
          CompanyInvoice.build("Invoice Band", "+234 8910 4567", "bill@info.com")
        ),

        invoice: {
          number: "1",
          date: BillDate.build()
        }
      }
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      }
    };
  }
};

export default Home;
