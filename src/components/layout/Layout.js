import Footer from "./Footer";
import Header from "./Header";
import classes from "./Layout.module.css";
// import Authentication from "./Authentication";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <main className={classes.mainContent}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
