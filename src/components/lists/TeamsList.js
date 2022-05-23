import { useLocation } from "react-router-dom";
import { seasons } from "../../hardcode";
import { useState } from "react";
import TeamListItem from "./TeamListItem";

const TeamsList = (props) => {
  const [seasonChosen, changeSeasonHandler] = useState("2021");
  const [allTeams, changeTeamsDisplayed] = useState([]);

  const location = useLocation();
  const leagueId = location.pathname.replace(/[^0-9]/g, "");

  fetch(`http://localhost:4200/api/leagues/${leagueId}?season=${seasonChosen}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => changeTeamsDisplayed(res));

  const changeSeason = (input) => {
    changeSeasonHandler(input.target.value);
  };

  return (
    <div>
      <form onChange={changeSeason}>
        <select>
          {seasons.map((season) => {
            return (
              <option
                key={`league${season.trim()}`}
                value={season.substring(0, 4)}
              >
                {season}
              </option>
            );
          })}
        </select>
      </form>
      <div className="centered">
        {allTeams.map((team) => {
          return <TeamListItem team={team} key={`team${team.id}`} />;
        })}
      </div>
    </div>
  );
};

export default TeamsList;
