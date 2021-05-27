import { MouseEvent } from "react";

import * as Invoice from "../../types";

import classes from "./button.module.css";

const Button: React.FC<Invoice.Invoice.ButtonOptions> = ({
  style,
  label,
  disabled,
  onClick
}) => {
  return (
    <button
      className={[classes.button, disabled && classes.disabled].join(" ")}
      style={style}
      disabled={disabled && disabled}
      onClick={(event: MouseEvent) => {
        event.preventDefault();
        onClick();
      }}
    >
      {label}
    </button>
  );
};

export default Button;
