function calculateValue2(valeur, dateDebut, tauxAmortissement, valeurConstante, actualDate) {
    const dateActuelle = actualDate ? new Date(actualDate) : new Date();
    const dateDebutObj = new Date(dateDebut);

    if (dateActuelle < dateDebutObj) {
        return 0;
    }

    const differenceMonth = (dateActuelle.getFullYear() - dateDebutObj.getFullYear()) * 12 + (dateActuelle.getMonth() - dateDebutObj.getMonth());

    if (tauxAmortissement === null || tauxAmortissement === undefined) {
        return valeurConstante ? valeurConstante * differenceMonth : 0;
    } else {
        const raison = differenceMonth / 12;
        const result = valeur - valeur * ((raison * tauxAmortissement) / 100);
        return Math.floor(result);
    }
}

module.exports = calculateValue2;