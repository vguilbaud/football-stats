import { useState } from "react";
import ConnectionModal from "../UI/Connection";

const Login = (props) => {
  const [connectionModalOpened, setConnectionModalOpened] = useState(false);

  const openModal = () => {
    setConnectionModalOpened(true);
  };

  const removeModal = () => {
    setConnectionModalOpened(false);
  };

  return (
    <div>
      <button onClick={openModal}>Login</button>
      {connectionModalOpened && <ConnectionModal removeModal={removeModal} />}
    </div>
  );
};

export default Login;
