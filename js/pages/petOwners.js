export default async function petOwners() {
  // get all pets
  const petOwners = await (await fetch('http://localhost:3000/petOwners')).json();
  // return petOwners converted to a html view
  return `
    <h1>Pet owners</h1>
    ${petOwners.map(({ name }) => /*html*/`
      <article class="petOwners">
        <h3>${name}</h3>
      </article>
    `).join('')}
  `;
}