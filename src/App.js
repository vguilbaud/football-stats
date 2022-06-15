import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import TeamDetails from "./pages/TeamDetails/TeamDetails";
import PlayerDetails from "./pages/PlayerDetails/PlayerDetails";
import LeagueTeamsList from "./pages/LeagueDetails/LeagueTeamsList";

function App() {
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
          <LeagueTeamsList />
        </Route>
        <Route path="/team/:teamId">
          <TeamDetails />
        </Route>
        <Route path="/player/:playerId">
          <PlayerDetails />
        </Route>
        <Route path="*">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
