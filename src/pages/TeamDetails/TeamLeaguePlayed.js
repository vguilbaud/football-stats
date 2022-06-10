import { Link } from "react-router-dom";

const TeamLeaguePlayed = (props) => {
  return (
    <div className="listLeagueTeam">
      {props.leagues.map((league) => {
        return (
          <Link
            style={{ textDecoration: "none" }}
            to={`/league/${league.id}?season=${props.season}`}
            className="listItem"
            key={`teamLeague${league.id}`}
          >
            <img src={league.logo} alt={`${league.name} logo`} />
            <p>{league.name}</p>
            <div className="listArrow">
              <div className="arrowFlex">{">"}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TeamLeaguePlayed;
