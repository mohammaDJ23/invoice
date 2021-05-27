import * as Invoice from "../../types";

import classes from "./backdrop.module.css";

const Backdrop: React.FC<Invoice.Invoice.BackDropOptions> = ({ onClick }) => {
  return (
    <div
      className={[classes.backdrop, "position-fixed w-100 h-100"].join(" ")}
      onClick={() => onClick()}
    ></div>
  );
};

export default Backdrop;
