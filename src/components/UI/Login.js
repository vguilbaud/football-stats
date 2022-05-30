import classes from "./Connection.module.css";

const Login = (props) => {
  return (
    <div className={classes.modal}>
      <button onClick={props.removeModal}>close</button>
    </div>
  );
};

export default Login;
