import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import classes from "./LeaguesList.module.css";
import { leagues } from "../../hardcode";
import LeagueListItem from "./LeagueListItem";
import searchLogo from "../../logos/searchLogo.png";

const LeaguesList = () => {
  const [leaguesList, setLeaguesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const history = useHistory();
  let params = new URLSearchParams(location.search);
  let URLsearch = params.get("search");

  useEffect(() => {
    setErrorMessage("");
    if (URLsearch?.length > 3) {
      fetch(`http://localhost:4200/api/leagues?search=${URLsearch}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.length > 0) {
            setLeaguesList(res);
          } else {
            setErrorMessage(
              "Pas de ligues trouvées avec ce nom là, cherchez à nouveau ou essayez une ligue ci-dessous:"
            );
            setLeaguesList(leagues);
          }
        });
    } else if (!URLsearch) {
      setLeaguesList(leagues);
    }
  }, [URLsearch, location.hash]);

  const searchLeague = (search) => {
    search.preventDefault();
    if (search.target.value.length > 3) {
      setTimeout(() => {
        history.replace({
          pathname: location.pathname,
          search: `?search=${search.target.value}`,
        });
      }, 500);
    } else if (URLsearch) {
      history.replace({
        pathname: location.pathname,
        search: ``,
      });
    }
  };

  return (
    <div className="allContent">
      <div className={classes.formPosition}>
        <form onChange={searchLeague} className={classes.searchBar}>
          <label htmlFor="search">
            <img src={searchLogo} alt={searchLogo} />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Rechercher d'abord une ligue"
            min="4"
            autoFocus={true}
            defaultValue={URLsearch ? URLsearch : ""}
          ></input>
        </form>
      </div>

      {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
      <div id="stats" className="listLeagueTeam">
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
