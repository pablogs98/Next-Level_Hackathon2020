let router = require('express').Router();
let storage = require('./simpleStorage');
const url = require('url');

router.get('/displayResult', function (request, response) {
    const urlQuery = url.parse(request.url, true).query;
    console.log(urlQuery);
    let result = storage.getValue(urlQuery['id']);
    response.render('displayResult', {
        icu: result['icu'],
        death: result['death']
    });
});

module.exports = router;