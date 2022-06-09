import classes from "./PlayerTeams.module.css";
import { Link } from "react-router-dom";

const PlayerTeams = (props) => {
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
            <Link to={`/team/${team.id}`} key={`transfert${team.id}${i}`}>
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
