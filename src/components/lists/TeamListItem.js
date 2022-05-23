import { Link } from "react-router-dom";

const TeamListItem = (props) => {
  return (
    <Link to={`/team/${props.team.id}`}>
      <img src={props.team.logo} alt={`${props.team.name} logo`} />
      <p>{props.team.name}</p>
    </Link>
  );
};

export default TeamListItem;
