import { leagues } from "../hardcode";
import LeagueCard from "../components/cards/LeagueCard";

const Teams = (props) => {
  return (
    <div className="centered">
      {leagues.map((league) => {
        return <LeagueCard league={league} key={league.id} />;
      })}
    </div>
  );
};

export default Teams;
