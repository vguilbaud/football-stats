import { Link } from "react-router-dom";
import classes from "./SliderItem.module.css";

const SliderItem = (props) => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/player/${props.player.id}?season=${props.season}`}
    >
      <div className={classes.content}>
        <div className={classes.position}>{`${props.player.position
          .slice(0, 3)
          .toUpperCase()}.`}</div>
        <img
          className={classes.flag}
          src={`https://www.countryflagsapi.com/png/${props.player.nationality.replace(
            " ",
            "%20"
          )}`}
          alt={`${props.player.nationality.split(" ")[0]}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = `https://www.countryflagsapi.com/png/${
              props.player.nationality.split(" ")[0]
            }
            )}`;
          }}
        />
        <div className={classes.imgContent}>
          <img src={props.player.photo} alt={`${props.player.name}`} />
        </div>
        <div className={classes.infoContent}>
          <div className={`${classes.statInfo} ${classes.statMatches}`}>
            <span>Matchs</span>
            <span>{props.player.games}</span>
          </div>
          <div className={`${classes.statInfo} ${classes.statGoals}`}>
            <span>Buts</span>
            <span>{props.player.goals}</span>
          </div>
          <div className={`${classes.statInfo} ${classes.statAssists}`}>
            <span>Assists</span>
            <span>{props.player.assists}</span>
          </div>
          <div className={classes.name}>{props.player.name}</div>
        </div>
      </div>
    </Link>
  );
};

export default SliderItem;
