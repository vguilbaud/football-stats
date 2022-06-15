import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.box}>
      <div className={classes.shadow}></div>
      <div className={classes.gravity}>
        <div className={classes.ball}></div>
      </div>
    </div>
  );
};

export default Loader;
