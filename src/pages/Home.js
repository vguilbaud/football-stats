import LeaguesList from "./LeagueDetails/LeaguesList";
import classes from "./Home.module.css";
import Cover from "../images/footstatsCover.png";

const Home = () => {
  return (
    <div className={classes.over}>
      <img className={classes.cover} src={Cover} alt="Cover footstats" />
      <LeaguesList />
    </div>
  );
};

export default Home;
