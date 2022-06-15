import { useEffect, useState } from "react";
import PlayerStatsLine from "../../../components/UI/PlayerStatsLine";
import classes from "./PlayerList.module.css";
import Slider from "../slider/Slider";

const PlayerList = (props) => {
  const [playerList, addPlayerList] = useState([]);
  const [activeClass, toggleActiveClass] = useState("goals");

  const handleToggleClasses = (event) => {
    if (event.target.id && event.target.id !== activeClass) {
      toggleActiveClass(event.target.id);
      addPlayerList((prev) => {
        let newList;
        if (event.target.id === "name") {
          newList = prev.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
        } else {
          newList = prev.sort(
            (a, b) => b[event.target.id] - a[event.target.id]
          );
        }
        return newList;
      });
    }
  };

  useEffect(() => {
    let getAlldaPlayers = async () => {
      return await fetch(
        `http://localhost:4200/api/players/get?team=${props.teamId}&season=${props.season}`
      )
        .then((res) => {
          return res.json();
        })
        .then((allPlayers) => {
          toggleActiveClass("goals");
          addPlayerList(allPlayers.sort((a, b) => b.goals - a.goals));
        });
    };
    getAlldaPlayers();
  }, [props.teamId, props.season]);

  return (
    <div className={classes.allContent}>
      {playerList.length > 0 && (
        <div>
          <Slider players={playerList} season={props.season} />
        </div>
      )}
      <h3 id="stats">Les buteurs cette saison ({playerList.length}):</h3>
      <div className={`statsBoard statsBoardTitle ${classes.titleHover}`}>
        <p
          id="name"
          onClick={handleToggleClasses}
          className={`statsBoardPlayer ${
            activeClass === "name" ? classes.active : ""
          }`}
        >
          Joueur
        </p>
        <div className="borderStats"></div>
        <p
          id="games"
          onClick={handleToggleClasses}
          className={`statsBoardMatches ${
            activeClass === "games" ? classes.active : ""
          }`}
        >
          Matchs
        </p>
        <div className="borderStats"></div>
        <p
          id="goals"
          onClick={handleToggleClasses}
          className={`statsBoardGoals ${
            activeClass === "goals" ? classes.active : ""
          }`}
        >
          Buts
        </p>
        <div className="borderStats"></div>
        <p
          id="assists"
          onClick={handleToggleClasses}
          className={`statsBoardAssists ${
            activeClass === "assists" ? classes.active : ""
          }`}
        >
          Assists
        </p>
        <div className="statsBoardCardsInvisible borderStats"></div>
        <div className="statsBoardCardsInvisible statsBoardCard">
          <div className="cardFlex">
            <div
              id="yellows"
              onClick={handleToggleClasses}
              className={`yellowCard ${
                activeClass === "yellows" ? "cardActive" : "card"
              }`}
            ></div>
          </div>
        </div>
        <div className="statsBoardCardsInvisible borderStats"></div>
        <div className="statsBoardCardsInvisible statsBoardCard">
          <div className="cardFlex">
            <div
              id="reds"
              onClick={handleToggleClasses}
              className={`redCard ${
                activeClass === "reds" ? "cardActive" : "card"
              }`}
            ></div>
          </div>
        </div>
      </div>
      {playerList.length > 0 &&
        playerList.map((player) => {
          if (player) {
            return (
              <PlayerStatsLine
                link={`/player/${player.id}?season=${props.season}`}
                key={`player${player.id}`}
                name={player.name}
                goals={player.goals}
                games={player.games}
                assists={player.assists}
                yellows={player.yellows}
                reds={player.reds}
              />
            );
          } else return "";
        })}
    </div>
  );
};

export default PlayerList;
