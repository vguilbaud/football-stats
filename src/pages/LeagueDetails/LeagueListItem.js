import { Link } from "react-router-dom";

const LeagueListItem = (props) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`/league/${props.league.id}`}>
      <div className="listItem">
        <img src={props.league.logo} alt={`${props.league.name} logo`} />
        <p>{props.league.name}</p>
        <div className="listArrow">{">"}</div>
      </div>
    </Link>
  );
};

export default LeagueListItem;
