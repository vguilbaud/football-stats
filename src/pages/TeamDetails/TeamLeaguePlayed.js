import classes from "./TeamLeaguePlayed.module.css";

const TeamLeaguePlayed = (props) => {
  return (
    <div className="centered">
      {props.leagues.map((league) => {
        return (
          <div
            className={classes.leagueMiniInfo}
            key={`teamLeague${league.id}`}
          >
            <img
              className={classes.image}
              src={league.logo}
              alt={`${league.name} logo`}
            />
            <p>{league.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TeamLeaguePlayed;
