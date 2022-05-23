const TeamInfos = (props) => {
  return (
    <div>
      <img src={props.infos.team.logo} alt={`${props.infos.team.name} logo`} />
      <h2>{props.infos.team.name}</h2>
      <p>Stadium: {props.infos.venue.name}</p>
      <p>Coach: {props.coach}</p>
    </div>
  );
};

export default TeamInfos;
