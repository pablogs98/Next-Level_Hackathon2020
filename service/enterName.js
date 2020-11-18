const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');
const icu_api = "https://eu-gb.functions.appdomain.cloud/api/v1/web/pablo.gimeno@urv.cat_dev/NLHackaton2020/inferencer_icu";
const death_api = "https://eu-gb.functions.appdomain.cloud/api/v1/web/pablo.gimeno@urv.cat_dev/NLHackaton2020/inferencer_death";

let router = require('express').Router();
let storage = require('./simpleStorage');


router.post('/submit', function (request, response) {

    payload = {
        "sex": 2,
        "patient_type": 1,
        "intubed": 97,
        "pneumonia": 2,
        "age": 27,
        "pregnancy": 97,
        "diabetes": 2,
        "copd": 2,
        "asthma": 2,
        "inmsupr": 2,
        "hypertension": 2,
        "other_disease": 2,
        "cardiovascular": 2,
        "obesity": 2,
        "renal_chronic": 2,
        "tobacco": 2,
        "contact_other_covid": 2,
        "covid_res": 1,
        "icu": 97
    };

    let id = uuidv4();

    p1 = fetch(icu_api, {
        method: 'post',
        body:    JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())

    p2 = fetch(death_api, {
        method: 'post',
        body:    JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
    
    Promise.all([p1, p2]).then(jsons => {
        data = {
            'icu': jsons[0]['result'],
            'death': jsons[1]['result']
        }
        console.log(data)
        storage.setValue(id, data);
        url = '/displayResult?id=' + id;
        console.log(url);
        response.redirect(url);
    })
});

module.exports = router;