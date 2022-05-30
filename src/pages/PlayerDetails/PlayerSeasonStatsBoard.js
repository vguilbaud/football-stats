import PlayerSeasonLeagueStatsBoard from "./PlayerSeasonLeagueStatsBoard";
import { NavLink } from "react-router-dom";

const PlayerSeasonStatsBoard = (props) => {
  const formatDate = (year) => `${year} - ${(parseInt(year) + 1).toString()}`;
  return (
    <div>
      <h3>{formatDate(props.season.year)}</h3>
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
            <NavLink
              to={
                league.league.id
                  ? `/league/${league.league.id}`
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
            </NavLink>
          );
        })}
      </div>
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
  );
};

export default PlayerSeasonStatsBoard;
