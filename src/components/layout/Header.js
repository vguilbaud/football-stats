import classes from "./Header.module.css";
import Logo from "../../images/footstatsLogo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={classes.header}>
      <Link to={"/home"}>
        <img src={Logo} alt="Logo footstats" />
      </Link>
      <Link to={"/home#anchorLeague"}>
        <button>Rechercher des stats</button>
      </Link>
    </div>
  );
};

export default Header;
