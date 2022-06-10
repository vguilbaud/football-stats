import { useHistory } from "react-router-dom";
import classes from "./PlayerInfo.module.css";

const PlayerInfo = (props) => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };
  const formatedHeight = [
    props.infos.height.slice(0, 1),
    "m",
    props.infos.height.slice(1),
  ].join("");

  const nameArray = props.infos.name.includes(".")
    ? [props.infos.name]
    : props.infos.name.split(" ");

  return (
    <div className={classes.playerInfo}>
      <div className={classes.playerTitle}>
        <div className={classes.playerTitleTop}>
          <div onClick={goBack} className={classes.arrowLogo}>
            ←
          </div>
          <p>{`${props.infos.position.slice(0, 3)}.`}</p>
        </div>
        <div className={classes.mainInfos}>
          <div className={classes.basicInfos}>
            <p>{props.infos.nationality}</p>
            <h2>
              {nameArray.length > 1
                ? nameArray.map((namePart, i, arr) => {
                    if (i === 0) {
                      return <span key={`span${namePart}`}>{namePart} </span>;
                    } else return `${namePart} `;
                  })
                : nameArray[0]}
            </h2>
            <p className={classes.ageHeight}>
              <span>{props.infos.age} ans</span> | {formatedHeight}
            </p>
          </div>
          <div className={classes.photo}>
            <img src={props.infos.photo} alt={`${props.infos.name} logo`} />
          </div>
        </div>
        <div className={classes.stats}>
          <p>Matchs {props.total.appearences}</p>
          <p>Buts {props.total.goals}</p>
          <p>Assists {props.total.assists}</p>
          <p>Jaunes {props.total.yellows}</p>
          <p>Rouges {props.total.reds}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
