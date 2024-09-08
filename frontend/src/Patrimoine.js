import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import formatDate from "./formatDate";

function Patrimoine() {
    const [startDate, setStartDate] = useState(new Date());
    const [valeurPatrimoine, setValeurPatrimoine] = useState(null);

    const handleGetValeur = async () => {
        try {
            const response = await axios.get(`/patrimoine/${formatDate(startDate)}`);
            setValeurPatrimoine(response.data.valeur); 
        } catch (error) {
            console.error('Erreur lors de la récupération de la valeur du patrimoine:', error);
        }
    };

    return (
        <div className="date-picker-container">
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            />
            <Button variant="success" onClick={handleGetValeur}>
                Obtenir Valeur
            </Button>
            {valeurPatrimoine !== null && (
                <p>La valeur du patrimoine à la date sélectionnée est: {valeurPatrimoine} Ar</p>
            )}
        </div>
    );
}

export default Patrimoine;