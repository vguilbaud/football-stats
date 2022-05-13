import ButtonMenu from "./ButtonMenu";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const menuOption = ["teams", "leagues", "players"];

  return (
    <ul className={`centered ${classes.nav}`}>
      {menuOption.map((option) => {
        return <ButtonMenu key={option} title={option} />;
      })}
    </ul>
  );
};

export default MainNavigation;
