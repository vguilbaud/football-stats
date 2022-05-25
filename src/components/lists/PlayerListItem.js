import { Link } from "react-router-dom";

const PlayerListItem = (props) => {
  return (
    <Link to={`/player/${props.player.id}`} className="statsBoard">
      <p>{props.player.name}</p>
      <p>{props.player.games}</p>
      <p>{props.player.goals}</p>
      <p>{props.player.assists}</p>
      <p>{props.player.yellows}</p>
      <p>{props.player.reds}</p>
    </Link>
  );
};

export default PlayerListItem;
