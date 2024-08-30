import React, { useState } from 'react';
import axios from 'axios';

function PatrimoineValuation() {
    const [date, setDate] = useState('');
    const [patrimoineTotal, setPatrimoineTotal] = useState(0);
    const [error, setError] = useState('');

    const handleDateChange = async (event) => {
        const selectedDate = event.target.value;
        setDate(selectedDate);

        try {
            const response = await axios.get(`http://localhost:5000/patrimoine/${selectedDate}`);
            setPatrimoineTotal(response.data.valeur);
            setError(''); 
        } catch (error) {
            console.error('Erreur lors de la récupération de la valeur du patrimoine:', error);
            setError('Erreur lors de la récupération de la valeur du patrimoine');
        }
    };

    return (
        <div>
            <h2>Évaluation du Patrimoine</h2>
            <input 
                type="date" 
                value={date} 
                onChange={handleDateChange} 
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Valeur du patrimoine au {date}: {patrimoineTotal} Ar</p>
        </div>
    );
}

export default PatrimoineValuation;