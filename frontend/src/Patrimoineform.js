import React, { useState } from 'react';

const PatrimoineForm = () => {
    const [date, setDate] = useState('');
    const [valeur, setValeur] = useState(null);
    const [error, setError] = useState(''); // État pour gérer les erreurs

    // Définir l'URL de l'API en fonction de l'environnement
    const API_URL = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Réinitialiser l'erreur avant la soumission

        try {
            const response = await fetch(`${API_URL}/patrimoine/${date}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération de la valeur du patrimoine');
            }
            const data = await response.json();
            setValeur(data.valeur);
        } catch (error) {
            console.error(error);
            setError('Erreur lors de la récupération de la valeur du patrimoine'); // Mettre à jour l'état d'erreur
            setValeur(null); // Réinitialiser la valeur en cas d'erreur
        }
    };

    return (
        <div>
            <h2>Récupérer la valeur du patrimoine</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Date :
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Récupérer</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Afficher l'erreur si elle existe */}
            {valeur !== null && (
                <div>
                    <h3>Valeur du patrimoine à la date {date}: {valeur} Ar</h3>
                </div>
            )}
        </div>
    );
};

export default PatrimoineForm;