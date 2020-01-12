import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./styles.css";

class App extends React.Component {
  state = {
    gists: null
  };

  componentDidMount() {
    fetch("https://api.github.com/gists")
      .then(res => res.json())
      .then(gists => {
        this.setState({
          gists
        });
      });
  }

  render() {
    const { gists } = this.state;
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <Router>
              <div className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                  <ul className="nav flex-column">
                    {gists ? (
                      gists.map(gist => (
                        <li key={gist.id} className="nav-item">
                          <Link to={`/g/${gist.id}`}>
                            {gist.description || "[no descriptions]"}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <div> Loading....</div>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-md-10">
                <Route exact path="/" render={() => <h1>Welcome</h1>} />
                {gists && (
                  <Route
                    path="/g/:gistId"
                    render={({ match }) => (
                      <Gist
                        gist={gists.find(g => g.id === match.params.gistId)}
                      />
                    )}
                  />
                )}
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

const Gist = ({ gist }) => {
  console.log(gist);
  return <div>{gist.description || "no found"}</div>;
};
