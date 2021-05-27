import classes from "./container.module.css";

const Container: React.FC = ({ children }) => (
  <div className={classes.container}>{children}</div>
);

export default Container;
