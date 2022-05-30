import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { leagues } from "../../hardcode";
import LeagueListItem from "./LeagueListItem";

const LeaguesList = (props) => {
  const [leaguesList, setLeaguesList] = useState([]);
  const location = useLocation();
  const history = useHistory();
  let params = new URLSearchParams(location.search);
  let URLsearch = params.get("search");

  useEffect(() => {
    if (URLsearch?.length > 3) {
      fetch(`http://localhost:4200/api/leagues?search=${URLsearch}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setLeaguesList(res);
        });
    } else if (!URLsearch) {
      setLeaguesList(leagues);
    }
  }, [URLsearch]);

  const searchLeague = (search) => {
    search.preventDefault();
    if (search.target.value.length > 3) {
      setTimeout(() => {
        history.push({
          pathname: location.pathname,
          search: `?search=${search.target.value}`,
        });
      }, 300);
    } else if (URLsearch) {
      history.push({
        pathname: location.pathname,
        search: ``,
      });
    }
  };

  return (
    <div>
      <form onChange={searchLeague}>
        <input
          type="text"
          placeholder="Search for a league, min 4 characters"
          min="4"
          defaultValue={URLsearch ? URLsearch : ""}
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
