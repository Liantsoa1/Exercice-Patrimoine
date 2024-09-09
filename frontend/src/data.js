import fetch from 'cross-fetch';

// Définir l'URL de l'API en fonction de l'environnement
const API_URL = process.env.REACT_APP_API_URL;

// Fonction pour récupérer la liste des possessions
export const fetchData = async () => {
    try {
        const response = await fetch(`${API_URL}/possession`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
};

// Fonction pour créer une nouvelle possession
export const createData = async (newData) => {
    try {
        const response = await fetch(`${API_URL}/possession`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la création de la possession');
        }
        const createdData = await response.json();
        return createdData;
    } catch (error) {
        console.error('Erreur lors de la création de la possession:', error);
        throw error;
    }
};