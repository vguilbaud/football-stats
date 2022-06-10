import PlayerSeasonLeagueStatsBoard from "./PlayerSeasonLeagueStatsBoard";
import { Link } from "react-router-dom";
// import classes from "./PlayerSeasonStatsBoard.module.css";

const PlayerSeasonStatsBoard = (props) => {
  return (
    <div>
      <h3>{props.season.year}</h3>
      <div className="statsBoard">
        <h4>League</h4>
        <p>Matches</p>
        <p>Goals</p>
        {props.season.totalYear.assists > 0 && <p>Assists</p>}
        <p>Yellows</p>
        <p>Reds</p>
      </div>
      <div>
        {props.season.statsLeague.map((league) => {
          return (
            <Link
              style={{ textDecoration: "none" }}
              to={
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
            >
              <PlayerSeasonLeagueStatsBoard
                name={league.league.name}
                goals={league.statistics.goals}
                appearences={league.statistics.appearences}
                assists={league.statistics.assists}
                yellows={league.statistics.yellows}
                reds={league.statistics.reds}
                assistPresent={props.season.totalYear.assists ? true : false}
              />
            </Link>
          );
        })}
      </div>
      <div>
        <PlayerSeasonLeagueStatsBoard
          name="Total"
          goals={props.season.totalYear.goals}
          appearences={props.season.totalYear.appearences}
          assists={props.season.totalYear.assists}
          yellows={props.season.totalYear.yellows}
          reds={props.season.totalYear.reds}
          assistPresent={props.season.totalYear.assists ? true : false}
        />
      </div>
    </div>
  );
};

export default PlayerSeasonStatsBoard;
