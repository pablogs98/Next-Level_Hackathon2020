let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/displayName', function (request, response) {
    let userName = storage.getValue();
    response.render('displayName',
        {
            pageTitle: "Your Name Display",
            userName: userName
        });
});

module.exports = router;