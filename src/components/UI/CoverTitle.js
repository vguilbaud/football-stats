import cover from "../../images/footstatsCover.png";
import classes from "./CoverTitle.module.css";

const CoverTitle = () => {
  return (
    <div
      className={classes.mainContent}
      style={{ backgroundImage: `url(${cover})` }}
    >
      <h1>FootStats</h1>
    </div>
  );
};

export default CoverTitle;
