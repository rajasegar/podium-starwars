const express = require('express');
const Podlet = require('@podium/podlet');
const cors = require('cors');

const app = express();

const podlet = new Podlet({
    name: 'planetPod',
    version: '1.0.2',
    pathname: '/',
    content: '/',
    fallback: '/fallback',
    development: true,
});

app.use(podlet.middleware());
app.use(cors());

app.get(podlet.content(),  (req, res) => {
    res.status(200).podiumSend(`
        <div>
          <h1>Planets page</h1>
          <div id="planets-list">
          <p>Loading planets info, please wait...</p>
        </div>
    `);
});

app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
});

app.get(podlet.fallback(), (req, res) => {
  res.status(200).podiumSend(`
  <h1>Planets info not available</h1>
  `);
});

app.use(express.static(__dirname + '/assets'));
podlet.css({ value: '/css/styles.css' });
podlet.js({ value: '/js/index.js' });


app.listen(3003);

console.log('Planets pod listening on: 3003');
