import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import calculateValue from '../frontend/src/CalculateValue.js';
import calculateValue2 from '../frontend/src/CalculateValue2.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

// Chemin vers le fichier data.
const dataFilePath = path.join(__dirname, 'data.json');

// Endpoint pour récupérer la liste des possessions
app.get('/possession', async (req, res) => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        const patrimoineData = JSON.parse(data);
        
        // Vérifiez si le modèle "Patrimoine" existe avant d'accéder à ses données
        const patrimoineItem = patrimoineData.find(item => item.model === "Patrimoine");
        if (!patrimoineItem) {
            return res.status(404).json({ message: 'Modèle Patrimoine non trouvé' });
        }

        // Vérifiez si les possessions existent
        const possessions = patrimoineItem.data.possessions;
        if (!Array.isArray(possessions)) {
            return res.status(500).json({ message: 'Les possessions ne sont pas dans le format attendu' });
        }

        res.json(possessions);
    } catch (error) {
        console.error('Erreur lors de la récupération des possessions:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des possessions' });
    }
});

// Endpoint pour créer une nouvelle possession
app.post('/possession', async (req, res) => {
    try {
        const { libelle, valeur, dateDebut, taux, valeurConstante } = req.body;

        // Validation des données entrantes
        if (!libelle || !valeur || !dateDebut) {
            return res.status(400).json({ message: 'Libelle, valeur et dateDebut sont requis.' });
        }

        const newPossession = {
            libelle,
            valeur: Number(valeur),
            dateDebut,
            tauxAmortissement: Number(taux) || null,
            dateFin: null,
            valeurConstante: valeurConstante || null
        };

        const data = await fs.readFile(dataFilePath, 'utf8');
        const patrimoineData = JSON.parse(data);
        
        // Vérifiez que la structure de patrimoineData est correcte
        const patrimoineItem = patrimoineData.find(item => item.model === "Patrimoine");
        if (!patrimoineItem) {
            return res.status(404).json({ message: 'Modèle Patrimoine non trouvé' });
        }

        patrimoineItem.data.possessions.push(newPossession); // Ajoutez la nouvelle possession

        const updatedData = JSON.stringify(patrimoineData, null, 2);
        await fs.writeFile(dataFilePath, updatedData);
        res.status(201).json(newPossession);
    } catch (error) {
        console.error('Erreur lors de la création de la possession:', error);
        res.status(500).json({ message: 'Erreur lors de la création de la possession' });
    }
});

// Endpoint pour créer une nouvelle possession avec un chemin différent
app.post('/possession/create', async (req, res) => {
    try {
        const { libelle, valeur, dateDebut, dateFin, tauxAmortissement } = req.body;

        // Validation des données entrantes
        if (!libelle || !valeur || !dateDebut) {
            return res.status(400).json({ message: 'Libelle, valeur et dateDebut sont requis.' });
        }

        const data = await fs.readFile(dataFilePath, 'utf8');
        const patrimoineData = JSON.parse(data);

        const possessions = patrimoineData.find(item => item.model === "Patrimoine").data.possessions;

        const newPossession = {
            libelle,
            valeur: Number(valeur), 
            dateDebut,
            dateFin: dateFin || null,
            tauxAmortissement: Number(tauxAmortissement) || null 
        };

        possessions.push(newPossession); 

        const updatedData = JSON.stringify(patrimoineData, null, 2);
        await fs.writeFile(dataFilePath, updatedData);

        res.status(201).json(newPossession);
    } catch (error) {
        console.error('Erreur lors de la création de la possession:', error);
        res.status(500).json({ message: 'Erreur lors de la création de la possession' });
    }
});

app.get('/possession/:libelle', async (req, res) => {
    try {
        const { libelle } = req.params;
        const data = await fs.readFile(dataFilePath, 'utf8');
        const patrimoineData = JSON.parse(data);

        const patrimoineItem = patrimoineData.find(item => item.model === "Patrimoine");
        if (!patrimoineItem) {
            return res.status(404).json({ message: 'Modèle Patrimoine non trouvé' });
        }

        const possession = patrimoineItem.data.possessions.find(p => p.libelle === libelle);
        if (!possession) {
            return res.status(404).json({ message: 'Possession non trouvée' });
        }

        res.json(possession);
    } catch (error) {
        console.error('Erreur lors de la récupération de la possession:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la possession' });
    }
});

// Endpoint pour mettre à jour une possession
app.put('/possession/:libelle', async (req, res) => {
    try {
        const { libelle } = req.params;
        const { dateFin, tauxAmortissement, valeur } = req.body;

        const data = await fs.readFile(dataFilePath, 'utf8');
        const patrimoineData = JSON.parse(data);
        const patrimoineItem = patrimoineData.find(item => item.model === "Patrimoine");
        
        if (!patrimoineItem) {
            return res.status(404).json({ message: 'Modèle Patrimoine non trouvé' });
        }

        const possessions = patrimoineItem.data.possessions;
        const possessionIndex = possessions.findIndex(p => p.libelle === libelle);

        if (possessionIndex === -1) {
            return res.status(404).json({ message: 'Possession non trouvée' });
        }

        // Mettez à jour les propriétés uniquement si elles sont définies
        if (dateFin !== undefined) {
            possessions[possessionIndex].dateFin = dateFin;
        }
        if (tauxAmortissement !== undefined) {
            possessions[possessionIndex].tauxAmortissement = Number(tauxAmortissement);
        }
        if (valeur !== undefined) {
            possessions[possessionIndex].valeur = Number(valeur);
        }

        const updatedData = JSON.stringify(patrimoineData, null, 2);
        await fs.writeFile(dataFilePath, updatedData);

        res.json(possessions[possessionIndex]);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la possession:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la possession' });
    }
});

