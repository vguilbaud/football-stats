import classes from "./TeamStats.module.css";

const TeamStats = (props) => {
  return (
    <div>
      <ul className={classes.teamStats}>
        <li className={classes.statsMatch}>
          <span className={classes.statsNumber}>
            {props.totalStats.matches}
          </span>
          <span>Matchs</span>
        </li>
        <li className={classes.statsGoal}>
          <span className={classes.statsNumber}> {props.totalStats.goals}</span>
          <span>Buts</span>
        </li>
        <li className={classes.statsVictories}>
          <span className={classes.statsNumber}>
            {props.totalStats.victories}
          </span>
          <span>Victoires</span>
        </li>
        <li className={classes.statsLoses}>
          <span className={classes.statsNumber}> {props.totalStats.loses}</span>
          <span>Défaites</span>
        </li>
        <li className={classes.statsDraws}>
          <span className={classes.statsNumber}> {props.totalStats.draws}</span>
          <span>Matchs nuls</span>
        </li>
      </ul>
    </div>
  );
};

export default TeamStats;
