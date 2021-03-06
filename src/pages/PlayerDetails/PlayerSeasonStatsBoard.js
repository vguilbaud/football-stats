import PlayerStatsLine from "../../components/UI/PlayerStatsLine";
import classes from "./PlayerSeasonStatsBoard.module.css";

const PlayerSeasonStatsBoard = (props) => {
  return (
    <div className={classes.statContent}>
      <div>
        <ul className={classes.playerStats}>
          <li className={classes.statsMatch}>
            <span className={classes.statsNumber}>
              {props.season.totalYear.appearences}
            </span>
            <span>Matchs</span>
          </li>
          <li className={classes.statsGoal}>
            <span className={classes.statsNumber}>
              {" "}
              {props.season.totalYear.goals}
            </span>
            <span>Buts</span>
          </li>
          <li className={classes.statsAssists}>
            <span className={classes.statsNumber}>
              {props.season.totalYear.assists}
            </span>
            <span>Assists</span>
          </li>
          <li className={classes.statsYellows}>
            <span className={classes.statsNumber}>
              {" "}
              {props.season.totalYear.yellows}
            </span>
            <span>Cartons jaunes</span>
          </li>
          <li className={classes.statsReds}>
            <span className={classes.statsNumber}>
              {" "}
              {props.season.totalYear.reds}
            </span>
            <span>Cartons rouges</span>
          </li>
        </ul>
      </div>
      <h3 id="stats">Stats saison {props.season.year}</h3>
      <div className={`statsBoard statsBoardTitle`}>
        <p className="statsBoardPlayer">Compétition</p>
        <div className="borderStats"></div>
        <p className="statsBoardMatches">Matchs</p>
        <div className="borderStats"></div>
        <p className="statsBoardGoals">Buts</p>
        <div className="borderStats"></div>
        <p className="statsBoardAssists">Assists</p>
        <div className="statsBoardCardsInvisible borderStats"></div>
        <div className="statsBoardCardsInvisible statsBoardCard">
          <div className="cardFlex">
            <div className="card yellowCard"></div>
          </div>
        </div>
        <div className="statsBoardCardsInvisible borderStats"></div>
        <div className="statsBoardCardsInvisible statsBoardCard">
          <div className="cardFlex">
            <div className="card redCard"></div>
          </div>
        </div>
      </div>
      <div>
        {props.season.statsLeague.map((league) => {
          return (
            <PlayerStatsLine
              link={
                league.league.id
                  ? `/league/${
                      league.league.id
                    }?season=${props.season.year.substring(0, 4)}`
                  : `/home/?search=${league.league.name.replace(" ", "%20")}`
              }
              key={`${props.playerId}${props.season.year}${
                league.league.id
                  ? league.league.id
                  : league.league.name.replace(" ", "")
              }`}
              name={league.league.name}
              goals={league.statistics.goals}
              games={league.statistics.appearences}
              assists={league.statistics.assists}
              yellows={league.statistics.yellows}
              reds={league.statistics.reds}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlayerSeasonStatsBoard;
