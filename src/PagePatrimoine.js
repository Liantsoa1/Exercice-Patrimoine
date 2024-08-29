import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PagePatrimoine = () => {
    const [dateDebut, setDateDebut] = useState(new Date());
    const [dateFin, setDateFin] = useState(new Date());
    const [jour, setJour] = useState(1);
    const [valeurPatrimoine, setValeurPatrimoine] = useState([]);
    const [labels, setLabels] = useState([]);

    const handleSubmit = async () => {
        try {
            const response = await fetch('/patrimoine/range', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'month', 
                    dateDebut: dateDebut.toISOString(),
                    dateFin: dateFin.toISOString(),
                    jour: jour,
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des valeurs du patrimoine');
            }

            const data = await response.json();
            setValeurPatrimoine(data.map(item => item.valeur));
            setLabels(data.map(item => new Date(item.date).toLocaleDateString()));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Page Patrimoine</h1>
            <div>
                <label>Date de début:</label>
                <DatePicker selected={dateDebut} onChange={date => setDateDebut(date)} />
                <label>Date de fin:</label>
                <DatePicker selected={dateFin} onChange={date => setDateFin(date)} />
                <label>Jour:</label>
                <input
                    type="number"
                    value={jour}
                    onChange={e => setJour(e.target.value)}
                />
                <button onClick={handleSubmit}>Valider</button>
            </div>
            <Line
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: 'Valeur du Patrimoine',
                            data: valeurPatrimoine,
                            borderColor: 'rgba(75,192,192,1)',
                            backgroundColor: 'rgba(75,192,192,0.2)',
                            fill: true,
                        }
                    ],
                }}
                options={{
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                }}
            />
        </div>
    );
};

export default PagePatrimoine;