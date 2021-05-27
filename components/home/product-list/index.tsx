import * as Invoice from "../../../shared/types";
import ProductItem from "./product-item";

import classes from "./product-list.module.css";

const ProductList: React.FC<Invoice.Invoice.ProductListOptions> = ({
  products,
  subTotal,
  total,
  tax,
  removeProductHandler
}) => {
  return (
    <table className={[classes.productListTable, "w-100"].join(" ")}>
      <thead>
        <tr>
          <th>NO.</th>
          <th>PRODUCT DESCRIPTION</th>
          <th>PRICE</th>
          <th>QTY</th>
          <th>TOTAl</th>
        </tr>
      </thead>

      {products.length === 0 && (
        <caption className="text-center">No products available here</caption>
      )}

      {products.length > 0 && (
        <tbody>
          {products.map((product, index) => {
            const prod = { ...product, index };

            return (
              <ProductItem
                key={product.id}
                {...prod}
                removeProductHandler={removeProductHandler}
              />
            );
          })}
        </tbody>
      )}

      {products.length > 0 && (
        <>
          <thead>
            <tr>
              <th>Subtotal:</th>
              <th>Tax(5%):</th>
              <th>Total:</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>${subTotal.toFixed(2)}</td>
              <td>${tax.toFixed(2)}</td>
              <td>${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </>
      )}
    </table>
  );
};

export default ProductList;
