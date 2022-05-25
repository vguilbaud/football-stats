const PlayerInfo = (props) => {
  return (
    <div>
      <div>
        <img src={props.infos.photo} alt={`${props.infos.name} logo`} />
        <h2>{props.infos.name}</h2>
        <p>{props.infos.age}</p>
        <p>{props.infos.nationality}</p>
        <p>{props.infos.position}</p>
      </div>
      <div className="statsBoard">
        <p>Matches: {props.total.appearences}</p>
        <p>Goals: {props.total.goals}</p>
        <p>Assists: {props.total.assists}</p>
        <p>Yellows: {props.total.yellows}</p>
        <p>Reds: {props.total.reds}</p>
      </div>
    </div>
  );
};

export default PlayerInfo;
