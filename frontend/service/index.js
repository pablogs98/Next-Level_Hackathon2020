let express = require('express');
let mustacheExpress = require('mustache-express');
let bodyParser = require('body-parser');
let submitForm = require('./submitForm');
let displayResults = require('./displayResults');

const PORT = 8080;
const HOST = '0.0.0.0';

let app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', submitForm);
app.use('/', displayResults);

app.listen(PORT, HOST, function () {
    console.log("Server started");
});