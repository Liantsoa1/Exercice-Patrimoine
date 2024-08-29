import React, { useState } from 'react';

const PatrimoineForm = () => {
    const [date, setDate] = useState('');
    const [valeur, setValeur] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/patrimoine/${date}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération de la valeur du patrimoine');
            }
            const data = await response.json();
            setValeur(data.valeur);
        } catch (error) {
            console.error(error);
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
            {valeur !== null && (
                <div>
                    <h3>Valeur du patrimoine à la date {date}: {valeur}</h3>
                </div>
            )}
        </div>
    );
};

export default PatrimoineForm;