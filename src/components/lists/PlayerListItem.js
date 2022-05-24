const PlayerListItem = (props) => {
  return (
    <div className="statsBoard">
      <p>{props.player.name}</p>
      <p>{props.player.games}</p>
      <p>{props.player.goals}</p>
      <p>{props.player.assists}</p>
      <p>{props.player.yellows}</p>
      <p>{props.player.reds}</p>
    </div>
  );
};

export default PlayerListItem;
