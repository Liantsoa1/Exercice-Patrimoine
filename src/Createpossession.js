import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import './CSS/CreatePossession.css'; 

function CreatePossession() {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [tauxAmortissement, setTauxAmortissement] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/possession/create', {
                libelle,
                valeur: Number(valeur),
                dateDebut,
                dateFin,
                tauxAmortissement: Number(tauxAmortissement)
            });
            navigate('/possession');
        } catch (error) {
            console.error('Erreur lors de la création de la possession:', error);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Créer une Nouvelle Possession</h2>
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