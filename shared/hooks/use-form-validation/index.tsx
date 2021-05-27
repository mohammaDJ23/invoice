import { useCallback, useEffect, useState } from "react";

import * as Invoice from "../../types";

export const useFormValidation = (): Invoice.Invoice.UseFormValidationStateOptions => {
  const [
    { inputs, isFormValid },
    setState
  ] = useState<Invoice.Invoice.UseFormValidationStateOptions>({
    inputs: {},
    isFormValid: false
  });

  const onInput = useCallback(
    ({ name, value, isValid }: Invoice.Invoice.OnInputOptions) => {
      setState(prevState => {
        if (!prevState.inputs[name]) {
          prevState.inputs[name] = {
            value,
            isValid
          };
        }

        let isFormValid = true;

        for (const key in prevState.inputs) {
          if (key === name) {
            isFormValid = isFormValid && isValid;
          } else {
            isFormValid = isFormValid && prevState.inputs[key].isValid;
          }
        }

        return {
          ...prevState,

          inputs: {
            ...prevState.inputs,

            [name]: {
              ...prevState.inputs[name],
              value,
              isValid
            }
          },

          isFormValid
        };
      });
    },
    []
  );

  const removeAllInputsValueHandler = useCallback(() => {
    setState(prevState => {
      return {
        inputs: {},
        isFormValid: false
      };
    });
  }, []);

  const formSwitchHandler = useCallback((isLogin: boolean) => {
    setState(prevState => {
      const newState = { ...prevState };

      if (isLogin) {
        delete newState.inputs[Invoice.Invoice.InputNameOptions.NAME];

        newState.isFormValid =
          newState.inputs[Invoice.Invoice.InputNameOptions.EMAIL].isValid &&
          newState.inputs[Invoice.Invoice.InputNameOptions.PASSWORD].isValid;
      } else {
        newState.inputs[Invoice.Invoice.InputNameOptions.NAME].value = "";
        newState.inputs[Invoice.Invoice.InputNameOptions.NAME].isValid = false;
        newState.isFormValid = false;
      }

      return newState;
    });
  }, []);

  return {
    inputs,
    isFormValid,
    onInput,
    removeAllInputsValueHandler,
    formSwitchHandler
  };
};
