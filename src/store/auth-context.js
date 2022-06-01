import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  name: "",
  userId: "",
  commentsIds: [],
  login: (token, userId, name, comments) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const userStored = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(userStored);

  const userIsLoggedIn = !!user?.token;

  const loginHandler = (userGiven) => {
    setUser(userGiven);
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setUser({});
  };

  const contextValue = {
    token: user?.token,
    name: user?.name,
    userId: user?.userId,
    commentsIds: user?.commentsIds,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
