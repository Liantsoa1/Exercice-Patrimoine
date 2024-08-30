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
                const response = await axios.get(`http://localhost:5000/possession/${encodeURIComponent(libelle)}`);
                setPossession(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de la possession:', error);
            }
        };

        fetchPossession();
    }, [libelle]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Formatage des données avant l'envoi
            const updatedData = {
                possesseur: { nom: "John Doe" }, // Ajoutez le possesseur si nécessaire
                libelle: possession.libelle,
                valeur: possession.valeur,
                dateDebut: possession.dateDebut,
                dateFin: possession.dateFin,
                tauxAmortissement: possession.tauxAmortissement,
            };

            await axios.put(`http://localhost:5000/possession/${encodeURIComponent(libelle)}`, updatedData);
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
                <input
                    type="number"
                    value={possession.valeur}
                    onChange={(e) => setPossession({ ...possession, valeur: e.target.value })}
                />
            </div>
            <div>
                <label>Date de début:</label>
                <input
                    type="date"
                    value={possession.dateDebut.split('T')[0]} // Formatage pour l'input date
                    onChange={(e) => setPossession({ ...possession, dateDebut: e.target.value })}
                />
            </div>
            <div>
                <label>Date de fin:</label>
                <input
                    type="date"
                    value={possession.dateFin ? possession.dateFin.split('T')[0] : ''}
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