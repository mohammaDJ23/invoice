import { useContext, useEffect } from "react";
import { ErrorContext } from "../../context/error";
import { ModalContext } from "../../context/modal";

import * as Invoice from "../../types";

import classes from "./modal.module.css";

const Modal: React.FC<Invoice.Invoice.ModalOptions> = ({ action, content }) => {
  const { modalHandler, isShow } = useContext(ModalContext);
  const { errorHandler } = useContext(ErrorContext);

  useEffect(() => {
    if (!isShow) {
      return;
    }

    setTimeout(() => {
      modalHandler(false);
      errorHandler("");
    }, 4000);
  }, [modalHandler, isShow]);

  return (
    <div
      className={[
        classes.modal,
        "position-fixed",
        action === "success" ? classes.green : classes.red,
        isShow ? classes.show : classes.hide
      ].join(" ")}
    >
      {content}
    </div>
  );
};

export default Modal;
