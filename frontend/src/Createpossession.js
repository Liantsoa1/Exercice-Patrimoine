import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import './CSS/CreatePossession.css'; 

function CreatePossession() {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [tauxAmortissement, setTauxAmortissement] = useState('');
    const [error, setError] = useState(''); // État pour gérer les erreurs
    
    const navigate = useNavigate(); 

    // Définir l'URL de l'API en fonction de l'environnement
    const API_URL = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Réinitialiser l'erreur avant la soumission
        try {
            await axios.post(`${API_URL}/possession`, {
                libelle,
                valeur: Number(valeur),
                dateDebut,
                dateFin,
                tauxAmortissement: Number(tauxAmortissement)
            });
            navigate('/possession'); // Naviguez vers la liste des possessions
        } catch (error) {
            console.error('Erreur lors de la création de la possession:', error);
            setError('Erreur lors de la création de la possession'); // Mettre à jour l'état d'erreur
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Créer une Nouvelle Possession</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Afficher l'erreur si elle existe */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formLibelle" className="mb-3">
                    <Form.Label>Libelle:</Form.Label>
                    <Form.Control
                        type="text"
                        value={libelle}
                        onChange={(e) => setLibelle(e.target.value)}
                        required
                        placeholder="Entrez le libelle"
                    />
                </Form.Group>

                <Form.Group controlId="formValeur" className="mb-3">
                    <Form.Label>Valeur:</Form.Label>
                    <Form.Control
                        type="number"
                        value={valeur}
                        onChange={(e) => setValeur(e.target.value)}
                        required
                        placeholder="Entrez la valeur"
                    />
                </Form.Group>

                <Form.Group controlId="formDateDebut" className="mb-3">
                    <Form.Label>Date de début:</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDateFin" className="mb-3">
                    <Form.Label>Date de fin:</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formTauxAmortissement" className="mb-3">
                    <Form.Label>Taux d'amortissement:</Form.Label>
                    <Form.Control
                        type="number"
                        value={tauxAmortissement}
                        onChange={(e) => setTauxAmortissement(e.target.value)}
                        placeholder="Entrez le taux d'amortissement"
                    />
                </Form.Group>

                <Button variant="success" type="submit" className="btn-block text-white">
                    Créer Possession
                </Button>
            </Form>
        </Container>
    );
}

export default CreatePossession;