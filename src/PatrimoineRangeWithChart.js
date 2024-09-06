import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './CSS/patrimoineRange.css';

const PatrimoineRangeWithChart = () => {
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [jour, setJour] = useState('');
    const [chartData, setChartData] = useState(null);
    const [valeurPatrimoine, setValeurPatrimoine] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/patrimoine/range', {
                dateDebut,
                dateFin,
                jour
            });

            const data = response.data;
            const labels = data.map(item => item.date);
            const values = data.map(item => item.valeur);

            const totalValeur = values.reduce((acc, val) => acc + val, 0);
            setValeurPatrimoine(totalValeur);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Valeur du Patrimoine',
                        data: values,
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                    },
                ],
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    return (
        <div>
            <h2>Évolution du Patrimoine</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <label className="form-label">
                    Date de début :
                    <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
                </label>
                <label className="form-label">
                    Date de fin :
                    <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required />
                </label>
                <label className="form-label">
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
                <button type="submit" className="submit-button">Valider</button>
            </form>
            <p>Valeur totale du patrimoine : {valeurPatrimoine} Ar</p>
            {chartData && (
                <div>
                    <Line data={chartData} />
                </div>
            )}
        </div>
    );
};

export default PatrimoineRangeWithChart;