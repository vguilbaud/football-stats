import cover from "../../images/footstatsCover.svg";
import graphOne from "../../images/graphOne.svg";
import graphTwo from "../../images/graphTwo.svg";
import graphThree from "../../images/graphThree.svg";
import classes from "./CoverTitle.module.css";

const CoverTitle = () => {
  return (
    <div
      className={classes.mainContent}
      style={{ backgroundImage: `url(${cover})` }}
    >
      <h1>Toutes les stats</h1>
      <p>des équipes et des joueurs du monde entier</p>
      <img src={graphOne} alt="graph field" className={classes.graphOne} />
      <img
        src={graphTwo}
        alt="graph stats back cover"
        className={classes.graphTwo}
      />
      <img
        src={graphThree}
        alt="graph stats doted back cover"
        className={classes.graphThree}
      />
    </div>
  );
};

export default CoverTitle;
