(async () => {
  const response = await fetch('https://swapi.dev/api/people');
  const data = await response.json();
  const people = data.results.map(p => p.name).join('\n');
document.getElementById('people-list').innerHTML = people;
})();
