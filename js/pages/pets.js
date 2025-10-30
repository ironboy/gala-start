export default async function pets() {
  // get all pets
  const pets = await (await fetch('http://localhost:3000/pets')).json();
  // return pets converted to a html view
  return `
    <h1>Pets</h1>
    ${pets.map(({ name, species }) => /*html*/`
      <article class="pet">
        <h3>${name}</h3>
        <p><b>Species:</b> ${species}
      </article>
    `).join('')}
  `;
}