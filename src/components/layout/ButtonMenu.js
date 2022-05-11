import classes from "./ButtonMenu.module.css";

const ButtonMenu = (props) => {
  return <h2 className={`${classes.buttonMenu} centered`}>{props.title}</h2>;
};

export default ButtonMenu;
