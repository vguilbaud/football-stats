import { Link } from "react-router-dom";
import classes from "./LeagueListItem.module.css";

const LeagueListItem = (props) => {
  return (
    <Link to={`/league/${props.league.id}`}>
      <img
        src={props.league.logo}
        alt={`${props.league.name} logo`}
        className={classes.img}
      />
      <p>{props.league.name}</p>
    </Link>
  );
};

export default LeagueListItem;
