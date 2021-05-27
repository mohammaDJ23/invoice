import classes from "./spinner.module.css";

const Spinner: React.FC = () => {
  return (
    <div className={[classes.spinner, "position-fixed w-100 h-100"].join(" ")}>
      <div className={"spinner-border"} role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;
