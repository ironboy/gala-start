export default async function pets() {
  // get all pets
  const pets = await (await fetch('http://localhost:3000/pets')).json();
  // return pets converted to a html view
  let html = '<h1>Pets</h1>';
  for (let pet of pets) {
    html += '<article class="pet">';
    html += '<h3>' + pet.name + '</h3>';
    html += '<p><b>Species:</b> ' + pet.species + '</p>';
    html += '</article>';
  }
  return html;
}