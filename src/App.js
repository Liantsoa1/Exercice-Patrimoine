import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ShowTable from './Showtable'; 
import CreatePossession from './Createpossession'; 

const App = () => {
    return (
        <Router>
            <div>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/possession">Possessions</Link>
                            </li>
                            <li>
                                <Link to="/possession/create">Créer une Possession</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/possession" element={<ShowTable />} />
                    <Route path="/possession/create" element={<CreatePossession />} />
                    <Route path="/" element={<h1>Bienvenue sur la page d'accueil</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;