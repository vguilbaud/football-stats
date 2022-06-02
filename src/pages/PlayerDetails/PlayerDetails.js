import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CommentsForm from "../../components/comments/CommentsForm";
import CommentsList from "../../components/comments/CommentsList";
import AuthContext from "../../store/auth-context";
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
  const [newComments, addNewComment] = useState([]);

  const authCtx = useContext(AuthContext);

  const addNewCommentsHandler = (comment) => {
    addNewComment((prevComs) => {
      const updateComs = [...prevComs];
      updateComs.push(comment);
      return updateComs;
    });
  };

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
        if (res.transfers.length > 0) {
          setTeamId(res.transfers[0].teams.in.id);
          changeInfoTeamsContent(<PlayerTeams teams={res.transfers} />);
        } else {
          changeInfoTeamsContent(<p>No teams linked</p>);
        }
      });
  }, [playerId]);

  return (
    <div>
      <NavLink to={`/team/${teamId}`}>Back</NavLink>
      {infoPlayerContent}
      {authCtx.isLoggedIn && (
        <CommentsForm
          type="player"
          commentedId={playerId}
          addNewComment={addNewCommentsHandler}
        ></CommentsForm>
      )}
      <CommentsList
        type="player"
        commentedId={playerId}
        newComments={newComments}
      />
      {infoStatsContent}
      {infoTeamsContent}
    </div>
  );
};

export default PlayerDetails;
