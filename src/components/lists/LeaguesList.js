import { useState } from "react";
import { leagues } from "../../hardcode";
import LeagueListItem from "./LeagueListItem";

const LeaguesList = (props) => {
  const [leaguesList, setLeaguesList] = useState(leagues);

  const searchLeague = (search) => {
    if (search.target.value.length > 2) {
      setTimeout(() => {
        fetch(`http://localhost:4200/api/leagues?search=${search.target.value}`)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            setLeaguesList(res);
          });
      }, 500);
    } else setLeaguesList(leagues);
  };

  return (
    <div className="centered">
      <form onChange={searchLeague}>
        <input
          type="text"
          placeholder="Searc for a league, min 2 letters"
          min="3"
        ></input>
      </form>
      <div className="centered">
        {leaguesList.map((league) => {
          return (
            <LeagueListItem
              league={league}
              key={`${league.name}${league.id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LeaguesList;
