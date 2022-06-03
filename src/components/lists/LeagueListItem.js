import { Link } from "react-router-dom";

const LeagueListItem = (props) => {
  return (
    <Link to={`/league/${props.league.id}`}>
      <div className="listItem">
        <img src={props.league.logo} alt={`${props.league.name} logo`} />
        <p>{props.league.name}</p>
      </div>
    </Link>
  );
};

export default LeagueListItem;
