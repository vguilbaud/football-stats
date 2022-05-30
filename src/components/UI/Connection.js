import ReactDom from "react-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import classes from "./Connection.module.css";

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.removeModal}></div>;
};

const ConnectionModal = (props) => {
  const isLoggedIn = true;

  return (
    <div>
      {ReactDom.createPortal(
        <BackDrop removeModal={props.removeModal} />,
        document.getElementById("backdrop-root")
      )}
      {!isLoggedIn &&
        ReactDom.createPortal(
          <SignUp removeModal={props.removeModal} />,
          document.getElementById("overlay-root")
        )}
      {isLoggedIn &&
        ReactDom.createPortal(
          <Login removeModal={props.removeModal} />,
          document.getElementById("overlay-root")
        )}
    </div>
  );
};

export default ConnectionModal;
