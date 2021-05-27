import { useEffect, useState } from "react";

import * as Invoice from "../../types";
import { validation } from "../../../lib/validation";

import classes from "./input.module.css";

const Input: React.FC<Invoice.Invoice.InputOptions> = ({
  type,
  placeholder,
  name,
  errorText,
  isSmall,
  inputs,
  onInput
}) => {
  const [{ value, isValid }, setValue] = useState({ value: "", isValid: false });

  useEffect(() => {
    onInput({ value, isValid, name });
  }, [onInput, value, isValid, name]);

  useEffect(() => {
    if (!(inputs && Object.getOwnPropertyNames(inputs).length === 0)) {
      return;
    }

    setValue({
      value: "",
      isValid: false
    });
  }, [inputs]);

  return (
    <div>
      <input
        className={[
          classes.input,
          !isValid && value.length > 0 && classes.inputInvalid,
          isSmall && classes.smallInput
        ].join(" ")}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={event =>
          setValue(prevState => ({
            value: event.target.value,
            isValid: validation({ name, value: event.target.value })
          }))
        }
      />

      {!isValid && value.length > 0 && !isSmall && (
        <p className={classes.errorText}>{errorText}</p>
      )}
    </div>
  );
};

export default Input;
