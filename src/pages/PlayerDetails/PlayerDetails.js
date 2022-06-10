import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CommentsList from "../../components/comments/CommentsList";
import Authentication from "../../components/UI/Authentication";
import PlayerInfo from "./PlayerInfo";
import PlayerSeasonStatsBoard from "./PlayerSeasonStatsBoard";
import PlayerTeams from "./PlayerTeams";

const PlayerDetails = () => {
  const [infoPlayerContent, changeInfoPlayerContent] = useState([]);
  const [playerStats, changePlayerStats] = useState([]);
  const [infoTeamsContent, changeInfoTeamsContent] = useState([]);
  const [playerSeasonStatsContent, changePlayerSeasonStatsContent] = useState();
  const history = useHistory();
  const [teamId, setTeamId] = useState();
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let URLseason = params.get("season");
  const [seasonChosen, changeSeasonHandler] = useState(URLseason);
  const [possibleSeasons, changePossibleSeason] = useState([]);
  const playerId = location.pathname
    .replace(/[^0-9]/g, "")
    .replace(seasonChosen, "");

  useEffect(() => {
    fetch(`http://localhost:4200/api/players/${playerId}`).then((res) =>
      res.json().then((res) => {
        changePossibleSeason(
          res.stats
            .map((season) => season.year)
            .reverse()
            .filter((year) => !year.includes("2023"))
        );
        changeInfoPlayerContent(
          <PlayerInfo infos={res.playerInfos} total={res.total} />
        );
        changePlayerStats(res.stats);
      })
    );
  }, [playerId]);

  useEffect(() => {
    if (playerStats.length > 0) {
      changePlayerSeasonStatsContent(
        <PlayerSeasonStatsBoard
          season={playerStats.find(
            (season) => season.year.substring(0, 4) === seasonChosen
          )}
          playerId={playerId}
        />
      );
    }
  }, [seasonChosen, playerStats, playerId]);

  useEffect(() => {
    fetch(`http://localhost:4200/api/players/teamPlayed/${playerId}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.transfers) {
          setTeamId(res.transfers[0].teams.in.id);
          changeInfoTeamsContent(<PlayerTeams teams={res.transfers} />);
        } else {
          changeInfoTeamsContent(<p>No teams linked</p>);
        }
      });
  }, [playerId]);

  const changeSeason = (input) => {
    setTimeout(() => {
      history.push({
        pathname: location.pathname,
        search: `?season=${input.target.value}`,
      });
      changeSeasonHandler(input.target.value);
    }, 1000);
  };

  return (
    <div>
      <Link to={teamId ? `/team/${teamId}?season=${seasonChosen}` : `/home`}>
        Back
      </Link>
      {infoPlayerContent}
      {possibleSeasons.length > 0 && (
        <form onChange={changeSeason}>
          <select
            className="seasonSelect"
            defaultValue={
              URLseason
                ? URLseason
                : possibleSeasons
                    .map((season) => season.substring(0, 4))
                    .includes("2021")
                ? "2021"
                : possibleSeasons[0].substring(0, 4)
            }
          >
            {possibleSeasons.map((season) => {
              return (
                <option
                  key={`player${season.replace(" ", "")}`}
                  value={season.substring(0, 4)}
                >
                  {season}
                </option>
              );
            })}
          </select>
        </form>
      )}
      {playerSeasonStatsContent}
      {infoTeamsContent}
      <CommentsList type="player" commentedId={playerId} />
      <Authentication />
    </div>
  );
};

export default PlayerDetails;