// Endpoint pour clôturer une possession
app.post('/possession', async (req, res) => {
    try {
        const { libelle } = req.body; // Récupération du libelle depuis le corps de la requête
        if (!libelle) {
            return res.status(400).json({ message: 'Libelle est requis.' });
        }

        const data = await fs.readFile(dataFilePath, 'utf8');
        const patrimoineData = JSON.parse(data);
        
        // Vérifier si le modèle "Patrimoine" existe
        const patrimoineItem = patrimoineData.find(item => item.model === "Patrimoine");
        if (!patrimoineItem) {
            return res.status(404).json({ message: 'Modèle Patrimoine non trouvé' });
        }

        const possessions = patrimoineItem.data.possessions;
        const possessionIndex = possessions.findIndex(p => p.libelle === libelle);

        if (possessionIndex === -1) {
            return res.status(404).json({ message: 'Possession non trouvée' });
        }

        // Clôturer la possession
        possessions[possessionIndex].dateFin = new Date().toISOString();

        const updatedData = JSON.stringify(patrimoineData, null, 2);
        await fs.writeFile(dataFilePath, updatedData);

        // Retourner la possession mise à jour
        res.json(possessions[possessionIndex]);
    } catch (error) {
        console.error('Erreur lors de la fermeture de la possession:', error);
        res.status(500).json({ message: 'Erreur lors de la fermeture de la possession' });
    }
});

// Endpoint pour récupérer la valeur du patrimoine par date
app.get('/patrimoine/:date', async (req, res) => {
    try {
        const { date } = req.params;
        const dateObject = new Date(date); 

        const data = await fs.readFile(dataFilePath, 'utf8');
        const patrimoineData = JSON.parse(data).find(item => item.model === "Patrimoine");

        if (!patrimoineData) {
            return res.status(404).json({ message: 'Modèle Patrimoine non trouvé' });
        }

        const possessions = patrimoineData.data.possessions;

        let totalValeur = 0;

        possessions.forEach(possession => {
            const dateDebut = new Date(possession.dateDebut);
            const dateFin = possession.dateFin ? new Date(possession.dateFin) : new Date();

            if (dateObject >= dateDebut && dateObject <= dateFin) {
                totalValeur += calculateValue(
                    possession.valeur,
                    possession.dateDebut,
                    possession.tauxAmortissement,
                    possession.valeurConstante,
                    date
                );
            }
        });

        res.json({ date: date, valeur: totalValeur });
    } catch (error) {
        console.error('Erreur lors de la récupération de la valeur du patrimoine:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la valeur du patrimoine' });
    }
});

// Endpoint pour clôturer une possession par libelle
app.post('/possession/:libelle/close', async (req, res) => {
    try {
        const { libelle } = req.params; // Récupération du libelle depuis les paramètres de l'URL
        const data = await fs.readFile(dataFilePath, 'utf8');
        const patrimoineData = JSON.parse(data);
        const possessions = patrimoineData.find(item => item.model === "Patrimoine").data.possessions;

        const possessionIndex = possessions.findIndex(p => p.libelle === libelle);
        if (possessionIndex === -1) {
            return res.status(404).json({ message: 'Possession non trouvée' });
        }

        possessions[possessionIndex].dateFin = new Date().toISOString(); // Clôturer la possession

        const updatedData = JSON.stringify(patrimoineData, null, 2);
        await fs.writeFile(dataFilePath, updatedData);
        res.json(possessions[possessionIndex]); // Retourner la possession mise à jour
    } catch (error) {
        console.error('Erreur lors de la fermeture de la possession:', error);
        res.status(500).json({ message: 'Erreur lors de la fermeture de la possession' });
    }
});

// Endpoint pour récupérer la valeur du patrimoine dans une plage de dates
app.post('/patrimoine/range', async (req, res) => {
    try {
        const { dateDebut, dateFin, jour } = req.body;

        // Validation des données entrantes
        if (!dateDebut || !dateFin || !jour) {
            return res.status(400).json({ message: 'dateDebut, dateFin et jour sont requis.' });
        }

        const data = await fs.readFile(dataFilePath, 'utf8');
        const patrimoineData = JSON.parse(data).find(item => item.model === "Patrimoine");
        if (!patrimoineData) {
            return res.status(404).json({ message: 'Modèle Patrimoine non trouvé' });
        }

        const possessions = patrimoineData.data.possessions;

        let results = [];
        let currentDate = new Date(dateDebut);

        while (currentDate <= new Date(dateFin)) {
            if (currentDate.getDay() === parseInt(jour)) {
                let totalValeur = 0;

                possessions.forEach(possession => {
                    const dateDebutObj = new Date(possession.dateDebut);
                    const dateFinObj = possession.dateFin ? new Date(possession.dateFin) : new Date();

                    if (currentDate >= dateDebutObj && currentDate <= dateFinObj) {
                        totalValeur += calculateValue2(
                            possession.valeur,
                            possession.dateDebut,
                            possession.tauxAmortissement,
                            possession.valeurConstante,
                            currentDate.toISOString().slice(0, 10)
                        );
                    }
                });

                results.push({ date: currentDate.toISOString().slice(0, 10), valeur: totalValeur });
            }

            currentDate.setDate(currentDate.getDate() + 1); 
        }

        res.json(results); // Retourner les résultats
    } catch (error) {
        console.error('Erreur lors de la récupération de la valeur du patrimoine:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la valeur du patrimoine' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

// Middleware pour servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Route pour toutes les autres requêtes (pour les routes de l'application frontend)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});