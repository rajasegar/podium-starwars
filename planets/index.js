const express = require('express');
const Podlet = require('@podium/podlet');

const app = express();

const podlet = new Podlet({
    name: 'planetPod',
    version: '1.0.0',
    pathname: '/',
    content: '/',
    fallback: '/fallback',
    development: true,
});

app.use(podlet.middleware());

app.get(podlet.content(), (req, res) => {
    res.status(200).podiumSend(`
        <div>
          <h1>Planets page</h1>
        </div>
    `);
});

app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
});

app.listen(3003);

console.log('Planets pod listening on: 3003');
