import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
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
  fetch("http://localhost:4200/api/teams/33/statistics?season=2021")
    .then((res) => {
      return res.json();
    })
    .then((res) => console.log(res));

  return (
    <Layout className="centered">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/teams" />
        </Route>
        <Route path="/teams" exact>
          <Teams />
        </Route>
        <Route path="/players">
          <Players />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
