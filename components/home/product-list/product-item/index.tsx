import * as Invoice from "../../../../shared/types";

import classes from "./product-item.module.css";

const ProductItem: React.FC<Invoice.Invoice.ProductsOptions> = ({
  index,
  id,
  title,
  price,
  quantity,
  total,
  description,
  removeProductHandler
}) => {
  const product = () => {
    return (
      <tr
        title="Click to remove the product."
        className={[classes.productItem, "hover"].join(" ")}
        onClick={() => removeProductHandler(id)}
      >
        <td>{index + 1}</td>

        <td>
          <p>{title}</p>
          <p>{description}</p>
        </td>

        <td>${price}</td>
        <td>{quantity}</td>
        <td>${total}</td>
      </tr>
    );
  };

  return product();
};

export default ProductItem;
