import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Leagues from "./pages/Leagues";
import Players from "./pages/Players";
import Teams from "./pages/Teams";

function App() {
  // fetch("http://localhost:4200/api/creds")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });
  return (
    <Layout className="centered">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/teams" />
        </Route>
        <Route path="/teams" exact>
          <Teams />
        </Route>
        <Route path="/leagues">
          <Leagues />
        </Route>
        <Route path="/players">
          <Players />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
