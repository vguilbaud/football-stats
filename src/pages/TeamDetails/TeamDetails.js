import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { seasons } from "../../hardcode";
import TeamStats from "./TeamStats";
import TeamInfos from "./TeamInfos";
import TeamLeaguePlayed from "./TeamLeaguePlayed";
import PlayerList from "../../components/lists/PlayerList";

const TeamCard = (props) => {
  const location = useLocation();
  const [seasonChosen, changeSeasonHandler] = useState("2021");
  const [teamLeaguePlayedContent, changeTeamLeaguePlayendContent] = useState(
    []
  );
  const totalGoals = useRef({});
  const teamId = location.pathname.replace(/[^0-9]/g, "");
  const leaguePlayed = useRef([]);
  const [teamStatsContent, changeTeamStatsContent] = useState([]);
  const [teamInfosContent, changeTeamInfoContent] = useState([]);
  const [teamPlayerList, changeTeamPlayerList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4200/api/teams/${teamId}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        fetch(`http://localhost:4200/api/coach?team=${teamId}`)
          .then((resCoach) => {
            return resCoach.json();
          })
          .then((responseCoach) => {
            changeTeamInfoContent(
              <TeamInfos id={teamId} infos={resp} coach={responseCoach} />
            );
          });
      });
  }, [teamId]);

  useEffect(() => {
    changeTeamPlayerList(<PlayerList teamId={teamId} season={seasonChosen} />);

    fetch(
      `http://localhost:4200/api/leagues/getLeaguesFromTeam?team=${teamId}&season=${seasonChosen}`
    )
      .then((res) => {
        return res.json();
      })
      .then(async (res) => {
        leaguePlayed.current.value = res;

        changeTeamLeaguePlayendContent(
          <TeamLeaguePlayed leagues={leaguePlayed.current.value} />
        );
        let allGoals = await res.map(async (daLeague) => {
          const response = await fetch(
            `http://localhost:4200/api/teams/${teamId}/statistics?season=${seasonChosen}&league=${daLeague.id}`
          );
          const resp = await response.json();
          return {
            matches: resp.matches,
            victories: resp.victories,
            draws: resp.draws,
            loses: resp.loses,
            goals: resp.goals,
          };
        });
        return Promise.all(allGoals);
      })
      .then((res) => {
        let total = { matches: 0, victories: 0, draws: 0, loses: 0, goals: 0 };
        res.forEach((league) => {
          total.matches += league.matches;
          total.victories += league.victories;
          total.draws += league.draws;
          total.loses += league.loses;
          total.goals += league.goals;
        });
        totalGoals.current.value = total;
        changeTeamStatsContent(
          <TeamStats id={teamId} totalStats={totalGoals.current.value} />
        );
      });
  }, [teamId, seasonChosen]);

  const changeSeason = (input) => {
    changeSeasonHandler(input.target.value);
  };

  return (
    <div className="centered">
      <form onChange={changeSeason}>
        <select>
          {seasons.map((season) => {
            return (
              <option
                key={`team${season.trim()}`}
                value={season.substring(0, 4)}
              >
                {season}
              </option>
            );
          })}
        </select>
      </form>
      <div>
        {teamInfosContent}
        {teamStatsContent}
        {teamPlayerList}
        {teamLeaguePlayedContent}
      </div>
    </div>
  );
};

export default TeamCard;
