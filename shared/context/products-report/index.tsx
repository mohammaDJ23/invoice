import React, { createContext, useCallback, useState } from "react";

import * as Invoice from "../../types";

export const ProductsReportContext = createContext<Invoice.Invoice.ProductsReportContextOptions>(
  {
    products: [],
    productsReportHandler: (products: Invoice.Invoice.ProductsOptions[]) => {}
  }
);

const ProductsReportProvider: React.FC = ({ children }) => {
  const [products, setProdcuts] = useState<Invoice.Invoice.ProductsOptions[]>([]);

  const productsReportHandler = useCallback(
    (products: Invoice.Invoice.ProductsOptions[]) => setProdcuts(products),
    []
  );

  return (
    <ProductsReportContext.Provider value={{ products, productsReportHandler }}>
      {children}
    </ProductsReportContext.Provider>
  );
};

export default ProductsReportProvider;
