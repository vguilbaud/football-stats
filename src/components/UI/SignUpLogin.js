import { useRef, useState } from "react";
import classes from "./Connection.module.css";

const SignUpLogin = (props) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [errorMessage, setErrorMessage] = useState({ message: "", type: "" });

  const checkEmail = () => {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRef.current.value.match(validRegex)) {
      setErrorMessage({ message: "Please enter a valid email", type: "email" });
    } else {
      setErrorMessage({ message: "", type: "" });
    }
  };

  const checkPassword = () => {
    if (passwordRef.current.value === "") {
      setErrorMessage({ message: "Please enter a password", type: "password" });
    } else if (
      /^[A-Za-z0-9]*$/.test(passwordRef.current.value) ||
      /\s/g.test(passwordRef.current.value)
    ) {
      setErrorMessage({
        message: "Password should only contains numbers and letters",
        type: "password",
      });
    } else if (
      passwordRef.current.value.length < 8 ||
      passwordRef.current.value.length > 20
    ) {
      setErrorMessage({
        message: "Password should be between 8 and 20 characters",
        type: "password",
      });
    } else {
      setErrorMessage({ message: "", type: "" });
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    checkEmail();
    if (errorMessage.message.length === 0) {
      checkPassword();
    }
    if (errorMessage.message.length === 0) {
      if (!props.signing) {
        fetch("http://localhost:4200/auth/login", {
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.error) {
              setErrorMessage({ message: response.error, type: response.type });
            } else {
              console.log(response);
              localStorage.setItem("user", JSON.stringify(response));
              emailRef.current.value = "";
              passwordRef.current.value = "";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        fetch("http://localhost:4200/auth/signup", {
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.error) {
              setErrorMessage({ message: response.error, type: response.type });
            } else {
              console.log(response);
              emailRef.current.value = "";
              passwordRef.current.value = "";
            }
          })
          .catch((err) =>
            setErrorMessage({ message: err.error, type: err.type })
          );
      }
    }
  };

  return (
    <div className={classes.modal}>
      <button onClick={props.removeModal}>Back</button>
      <button onClick={props.switchSigning}>
        {props.signing ? "Login" : "Sign Up"}
      </button>
      <h3>{props.signing ? "Sign Up" : "Login"}</h3>
      <p>
        {props.signing ? "Create your account" : "Login"} to be able to write
        comments
      </p>
      <form onSubmit={handleForm}>
        <div className={classes.control}>
          <label htmlFor="email">{props.signing && "Insert your "}Email</label>
          <input
            onBlur={checkEmail}
            type="email"
            id="email"
            ref={emailRef}
            required
          />
          {errorMessage.type === "email" ? (
            <p className={classes.error}>{errorMessage.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">
            {props.signing && "Create your "}Password
          </label>
          <input
            onBlur={checkPassword}
            type="password"
            id="password"
            ref={passwordRef}
            required
          />
          {errorMessage.type === "password" ? (
            <p className={classes.error}>{errorMessage.message}</p>
          ) : (
            ""
          )}
        </div>
        <button>{props.signing ? "Sign Up" : "Login"}</button>
      </form>
    </div>
  );
};

export default SignUpLogin;
