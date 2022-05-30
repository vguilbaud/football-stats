import { useLocation, NavLink, useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import TeamStats from "./TeamStats";
import TeamInfos from "./TeamInfos";
import TeamLeaguePlayed from "./TeamLeaguePlayed";
import PlayerList from "../../components/lists/PlayerList";

const TeamCard = (props) => {
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let URLseason = params.get("season");
  const history = useHistory();

  const [seasonChosen, changeSeasonHandler] = useState(URLseason);
  const [teamLeaguePlayedContent, changeTeamLeaguePlayendContent] = useState(
    []
  );

  const [possibleSeasons, changePossibleSeason] = useState([]);
  const totalGoals = useRef({});
  const teamId = location.pathname
    .replace(/[^0-9]/g, "")
    .replace(seasonChosen, "");

  const leaguePlayed = useRef([]);
  const [teamStatsContent, changeTeamStatsContent] = useState([]);
  const [teamInfosContent, changeTeamInfoContent] = useState([]);
  const [teamPlayerList, changeTeamPlayerList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4200/api/teams/possibleSeasons/${teamId}`)
      .then((res) => res.json())
      .then((res) => {
        changePossibleSeason(res);
      });
  }, [teamId]);

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
    if (possibleSeasons.length > 0) {
      changeTeamPlayerList(
        <PlayerList
          teamId={teamId}
          season={
            URLseason
              ? URLseason
              : possibleSeasons
                  .map((season) => season.substring(0, 4))
                  .includes("2021 ?")
              ? "2021"
              : possibleSeasons[0].substring(0, 4)
          }
        />
      );
      fetch(
        `http://localhost:4200/api/leagues/getLeaguesFromTeam?team=${teamId}&season=${
          URLseason
            ? URLseason
            : possibleSeasons
                .map((season) => season.substring(0, 4))
                .includes("2021 ?")
            ? "2021"
            : possibleSeasons[0].substring(0, 4)
        }`
      )
        .then((res) => {
          return res.json();
        })
        .then(async (res) => {
          leaguePlayed.current.value = res;

          changeTeamLeaguePlayendContent(
            <TeamLeaguePlayed
              leagues={leaguePlayed.current.value}
              season={
                URLseason
                  ? URLseason
                  : possibleSeasons
                      .map((season) => season.substring(0, 4))
                      .includes("2021 ?")
                  ? "2021"
                  : possibleSeasons[0].substring(0, 4)
              }
            />
          );
          let allGoals = await res.map(async (daLeague) => {
            const response = await fetch(
              `http://localhost:4200/api/teams/${teamId}/statistics?season=${
                URLseason ? URLseason : possibleSeasons[0].substring(0, 4)
              }&league=${daLeague.id}`
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
          let total = {
            matches: 0,
            victories: 0,
            draws: 0,
            loses: 0,
            goals: 0,
          };
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
    }
  }, [teamId, seasonChosen, possibleSeasons, URLseason]);

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
    <div className="centered">
      <NavLink to={`/home`}>Back</NavLink>
      {possibleSeasons.length > 0 && (
        <form onChange={changeSeason}>
          <select
            defaultValue={
              URLseason
                ? URLseason
                : possibleSeasons
                    .map((season) => season.substring(0, 4))
                    .includes("2021 ?")
                ? "2021"
                : possibleSeasons[0].substring(0, 4)
            }
          >
            {possibleSeasons.map((season) => {
              if (season === seasonChosen) {
                return (
                  <option
                    key={`team${season.replace(" ", "")}`}
                    value={season.substring(0, 4)}
                  >
                    {season}
                  </option>
                );
              } else
                return (
                  <option
                    key={`team${season.replace(" ", "")}`}
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
        {teamInfosContent}
        {teamStatsContent}
        {teamPlayerList}
        {teamLeaguePlayedContent}
      </div>
    </div>
  );
};

export default TeamCard;
