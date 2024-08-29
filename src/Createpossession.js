import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePossession() {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [tauxAmortissement, setTauxAmortissement] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/possession/create', {
                libelle,
                valeur: Number(valeur), // Convertir en nombre
                dateDebut,
                dateFin,
                tauxAmortissement: Number(tauxAmortissement) // Convertir en nombre
            });
            navigate('/possession'); // Rediriger vers la liste des possessions après la création
        } catch (error) {
            console.error('Erreur lors de la création de la possession:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Libelle:</label>
                <input
                    type="text"
                    value={libelle}
                    onChange={(e) => setLibelle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Valeur:</label>
                <input
                    type="number"
                    value={valeur}
                    onChange={(e) => setValeur(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Date de début:</label>
                <input
                    type="date"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Date de fin:</label>
                <input
                    type="date"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                />
            </div>
            <div>
                <label>Taux d'amortissement:</label>
                <input
                    type="number"
                    value={tauxAmortissement}
                    onChange={(e) => setTauxAmortissement(e.target.value)}
                />
            </div>
            <button type="submit">Créer Possession</button>
        </form>
    );
}

export default CreatePossession;