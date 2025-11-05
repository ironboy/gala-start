export default async function createClub() {
  return `
    <h2>Skapa en klubb</h2>
    <form id="create-club">
      <input type="text" name="name" placeholder="Klubbnamn">
      <input type="text" name="description" placeholder="Beskrivning">
      <input type="submit" value="Skapa">
    </form>
  `;
}

async function submitForm(event) {
  const target = event.target;
  const name = target.name.value;
  const description = target.description.value;

  try {
    const response = await fetch('http://localhost:3000/clubs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }) // stringify = serialize
    });

    if (response.ok) {
      console.log('Club created successfully!');
      // Optionally clear the form or show success message
      // target.reset();
    } else {
      console.error('Failed to create club:', response.status);
    }
  } catch (error) {
    console.error('Error creating club:', error);
  }
}

// add event listener
document.body.addEventListener('submit', async event => {
  if (!event.target.closest('#create-club')) { return; }

  event.preventDefault();
  event.stopPropagation();

  console.log('Form submit intercepted');
  await submitForm(event);
  console.log('Form submission complete');

  return false;
});