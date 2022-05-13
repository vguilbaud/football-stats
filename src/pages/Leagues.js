import { fakeLeague } from "../dummyInfos";
import LeagueCard from "../components/cards/LeagueCard";

const Leagues = (props) => {
  return (
    <div className="centered">
      {fakeLeague.map((league) => {
        return <LeagueCard league={league} key={league} />;
      })}
    </div>
  );
};

export default Leagues;
