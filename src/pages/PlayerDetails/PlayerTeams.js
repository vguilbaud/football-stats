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
    <div>
      <h3>Teams Played</h3>
      <div className={classes.teamBoard}>
        {allTeams.map((team, i) => {
          return (
            <Link
              to={`/team/${team.id}?season=${URLseason ? URLseason : "2021"}`}
              key={`transfert${team.id}${i}`}
            >
              <img src={team.logo} alt={`${team.name} logo`} />
              <p>{team.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerTeams;
