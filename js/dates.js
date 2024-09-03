function getDaysLeft(order) {
    // Gegebenes Datum als String
    var dateString = order.id;

    // Extrahiere Jahr, Monat und Tag
    var parts = dateString.split('-');
    let year = parseInt(parts[0]);
    let month = parseInt(parts[1]);
    let day = parseInt(parts[2]);

    // Erstelle ein Date-Objekt
    var date = new Date(year, month - 1, day); // Monat - 1, weil Monate in JS von 0-11 laufen

    // Füge die Anzahl der Tage hinzu, die in order.ablauftermin angegeben sind
    date.setDate(date.getDate() + parseInt(order.ablauftermin));

    // Formatiere das Datum im Format tt.mm.yyyy
    let dayFormatted = String(date.getDate()).padStart(2, '0');
    let monthFormatted = String(date.getMonth() + 1).padStart(2, '0');
    let yearFormatted = date.getFullYear();

    return `${dayFormatted}.${monthFormatted}.${yearFormatted}`;
}