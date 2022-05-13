import { fakePlayers } from "../dummyInfos";
import PlayerCard from "../components/cards/PlayerCard";

const Players = (props) => {
  return (
    <div>
      {fakePlayers.map((player) => {
        return <PlayerCard name={player.name} key={player.goals} />;
      })}
    </div>
  );
};

export default Players;
