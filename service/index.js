let express = require('express');
let mustacheExpress = require('mustache-express');
let bodyParser = require('body-parser');
let enterNameRoute = require('./enterName');
let displayNameRoute = require('./displayName');

let app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', enterNameRoute);
app.use('/', displayNameRoute);

app.listen(8080, function () {
    console.log("Server started");
});