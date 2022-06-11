import classes from "./Header.module.css";
import Logo from "../../images/footstatsLogo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const getStats = () => {
    document.getElementById("stats").scrollIntoView();
  };

  return (
    <header id="top" className={classes.header}>
      <div className={classes.headerContent}>
        <Link to={"/home"}>
          <img src={Logo} alt="Logo footstats" />
        </Link>
        <div onClick={getStats}>
          <button className="button">Rechercher des stats</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
