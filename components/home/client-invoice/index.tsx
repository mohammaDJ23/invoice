import { FormEvent } from "react";

import { useFormValidation } from "../../../shared/hooks/use-form-validation";
import Input from "../../../shared/ui/input";
import * as Invoice from "../../../shared/types";
import Button from "../../../shared/ui/button";

import classes from "./client-invoice.module.css";

const ClientInvoice: React.FC<Invoice.Invoice.ClientInvoiceOptions> = ({
  products,
  subTotal,
  tax,
  total,
  loading,
  fetchInvoice,
  removerAllProductshandler
}) => {
  const {
    onInput,
    isFormValid,
    inputs,
    removeAllInputsValueHandler
  } = useFormValidation();

  const onSubmitHandler = async () => {
    const data = {
      products,

      invoice: {
        name: inputs?.name.value,
        email: inputs?.email.value,
        address: inputs?.address.value
      },

      subTotal: subTotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2)
    };

    const response = await fetchInvoice("/api/create-invoice", "POST", data);

    if (!response) {
      return;
    }

    removerAllProductshandler();
    removeAllInputsValueHandler();
  };

  return (
    <div className={[classes.clientInvoice, "my-5"].join(" ")}>
      <div>
        <h3 className="mb-4">Thank You For Your Business</h3>
      </div>

      <div>
        <p>For:</p>

        <form
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            onSubmitHandler();
          }}
        >
          <div>
            <div className="d-flex">
              <b>Name:</b>

              <Input
                type="text"
                name={Invoice.Invoice.InputNameOptions.NAME}
                isSmall={true}
                onInput={onInput}
                inputs={inputs}
              />
            </div>

            <div className="d-flex">
              <b>Email:</b>

              <Input
                type="text"
                name={Invoice.Invoice.InputNameOptions.EMAIL}
                isSmall={true}
                onInput={onInput}
                inputs={inputs}
              />
            </div>

            <div className="d-flex">
              <b>Address:</b>

              <Input
                type="text"
                name={Invoice.Invoice.InputNameOptions.ADDRESS}
                isSmall={true}
                onInput={onInput}
                inputs={inputs}
              />
            </div>
          </div>

          <Button
            type="submit"
            label="SAVE INVOICE"
            style={{ marginTop: "20px" }}
            disabled={!(isFormValid && products.length > 0) || loading}
            onClick={() => onSubmitHandler()}
          />
        </form>
      </div>
    </div>
  );
};

export default ClientInvoice;
