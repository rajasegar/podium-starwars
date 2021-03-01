(async () => {
  console.log('planets');
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  const planets = data.results.map(p => p.name).join('\n');
  document.getElementById('planets-list').innerHTML = planets;
  console.log('planets-end');
})();
