import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import TeamDetails from "./pages/TeamDetails/TeamDetails";
import PlayerDetails from "./pages/PlayerDetails";
import TeamsList from "./components/lists/TeamsList";

function App() {
  // fetch("http://localhost:4200/api/creds")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });

  // fetch("http://localhost:4200/users", {
  //   body: JSON.stringify({
  //     name: "rené",
  //     email: "rené@test.com",
  //     _id: "1",
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   method: "POST",
  // })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });

  // fetch("http://localhost:4200/users")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });

  // fetch("http://localhost:4200/api/leagues/39?season=2021")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => console.log(res));

  // fetch("http://localhost:4200/api/leagues?search=premie")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => console.log(res));

  // fetch(
  //   "http://localhost:4200/api/leagues/getLeaguesFromTeam?team=33&season=2021"
  // )
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then(async (res) => {
  //     let allGoals = await res.map(async (daLeague) => {
  //       const response = await fetch(
  //         `http://localhost:4200/api/teams/33/statistics?season=2021&league=${daLeague.id}`
  //       );
  //       const resp = await response.json();
  //       return {
  //         matches: resp.matches,
  //         victories: resp.victories,
  //         draws: resp.draws,
  //         loses: resp.loses,
  //         goals: resp.goals,
  //       };
  //     });
  //     return Promise.all(allGoals);
  //   })
  //   .then((res) => {
  //     let total = { matches: 0, victories: 0, draws: 0, loses: 0, goals: 0 };
  //     res.forEach((league) => {
  //       total.matches += league.matches;
  //       total.victories += league.victories;
  //       total.draws += league.draws;
  //       total.loses += league.loses;
  //       total.goals += league.goals;
  //     });
  //     console.log(total);
  //   });

  // fetch("http://localhost:4200/api/teams/33/statistics?season=2021&league=39")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => console.log(res));

  // fetch("http://localhost:4200/api/coach?team=33")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   });

  // const getAllplayers = async () => {
  //   let page = 1;
  //   let totalPages = 1;

  //   let allPlayers = await fetch(
  //     `http://localhost:4200/api/players?team=33&season=2021&page=${page}`
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((response) => {
  //       totalPages = response.totalPages;
  //       return response.players;
  //     })
  // .then(async (response) => {
  //   let players = [];
  //   players.push(...response);
  //   for (let i = page + 1; i < totalPages + 1; i++) {
  //     await fetch(
  //       `http://localhost:4200/api/players?team=33&season=2021&page=${i}`
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((resp) => {
  //         players.push(...resp.players);
  //         return;
  //       });
  //   }
  //   return Promise.all(players);
  // })
  //     .then((res) => {
  //       return res;
  //     });
  //   console.log(allPlayers);
  //   return allPlayers;
  // };

  // getAllplayers();

  // fetch("http://localhost:4200/api/players/874?season=2021")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => console.log(res));

  // fetch("http://localhost:4200/api/players/teamPlayed/874")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => console.log(res));

  return (
    <Layout className="centered">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/league/:leagueId">
          <TeamsList />
        </Route>
        <Route path="/team/:teamId">
          <TeamDetails />
        </Route>
        <Route path="/player/:playerId">
          <PlayerDetails />
        </Route>
        {/* <Route path="/players">
          <Players />
        </Route> */}
      </Switch>
    </Layout>
  );
}

export default App;
