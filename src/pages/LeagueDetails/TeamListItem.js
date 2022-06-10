import { Link } from "react-router-dom";

const TeamListItem = (props) => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/team/${props.team.id}?season=${props.season}`}
    >
      <div className="listItem">
        <img src={props.team.logo} alt={`${props.team.name} logo`} />
        <p>{props.team.name}</p>
        <div className="listArrow">
          <div className="arrowFlex">{">"}</div>
        </div>
      </div>
    </Link>
  );
};

export default TeamListItem;
