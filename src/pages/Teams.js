import { fakeTeams } from "../dummyInfos";
import TeamCard from "../components/cards/TeamCard";

const Teams = (props) => {
  return (
    <div className="centered">
      {fakeTeams.map((team) => {
        return <TeamCard team={team} key={Math.random()} />;
      })}
    </div>
  );
};

export default Teams;
