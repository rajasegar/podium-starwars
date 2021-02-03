const express = require('express');
const Layout = require('@podium/layout');
const utils = require('@podium/utils');

const app = express();

const layout = new Layout({
  name: 'myLayout',
  pathname: '/',
  logger: console
});

layout.view(
  (incoming, body, head) => `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
      <link href="/css/styles.css" rel="stylesheet">
      ${incoming.css.map(utils.buildLinkElement).join("\n")}
      <title>${incoming.view.title}</title>
    </head>
    <body>
      ${body}
      ${incoming.js.map(utils.buildScriptElement).join("\n")}
    </body>
  </html>`
);

const navpod = layout.client.register({
  name: 'navPod',
  uri: 'http://localhost:3001/manifest.json',
});

const peoplePod = layout.client.register({
  name: 'peoplePod',
  uri: 'http://localhost:3002/manifest.json',
});
const planetsPod = layout.client.register({
  name: 'planetsPod',
  uri: 'http://localhost:3003/manifest.json',
});

app.use(layout.middleware());

app.get('/', async (req, res) => {
  const incoming = res.locals.podium;
  const [ navbar ] = await Promise.all([
    navpod.fetch(incoming)
  ]);

  incoming.view.title = 'Starwars - Home';

  incoming.css = navbar.css;
  res.podiumSend(`<div>
    ${navbar}
    <h1>Micro-Frontends using Podium</h1>
    </div>`);
});

app.get('/people', async (req, res) => {
  const incoming = res.locals.podium;
  const [ navbar, people ] = await Promise.all([
    navpod.fetch(incoming),
    peoplePod.fetch(incoming)
  ]);

  incoming.view.title = 'Starwars - People';

  incoming.css = [...navbar.css, ...people.css];
  incoming.js = [...people.js];
  res.podiumSend(`<div>
    ${navbar}
    ${people}
    </div>`);
});

app.get('/planets', async (req, res) => {
  const incoming = res.locals.podium;
  const [ navbar, planets ] = await Promise.all([
    navpod.fetch(incoming),
    planetsPod.fetch(incoming)
  ]);

  incoming.view.title = 'Starwars - Planets';

  incoming.css = navbar.css;
  res.podiumSend(`<div>
    ${navbar}
    ${planets}
    </div>`);
});


app.use(express.static(__dirname + '/assets'));

app.listen(3000);
console.log('root app listening on port: 3000');
