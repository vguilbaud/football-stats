import LeaguesList from "../components/lists/LeaguesList";

const Home = (props) => {
  return (
    <div>
      <h1>Football stats</h1>
      <p>The best tool to know who's the best scorer!</p>
      <LeaguesList />
    </div>
  );
};

export default Home;
