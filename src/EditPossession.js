import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPossession() {
    const { libelle } = useParams();
    const [possession, setPossession] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPossession = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/possession/${libelle}`);
                if (response.data.valeurConstante !== null) {

                    navigate('/possession');
                } else {
                    setPossession(response.data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de la possession:', error);
            }
        };

        fetchPossession();
    }, [libelle, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/possession/${libelle}`, {
                dateFin: possession.dateFin,
                tauxAmortissement: possession.tauxAmortissement,
            });
            navigate('/possession'); 
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la possession:', error);
        }
    };

    if (!possession) return <div>Loading...</div>;

    return (
        <form onSubmit={handleUpdate}>
            <div>
                <label>Libelle:</label>
                <input type="text" value={possession.libelle} readOnly />
            </div>
            <div>
                <label>Valeur:</label>
                <input type="number" value={possession.valeur} readOnly />
            </div>
            <div>
                <label>Date de début:</label>
                <input type="date" value={possession.dateDebut} readOnly />
            </div>
            <div>
                <label>Date de fin:</label>
                <input
                    type="date"
                    value={possession.dateFin || ''}
                    onChange={(e) => setPossession({ ...possession, dateFin: e.target.value })}
                />
            </div>
            <div>
                <label>Taux d'amortissement:</label>
                <input
                    type="number"
                    value={possession.tauxAmortissement || ''}
                    onChange={(e) => setPossession({ ...possession, tauxAmortissement: e.target.value })}
                />
            </div>
            <button type="submit">Mettre à jour</button>
        </form>
    );
}

export default EditPossession;