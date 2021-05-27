import { useCallback, useContext, useEffect, useState } from "react";

import * as Invoice from "../../types";
import { ModalContext } from "../../context/modal";
import { ErrorContext } from "../../context/error";

export const fetchData = () => {
  const [{ loading, data }, setValue] = useState({
    loading: false,
    data: ""
  });

  const { modalHandler } = useContext(ModalContext);
  const { errorHandler, error } = useContext(ErrorContext);

  const fetchInvoice: Invoice.Invoice.FetchDataHandlerOptions = useCallback(
    async (url, method, data) => {
      try {
        modalHandler(false);

        setValue(prevState => ({
          ...prevState,
          loading: true,
          data: ""
        }));

        const response = await fetch(url, {
          method,
          body: method === "POST" && JSON.stringify(data),

          headers: {
            "Content-Type": "application/json"
          }
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error);
        }

        setValue(prevState => ({
          ...prevState,
          loading: false,
          data: responseData.data
        }));

        modalHandler(true);

        return response;
      } catch (error) {
        setValue(prevState => ({
          ...prevState,
          loading: false,
          data: ""
        }));

        errorHandler(error.message);
        modalHandler(true);
      }
    },

    [modalHandler, errorHandler]
  );

  useEffect(() => {
    if (error) {
      setValue(prevState => {
        return {
          ...prevState,
          loading: false,
          data: ""
        };
      });
    }
  }, [error]);

  return { fetchInvoice, loading, data };
};
