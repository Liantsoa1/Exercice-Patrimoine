import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PagePatrimoine from "./PagePatrimoine";
import ShowTable from "./Showtable";

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/patrimoine">Patrimoine</Link>
              </li>
              <li>
                <Link to="/possession">Possessions</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/patrimoine" element={<PagePatrimoine />} />
          <Route path="/possession" element={<ShowTable />} />
          <Route
            path="/possession/:libelle/edit"
            element={<EditPossession />}
          />
          <Route path="/" element={<h1>Bienvenue sur la page d'accueil</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
