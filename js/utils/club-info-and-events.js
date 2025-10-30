export default async function clubInfoAndEvents(clubId) {
  let name = '', description = '';
  // if there is a clubId -> fetch the info about the club
  if (clubId) {
    const { name: clubName, description: clubDescription } =
      await (await fetch('http://localhost:3000/clubs/' + clubId)).json();
    name = clubName;
    description = clubDescription;
  }
  // fetch all events for the specific club 
  // or if no club id -> all events
  // (json server handles the filtering of the events for us
  // we only get events that match our club id)
  let url = 'http://localhost:3000/events';
  if (clubId) { url += '?clubId=' + clubId; }
  const events =
    await (await fetch(url)).json();
  // return html
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