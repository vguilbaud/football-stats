import { Link } from "react-router-dom";

const PlayerStatsLine = (props) => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={props.link}
      className="statsBoard"
    >
      <p className="statsBoardPlayer">{props.name}</p>
      <div className="borderStats"></div>
      <p className="statsBoardMatches">{props.games}</p>
      <div className="borderStats"></div>
      <p className="statsBoardGoals">{props.goals}</p>
      <div className="borderStats"></div>
      <p className="statsBoardAssists">{props.assists}</p>
      <div className="statsBoardCardsInvisible borderStats"></div>
      <div className={"statsBoardCardsInvisible statsBoardCards"}>
        <div className="cardFlex">{props.yellows}</div>
      </div>
      <div className="statsBoardCardsInvisible borderStats"></div>
      <div className="statsBoardCardsInvisible statsBoardCards">
        <div className="cardFlex">{props.reds}</div>
      </div>
    </Link>
  );
};

export default PlayerStatsLine;
