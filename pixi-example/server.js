
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);

app.use("/", express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.listen(8080);
