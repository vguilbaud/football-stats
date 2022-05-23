const PlayerList = (props) => {
  console.log(props);

  const getAllplayers = async () => {
    let page = 1;
    let totalPages = 1;

    let allPlayers = await fetch(
      `http://localhost:4200/api/players?team=${props.teamId}&season=${props.season}&page=${page}`
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((response) => {
        totalPages = response.totalPages;
        return response.players;
      })
      .then(async (response) => {
        let players = [];
        players.push(...response);
        for (let i = page + 1; i < totalPages + 1; i++) {
          await fetch(
            `http://localhost:4200/api/players?team=${props.teamId}&season=${props.season}&page=${i}`
          )
            .then((res) => {
              return res.json();
            })
            .then((resp) => {
              players.push(...resp.players);
              return;
            });
        }
        return Promise.all(players);
      })
      .then((res) => {
        return res;
      });
    console.log(allPlayers);
    return allPlayers;
  };

  getAllplayers();

  return <p>PlayerList</p>;
};

export default PlayerList;
