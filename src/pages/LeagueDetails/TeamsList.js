import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import TeamListItem from "./TeamListItem";
import classes from "./TeamsList.module.css";
import CoverTitle from "../../components/UI/CoverTitle";

const TeamsList = () => {
  const location = useLocation();
  const history = useHistory();
  let params = new URLSearchParams(location.search);
  let URLseason = params.get("season");

  const [seasonChosen, changeSeasonHandler] = useState(URLseason);
  const [possibleSeasons, changePossibleSeason] = useState([]);
  const [allTeams, changeTeamsDisplayed] = useState([]);
  const [leagueInfo, changeLeagueInfo] = useState({ name: "", logo: "" });

  const leagueId = location.pathname
    .replace(/[^0-9]/g, "")
    .replace(seasonChosen, "");

  useEffect(() => {
    fetch(`http://localhost:4200/api/leagues/getSeasonsPlayed/${leagueId}`)
      .then((res) => res.json())
      .then((response) => {
        changePossibleSeason(response.seasons);
        changeLeagueInfo({
          name: response.league.name,
          logo: response.league.logo,
        });
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
      history.replace({
        pathname: location.pathname,
        search: `?season=${input.target.value}`,
      });
      changeSeasonHandler(input.target.value);
    }, 1000);
  };
  const goBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.over}>
      <div>
        <CoverTitle />
        <div onClick={goBack} className={classes.arrowLogo}>
          ←
        </div>
      </div>
      <div className={classes.leagueInfo}>
        {leagueInfo.name && (
          <div>
            <img src={leagueInfo.logo} alt={`${leagueInfo.name} logo`} />
            <p>{leagueInfo.name}</p>
          </div>
        )}
        {possibleSeasons.length > 0 && (
          <form id="stats" onChange={changeSeason}>
            <select
              className="seasonSelect"
              defaultValue={URLseason ? URLseason : "2021"}
            >
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
        <div className={classes.line}></div>
      </div>
      <div className="listLeagueTeam">
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
