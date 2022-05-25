const PlayerSeasonLeagueStatsBoard = (props) => {
  return (
    <div className="statsBoard">
      <h4>{props.name}</h4>
      <p>{props.appearences}</p>
      <p>{props.goals}</p>
      {props.assistPresent && <p>{props.assists}</p>}
      <p>{props.yellows}</p>
      <p>{props.reds}</p>
    </div>
  );
};

export default PlayerSeasonLeagueStatsBoard;
