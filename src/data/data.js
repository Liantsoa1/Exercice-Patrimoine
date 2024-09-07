import fetch from 'cross-fetch';

// Définir l'URL de l'API en fonction de l'environnement
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Fonction pour récupérer la liste des possessions
export const fetchData = async () => {
    const response = await fetch(`${API_URL}/possession`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
    }
    return response.json();
};

// Fonction pour créer une nouvelle possession
export const createData = async (newData) => {
    const response = await fetch(`${API_URL}/possession/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la création de la possession');
    }
    return response.json();
};