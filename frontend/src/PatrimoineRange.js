import React, { useState } from 'react';
import axios from 'axios';

const PatrimoineRange = () => {
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [jour, setJour] = useState(''); 
    const [valeurPatrimoine, setValeurPatrimoine] = useState(0);
    const [error, setError] = useState(''); // État pour gérer les erreurs

    // Définir l'URL de l'API en fonction de l'environnement
    const API_URL = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${API_URL}/patrimoine/range`, {
                dateDebut,
                dateFin,
                jour
            });

            const valeurs = response.data;
            const totalValeur = valeurs.reduce((acc, item) => acc + item.valeur, 0);
            setValeurPatrimoine(totalValeur);
            setError(''); // Réinitialiser l'erreur en cas de succès
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            setError('Erreur lors de la récupération des données'); // Mettre à jour l'état d'erreur
            setValeurPatrimoine(0); // Réinitialiser la valeur en cas d'erreur
        }
    };

    return (
        <div>
            <h2>Valeur du patrimoine sur une plage de dates</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Date de début :
                    <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
                </label>
                <label>
                    Date de fin :
                    <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required />
                </label>
                <label>
                    Jour de la semaine :
                    <select value={jour} onChange={(e) => setJour(e.target.value)}>
                        <option value="">Sélectionnez un jour</option>
                        <option value="0">Dimanche</option>
                        <option value="1">Lundi</option>
                        <option value="2">Mardi</option>
                        <option value="3">Mercredi</option>
                        <option value="4">Jeudi</option>
                        <option value="5">Vendredi</option>
                        <option value="6">Samedi</option>
                    </select>
                </label>
                <button type="submit">Calculer</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Afficher l'erreur si elle existe */}
            <p>Valeur du patrimoine : {valeurPatrimoine} Ar</p>
        </div>
    );
};

export default PatrimoineRange;