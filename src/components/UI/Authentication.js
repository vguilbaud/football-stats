import { useState } from "react";
import ConnectionModal from "./ConnectionModal";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Authentication.module.css";

const Authentication = (props) => {
  const [connectionModalOpened, setConnectionModalOpened] = useState(false);
  const [isSigning, setIsSigning] = useState();

  const authCtx = useContext(AuthContext);

  const openSigningModal = () => {
    setIsSigning(true);
    setConnectionModalOpened(true);
  };
  const openLoggingModal = () => {
    setIsSigning(false);
    setConnectionModalOpened(true);
  };

  const removeModal = () => {
    setConnectionModalOpened(false);
  };

  const switchSigning = () => {
    if (isSigning) {
      setIsSigning(false);
    } else setIsSigning(true);
  };

  return (
    <div className={classes.whole}>
      {!authCtx.isLoggedIn && (
        <div className={classes.buttonFlex}>
          <button className="button" onClick={openSigningModal}>
            S'enregister
          </button>
          <button className="button" onClick={openLoggingModal}>
            Connexion
          </button>
          {connectionModalOpened && (
            <ConnectionModal
              switchSigning={switchSigning}
              removeModal={removeModal}
              signing={isSigning}
            />
          )}
          <p>Connectez vous pour ajouter des commentaires</p>
        </div>
      )}
      {authCtx.isLoggedIn && (
        <div className={classes.loggedIn}>
          <button className="button" onClick={authCtx.logout}>
            Logout
          </button>
          <p>Salut, {authCtx.name}!</p>
        </div>
      )}
    </div>
  );
};

export default Authentication;
