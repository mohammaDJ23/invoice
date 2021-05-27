import { FormEvent, useEffect, useRef } from "react";
import { useFormValidation } from "../../hooks/use-form-validation";
import * as Invoice from "../../types";
import Backdrop from "../backdrop";
import Button from "../button";
import Input from "../input";

import classes from "./add-product.module.css";

const AddProduct: React.FC<Invoice.Invoice.AddProductOptions> = ({
  showAddProductMenu,
  showAddProductHandler,
  addProductHandler
}) => {
  const {
    onInput,
    isFormValid,
    inputs,
    removeAllInputsValueHandler
  } = useFormValidation();

  const onSubmitHandler = () => {
    addProductHandler(inputs, () => {
      removeAllInputsValueHandler();
    });
  };

  return (
    <>
      {showAddProductMenu && <Backdrop onClick={showAddProductHandler} />}

      <div
        className={[classes.addProduct, "position-fixed h-100"].join(" ")}
        style={{
          right: showAddProductMenu ? "0" : "-200%",
          transition: showAddProductMenu ? "0.3s" : "0.8s"
        }}
      >
        <h6 className="text-center mb-5">
          <b>ADD PRODUCT</b>
        </h6>

        <form
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            onSubmitHandler();
          }}
        >
          <Input
            type="text"
            placeholder={Invoice.Invoice.InputNameOptions.TITLE}
            name={Invoice.Invoice.InputNameOptions.TITLE}
            inputs={inputs}
            errorText="The title should be between 3 - 30 characters and only the letters of the alphabet are allowed."
            onInput={onInput}
          />

          <Input
            type="text"
            placeholder={Invoice.Invoice.InputNameOptions.DESCRIPTION}
            name={Invoice.Invoice.InputNameOptions.DESCRIPTION}
            inputs={inputs}
            errorText="The description should be between 3 - 50 characters and only the letters of the alphabet are allowed."
            onInput={onInput}
          />

          <Input
            type="text"
            placeholder={Invoice.Invoice.InputNameOptions.PRICE}
            name={Invoice.Invoice.InputNameOptions.PRICE}
            inputs={inputs}
            errorText="The price should be between 1 - 2000 characters and it could be up to two decimal places."
            onInput={onInput}
          />

          <Input
            type="text"
            placeholder={Invoice.Invoice.InputNameOptions.QUANTITY}
            name={Invoice.Invoice.InputNameOptions.QUANTITY}
            inputs={inputs}
            errorText="The quantity should be between 1 - 10 characters."
            onInput={onInput}
          />

          <Button
            label="Add to invoice"
            type="submit"
            disabled={!isFormValid}
            onClick={() => onSubmitHandler()}
          />
        </form>
      </div>
    </>
  );
};

export default AddProduct;
