import { useEffect, useState } from "react";
import PlayerListItem from "./PlayerListItem";

const PlayerList = (props) => {
  const [playerList, addPlayerList] = useState([]);

  useEffect(() => {
    let getAlldaPlayers = async () => {
      return await fetch(
        `http://localhost:4200/api/players/get?team=${props.teamId}&season=${props.season}`
      )
        .then((res) => {
          return res.json();
        })
        .then((allPlayers) => {
          addPlayerList(
            allPlayers
              .sort((a, b) => b.goals - a.goals)
              .map((player) => {
                if (player) {
                  return (
                    <PlayerListItem
                      key={`player${player.id}`}
                      player={player}
                    />
                  );
                } else return "";
              })
          );
        });
    };
    getAlldaPlayers();
  }, [props.teamId, props.season]);

  return (
    <div>
      <h3>Les buteurs cette saison ({playerList.length}):</h3>
      <div className={`statsBoard statsBoardTitle`}>
        <p className="statsBoardPlayer">Joueur</p>
        <div className="borderStats"></div>
        <p className="statsBoardMatches">Matchs</p>
        <div className="borderStats"></div>
        <p className="statsBoardGoals">Buts</p>
        <div className="borderStats"></div>
        <p className="statsBoardAssists">Assists</p>
        <div className="statsBoardCards borderStats"></div>
        <div className="statsBoardCards"></div>
        <div className="statsBoardCards borderStats"></div>
        <div className="statsBoardCards"></div>
      </div>
      {playerList}
    </div>
  );
};

export default PlayerList;
