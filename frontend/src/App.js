import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import ShowTable from './Showtable'; 
import CreatePossession from './Createpossession'; 
import EditPossession from './EditPossession';
import PatrimoineValuation from './PatrimoineValuation'; 
import PatrimoineRangeWithChart from './PatrimoineRangeWithChart.js'; 
import './CSS/app.css'; 

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <header className="app-header">
                    <h1 className="welcome-message">Bienvenue sur notre application de gestion de patrimoine !</h1>
                    <nav className="navbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/possession" className="nav-link" activeClassName="active">Possessions</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/possession/create" className="nav-link" activeClassName="active">Créer une Possession</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/patrimoine" className="nav-link" activeClassName="active">Évaluation du Patrimoine</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/patrimoine/range" className="nav-link" activeClassName="active">Plage de Dates</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/possession" element={<ShowTable />} />
                        <Route path="/possession/create" element={<CreatePossession />} />
                        <Route path="/possession/:libelle" element={<EditPossession />} />
                        <Route path="/patrimoine" element={<PatrimoineValuation />} />
                        <Route path="/patrimoine/range" element={<PatrimoineRangeWithChart />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;