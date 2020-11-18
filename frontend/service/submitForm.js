const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');
const inferencer_api = "https://eu-gb.functions.appdomain.cloud/api/v1/web/pablo.gimeno@urv.cat_dev/NLHackation2020/inferencer";
const path = require('path');

let router = require('express').Router();
let storage = require('./simpleStorage');


router.get('/form', function (request, response) {
    response.sendFile(path.join(__dirname, 'public/form.html'))
})


router.post('/submit', function (request, response) {
    let id = uuidv4();

    console.log(request.body)

    health = {
        "sex": parseInt(request.body.gender),
        "age": parseInt(request.body.age),
        "patient_type": 1,
        "intubed": 2,
        "pneumonia": "pneumonia" in request.body ? 97 : 2,
        "pregnancy": "pregnancy" in request.body ? 97 : 2,
        "diabetes": "diabetes" in request.body ? 97 : 2,
        "copd": "copd" in request.body ? 97 : 2,
        "asthma": "asthma" in request.body ? 97 : 2,
        "inmsupr": "inmsupr" in request.body ? 97 : 2,
        "hypertension": "hypertension" in request.body ? 97 : 2,
        "other_disease": "other_disease" in request.body ? 97 : 2,
        "cardiovascular": "cardiovascular" in request.body ? 97 : 2,
        "obesity": "obesity" in request.body ? 97 : 2,
        "renal_chronic": "renal_chronic" in request.body ? 97 : 2,
        "tobacco": "tobacco" in request.body ? 97 : 2,
        "contact_other_covid": "contact_other_covid" in request.body ? 97 : 2,
        "covid_res": 1,
        "icu": "pneumonia" in request.body ? 97 : 2
    }

    console.log(health)

    fetch(inferencer_api, {
        method: 'post',
        body: JSON.stringify(health),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).then(json => {
        console.log(json)
        data = {
            'ccaa': request.body.region,
            'icu': json.result.icu,
            'death': json.result.death
        }
        console.log(data)
        storage.setValue(id, data);
        url = '/displayResult?id=' + id;
        console.log(url);
        response.redirect(url);
    })
});

module.exports = router;