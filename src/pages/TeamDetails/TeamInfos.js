import { Link } from "react-router-dom";
import classes from "./TeamInfos.module.css";

const TeamInfos = (props) => {
  const nameArray = props.infos.team.name.split(" ");

  return (
    <div className={classes.teamInfo}>
      <Link
        style={{ textDecoration: "none" }}
        to={`/home`}
        className={classes.arrowLogo}
      >
        ←
      </Link>
      <div className={classes.teamTitle}>
        <img
          src={props.infos.team.logo}
          alt={`${props.infos.team.name} logo`}
        />
        <h2>
          {nameArray.length > 1
            ? nameArray.map((namePart, i, arr) => {
                if (i === arr.length - 1) {
                  return <span key={`span${namePart}`}>{namePart}</span>;
                } else return `${namePart} `;
              })
            : nameArray[0]}
        </h2>
      </div>
      <p className={classes.coach}>
        Coach | <span>{props.coach}</span>
      </p>
    </div>
  );
};

export default TeamInfos;
