import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Chemin vers le fichier data.json
const dataFilePath = path.join(__dirname, '..', 'src', 'data', 'data.json');

// Endpoint pour récupérer la liste des possessions
app.get('/possession', async (req, res) => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        const patrimoineData = JSON.parse(data);
        const possessions = patrimoineData.find(item => item.model === "Patrimoine").data.possessions; // Accéder à la bonne structure
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
        patrimoineData.data.possessions.push(newPossession);

        const updatedData = JSON.stringify(patrimoineData, null, 2);
        await fs.writeFile(dataFilePath, updatedData);
        res.status(201).json(newPossession);
    } catch (error) {
        console.error('Erreur lors de la création de la possession:', error);
        res.status(500).json({ message: 'Erreur lors de la création de la possession' });
    }
});

app.post('/possession/create', async (req, res) => {
    try {
        const { libelle, valeur, dateDebut, dateFin, tauxAmortissement } = req.body;

        const data = await fs.readFile(dataFilePath, 'utf8');
        const patrimoineData = JSON.parse(data);

        const possessions = patrimoineData.find(item => item.model === "Patrimoine").data.possessions;

        const newPossession = {
            libelle,
            valeur: Number(valeur), 
            dateDebut,
            dateFin,
            tauxAmortissement: Number(tauxAmortissement) 
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
        const possession = patrimoineData.find(item => item.model === "Patrimoine").data.possessions.find(p => p.libelle === libelle);
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
        const patrimoineData = JSON.parse(data).find(item => item.model === "Patrimoine");
        const possessions = patrimoineData.data.possessions;

        const possessionIndex = possessions.findIndex(p => p.libelle === libelle);
        if (possessionIndex === -1) {
            return res.status(404).json({ message: 'Possession non trouvée' });
        }

        possessions[possessionIndex].dateFin = dateFin !== undefined ? dateFin : possessions[possessionIndex].dateFin;
        possessions[possessionIndex].tauxAmortissement = tauxAmortissement !== undefined ? Number(tauxAmortissement) : possessions[possessionIndex].tauxAmortissement;
        possessions[possessionIndex].valeur = valeur !== undefined ? Number(valeur) : possessions[possessionIndex].valeur;

        const updatedData = JSON.stringify(patrimoineData, null, 2);
        await fs.writeFile(dataFilePath, updatedData);

        res.json(possessions[possessionIndex]);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la possession:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la possession' });
    }
});

// Endpoint pour clôturer une possession
// Endpoint pour clôturer une possession
app.post('/possession/:libelle/close', async (req, res) => {
    try {
        const { libelle } = req.params;
        const data = await fs.readFile(dataFilePath, 'utf8');
        const patrimoineData = JSON.parse(data);
        const possessions = patrimoineData.find(item => item.model === "Patrimoine").data.possessions;

        const possessionIndex = possessions.findIndex(p => p.libelle === libelle);
        if (possessionIndex === -1) {
            return res.status(404).json({ message: 'Possession non trouvée' });
        }

        // Mettre à jour la date de fin à la date actuelle
        possessions[possessionIndex].dateFin = new Date().toISOString();

        const updatedData = JSON.stringify(patrimoineData, null, 2);
        await fs.writeFile(dataFilePath, updatedData);

        res.json(possessions[possessionIndex]);
    } catch (error) {
        console.error('Erreur lors de la fermeture de la possession:', error);
        res.status(500).json({ message: 'Erreur lors de la fermeture de la possession' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});