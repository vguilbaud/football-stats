import classes from "./TeamStats.module.css";

const TeamStats = (props) => {
  return (
    <div>
      <ul className={classes.teamStats}>
        <li className={classes.statsMatch}>
          <span>Matchs</span>
          <span> {props.totalStats.matches}</span>
        </li>
        <li className={classes.statsGoal}>
          <span>Buts</span>
          <span> {props.totalStats.goals}</span>
        </li>
        <li className={classes.statsVictories}>
          <span>Victoires</span>
          <span> {props.totalStats.victories}</span>
        </li>
        <li className={classes.statsLoses}>
          <span>Défaites</span>
          <span> {props.totalStats.loses}</span>
        </li>
        <li className={classes.statsDraws}>
          <span>Matchs nuls</span>
          <span> {props.totalStats.draws}</span>
        </li>
      </ul>
    </div>
  );
};

export default TeamStats;
