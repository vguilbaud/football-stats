import LeaguesList from "./LeaguesList";
import classes from "./Home.module.css";
import CoverTitle from "../../components/UI/CoverTitle";

const Home = () => {
  return (
    <div className={classes.over}>
      <CoverTitle />
      <LeaguesList />
    </div>
  );
};

export default Home;
