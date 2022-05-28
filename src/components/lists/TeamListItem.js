import { Link } from "react-router-dom";
import classes from "./TeamListItem.module.css";

const TeamListItem = (props) => {
  return (
    <Link to={`/team/${props.team.id}?season=${props.season}`}>
      <img
        src={props.team.logo}
        alt={`${props.team.name} logo`}
        className={classes.logo}
      />
      <p>{props.team.name}</p>
    </Link>
  );
};

export default TeamListItem;
