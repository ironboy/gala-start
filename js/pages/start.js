export default async function start() {
  // get all events
  const events =
    await (await fetch('http://localhost:3000/events')).json();
  return `
    <h1>Alla kommande events på Gala</h1>
    <p>This is the start page.</p>
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