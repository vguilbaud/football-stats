import classes from "./Header.module.css";
import Logo from "../../images/footstatsLogo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="top" className={classes.header}>
      <Link to={"/home"}>
        <img src={Logo} alt="Logo footstats" />
      </Link>
      <Link to={"/home#anchorLeague"}>
        <button className="button">Rechercher des stats</button>
      </Link>
    </header>
  );
};

export default Header;
