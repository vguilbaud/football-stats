import classes from "./PlayerTeams.module.css";

const PlayerTeams = (props) => {
  const comingTeams = props.teams.map((transfert) => transfert.teams);
  console.log(props.teams);
  return (
    <div>
      <h3>Teams Played</h3>
      <div className={classes.teamBoard}>
        {comingTeams.map((team, i) => {
          return (
            <div key={`transfert${team.in.id}${team.out.id}${i}`}>
              <img src={team.in.logo} alt={`${team.in.name} logo`} />
              <p>{team.in.name}</p>
            </div>
          );
        })}
        <div key={`transfert${comingTeams[comingTeams.length - 1].out.id}`}>
          <img
            src={comingTeams[comingTeams.length - 1].out.logo}
            alt={`${comingTeams[comingTeams.length - 1].out.name} logo`}
          />
          <p>{comingTeams[comingTeams.length - 1].out.name}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerTeams;
