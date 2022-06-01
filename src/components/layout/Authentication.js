import { useState } from "react";
import ConnectionModal from "../UI/ConnectionModal";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

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
    <div>
      {!authCtx.isLoggedIn && (
        <div>
          <button onClick={openSigningModal}>Sign Up</button>
          <button onClick={openLoggingModal}>Login</button>
          {connectionModalOpened && (
            <ConnectionModal
              switchSigning={switchSigning}
              removeModal={removeModal}
              signing={isSigning}
            />
          )}
        </div>
      )}
      {authCtx.isLoggedIn && (
        <div>
          <button onClick={authCtx.logout}>Logout</button>
          <p>Salut, {authCtx.name}!</p>
        </div>
      )}
    </div>
  );
};

export default Authentication;
