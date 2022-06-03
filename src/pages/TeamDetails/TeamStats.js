const TeamStats = (props) => {
  return (
    <div>
      <ul>
        <li>Matches: {props.totalStats.matches}</li>
        <li>Wins: {props.totalStats.victories}</li>
        <li>Draws: {props.totalStats.draws}</li>
        <li>Loses: {props.totalStats.loses}</li>
        <li>Goals: {props.totalStats.goals}</li>
      </ul>
    </div>
  );
};

export default TeamStats;
