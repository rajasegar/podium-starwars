const express = require('express');
const Podlet = require('@podium/podlet');
const cors = require('cors');

const app = express();

const podlet = new Podlet({
    name: 'peoplePod',
    version: '1.0.0',
    pathname: '/',
    content: '/',
    fallback: '/fallback',
    development: true,
});

app.use(podlet.middleware());
app.use(cors());

app.get(podlet.content(), (req, res) => {
    res.status(200).podiumSend(`
        <div>
          <h1>People page</h1>
        </div>
    `);
});

app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
});

app.use(express.static(__dirname + '/assets'));
podlet.css({ value: '/css/styles.css' });

app.listen(3002);
console.log('People pod listening on: 3002');