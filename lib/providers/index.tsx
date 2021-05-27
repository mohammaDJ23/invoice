import ErrorProvider from "../../shared/context/error";
import ModalProvider from "../../shared/context/modal";
import ProductsReportProvider from "../../shared/context/products-report";

const Providers: React.FC = ({ children }) => {
  return (
    <ProductsReportProvider>
      <ModalProvider>
        <ErrorProvider>{children}</ErrorProvider>
      </ModalProvider>
    </ProductsReportProvider>
  );
};

export default Providers;
