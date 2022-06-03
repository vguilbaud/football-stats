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
      <div className="statsBoard">
        <p>Player</p>
        <p>Games</p>
        <p>Goals</p>
        <p>Assists</p>
        <p>Yellows</p>
        <p>Reds</p>
      </div>
      {playerList}
    </div>
  );
};

export default PlayerList;
