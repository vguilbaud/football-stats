import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CommentsList from "../../components/comments/CommentsList";
import Authentication from "../../components/UI/Authentication";
import PlayerInfo from "./PlayerInfo";
import PlayerStats from "./PlayerStats";
import PlayerTeams from "./PlayerTeams";

const PlayerDetails = (props) => {
  const [infoPlayerContent, changeInfoPlayerContent] = useState([]);
  const [infoStatsContent, changeInfoStatsContent] = useState([]);
  const [infoTeamsContent, changeInfoTeamsContent] = useState([]);
  const [teamId, setTeamId] = useState();
  const location = useLocation();
  const playerId = location.pathname.replace(/[^0-9]/g, "");

  useEffect(() => {
    fetch(`http://localhost:4200/api/players/${playerId}`).then((res) =>
      res.json().then((res) => {
        changeInfoPlayerContent(
          <PlayerInfo infos={res.playerInfos} total={res.total} />
        );
        changeInfoStatsContent(
          <PlayerStats playerId={playerId} stats={res.stats} />
        );
      })
    );
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

  return (
    <div>
      <Link to={teamId ? `/team/${teamId}` : `/home`}>Back</Link>
      {infoPlayerContent}
      {infoStatsContent}
      {infoTeamsContent}
      <CommentsList type="player" commentedId={playerId} />
      <Authentication />
    </div>
  );
};

export default PlayerDetails;
