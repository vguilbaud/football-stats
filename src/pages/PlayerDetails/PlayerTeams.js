import classes from "./PlayerTeams.module.css";
import { NavLink } from "react-router-dom";

const PlayerTeams = (props) => {
  const comingTeams = props.teams.map((transfert) => transfert.teams);
  return (
    <div>
      <h3>Teams Played</h3>
      <div className={classes.teamBoard}>
        {comingTeams.map((team, i) => {
          return (
            <NavLink
              to={`/team/${team.in.id}`}
              key={`transfert${team.in.id}${team.out.id}${i}`}
            >
              <img src={team.in.logo} alt={`${team.in.name} logo`} />
              <p>{team.in.name}</p>
            </NavLink>
          );
        })}
        <NavLink
          to={`/team/${comingTeams[comingTeams.length - 1].out.id}`}
          key={`transfert${comingTeams[comingTeams.length - 1].out.id}`}
        >
          <img
            src={comingTeams[comingTeams.length - 1].out.logo}
            alt={`${comingTeams[comingTeams.length - 1].out.name} logo`}
          />
          <p>{comingTeams[comingTeams.length - 1].out.name}</p>
        </NavLink>
      </div>
    </div>
  );
};

export default PlayerTeams;
