import classes from "./PlayerTeams.module.css";
import { Link, useLocation } from "react-router-dom";

const PlayerTeams = (props) => {
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let URLseason = params.get("season");
  let allTeams = [];
  const allTeamsWithDuplicate = props.teams
    .map((transfert) => {
      let teams = [transfert.teams.in, transfert.teams.out];
      return [...teams];
    })
    .flat();
  allTeamsWithDuplicate.forEach((team) => {
    if (!allTeams.map((team) => team.name).includes(team.name)) {
      allTeams.push(team);
    }
  });

  return (
    <div className={classes.teamContent}>
      <h3>Les clubs où il a joué :</h3>
      <div className="listLeagueTeam" id="noMarginList">
        {allTeams.map((team, i) => {
          return (
            <Link
              style={{ textDecoration: "none" }}
              to={`/team/${team.id}?season=${URLseason ? URLseason : "2021"}`}
              key={`transfert${team.id}${i}`}
            >
              <div className="listItem">
                <img src={team.logo} alt={`${team.name} logo`} />
                <p>{team.name}</p>
                <div className="listArrow">
                  <div className="arrowFlex">{">"}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerTeams;
