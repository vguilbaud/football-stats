import PlayerSeasonStatsBoard from "./PlayerSeasonStatsBoard";

const PlayerStats = (props) => {
  return (
    <div>
      {props.stats.map((season) => (
        <PlayerSeasonStatsBoard
          key={`${props.playerId}${season.year}`}
          playerId={props.playerId}
          season={season}
        />
      ))}
    </div>
  );
};

export default PlayerStats;
