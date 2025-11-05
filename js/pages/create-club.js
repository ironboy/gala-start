export default async function createClub() {
  return `
    <h2>Skapa en klubb</h2>
    <form method="post" onsubmit="submitForm(event);return false">
        <input type="text" name="club-name">
        <input type="text" name="description">
        <input type="submit" value="Skapa">
    </form>
  `
}

function submitForm(event) {
  console.log('event', event.preventDefault)
  event.preventDefault()
  const target = event.target
  console.log('target', target)
  console.log("submitting the form")
  const clubName = target.querySelector('*[name="club-name"]').value
  const description = target.querySelector('*[name="description"]').value
  console.log('clubName', clubName, 'description', description)

  // skickar datan till serven med POST
  sendData({ name: clubName, description })
}

async function sendData(data) {
  await fetch('http://localhost:3000/clubs', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data) // stringify = serialize
  })
}

window.submitForm = submitForm