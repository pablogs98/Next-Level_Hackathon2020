let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/', function (request, response) {
    response.render('enterName', { pageTitle: "Enter Your Name" });
});

router.post('/submitName', function (request, response) {
    storage.setValue(request.body.userName);
    response.redirect('/displayName');
});

module.exports = router;