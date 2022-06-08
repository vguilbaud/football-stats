import Header from "./Header";
import classes from "./Layout.module.css";
// import Authentication from "./Authentication";

const Layout = (props) => {
  return (
    <div>
      {/* <Authentication /> */}
      <Header />
      <main className={classes.mainContent}>{props.children}</main>
    </div>
  );
};

export default Layout;
