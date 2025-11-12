export default async function register() {
  return `
    <h2>Registrera dig</h2>
    <form id="register">
      <input type="text" name="name" placeholder="Ange ditt namn">    
      <input type="text" name="email" placeholder="Ange din epostadress">
      <input type="submit" value="Registrera dig">
    </form>
  `;
}

async function submitRegistration(target) {
  const name = target.name.value;
  const email = target.email.value;
  await fetch('http://localhost:3002/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });
  // goto registration-complete page
  location.hash = '#registration-complete';
}

// add event listener
document.body.addEventListener('submit', async event => {
  if (!event.target.closest('#register')) { return; }
  event.preventDefault();
  await submitRegistration(event.target);
});