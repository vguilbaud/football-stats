import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  name: "",
  userId: "",
  commentsIds: [],
  login: (userGiven) => {},
  logout: () => {},
  addComment: (comment) => {},
  deleteComment: (commentId) => {},
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

  const addCommentHandler = (comment) => {
    let newUser = user;
    newUser.commentsIds.push(comment);
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const deleteCommentHandler = (commentId) => {
    let newUser = user;
    let array = user.commentsIds;
    let index = array.indexOf(commentId);
    if (index > -1) {
      array.splice(index, 1);
    }
    newUser.comments = array;
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const contextValue = {
    token: user?.token,
    name: user?.name,
    userId: user?.userId,
    commentsIds: user?.commentsIds,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    addComment: addCommentHandler,
    deleteComment: deleteCommentHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
