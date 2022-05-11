import Layout from "./components/layout/Layout";

function App() {
  // fetch("http://localhost:4200/api/creds")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });
  return (
    <Layout>
      <p className="centered">Da content</p>
    </Layout>
  );
}

export default App;
