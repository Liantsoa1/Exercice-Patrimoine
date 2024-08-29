import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import formatDate from "./formatDate";
import calculateValue from "./CalculateValue";
import { Link } from "react-router-dom"; 
import "./table.css";

function ShowTable() {
    const [patrimoine, setPatrimoine] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/possession");
                setPatrimoine(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des possessions:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="table-container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>libelle</th>
                            <th>valeur initiale</th>
                            <th>date de debut</th>
                            <th>date de fin</th>
                            <th>amortissement</th>
                            <th>valeur constante</th>
                            <th>valeur actuelle</th>
                            <th>Actions</th> {}
                        </tr>
                    </thead>
                    <tbody>
                        {patrimoine.map((possession, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
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
                                    <Link to={`/possession/${possession.libelle}/edit`}>
                                        <button className="btn btn-primary">Éditer</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ShowTable;