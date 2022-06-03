import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TeamListItem from "./TeamListItem";

const TeamsList = (props) => {
  const location = useLocation();
  const history = useHistory();
  let params = new URLSearchParams(location.search);
  let URLseason = params.get("season");

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
      });
  }, [leagueId]);

  useEffect(() => {
    if (possibleSeasons.length > 0) {
      setTimeout(() => {
        fetch(
          `http://localhost:4200/api/leagues/${leagueId}?season=${
            URLseason ? URLseason : possibleSeasons[0].substring(0, 4)
          }`
        )
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            changeTeamsDisplayed(res);
          });
      }, 500);
    }
  }, [leagueId, URLseason, seasonChosen, possibleSeasons]);

  const changeSeason = (input) => {
    setTimeout(() => {
      history.push({
        pathname: location.pathname,
        search: `?season=${input.target.value}`,
      });
      changeSeasonHandler(input.target.value);
    }, 1000);
  };

  return (
    <div>
      <NavLink to={`/home`}>Back</NavLink>
      {possibleSeasons.length > 0 && (
        <form onChange={changeSeason}>
          <select defaultValue={URLseason ? URLseason : "2021"}>
            {possibleSeasons.map((season) => {
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
      <div className="listItemCentered">
        {allTeams.map((team) => {
          return (
            <TeamListItem
              team={team}
              key={`team${team.id}`}
              season={URLseason ? URLseason : "2021"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TeamsList;
