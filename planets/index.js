const express = require('express');
const Podlet = require('@podium/podlet');
const fetch = require('node-fetch');

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

app.get(podlet.content(),  async (req, res) => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  const planets = data.results.map(p => `<li>${p.name}</li>`).join('\n');
    res.status(200).podiumSend(`
        <div>
          <h1>Planets page</h1>
          <ul>
          ${planets}
          </ul>
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

app.listen(3003);

console.log('Planets pod listening on: 3003');
