import CompanyInvoice from "./company-invoice";
import Header from "./header";
import * as Invoice from "../../shared/types";
import ProductList from "./product-list";
import ClientInvoice from "./client-invoice";
import AddProduct from "../../shared/ui/add-product";
import { fetchData } from "../../shared/hooks/use-fetch-data";
import Spinner from "../../shared/ui/spinner";
import Modal from "../../shared/ui/modal";
import { useContext } from "react";
import { ErrorContext } from "../../shared/context/error";

const Home: React.FC<Invoice.Invoice.HomeComponentsOptions> = ({
  invoiceFrom,
  invoice,
  products,
  showAddProductMenu,
  total,
  subTotal,
  tax,
  invoiceNumber,
  showAddProductHandler,
  addProductHandler,
  removeProductHandler,
  removerAllProductshandler
}) => {
  const { loading, fetchInvoice, data, invoiceNumber: invoiceNum } = fetchData();
  const { error } = useContext(ErrorContext);
  const companyInvoice = { ...invoiceFrom, ...invoice, invoiceNumber, invoiceNum };

  return (
    <>
      {loading && <Spinner />}

      <Modal action={data ? "success" : "error"} content={data || error} />

      <Header
        showAddProductHandler={showAddProductHandler}
        products={products}
        loading={loading}
        removerAllProductshandler={removerAllProductshandler}
      />

      <CompanyInvoice {...companyInvoice} />

      <ProductList
        products={products}
        total={total}
        subTotal={subTotal}
        tax={tax}
        removeProductHandler={removeProductHandler}
      />

      <ClientInvoice
        products={products}
        total={total}
        subTotal={subTotal}
        tax={tax}
        loading={loading}
        removerAllProductshandler={removerAllProductshandler}
        fetchInvoice={fetchInvoice}
      />

      <AddProduct
        showAddProductMenu={showAddProductMenu}
        showAddProductHandler={showAddProductHandler}
        addProductHandler={addProductHandler}
      />
    </>
  );
};

export default Home;
