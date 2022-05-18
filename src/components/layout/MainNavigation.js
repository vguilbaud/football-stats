import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  const menuOption = ["teams", "players"];

  return (
    <ul className={`centered ${classes.nav}`}>
      {menuOption.map((option) => {
        return (
          <NavLink
            to={`/${option}`}
            key={option}
            activeClassName={classes.active}
          >
            {option}
          </NavLink>
        );
      })}
    </ul>
  );
};

export default MainNavigation;
