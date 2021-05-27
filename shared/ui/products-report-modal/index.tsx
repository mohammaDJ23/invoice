import { useContext } from "react";
import { ProductsReportContext } from "../../context/products-report";
import * as Invoice from "../../types";

import classes from "./products-report-modal.module.css";

const ProductsReportModal: React.FC<Invoice.Invoice.ProductsReportModalOptions> = ({
  products
}) => {
  const { productsReportHandler } = useContext(ProductsReportContext);

  return (
    <div
      className={[classes.productsReportModal, "position-fixed w-100 h-100"].join(
        " "
      )}
      onClick={() => productsReportHandler([])}
    >
      <div>
        <table className="w-100">
          <thead>
            <tr>
              <th>NO.</th>
              <th>PRODUCT DESCRIPTION</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product._id.toString()}>
                <td>{index + 1}</td>

                <td>
                  <p>{product.title}</p>
                  <p>{product.description}</p>
                </td>

                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>${product.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsReportModal;
