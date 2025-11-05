export default async function createClub() {
  return `
    <h2>Skapa en klubb</h2>
    <form id="create-club">
      <input type="text" name="name" placeholder="Klubbnamn">
      <textarea name="description" placeholder="Beskrivning"></textarea>
      <input type="submit" value="Skapa">
    </form>
  `;
}

async function submitForm(event) {
  const target = event.target;
  // easy way to read values from forms - no querySelector needed!
  const name = target.name.value;
  const description = target.description.value;
  await fetch('http://localhost:3000/clubs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }) // stringify = serialize
  });
  // get all clubs
  const allClubs = await (await fetch('http://localhost:3000/clubs')).json();
  console.log(allClubs);
  // show success and list of  all clubs
  document.querySelector('main').innerHTML = `
    <h1>Klubben skapades</h1>
    <p>Nu finns följande klubbar:</p>
    ${allClubs.toReversed().map(({ id, name, description }) => `
      <h3>${name} (id: ${id})</h3>
      <p>${description}</p>
    `).join('')}
  `;
}

// add event listener
document.body.addEventListener('submit', async event => {
  if (!event.target.closest('#create-club')) { return; }
  event.preventDefault();
  await submitForm(event);
});