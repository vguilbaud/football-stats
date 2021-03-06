import ReactDom from "react-dom";
import SignUpLogin from "./SignUpLogin";
import classes from "./Connection.module.css";

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.removeModal}></div>;
};

const ConnectionModal = (props) => {
  const isLoggedIn = false;

  return (
    <div>
      {ReactDom.createPortal(
        <BackDrop removeModal={props.removeModal} />,
        document.getElementById("backdrop-root")
      )}
      {!isLoggedIn &&
        ReactDom.createPortal(
          <SignUpLogin
            switchSigning={props.switchSigning}
            signing={props.signing}
            removeModal={props.removeModal}
          />,
          document.getElementById("overlay-root")
        )}
    </div>
  );
};

export default ConnectionModal;
