import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import formatDate from "./formatDate"; 
import calculateValue from "./CalculateValue"; 
import { Link } from "react-router-dom"; 
import "./table.css";
import "./CSS/ShowTable.css";

function ShowTable() {
    const [patrimoine, setPatrimoine] = useState([]);

    // Définir l'URL de l'API en fonction de l'environnement
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/possession`);
                setPatrimoine(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des possessions:', error);
            }
        };

        fetchData();
    }, []);

    const handleClose = async (libelle) => {
        try {
            await axios.post(`${API_URL}/possession/${encodeURIComponent(libelle)}/close`);
            
            const response = await axios.get(`${API_URL}/possession`);
            setPatrimoine(response.data);
        } catch (error) {
            console.error('Erreur lors de la fermeture de la possession:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Liste des Possessions</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th className="index-cell">#</th>
                        <th>Libelle</th>
                        <th>Valeur initiale</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Amortissement</th>
                        <th>Valeur constante</th>
                        <th>Valeur actuelle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patrimoine.map((possession, index) => (
                        <tr key={index}>
                            <td className="index-cell">{index + 1}</td>
                            <td>{possession?.libelle}</td>
                            <td>{possession?.valeur}</td>
                            <td>{formatDate(possession?.dateDebut)}</td>
                            <td>{possession?.dateFin ? formatDate(possession?.dateFin) : 'N/A'}</td>
                            <td>{possession?.tauxAmortissement}</td>
                            <td>{possession?.valeurConstante !== null ? possession?.valeurConstante : 'N/A'}</td>
                            <td>
                                {calculateValue(
                                    possession?.valeur,
                                    possession?.dateDebut,
                                    possession?.tauxAmortissement,
                                    possession?.valeurConstante,
                                    new Date() 
                                )}
                            </td>
                            <td>
                                <Link to={`/possession/${encodeURIComponent(possession.libelle)}`}>
                                    <Button variant="success" className="me-2 btn-text">Éditer</Button>
                                </Link>
                                <Button variant="danger" className="btn-text" onClick={() => handleClose(possession.libelle)}>Fermer</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ShowTable;