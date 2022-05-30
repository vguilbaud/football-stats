import { Fragment } from "react";
import Login from "./Login";

const Layout = (props) => {
  return (
    <Fragment>
      <Login />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
