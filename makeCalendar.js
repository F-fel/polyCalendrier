/**
 * @author Farid el Fakhry
 * use at your own risk
 */

class HeureCours {
    constructor(jourSemaine, periode, sigle, groupe, salle, recurring) {
        this.jourSemaine = jourSemaine;
        this.periode = periode;
        this.sigle = sigle;
        this.groupe = groupe;
        this.salle = salle;
        // 'B0' => chaque semaine, 'B1' => semaine impaire, 'B2' => semaine pair 
        this.recurring = recurring;
    }
}

const heureCoursFactory = (input) => {
    const splitedInput = input.split(' ');
    const regex = RegExp(".*[(]B[1,2][)].*");
    if (splitedInput.length < 3)
        return null;
    return {
        "sigle": splitedInput[0],
        "groupe": splitedInput[1],
        "salle": splitedInput[2],
        "recurring": regex.test(input) ? splitedInput[splitedInput.length - 1] : "B0",
    }
}
const calendrierCours = [];
const coursActuel = document.querySelector(".wrapperPourListeCoursActuels");
//tableau , chaque ligne 1 heure , chaque colonne une journé
const calendrierHTML = coursActuel.querySelectorAll(".row.replace-bottom.tableListeCoursActuels");


calendrierHTML.forEach(row => {
    const casesCalendrier = row.querySelectorAll(".two.columns");
    let time = '';
    casesCalendrier.forEach(periode => {
        const label = periode.querySelector("label");
        const inputs = periode.querySelectorAll('.inputEmulator');
        inputs.forEach((input) => {
            if (label.innerHTML == 'P�riode') {
                time = input.innerHTML;
                return;
            }
            const seance = heureCoursFactory(input.innerHTML);
            if (seance == null) {
                return;
            }
            calendrierCours.push(new HeureCours(label.innerHTML, time, seance.sigle, seance.salle, seance.groupe, seance.recurring))
        })
    })
});

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
download(JSON.stringify(calendrierCours), 'json.txt', 'text/plain');