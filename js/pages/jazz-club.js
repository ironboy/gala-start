export default async function jazzClub() {
  const clubId = 'a37c';
  // fetch the info about the club
  const { name, description } =
    await (await fetch('http://localhost:3000/clubs/' + clubId)).json();
  // fetch all events for the specific club
  // json server handles the filtering of the events for us
  // we only get events that match our club id
  const events =
    await (await fetch('http://localhost:3000/events?clubId=' + clubId)).json();
  return `
    <h1>${name}</h1>
    <p>${description}</p>
    <h2>Events</h2>
    ${events
      .toSorted((a, b) => a.date > b.date ? 1 : -1)
      .map(({ date, name, description }) => `
        <article class="event">
          <h3>${name} ${date}</h3>
          <p>${description}</p>
        </article>
      `)
      .join('')
    }
  `;
}