const LeagueCard = (props) => {
  return (
    <div>
      <img src={props.league.logo} alt={`${props.league.name} logo`} />
      <p>{props.league.name}</p>
    </div>
  );
};

export default LeagueCard;
