import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePossession = () => {
    const { libelle } = useParams();
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [taux, setTaux] = useState('');
    const [dateFin, setDateFin] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPossession = async () => {
            try {
                const response = await fetch(`http://localhost:5000/possession/${libelle}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération de la possession');
                }
                const possession = await response.json();
                setValeur(possession.valeur);
                setDateDebut(possession.dateDebut);
                setTaux(possession.taux);
                setDateFin(possession.dateFin || ''); // Si dateFin est null, afficher une chaîne vide
            } catch (error) {
                console.error(error);
            }
        };

        fetchPossession();
    }, [libelle]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/possession/${libelle}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    valeur: Number(valeur), // Convertir en nombre
                    dateDebut,
                    taux: Number(taux), // Convertir en nombre
                    dateFin
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de la possession');
            }

            const updatedPossession = await response.json();
            console.log('Possession mise à jour:', updatedPossession);
            navigate('/possession'); // Redirige vers la page des possessions
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Mettre à Jour la Possession: {libelle}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Valeur :
                    <input
                        type="number"
                        value={valeur}
                        onChange={(e) => setValeur(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Date de Début :
                    <input
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Taux d'Amortissement :
                    <input
                        type="number"
                        value={taux}
                        onChange={(e) => setTaux(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Date de Fin :
                    <input
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                    />
                </label>
                <button type="submit">Mettre à Jour</button>
            </form>
        </div>
    );
};

export default UpdatePossession;