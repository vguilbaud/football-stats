import { useLocation } from "react-router-dom";

const PlayerDetails = (props) => {
  const location = useLocation();
  const playerId = location.pathname.replace(/[^0-9]/g, "");

  fetch(`http://localhost:4200/api/players/${playerId}?season=2021`).then(
    (res) => res.json().then((res) => console.log(res))
  );

  return <p>{}</p>;
};

export default PlayerDetails;
