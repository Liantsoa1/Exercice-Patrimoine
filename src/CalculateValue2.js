function calculateValue2(valeur, dateDebut, tauxAmortissement, valeurConstante, actualDate) {
    const dateActuelle = actualDate ? new Date(actualDate) : new Date();
    const dateDebutObj = new Date(dateDebut);

    if (dateActuelle < dateDebutObj) {
        return 0; // Si la date actuelle est avant la date de début, retourner 0
    }

    const differenceMonth = (dateActuelle.getFullYear() - dateDebutObj.getFullYear()) * 12 + (dateActuelle.getMonth() - dateDebutObj.getMonth());

    if (tauxAmortissement === null || tauxAmortissement === undefined) {
        return valeurConstante ? valeurConstante * differenceMonth : 0; // Si pas de taux d'amortissement, utiliser la valeur constante
    } else {
        const raison = differenceMonth / 12; // Calculer la raison d'amortissement
        const result = valeur - valeur * ((raison * tauxAmortissement) / 100); // Calculer la valeur après amortissement
        return Math.floor(result); // Retourner la valeur arrondie à l'entier inférieur
    }
}

module.exports = calculateValue2;