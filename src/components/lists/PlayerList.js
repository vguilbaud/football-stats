import { useEffect, useState } from "react";
import PlayerListItem from "./PlayerListItem";

const PlayerList = (props) => {
  const [playerList, addPlayerList] = useState([]);

  useEffect(() => {
    const getAllplayers = async () => {
      let page = 1;
      let totalPages = 1;

      let allPlayers = await fetch(
        `http://localhost:4200/api/players?team=${props.teamId}&season=${props.season}&page=${page}`
      )
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          totalPages = response.totalPages;
          return response.players;
        })
        .then(async (response) => {
          let players = [];
          players.push(...response);
          for (let i = page + 1; i < totalPages + 1; i++) {
            await fetch(
              `http://localhost:4200/api/players?team=${props.teamId}&season=${props.season}&page=${i}`
            )
              .then((res) => {
                return res.json();
              })
              .then((resp) => {
                players.push(...resp.players);
                return;
              });
          }
          return Promise.all(
            players.map((player, i, arr) => {
              let duplicate = arr.find(
                (pl, ind) => pl.id === player.id && ind !== i
              );
              if (duplicate) {
                player.games += duplicate.games;
                player.goals += duplicate.goals;
                player.assists += duplicate.assists;
                player.yellows += duplicate.yellows;
                player.reds += duplicate.reds;
                arr.splice([arr.indexOf(duplicate)], 1);
              }
              return player;
            })
          );
        });
      addPlayerList(
        allPlayers.map((player) => {
          if (player) {
            return (
              <PlayerListItem key={`player${player.id}`} player={player} />
            );
          }
        })
      );
    };

    getAllplayers();
  }, [props]);

  return (
    <div className="centered">
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
