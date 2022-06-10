import { Link } from "react-router-dom";

const PlayerListItem = (props) => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/player/${props.player.id}?season=${props.season}`}
      className="statsBoard"
    >
      <p className="statsBoardPlayer">{props.player.name}</p>
      <div className="borderStats"></div>
      <p className="statsBoardMatches">{props.player.games}</p>
      <div className="borderStats"></div>
      <p className="statsBoardGoals">{props.player.goals}</p>
      <div className="borderStats"></div>
      <p className="statsBoardAssists">{props.player.assists}</p>
      <div className="statsBoardCardsInvisible borderStats"></div>
      <div className={"statsBoardCardsInvisible statsBoardCards"}>
        <div className="cardFlex">{props.player.yellows}</div>
      </div>
      <div className="statsBoardCardsInvisible borderStats"></div>
      <div className="statsBoardCardsInvisible statsBoardCards">
        <div className="cardFlex">{props.player.reds}</div>
      </div>
    </Link>
  );
};

export default PlayerListItem;
