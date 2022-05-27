import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TeamListItem from "./TeamListItem";

const TeamsList = (props) => {
  const location = useLocation();
  const history = useHistory();
  let params = new URLSearchParams(location.search);
  let URLseason = params.get("season") ? params.get("season") : "2021";
  console.log("whole");

  const [seasonChosen, changeSeasonHandler] = useState(URLseason);
  const [possibleSeasons, changePossibleSeason] = useState([]);
  const [allTeams, changeTeamsDisplayed] = useState([]);

  const leagueId = location.pathname
    .replace(/[^0-9]/g, "")
    .replace(seasonChosen, "");

  useEffect(() => {
    fetch(`http://localhost:4200/api/leagues/getSeasonsPlayed/${leagueId}`)
      .then((res) => res.json())
      .then((response) => {
        changePossibleSeason(response);
        console.log("seasons");
      });
  }, [leagueId]);

  useEffect(() => {
    setTimeout(() => {
      fetch(
        `http://localhost:4200/api/leagues/${leagueId}?season=${
          URLseason ? URLseason : seasonChosen
        }`
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          changeTeamsDisplayed(res);
          console.log("everything");
        });
    }, 500);
  }, [leagueId, URLseason, possibleSeasons, seasonChosen]);

  const changeSeason = (input) => {
    history.push({
      pathname: location.pathname,
      search: `?season=${input.target.value}`,
    });
    changeSeasonHandler(input.target.value);
  };

  return (
    <div>
      <NavLink to={`/home`}>Back</NavLink>
      {possibleSeasons.length > 0 && (
        <form onChange={changeSeason}>
          <select defaultValue={URLseason}>
            {possibleSeasons.map((season) => {
              if (season === URLseason) {
                return (
                  <option
                    key={`league${season.replace(" ", "")}`}
                    value={season.substring(0, 4)}
                  >
                    {season}
                  </option>
                );
              } else
                return (
                  <option
                    key={`league${season.replace(" ", "")}`}
                    value={season.substring(0, 4)}
                  >
                    {season}
                  </option>
                );
            })}
          </select>
        </form>
      )}
      <div>
        {allTeams.map((team) => {
          return (
            <TeamListItem
              team={team}
              key={`team${team.id}`}
              season={seasonChosen}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TeamsList;
