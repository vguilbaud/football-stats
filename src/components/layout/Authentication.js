import { useState } from "react";
import ConnectionModal from "../UI/ConnectionModal";

const Authentication = (props) => {
  const [connectionModalOpened, setConnectionModalOpened] = useState(false);
  const [isSigning, setIsSigning] = useState();

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
  );
};

export default Authentication;
