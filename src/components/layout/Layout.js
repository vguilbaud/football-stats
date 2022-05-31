import { Fragment } from "react";
import Authentication from "./Authentication";

const Layout = (props) => {
  return (
    <Fragment>
      <Authentication />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
