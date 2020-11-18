let router = require('express').Router();
let storage = require('./simpleStorage');
const url = require('url');

router.get('/displayName', function (request, response) {
    console.log(request.body);
    const urlQuery = url.parse(request.url, true).query;
    console.log(urlQuery);
    let userName = storage.getValue(urlQuery['id']);
    response.render('displayName',
        {
            pageTitle: "Your Name Display",
            userName: userName
        });
});

module.exports = router;