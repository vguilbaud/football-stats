import { useRef } from "react";
import classes from "./Connection.module.css";

const SignUp = (props) => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const passwordCheckRef = useRef("");

  const handleForm = (e) => {
    e.preventDefault();
    console.log(usernameRef.current.value);
  };

  return (
    <div className={classes.modal}>
      <button onClick={props.removeModal}>Back</button>
      <p>Sign Up to be able to write comments</p>
      <form onSubmit={handleForm}>
        <div className={classes.control}>
          <label htmlFor="username">UserName</label>
          <input type="text" id="username" ref={usernameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="passwordCheck">Confirm password</label>
          <input type="password" id="passwordCheck" ref={passwordCheckRef} />
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
