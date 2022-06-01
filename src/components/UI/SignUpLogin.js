import { useRef, useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Connection.module.css";

const SignUpLogin = (props) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [errorMessage, setErrorMessage] = useState({ message: "", type: "" });

  const authCtx = useContext(AuthContext);

  const handleSwitching = () => {
    setErrorMessage({ message: "", type: "" });
    props.switchSigning();
  };
  const checkEmail = () => {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRef.current.value.match(validRegex)) {
      return {
        message: "Please enter a valid email",
        type: "email",
      };
    }
    return;
  };

  const checkPassword = () => {
    if (passwordRef.current.value === "") {
      return {
        message: "Please enter a password",
        type: "password",
      };
    } else if (
      !/^[A-Za-z0-9]*$/.test(passwordRef.current.value) ||
      /\s/g.test(passwordRef.current.value)
    ) {
      return {
        message: "Password should only contains numbers and letters",
        type: "password",
      };
    } else if (
      passwordRef.current.value.length < 8 ||
      passwordRef.current.value.length > 20
    ) {
      return {
        message: "Password should be between 8 and 20 characters",
        type: "password",
      };
    }
    return;
  };

  const login = () => {
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
          localStorage.setItem("user", JSON.stringify(response));
          authCtx.login(response);
          props.removeModal();
          emailRef.current.value = "";
          passwordRef.current.value = "";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleForm = (e) => {
    e.preventDefault();
    let emailError = checkEmail();
    let passwordError = checkPassword();
    if (emailError) {
      setErrorMessage(emailError);
      return;
    }
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }
    if (!passwordError && !emailError) {
      setErrorMessage({ message: "", type: "" });
    }

    if (errorMessage.message.length === 0) {
      if (!props.signing) {
        login();
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
              login();
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
      <button onClick={handleSwitching}>
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
          <input type="email" id="email" ref={emailRef} required />
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
          <input type="password" id="password" ref={passwordRef} required />
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
