let router = require("express").Router();
let storage = require("./simpleStorage");
const url = require("url");

ccaa_iso = {
    "Andalucía": "AN",
    "Aragón": "AR",
    "Asturias": "AS",
    "Baleares": "IB",
    "Canarias": "CN",
    "Cantabria": "CB",
    "Castilla-La Mancha": "CM",
    "Castilla y León": "CL",
    "Cataluña": "CT",
    "Comunidad Valenciana": "VC",
    "Extremadura": "EX",
    "Galicia": "GA",
    "La Rioja": "RI",
    "Madrid": "MD",
    "Navarra": "NC",
    "País Vasco": "PV",
    "Ceuta": "CE",
    "Melilla": "ML"
}

router.get("/displayResult", function (request, response) {
    const urlQuery = url.parse(request.url, true).query;
    console.log(urlQuery);
    
    let result = storage.getValue(urlQuery["id"]);

    const icu_percent = Math.trunc(((result.icu > 97.0 ? 97.0 : result.icu) * 100) / 95.0);

    var death_grade = "Muy bajo"
    if (icu_percent >= 50.0) {
        death_percent = (result.death * 100) / 95.0;
        if (death_percent <= 33.0) {
            death_grade = "Alto"
        } else if (death_percent > 33.0 && death_percent <= 66.0) {
            death_grade = "Medio"
        } else {
            death_grade = "Bajo"
        }
    }

    response.render("results", {
        region: result.ccaa,
        regionISO: ccaa_iso[result.ccaa],
        icu: icu_percent,
        death: death_grade
    });
});

module.exports = router;