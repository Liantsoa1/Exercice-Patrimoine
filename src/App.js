import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ShowTable from './Showtable'; 
import CreatePossession from './Createpossession'; 
import EditPossession from './EditPossession';
import PatrimoineValuation from './PatrimoineValuation'; // Importez le nouveau composant

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
                            <li>
                                <Link to="/patrimoine">Évaluation du Patrimoine</Link> {/* Ajoutez un lien vers l'évaluation du patrimoine */}
                            </li>
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/possession" element={<ShowTable />} />
                    <Route path="/possession/create" element={<CreatePossession />} />
                    <Route path="/" element={<h1>Bienvenue sur la page d'accueil</h1>} />
                    <Route path="/possession/:libelle" element={<EditPossession />} />
                    <Route path="/patrimoine" element={<PatrimoineValuation />} /> {/* Route pour l'évaluation du patrimoine */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;