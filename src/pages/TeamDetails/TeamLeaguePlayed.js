import classes from "./TeamLeaguePlayed.module.css";
import { NavLink } from "react-router-dom";

const TeamLeaguePlayed = (props) => {
  return (
    <div>
      {props.leagues.map((league) => {
        return (
          <NavLink
            to={`/league/${league.id}?season=${props.season}`}
            className={classes.leagueMiniInfo}
            key={`teamLeague${league.id}`}
          >
            <img
              className={classes.image}
              src={league.logo}
              alt={`${league.name} logo`}
            />
            <p>{league.name}</p>
          </NavLink>
        );
      })}
    </div>
  );
};

export default TeamLeaguePlayed;
